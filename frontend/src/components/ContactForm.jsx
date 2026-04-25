/**
 * File: frontend/src/components/ContactForm.jsx
 * Purpose: Public contact form for customer questions and salon messages.
 * Features: Name, phone, email, subject, message, submit state, success/error toast, and backend POST integration.
 * Used by: Contact.jsx page.
 * Future edits: Add service dropdown, spam protection, or newsletter opt-in here.
 */

import { useState } from 'react';
import { salonApi } from '../api/salonApi';
import Toast from './Toast';

const initial = { name: '', phone: '', email: '', subject: '', message: '' };

export default function ContactForm() {
  const [form, setForm] = useState(initial);
  const [submitting, setSubmitting] = useState(false);
  const [toast, setToast] = useState({ type: '', message: '' });

  const update = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    setToast({ type: '', message: '' });
  };

  const submit = async (event) => {
    event.preventDefault();
    try {
      setSubmitting(true);
      const result = await salonApi.submitContact(form);
      setToast({ type: 'success', message: result.message || 'Message sent. We will contact you soon.' });
      setForm(initial);
    } catch (err) {
      setToast({ type: 'error', message: err?.response?.data?.message || 'Could not send message. Please try again.' });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form onSubmit={submit} className="salon-card rounded-[2rem] p-6 md:p-8">
      <Toast type={toast.type} message={toast.message} />
      <div className="mt-5 grid gap-4 md:grid-cols-2">
        <label><span className="salon-label">Name</span><input className="salon-input" value={form.name} onChange={(e) => update('name', e.target.value)} required /></label>
        <label><span className="salon-label">Phone</span><input className="salon-input" value={form.phone} onChange={(e) => update('phone', e.target.value)} placeholder="Optional" /></label>
        <label><span className="salon-label">Email</span><input className="salon-input" type="email" value={form.email} onChange={(e) => update('email', e.target.value)} required /></label>
        <label><span className="salon-label">Subject</span><input className="salon-input" value={form.subject} onChange={(e) => update('subject', e.target.value)} required /></label>
      </div>
      <label className="mt-4 block"><span className="salon-label">Message</span><textarea className="salon-input min-h-36" value={form.message} onChange={(e) => update('message', e.target.value)} required /></label>
      <button disabled={submitting} className="mt-6 w-full rounded-full bg-espresso px-6 py-4 font-bold text-white shadow-salon disabled:opacity-60">
        {submitting ? 'Sending...' : 'Send Message'}
      </button>
    </form>
  );
}
