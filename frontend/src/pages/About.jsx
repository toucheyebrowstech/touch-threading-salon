/**
 * File: frontend/src/pages/About.jsx
 * Purpose: Public about page for Touch Threading and Brows Salon.
 * Features: Salon story, hygiene/sanitation section, walk-in note, repeat customer tone, and location context near Albertsons.
 * Used by: Route /about in App.jsx.
 * Future edits: Update owner story, values, or local neighborhood details here.
 */

import { Link } from 'react-router-dom';
import { Droplets, Heart, MapPinned, ShieldCheck } from 'lucide-react';
import FAQSection from '../components/FAQSection';
import SectionTitle from '../components/SectionTitle';

export default function About() {
  return (
    <main>
      <section className="py-16">
        <div className="salon-container grid items-center gap-10 lg:grid-cols-2">
          <div>
            <SectionTitle center={false} eyebrow="About Us" title="A local brow salon built around clean, fast, friendly beauty" description="Touch Threading and Brows Salon is a Carrollton beauty stop for professional eyebrow threading, facial grooming, brows, lashes, waxing, facials, and skincare." />
            <p className="mt-6 leading-8 text-cocoa/75">Our goal is simple: help every guest feel polished without making beauty appointments complicated. Whether you visit for a quick brow clean-up or a relaxing facial, we keep the experience warm, efficient, and detail-focused.</p>
            <p className="mt-4 leading-8 text-cocoa/75">Most customers return every 2-3 weeks to maintain their brow shape. Walk-ins are welcome, and online booking is available when you want to reserve your time ahead.</p>
            <Link to="/book" className="mt-7 inline-flex rounded-full bg-espresso px-7 py-4 font-bold text-white">Book Appointment</Link>
          </div>
          <div className="salon-card rounded-[2.5rem] bg-gradient-to-br from-blush to-cream p-8">
            <h3 className="font-display text-3xl font-bold text-espresso">Near Albertsons on N Josey Ln</h3>
            <p className="mt-4 leading-8 text-cocoa/75">Our grocery-anchored location makes it easy to stop in before errands, after work, or during your weekend routine.</p>
            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              {[{ icon: ShieldCheck, title: 'Clean tools' }, { icon: Droplets, title: 'Sanitized space' }, { icon: Heart, title: 'Friendly service' }, { icon: MapPinned, title: 'Easy location' }].map((item) => (
                <div key={item.title} className="rounded-3xl bg-white/70 p-5"><item.icon className="text-rosegold" /><p className="mt-3 font-bold text-espresso">{item.title}</p></div>
              ))}
            </div>
          </div>
        </div>
      </section>

        <section className="bg-white/65 py-16">
        <div className="salon-container">
          <SectionTitle eyebrow="Hygiene" title="Clean beauty matters" description="Threading and skincare are close-contact services. We care about clean tools, safe handling, tidy treatment areas, and a comfortable guest experience." />
          <div className="mt-10 grid gap-5 md:grid-cols-3">
            {['Fresh, careful service for every guest', 'Clean treatment surfaces and organized supplies', 'Customer-first pace without rushing your result'].map((text) => (
              <div key={text} className="salon-card rounded-[2rem] p-6 text-center font-semibold text-cocoa/78">{text}</div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-14">
        <div className="salon-container">
          <div className="salon-card rounded-[2rem] bg-espresso p-7 text-center text-cream">
            <p className="text-sm font-bold uppercase tracking-[0.25em] text-gold">Powered by Neptrixx</p>
            <p className="mx-auto mt-3 max-w-3xl leading-8 text-cream/78">
              Touch Threading & Brows Salon uses Neptrixx-powered digital tools to make booking,
              reviews, and customer updates faster and easier.
            </p>
          </div>
        </div>
      </section>

      <FAQSection />
    </main>
  );
}
