/**
 * File: backend/src/utils/email.js
 * Purpose: Sends appointment email notifications using Resend.
 * Features: Salon notification email, customer confirmation email, safe failure handling, and plain HTML email templates.
 * Used by: backend/src/controllers/appointmentsController.js.
 * Future edits: Add appointment reminder emails, cancellation emails, SMS fallback, or branded email templates here.
 */

const RESEND_API_URL = 'https://api.resend.com/emails';

const hasEmailConfig = () => {
  return Boolean(process.env.RESEND_API_KEY && process.env.EMAIL_FROM);
};

const escapeHtml = (value = '') => {
  return String(value)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#039;');
};

const formatAppointmentDateTime = (appointment) => {
  return `${appointment.date} at ${appointment.time}`;
};

const sendEmail = async ({ to, subject, html }) => {
  if (!hasEmailConfig()) {
    console.warn('[email] Missing RESEND_API_KEY or EMAIL_FROM. Skipping email send.');
    return { skipped: true };
  }

  if (!to) {
    console.warn('[email] Missing recipient. Skipping email send.');
    return { skipped: true };
  }

  const response = await fetch(RESEND_API_URL, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      from: process.env.EMAIL_FROM,
      to,
      subject,
      html
    })
  });

  const data = await response.json().catch(() => ({}));

  if (!response.ok) {
    throw new Error(data?.message || data?.error || `Resend failed with status ${response.status}`);
  }

  return data;
};

export const sendAppointmentEmails = async ({ appointment }) => {
  try {
    const salonEmail = process.env.SALON_NOTIFICATION_EMAIL;
    const appointmentDateTime = formatAppointmentDateTime(appointment);

    const safeCustomerName = escapeHtml(appointment.customerName);
    const safePhone = escapeHtml(appointment.phone);
    const safeEmail = escapeHtml(appointment.email);
    const safeService = escapeHtml(appointment.serviceName);
    const safeStaff = escapeHtml(appointment.staffName);
    const safeDateTime = escapeHtml(appointmentDateTime);
    const safeNotes = escapeHtml(appointment.notes || 'No notes provided.');

    const salonHtml = `
      <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #2b211d;">
        <h2>New appointment request</h2>
        <p>A new appointment was booked from the website.</p>

        <hr />

        <p><strong>Customer:</strong> ${safeCustomerName}</p>
        <p><strong>Phone:</strong> ${safePhone}</p>
        <p><strong>Email:</strong> ${safeEmail}</p>
        <p><strong>Service:</strong> ${safeService}</p>
        <p><strong>Worker:</strong> ${safeStaff}</p>
        <p><strong>Date/Time:</strong> ${safeDateTime}</p>
        <p><strong>Notes:</strong> ${safeNotes}</p>

        <hr />

        <p>Please open the admin dashboard to confirm, cancel, or manage this appointment.</p>
      </div>
    `;

    const customerHtml = `
      <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #2b211d;">
        <h2>Your appointment request was received</h2>
        <p>Hi ${safeCustomerName},</p>

        <p>Thank you for booking with Touch Threading & Brows Salon. We received your appointment request.</p>

        <hr />

        <p><strong>Service:</strong> ${safeService}</p>
        <p><strong>Worker:</strong> ${safeStaff}</p>
        <p><strong>Date/Time:</strong> ${safeDateTime}</p>

        <hr />

        <p>Your appointment is currently pending confirmation. If you need to cancel, reschedule, or ask about same-day availability, please call the salon.</p>

        <p>Thank you,<br />Touch Threading & Brows Salon</p>
      </div>
    `;

    const emailJobs = [];

    if (salonEmail) {
      emailJobs.push(
        sendEmail({
          to: salonEmail,
          subject: `New appointment: ${appointment.customerName} - ${appointment.date} ${appointment.time}`,
          html: salonHtml
        })
      );
    }

    emailJobs.push(
      sendEmail({
        to: appointment.email,
        subject: 'Your appointment request was received',
        html: customerHtml
      })
    );

    await Promise.allSettled(emailJobs);
  } catch (error) {
    console.error('[email] Appointment email failed:', error.message);
  }
};
