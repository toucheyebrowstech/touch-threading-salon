/**
 * ============================================================
 * 📁 File: frontend/src/utils/format.js
 * 🧩 Purpose: Shared frontend formatting helpers.
 *
 * Used by:
 *   - Admin pages
 *   - Appointment tables
 *   - Review tables
 *   - Service price display
 *
 * Includes:
 *   - money()              → formats prices like $25
 *   - shortDate()          → formats date only
 *   - shortDateTime()      → formats date + time
 *   - text()               → fallback text formatter
 *   - pillClass()          → status badge class helper
 * ============================================================
 */

export function money(value) {
  const number = Number(value || 0);

  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: Number.isInteger(number) ? 0 : 2,
  }).format(number);
}

export function shortDate(value) {
  if (!value) return "—";

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) return "—";

  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

export function shortDateTime(value) {
  if (!value) return "—";

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) return "—";

  return date.toLocaleString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
  });
}

export function text(value, fallback = "—") {
  if (value === null || value === undefined) return fallback;

  const cleaned = String(value).trim();

  return cleaned.length ? cleaned : fallback;
}

export function pillClass(status = "") {
  const normalized = String(status).toLowerCase().trim();

  if (
    normalized.includes("approved") ||
    normalized.includes("active") ||
    normalized.includes("confirmed") ||
    normalized.includes("completed") ||
    normalized.includes("success")
  ) {
    return "pill pill-success";
  }

  if (
    normalized.includes("pending") ||
    normalized.includes("waiting") ||
    normalized.includes("scheduled")
  ) {
    return "pill pill-warning";
  }

  if (
    normalized.includes("cancel") ||
    normalized.includes("reject") ||
    normalized.includes("failed") ||
    normalized.includes("inactive")
  ) {
    return "pill pill-danger";
  }

  return "pill";
}

export default {
  money,
  shortDate,
  shortDateTime,
  text,
  pillClass,
};
