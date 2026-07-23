import type { SiteImage } from '../utils/images';
import { publicImage } from '../utils/images';

import trolleyClassicExterior from '../assets/images/fleet/trolley/classic-exterior.png';
import trolleyFrontThreeQuarter from '../assets/images/fleet/trolley/front-three-quarter.png';
import trolleyFrontThreeQuarterWebp from '../assets/images/fleet/trolley/front-three-quarter.webp';
import trolleySummerExterior from '../assets/images/fleet/trolley/summer-exterior.png';
import trolleyBoardingExterior from '../assets/images/fleet/trolley/boarding-exterior.png';
import trolleyAfternoonExterior from '../assets/images/fleet/trolley/afternoon-exterior.png';
import trolleyWinterExterior from '../assets/images/fleet/trolley/winter-exterior.jpg';
import coachExteriorRearDusk from '../assets/images/fleet/coach/exterior-rear-dusk.jpg';
import coachInterior from '../assets/images/fleet/coach/interior.jpg';
import partyBusExterior from '../assets/images/fleet/party-bus/exterior.jpg';
import sprinterExterior from '../assets/images/fleet/sprinter/exterior.jpg';
import sprinterInteriorFront from '../assets/images/fleet/sprinter/interior-front.jpg';
import sprinterInteriorRear from '../assets/images/fleet/sprinter/interior-rear.webp';

export const fleetImages = {
  trolley: {
    classicExterior: trolleyClassicExterior,
    frontThreeQuarter: trolleyFrontThreeQuarter,
    frontThreeQuarterWebp: trolleyFrontThreeQuarterWebp,
    interior: publicImage('/images/guides/trolley-interior.webp', 555, 327, 'webp'),
    summerExterior: trolleySummerExterior,
    boardingExterior: trolleyBoardingExterior,
    afternoonExterior: trolleyAfternoonExterior,
    winterExterior: trolleyWinterExterior,
    christmasLights: publicImage('/images/guides/trolley-christmas-lights.png', 555, 327, 'png'),
  },
  coach: {
    exteriorRearDusk: coachExteriorRearDusk,
    exteriorSideDusk: publicImage('/images/guides/coach-exterior-side-dusk.jpg', 1100, 733, 'jpeg'),
    interior: coachInterior,
  },
  partyBus: {
    exterior: partyBusExterior,
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
    cap: '30–36 passengers',
    previewCap: '30–36 Passengers',
    image: fleetImages.trolley.classicExterior,
    gallery: [
      fleetImages.trolley.classicExterior,
      fleetImages.trolley.frontThreeQuarter,
      fleetImages.trolley.interior,
      fleetImages.trolley.summerExterior,
      fleetImages.trolley.boardingExterior,
      fleetImages.trolley.afternoonExterior,
      fleetImages.trolley.winterExterior,
    ],
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
    cap: 'Up to 57 passengers',
    previewCap: 'Up to 57 guests',
    image: fleetImages.coach.exteriorRearDusk,
    gallery: [
      fleetImages.coach.exteriorRearDusk,
      fleetImages.coach.exteriorSideDusk,
      fleetImages.coach.interior,
    ],
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
    cap: 'Up to 40 passengers',
    previewCap: 'Up to 40 Passengers',
    image: fleetImages.partyBus.exterior,
    gallery: [fleetImages.partyBus.exterior],
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
    cap: 'Up to 14 passengers',
    previewCap: 'Up to 14 passengers',
    image: fleetImages.sprinter.exterior,
    gallery: [
      fleetImages.sprinter.exterior,
      fleetImages.sprinter.interiorFront,
      fleetImages.sprinter.interiorRear,
    ],
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
