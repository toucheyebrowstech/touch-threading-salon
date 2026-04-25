/**
 * File: frontend/src/components/ReviewCard.jsx
 * Purpose: Displays one approved customer review.
 * Features: Rating stars, customer name, message, and soft testimonial styling.
 * Used by: Home testimonials preview and Reviews page.
 * Future edits: Add review dates, service names, or verified badges here.
 */

import { Quote } from 'lucide-react';
import { stars } from '../utils/formatters';

export default function ReviewCard({ review }) {
  return (
    <article className="salon-card rounded-[2rem] p-6">
      <Quote className="text-rosegold" />
      <p className="mt-4 text-lg leading-8 text-cocoa/78">“{review.message}”</p>
      <div className="mt-5 flex items-center justify-between gap-4">
        <strong className="text-espresso">{review.customerName}</strong>
        <span className="tracking-widest text-gold">{stars(review.rating)}</span>
      </div>
    </article>
  );
}
