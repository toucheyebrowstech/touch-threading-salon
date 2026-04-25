/**
 * File: frontend/src/components/Toast.jsx
 * Purpose: Reusable notification banner for public forms.
 * Features: Success/error styling, message text, and accessible status role.
 * Used by: Appointment, review, and contact forms.
 * Future edits: Add auto-dismiss, icons, or stacked toast behavior here.
 */

export default function Toast({ type = 'success', message }) {
  if (!message) return null;
  const tone = type === 'error' ? 'border-red-200 bg-red-50 text-red-700' : 'border-green-200 bg-green-50 text-green-700';
  return (
    <div role="status" className={`rounded-2xl border px-4 py-3 text-sm font-semibold ${tone}`}>
      {message}
    </div>
  );
}
