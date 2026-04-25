/**
 * File: frontend/src/pages/Home.jsx
 * Purpose: Public home page for Touch Threading and Brows Salon.
 * Features: Hero, service preview, promo preview, why-choose-us, testimonials, location preview, loyalty/referral, FAQ, and quick booking.
 * Used by: Route / in App.jsx.
 * Future edits: Update homepage marketing sections, CTA order, or preview counts here.
 */

import { Link } from 'react-router-dom';
import { MapPin, ShieldCheck, Sparkles, Timer, UsersRound } from 'lucide-react';
import HeroSection from '../components/HeroSection';
import SectionTitle from '../components/SectionTitle';
import ServiceCard from '../components/ServiceCard';
import OfferCard from '../components/OfferCard';
import ReviewCard from '../components/ReviewCard';
import FAQSection from '../components/FAQSection';
import QuickBookSection from '../components/QuickBookSection';
import { salonApi } from '../api/salonApi';
import { fallbackOffers, fallbackReviews, fallbackServices, fallbackStaff, businessInfo } from '../data/fallbackData';
import { usePublicData } from '../hooks/usePublicData';

export default function Home() {
  const { data: services } = usePublicData(salonApi.getServices, fallbackServices);
  const { data: offers } = usePublicData(salonApi.getOffers, fallbackOffers);
  const { data: staff } = usePublicData(salonApi.getStaff, fallbackStaff);
  const { data: reviews } = usePublicData(salonApi.getPublicReviews, fallbackReviews);

  return (
    <>
      <HeroSection />

      <section className="py-16">
        <div className="salon-container">
          <SectionTitle eyebrow="Popular Services" title="Brow, lash, waxing, and skincare favorites" description="Prices are clear, booking is simple, and every service is designed to help you leave polished and confident." />
          <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {services.slice(0, 6).map((service) => <ServiceCard key={service._id} service={service} />)}
          </div>
          <div className="mt-8 text-center"><Link to="/services" className="font-bold text-rosegold">View all services →</Link></div>
        </div>
      </section>

      <section className="bg-white/65 py-16">
        <div className="salon-container">
          <SectionTitle eyebrow="Current Offers" title="Beauty deals worth booking" description="Ask about first-time customer specials, combo packages, loyalty rewards, and referral savings." />
          <div className="mt-10 grid gap-5 md:grid-cols-3">
            {offers.slice(0, 3).map((offer) => <OfferCard key={offer._id} offer={offer} />)}
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="salon-container grid gap-8 lg:grid-cols-4">
          {[
            { icon: ShieldCheck, title: 'Clean & Safe', text: 'Hygienic tools, clean treatment areas, and careful service.' },
            { icon: Timer, title: 'Quick Visits', text: 'Most brow clean-ups are fast enough for a lunch break.' },
            { icon: Sparkles, title: 'Premium Results', text: 'A warm brow bar look without confusing booking steps.' },
            { icon: UsersRound, title: 'Repeat Friendly', text: 'Most customers return every 2-3 weeks for maintenance.' }
          ].map((item) => (
            <div key={item.title} className="salon-card rounded-[2rem] p-6">
              <span className="grid h-12 w-12 place-items-center rounded-2xl bg-blush text-espresso"><item.icon /></span>
              <h3 className="mt-5 font-display text-2xl font-bold text-espresso">{item.title}</h3>
              <p className="mt-3 leading-7 text-cocoa/72">{item.text}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-cream py-16">
        <div className="salon-container grid gap-8 md:grid-cols-2">
          <div className="salon-card rounded-[2rem] p-8">
            <h2 className="font-display text-3xl font-bold text-espresso">Loyalty Program</h2>
            <p className="mt-4 leading-7 text-cocoa/72">Buy 5 eyebrow threading visits and get 1 free. Perfect for guests who keep their brows shaped every 2-3 weeks.</p>
            <Link to="/offers" className="mt-5 inline-block font-bold text-rosegold">See loyalty details →</Link>
          </div>
          <div className="salon-card rounded-[2rem] p-8">
            <h2 className="font-display text-3xl font-bold text-espresso">Referral Program</h2>
            <p className="mt-4 leading-7 text-cocoa/72">Refer a friend and both of you can enjoy a salon discount. Bring someone new to your favorite brow spot.</p>
            <Link to="/offers" className="mt-5 inline-block font-bold text-rosegold">View referral offer →</Link>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="salon-container">
          <SectionTitle eyebrow="Testimonials" title="What guests are saying" description="Real reviews are shown after owner approval so the public page stays trustworthy and clean." />
          <div className="mt-10 grid gap-5 md:grid-cols-3">{reviews.slice(0, 3).map((review) => <ReviewCard key={review._id} review={review} />)}</div>
        </div>
      </section>

      <section className="bg-white/65 py-16">
        <div className="salon-container grid gap-8 lg:grid-cols-2">
          <div>
            <SectionTitle center={false} eyebrow="Location" title="Easy Carrollton beauty stop" description="Convenient grocery-anchored location near Albertsons on N Josey Lane. Book ahead or walk in when you are nearby." />
            <p className="mt-6 flex gap-2 text-lg font-bold text-espresso"><MapPin className="text-rosegold" /> {businessInfo.address}</p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link to="/contact" className="rounded-full bg-espresso px-6 py-3 font-bold text-white">Contact & Directions</Link>
              <Link to="/book" className="rounded-full border border-rosegold/35 bg-white px-6 py-3 font-bold text-espresso">Book Now</Link>
            </div>
          </div>
          <div className="grid min-h-72 place-items-center rounded-[2rem] border border-dashed border-rosegold/35 bg-cream text-center text-cocoa/70">
            Google Maps embed placeholder
          </div>
        </div>
      </section>

      <QuickBookSection services={services} staff={staff} />
      <FAQSection />
    </>
  );
}
