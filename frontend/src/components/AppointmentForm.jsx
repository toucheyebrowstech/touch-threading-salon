/**
 * File: frontend/src/components/AppointmentForm.jsx
 * Purpose: Public customer appointment booking form.
 * Features: Customer fields, service/staff/date selection, live time slots, validation feedback, booking submit, and confirmation message.
 * Used by: Book.jsx page and QuickBookSection.jsx.
 * Future edits: Add deposits, SMS consent, multi-service booking, or custom cancellation rules here.
 */

import { useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { salonApi } from '../api/salonApi';
import { fallbackServices, fallbackStaff } from '../data/fallbackData';
import { formatDateForInput } from '../utils/formatters';
import TimeSlotPicker from './TimeSlotPicker';
import Toast from './Toast';

const initialForm = {
  customerName: '',
  phone: '',
  email: '',
  service: '',
  staff: '',
  date: formatDateForInput(),
  time: '',
  notes: ''
};

export default function AppointmentForm({ compact = false, services = fallbackServices, staff = fallbackStaff }) {
  const [searchParams] = useSearchParams();
  const [form, setForm] = useState(initialForm);
  const [slots, setSlots] = useState([]);
  const [slotsLoading, setSlotsLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [toast, setToast] = useState({ type: '', message: '' });

  const activeServices = useMemo(() => services.filter((service) => service.isActive !== false), [services]);
  const activeStaff = useMemo(() => staff.filter((worker) => worker.isActive !== false), [staff]);

  useEffect(() => {
    const serviceParam = searchParams.get('service');
    const staffParam = searchParams.get('staff');
    setForm((prev) => ({ ...prev, service: serviceParam || prev.service || activeServices[0]?._id || '', staff: staffParam || prev.staff || activeStaff[0]?._id || '' }));
  }, [searchParams, activeServices, activeStaff]);

  useEffect(() => {
    let mounted = true;
    async function loadSlots() {
      if (!form.date || !form.staff || !form.service) return;
      try {
        setSlotsLoading(true);
        const result = await salonApi.getAvailableSlots({ date: form.date, staffId: form.staff, serviceId: form.service });
        if (mounted) setSlots(Array.isArray(result) ? result : []);
      } catch (err) {
        if (mounted) setSlots([]);
      } finally {
        if (mounted) setSlotsLoading(false);
      }
    }
    loadSlots();
    return () => {
      mounted = false;
    };
  }, [form.date, form.staff, form.service]);

  const update = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value, ...(field === 'date' || field === 'staff' || field === 'service' ? { time: '' } : {}) }));
    setToast({ type: '', message: '' });
  };

  const submit = async (event) => {
    event.preventDefault();
    if (!form.time) {
      setToast({ type: 'error', message: 'Please select an available time slot.' });
      return;
    }
    try {
      setSubmitting(true);
      const result = await salonApi.createAppointment(form);
      setToast({ type: 'success', message: result.message || 'Appointment request received. We will confirm it soon.' });
      setForm({ ...initialForm, service: form.service, staff: form.staff, date: formatDateForInput() });
    } catch (err) {
      setToast({ type: 'error', message: err?.response?.data?.message || 'Could not book appointment. Please check your details and try again.' });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form onSubmit={submit} className={`salon-card rounded-[2rem] ${compact ? 'p-5' : 'p-6 md:p-8'}`}>
      <Toast type={toast.type} message={toast.message} />
      <div className="mt-5 grid gap-4 md:grid-cols-2">
        <label>
          <span className="salon-label">Customer name</span>
          <input className="salon-input" value={form.customerName} onChange={(e) => update('customerName', e.target.value)} required placeholder="Your full name" />
        </label>
        <label>
          <span className="salon-label">Phone number</span>
          <input className="salon-input" value={form.phone} onChange={(e) => update('phone', e.target.value)} required placeholder="(972) 555-0123" />
        </label>
        <label>
          <span className="salon-label">Email</span>
          <input className="salon-input" type="email" value={form.email} onChange={(e) => update('email', e.target.value)} required placeholder="you@example.com" />
        </label>
        <label>
          <span className="salon-label">Service</span>
          <select className="salon-input" value={form.service} onChange={(e) => update('service', e.target.value)} required>
            <option value="">Select service</option>
            {activeServices.map((service) => (
              <option key={service._id} value={service._id}>{service.name} - ${service.price}</option>
            ))}
          </select>
        </label>
        <label>
          <span className="salon-label">Preferred worker</span>
          <select className="salon-input" value={form.staff} onChange={(e) => update('staff', e.target.value)} required>
            <option value="">Any available worker</option>
            {activeStaff.map((worker) => (
              <option key={worker._id} value={worker._id}>{worker.name} — {worker.role}</option>
            ))}
          </select>
        </label>
        <label>
          <span className="salon-label">Date</span>
          <input className="salon-input" type="date" min={formatDateForInput()} value={form.date} onChange={(e) => update('date', e.target.value)} required />
        </label>
      </div>

      <div className="mt-5">
        <span className="salon-label">Available time slots</span>
        <TimeSlotPicker slots={slots} value={form.time} onChange={(value) => update('time', value)} loading={slotsLoading} disabled={!form.date || !form.staff || !form.service} />
      </div>

      <label className="mt-5 block">
        <span className="salon-label">Notes</span>
        <textarea className="salon-input min-h-28" value={form.notes} onChange={(e) => update('notes', e.target.value)} placeholder="Tell us anything helpful. Example: first visit, sensitive skin, combo request..." />
      </label>

      <p className="mt-5 rounded-2xl bg-cream p-4 text-sm leading-6 text-cocoa/72">
        Walk-ins are welcome, but appointments help you avoid waiting. Please call the salon if you need to cancel or reschedule.
      </p>

      <button disabled={submitting} className="mt-6 w-full rounded-full bg-espresso px-6 py-4 font-bold text-white shadow-salon disabled:cursor-not-allowed disabled:opacity-60">
        {submitting ? 'Booking...' : 'Submit Appointment Request'}
      </button>
    </form>
  );
}
