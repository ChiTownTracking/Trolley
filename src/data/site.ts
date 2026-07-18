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
 * The phone, street address, postal code, social profiles, legal name, and
 * service-area claims still require owner confirmation. Placeholder contact
 * and social values must never become live links or structured data.
 */
export const site = {
  name: 'ChiTown Trolley',
  description:
    'Timeless white trolley transportation for weddings and events across Chicagoland. Owner-operated, licensed and insured.',
  contact: {
    phoneDisplay: '(000) TROLLEY',
    phoneHref: 'tel:0008765539',
    email: 'info@chitowntrolley.com',
  },
  address: {
    streetAddress: 'TODO: street address',
    addressLocality: 'Chicago',
    addressRegion: 'IL',
    postalCode: 'TODO: postal code',
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
    instagram: '#',
    facebook: '#',
  },
  routes: {
    privacy: '/privacy-policy',
    terms: '/terms-and-conditions',
    reservation: '/reservation',
  },
} satisfies SiteConfig;

/** Known placeholder values that must never render as a live link or be emitted into structured data. */
const PLACEHOLDER_VALUES = new Set<string>([
  '#',
  site.contact.phoneDisplay,
  site.contact.phoneHref,
]);
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

/* ----------  Home  ---------- */
export const heroImages = [
  'uploads/trolleyBliss.webp',
  'uploads/trolleyClassic.png',
  'uploads/trolleyFestive.png',
  'uploads/trolleyMidnight.png',
];


export const fleetPreview = [
  { name: 'Classic White Trolley', cap: '30–36 Passengers', img: 'uploads/trolleyClassic.png', slug: 'classic-white-trolley' },
  { name: 'Super Coach Bus', cap: 'Up to 57 guests', img: 'uploads/3-44-Passengers-Coach-Bus-Way-To-Go-Motor-Coaches.jpg', slug: 'super-coach-bus' },
  { name: 'Party Bus', cap: 'Up to 40 Passengers', img: 'uploads/24-passenger-white-party-bus-01a.jpg', slug: 'party-bus' },
  { name: 'Limo Vans', cap: 'Up to 14 passengers', img: 'uploads/new-sprinter-limo-page.jpg', slug: 'limo-vans' },
];

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
    q: 'What areas do you service?',
    a: 'We serve Chicago and the surrounding suburbs, including Naperville, Evanston, Oak Brook, Schaumburg, Orland Park, Arlington Heights, Hinsdale, Lake Forest, and Wheaton. Out-of-state trips are available for our coach charters — just tell us where you’re headed.',
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

/* ----------  Fleet  ---------- */
export interface FleetVehicle {
  name: string;
  slug: string;
  /** Sub-folder under src/assets/fleet/ holding this vehicle's gallery images. */
  folder: string;
  cap: string;
  img: string;
  /** Exact "Choose Vehicle" option string, for pre-selecting the quote form. */
  quoteValue: string;
  /** YouTube video ID — placeholder until real footage is supplied. */
  video: string;
  intro: string;
  stats: { label: string; value: string }[];
  perfectFor: string[];
  feats: string[];
}

