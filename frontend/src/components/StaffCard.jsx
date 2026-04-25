/**
 * File: frontend/src/components/StaffCard.jsx
 * Purpose: Displays one salon worker profile card.
 * Features: Placeholder avatar, role, specialties, working days, bio, and booking CTA.
 * Used by: Staff page and booking worker selection context.
 * Future edits: Replace placeholder avatar with real staff images or add schedule badges here.
 */

import { UserRound } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function StaffCard({ staff }) {
  return (
    <article className="salon-card rounded-[2rem] p-6 text-center">
      <div className="mx-auto grid h-24 w-24 place-items-center overflow-hidden rounded-full bg-gradient-to-br from-blush to-latte text-espresso">
        {staff.imageUrl ? <img src={staff.imageUrl} alt={staff.name} className="h-full w-full object-cover" /> : <UserRound size={38} />}
      </div>
      <h3 className="mt-5 font-display text-2xl font-bold text-espresso">{staff.name}</h3>
      <p className="mt-1 font-bold text-rosegold">{staff.role}</p>
      <p className="mt-4 leading-7 text-cocoa/72">{staff.bio}</p>
      <div className="mt-5 flex flex-wrap justify-center gap-2">
        {(staff.specialties || []).map((item) => (
          <span key={item} className="rounded-full bg-cream px-3 py-1 text-xs font-bold text-cocoa/75">{item}</span>
        ))}
      </div>
      <p className="mt-5 text-sm text-cocoa/60">Working: {(staff.workingDays || []).join(', ')}</p>
      <Link to={`/book?staff=${staff._id}`} className="mt-6 inline-flex rounded-full bg-espresso px-5 py-3 text-sm font-bold text-white">
        Book with {staff.name.split(' ')[0]}
      </Link>
    </article>
  );
}
