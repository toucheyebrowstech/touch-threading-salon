/**
 * File: frontend/src/components/LoadingSpinner.jsx
 * Purpose: Small reusable loading indicator for public website data states.
 * Features: Animated salon-colored spinner and optional label.
 * Used by: Services, offers, staff, booking, reviews, and contact-related loading sections.
 * Future edits: Change loading animation or text style here.
 */

export default function LoadingSpinner({ label = 'Loading...' }) {
  return (
    <div className="flex items-center justify-center gap-3 py-8 text-cocoa/70">
      <span className="h-5 w-5 animate-spin rounded-full border-2 border-rosegold border-t-transparent" />
      <span className="text-sm font-semibold">{label}</span>
    </div>
  );
}
