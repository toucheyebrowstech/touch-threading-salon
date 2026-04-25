/**
 * File: frontend/src/components/ServiceCard.jsx
 * Purpose: Displays one salon service with price, duration, description, and booking CTA.
 * Features: Category label, formatted price, duration badge, description, and Book button.
 * Used by: Home service preview, Services page, and QuickBook section.
 * Future edits: Change service card styling or add service icons here.
 */

import { Clock } from 'lucide-react';
import { Link } from 'react-router-dom';
import { formatPrice } from '../utils/formatters';

export default function ServiceCard({ service }) {
  return (
    <article className="salon-card flex h-full flex-col rounded-[2rem] p-5 transition hover:-translate-y-1">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-rosegold">{service.category}</p>
          <h3 className="mt-2 font-display text-2xl font-bold text-espresso">{service.name}</h3>
        </div>
        <span className="rounded-full bg-blush px-4 py-2 font-display text-xl font-bold text-espresso">{formatPrice(service.price)}</span>
      </div>
      <p className="mt-4 flex items-center gap-2 text-sm font-semibold text-cocoa/65">
        <Clock size={16} className="text-rosegold" /> {service.durationMinutes || 15} minutes
      </p>
      <p className="mt-4 flex-1 leading-7 text-cocoa/72">{service.description}</p>
      <Link to={`/book?service=${service._id}`} className="mt-5 rounded-full bg-espresso px-5 py-3 text-center text-sm font-bold text-white transition hover:bg-cocoa">
        Book this service
      </Link>
    </article>
  );
}
