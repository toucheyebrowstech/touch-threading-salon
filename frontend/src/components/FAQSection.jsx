/**
 * File: frontend/src/components/FAQSection.jsx
 * Purpose: Public FAQ section for common salon questions.
 * Features: Responsive question cards with short customer-friendly answers.
 * Used by: Home.jsx and About.jsx.
 * Future edits: Update FAQs or replace static data with backend settings here.
 */

import { faqs } from '../data/fallbackData';
import SectionTitle from './SectionTitle';

export default function FAQSection() {
  return (
    <section className="py-16">
      <div className="salon-container">
        <SectionTitle eyebrow="Questions" title="Before your visit" description="Clear answers so your brow or skincare visit feels easy from the start." />
        <div className="mt-10 grid gap-4 md:grid-cols-2">
          {faqs.map((item) => (
            <div key={item.question} className="salon-card rounded-[2rem] p-6">
              <h3 className="font-display text-xl font-bold text-espresso">{item.question}</h3>
              <p className="mt-3 leading-7 text-cocoa/72">{item.answer}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
