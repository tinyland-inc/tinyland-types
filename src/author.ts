/**
 * Shared Author Reference Type
 * Used across all content types for consistent author identification.
 */

/**
 * Standardized author reference for all content types.
 */
export interface AuthorReference {
	/** Display name of the author */
	name: string;
	/** Unique handle/username (without @ prefix) */
	handle: string;
	/** Optional avatar image URL */
	avatar?: string;
}
