




import type { ContentVisibility } from './content-visibility.js';
import type { StackHarnessConfig } from './harness-config.js';


export type { StackHarnessConfig };




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




export type ProficiencyLevel = 'learning' | 'beginner' | 'intermediate' | 'advanced' | 'expert';




export interface StackItem {
	name: string;
	category: StackCategory;
	description?: string;
	url?: string;
	icon?: string; 
	proficiency?: ProficiencyLevel;
	yearsExperience?: number;
	lastUsed?: string; 
	featured?: boolean;
	tags?: string[];
}




export interface StackFrontmatter {
	
	title?: string;
	description?: string;

	
	publishedAt?: string;
	updatedAt?: string;
	visibility?: ContentVisibility;

	
	author?: string; 

	
	items: StackItem[];

	
	showProficiency?: boolean;
	showExperience?: boolean;
	groupByCategory?: boolean;

	
	
	ui?: StackHarnessConfig;
}

export interface Stack {
	frontmatter: StackFrontmatter;
	content: string; 
	slug: string;
	filePath?: string;
}




export interface StackItemDisplay extends StackItem {
	proficiencyLabel?: string;
	experienceLabel?: string;
}




export interface StackByCategory {
	category: StackCategory;
	label: string;
	items: StackItemDisplay[];
}




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




export const PROFICIENCY_LABELS: Record<ProficiencyLevel, string> = {
	learning: 'Learning',
	beginner: 'Beginner',
	intermediate: 'Intermediate',
	advanced: 'Advanced',
	expert: 'Expert'
};




export const PROFICIENCY_COLORS: Record<ProficiencyLevel, string> = {
	learning: 'preset-tonal-surface',
	beginner: 'preset-tonal-primary',
	intermediate: 'preset-filled-primary-500',
	advanced: 'preset-filled-secondary-500',
	expert: 'preset-filled-tertiary-500'
};




export function groupByCategory(items: StackItem[]): StackByCategory[] {
	const groups = new Map<StackCategory, StackItem[]>();

	for (const item of items) {
		const category = item.category || 'other';
		if (!groups.has(category)) {
			groups.set(category, []);
		}
		groups.get(category)!.push(item);
	}

	
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




export function getFeaturedItems(items: StackItem[]): StackItem[] {
	return items.filter((item) => item.featured);
}




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
