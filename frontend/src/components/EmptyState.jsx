/**
 * File: frontend/src/components/EmptyState.jsx
 * Purpose: Reusable empty/error content block for public pages.
 * Features: Soft card styling, title, message, and optional action slot.
 * Used by: Data-driven public pages when API data is empty or unavailable.
 * Future edits: Update empty-state design or default wording here.
 */

export default function EmptyState({ title = 'Nothing here yet', message = 'Please check again soon.', children }) {
  return (
    <div className="salon-card rounded-[2rem] p-8 text-center">
      <h3 className="font-display text-2xl font-bold text-espresso">{title}</h3>
      <p className="mx-auto mt-3 max-w-xl text-cocoa/70">{message}</p>
      {children ? <div className="mt-5">{children}</div> : null}
    </div>
  );
}
