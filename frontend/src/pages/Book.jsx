/**
 * File: frontend/src/pages/Book.jsx
 * Purpose: Public appointment booking page.
 * Features: Full booking form, business hours, walk-in note, cancellation note, and backend appointment creation.
 * Used by: Route /book in App.jsx.
 * Future edits: Add multi-service selection, payment/deposit option, or calendar embed here.
 */

import AppointmentForm from '../components/AppointmentForm';
import SectionTitle from '../components/SectionTitle';
import { salonApi } from '../api/salonApi';
import { fallbackServices, fallbackStaff, businessInfo } from '../data/fallbackData';
import { usePublicData } from '../hooks/usePublicData';

export default function Book() {
  const { data: services } = usePublicData(salonApi.getServices, fallbackServices);
  const { data: staff } = usePublicData(salonApi.getStaff, fallbackStaff);

  return (
    <main className="py-16">
      <div className="salon-container grid gap-10 lg:grid-cols-[0.8fr_1.2fr]">
        <aside>
          <SectionTitle center={false} eyebrow="Appointments" title="Book your visit" description="Choose a service, worker, date, and available time. We will confirm your request soon." />
          <div className="mt-8 rounded-[2rem] bg-white/80 p-6 shadow-sm">
            <h3 className="font-display text-2xl font-bold text-espresso">Business Hours</h3>
            <div className="mt-4 space-y-2 text-cocoa/75">
              {businessInfo.hours.map((row) => <p key={row.day}><strong>{row.day}:</strong> {row.time}</p>)}
            </div>
            <p className="mt-5 rounded-2xl bg-blush/45 p-4 text-sm leading-6 text-cocoa/75">Time slots are every 15 minutes. Booking outside business hours is blocked automatically.</p>
          </div>
        </aside>
        <AppointmentForm services={services} staff={staff} />
      </div>
    </main>
  );
}
