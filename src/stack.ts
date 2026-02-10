/**
 * Stack Type Definitions
 * For tech stack/tools pages
 */

import type { ContentVisibility } from './content-visibility.js';
import type { StackHarnessConfig } from './harness-config.js';

// Re-export for convenience
export type { StackHarnessConfig };

/**
 * Stack item category
 */
export type StackCategory =
	| 'language'
	| 'framework'
	| 'library'
	| 'tool'
	| 'service'
	| 'platform'
	| 'database'
	| 'devops'
	| 'design'
	| 'other';

/**
 * Proficiency level
 */
export type ProficiencyLevel = 'learning' | 'beginner' | 'intermediate' | 'advanced' | 'expert';

/**
 * Single stack item
 */
export interface StackItem {
	name: string;
	category: StackCategory;
	description?: string;
	url?: string;
	icon?: string; // Iconify icon name or URL
	proficiency?: ProficiencyLevel;
	yearsExperience?: number;
	lastUsed?: string; // Date
	featured?: boolean;
	tags?: string[];
}

/**
 * Stack page frontmatter for MDsveX
 */
export interface StackFrontmatter {
	// Page metadata
	title?: string;
	description?: string;

	// Publishing
	publishedAt?: string;
	updatedAt?: string;
	visibility?: ContentVisibility;

	// Author
	author?: string; // Handle

	// Stack items
	items: StackItem[];

	// Display options
	showProficiency?: boolean;
	showExperience?: boolean;
	groupByCategory?: boolean;

	// UI Configuration
	/** StackHarness rendering configuration */
	ui?: StackHarnessConfig;
}

export interface Stack {
	frontmatter: StackFrontmatter;
	content: string; // Additional description
	slug: string;
	filePath?: string;
}

/**
 * Stack item display format
 */
export interface StackItemDisplay extends StackItem {
	proficiencyLabel?: string;
	experienceLabel?: string;
}

/**
 * Grouped stack items by category
 */
export interface StackByCategory {
	category: StackCategory;
	label: string;
	items: StackItemDisplay[];
}

/**
 * Category labels
 */
export const STACK_CATEGORY_LABELS: Record<StackCategory, string> = {
	language: 'Languages',
	framework: 'Frameworks',
	library: 'Libraries',
	tool: 'Tools',
	service: 'Services',
	platform: 'Platforms',
	database: 'Databases',
	devops: 'DevOps',
	design: 'Design',
	other: 'Other'
};

/**
 * Proficiency labels
 */
export const PROFICIENCY_LABELS: Record<ProficiencyLevel, string> = {
	learning: 'Learning',
	beginner: 'Beginner',
	intermediate: 'Intermediate',
	advanced: 'Advanced',
	expert: 'Expert'
};

/**
 * Proficiency colors (for badges)
 */
export const PROFICIENCY_COLORS: Record<ProficiencyLevel, string> = {
	learning: 'preset-tonal-surface',
	beginner: 'preset-tonal-primary',
	intermediate: 'preset-filled-primary-500',
	advanced: 'preset-filled-secondary-500',
	expert: 'preset-filled-tertiary-500'
};

/**
 * Group stack items by category
 */
export function groupByCategory(items: StackItem[]): StackByCategory[] {
	const groups = new Map<StackCategory, StackItem[]>();

	for (const item of items) {
		const category = item.category || 'other';
		if (!groups.has(category)) {
			groups.set(category, []);
		}
		groups.get(category)!.push(item);
	}

	// Sort categories by label
	const sortedCategories = Array.from(groups.keys()).sort(
		(a, b) => STACK_CATEGORY_LABELS[a].localeCompare(STACK_CATEGORY_LABELS[b])
	);

	return sortedCategories.map((category) => ({
		category,
		label: STACK_CATEGORY_LABELS[category],
		items: groups.get(category)!.map((item) => ({
			...item,
			proficiencyLabel: item.proficiency ? PROFICIENCY_LABELS[item.proficiency] : undefined,
			experienceLabel: item.yearsExperience
				? `${item.yearsExperience} year${item.yearsExperience > 1 ? 's' : ''}`
				: undefined
		}))
	}));
}

/**
 * Get featured stack items
 */
export function getFeaturedItems(items: StackItem[]): StackItem[] {
	return items.filter((item) => item.featured);
}

/**
 * Sort items by proficiency (expert first)
 */
export function sortByProficiency(items: StackItem[]): StackItem[] {
	const order: Record<ProficiencyLevel, number> = {
		expert: 0,
		advanced: 1,
		intermediate: 2,
		beginner: 3,
		learning: 4
	};

	return [...items].sort((a, b) => {
		const aOrder = a.proficiency ? order[a.proficiency] : 5;
		const bOrder = b.proficiency ? order[b.proficiency] : 5;
		return aOrder - bOrder;
	});
}
