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
  { label: 'Fleet', href: '/fleet' },
  { label: 'Wedding Package', href: '/weddings' },
  {
    label: 'Christmas Trolley',
    href: '/christmas-trolley',
    labelParts: [
      { text: 'Christmas', className: 'xmas-c' },
      { text: 'Trolley', className: 'xmas-t' },
    ],
  },
  { label: 'LAKE GENEVA, WI', href: '/lake-geneva-wisconsin-trolley-rental' },
  { label: 'Services', href: '/services' },
];

/** Secondary items tucked under the "More" dropdown. */
export const navMore: NavItem[] = [
  { label: 'Guides', href: '/guides' },
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

/** Christmas Trolley page FAQs — private-group booking and seasonal planning. */
export const christmasFaqs = [
  {
    q: 'Is the Christmas trolley a private tour?',
    a: 'Yes. The Christmas trolley is reserved for your group rather than sold by individual seat. Share your preferred date, group size, pickup location and route ideas when requesting a quote.',
  },
  {
    q: 'How many guests fit on the Christmas trolley?',
    a: 'The Christmas trolley accommodates approximately 24 to 36 guests. The best fit depends on your group size and seating needs, so include an accurate passenger estimate with your quote request.',
  },
  {
    q: 'Can we bring our own drinks?',
    a: 'Guests who are 21 or older may bring beverages aboard private charters, provided everyone drinking is of legal age. Let us know in advance so the trolley can be prepared for your group.',
  },
  {
    q: 'Can we choose our Christmas lights route?',
    a: 'You may share preferred neighborhoods, displays and planned stops. The final route depends on your pickup location, reservation length, traffic, vehicle access and confirmed service area.',
  },
  {
    q: 'Where does the Christmas trolley provide service?',
    a: 'ChiTown Trolley serves Chicago and many surrounding Chicagoland suburbs, including Naperville, subject to route and date availability. Share your starting address and planned stops so the team can confirm service for your evening.',
  },
  {
    q: 'How early should we reserve a Christmas trolley?',
    a: 'December dates often fill six to twelve months in advance, especially for Friday and Saturday evenings. Reserving early gives your group the best selection of dates and times, although it is still worth checking for last-minute availability.',
  },
  {
    q: 'Where can I find a Christmas trolley near me in the Chicago area?',
    a: 'Share your pickup address, preferred date and group size when requesting a quote. ChiTown Trolley will review your planned route and confirm whether service is available for your Chicago or suburban location.',
  },
];

/** Wedding page FAQs — timeline, capacity, routing, and private-charter planning. */
export const weddingFaqs = [
  {
    q: 'How many passengers fit on the wedding trolley?',
    a: 'The classic white trolley seats approximately 30–36 passengers. Include your expected wedding-party count when requesting a quote so the team can confirm the best vehicle arrangement.',
  },
  {
    q: 'How many hours should we reserve?',
    a: 'The appropriate rental length depends on the pickup schedule, ceremony time, photo stops, reception location and any return transportation. Share the full wedding timeline so the route and required hours can be reviewed accurately.',
  },
  {
    q: 'Can the trolley stop for wedding photos?',
    a: 'Yes, photo stops can be included when the schedule, route, parking access and reservation length allow. Provide the preferred locations in advance so travel time can be included in the itinerary.',
  },
  {
    q: 'Can we schedule hotel, ceremony and reception pickups?',
    a: 'Yes. A wedding itinerary can include hotel pickups, the ceremony, photo locations and the reception. Final routing depends on timing, vehicle access, traffic and confirmed service availability.',
  },
  {
    q: 'How far in advance should we reserve?',
    a: 'Popular wedding-season Saturdays often fill six to twelve months in advance. Reserving early provides the best choice of dates and times, although it is still worth checking for last-minute availability.',
  },
  {
    q: 'Can guests bring beverages aboard?',
    a: 'Guests who are 21 or older may bring beverages aboard private charters, provided everyone drinking is of legal age. Let the team know in advance so the vehicle can be prepared appropriately.',
  },
  {
    q: 'What happens if the wedding timeline runs late?',
    a: 'Additional time may be available when the vehicle schedule allows. The team will confirm any extension and applicable hourly charge before adding time to the reservation.',
  },
  {
    q: 'Can we reserve a trolley and coach together?',
    a: 'Yes. Couples can reserve the trolley for the wedding party and a coach for larger guest transportation. Both vehicles can be coordinated around the same hotel, ceremony and reception schedule.',
  },
  {
    q: 'Where does the wedding trolley provide service?',
    a: 'ChiTown Trolley serves Chicago and many surrounding Chicagoland suburbs, subject to date, route and vehicle availability. Share the pickup addresses and planned stops so the team can confirm service.',
  },
  {
    q: 'Where can I rent a wedding trolley near me in the Chicago area?',
    a: 'Submit your wedding date, group size, pickup location and itinerary through the quote form. ChiTown Trolley will review the route and confirm whether wedding trolley service is available for your Chicago or suburban locations.',
  },
];

/* ----------  Gallery  ---------- */
export const gallery = [
  { image: fleetImages.trolley.classicExterior, alt: 'Classic white trolley in warm winter light', label: 'Classic White Trolley', category: 'trolleys' },
  { image: fleetImages.trolley.t4Exterior, alt: 'T4 classic white trolley exterior', label: 'White Limo Trolley', category: 'trolleys' },
  { image: fleetImages.trolley.t4ExteriorFront, alt: 'Front view of the T4 classic white trolley', label: 'White Limo Trolley — Front View', category: 'trolleys' },
  { image: fleetImages.trolley.t4Interior1, alt: 'Passenger seating inside the T4 classic white trolley', label: 'Trolley Cabin', category: 'interiors' },
  { image: fleetImages.trolley.t4Interior2, alt: 'Interior cabin of the T4 classic white trolley', label: 'Circular Limo-Style Seating', category: 'interiors' },
  { image: fleetImages.trolley.t4InteriorLighting, alt: 'Interior lighting inside the T4 classic white trolley', label: 'Trolley Interior Lighting', category: 'interiors' },
  { image: fleetImages.trolley.christmasLights, alt: 'Trolley at dusk with string lights', label: 'Christmas Trolley', category: 'holiday' },
  { image: fleetImages.partyBus.exterior, alt: 'Party bus exterior', label: 'Party Bus', category: 'group-fleet' },
  { image: fleetImages.partyBus.interior1, alt: 'Party bus lounge seating and colorful lighting', label: 'Party Bus Lounge', category: 'interiors' },
  { image: fleetImages.partyBus.interior2, alt: 'Interior seating aboard the party bus', label: 'Party Bus Seating', category: 'interiors' },
  { image: fleetImages.coach.exterior1, alt: 'White coach bus ready for boarding', label: 'Super Coach Bus', category: 'group-fleet' },
  { image: fleetImages.coach.interior1, alt: 'Passenger seating inside the coach bus', label: 'Coach Bus Cabin', category: 'interiors' },
  { image: fleetImages.sprinter.executiveVan.front, alt: 'Black Executive Van exterior', label: 'Executive Van', category: 'group-fleet' },
] satisfies {
  image: SiteImage;
  alt: string;
  label: string;
  category: 'trolleys' | 'interiors' | 'group-fleet' | 'holiday';
}[];

/* ----------  FAQ  ---------- */
export const faqs = [
  { q: 'How far in advance should we book?', a: 'For peak wedding season (May through October) and December, 6–12 months ahead is wise — popular Saturdays go first. For other dates, a few weeks is often enough. It never hurts to ask.' },
  { q: 'How are the two white trolleys different?', a: 'The White Classic Trolley uses traditional forward-facing seating, while the White Limo Trolley uses circular perimeter seating so guests can face one another.' },
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
  'Wedding Package - Trolley & Coach Bus',
  'White Trolley — Classic',
  'White Trolley — Limo',
  'Festive Trolley — Red & Green',
  'Christmas Trolley',
  'Party Bus — 45 Passengers',
  'Party Bus — 40 Passengers',
  'Party Bus — 35 Passengers',
  'Party Bus — 25 Passengers',
  'Super Coach Bus — 57 Passengers',
  'Coach Bus — 50 Passengers',
  'Coach Bus — 40 Passengers',
  'Sprinter — Executive',
  'Sprinter — Limo',
];

export const hoursOptions = [
  '3 hours (minimum)', '4 hours', '5 hours', '6 hours', '7 hours', '8 hours',
  'All-day charter (12 hours)', 'One-way transfer', 'Round trip',
];
