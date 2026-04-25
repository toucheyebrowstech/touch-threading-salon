/**
 * File: frontend/src/components/TimeSlotPicker.jsx
 * Purpose: Shows available appointment time slots for the selected date, staff, and service.
 * Features: Loading state, closed/unavailable message, selectable slot buttons, and selected styling.
 * Used by: AppointmentForm.jsx.
 * Future edits: Change slot button design or add morning/afternoon grouping here.
 */

import LoadingSpinner from './LoadingSpinner';

export default function TimeSlotPicker({ slots = [], value, onChange, loading, disabled }) {
  if (disabled) {
    return <p className="rounded-2xl bg-cream p-4 text-sm font-semibold text-cocoa/70">Choose a service, worker, and date to see available times.</p>;
  }

  if (loading) return <LoadingSpinner label="Checking available times..." />;

  if (!slots.length) {
    return <p className="rounded-2xl bg-red-50 p-4 text-sm font-semibold text-red-700">No available time slots for this selection. The salon may be closed or fully booked.</p>;
  }

  return (
    <div className="grid grid-cols-3 gap-2 sm:grid-cols-4 md:grid-cols-5">
      {slots.map((slot) => (
        <button
          key={slot}
          type="button"
          onClick={() => onChange(slot)}
          className={`rounded-full border px-3 py-2 text-sm font-bold transition ${value === slot ? 'border-espresso bg-espresso text-white' : 'border-rosegold/25 bg-white text-cocoa hover:bg-blush/40'}`}
        >
          {slot}
        </button>
      ))}
    </div>
  );
}
