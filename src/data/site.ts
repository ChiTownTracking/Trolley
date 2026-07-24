import { fleetImages } from './fleet';
import type { SiteImage } from '../utils/images';

/* ============================================================
   Central content for the ChiTown Trolley site.
   All copy/data lifted from the original DivMagic component so
   pages stay declarative and edits happen in one place.
   ============================================================ */

export interface SiteContact {
  phoneDisplay: string;
  phoneHref: `tel:${string}`;
  email: string;
}

export interface SiteAddress {
  streetAddress: string;
  addressLocality: string;
  addressRegion: string;
  postalCode: string;
  addressCountry: string;
}

export interface SiteConfig {
  name: string;
  /** Requires owner confirmation before legal or structured-data use. */
  legalName?: string;
  description: string;
  contact: SiteContact;
  address: SiteAddress;
  locationLabel: string;
  serviceAreas: readonly string[];
  social: {
    instagram: string;
    facebook: string;
  };
  routes: {
    privacy: string;
    terms: string;
    reservation: string;
  };
}

/**
 * Central non-secret site configuration.
 *
 * The legal name, public email, and service-area claims still require owner
 * confirmation. Placeholder values must never become live links or structured
 * data.
 */
export const site = {
  name: 'ChiTown Trolley',
  description:
    'Timeless white trolley transportation for weddings and events across Chicagoland. Owner-operated, licensed and insured.',
  contact: {
    phoneDisplay: '+1 630-624-3448',
    phoneHref: 'tel:+16306243448',
    email: 'info@chitowntrolley.com',
  },
  address: {
    streetAddress: '1265 Oakton St',
    addressLocality: 'Elk Grove Village',
    addressRegion: 'IL',
    postalCode: '60007',
    addressCountry: 'US',
  },
  locationLabel: 'Chicago, Illinois',
  serviceAreas: [
    'Naperville',
    'Evanston',
    'Oak Brook',
    'Schaumburg',
    'Orland Park',
    'Arlington Heights',
    'Hinsdale',
    'Lake Forest',
    'Wheaton',
  ],
  social: {
    instagram:
      'https://www.instagram.com/chitowntrolley?igsh=MXZrMnVpbGF4NG5iZg%3D%3D&utm_source=qr',
    facebook: 'https://www.facebook.com/share/1GhfM5hPmT/?mibextid=wwXIfr',
  },
  routes: {
    privacy: '/privacy-policy',
    terms: '/terms-and-conditions',
    reservation: '/reservation',
  },
} satisfies SiteConfig;

/** Known placeholder values that must never render as a live link or be emitted into structured data. */
const PLACEHOLDER_VALUES = new Set<string>(['#']);
export const isPlaceholder = (value: string): boolean =>
  PLACEHOLDER_VALUES.has(value) || value.trim().toUpperCase().startsWith('TODO');

/** Single source of truth for whether contact info is real enough to render as a live link/schema field. */
export const hasPhone =
  !isPlaceholder(site.contact.phoneDisplay) && !isPlaceholder(site.contact.phoneHref);
export const hasInstagram = !isPlaceholder(site.social.instagram);
export const hasFacebook = !isPlaceholder(site.social.facebook);

/** Builds LocalBusiness JSON-LD from site.ts, omitting any field still backed by placeholder data. */
export function getLocalBusinessSchema(url: string) {
  const schema: Record<string, unknown> = {
    '@context': 'https://schema.org',
    // TaxiService is the closest real schema.org LocalBusiness subtype for a
    // chauffeured, vehicle-for-hire local transportation business.
    '@type': 'TaxiService',
    name: site.name,
    url,
    description:
      'Timeless white trolley, coach bus, party bus, and limo van transportation for weddings and events across Chicagoland.',
    areaServed: 'Chicago, Illinois and surrounding suburbs',
  };

  if (hasPhone) schema.telephone = site.contact.phoneDisplay;

  if (Object.values(site.address).every((v) => !isPlaceholder(v))) {
    schema.address = { '@type': 'PostalAddress', ...site.address };
  }

  const sameAs = [site.social.instagram, site.social.facebook].filter(
    (v) => !isPlaceholder(v),
  );
  if (sameAs.length) schema.sameAs = sameAs;

  return schema;
}

export interface NavItem {
  label: string;
  href: string;
  /** Optional structured label parts for the festive navigation treatment. */
  labelParts?: readonly { text: string; className: string }[];
}

/** Primary nav items shown inline in the header. */
export const navMain: NavItem[] = [
  { label: 'Home', href: '/' },
  { label: 'Fleet', href: '/fleet' },
  { label: 'Weddings', href: '/weddings' },
  {
    label: 'Christmas Trolley',
    href: '/christmas-trolley',
    labelParts: [
      { text: 'Christmas', className: 'xmas-c' },
      { text: 'Trolley', className: 'xmas-t' },
    ],
  },
  { label: 'Services', href: '/services' },
  { label: 'Guides', href: '/guides' },
];

/** Secondary items tucked under the "More" dropdown. */
export const navMore: NavItem[] = [
  { label: 'About', href: '/about' },
  { label: 'Gallery', href: '/gallery' },
  { label: 'FAQ', href: '/faq' },
  { label: 'Contact', href: '/contact' },
];

