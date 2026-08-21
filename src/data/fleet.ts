import type { SiteImage } from '../utils/images';

import trolleyClassicExterior from '../assets/images/fleet/trolley/classic-exterior.png';
import trolleyClassicInteriorFrontFacing from '../assets/images/fleet/trolley/classic-Trolley-interior-frontfacing.png';
import trolleyClassicInteriorFrontFacing2 from '../assets/images/fleet/trolley/classic-Trolley-interior-frontfacing2.png';
import trolleyT4Exterior from '../assets/images/fleet/trolley/T4-Trolley-Exterior.png';
import trolleyT4ExteriorFront from '../assets/images/fleet/trolley/T4-Trolley-Exterior-front.png';
import trolleyT4ExteriorSide from '../assets/images/fleet/trolley/T4-Trolley-Exterior-side.png';
import trolleyT4Interior1 from '../assets/images/fleet/trolley/T4-Trolley-Interior-1.png';
import trolleyT4Interior2 from '../assets/images/fleet/trolley/T4-Trolley-Interior-2.png';
import trolleyT4InteriorLighting from '../assets/images/fleet/trolley/T4-Trolley-Interior-Lighting.png';
import trolleyFestiveExterior from '../assets/images/fleet/trolley/green-red-festive-trolley.png';
import trolleyChristmasLights from '../assets/images/christmas/gallery/christmas-trolley.png';
import trolleyChristmasInterior from '../assets/images/christmas/gallery/christmas-interior.png';
import coachExterior1 from '../assets/images/fleet/coach/coach-bus-exterior-1.jpeg';
import coachExterior2 from '../assets/images/fleet/coach/coach-bus-exterior-2.jpeg';
import coachExterior3 from '../assets/images/fleet/coach/coach-bus-exterior-3.jpeg';
import coachInterior1 from '../assets/images/fleet/coach/interior1.jpeg';
import coachInterior2 from '../assets/images/fleet/coach/interior2.jpeg';
import coachInterior3 from '../assets/images/fleet/coach/interior3.jpeg';
import coachWashroom1 from '../assets/images/fleet/coach/coach-bus-washroom-1.jpeg';
import coachWashroom2 from '../assets/images/fleet/coach/coach-bus-washroom-2.jpeg';
import partyBusExterior from '../assets/images/fleet/party-bus/exterior.jpg';
import partyBusInterior1 from '../assets/images/fleet/party-bus/party-bus-interior-1.jpeg';
import partyBusInterior2 from '../assets/images/fleet/party-bus/party-bus-interior-2.jpeg';
import limoVanFront from '../assets/images/fleet/sprinter/limo van/limo-van-front.png';
import limoVanBack from '../assets/images/fleet/sprinter/limo van/limo-van-back.png';
import limoVanInterior from '../assets/images/fleet/sprinter/limo van/limo-van-interior.png';
import executiveVanFront from '../assets/images/fleet/sprinter/limo van excutive/excutive-van-front.png';
import executiveVanSide from '../assets/images/fleet/sprinter/limo van excutive/excutive-van-side.png';
import executiveVanInterior from '../assets/images/fleet/sprinter/limo van excutive/excutive-van-interior.png';
import executiveVanInteriorDetail from '../assets/images/fleet/sprinter/limo van excutive/excutive-van-interior-1.png';

export const fleetImages = {
  trolley: {
    classicExterior: trolleyClassicExterior,
    classicInteriorFrontFacing: trolleyClassicInteriorFrontFacing,
    classicInteriorFrontFacing2: trolleyClassicInteriorFrontFacing2,
    t4Exterior: trolleyT4Exterior,
    t4ExteriorFront: trolleyT4ExteriorFront,
    t4ExteriorSide: trolleyT4ExteriorSide,
    t4Interior1: trolleyT4Interior1,
    t4Interior2: trolleyT4Interior2,
    t4InteriorLighting: trolleyT4InteriorLighting,
    festiveExterior: trolleyFestiveExterior,
    christmasLights: trolleyChristmasLights,
    christmasInterior: trolleyChristmasInterior,
  },
  coach: {
    exterior1: coachExterior1,
    exterior2: coachExterior2,
    exterior3: coachExterior3,
    interior1: coachInterior1,
    interior2: coachInterior2,
    interior3: coachInterior3,
    washroom1: coachWashroom1,
    washroom2: coachWashroom2,
  },
  partyBus: {
    exterior: partyBusExterior,
    interior1: partyBusInterior1,
    interior2: partyBusInterior2,
  },
  sprinter: {
    limoVan: {
      front: limoVanFront,
      back: limoVanBack,
      interior: limoVanInterior,
    },
    executiveVan: {
      front: executiveVanFront,
      side: executiveVanSide,
      interior: executiveVanInterior,
      interiorDetail: executiveVanInteriorDetail,
    },
  },
} as const;

