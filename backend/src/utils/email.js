/**
 * File: backend/src/utils/email.js
 * Purpose: Sends branded appointment emails using Resend.
 * Features: Salon notification email, customer pending email, customer confirmation email, logo/header branding, safe HTML escaping, and safe failure handling.
 * Used by: backend/src/controllers/appointmentsController.js.
 * Future edits: Add cancellation emails, reminder emails, SMS fallback, or deeper branded templates here.
 */

const RESEND_API_URL = 'https://api.resend.com/emails';

const DEFAULT_SITE_URL = 'https://www.toucheyebrows.com';
const DEFAULT_LOGO_URL = `${DEFAULT_SITE_URL}/logo.png`;
const DEFAULT_ADMIN_URL = `${DEFAULT_SITE_URL}/admin`;

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

const getSiteUrl = () => {
  return String(process.env.PUBLIC_SITE_URL || DEFAULT_SITE_URL).replace(/\/$/, '');
};

const getLogoUrl = () => {
  return process.env.EMAIL_LOGO_URL || `${getSiteUrl()}/logo.png` || DEFAULT_LOGO_URL;
};

const getAdminUrl = () => {
  return process.env.ADMIN_URL || `${getSiteUrl()}/admin` || DEFAULT_ADMIN_URL;
};

const getDirectionsUrl = (settings) => {
  if (process.env.GOOGLE_MAPS_URL) return process.env.GOOGLE_MAPS_URL;

  const address = settings?.address || 'Touch Threading and Brows Salon';
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`;
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

const renderLayout = ({ title, eyebrow = 'Touch Threading & Brows Salon', preview, body, buttonLabel, buttonUrl, settings }) => {
  const logoUrl = escapeHtml(getLogoUrl());
  const siteUrl = escapeHtml(getSiteUrl());
  const safeTitle = escapeHtml(title);
  const safeEyebrow = escapeHtml(eyebrow);
  const safePreview = escapeHtml(preview || title);
  const safeButtonLabel = escapeHtml(buttonLabel || 'Visit Website');
  const safeButtonUrl = escapeHtml(buttonUrl || getSiteUrl());
  const safeBusinessName = escapeHtml(settings?.businessName || 'Touch Threading & Brows Salon');
  const safeAddress = escapeHtml(settings?.address || '');
  const safePhone = escapeHtml(settings?.phone || '');

  return `
    <!doctype html>
    <html>
      <head>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>${safeTitle}</title>
      </head>
      <body style="margin:0; padding:0; background:#f8efe9; font-family: Arial, Helvetica, sans-serif; color:#3f2a23;">
        <div style="display:none; max-height:0; overflow:hidden; opacity:0; color:transparent;">
          ${safePreview}
        </div>

        <table width="100%" cellpadding="0" cellspacing="0" role="presentation" style="background:#f8efe9; padding:28px 12px;">
          <tr>
            <td align="center">
              <table width="100%" cellpadding="0" cellspacing="0" role="presentation" style="max-width:640px; background:#fffaf7; border:1px solid #ecd6cc; border-radius:24px; overflow:hidden; box-shadow:0 18px 50px rgba(63,42,35,0.10);">
                <tr>
                  <td align="center" style="padding:30px 26px 18px; background:linear-gradient(135deg,#fff7f2,#f3ded4);">
                    <img src="${logoUrl}" width="130" alt="${safeBusinessName}" style="display:block; width:130px; max-width:130px; height:auto; border-radius:22px; margin:0 auto 16px;" />
                    <div style="font-size:12px; letter-spacing:2.5px; text-transform:uppercase; color:#8f6658; font-weight:700; margin-bottom:8px;">${safeEyebrow}</div>
                    <h1 style="margin:0; color:#3f2a23; font-size:28px; line-height:1.18; font-weight:800;">${safeTitle}</h1>
                  </td>
                </tr>

                <tr>
                  <td style="padding:28px 28px 10px; font-size:16px; line-height:1.65; color:#4b332c;">
                    ${body}
                  </td>
                </tr>

                <tr>
                  <td align="center" style="padding:14px 28px 28px;">
                    <a href="${safeButtonUrl}" style="display:inline-block; background:#3f2a23; color:#fffaf7; text-decoration:none; padding:14px 22px; border-radius:999px; font-size:15px; font-weight:800; letter-spacing:0.3px;">${safeButtonLabel}</a>
                  </td>
                </tr>

                <tr>
                  <td style="padding:22px 28px; background:#fbf2ed; border-top:1px solid #ecd6cc; color:#6e4d42; font-size:13px; line-height:1.6;">
                    <strong style="color:#3f2a23;">${safeBusinessName}</strong><br />
                    ${safeAddress ? `${safeAddress}<br />` : ''}
                    ${safePhone ? `Phone: ${safePhone}<br />` : ''}
                    <a href="${siteUrl}" style="color:#8a4f3d; text-decoration:none; font-weight:700;">${siteUrl}</a>
                    <div style="margin-top:14px; color:#9a756a; font-size:12px;">Powered by <a href="https://neptrixx.com" style="color:#8a4f3d; text-decoration:none; font-weight:800;">Neptrixx</a></div>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
        </table>
      </body>
    </html>
  `;
};

const renderDetailsTable = ({ appointment, includeContact = false }) => {
  const rows = [
    ['Service', appointment.serviceName],
    ['Worker', appointment.staffName],
    ['Date & Time', formatAppointmentDateTime(appointment)]
  ];

  if (includeContact) {
    rows.unshift(['Customer', appointment.customerName]);
    rows.splice(1, 0, ['Phone', appointment.phone]);
    rows.splice(2, 0, ['Email', appointment.email]);
  }

  if (appointment.notes) {
    rows.push(['Notes', appointment.notes]);
  }

  return `
    <table width="100%" cellpadding="0" cellspacing="0" role="presentation" style="border-collapse:separate; border-spacing:0; margin:20px 0; border:1px solid #ecd6cc; border-radius:18px; overflow:hidden; background:#fff;">
      ${rows
        .map(([label, value]) => `
          <tr>
            <td style="padding:13px 16px; width:36%; background:#fbf2ed; border-bottom:1px solid #ecd6cc; color:#7c574c; font-size:14px; font-weight:800;">${escapeHtml(label)}</td>
            <td style="padding:13px 16px; border-bottom:1px solid #ecd6cc; color:#3f2a23; font-size:14px; font-weight:700;">${escapeHtml(value || 'N/A')}</td>
          </tr>
        `)
        .join('')}
    </table>
  `;
};

export const sendAppointmentEmails = async ({ appointment, settings }) => {
  try {
    const salonEmail = process.env.SALON_NOTIFICATION_EMAIL;
    const safeCustomerName = escapeHtml(appointment.customerName);
    const adminUrl = getAdminUrl();
    const directionsUrl = getDirectionsUrl(settings);

    const salonHtml = renderLayout({
      title: 'New appointment request',
      preview: `New appointment request from ${appointment.customerName} for ${appointment.date} at ${appointment.time}.`,
      buttonLabel: 'Open Admin Dashboard',
      buttonUrl: adminUrl,
      settings,
      body: `
        <p style="margin:0 0 16px;">A new appointment request was submitted from the website. Please review it in the admin dashboard and confirm, cancel, or manage it.</p>
        ${renderDetailsTable({ appointment, includeContact: true })}
        <p style="margin:18px 0 0; color:#6e4d42;">This booking is currently marked as <strong style="color:#3f2a23;">Pending</strong>.</p>
      `
    });

    const customerHtml = renderLayout({
      title: 'Appointment request received',
      preview: 'We received your appointment request and will confirm it shortly.',
      buttonLabel: 'Get Directions',
      buttonUrl: directionsUrl,
      settings,
      body: `
        <p style="margin:0 0 16px;">Hi ${safeCustomerName},</p>
        <p style="margin:0 0 16px;">Thank you for booking with <strong>Touch Threading & Brows Salon</strong>. We received your appointment request and will confirm it shortly.</p>
        ${renderDetailsTable({ appointment })}
        <div style="margin:20px 0; padding:16px 18px; background:#fff5df; border:1px solid #f2d99e; border-radius:18px; color:#6b4a18;">
          <strong>Status: Pending confirmation</strong><br />
          Your time has been requested. The salon will review it and confirm your appointment soon.
        </div>
        <p style="margin:0; color:#6e4d42;">Need to change anything or ask about same-day availability? Please call the salon directly.</p>
      `
    });

    const emailJobs = [];

    if (salonEmail) {
      emailJobs.push(
        sendEmail({
          to: salonEmail,
          subject: `New appointment request: ${appointment.customerName} - ${appointment.date} ${appointment.time}`,
          html: salonHtml
        })
      );
    }

    emailJobs.push(
      sendEmail({
        to: appointment.email,
        subject: 'We received your appointment request',
        html: customerHtml
      })
    );

    await Promise.allSettled(emailJobs);
  } catch (error) {
    console.error('[email] Appointment email failed:', error.message);
  }
};

export const sendAppointmentConfirmedEmail = async ({ appointment, settings }) => {
  try {
    const safeCustomerName = escapeHtml(appointment.customerName);
    const directionsUrl = getDirectionsUrl(settings);

    const confirmedHtml = renderLayout({
      title: 'Your appointment is confirmed',
      preview: `Your appointment is confirmed for ${appointment.date} at ${appointment.time}.`,
      buttonLabel: 'Get Directions',
      buttonUrl: directionsUrl,
      settings,
      body: `
        <p style="margin:0 0 16px;">Hi ${safeCustomerName},</p>
        <p style="margin:0 0 16px;">Great news — your appointment with <strong>Touch Threading & Brows Salon</strong> is confirmed. We’re excited to see you.</p>
        ${renderDetailsTable({ appointment })}
        <div style="margin:20px 0; padding:16px 18px; background:#edf9ef; border:1px solid #bde5c5; border-radius:18px; color:#255d31;">
          <strong>Status: Confirmed</strong><br />
          Please arrive a few minutes early so we can serve you smoothly and on time.
        </div>
        <p style="margin:0; color:#6e4d42;">Need to cancel or reschedule? Please call the salon as soon as possible so we can adjust your appointment.</p>
      `
    });

    await sendEmail({
      to: appointment.email,
      subject: 'Your appointment is confirmed',
      html: confirmedHtml
    });
  } catch (error) {
    console.error('[email] Appointment confirmation email failed:', error.message);
  }
};
