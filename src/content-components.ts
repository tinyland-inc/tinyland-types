/**
 * Content Component Types
 * Shared types for reusable content sub-components
 */

import type { ContentVisibility } from './content-visibility.js';

// ============================================================================
// Reading Progress Types
// ============================================================================

/**
 * Reading progress variant
 */
export type ProgressVariant = 'circular' | 'bar';

// ============================================================================
// Series Navigation Types
// ============================================================================

/**
 * Post in a series
 */
export interface SeriesPost {
	/** URL slug */
	slug: string;
	/** Post title */
	title: string;
	/** Order within series (1-based) */
	order: number;
}

// ============================================================================
// Author Types
// ============================================================================

/**
 * Author information for content display
 */
export interface ContentAuthor {
	/** Display name */
	name: string;
	/** Handle/username (without @) */
	handle?: string;
	/** Avatar image URL */
	avatar?: string;
	/** Profile URL (local) */
	url?: string;
	/** ActivityPub actor URL (for federation) */
	actorUrl?: string;
	/** Author bio/description */
	bio?: string;
}

/**
 * Props for AuthorCard component
 */
export interface AuthorCardProps {
	author: ContentAuthor;
	variant?: 'compact' | 'full';
	showAvatar?: boolean;
	showHandle?: boolean;
	class?: string;
}

// ============================================================================
// Meta Badge Types
// ============================================================================

/**
 * Props for MetaBadges component
 */
export interface MetaBadgesProps {
	publishedAt?: string;
	updatedAt?: string;
	readingTime?: number;
	visibility?: ContentVisibility;
	showDate?: boolean;
	showReadingTime?: boolean;
	showVisibility?: boolean;
	showUpdatedAt?: boolean;
	size?: 'sm' | 'md' | 'lg';
	class?: string;
}

// ============================================================================
// Hero Image Types
// ============================================================================

/**
 * Props for HeroImage component
 */
export interface HeroImageProps {
	src: string;
	alt: string;
	blurHash?: string;
	aspectRatio?: string;
	showOverlay?: boolean;
	overlayDirection?: 'top' | 'bottom' | 'left' | 'right';
	priority?: boolean;
	class?: string;
}

// ============================================================================
// Content Title Types
// ============================================================================

/**
 * Badge configuration for content titles
 */
export interface ContentBadge {
	label: string;
	preset?: string;
	icon?: string;
}

/**
 * Props for ContentTitle component
 */
export interface ContentTitleProps {
	title: string;
	subtitle?: string;
	badges?: ContentBadge[];
	level?: 1 | 2 | 3 | 4 | 5 | 6;
	class?: string;
}

// ============================================================================
// Frontmatter Normalization
// ============================================================================

/**
 * Normalized frontmatter for display components
 */
export interface NormalizedFrontmatter {
	title: string;
	subtitle?: string;
	excerpt?: string;
	publishedAt?: string;
	updatedAt?: string;
	author?: ContentAuthor;
	heroImage?: string;
	heroBlurHash?: string;
	readingTime?: number;
	visibility?: ContentVisibility;
	isDraft?: boolean;
	isScheduled?: boolean;
	categories?: string[];
	tags?: string[];
}

/**
 * Normalize various frontmatter formats to consistent structure
 */
export function normalizeFrontmatter(
	frontmatter: Record<string, unknown>
): NormalizedFrontmatter {
	let author: ContentAuthor | undefined;
	if (typeof frontmatter.author === 'object' && frontmatter.author !== null) {
		const a = frontmatter.author as Record<string, unknown>;
		author = {
			name: (a.name as string) || 'Unknown',
			handle: a.handle as string,
			avatar: a.avatar as string,
			url: a.url as string,
			actorUrl: a.actorUrl as string
		};
	} else if (typeof frontmatter.author === 'string') {
		author = { name: frontmatter.author };
	}

	if (!author && typeof frontmatter.organizer === 'object') {
		const o = frontmatter.organizer as Record<string, unknown>;
		author = {
			name: (o.name as string) || 'Unknown',
			handle: o.handle as string
		};
	}
	if (!author && typeof frontmatter.coordinator === 'object') {
		const c = frontmatter.coordinator as Record<string, unknown>;
		author = {
			name: (c.name as string) || 'Unknown',
			handle: c.handle as string
		};
	}

	const heroImage =
		(frontmatter.heroImage as string) ||
		(frontmatter.featuredImage as string) ||
		(frontmatter.coverImage as string) ||
		(frontmatter.image as string);

	const publishedAt =
		(frontmatter.publishedAt as string) ||
		(frontmatter.date as string) ||
		(frontmatter.createdAt as string);

	const updatedAt =
		(frontmatter.updatedAt as string) || (frontmatter.lastModified as string);

	const visibility = frontmatter.visibility as ContentVisibility | undefined;

	const isDraft =
		frontmatter.draft === true ||
		frontmatter.published === false ||
		frontmatter.status === 'draft';

	const isScheduled =
		frontmatter.status === 'scheduled' ||
		(publishedAt ? new Date(publishedAt) > new Date() : false);

	return {
		title: (frontmatter.title as string) || 'Untitled',
		subtitle: (frontmatter.subtitle as string) || (frontmatter.tagline as string),
		excerpt: (frontmatter.excerpt as string) || (frontmatter.description as string),
		publishedAt,
		updatedAt,
		author,
		heroImage,
		heroBlurHash: frontmatter.heroBlurHash as string,
		readingTime: frontmatter.readingTime as number,
		visibility,
		isDraft,
		isScheduled,
		categories: frontmatter.categories as string[],
		tags: frontmatter.tags as string[]
	};
}

// ============================================================================
// Related Content Types
// ============================================================================

/**
 * Related content item (post or product)
 */
export interface RelatedItem {
	slug: string;
	title: string;
	excerpt?: string;
	image?: string;
	type?: 'blog' | 'product' | 'event' | 'program';
}