export const fleet: FleetVehicle[] = [
  {
    name: 'Classic White Trolley',
    slug: 'classic-white-trolley',
    folder: 'Trolley',
    cap: '30–36 passengers',
    img: 'uploads/trolleyClassic.png',
    quoteValue: 'Classic White Trolley · 30–36',
    // TODO: replace with the real YouTube video ID for the Classic White Trolley
    video: 'YE7VzlLtp-4',
    intro: 'There is something about an open-air trolley that turns a simple drive into an occasion. Polished rails, a rear balcony made for the photos everyone remembers, and circular seating so the whole party rides facing one another. From the first stop to the last, the Classic White Trolley sets a timeless, old-world tone for the day.',
    stats: [
      { label: 'Capacity', value: '30–36' },
      { label: 'Ideal group', value: '20–34' },
      { label: 'Minimum', value: '3 hours' },
    ],
    perfectFor: ['Wedding ceremonies', 'Bridal party transport', 'Vineyard & brewery tours', 'Engagement photos', 'Holiday light tours'],
    feats: ['Rear balcony platform', 'Circular perimeter seating', 'Bluetooth sound system', 'Heat & air conditioning', 'Professional chauffeur included'],
  },
  {
    name: 'Super Coach Bus',
    slug: 'super-coach-bus',
    folder: 'CoachBus',
    cap: 'Up to 57 passengers',
    img: 'uploads/3-44-Passengers-Coach-Bus-Way-To-Go-Motor-Coaches.jpg',
    quoteValue: 'Super Coach Bus · 57',
    // TODO: replace with the real YouTube video ID for the Super Coach Bus
    video: 'YE7VzlLtp-4',
    intro: 'When the guest list outgrows the trolley, the Super Coach Bus keeps everyone together in quilted-leather comfort. Climate-controlled, whisper-smooth, and built for the long haul, it is the effortless way to shuttle guests between hotel and venue — or carry the whole group across state lines without a second vehicle in the convoy.',
    stats: [
      { label: 'Capacity', value: 'Up to 57' },
      { label: 'Ideal group', value: '35–57' },
      { label: 'Luggage', value: 'Ample' },
    ],
    perfectFor: ['Guest shuttles', 'Corporate events', 'Airport transfers', 'Out-of-state trips', 'Sporting events & concerts'],
    feats: ['Quilted leather seats with armrests', 'Generous luggage storage', 'Heat & air conditioning', 'Ideal for wedding guest shuttles & out-of-state trips', 'Professional chauffeur included'],
  },
  {
    name: 'Party Bus',
    slug: 'party-bus',
    folder: 'PartyBus',
    cap: 'Up to 40 passengers',
    img: 'uploads/24-passenger-white-party-bus-01a.jpg',
    quoteValue: 'Party Bus · 40',
    // TODO: replace with the real YouTube video ID for the Party Bus
    video: 'YE7VzlLtp-4',
    intro: 'When the celebration is the whole point, the Party Bus brings the venue along with you. Step aboard to wraparound lounge seating, color-shifting lights, and a sound system built to move — so the night begins the moment the doors close, not when you arrive. It is the rolling centerpiece for every milestone worth remembering.',
    stats: [
      { label: 'Capacity', value: 'Up to 40' },
      { label: 'Ideal group', value: '20–40' },
      { label: 'Vibe', value: 'Nightlife' },
    ],
    perfectFor: ['Bachelor & bachelorette parties', 'Birthdays', 'Night out', 'Concerts & games', 'Prom & homecoming'],
    feats: ['Wraparound lounge seating', 'Color LED party lighting', 'Premium sound system', 'Open dance-floor space', 'Heat & air conditioning', 'Professional chauffeur included'],
  },
  {
    name: 'Limo Vans',
    slug: 'limo-vans',
    folder: 'LimoVan',
    cap: 'Up to 14 passengers',
    img: 'uploads/new-sprinter-limo-page.jpg',
    quoteValue: 'Limo Van · 14',
    // TODO: replace with the real YouTube video ID for the Limo Vans
    video: 'YE7VzlLtp-4',
    intro: 'For smaller parties and executive runs, the Limo Van is the versatile favorite — intimate, understated, and ready for anything from an airport pickup to a night on the town. Executive leather seating and ambient lighting make even the shortest trips feel like part of the celebration.',
    stats: [
      { label: 'Capacity', value: 'Up to 14' },
      { label: 'Ideal group', value: '6–12' },
      { label: 'Style', value: 'Executive' },
    ],
    perfectFor: ['Small parties', 'Airport transfers', 'Date night', 'Corporate travel', 'Wine tours'],
    feats: ['Executive leather seating', 'Ambient LED lighting', 'Bluetooth sound system', 'Heat & air conditioning', 'Ideal for smaller parties & airport transfers', 'Professional chauffeur included'],
  },
];

