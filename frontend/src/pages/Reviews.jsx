/**
 * File: frontend/src/pages/Reviews.jsx
 * Purpose: Public reviews page with customer testimonials and review submission.
 * Features: Approved reviews from backend, fallback testimonials, rating input, review form, and approval notice.
 * Used by: Route /reviews in App.jsx.
 * Future edits: Add Google reviews embed, photo reviews, or review moderation wording here.
 */

import { useState } from 'react';
import { salonApi } from '../api/salonApi';
import ReviewCard from '../components/ReviewCard';
import SectionTitle from '../components/SectionTitle';
import Toast from '../components/Toast';
import LoadingSpinner from '../components/LoadingSpinner';
import { fallbackReviews } from '../data/fallbackData';
import { usePublicData } from '../hooks/usePublicData';

const initial = { customerName: '', rating: 5, message: '' };

export default function Reviews() {
  const { data: reviews, loading } = usePublicData(salonApi.getPublicReviews, fallbackReviews);
  const [form, setForm] = useState(initial);
  const [submitting, setSubmitting] = useState(false);
  const [toast, setToast] = useState({ type: '', message: '' });

  const submit = async (event) => {
    event.preventDefault();
    try {
      setSubmitting(true);
      const result = await salonApi.submitReview(form);
      setToast({ type: 'success', message: result.message || 'Thank you. Your review is pending approval.' });
      setForm(initial);
    } catch (err) {
      setToast({ type: 'error', message: err?.response?.data?.message || 'Could not submit review. Please try again.' });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <main className="py-16">
      <div className="salon-container">
        <SectionTitle eyebrow="Reviews" title="Guest love for Touch Threading" description="Approved reviews appear publicly. New reviews are sent to the backend and can be approved from the admin dashboard in Phase 3." />
        {loading ? <LoadingSpinner label="Loading reviews..." /> : null}
        <div className="mt-10 grid gap-5 md:grid-cols-3">{reviews.map((review) => <ReviewCard key={review._id} review={review} />)}</div>

        <section className="mx-auto mt-14 max-w-2xl">
          <form onSubmit={submit} className="salon-card rounded-[2rem] p-6 md:p-8">
            <h2 className="font-display text-3xl font-bold text-espresso">Leave a review</h2>
            <p className="mt-2 text-cocoa/70">Your review will show publicly after salon approval.</p>
            <div className="mt-5"><Toast type={toast.type} message={toast.message} /></div>
            <label className="mt-5 block"><span className="salon-label">Name</span><input className="salon-input" value={form.customerName} onChange={(e) => setForm({ ...form, customerName: e.target.value })} required /></label>
            <label className="mt-4 block"><span className="salon-label">Rating</span><select className="salon-input" value={form.rating} onChange={(e) => setForm({ ...form, rating: Number(e.target.value) })}><option value="5">5 stars</option><option value="4">4 stars</option><option value="3">3 stars</option><option value="2">2 stars</option><option value="1">1 star</option></select></label>
            <label className="mt-4 block"><span className="salon-label">Review</span><textarea className="salon-input min-h-32" value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} required /></label>
            <button disabled={submitting} className="mt-6 w-full rounded-full bg-espresso px-6 py-4 font-bold text-white disabled:opacity-60">{submitting ? 'Submitting...' : 'Submit Review'}</button>
          </form>
        </section>
      </div>
    </main>
  );
}
