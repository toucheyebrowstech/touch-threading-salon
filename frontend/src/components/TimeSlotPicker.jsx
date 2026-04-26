/**
 * File: frontend/src/components/TimeSlotPicker.jsx
 * Purpose: Shows available and unavailable appointment time slots for the selected date, staff, and service.
 * Features: Loading state, closed/unavailable message, disabled past/booked slots, selectable available slot buttons, and selected styling.
 * Used by: AppointmentForm.jsx.
 * Future edits: Change slot button design or add morning/afternoon grouping here.
 */

import LoadingSpinner from './LoadingSpinner';

function normalizeSlot(slot) {
  if (typeof slot === 'string') {
    return {
      time: slot,
      available: true,
      reason: ''
    };
  }

  return {
    time: slot?.time || '',
    available: slot?.available !== false,
    reason: slot?.reason || ''
  };
}

function formatSlotTime(time) {
  const [hourRaw, minute = '00'] = String(time).split(':');
  const hour = Number(hourRaw);

  if (Number.isNaN(hour)) return time;

  const suffix = hour >= 12 ? 'PM' : 'AM';
  const displayHour = hour % 12 || 12;

  return `${displayHour}:${minute} ${suffix}`;
}

export default function TimeSlotPicker({ slots = [], value, onChange, loading, disabled }) {
  if (disabled) {
    return <p className="rounded-2xl bg-cream p-4 text-sm font-semibold text-cocoa/70">Choose a service and date to see available times.</p>;
  }

  if (loading) return <LoadingSpinner label="Checking available times..." />;

  if (!slots.length) {
    return <p className="rounded-2xl bg-red-50 p-4 text-sm font-semibold text-red-700">No available time slots for this selection. The salon may be closed or fully booked.</p>;
  }

  return (
    <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 md:grid-cols-4">
      {slots.map((rawSlot) => {
        const slot = normalizeSlot(rawSlot);
        const isSelected = value === slot.time;
        const isDisabled = !slot.available;

        return (
          <button
            key={slot.time}
            type="button"
            disabled={isDisabled}
            title={slot.reason || ''}
            onClick={() => {
              if (!isDisabled) onChange(slot.time);
            }}
            className={`rounded-2xl border px-3 py-3 text-sm font-bold transition ${
              isSelected
                ? 'border-espresso bg-espresso text-white'
                : isDisabled
                  ? 'cursor-not-allowed border-stone-200 bg-stone-100 text-stone-400 opacity-75'
                  : 'border-rosegold/25 bg-white text-cocoa hover:bg-blush/40'
            }`}
          >
            <span className="block">{formatSlotTime(slot.time)}</span>

              {isUnavailable && (
              <span className="mt-1 block text-[10px] uppercase tracking-wide">
                Unavailable
              </span>
            )}
          </button>
        );
      })}
    </div>
  );
}
