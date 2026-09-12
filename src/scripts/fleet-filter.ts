import type { FleetCategory } from '../data/fleet';

type FleetFilter = FleetCategory;

const controls = document.querySelector<HTMLElement>('[data-fleet-filter-controls]');
const status = document.querySelector<HTMLElement>('[data-fleet-filter-status]');
const cards = Array.from(document.querySelectorAll<HTMLElement>('[data-fleet-card]'));

if (controls && status && cards.length > 0) {
  const buttons = Array.from(
    controls.querySelectorAll<HTMLButtonElement>('[data-fleet-filter]'),
  );

  const categoryNames: Record<
    FleetCategory,
    { singular: string; plural: string }
  > = {
    trolley: { singular: 'trolley vehicle', plural: 'trolley vehicles' },
    'coach-bus': { singular: 'coach bus', plural: 'coach buses' },
    'party-bus': { singular: 'party bus', plural: 'party buses' },
    'limo-van': { singular: 'limo van', plural: 'limo vans' },
  };

  const resultMessage = (filter: FleetFilter, count: number) => {
    if (count === 0) {
      return 'No vehicles are currently listed in this category.';
    }

    const noun = count === 1
      ? categoryNames[filter].singular
      : categoryNames[filter].plural;
    return `Showing ${count} ${noun}.`;
  };

  const applyFilter = (filter: FleetFilter, activatedButton: HTMLButtonElement) => {
    const focusedElement = document.activeElement;
    const focusedCard = focusedElement instanceof Element
      ? focusedElement.closest<HTMLElement>('[data-fleet-card]')
      : null;
    const focusWouldBeHidden = Boolean(
      focusedCard
      && focusedCard.dataset.fleetCategory !== filter,
    );

    let visibleCount = 0;
    cards.forEach((card) => {
      const matches = card.dataset.fleetCategory === filter;
      card.hidden = !matches;
      if (matches) visibleCount += 1;
    });

    buttons.forEach((button) => {
      button.setAttribute(
        'aria-pressed',
        String(button.dataset.fleetFilter === filter),
      );
    });

    status.textContent = resultMessage(filter, visibleCount);

    if (focusWouldBeHidden) {
      activatedButton.focus();
    }
  };

  const buttonFor = (filter: FleetFilter) =>
    buttons.find((button) => button.dataset.fleetFilter === filter);

  const isFleetFilter = (value: string): value is FleetFilter =>
    Object.prototype.hasOwnProperty.call(categoryNames, value);

  buttons.forEach((button) => {
    button.addEventListener('click', () => {
      const filter = button.dataset.fleetFilter as FleetFilter | undefined;
      if (!filter) return;
      applyFilter(filter, button);
      // Reflect the choice in the URL so the view can be linked and shared.
      // replaceState keeps the back button out of the filter history.
      history.replaceState(null, '', `#${filter}`);
    });
  });

  // The header's Fleet dropdown links to /fleet#<category>, so the hash decides
  // the starting filter; anything else falls back to trolley.
  const filterFromHash = (): FleetFilter => {
    const hash = decodeURIComponent(location.hash.replace(/^#/, ''));
    return isFleetFilter(hash) ? hash : 'trolley';
  };

  const applyFromHash = () => {
    const filter = filterFromHash();
    const button = buttonFor(filter);
    if (button) applyFilter(filter, button);
  };

  applyFromHash();
  // Same-page hash links (dropdown clicks while already on /fleet) fire this
  // instead of a navigation.
  window.addEventListener('hashchange', applyFromHash);
}
