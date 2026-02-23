








import type { ProgressVariant, SeriesPost, RelatedItem } from './content-components.js';
import type { BlogFrontmatter } from './blog.js';
import type { ActivityPubStats, FederationStatus } from './activitypub-ui.js';
import type { ProductFrontmatter } from './product.js';


export type { ProgressVariant, SeriesPost } from './content-components.js';





export type LayoutMode = 'full' | 'prose' | 'wide';
export type SidebarPosition = 'left' | 'right';

export interface HarnessConfig {
	showHeader?: boolean;
	showSidebar?: boolean;
	showFooter?: boolean;
	sidebarPosition?: SidebarPosition;
	layout?: LayoutMode;
	stickySidebar?: boolean;
	containerPadding?: string;
	contentBackground?: string;
	proseContent?: boolean;
	sidebarBreakpoint?: 'md' | 'lg' | 'xl';
}

export interface ResolvedHarnessConfig {
	showHeader: boolean;
	showSidebar: boolean;
	showFooter: boolean;
	sidebarPosition: SidebarPosition;
	layout: LayoutMode;
	stickySidebar: boolean;
	containerPadding: string;
	contentBackground: string;
	proseContent: boolean;
	sidebarBreakpoint: 'md' | 'lg' | 'xl';
}

export const DEFAULT_HARNESS_CONFIG: ResolvedHarnessConfig = {
	showHeader: true,
	showSidebar: false,
	showFooter: true,
	sidebarPosition: 'right',
	layout: 'prose',
	stickySidebar: true,
	containerPadding: 'px-4 sm:px-6 lg:px-8',
	contentBackground: 'bg-surface-50-900/80 backdrop-blur-md',
	proseContent: true,
	sidebarBreakpoint: 'lg'
} as const;

export function resolveHarnessConfig(config?: HarnessConfig): ResolvedHarnessConfig {
	return { ...DEFAULT_HARNESS_CONFIG, ...config };
}

export const LAYOUT_WIDTH_CLASSES: Record<LayoutMode, string> = {
	full: 'max-w-full',
	prose: 'max-w-prose',
	wide: 'max-w-6xl'
} as const;





export interface BlogHarnessConfig extends HarnessConfig {
	showReadingProgress?: boolean;
	readingProgressVariant?: ProgressVariant;
	showToc?: boolean;
	showSeries?: boolean;
	showShareButtons?: boolean;
	showAuthorCard?: boolean;
	showActivityPub?: boolean;
	showMermaid?: boolean;
	showCategories?: boolean;
	showCategoriesSidebar?: boolean;
	showTags?: boolean;
	showBreadcrumbs?: boolean;
	breadcrumbBase?: string;
	breadcrumbLabel?: string;
}

export interface BlogHarnessProps {
	frontmatter: BlogFrontmatter;
	content: string;
	slug?: string;
	stats?: ActivityPubStats;
	federation?: FederationStatus;
	seriesPosts?: SeriesPost[];
	config?: Partial<BlogHarnessConfig>;
	class?: string;
}





export interface EventHarnessConfig extends HarnessConfig {
	showCalendarButton?: boolean;
	showLocation?: boolean;
	showRegistration?: boolean;
	showRelatedEvents?: boolean;
}





export interface ProductHarnessConfig extends HarnessConfig {
	showPricing?: boolean;
	showTransactions?: boolean;
	showGallery?: boolean;
	showRelated?: boolean;
	showShareButtons?: boolean;
	showActivityPub?: boolean;
	showSpecs?: boolean;
	showQuickAccess?: boolean;
	showReadingProgress?: boolean;
	showBreadcrumbs?: boolean;
	showTags?: boolean;
	showVariants?: boolean;
	showStockStatus?: boolean;
	showPhysicalDetails?: boolean;
	breadcrumbBase?: string;
	breadcrumbLabel?: string;
}

export interface ProductHarnessProps {
	frontmatter: ProductFrontmatter;
	content?: string;
	slug?: string;
	stats?: ActivityPubStats;
	federation?: FederationStatus;
	relatedProducts?: RelatedItem[];
	relatedPosts?: RelatedItem[];
	config?: Partial<ProductHarnessConfig>;
	class?: string;
}





export interface NoteHarnessConfig extends HarnessConfig {
	showReplies?: boolean;
	showReplyButton?: boolean;
	showBoostButton?: boolean;
	showLikeButton?: boolean;
	showShareButton?: boolean;
	allowEmbeds?: boolean;
	showFederationBadge?: boolean;
	maxRepliesVisible?: number;
	showContentWarning?: boolean;
	showTimestamp?: boolean;
}





export interface VideoHarnessConfig extends HarnessConfig {
	showRelated?: boolean;
	showTranscript?: boolean;
	showChapters?: boolean;
	showComments?: boolean;
	showShareButton?: boolean;
	autoplay?: boolean;
	showCaptions?: boolean;
	showPlaybackSpeed?: boolean;
	showQualitySelector?: boolean;
	showPiP?: boolean;
	showDownloadButton?: boolean;
	showActivityPub?: boolean;
}





export type GalleryLayoutMode = 'grid' | 'masonry' | 'carousel' | 'justified';

export interface GalleryHarnessConfig extends HarnessConfig {
	layoutMode?: GalleryLayoutMode;
	showLightbox?: boolean;
	showExif?: boolean;
	showDownloadButton?: boolean;
	showShareButton?: boolean;
	gridColumns?: number;
	enableZoom?: boolean;
	showCaptions?: boolean;
	showCounter?: boolean;
	showThumbnails?: boolean;
	enableKeyboardNav?: boolean;
	showLocation?: boolean;
	showActivityPub?: boolean;
}





export interface StackHarnessConfig extends HarnessConfig {
	showDiagram?: boolean;
	showMetrics?: boolean;
	showRepositories?: boolean;
	showContributors?: boolean;
	groupByCategory?: boolean;
	showProficiency?: boolean;
	showExperience?: boolean;
	showLastUsed?: boolean;
	enableFiltering?: boolean;
	showIcons?: boolean;
}





export interface ProgramHarnessConfig extends HarnessConfig {
	showSchedule?: boolean;
	showRegistration?: boolean;
	showInstructors?: boolean;
	showPricing?: boolean;
	showSyllabus?: boolean;
	showTestimonials?: boolean;
	showRequirements?: boolean;
	showCapacity?: boolean;
	showLocation?: boolean;
	showRelated?: boolean;
	showCalendarButton?: boolean;
	showShareButtons?: boolean;
}

export interface ProgramHarnessProps {
	frontmatter: Record<string, unknown>;
	content?: string;
	slug?: string;
	stats?: ActivityPubStats;
	federation?: FederationStatus;
	config?: Partial<ProgramHarnessConfig>;
	class?: string;
}
