/**
 * File: frontend/src/pages/Gallery.jsx
 * Purpose: Public gallery page for brows, lashes, facials, and salon interior visuals.
 * Features: Filter tabs, before/after style section, placeholder image grid, and easy image replacement source.
 * Used by: Route /gallery in App.jsx.
 * Future edits: Replace placeholder images in fallbackData.js or connect gallery to backend later.
 */

import { useMemo, useState } from 'react';
import SectionTitle from '../components/SectionTitle';
import { galleryItems } from '../data/fallbackData';

const tabs = ['All', 'Brows', 'Lashes', 'Facials', 'Salon'];

export default function Gallery() {
  const [tab, setTab] = useState('All');
  const items = useMemo(() => (tab === 'All' ? galleryItems : galleryItems.filter((item) => item.category === tab)), [tab]);

  return (
    <main className="py-16">
      <div className="salon-container">
        <SectionTitle eyebrow="Gallery" title="Brows, lashes, facials, and salon moments" description="Placeholder visuals are included now so real salon photos can be replaced later without redesigning the page." />
        <div className="mt-8 flex flex-wrap justify-center gap-2">
          {tabs.map((item) => (
            <button key={item} onClick={() => setTab(item)} className={`rounded-full px-5 py-2 text-sm font-bold ${tab === item ? 'bg-espresso text-white' : 'bg-white text-cocoa'}`}>{item}</button>
          ))}
        </div>
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((item) => (
            <figure key={item.id} className="salon-card overflow-hidden rounded-[2rem]">
              <img src={item.image} alt={item.title} className="h-72 w-full object-cover" />
              <figcaption className="p-5"><p className="text-sm font-bold uppercase tracking-[0.2em] text-rosegold">{item.category}</p><h3 className="mt-2 font-display text-2xl font-bold text-espresso">{item.title}</h3></figcaption>
            </figure>
          ))}
        </div>
      </div>
    </main>
  );
}
