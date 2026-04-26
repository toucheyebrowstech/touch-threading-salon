/**
 * File name: src/components/AdminAppointmentSoundAlert.jsx
 * Purpose: Plays an admin-side sound alert when a new appointment is booked.
 * Contains: Appointment polling, browser-safe sound enable button, beep sound generation, and new booking banner.
 * Used by: AdminLayout.jsx so it runs across the whole admin dashboard.
 * Future edits: Replace generated beep with a custom MP3, add desktop push notifications, or change polling speed here.
 */

import { useEffect, useRef, useState } from 'react';
import { BellRing, Volume2, VolumeX, X } from 'lucide-react';
import { Link } from 'react-router-dom';
import { adminApi, unwrap } from '../api/adminApi';

const SOUND_ENABLED_KEY = 'touch_admin_appointment_sound_enabled';
const SEEN_APPOINTMENTS_KEY = 'touch_admin_seen_appointment_ids';
const POLL_MS = 10000;

function readSeenIds() {
  try {
    const parsed = JSON.parse(localStorage.getItem(SEEN_APPOINTMENTS_KEY) || '[]');
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function saveSeenIds(ids) {
  localStorage.setItem(SEEN_APPOINTMENTS_KEY, JSON.stringify(ids.slice(0, 250)));
}

function getAppointmentId(appointment) {
  return appointment?._id || appointment?.id || '';
}

function getAppointmentTime(appointment) {
  if (!appointment) return '';
  if (appointment.date && appointment.time) return `${appointment.date} at ${appointment.time}`;
  if (appointment.dateTime) return appointment.dateTime;
  if (appointment.startTime) return appointment.startTime;
  return '';
}

export default function AdminAppointmentSoundAlert() {
  const [soundEnabled, setSoundEnabled] = useState(() => localStorage.getItem(SOUND_ENABLED_KEY) === 'true');
  const [newAppointment, setNewAppointment] = useState(null);
  const [pollError, setPollError] = useState('');
  const firstLoadRef = useRef(true);
  const audioContextRef = useRef(null);
  const seenIdsRef = useRef(readSeenIds());

  function createAudioContext() {
    const AudioContextClass = window.AudioContext || window.webkitAudioContext;
    if (!AudioContextClass) return null;

    if (!audioContextRef.current) {
      audioContextRef.current = new AudioContextClass();
    }

    return audioContextRef.current;
  }

  async function unlockSound() {
    const context = createAudioContext();

    if (context?.state === 'suspended') {
      await context.resume();
    }

    setSoundEnabled(true);
    localStorage.setItem(SOUND_ENABLED_KEY, 'true');
    playAlertSound();
  }

  function disableSound() {
    setSoundEnabled(false);
    localStorage.setItem(SOUND_ENABLED_KEY, 'false');
  }

  function playTone(context, startTime, frequency, duration) {
    const oscillator = context.createOscillator();
    const gain = context.createGain();

    oscillator.type = 'sine';
    oscillator.frequency.setValueAtTime(frequency, startTime);
    gain.gain.setValueAtTime(0.0001, startTime);
    gain.gain.exponentialRampToValueAtTime(0.18, startTime + 0.02);
    gain.gain.exponentialRampToValueAtTime(0.0001, startTime + duration);

    oscillator.connect(gain);
    gain.connect(context.destination);
    oscillator.start(startTime);
    oscillator.stop(startTime + duration + 0.02);
  }

  function playAlertSound() {
    if (localStorage.getItem(SOUND_ENABLED_KEY) !== 'true') return;

    const context = createAudioContext();
    if (!context) return;

    const now = context.currentTime;
    playTone(context, now, 880, 0.18);
    playTone(context, now + 0.24, 1046, 0.18);
    playTone(context, now + 0.48, 880, 0.24);
  }

  useEffect(() => {
    let cancelled = false;

    async function checkAppointments() {
      try {
        const response = await adminApi.appointments();
        const appointments = unwrap(response);
        const list = Array.isArray(appointments) ? appointments : [];
        const currentIds = list.map(getAppointmentId).filter(Boolean);

        if (firstLoadRef.current) {
          firstLoadRef.current = false;

          const savedSeenIds = seenIdsRef.current;
          const initialSeenIds = savedSeenIds.length ? Array.from(new Set([...savedSeenIds, ...currentIds])) : currentIds;
          seenIdsRef.current = initialSeenIds;
          saveSeenIds(initialSeenIds);
          return;
        }

        const newItems = list.filter((appointment) => {
          const id = getAppointmentId(appointment);
          return id && !seenIdsRef.current.includes(id);
        });

        if (newItems.length > 0 && !cancelled) {
          const newest = newItems[0];
          setNewAppointment(newest);
          playAlertSound();
        }

        const nextSeenIds = Array.from(new Set([...currentIds, ...seenIdsRef.current]));
        seenIdsRef.current = nextSeenIds;
        saveSeenIds(nextSeenIds);
        setPollError('');
      } catch (error) {
        if (!cancelled) {
          setPollError(error?.response?.data?.message || 'Appointment alert check failed.');
        }
      }
    }

    checkAppointments();
    const timer = window.setInterval(checkAppointments, POLL_MS);

    return () => {
      cancelled = true;
      window.clearInterval(timer);
    };
  }, []);

  return (
    <div className="space-y-3">
      {soundEnabled ? (
        <button
          type="button"
          onClick={disableSound}
          className="flex w-full items-center justify-center gap-2 rounded-2xl bg-green-50 px-4 py-3 text-xs font-black text-green-700 hover:bg-green-100"
        >
          <Volume2 size={16} />
          Sound alerts on
        </button>
      ) : (
        <button
          type="button"
          onClick={unlockSound}
          className="flex w-full items-center justify-center gap-2 rounded-2xl bg-brown px-4 py-3 text-xs font-black text-white hover:bg-espresso"
        >
          <VolumeX size={16} />
          Enable sound alerts
        </button>
      )}

      {pollError ? <p className="text-center text-[11px] font-bold text-red-600">{pollError}</p> : null}

      {newAppointment ? (
        <div className="fixed bottom-5 right-5 z-50 w-[calc(100%-2.5rem)] max-w-sm rounded-3xl border border-gold/40 bg-white p-5 text-brown shadow-soft">
          <div className="flex items-start gap-3">
            <div className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl bg-gold/20 text-brown">
              <BellRing size={22} />
            </div>

            <div className="min-w-0 flex-1">
              <p className="text-sm font-black">New appointment booked</p>
              <p className="mt-1 text-xs font-semibold text-stone-600">
                {newAppointment.customerName || 'A customer'} booked {newAppointment.serviceName || newAppointment.service?.name || 'a service'}.
              </p>
              {getAppointmentTime(newAppointment) ? (
                <p className="mt-1 text-xs font-bold text-brown/75">{getAppointmentTime(newAppointment)}</p>
              ) : null}

              <Link
                to="/admin/appointments"
                onClick={() => setNewAppointment(null)}
                className="mt-3 inline-flex rounded-full bg-brown px-4 py-2 text-xs font-black text-white"
              >
                View appointments
              </Link>
            </div>

            <button
              type="button"
              onClick={() => setNewAppointment(null)}
              className="rounded-full bg-stone-100 p-2 text-stone-500 hover:bg-blush hover:text-brown"
              aria-label="Dismiss appointment alert"
            >
              <X size={16} />
            </button>
          </div>
        </div>
      ) : null}
    </div>
  );
}
