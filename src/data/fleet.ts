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
import coachExteriorDusk from '../assets/images/fleet/coach/exterior-dusk.png';
import coachBus44Exterior from '../assets/images/fleet/coach/coach-bus-44-exterior.webp';
import coachBus44Interior from '../assets/images/fleet/coach/coach-bus-44-interior.webp';
import coachBus28Exterior from '../assets/images/fleet/coach/coach-bus-28-exterior.webp';
import coachBus28Interior from '../assets/images/fleet/coach/coach-bus-28-interior.webp';
import coachExterior1 from '../assets/images/fleet/coach/coach-bus-exterior-1.jpeg';
import coachExterior2 from '../assets/images/fleet/coach/coach-bus-exterior-2.jpeg';
import coachExterior3 from '../assets/images/fleet/coach/coach-bus-exterior-3.jpeg';
import coachInteriorDaylight from '../assets/images/fleet/coach/interior-daylight.jpeg';
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
    exteriorDusk: coachExteriorDusk,
    interiorDaylight: coachInteriorDaylight,
    bus44Exterior: coachBus44Exterior,
    bus44Interior: coachBus44Interior,
    bus28Exterior: coachBus28Exterior,
    bus28Interior: coachBus28Interior,
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
    cap: '30 passengers',
    previewCap: '30 Passengers',
    image: fleetImages.trolley.classicExterior,
    hoverImage: fleetImages.trolley.classicInteriorFrontFacing,
    gallery: [
      fleetImages.trolley.classicExterior,
      fleetImages.trolley.classicInteriorFrontFacing,
      fleetImages.trolley.classicInteriorFrontFacing2,
    ],
    quoteValue: 'White Trolley — Classic',
    intro: 'There is something about an open-air trolley that turns a simple drive into an occasion. Polished rails, a rear balcony made for the photos everyone remembers, and forward-facing rows give the Classic White Trolley a familiar, orderly layout. From the first stop to the last, it sets a timeless, old-world tone for the day. If rear-balcony photos are part of your plan, ask the team to confirm this trolley for your date.',
    stats: [
      { label: 'Capacity', value: '30' },
      { label: 'Ideal group', value: '20–30' },
      { label: 'Minimum', value: '3 hours' },
    ],
    perfectFor: ['Wedding ceremonies', 'Bridal party transport', 'Vineyard & brewery tours', 'Engagement photos', 'Holiday light tours'],
    feats: ['Classic-model rear balcony platform', 'Forward-facing seating', 'Bluetooth sound system', 'Heat & air conditioning', 'Professional chauffeur included'],
  },
  {
    name: 'White Limo Trolley',
    slug: 'white-limo-trolley',
    category: 'trolley',
    cap: '36 passengers',
    previewCap: '36 Passengers',
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
      { label: 'Capacity', value: '36' },
      { label: 'Seating', value: 'Circular limo-style' },
      { label: 'Layout', value: 'Open center aisle' },
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
    quoteValue: 'Festive Trolley — Red & Green',
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
    cap: '50–57 passengers',
    previewCap: 'Up to 57 guests',
    image: fleetImages.coach.exteriorDusk,
    hoverImage: fleetImages.coach.interiorDaylight,
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
      { label: 'Capacity', value: '50–57' },
      { label: 'Ideal group', value: '40–57' },
      { label: 'Luggage', value: 'Ample' },
    ],
    perfectFor: ['Guest shuttles', 'Corporate events', 'Airport transfers', 'Out-of-state trips', 'Sporting events & concerts'],
    feats: ['Quilted leather seats with armrests', 'Generous luggage storage', 'Heat & air conditioning', 'Ideal for wedding guest shuttles & out-of-state trips', 'Professional chauffeur included'],
  },
  {
    name: 'Coach Bus',
    slug: 'coach-bus-44',
    category: 'coach-bus',
    cap: '39–44 passengers',
    previewCap: 'Up to 44 guests',
    image: fleetImages.coach.bus44Exterior,
    hoverImage: fleetImages.coach.bus44Interior,
    gallery: [
      fleetImages.coach.bus44Exterior,
      fleetImages.coach.bus44Interior,
    ],
    quoteValue: 'Coach Bus — 44 Passengers',
    intro: 'The middle of the coach range — a full motorcoach for the group that has outgrown a small bus but will not fill a Super Coach. High-back reclining leather, overhead storage and the same smooth ride, sized so you are not paying for rows nobody sits in.',
    stats: [
      { label: 'Capacity', value: '39–44' },
      { label: 'Ideal group', value: '30–44' },
      { label: 'Luggage', value: 'Overhead + limited under' },
    ],
    perfectFor: ['Guest shuttles', 'Corporate outings', 'Airport transfers', 'Day trips', 'School & team travel'],
    feats: ['High-back reclining leather seats', 'Lavatory available on request', 'Overhead luggage space', 'Sound system with onboard PA', 'Seatbelts at every seat', 'USB charging ports'],
  },
  {
    name: 'Small Coach Bus',
    slug: 'coach-bus-28',
    category: 'coach-bus',
    cap: '22–28 passengers',
    previewCap: 'Up to 28 guests',
    image: fleetImages.coach.bus28Exterior,
    hoverImage: fleetImages.coach.bus28Interior,
    gallery: [
      fleetImages.coach.bus28Exterior,
      fleetImages.coach.bus28Interior,
    ],
    quoteValue: 'Coach Bus — 28 Passengers',
    intro: 'A true coach at the smaller end of the range, so a mid-size group still travels together in one vehicle instead of splitting across two vans. Quilted leather seating, overhead storage and coach comfort in a frame that handles tighter city streets.',
    stats: [
      { label: 'Capacity', value: '22–28' },
      { label: 'Ideal group', value: '18–28' },
      { label: 'Luggage', value: 'Overhead' },
    ],
    perfectFor: ['Wedding parties', 'Corporate shuttles', 'Airport transfers', 'Winery & brewery tours', 'City tours'],
    feats: ['High-back reclining leather seats', 'Overhead luggage space', 'Sound system with onboard PA', 'Seatbelts at every seat', 'USB charging ports', 'Professional chauffeur included'],
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