/** Full flat list — used by the footer. */
export const navAll: NavItem[] = [...navMain, ...navMore];

export const testimonials = [
  { quote: 'The trolley was the part of the day our guests wouldn’t stop talking about. Our chauffeur felt like family by the last stop.', name: 'Maria & James · Naperville' },
  { quote: 'Spotless, on time, and the balcony photos between the ceremony and reception are our favorites from the whole album.', name: 'Priya & Daniel · Evanston' },
  { quote: 'I plan events for a living and I’m picky. This was the easiest vendor I’ve ever worked with, start to finish.', name: 'Caroline R. · Event Planner, Oak Brook' },
  { quote: 'From the first email to the last stop, everything felt effortless. Our guests are still asking where we found such a beautiful trolley.', name: 'Sofia & Marcus · Hinsdale' },
  { quote: 'Our chauffeur went out of his way to keep us on schedule between the church and the reception. Truly above and beyond.', name: 'Emily & Nathan · Arlington Heights' },
  { quote: 'We booked the coach for our out-of-town guests and the trolley for the wedding party — two vehicles, one seamless day.', name: 'The Delgado Family · Oak Park' },
];

/** Homepage FAQ preview — a focused subset shown above the CTA banner. */
export const homeFaqs = [
  {
    q: 'How far in advance should I book my trolley?',
    a: 'We recommend booking as early as you can — popular Saturdays in wedding season (May through October) and December holiday dates often fill six to twelve months out. That said, it never hurts to ask about a last-minute date; we’ll always check availability for you.',
  },
  {
    q: 'Where can I rent a trolley near me in the Chicago area?',
    a: 'ChiTown Trolley provides private trolley service throughout Chicago and many surrounding Chicagoland suburbs. Availability depends on your event date, pickup location, itinerary and vehicle needs. Share your starting address and planned stops when requesting a quote, and we will confirm whether we can serve your route.',
  },
  {
    q: 'Is alcohol allowed on board?',
    a: 'Yes — guests 21 and over are welcome to bring beverages aboard for private charters, provided everyone drinking is of legal age. We just ask that you let us know in advance so your chauffeur can have the cabin ready.',
  },
  {
    q: 'How many passengers can each vehicle hold?',
    a: 'Our Classic White Trolley seats 30–36 passengers, the Limo Vans seat up to 14, and the Super Coach Bus holds up to 57. For larger parties, ask about pairing a trolley for the wedding party with a coach for the rest of your guests.',
  },
  {
    q: 'Do you require a deposit?',
    a: 'A deposit is required to hold your date, with the balance due before the event. Requesting a quote or reservation online places no charge and carries no obligation — we confirm availability first, then walk you through every detail.',
  },
  {
    q: 'What happens if our event runs longer than expected?',
    a: 'It happens, and we plan for it. If the day’s schedule allows, additional time can often be added on the spot at an hourly rate. We’ll always confirm with you before extending, so there are never any surprises.',
  },
];

/* ----------  Weddings  ---------- */
export const steps = [
  { num: 'I', title: 'Request a Quote', body: 'Share your date, venues, and guest count. We reply within one business day.' },
  { num: 'II', title: 'Confirm the Details', body: 'We map the route, timing, and any special touches — then hold your date with a deposit.' },
  { num: 'III', title: 'Enjoy the Ride', body: 'Your chauffeur arrives early, the cabin is ready, and the day simply flows.' },
];

export const weddingTiles = [
  { big: '3 Hours', small: 'Minimum booking' },
  { big: '30–36', small: 'Passengers per trolley' },
  { big: 'Chicagoland', small: 'Full service area' },
];

/* ----------  Services  ---------- */
export const services = [
  { eyebrow: 'Business', title: 'Corporate Events', image: fleetImages.trolley.afternoonExterior, body: 'Shuttle a team between venues, welcome clients in from out of town, or give the holiday party a proper beginning. Punctual, polished, and quietly memorable.' },
  { eyebrow: 'School Nights', title: 'Proms & Homecomings', image: fleetImages.trolley.summerExterior, body: 'A safe, chaperone-friendly ride the whole group shares — with a professional chauffeur and room for everyone’s photos before the dance.' },
  { eyebrow: 'Celebrations', title: 'Quinceañeras', image: fleetImages.trolley.frontThreeQuarterWebp, body: 'From the church to the reception with the court all together. The white trolley photographs beautifully beside every gown.' },
  { eyebrow: 'The Last Fling', title: 'Bachelor & Bachelorette Parties', image: fleetImages.trolley.interior, body: 'One cabin, one playlist, zero rideshare logistics. Hop between stops while the party never pauses — BYOB welcome for guests 21 and over.' },
  { eyebrow: 'Game Day', title: 'Sporting Events & Concerts', image: fleetImages.trolley.winterExterior, body: 'Skip the parking scramble. Tailgate on the way, arrive at the gate together, and find your ride waiting when the encore ends.' },
  { eyebrow: 'Travel', title: 'Airport Transportation', image: fleetImages.trolley.boardingExterior, body: 'For wedding weekends and group trips: one comfortable pickup for the whole party, with room for every suitcase.' },
  { eyebrow: 'Group Travel', title: 'Coach Bus Charters', image: fleetImages.coach.exteriorSideDusk, body: 'When the guest list outgrows the trolley: modern coaches seating up to 57, with quilted leather seats, armrests, and generous under-floor luggage storage. Ideal for wedding guest shuttles, out-of-state trips, and business charters.' },
  { eyebrow: 'After Dark', title: 'Night Out & General Charter', image: fleetImages.trolley.christmasLights, body: 'Birthdays, anniversaries, holiday light tours, or no occasion at all. Charter the trolley and let the city roll past the windows.' },
];

