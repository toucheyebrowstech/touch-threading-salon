/**
 * File: frontend/src/components/QuickBookSection.jsx
 * Purpose: Compact booking CTA section that encourages fast appointments.
 * Features: Benefit bullets, under-60-seconds message, and appointment form embed.
 * Used by: Home.jsx.
 * Future edits: Change quick booking copy or remove embedded form here.
 */

import { BadgeCheck, Clock3, HeartHandshake } from 'lucide-react';
import AppointmentForm from './AppointmentForm';
import SectionTitle from './SectionTitle';

export default function QuickBookSection({ services, staff }) {
  return (
    <section className="py-16">
      <div className="salon-container grid gap-10 lg:grid-cols-[0.9fr_1.1fr]">
        <div>
          <SectionTitle center={false} eyebrow="Quick Book" title="Book in under 60 seconds" description="Choose your service, worker, date, and time. We will receive your request and confirm it soon." />
          <div className="mt-8 grid gap-4">
            {[
              { icon: Clock3, title: 'Fast appointments', text: 'Threading visits are quick and easy to fit into your day.' },
              { icon: BadgeCheck, title: 'Walk-ins welcome', text: 'Appointments are recommended, but walk-ins are always welcome.' },
              { icon: HeartHandshake, title: 'Friendly cancellation note', text: 'Call ahead if plans change so we can open the slot for another guest.' }
            ].map((item) => (
              <div key={item.title} className="flex gap-4 rounded-3xl bg-white/75 p-5 shadow-sm">
                <span className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-blush text-espresso"><item.icon /></span>
                <div><h3 className="font-bold text-espresso">{item.title}</h3><p className="mt-1 text-cocoa/70">{item.text}</p></div>
              </div>
            ))}
          </div>
        </div>
        <AppointmentForm compact services={services} staff={staff} />
      </div>
    </section>
  );
}
