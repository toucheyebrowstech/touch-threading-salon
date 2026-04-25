/**
 * File: frontend/src/pages/NotFound.jsx
 * Purpose: Public 404 page for unknown frontend routes.
 * Features: Friendly missing-page message and navigation back to home or booking.
 * Used by: Wildcard route * in App.jsx.
 * Future edits: Add search, service links, or custom illustration here.
 */

import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <main className="grid min-h-[60vh] place-items-center py-16">
      <div className="salon-container max-w-2xl text-center">
        <p className="text-sm font-bold uppercase tracking-[0.25em] text-rosegold">404</p>
        <h1 className="mt-3 font-display text-5xl font-bold text-espresso">This page needs a brow touch-up.</h1>
        <p className="mt-5 text-cocoa/70">The page you opened does not exist. Head back home or book your appointment.</p>
        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
          <Link to="/" className="rounded-full bg-espresso px-6 py-3 font-bold text-white">Go Home</Link>
          <Link to="/book" className="rounded-full border border-rosegold/35 bg-white px-6 py-3 font-bold text-espresso">Book Appointment</Link>
        </div>
      </div>
    </main>
  );
}
