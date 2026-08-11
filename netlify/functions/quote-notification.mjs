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

const quoteFieldAliases = {
  type: 'event-type',
  name: 'full-name',
};

const normalizeValue = (value) =>
  typeof value === 'string' ? value.replace(/\s+/g, ' ').trim() : '';

const getQuoteFieldValue = (data, fieldName) =>
  normalizeValue(data[fieldName] ?? data[quoteFieldAliases[fieldName]]);

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

const parseResponseBody = (responseText) => {
  if (!responseText) return null;

  try {
    return JSON.parse(responseText);
  } catch {
    return responseText;
  }
};

const makeSafeResponseBody = (responseText, sensitiveValues) => {
  let safeResponseText = responseText;

  for (const value of sensitiveValues) {
    if (typeof value === 'string' && value) {
      safeResponseText = safeResponseText.replaceAll(value, '[redacted]');
    }
  }

  return parseResponseBody(safeResponseText.slice(0, 2000));
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
    value: getQuoteFieldValue(data, fieldName),
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
  const toValue = process.env.QUOTE_EMAIL_TO;

  console.log('RESEND_API_KEY configured:', Boolean(apiKey));
  console.log('QUOTE_EMAIL_FROM configured:', Boolean(from));
  console.log('QUOTE_EMAIL_TO configured:', Boolean(toValue));

  const missing = [
    !apiKey && 'RESEND_API_KEY',
    !from && 'QUOTE_EMAIL_FROM',
    !toValue && 'QUOTE_EMAIL_TO',
  ].filter(Boolean);

  if (missing.length > 0) {
    throw new Error(
      `Quote notification is missing required environment variables: ${missing.join(', ')}.`,
    );
  }

  const fromAddress = extractEmailAddress(from);
  const to = toValue
    .split(',')
    .map((address) => address.trim())
    .filter(Boolean);

  if (!fromAddress) {
    throw new Error('QUOTE_EMAIL_FROM must contain a valid sender email address.');
  }

  if (to.length === 0) {
    throw new Error('QUOTE_EMAIL_TO must contain at least one recipient email address.');
  }

  return { apiKey, fromAddress, to };
};

const sendQuoteNotification = async (data) => {
  const { apiKey, fromAddress, to } = getEmailConfiguration();
  const fullName = getQuoteFieldValue(data, 'name');
  const senderName = sanitizeSenderName(fullName) || DEFAULT_SENDER_NAME;
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

  console.log('Sending quote-request notification through Resend.');

  const response = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
      'Content-Type': 'application/json',
      'User-Agent': 'ChiTown-Trolley-Netlify-Function/1.0',
    },
    body: JSON.stringify(email),
  });

  const responseText = await response.text();
  const responseBody = parseResponseBody(responseText);
  const safeResponseBody = makeSafeResponseBody(responseText, [
    apiKey,
    fullName,
    emailAddress,
    fromAddress,
    ...to,
    ...Object.values(data),
  ]);

  if (!response.ok) {
    console.error('Resend rejected quote notification.', {
      status: response.status,
      response: safeResponseBody,
    });
    throw new Error(`Resend rejected the quote notification with HTTP ${response.status}.`);
  }

  console.log('Resend accepted the quote-request notification.');

  if (
    responseBody &&
    typeof responseBody === 'object' &&
    typeof responseBody.id === 'string' &&
    /^[a-zA-Z0-9_-]+$/.test(responseBody.id)
  ) {
    console.log('Resend email ID:', responseBody.id);
  }
};

export default {
  async formSubmitted(event) {
    const data = event?.data;

    console.log('Form submission event received.');
    console.log('Submitted field names:', Object.keys(data || {}));

    if (!data || data['notification-form'] !== QUOTE_FORM_NAME) {
      console.log('Ignoring non-quote submission.');
      return;
    }

    console.log('Processing a verified quote-request form submission.');
    await sendQuoteNotification(data);
  },
};
