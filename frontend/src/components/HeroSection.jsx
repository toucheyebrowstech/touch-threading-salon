/**
 * File: frontend/src/components/HeroSection.jsx
 * Purpose: Premium home page hero section for the salon brand.
 * Features: Salon name, tagline, CTA buttons, walk-ins badge, booking speed message, and visual service cards.
 * Used by: Home.jsx.
 * Future edits: Change hero headline, promo text, or visual cards here.
 */

import { CalendarHeart, CheckCircle, MapPin, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function HeroSection() {
  return (
    <section className="overflow-hidden py-14 md:py-20">
      <div className="salon-container grid items-center gap-12 lg:grid-cols-[1.05fr_0.95fr]">
        <div>
          <div className="inline-flex items-center gap-2 rounded-full border border-rosegold/25 bg-white/70 px-4 py-2 text-sm font-bold text-rosegold shadow-sm">
            <Sparkles size={16} /> Walk-ins Welcome · Book in under 60 seconds
          </div>
          <h1 className="mt-6 font-display text-5xl font-bold leading-tight text-espresso md:text-7xl">
            Perfect Brows. Smooth Skin. Effortless Beauty.
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-cocoa/75">
            Touch Threading and Brows Salon brings premium threading, brow shaping, lashes, waxing, facials, and skincare to Carrollton with fast, friendly, clean service.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link to="/book" className="inline-flex items-center justify-center gap-2 rounded-full bg-espresso px-7 py-4 font-bold text-white shadow-salon transition hover:-translate-y-0.5">
              <CalendarHeart size={20} /> Book Appointment
            </Link>
            <Link to="/services" className="inline-flex items-center justify-center gap-2 rounded-full border border-rosegold/35 bg-white px-7 py-4 font-bold text-espresso transition hover:bg-blush/40">
              View Services
            </Link>
          </div>
          <div className="mt-8 grid gap-3 text-sm text-cocoa/75 sm:grid-cols-3">
            {['Clean & hygienic tools', 'Fast brow visits', 'Local Carrollton salon'].map((item) => (
              <p key={item} className="flex items-center gap-2"><CheckCircle size={17} className="text-rosegold" /> {item}</p>
            ))}
          </div>
        </div>

        <div className="relative">
          <div className="absolute -left-8 top-8 hidden rounded-full bg-gold/20 p-8 blur-2xl md:block" />
          <div className="salon-card relative rounded-[2.5rem] p-5">
            <div className="overflow-hidden rounded-[2rem] bg-gradient-to-br from-blush via-cream to-latte p-7">
              <div className="rounded-[2rem] bg-white/75 p-5 shadow-salon">
                <p className="text-sm font-bold uppercase tracking-[0.25em] text-rosegold">Signature Service</p>
                <h3 className="mt-2 font-display text-3xl font-bold text-espresso">Eyebrow Threading</h3>
                <p className="mt-3 text-cocoa/70">Clean shape, soft finish, beautiful frame.</p>
                <div className="mt-5 flex items-end justify-between">
                  <span className="font-display text-5xl font-bold text-espresso">$12</span>
                  <span className="rounded-full bg-espresso px-4 py-2 text-sm font-bold text-white">15 min</span>
                </div>
              </div>
              <div className="mt-5 grid grid-cols-2 gap-4">
                <div className="rounded-3xl bg-white/70 p-4">
                  <p className="font-bold text-espresso">Brow + Upper Lip</p>
                  <p className="mt-1 text-sm text-cocoa/65">Popular combo</p>
                </div>
                <div className="rounded-3xl bg-white/70 p-4">
                  <p className="font-bold text-espresso">Lash Lift + Tint</p>
                  <p className="mt-1 text-sm text-cocoa/65">Soft glam</p>
                </div>
              </div>
              <p className="mt-5 flex items-center gap-2 rounded-full bg-white/70 px-4 py-3 text-sm font-bold text-cocoa">
                <MapPin size={17} className="text-rosegold" /> Near Albertsons on N Josey Ln
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
