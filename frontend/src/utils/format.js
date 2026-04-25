/**
 * ============================================================
 * File: frontend/src/utils/format.js
 * Purpose: Shared formatting helpers for the public website and
 * admin dashboard.
 *
 * Used by:
 * - AdminOverview.jsx
 * - AdminAppointments.jsx
 * - AdminMessages.jsx
 * - AdminReviews.jsx
 * - Appointment and contact display sections
 *
 * What this file does:
 * - Formats dates and times
 * - Formats money/prices
 * - Formats phone numbers safely
 * - Converts backend values into clean readable text
 * - Provides admin status badge classes
 * ============================================================
 */

export function formatDate(value) {
  if (!value) return "Not set";

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return "Invalid date";
  }

  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

export function formatTime(value) {
  if (!value) return "Not set";

  if (typeof value === "string" && /^\d{1,2}:\d{2}/.test(value)) {
    const [hourRaw, minuteRaw] = value.split(":");
    const hour = Number(hourRaw);
    const minute = Number(minuteRaw || 0);

    if (!Number.isNaN(hour) && !Number.isNaN(minute)) {
      const date = new Date();
      date.setHours(hour, minute, 0, 0);

      return date.toLocaleTimeString("en-US", {
        hour: "numeric",
        minute: "2-digit",
      });
    }
  }

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return String(value);
  }

  return date.toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
  });
}

export function formatDateTime(value) {
  if (!value) return "Not set";

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return "Invalid date";
  }

  return date.toLocaleString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
  });
}

export function shortDateTime(value) {
  if (!value) return "Not set";

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return "Invalid date";
  }

  return date.toLocaleString("en-US", {
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
  });
}

export function formatCurrency(value) {
  const amount = Number(value);

  if (Number.isNaN(amount)) {
    return "$0";
  }

  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: amount % 1 === 0 ? 0 : 2,
  }).format(amount);
}

export function formatPrice(value) {
  return formatCurrency(value);
}

export function formatPhone(value) {
  if (!value) return "Not provided";

  const digits = String(value).replace(/\D/g, "");

  if (digits.length === 10) {
    return `(${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(6)}`;
  }

  if (digits.length === 11 && digits.startsWith("1")) {
    return `+1 (${digits.slice(1, 4)}) ${digits.slice(4, 7)}-${digits.slice(7)}`;
  }

  return String(value);
}

export function formatStatus(value) {
  if (!value) return "Unknown";

  return String(value)
    .replace(/_/g, " ")
    .replace(/-/g, " ")
    .trim()
    .replace(/\b\w/g, (letter) => letter.toUpperCase());
}

export function formatBoolean(value) {
  return value ? "Yes" : "No";
}

export function truncateText(value, maxLength = 80) {
  if (!value) return "";

  const cleanText = String(value);

  if (cleanText.length <= maxLength) {
    return cleanText;
  }

  return `${cleanText.slice(0, maxLength).trim()}...`;
}

export function formatName(value) {
  if (!value) return "Guest";

  return String(value).trim() || "Guest";
}

export function safeText(value, fallback = "Not provided") {
  if (value === null || value === undefined || value === "") {
    return fallback;
  }

  return String(value);
}

export function text(value, fallback = "Not provided") {
  return safeText(value, fallback);
}

export function pillClass(value) {
  const status = String(value || "").toLowerCase();

  if (
    status.includes("confirmed") ||
    status.includes("approved") ||
    status.includes("active") ||
    status.includes("completed") ||
    status.includes("published")
  ) {
    return "bg-emerald-100 text-emerald-700 border border-emerald-200";
  }

  if (
    status.includes("pending") ||
    status.includes("new") ||
    status.includes("waiting") ||
    status.includes("draft")
  ) {
    return "bg-amber-100 text-amber-700 border border-amber-200";
  }

  if (
    status.includes("cancelled") ||
    status.includes("canceled") ||
    status.includes("rejected") ||
    status.includes("inactive") ||
    status.includes("deleted")
  ) {
    return "bg-rose-100 text-rose-700 border border-rose-200";
  }

  return "bg-stone-100 text-stone-700 border border-stone-200";
}
