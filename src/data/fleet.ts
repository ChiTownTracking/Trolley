import type { SiteImage } from '../utils/images';

import trolleyClassicExterior from '../assets/images/fleet/trolley/classic-exterior.png';
import trolleyBoardingExterior from '../assets/images/fleet/trolley/boarding-exterior.png';
import trolleyChristmasLights from '../assets/images/christmas/gallery/christmas-trolley.png';
import trolleyInterior1 from '../assets/images/fleet/trolley/trolley-interior-1.jpeg';
import trolleyInterior2 from '../assets/images/fleet/trolley/trolley-interior-2.jpeg';
import trolleyInterior3 from '../assets/images/fleet/trolley/trolley-interior-3.jpeg';
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
import sprinterExterior from '../assets/images/fleet/sprinter/sprinter-van-exterior.png';
import sprinterInteriorFront from '../assets/images/fleet/sprinter/interior-front.jpg';
import sprinterInteriorRear from '../assets/images/fleet/sprinter/interior-rear.webp';

export const fleetImages = {
  trolley: {
    classicExterior: trolleyClassicExterior,
    boardingExterior: trolleyBoardingExterior,
    interior1: trolleyInterior1,
    interior2: trolleyInterior2,
    interior3: trolleyInterior3,
    christmasLights: trolleyChristmasLights,
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
    exterior: sprinterExterior,
    interiorFront: sprinterInteriorFront,
    interiorRear: sprinterInteriorRear,
  },
} as const;

export interface FleetVehicle {
  name: string;
  slug: string;
  cap: string;
  /** Existing homepage wording, retained exactly where it differs from the fleet page. */
  previewCap: string;
  image: SiteImage;
  gallery: readonly SiteImage[];
  /** Exact "Choose Vehicle" option string, for pre-selecting the quote form. */
  quoteValue: string;
  intro: string;
  stats: { label: string; value: string }[];
  perfectFor: string[];
  feats: string[];
}

export const fleet: FleetVehicle[] = [
  {
    name: 'Classic White Trolley',
    slug: 'classic-white-trolley',
    cap: '30–36 passengers',
    previewCap: '30–36 Passengers',
    image: fleetImages.trolley.classicExterior,
    gallery: [
      fleetImages.trolley.classicExterior,
      fleetImages.trolley.boardingExterior,
      fleetImages.trolley.interior1,
      fleetImages.trolley.interior2,
      fleetImages.trolley.interior3,
    ],
    quoteValue: 'Classic White Trolley · 30–36',
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
    quoteValue: 'Super Coach Bus · 57',
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
    cap: 'Up to 40 passengers',
    previewCap: 'Up to 40 Passengers',
    image: fleetImages.partyBus.exterior,
    gallery: [
      fleetImages.partyBus.exterior,
      fleetImages.partyBus.interior1,
      fleetImages.partyBus.interior2,
    ],
    quoteValue: 'Party Bus · 40',
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
    cap: 'Up to 14 passengers',
    previewCap: 'Up to 14 passengers',
    image: fleetImages.sprinter.exterior,
    gallery: [
      fleetImages.sprinter.exterior,
      fleetImages.sprinter.interiorFront,
      fleetImages.sprinter.interiorRear,
    ],
    quoteValue: 'Limo Van · 14',
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
