export interface GuideCategory {
  slug: string;
  label: string;
}

/** Registry of Guides categories. Add an entry here (+ use its slug in an
 * article's frontmatter `category`) to introduce a new section — e.g.
 * { slug: 'weddings', label: 'Weddings' }, { slug: 'christmas', label: 'Christmas' }. */
export const guideCategories: GuideCategory[] = [{ slug: 'guides', label: 'Guides' }];

export const categoryLabel = (slug: string): string =>
  guideCategories.find((c) => c.slug === slug)?.label ?? slug;

export const formatGuideDate = (date: Date): string =>
  date.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
