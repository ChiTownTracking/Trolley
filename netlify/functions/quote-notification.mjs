const DEFAULT_SENDER_NAME = 'ChiTown Trolley';
const EMAIL_ADDRESS_PATTERN = /^[^\s<>@]+@[^\s<>@]+\.[^\s<>@]+$/;

const quoteFields = [
  ['Event Type', 'type'],
  ['Number of Hours', 'hours'],
  ['Vehicle', 'vehicle'],
  ['Number of Passengers', 'passengers'],
  ['Event Date', 'date', 'date'],
  ['Pickup Time', 'time', 'time'],
  ['Pickup Location', 'pickup'],
  ['Destination', 'dropoff'],
  ['Full Name', 'name'],
  ['Phone Number', 'phone'],
  ['Email Address', 'email'],
  ['How Did You Find Us?', 'message'],
];

const weddingQuoteFields = quoteFields.filter(([, fieldName]) => fieldName !== 'vehicle');

const reservationFields = [
  ['Full Name', 'name'],
  ['Phone Number', 'phone'],
  ['Email', 'email', 'email'],
  ['Event', 'event'],
  ['Pickup Date', 'pickup-date', 'date'],
  ['Pickup Time', 'pickup-time', 'time'],
  ['End Time', 'end-time', 'time'],
  ['Pickup Location', 'pickup-location'],
  ['Drop-off Location', 'dropoff-location'],
  ['Message', 'message', 'multiline'],
  ['Number of Hours', 'hours'],
  ['Requested Vehicle', 'vehicle'],
  ['Number of Passengers', 'passengers'],
  ['Price Quote', 'price-quote'],
  ['Promo Code', 'promo-code'],
  ['Terms and Conditions', 'agreement'],
];

const contactFields = [
  ['Name', 'name'],
  ['Email', 'email', 'email'],
  ['Phone', 'phone'],
  ['Event Date', 'date', 'date'],
  ['Event Type', 'type'],
  ['Passengers', 'passengers'],
  ['Message', 'message', 'multiline'],
];

const quoteFieldAliases = {
  type: 'event-type',
  name: 'full-name',
};

const formConfigurations = new Map([
  [
    'quote-request',
    {
      fields: quoteFields,
      fieldAliases: quoteFieldAliases,
      subject: (fullName) => `${fullName} - New Request Quote - ChiTown Trolley`,
    },
  ],
  [
    'wedding-quote-request',
    {
      fields: weddingQuoteFields,
      fieldAliases: quoteFieldAliases,
      subject: (fullName) => `${fullName} - Wedding Package - ChiTown Trolley`,
    },
  ],
  [
    'reservation-request',
    {
      fields: reservationFields,
      subject: (fullName) => `${fullName} - New Reservation - ChiTown Trolley`,
    },
  ],
  [
    'contact-us',
    {
      fields: contactFields,
      subject: (fullName) => `${fullName} - New Contact Us - ChiTown Trolley`,
    },
  ],
]);

const normalizeValue = (value) =>
  typeof value === 'string' ? value.replace(/\s+/g, ' ').trim() : '';

const normalizeMultilineValue = (value) =>
  typeof value === 'string'
    ? value
        .replace(/\r\n?/g, '\n')
        .split('\n')
        .map((line) => line.replace(/[^\S\n]+/g, ' ').trimEnd())
        .join('\n')
        .trim()
    : '';

const formatDateValue = (value) => {
  const normalizedValue = normalizeValue(value);
  const match = normalizedValue.match(/^(\d{4})-(\d{2})-(\d{2})$/);
  if (!match) return normalizedValue;

  const [, yearText, monthText, dayText] = match;
  const year = Number(yearText);
  const month = Number(monthText);
  const day = Number(dayText);
  const date = new Date(Date.UTC(year, month - 1, day));

  if (
    date.getUTCFullYear() !== year ||
    date.getUTCMonth() !== month - 1 ||
    date.getUTCDate() !== day
  ) {
    return normalizedValue;
  }

  const weekday = date.toLocaleDateString('en-US', {
    weekday: 'long',
    timeZone: 'UTC',
  });

  return `${weekday} - ${month}/${day}/${year}`;
};

const formatTimeValue = (value) => {
  const normalizedValue = normalizeValue(value);
  const match = normalizedValue.match(/^([01]\d|2[0-3]):([0-5]\d)(?::[0-5]\d)?$/);
  if (!match) return normalizedValue;

  const hour = Number(match[1]);
  const minute = match[2];
  const period = hour >= 12 ? 'PM' : 'AM';
  const twelveHour = hour % 12 || 12;

  return `${twelveHour}:${minute} ${period}`;
};

const getFieldValue = (data, fieldName, fieldAliases, format) => {
  const value = data[fieldName] ?? data[fieldAliases?.[fieldName]];

  if (format === 'multiline') return normalizeMultilineValue(value);
  if (format === 'date') return formatDateValue(value);
  if (format === 'time') return formatTimeValue(value);
  return normalizeValue(value);
};

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

const formatHtmlValue = (value, format) => {
  const escapedValue = escapeHtml(value);

  if (format === 'email' && EMAIL_ADDRESS_PATTERN.test(value)) {
    return `<a href="mailto:${escapedValue}">${escapedValue}</a>`;
  }

  return format === 'multiline' ? escapedValue.replaceAll('\n', '<br>') : escapedValue;
};

const buildEmailContent = (data, configuration) => {
  const rows = configuration.fields.map(([label, fieldName, format]) => ({
    label,
    value: getFieldValue(data, fieldName, configuration.fieldAliases, format),
    format,
  }));

  return {
    html: `<div style="font-family:Arial,Helvetica,sans-serif;font-size:16px;line-height:1.4;color:#111;">${rows
      .map(
        ({ label, value, format }) =>
          `<div style="margin:0 0 5px 0;padding:0;"><strong>${escapeHtml(label)}:</strong> ${formatHtmlValue(value, format)}</div>`,
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
      `Form notification is missing required environment variables: ${missing.join(', ')}.`,
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

const sendFormNotification = async (formName, data, configuration) => {
  const { apiKey, fromAddress, to } = getEmailConfiguration();
  const fullName = getFieldValue(data, 'name', configuration.fieldAliases);
  const submittedName = data.name ?? data[configuration.fieldAliases?.name];
  const senderName = sanitizeSenderName(submittedName) || DEFAULT_SENDER_NAME;
  const emailAddress = normalizeValue(data.email);
  const { html, text } = buildEmailContent(data, configuration);
  const subject = configuration.subject(fullName);
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

  console.log(`Sending ${formName} notification through Resend.`);

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
    console.error(`Resend rejected ${formName} notification.`, {
      status: response.status,
      response: safeResponseBody,
    });
    throw new Error(`Resend rejected the ${formName} notification with HTTP ${response.status}.`);
  }

  console.log(`Resend accepted the ${formName} notification.`);

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

    const formName = data?.['notification-form'];
    const configuration = formConfigurations.get(formName);

    if (!data || !configuration) {
      console.log('Ignoring unsupported form submission.');
      return;
    }

    console.log(`Processing a verified ${formName} form submission.`);
    await sendFormNotification(formName, data, configuration);
  },
};
