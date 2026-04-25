/**
 * File name: src/admin/AdminAppointments.jsx
 * Purpose: Appointment management screen for salon owner.
 * Contains: Appointment table, status controls, contact info, notes, refresh, delete action,
 * and live salon-screen new booking alert.
 *
 * Used by:
 * - Route /admin/appointments
 *
 * What this file does:
 * - Loads real appointments from backend
 * - Lets admin confirm/cancel/complete appointments
 * - Polls backend every 10 seconds while this page is open
 * - Shows a visible alert when a new booking arrives
 * - Keeps a new appointment count in the browser tab title
 *
 * Future edits:
 * - Replace polling with Socket.IO for instant real-time alerts
 * - Add sound notification toggle
 * - Add calendar/day/week view
 */

import { useEffect, useMemo, useRef, useState } from "react";
import { adminApi } from "../api/adminApi";
import { useAdminResource } from "../hooks/useAdminResource";
import { pillClass, shortDateTime, text } from "../utils/format";
import AdminPageHeader from "../components/AdminPageHeader.jsx";
import EmptyState from "../components/EmptyState.jsx";
import LoadingSpinner from "../components/LoadingSpinner.jsx";

const statuses = ["Pending", "Confirmed", "Completed", "Cancelled"];
const POLL_MS = 10000;

function getAppointmentTime(appointment) {
  return appointment.dateTime || appointment.startTime || `${appointment.date}T${appointment.time}`;
}

function getCreatedTime(appointment) {
  const value = appointment.createdAt || appointment.updatedAt || getAppointmentTime(appointment);
  const time = new Date(value).getTime();

  return Number.isNaN(time) ? 0 : time;
}

function sortAppointments(list) {
  return [...list].sort((a, b) => getCreatedTime(b) - getCreatedTime(a));
}

