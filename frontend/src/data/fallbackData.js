/**
 * File: frontend/src/data/fallbackData.js
 * Purpose: Provides frontend fallback content when the backend is not seeded or temporarily unavailable.
 * Features: Default services, offers, staff, gallery items, FAQs, testimonials, and business contact info.
 * Used by: Public pages and components before live API data loads.
 * Future edits: Update placeholder phone, email, social links, gallery images, or default marketing copy here.
 */

export const businessInfo = {
  name: 'Touch Threading and Brows Salon',
  tagline: 'Perfect Brows. Smooth Skin. Effortless Beauty.',
  address: '2150 N Josey Ln #109, Carrollton, TX 75006',
  phone: '(972) 555-0123',
  email: 'hello@touchthreadingbrows.com',
  instagram: 'https://instagram.com/',
  facebook: 'https://facebook.com/',
  tiktok: 'https://tiktok.com/',
  hours: [
    { day: 'Monday - Saturday', time: '9:00 AM - 7:00 PM' },
    { day: 'Sunday', time: '11:00 AM - 6:00 PM' }
  ]
};

export const fallbackServices = [
  { _id: 'svc-1', name: 'Eyebrow Threading', category: 'Threading', price: 12, durationMinutes: 15, description: 'Clean shaping for polished, natural brows.' },
  { _id: 'svc-2', name: 'Upper Lip', category: 'Threading', price: 7, durationMinutes: 10, description: 'Quick gentle threading for smooth upper lip.' },
  { _id: 'svc-3', name: 'Chin', category: 'Threading', price: 8, durationMinutes: 10, description: 'Precise facial threading for a smooth finish.' },
  { _id: 'svc-4', name: 'Forehead', category: 'Threading', price: 8, durationMinutes: 10, description: 'Soft clean-up for forehead hairline and texture.' },
  { _id: 'svc-5', name: 'Sideburns', category: 'Threading', price: 10, durationMinutes: 10, description: 'Detailed threading for balanced facial framing.' },
  { _id: 'svc-6', name: 'Neck', category: 'Threading', price: 10, durationMinutes: 10, description: 'Smooth neck clean-up with precise threading.' },
  { _id: 'svc-7', name: 'Full Face Threading', category: 'Threading', price: 35, durationMinutes: 35, description: 'Complete facial threading for a fresh glow.' },
  { _id: 'svc-8', name: 'Brow Tinting', category: 'Brow Services', price: 20, durationMinutes: 20, description: 'Soft color enhancement for fuller-looking brows.' },
  { _id: 'svc-9', name: 'Brow Lamination', category: 'Brow Services', price: 55, durationMinutes: 45, description: 'Lifted, brushed-up brows with a sleek finish.' },
  { _id: 'svc-10', name: 'Brow Shaping + Tint', category: 'Brow Services', price: 30, durationMinutes: 30, description: 'Shape and color for a defined brow look.' },
  { _id: 'svc-11', name: 'Brow Lamination + Tint', category: 'Brow Services', price: 70, durationMinutes: 55, description: 'Premium brow lift and tint combo.' },
  { _id: 'svc-12', name: 'Lash Tint', category: 'Lash Services', price: 20, durationMinutes: 20, description: 'Darkens natural lashes for low-maintenance beauty.' },
  { _id: 'svc-13', name: 'Lash Lift', category: 'Lash Services', price: 60, durationMinutes: 45, description: 'Natural lash curl without daily curling.' },
  { _id: 'svc-14', name: 'Lash Lift + Tint', category: 'Lash Services', price: 75, durationMinutes: 60, description: 'Lifted and tinted lashes for a bright-eye look.' },
  { _id: 'svc-15', name: 'Cluster/Temporary Eyelash Extensions', category: 'Lash Services', price: 35, durationMinutes: 35, description: 'Soft temporary volume for events or weekends.' },
  { _id: 'svc-16', name: 'Upper Lip Wax', category: 'Waxing', price: 8, durationMinutes: 10, description: 'Fast waxing for smooth upper lip.' },
  { _id: 'svc-17', name: 'Chin Wax', category: 'Waxing', price: 10, durationMinutes: 10, description: 'Clean chin waxing with a gentle finish.' },
  { _id: 'svc-18', name: 'Underarms Wax', category: 'Waxing', price: 20, durationMinutes: 20, description: 'Smooth underarm waxing for lasting freshness.' },
  { _id: 'svc-19', name: 'Arms Wax', category: 'Waxing', price: 35, durationMinutes: 35, description: 'Full arm waxing for smooth skin.' },
  { _id: 'svc-20', name: 'Legs Wax', category: 'Waxing', price: 55, durationMinutes: 50, description: 'Leg waxing for a clean, silky finish.' },
  { _id: 'svc-21', name: 'Face Waxing', category: 'Waxing', price: 35, durationMinutes: 35, description: 'Full face waxing option for smooth skin.' },
  { _id: 'svc-22', name: 'Mini Facial', category: 'Facials and Skincare', price: 45, durationMinutes: 35, description: 'Refresh your skin with a quick glow facial.' },
  { _id: 'svc-23', name: 'Hydrating Facial', category: 'Facials and Skincare', price: 65, durationMinutes: 50, description: 'Moisture-focused facial for soft radiant skin.' },
  { _id: 'svc-24', name: 'Deep Cleansing Facial', category: 'Facials and Skincare', price: 75, durationMinutes: 60, description: 'Deep pore cleansing and skin reset.' },
  { _id: 'svc-25', name: 'Brightening Facial', category: 'Facials and Skincare', price: 80, durationMinutes: 60, description: 'Glow treatment for dull or uneven-looking skin.' },
  { _id: 'svc-26', name: 'Light Chemical Peel', category: 'Facials and Skincare', price: 90, durationMinutes: 60, description: 'Gentle peel for smoother brighter skin.' }
];

