




import type { ContentVisibility } from './content-visibility.js';
import type { TransactionMethod, TransactionType } from './product-transactions.js';
import type { VideoEmbed, Reference } from './blog.js';

export {
	getAddressingForVisibility,
	inferVisibilityFromAddressing,
	isVisibleTo,
	VISIBILITY_LABELS,
	VISIBILITY_ICONS
} from './content-visibility.js';

export type { ContentVisibility } from './content-visibility.js';

export type FediverseVisibility = ContentVisibility;

export interface BaseFrontmatter {
	title?: string;
	description?: string;
	slug?: string;
	publishedAt?: string;
	updatedAt?: string;
	visibility?: FediverseVisibility;
	author?: string;
	tags?: string[];
}

export interface ContactFrontmatter extends BaseFrontmatter {
	handle: string;
	email?: string;
	preferredContact?: 'email' | 'fediverse' | 'matrix' | 'signal' | 'other';
	fediverseHandle?: string;
	matrixId?: string;
	publicKey?: boolean;
	pgpFingerprint?: string;
	publicKeyUrl?: string;
}

export interface UserPageFrontmatter extends BaseFrontmatter {
	handle: string;
	type?: 'page' | 'about' | 'portfolio' | 'resume';
	featured?: boolean;
}

export interface ExtendedProductFrontmatter {
	name: string;
	slug: string;
	description: string;
	category: string;
	transactions?: TransactionMethod[];
	primaryTransaction?: TransactionType;
	relatedPosts?: string[];
	relatedProducts?: string[];
	visibility?: FediverseVisibility;
	activityPubId?: string;
	price?: number;
	currency?: 'USD' | 'EUR' | 'GBP' | 'free';
	license?: string;
	version?: string;
	featured?: boolean;
	image?: string;
	excerpt?: string;
	tagline?: string;
	tags?: string[];
	published?: boolean;
	publishedAt?: string;
	updatedAt?: string;
}

export interface ExtendedBlogFrontmatter {
	title: string;
	date?: string;
	publishedAt?: string;
	published?: boolean;
	draft?: boolean;
	featured?: boolean;
	author?: { name: string; handle?: string; avatar?: string };
	excerpt?: string;
	coverImage?: string;
	readingTime?: number;
	wordCount?: number;
	categories?: string[];
	tags?: string[];
	series?: string;
	seriesOrder?: number;
	relatedProducts?: string[];
	relatedPosts?: string[];
	videos?: VideoEmbed[];
	references?: Reference[];
	visibility?: FediverseVisibility;
	activityPubId?: string;
	seo?: { title?: string; description?: string; keywords?: string[] };
}

export interface ContentWithRelations<T> {
	frontmatter: T;
	content: string;
	slug: string;
	filePath?: string;
	relatedItems?: {
		products?: Array<{ slug: string; name: string; excerpt?: string }>;
		posts?: Array<{ slug: string; title: string; excerpt?: string }>;
	};
}