/* ----------  About  ---------- */
export const aboutTiles = [
  { big: 'Licensed & Insured', small: 'Professional chauffeurs, background-checked and trained.' },
  { big: 'Hand-Detailed', small: 'Both trolleys washed and inspected before every event.' },
  { big: 'Owner-Operated', small: 'You book with the people who drive — no dispatch center.' },
];

/* ----------  Gallery  ---------- */
export const gallery = [
  { image: fleetImages.trolley.classicExterior, alt: 'Classic white trolley in warm winter light' },
  { image: fleetImages.trolley.interior, alt: 'Interior with rose garlands and quilted leather seating' },
  { image: fleetImages.trolley.frontThreeQuarterWebp, alt: 'White trolley, front three-quarter view' },
  { image: fleetImages.trolley.boardingExterior, alt: 'Grand trolley with boarding door open' },
  { image: fleetImages.trolley.christmasLights, alt: 'Trolley at dusk with string lights' },
  { image: fleetImages.trolley.summerExterior, alt: 'Trolley among summer trees' },
  { image: fleetImages.trolley.afternoonExterior, alt: 'Trolley on a sunny afternoon' },
  { image: fleetImages.trolley.winterExterior, alt: 'Trolley under a clear winter sky' },
  { image: fleetImages.coach.exteriorSideDusk, alt: 'Coach buses at dusk' },
  { image: fleetImages.coach.interior, alt: 'Coach interior with quilted leather seating for 57' },
  { image: fleetImages.coach.exteriorRearDusk, alt: 'White coach bus, rear view at dusk' },
] satisfies { image: SiteImage; alt: string }[];

/* ----------  FAQ  ---------- */
export const faqs = [
  { q: 'How far in advance should we book?', a: 'For peak wedding season (May through October) and December, 6–12 months ahead is wise — popular Saturdays go first. For other dates, a few weeks is often enough. It never hurts to ask.' },
  { q: 'How many passengers fit on board?', a: 'Our Classic trolley seats up to 30 and our Grand trolley up to 36, on circular perimeter benches so the whole group rides facing each other.' },
  { q: 'Is there a minimum booking time?', a: 'Yes — all charters have a 3-hour minimum. Most weddings book 3 to 5 hours to comfortably cover photos, the ceremony, and the reception transfer.' },
  { q: 'Are the trolleys heated and air conditioned?', a: 'Fully. Both trolleys have heat and air conditioning, so the cabin is comfortable in every Chicago season.' },
  { q: 'Can we bring drinks on board?', a: 'Guests 21 and over may bring their own beverages aboard private charters, in keeping with Illinois rules. We provide coolers and ice on request; glass is fine, kegs are not.' },
  { q: 'What area do you serve?', a: 'All of Chicagoland — the city proper and suburbs including Naperville, Evanston, Oak Brook, Schaumburg, Orland Park, Arlington Heights, Hinsdale, Lake Forest, and Wheaton. Farther afield? Just ask.' },
  { q: 'Can we decorate the trolley?', a: 'Absolutely. Florals, garlands, signage, and ribbon are all welcome — anything that attaches without adhesive damage. We’re happy to help hang things before pickup.' },
  { q: 'Is a chauffeur included?', a: 'Always. Every charter includes a professional, licensed chauffeur who plans the route, handles timing, and knows exactly where the photo-worthy stops are.' },
];

/* ----------  Reservation  ---------- */
export const resNotes = [
  'Saturdays carry a 4-hour minimum; weekdays from 3 hours.',
  'Peak wedding dates book 6–12 months out — request early.',
  'A deposit holds your date once we confirm availability.',
];

export const eventTypes = [
  'Wedding', 'Corporate Event', 'Prom / Homecoming', 'Quinceañera', 'Bachelor / Bachelorette',
  'Sporting Event / Concert', 'Airport Transportation', 'Coach Bus Charter', 'Out-of-State Trip', 'Night Out / Other',
];

export const vehicleOptions = [
  'Classic White Trolley · 30–36', 'Super Coach Bus · 57', 'Limo Van · 14', 'Party Bus · 40',
  'Christmas Trolley · 24–36', 'Trolley + Coach Package', 'Not sure yet',
];

export const hoursOptions = [
  '3 hours (minimum)', '4 hours', '5 hours', '6 hours', '7 hours', '8 hours',
  'All-day charter (12 hours)', 'One-way transfer', 'Round trip',
];