export const fallbackOffers = [
  { _id: 'off-1', title: 'First Visit Brow Welcome', subtitle: 'New customer offer', description: 'Enjoy a friendly first visit discount on eyebrow threading.', discountText: 'Ask in salon', isFeatured: true },
  { _id: 'off-2', title: 'Brow + Upper Lip Combo', subtitle: 'Quick clean-up package', description: 'A fast combo for polished brows and smooth skin.', discountText: 'Combo special', isFeatured: true },
  { _id: 'off-3', title: 'Full Face Threading Package', subtitle: 'Fresh-face favorite', description: 'Complete facial threading for a clean, confident look.', discountText: 'Package price', isFeatured: false },
  { _id: 'off-4', title: 'Lash Lift + Brow Tint', subtitle: 'Soft glam combo', description: 'Lifted lashes and fuller-looking brows in one beauty visit.', discountText: 'Monthly special', isFeatured: true },
  { _id: 'off-5', title: 'Buy 5 Brows, Get 1 Free', subtitle: 'Loyalty reward', description: 'Regular brow guests can earn a free eyebrow threading visit.', discountText: 'Loyalty', isFeatured: false },
  { _id: 'off-6', title: 'Refer a Friend', subtitle: 'Share the glow', description: 'Refer a friend and both receive a salon discount.', discountText: 'Referral', isFeatured: false }
];

export const fallbackStaff = [
  { _id: 'staff-1', name: 'Salon Owner', role: 'Owner / Brow Specialist', specialties: ['Eyebrow threading', 'Brow shaping', 'Brow tinting'], workingDays: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'], bio: 'A detail-focused brow artist creating clean, natural, flattering shapes.' },
  { _id: 'staff-2', name: 'Threading Specialist', role: 'Threading Specialist', specialties: ['Full face threading', 'Eyebrows', 'Facial grooming'], workingDays: ['Monday', 'Tuesday', 'Thursday', 'Friday', 'Saturday'], bio: 'Known for fast, gentle service and consistent brow clean-ups.' },
  { _id: 'staff-3', name: 'Lash & Skincare Specialist', role: 'Lash & Skincare Specialist', specialties: ['Lash lift', 'Lash tint', 'Facials'], workingDays: ['Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'], bio: 'Focused on glowing skin, lifted lashes, and relaxing beauty appointments.' }
];

export const fallbackReviews = [
  { _id: 'rev-1', customerName: 'Maya R.', rating: 5, message: 'My brows came out clean and even. The booking was fast and the salon felt welcoming.' },
  { _id: 'rev-2', customerName: 'Priya S.', rating: 5, message: 'Perfect place for eyebrow threading in Carrollton. Quick, clean, and friendly.' },
  { _id: 'rev-3', customerName: 'Jessica L.', rating: 5, message: 'I tried the brow tint and loved how natural it looked.' }
];

export const galleryItems = [
  { id: 1, category: 'Brows', title: 'Soft Arch Brow Shape', image: 'https://images.unsplash.com/photo-1598300188904-6287d52746ad?auto=format&fit=crop&w=900&q=80' },
  { id: 2, category: 'Brows', title: 'Clean Brow Threading', image: 'https://images.unsplash.com/photo-1516975080664-ed2fc6a32937?auto=format&fit=crop&w=900&q=80' },
  { id: 3, category: 'Lashes', title: 'Natural Lash Lift', image: 'https://images.unsplash.com/photo-1589710751893-f9a6770ad71b?auto=format&fit=crop&w=900&q=80' },
  { id: 4, category: 'Facials', title: 'Hydrating Facial Glow', image: 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&w=900&q=80' },
  { id: 5, category: 'Salon', title: 'Warm Beauty Studio', image: 'https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&w=900&q=80' },
  { id: 6, category: 'Salon', title: 'Clean Treatment Space', image: 'https://images.unsplash.com/photo-1522337660859-02fbefca4702?auto=format&fit=crop&w=900&q=80' }
];

export const faqs = [
  { question: 'Do I need an appointment?', answer: 'Walk-ins are welcome, but booking ahead helps you get your preferred time and worker.' },
  { question: 'How often should I thread my eyebrows?', answer: 'Most guests return every 2-3 weeks depending on hair growth and preferred shape.' },
  { question: 'How long does eyebrow threading take?', answer: 'Eyebrow threading usually takes about 10-15 minutes.' },
  { question: 'Can I book multiple services?', answer: 'Yes. Add your notes in the booking form or call the salon for larger combo appointments.' }
];
