/**
 * File: frontend/src/pages/Offers.jsx
 * Purpose: Public offers and promotions page.
 * Features: Editable backend offers, first-time/customer/student/combo/monthly/loyalty/referral offer cards, and booking CTA.
 * Used by: Route /offers in App.jsx.
 * Future edits: Change offer sorting, promo disclaimers, or CTA copy here.
 */

import { Link } from 'react-router-dom';
import { salonApi } from '../api/salonApi';
import OfferCard from '../components/OfferCard';
import SectionTitle from '../components/SectionTitle';
import LoadingSpinner from '../components/LoadingSpinner';
import { fallbackOffers } from '../data/fallbackData';
import { usePublicData } from '../hooks/usePublicData';

export default function Offers() {
  const { data: offers, loading } = usePublicData(salonApi.getOffers, fallbackOffers);

  return (
    <main className="py-16">
      <div className="salon-container">
        <SectionTitle eyebrow="Offers" title="Specials for new and returning guests" description="These offers are easy to edit from the backend and admin dashboard. Ask in salon for final eligibility and current monthly specials." />
        {loading ? <LoadingSpinner label="Loading offers..." /> : null}
        <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {offers.map((offer) => <OfferCard key={offer._id} offer={offer} />)}
        </div>
        <div className="mt-12 rounded-[2rem] bg-espresso p-8 text-center text-white shadow-salon">
          <h2 className="font-display text-3xl font-bold">Ready for your next brow visit?</h2>
          <p className="mx-auto mt-3 max-w-2xl text-cream/80">Book online, walk in when nearby, or call ahead for combo packages and monthly specials.</p>
          <Link to="/book" className="mt-6 inline-flex rounded-full bg-gold px-7 py-4 font-bold text-espresso">Book Appointment</Link>
        </div>
      </div>
    </main>
  );
}
