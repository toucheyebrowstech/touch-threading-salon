/**
 * File: frontend/src/components/OfferCard.jsx
 * Purpose: Displays one salon promotion or discount card.
 * Features: Featured badge, title, subtitle, description, discount label, and booking CTA.
 * Used by: Home offers preview and Offers page.
 * Future edits: Change offer card style, labels, or promo display logic here.
 */

import { Gift } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function OfferCard({ offer }) {
  return (
    <article className="salon-card relative overflow-hidden rounded-[2rem] p-6">
      {offer.isFeatured ? <span className="absolute right-5 top-5 rounded-full bg-gold px-3 py-1 text-xs font-bold text-espresso">Featured</span> : null}
      <span className="grid h-12 w-12 place-items-center rounded-2xl bg-blush text-espresso">
        <Gift size={22} />
      </span>
      <p className="mt-5 text-sm font-bold uppercase tracking-[0.2em] text-rosegold">{offer.subtitle || 'Salon offer'}</p>
      <h3 className="mt-2 font-display text-2xl font-bold text-espresso">{offer.title}</h3>
      <p className="mt-3 leading-7 text-cocoa/72">{offer.description}</p>
      <div className="mt-5 flex items-center justify-between gap-4">
        <span className="rounded-full bg-cream px-4 py-2 text-sm font-bold text-cocoa">{offer.discountText || 'Special'}</span>
        <Link to="/book" className="text-sm font-bold text-rosegold">Book now →</Link>
      </div>
    </article>
  );
}