export type FleetCategory =
  | 'trolley'
  | 'coach-bus'
  | 'party-bus'
  | 'limo-van';

export interface FleetVehicle {
  name: string;
  slug: string;
  category: FleetCategory;
  cap: string;
  /** Existing homepage wording, retained exactly where it differs from the fleet page. */
  previewCap: string;
  image: SiteImage;
  /** Optional alternate image revealed on the main fleet card. */
  hoverImage?: SiteImage;
  gallery: readonly SiteImage[];
  /** Exact "Choose Vehicle" option string, for pre-selecting the quote form. */
  quoteValue: string;
  /** Marks vehicles announced on the site before service availability begins. */
  comingSoon?: boolean;
  intro: string;
  stats: { label: string; value: string }[];
  perfectFor: string[];
  feats: string[];
}

export const fleet: FleetVehicle[] = [
  {
    name: 'Classic White Trolley',
    slug: 'classic-white-trolley',
    category: 'trolley',
    cap: '30–36 passengers',
    previewCap: '30–36 Passengers',
    image: fleetImages.trolley.classicExterior,
    hoverImage: fleetImages.trolley.classicInteriorFrontFacing,
    gallery: [
      fleetImages.trolley.classicExterior,
      fleetImages.trolley.classicInteriorFrontFacing,
      fleetImages.trolley.classicInteriorFrontFacing2,
    ],
    quoteValue: 'White Trolley — Classic',
    intro: 'There is something about an open-air trolley that turns a simple drive into an occasion. Polished rails, a rear balcony made for the photos everyone remembers, and forward-facing rows give the Classic White Trolley a familiar, orderly layout. From the first stop to the last, it sets a timeless, old-world tone for the day.',
    stats: [
      { label: 'Capacity', value: '30–36' },
      { label: 'Ideal group', value: '20–34' },
      { label: 'Minimum', value: '3 hours' },
    ],
    perfectFor: ['Wedding ceremonies', 'Bridal party transport', 'Vineyard & brewery tours', 'Engagement photos', 'Holiday light tours'],
    feats: ['Rear balcony platform', 'Forward-facing seating', 'Bluetooth sound system', 'Heat & air conditioning', 'Professional chauffeur included'],
  },
  {
    name: 'White Limo Trolley',
    slug: 'white-limo-trolley',
    category: 'trolley',
    cap: 'Circular limo-style seating',
    previewCap: 'Circular Limo-Style Seating',
    image: fleetImages.trolley.t4Exterior,
    hoverImage: fleetImages.trolley.t4Interior2,
    gallery: [
      fleetImages.trolley.t4Exterior,
      fleetImages.trolley.t4ExteriorFront,
      fleetImages.trolley.t4ExteriorSide,
      fleetImages.trolley.t4Interior1,
      fleetImages.trolley.t4Interior2,
      fleetImages.trolley.t4InteriorLighting,
    ],
    quoteValue: 'White Trolley — Limo',
    intro: 'Designed around conversation and celebration, the White Limo Trolley uses circular perimeter seating so the group can face one another while riding together. Its wood-finished cabin and open center aisle create a social trolley experience for weddings, private events and nights out.',
    stats: [
      { label: 'Seating', value: 'Circular limo-style' },
      { label: 'Layout', value: 'Perimeter benches' },
      { label: 'Interior', value: 'Open center aisle' },
    ],
    perfectFor: ['Wedding parties', 'Private celebrations', 'Night-out transportation', 'Photo tours', 'Group charters'],
    feats: ['Circular limo-style seating', 'Group-facing interior layout', 'Wood-finished trolley cabin', 'Open center aisle', 'Professional chauffeur included'],
  },
  {
    name: 'Festive Trolley',
    slug: 'festive-trolley',
    category: 'trolley',
    cap: 'Coming Soon',
    previewCap: 'Coming Soon',
    image: fleetImages.trolley.festiveExterior,
    gallery: [fleetImages.trolley.festiveExterior],
    quoteValue: 'Festive Trolley (Coming Soon)',
    comingSoon: true,
    intro: 'The Festive Trolley is joining the ChiTown Trolley fleet soon. Its distinctive green-and-red exterior brings a celebratory look to seasonal outings, private events and memorable group transportation. Share your date and trip details to ask about future availability.',
    stats: [
      { label: 'Availability', value: 'Coming Soon' },
      { label: 'Exterior', value: 'Green & red' },
      { label: 'Service details', value: 'To be announced' },
    ],
    perfectFor: ['Seasonal celebrations', 'Holiday events', 'Private events', 'Group transportation', 'Photo opportunities'],
    feats: ['Distinctive green-and-red exterior', 'Festive trolley styling', 'Availability coming soon', 'Additional service details to be announced'],
  },
  {
    name: 'Super Coach Bus',
    slug: 'super-coach-bus',
    category: 'coach-bus',
    cap: 'Up to 57 passengers',
    previewCap: 'Up to 57 guests',
    image: fleetImages.coach.exterior1,
    gallery: [
      fleetImages.coach.exterior1,
      fleetImages.coach.exterior2,
      fleetImages.coach.exterior3,
      fleetImages.coach.interior1,
      fleetImages.coach.interior2,
      fleetImages.coach.interior3,
      fleetImages.coach.washroom1,
      fleetImages.coach.washroom2,
    ],
    quoteValue: 'Super Coach Bus — 57 Passengers',
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
    category: 'party-bus',
    cap: 'Up to 40 passengers',
    previewCap: 'Up to 40 Passengers',
    image: fleetImages.partyBus.exterior,
    gallery: [
      fleetImages.partyBus.exterior,
      fleetImages.partyBus.interior1,
      fleetImages.partyBus.interior2,
    ],
    quoteValue: 'Party Bus — 40 Passengers',
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
    name: 'Limo Van',
    slug: 'limo-vans',
    category: 'limo-van',
    cap: 'Up to 14 passengers',
    previewCap: 'Up to 14 passengers',
    image: fleetImages.sprinter.limoVan.front,
    hoverImage: fleetImages.sprinter.limoVan.interior,
    gallery: [
      fleetImages.sprinter.limoVan.front,
      fleetImages.sprinter.limoVan.back,
      fleetImages.sprinter.limoVan.interior,
    ],
    quoteValue: 'Sprinter — Limo',
    intro: 'The Limo Van is built for celebration, pairing wraparound diamond-stitched seating with color-changing ceiling and accent lighting. It gives smaller wedding parties, birthdays and nights out a private lounge atmosphere while a professional chauffeur handles every stop.',
    stats: [
      { label: 'Capacity', value: 'Up to 14' },
      { label: 'Layout', value: 'Wraparound lounge' },
      { label: 'Atmosphere', value: 'Color LED lighting' },
    ],
    perfectFor: ['Wedding parties', 'Birthdays', 'Bachelor & bachelorette parties', 'Night out', 'Private celebrations'],
    feats: ['Wraparound leather lounge seating', 'Color-changing ceiling and accent lighting', 'Wood-look flooring', 'Heat & air conditioning', 'Professional chauffeur included'],
  },
  {
    name: 'Executive Van',
    slug: 'executive-van',
    category: 'limo-van',
    cap: 'Executive-style seating',
    previewCap: 'Executive-Style Seating',
    image: fleetImages.sprinter.executiveVan.front,
    hoverImage: fleetImages.sprinter.executiveVan.interior,
    gallery: [
      fleetImages.sprinter.executiveVan.front,
      fleetImages.sprinter.executiveVan.side,
      fleetImages.sprinter.executiveVan.interior,
      fleetImages.sprinter.executiveVan.interiorDetail,
    ],
    quoteValue: 'Sprinter — Executive',
    intro: 'The Executive Van brings a quieter, business-ready setup to group travel, with individual high-back leather seats, a conference table and a refined black cabin. It is a comfortable choice for airport transfers, corporate transportation and smaller groups that prefer personal seating.',
    stats: [
      { label: 'Seating', value: 'Individual high-back' },
      { label: 'Workspace', value: 'Conference table' },
      { label: 'Style', value: 'Executive' },
    ],
    perfectFor: ['Airport transfers', 'Corporate travel', 'Executive transportation', 'Small group charters', 'Client transportation'],
    feats: ['Individual high-back leather seating', 'Conference table', 'Interior reading lights', 'Heat & air conditioning', 'Professional chauffeur included'],
  },
];