export default function AdminAppointments() {
  const { data, loading, error, refresh } = useAdminResource(adminApi.appointments);

  const [newAlert, setNewAlert] = useState(null);
  const [newCount, setNewCount] = useState(0);
  const knownIdsRef = useRef(new Set());
  const didPrimeRef = useRef(false);
  const originalTitleRef = useRef(document.title);

  const appointments = useMemo(() => sortAppointments(data || []), [data]);

  async function reloadAndCheckForNew({ silent = false } = {}) {
    const latest = await refresh();
    const list = Array.isArray(latest) ? latest : [];
    const ids = new Set(list.map((appointment) => appointment._id).filter(Boolean));

    if (!didPrimeRef.current) {
      knownIdsRef.current = ids;
      didPrimeRef.current = true;
      return;
    }

    const newAppointments = list.filter((appointment) => {
      return appointment?._id && !knownIdsRef.current.has(appointment._id);
    });

    knownIdsRef.current = ids;

    if (newAppointments.length > 0 && !silent) {
      const newest = sortAppointments(newAppointments)[0];
      const customer = newest?.customerName || "New customer";
      const service = newest?.service?.name || newest?.serviceName || "appointment";

      setNewCount((count) => count + newAppointments.length);
      setNewAlert({
        title: `${newAppointments.length} new booking${newAppointments.length > 1 ? "s" : ""}`,
        message: `${customer} requested ${service}.`,
      });
    }
  }

  async function status(id, value) {
    await adminApi.updateAppointmentStatus(id, value);
    await reloadAndCheckForNew({ silent: true });
  }

  async function remove(id) {
    if (confirm("Delete this appointment?")) {
      await adminApi.deleteAppointment(id);
      await reloadAndCheckForNew({ silent: true });
    }
  }

  function clearAlert() {
    setNewAlert(null);
    setNewCount(0);
    document.title = originalTitleRef.current;
  }

  useEffect(() => {
    const interval = window.setInterval(() => {
      reloadAndCheckForNew();
    }, POLL_MS);

    return () => window.clearInterval(interval);
  }, []);

  useEffect(() => {
    if (newCount > 0) {
      document.title = `(${newCount}) New booking - Touch Salon`;
      return;
    }

    document.title = originalTitleRef.current;
  }, [newCount]);

  return (
    <section>
      <AdminPageHeader
        title="Appointments"
        subtitle="Confirm, cancel, complete, or review every customer appointment."
      >
        <button
          onClick={() => reloadAndCheckForNew({ silent: true })}
          className="rounded-2xl bg-brown px-4 py-3 text-sm font-black text-white"
        >
          Refresh
        </button>
      </AdminPageHeader>

      {newAlert && (
        <div className="mb-5 rounded-3xl border border-amber-200 bg-amber-50 p-5 shadow-soft">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="text-sm font-black uppercase tracking-wide text-amber-700">
                New appointment received
              </p>
              <h3 className="mt-1 text-xl font-black text-brown">{newAlert.title}</h3>
              <p className="mt-1 text-sm text-stone-700">{newAlert.message}</p>
            </div>

            <button
              onClick={clearAlert}
              className="rounded-2xl bg-brown px-5 py-3 text-sm font-black text-white"
            >
              Mark seen
            </button>
          </div>
        </div>
      )}

      <div className="mb-5 rounded-3xl border border-blush bg-white p-4 text-sm text-stone-600 shadow-soft">
        This screen checks for new bookings every 10 seconds. Keep this page open on the salon
        computer or tablet to see new appointment alerts.
      </div>

      {loading && <LoadingSpinner />}

      {error && <EmptyState title="Could not load appointments" message={error} />}

      {!loading && !error && appointments.length === 0 && (
        <EmptyState title="No appointments yet" message="New customer bookings will appear here." />
      )}

      {appointments.length > 0 && (
        <div className="overflow-hidden rounded-3xl border border-blush bg-white shadow-soft">
          <div className="overflow-x-auto">
            <table className="min-w-[1100px] w-full text-left text-sm">
              <thead className="bg-blush/50 text-xs uppercase tracking-wide text-brown">
                <tr>
                  <th className="p-4">Customer</th>
                  <th className="p-4">Service</th>
                  <th className="p-4">Worker</th>
                  <th className="p-4">Date/Time</th>
                  <th className="p-4">Status</th>
                  <th className="p-4">Notes</th>
                  <th className="p-4">Actions</th>
                </tr>
              </thead>

              <tbody>
                {appointments.map((appointment) => (
                  <tr key={appointment._id} className="border-t border-blush/70 align-top">
                    <td className="p-4">
                      <b>{text(appointment.customerName)}</b>
                      <p className="text-stone-500">{text(appointment.phone)}</p>
                      <p className="text-stone-500">{text(appointment.email)}</p>
                    </td>

                    <td className="p-4">
                      {appointment.service?.name || appointment.serviceName || "—"}
                    </td>

                    <td className="p-4">
                      {appointment.staff?.name || appointment.staffName || "Any available"}
                    </td>

                    <td className="p-4">
                      {shortDateTime(getAppointmentTime(appointment))}
                    </td>

                    <td className="p-4">
                      <span
                        className={`rounded-full px-3 py-1 text-xs font-black ${pillClass(
                          appointment.status
                        )}`}
                      >
                        {appointment.status}
                      </span>

                      <select
                        className="mt-2 block rounded-xl border border-blush px-2 py-2 text-xs"
                        value={appointment.status}
                        onChange={(event) => status(appointment._id, event.target.value)}
                      >
                        {statuses.map((statusValue) => (
                          <option key={statusValue} value={statusValue}>
                            {statusValue}
                          </option>
                        ))}
                      </select>
                    </td>

                    <td className="p-4 max-w-xs text-stone-600">
                      {text(appointment.notes, "No notes")}
                    </td>

                    <td className="p-4">
                      <button
                        onClick={() => remove(appointment._id)}
                        className="rounded-xl bg-red-50 px-3 py-2 text-xs font-black text-red-700"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </section>
  );
}
