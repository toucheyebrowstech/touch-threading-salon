/**
 * File: frontend/src/utils/formatters.js
 * Purpose: Shared formatting helpers for prices, dates, ratings, and grouping.
 * Features: Currency formatting, date label formatting, category grouping, and safe fallback text.
 * Used by: Service cards, booking form, offers, staff, reviews, and page sections.
 * Future edits: Change display formatting rules here instead of inside components.
 */

export const formatPrice = (price) => {
  if (price === undefined || price === null || price === '') return 'Price varies';
  return `$${Number(price).toFixed(0)}`;
};

export const formatDateForInput = (date = new Date()) => {
  const copy = new Date(date);
  copy.setMinutes(copy.getMinutes() - copy.getTimezoneOffset());
  return copy.toISOString().slice(0, 10);
};

export const groupByCategory = (items = []) =>
  items.reduce((groups, item) => {
    const key = item.category || 'Featured';
    groups[key] = groups[key] || [];
    groups[key].push(item);
    return groups;
  }, {});

export const stars = (rating = 5) => '★★★★★'.slice(0, Number(rating) || 5);

export const safeText = (value, fallback = 'Coming soon') => value || fallback;
