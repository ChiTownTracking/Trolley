import christmasTrolley01 from '../assets/images/christmas/gallery/christmas-trolley-01.jpg';
import christmasTrolley02 from '../assets/images/christmas/gallery/christmas-trolley-02.jpg';
import christmasTrolley04 from '../assets/images/christmas/gallery/christmas-trolley-04.jpg';
import christmasTrolley05 from '../assets/images/christmas/gallery/christmas-trolley-05.jpg';
import christmasTrolley06 from '../assets/images/christmas/gallery/christmas-trolley-06.jpg';
import cornerWreath from '../assets/images/christmas/decorative/corner-wreath.webp';
import garlandStrand from '../assets/images/christmas/decorative/garland-strand.webp';
import garlandStripBottom from '../assets/images/christmas/decorative/garland-strip-bottom.webp';

/** Explicit order preserves the approved Christmas gallery sequence. */
export const christmasGallery = [
  christmasTrolley01,
  christmasTrolley02,
  christmasTrolley04,
  christmasTrolley05,
  christmasTrolley06,
] as const;

export const christmasDecor = {
  cornerWreath,
  garlandStrand,
  garlandStripBottom,
} as const;
