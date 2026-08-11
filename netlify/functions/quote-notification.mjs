const QUOTE_FORM_NAME = 'quote-request';
const DEFAULT_SENDER_NAME = 'ChiTown Trolley';
const EMAIL_ADDRESS_PATTERN = /^[^\s<>@]+@[^\s<>@]+\.[^\s<>@]+$/;

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

const sanitizeSenderName = (value) => {
  if (typeof value !== 'string' || /[\r\n]/.test(value)) return '';

  return value
    .replace(/[\u0000-\u001f\u007f]/g, '')
    .replace(/[^\p{L}\p{M}\p{N} .'\u2019-]/gu, '')
    .replace(/\s+/g, ' ')
    .trim();
};

const extractEmailAddress = (from) => {
  if (/[\r\n]/.test(from)) return '';

  const angleBracketMatch = from.match(/<\s*([^<>]+)\s*>\s*$/);
  const emailAddress = (angleBracketMatch?.[1] ?? from).trim();

  return EMAIL_ADDRESS_PATTERN.test(emailAddress) ? emailAddress : '';
};

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
    html: `<div style="font-family:Arial,Helvetica,sans-serif;font-size:16px;line-height:1.4;color:#111;">${rows
      .map(
        ({ label, value }) =>
          `<div style="margin:0 0 5px 0;padding:0;"><strong>${escapeHtml(label)}:</strong> ${escapeHtml(value)}</div>`,
      )
      .join('')}</div>`,
    text: rows.map(({ label, value }) => `${label}: ${value}`).join('\n'),
  };
};

const getEmailConfiguration = () => {
  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.QUOTE_EMAIL_FROM;
  const fromAddress = from ? extractEmailAddress(from) : '';
  const to = (process.env.QUOTE_EMAIL_TO ?? '')
    .split(',')
    .map((address) => address.trim())
    .filter(Boolean);

  const missing = [
    !apiKey && 'RESEND_API_KEY',
    !from && 'QUOTE_EMAIL_FROM',
    from && !fromAddress && 'valid QUOTE_EMAIL_FROM address',
    to.length === 0 && 'QUOTE_EMAIL_TO',
  ].filter(Boolean);

  if (missing.length > 0) {
    throw new Error(`Quote notification is missing: ${missing.join(', ')}.`);
  }

  return { apiKey, fromAddress, to };
};

const sendQuoteNotification = async (data) => {
  const { apiKey, fromAddress, to } = getEmailConfiguration();
  const fullName = normalizeValue(data.name);
  const senderName = sanitizeSenderName(data.name) || DEFAULT_SENDER_NAME;
  const emailAddress = normalizeValue(data.email);
  const { html, text } = buildEmailContent(data);
  const subject = `REQUEST FREE QUOTE FROM ${fullName}`;
  const email = {
    from: `${senderName} <${fromAddress}>`,
    to,
    subject,
    html,
    text,
  };

  if (EMAIL_ADDRESS_PATTERN.test(emailAddress)) {
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

  console.log('Resend accepted the quote-request notification.');
};

export default {
  async formSubmitted(event) {
    const data = event?.data;
    if (!data || data['form-name'] !== QUOTE_FORM_NAME) return;

    console.log('Processing a verified quote-request form submission.');
    await sendQuoteNotification(data);
  },
};