/* ----------  Services  ---------- */
export const services = [
  { eyebrow: 'Business', title: 'Corporate Events', img: 'uploads/trolleyMidnight.png', body: 'Shuttle a team between venues, welcome clients in from out of town, or give the holiday party a proper beginning. Punctual, polished, and quietly memorable.' },
  { eyebrow: 'School Nights', title: 'Proms & Homecomings', img: 'uploads/trolleyFestive.png', body: 'A safe, chaperone-friendly ride the whole group shares — with a professional chauffeur and room for everyone’s photos before the dance.' },
  { eyebrow: 'Celebrations', title: 'Quinceañeras', img: 'uploads/trolleyBliss.webp', body: 'From the church to the reception with the court all together. The white trolley photographs beautifully beside every gown.' },
  { eyebrow: 'The Last Fling', title: 'Bachelor & Bachelorette Parties', img: 'uploads/trolley-interior.webp', body: 'One cabin, one playlist, zero rideshare logistics. Hop between stops while the party never pauses — BYOB welcome for guests 21 and over.' },
  { eyebrow: 'Game Day', title: 'Sporting Events & Concerts', img: 'uploads/trolleyUltimate.jpg', body: 'Skip the parking scramble. Tailgate on the way, arrive at the gate together, and find your ride waiting when the encore ends.' },
  { eyebrow: 'Travel', title: 'Airport Transportation', img: 'uploads/trolleyFusion.png', body: 'For wedding weekends and group trips: one comfortable pickup for the whole party, with room for every suitcase.' },
  { eyebrow: 'Group Travel', title: 'Coach Bus Charters', img: 'uploads/5-44-Passengers-Coach-Bus-Way-To-Go-Coach-Bus-Rentals.jpg', body: 'When the guest list outgrows the trolley: modern coaches seating up to 57, with quilted leather seats, armrests, and generous under-floor luggage storage. Ideal for wedding guest shuttles, out-of-state trips, and business charters.' },
  { eyebrow: 'After Dark', title: 'Night Out & General Charter', img: 'uploads/trolleyChristmas.png', body: 'Birthdays, anniversaries, holiday light tours, or no occasion at all. Charter the trolley and let the city roll past the windows.' },
];

/* ----------  About  ---------- */
export const aboutTiles = [
  { big: 'Licensed & Insured', small: 'Professional chauffeurs, background-checked and trained.' },
  { big: 'Hand-Detailed', small: 'Both trolleys washed and inspected before every event.' },
  { big: 'Owner-Operated', small: 'You book with the people who drive — no dispatch center.' },
];

/* ----------  Gallery  ---------- */
export const gallery = [
  { src: 'uploads/trolleyClassic.png', alt: 'Classic white trolley in warm winter light' },
  { src: 'uploads/trolley-interior.webp', alt: 'Interior with rose garlands and quilted leather seating' },
  { src: 'uploads/trolleyBliss.webp', alt: 'White trolley, front three-quarter view' },
  { src: 'uploads/trolleyFusion.png', alt: 'Grand trolley with boarding door open' },
  { src: 'uploads/trolleyChristmas.png', alt: 'Trolley at dusk with string lights' },
  { src: 'uploads/trolleyFestive.png', alt: 'Trolley among summer trees' },
  { src: 'uploads/trolleyMidnight.png', alt: 'Trolley on a sunny afternoon' },
  { src: 'uploads/trolleyUltimate.jpg', alt: 'Trolley under a clear winter sky' },
  { src: 'uploads/5-44-Passengers-Coach-Bus-Way-To-Go-Coach-Bus-Rentals.jpg', alt: 'Coach buses at dusk' },
  { src: 'uploads/2-44-Passengers-Coach-Bus-Way-To-Go-Coach-Bus-Rentals_interior1.jpg', alt: 'Coach interior with quilted leather seating for 57' },
  { src: 'uploads/3-44-Passengers-Coach-Bus-Way-To-Go-Motor-Coaches.jpg', alt: 'White coach bus, rear view at dusk' },
];

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
