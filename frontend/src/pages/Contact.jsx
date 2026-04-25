/**
 * File: frontend/src/pages/Contact.jsx
 * Purpose: Public contact and location page.
 * Features: Contact form, salon address, phone/email/social links, hours, map placeholder, and directions CTA.
 * Used by: Route /contact in App.jsx.
 * Future edits: Add real Google Maps iframe, updated contact details, or live chat widget here.
 */

import { Camera as Instagram, Globe as Facebook, Mail, MapPin, Phone } from "lucide-react";
import ContactForm from '../components/ContactForm';
import SectionTitle from '../components/SectionTitle';
import { businessInfo } from '../data/fallbackData';

export default function Contact() {
  return (
    <main className="py-16">
      <div className="salon-container">
        <SectionTitle eyebrow="Contact" title="Call, visit, or send a message" description="Walk-ins are welcome, appointments are recommended, and we are easy to reach for questions about services, pricing, or booking." />
        <div className="mt-10 grid gap-8 lg:grid-cols-[0.85fr_1.15fr]">
          <aside className="space-y-5">
            <div className="salon-card rounded-[2rem] p-6">
              <h2 className="font-display text-3xl font-bold text-espresso">Salon Info</h2>
              <div className="mt-5 space-y-4 text-cocoa/75">
                <p className="flex gap-3"><MapPin className="shrink-0 text-rosegold" /> {businessInfo.address}</p>
                <p className="flex gap-3"><Phone className="shrink-0 text-rosegold" /> {businessInfo.phone}</p>
                <p className="flex gap-3"><Mail className="shrink-0 text-rosegold" /> {businessInfo.email}</p>
              </div>
              <div className="mt-6 flex gap-3">
                <a href={businessInfo.instagram} className="grid h-11 w-11 place-items-center rounded-full bg-blush text-espresso" aria-label="Instagram"><Instagram size={18} /></a>
                <a href={businessInfo.facebook} className="grid h-11 w-11 place-items-center rounded-full bg-blush text-espresso" aria-label="Facebook"><Facebook size={18} /></a>
              </div>
            </div>
            <div className="salon-card rounded-[2rem] p-6">
              <h2 className="font-display text-3xl font-bold text-espresso">Hours</h2>
              <div className="mt-5 space-y-2 text-cocoa/75">{businessInfo.hours.map((row) => <p key={row.day}><strong>{row.day}:</strong> {row.time}</p>)}</div>
            </div>
          </aside>
          <ContactForm />
        </div>
        <div className="mt-10 grid min-h-80 place-items-center rounded-[2rem] border border-dashed border-rosegold/35 bg-cream p-8 text-center text-cocoa/70">
          Google Maps embed placeholder for {businessInfo.address}
        </div>
      </div>
    </main>
  );
}
