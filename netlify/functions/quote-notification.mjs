const QUOTE_FORM_NAME = 'quote-request';

const quoteFields = [
  ['Event Type', 'type'],
  ['Number of Hours', 'hours'],
  ['Vehicle', 'vehicle'],
  ['Number of Passengers', 'passengers'],
  ['Event Date', 'date'],
  ['Pickup Time', 'time'],
  ['Pickup Location', 'pickup'],
  ['Destination', 'dropoff'],
  ['Full Name', 'name'],
  ['Phone Number', 'phone'],
  ['Email Address', 'email'],
  ['How Did You Find Us?', 'message'],
];

const normalizeValue = (value) =>
  typeof value === 'string' ? value.replace(/\s+/g, ' ').trim() : '';

const escapeHtml = (value) =>
  value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#039;');

const buildEmailContent = (data) => {
  const rows = quoteFields.map(([label, fieldName]) => ({
    label,
    value: normalizeValue(data[fieldName]),
  }));

  return {
    html: `<div style="font-family:Arial,sans-serif;font-size:14px;line-height:1.35;color:#111;">${rows
      .map(
        ({ label, value }) =>
          `<div style="margin:0 0 3px;"><strong>${escapeHtml(label)}:</strong> ${escapeHtml(value)}</div>`,
      )
      .join('')}</div>`,
    text: rows.map(({ label, value }) => `${label}: ${value}`).join('\n'),
  };
};

const getEmailConfiguration = () => {
  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.QUOTE_EMAIL_FROM;
  const to = (process.env.QUOTE_EMAIL_TO ?? '')
    .split(',')
    .map((address) => address.trim())
    .filter(Boolean);

  const missing = [
    !apiKey && 'RESEND_API_KEY',
    !from && 'QUOTE_EMAIL_FROM',
    to.length === 0 && 'QUOTE_EMAIL_TO',
  ].filter(Boolean);

  if (missing.length > 0) {
    throw new Error(`Quote notification is missing: ${missing.join(', ')}.`);
  }

  return { apiKey, from, to };
};

const sendQuoteNotification = async (data) => {
  const { apiKey, from, to } = getEmailConfiguration();
  const fullName = normalizeValue(data.name);
  const emailAddress = normalizeValue(data.email);
  const { html, text } = buildEmailContent(data);
  const email = {
    from,
    to,
    subject: `REQUEST FREE QUOTE FROM ${fullName}`,
    html,
    text,
  };

  if (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailAddress)) {
    email.reply_to = emailAddress;
  }

  const response = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
      'User-Agent': 'ChiTown-Trolley-Netlify-Function/1.0',
    },
    body: JSON.stringify(email),
  });

  if (!response.ok) {
    throw new Error(`Resend returned HTTP ${response.status} for the quote notification.`);
  }
};

export default {
  async formSubmitted(event) {
    const data = event?.data;
    if (!data || data['form-name'] !== QUOTE_FORM_NAME) return;

    await sendQuoteNotification(data);
  },
};
