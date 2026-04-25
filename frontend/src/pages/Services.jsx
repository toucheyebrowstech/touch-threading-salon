/**
 * File: frontend/src/pages/Services.jsx
 * Purpose: Public services and prices page.
 * Features: Category-grouped service cards, backend-loaded prices, descriptions, durations, and booking CTAs.
 * Used by: Route /services in App.jsx.
 * Future edits: Adjust category display order, card layout, or service page intro here.
 */

import { salonApi } from '../api/salonApi';
import EmptyState from '../components/EmptyState';
import LoadingSpinner from '../components/LoadingSpinner';
import SectionTitle from '../components/SectionTitle';
import ServiceCard from '../components/ServiceCard';
import { fallbackServices } from '../data/fallbackData';
import { usePublicData } from '../hooks/usePublicData';
import { groupByCategory } from '../utils/formatters';

const categoryOrder = ['Threading', 'Brow Services', 'Lash Services', 'Waxing', 'Facials and Skincare'];

export default function Services() {
  const { data: services, loading } = usePublicData(salonApi.getServices, fallbackServices);
  const grouped = groupByCategory(services);

  return (
    <main className="py-16">
      <div className="salon-container">
        <SectionTitle eyebrow="Services & Prices" title="Easy-to-book beauty services" description="Browse threading, brow, lash, waxing, facial, and skincare services. Every service includes a clear price, estimated duration, and direct booking button." />
        {loading ? <LoadingSpinner label="Loading services..." /> : null}
        {!services.length ? <EmptyState title="No services found" message="Please seed the backend or add services from the admin dashboard in Phase 3." /> : null}
        <div className="mt-12 space-y-14">
          {categoryOrder.filter((category) => grouped[category]).map((category) => (
            <section key={category}>
              <div className="mb-6 flex items-center gap-4">
                <h2 className="font-display text-3xl font-bold text-espresso">{category}</h2>
                <div className="h-px flex-1 bg-rosegold/20" />
              </div>
              <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
                {grouped[category].map((service) => <ServiceCard key={service._id} service={service} />)}
              </div>
            </section>
          ))}
        </div>
      </div>
    </main>
  );
}
