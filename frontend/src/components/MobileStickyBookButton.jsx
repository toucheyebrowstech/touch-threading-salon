/**
 * File: frontend/src/components/MobileStickyBookButton.jsx
 * Purpose: Persistent mobile call-to-action for fast appointment booking.
 * Features: Bottom sticky Book Now button visible on small screens only.
 * Used by: App layout across all public pages.
 * Future edits: Change CTA text, destination, or mobile behavior here.
 */

import { CalendarHeart } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function MobileStickyBookButton() {
  return (
    <div className="fixed bottom-4 left-0 right-0 z-40 px-4 md:hidden">
      <Link
        to="/book"
        className="mx-auto flex max-w-sm items-center justify-center gap-2 rounded-full bg-espresso px-6 py-4 text-sm font-bold text-white shadow-salon"
      >
        <CalendarHeart size={18} /> Book Appointment
      </Link>
    </div>
  );
}
