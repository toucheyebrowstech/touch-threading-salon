/**
 * File: frontend/src/components/SectionTitle.jsx
 * Purpose: Reusable heading block for public website sections.
 * Features: Eyebrow label, title, description, centered/left alignment, and decorative gold line.
 * Used by: Home, Services, Offers, Staff, About, Gallery, Reviews, Contact, and Booking pages.
 * Future edits: Change section heading style or typography here.
 */

export default function SectionTitle({ eyebrow, title, description, center = true }) {
  return (
    <div className={center ? 'mx-auto max-w-3xl text-center' : 'max-w-3xl'}>
      {eyebrow ? <p className="text-sm font-bold uppercase tracking-[0.25em] text-rosegold">{eyebrow}</p> : null}
      <h2 className="mt-3 font-display text-3xl font-bold text-espresso md:text-5xl">{title}</h2>
      <div className={`gold-line mt-4 ${center ? 'mx-auto' : ''}`} />
      {description ? <p className="mt-5 text-base leading-8 text-cocoa/75 md:text-lg">{description}</p> : null}
    </div>
  );
}
