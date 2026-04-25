/**
 * File: frontend/src/components/Footer.jsx
 * Purpose: Public website footer with salon contact, hours, quick links, and social links.
 * Features: Address, phone/email placeholders, business hours, navigation links, and local trust copy.
 * Used by: App.jsx on every public page.
 * Future edits: Update phone, email, social URLs, or footer service links here.
 */

import { Facebook, Instagram, MapPin, Phone, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';
import { businessInfo } from '../data/fallbackData';

export default function Footer() {
  return (
    <footer className="bg-espresso pb-24 pt-14 text-cream md:pb-10">
      <div className="salon-container grid gap-10 md:grid-cols-[1.4fr_1fr_1fr]">
        <div>
          <div className="flex items-center gap-3">
            <span className="grid h-12 w-12 place-items-center rounded-2xl bg-gold/20 text-gold">
              <Sparkles />
            </span>
            <div>
              <h2 className="font-display text-2xl font-bold">{businessInfo.name}</h2>
              <p className="text-sm text-cream/70">{businessInfo.tagline}</p>
            </div>
          </div>
          <p className="mt-5 max-w-md leading-7 text-cream/72">
            A warm local brow bar in Carrollton for threading, brows, lashes, waxing, facials, and skincare.
            Walk-ins are welcome, but booking helps you get your favorite time.
          </p>
          <div className="mt-5 flex gap-3">
            <a href={businessInfo.instagram} className="grid h-10 w-10 place-items-center rounded-full bg-white/10 text-cream hover:bg-white/20" aria-label="Instagram">
              <Instagram size={18} />
            </a>
            <a href={businessInfo.facebook} className="grid h-10 w-10 place-items-center rounded-full bg-white/10 text-cream hover:bg-white/20" aria-label="Facebook">
              <Facebook size={18} />
            </a>
          </div>
        </div>

        <div>
          <h3 className="font-bold text-white">Visit Us</h3>
          <div className="mt-4 space-y-3 text-sm text-cream/75">
            <p className="flex gap-2"><MapPin size={18} className="shrink-0 text-gold" /> {businessInfo.address}</p>
            <p className="flex gap-2"><Phone size={18} className="shrink-0 text-gold" /> {businessInfo.phone}</p>
            <Link to="/contact" className="inline-block font-bold text-gold">Get directions →</Link>
          </div>
        </div>

        <div>
          <h3 className="font-bold text-white">Quick Links</h3>
          <div className="mt-4 grid gap-2 text-sm text-cream/75">
            <Link to="/services">Services & Prices</Link>
            <Link to="/offers">Offers</Link>
            <Link to="/book">Book Appointment</Link>
            <Link to="/reviews">Reviews</Link>
            <Link to="/contact">Contact</Link>
          </div>
          <div className="mt-5 text-sm text-cream/75">
            {businessInfo.hours.map((row) => (
              <p key={row.day}><strong>{row.day}:</strong> {row.time}</p>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
