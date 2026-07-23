import homeHeroDesktop from '../assets/images/home/hero/hero-desktop.png';
import homeHeroMobile from '../assets/images/home/hero/hero-mobile.png';
import womenOwnedWordmark from '../assets/images/branding/certifications/women-owned-wordmark.png';
import wbencCertificate from '../assets/images/branding/certifications/wbenc-certificate.webp';
import wbencLogo from '../assets/images/branding/certifications/wbenc-logo.svg';

export const siteImages = {
  homeHero: {
    desktop: homeHeroDesktop,
    mobile: homeHeroMobile,
  },
  branding: {
    womenOwnedWordmark,
    wbencCertificate,
    wbencLogo,
  },
} as const;
