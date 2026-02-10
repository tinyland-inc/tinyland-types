/**
 * Blog post type definitions
 */

import type { ContentVisibility } from './content-visibility.js';
import type { AuthorReference } from './author.js';
import type { BlogHarnessConfig } from './harness-config.js';

export type { BlogHarnessConfig };

/**
 * Video embed information for blog posts
 */
export interface VideoEmbed {
	url: string;
	title: string;
	platform: 'youtube' | 'peertube' | 'vimeo';
	thumbnailUrl?: string;
	videoId?: string;
}

/**
 * External reference/citation information
 */
export interface Reference {
	title: string;
	url: string;
	description?: string;
	author?: string;
}

/**
 * Blog post frontmatter interface
 */
export interface BlogFrontmatter {
	title: string;
	date?: string;
	publishedAt?: string;
	lastModified?: string;
	slug?: string;
	layout?: 'blog';
	author?: AuthorReference | string;
	authorEmail?: string;
	authorAvatar?: string;
	excerpt?: string;
	description?: string;
	featuredImage?: string;
	heroImage?: string;
	coverImage?: string;
	published?: boolean;
	draft?: boolean;
	featured?: boolean;
	tags?: string[];
	categories?: string[];
	series?: string;
	seriesOrder?: number;
	seoTitle?: string;
	seoDescription?: string;
	ogImage?: string;
	canonicalUrl?: string;
	readingTime?: number;
	wordCount?: number;
	visibility?: ContentVisibility;
	relatedProducts?: string[];
	relatedPosts?: string[];
	videos?: VideoEmbed[];
	references?: Reference[];
	ui?: BlogHarnessConfig;
}

export interface BlogPost {
	frontmatter: BlogFrontmatter;
	content: string;
	slug: string;
	readingTime?: number;
	wordCount?: number;
}

export interface BlogPostWithStats extends BlogPost {
	views?: number;
	likes?: number;
	comments?: number;
}

export interface BlogCategory {
	name: string;
	slug: string;
	description?: string;
	postCount: number;
}

export interface BlogAuthor {
	name: string;
	email?: string;
	avatar?: string;
	bio?: string;
	social?: {
		twitter?: string;
		github?: string;
		linkedin?: string;
		website?: string;
	};
	postCount?: number;
}
