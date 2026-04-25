/**
 * File: frontend/src/components/Navbar.jsx
 * Purpose: Public website navigation for Touch Threading and Brows Salon.
 * Features: Desktop links, mobile menu, Book Now CTA, active route styling, and salon brand mark.
 * Used by: App.jsx on every public page.
 * Future edits: Add/remove navigation links, change brand text, or update CTA behavior here.
 */

import { Menu, Scissors, X } from 'lucide-react';
import { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';

const links = [
  { to: '/', label: 'Home' },
  { to: '/services', label: 'Services' },
  { to: '/offers', label: 'Offers' },
  { to: '/staff', label: 'Staff' },
  { to: '/gallery', label: 'Gallery' },
  { to: '/reviews', label: 'Reviews' },
  { to: '/contact', label: 'Contact' }
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const linkClass = ({ isActive }) =>
    `rounded-full px-3 py-2 text-sm font-semibold transition ${isActive ? 'bg-blush text-espresso' : 'text-cocoa/75 hover:bg-cream hover:text-espresso'}`;

  return (
    <header className="sticky top-0 z-50 border-b border-rosegold/15 bg-cream/90 backdrop-blur-xl">
      <nav className="salon-container flex h-20 items-center justify-between">
        <Link to="/" className="flex items-center gap-3" onClick={() => setOpen(false)}>
          <span className="grid h-11 w-11 place-items-center rounded-2xl bg-espresso text-gold shadow-salon">
            <Scissors size={20} />
          </span>
          <span>
            <span className="block font-display text-xl font-bold leading-5 text-espresso">Touch Threading</span>
            <span className="block text-xs font-bold uppercase tracking-[0.2em] text-rosegold">& Brows Salon</span>
          </span>
        </Link>

        <div className="hidden items-center gap-1 lg:flex">
          {links.map((link) => (
            <NavLink key={link.to} to={link.to} className={linkClass}>
              {link.label}
            </NavLink>
          ))}
        </div>

        <div className="hidden items-center gap-3 lg:flex">
          <Link to="/book" className="rounded-full bg-espresso px-5 py-3 text-sm font-bold text-white shadow-salon transition hover:-translate-y-0.5">
            Book Now
          </Link>
        </div>

        <button
          type="button"
          onClick={() => setOpen((value) => !value)}
          className="grid h-11 w-11 place-items-center rounded-2xl bg-white text-espresso shadow-sm lg:hidden"
          aria-label="Toggle menu"
        >
          {open ? <X /> : <Menu />}
        </button>
      </nav>

      {open ? (
        <div className="border-t border-rosegold/15 bg-cream px-4 pb-5 lg:hidden">
          <div className="mx-auto grid max-w-md gap-2 pt-4">
            {links.map((link) => (
              <NavLink key={link.to} to={link.to} className={linkClass} onClick={() => setOpen(false)}>
                {link.label}
              </NavLink>
            ))}
            <Link to="/book" onClick={() => setOpen(false)} className="mt-2 rounded-full bg-espresso px-5 py-3 text-center text-sm font-bold text-white">
              Book Appointment
            </Link>
          </div>
        </div>
      ) : null}
    </header>
  );
}
