/**
 * Unified Visibility Types
 * Standardized visibility model across all content types
 * Maps directly to ActivityPub addressing
 */

/**
 * Content visibility options (ActivityPub-compatible)
 */
export type ContentVisibility = 'public' | 'unlisted' | 'followers' | 'private' | 'direct';

/**
 * Visibility values as const array for Zod schemas
 */
export const CONTENT_VISIBILITY_VALUES = ['public', 'unlisted', 'followers', 'private', 'direct'] as const;

/**
 * Legacy RBAC visibility values (deprecated - use ContentVisibility instead)
 * @deprecated Use ContentVisibility instead
 */
export type LegacyRBACVisibility = 'public' | 'members' | 'admin' | 'private';

/**
 * Migrate legacy RBAC visibility to ActivityPub-compatible ContentVisibility
 */
export function migrateVisibility(legacy: string | undefined): ContentVisibility {
	if (!legacy) return 'public';

	const normalized = legacy.toLowerCase();

	switch (normalized) {
		case 'public':
		case 'published':
			return 'public';
		case 'unlisted':
			return 'unlisted';
		case 'members':
		case 'followers':
			return 'followers';
		case 'admin':
		case 'private':
		case 'draft':
			return 'private';
		case 'direct':
			return 'direct';
		default:
			return 'public';
	}
}

/**
 * Check if a visibility value is a valid ContentVisibility
 */
export function isValidVisibility(value: string): value is ContentVisibility {
	return CONTENT_VISIBILITY_VALUES.includes(value as ContentVisibility);
}

/**
 * ActivityPub addressing based on visibility
 */
export interface ActivityPubAddressing {
	to: string[];
	cc: string[];
	bto?: string[];
	bcc?: string[];
}

/**
 * Get ActivityPub addressing for a visibility level
 */
export function getAddressingForVisibility(
	visibility: ContentVisibility,
	actorUrl: string,
	followersUrl: string,
	directRecipients?: string[]
): ActivityPubAddressing {
	const PUBLIC = 'https://www.w3.org/ns/activitystreams#Public';

	switch (visibility) {
		case 'public':
			return { to: [PUBLIC], cc: [followersUrl] };
		case 'unlisted':
			return { to: [followersUrl], cc: [PUBLIC] };
		case 'followers':
			return { to: [followersUrl], cc: [] };
		case 'private':
			return { to: [actorUrl], cc: [] };
		case 'direct':
			return { to: directRecipients || [], cc: [] };
		default:
			return { to: [PUBLIC], cc: [followersUrl] };
	}
}

/**
 * Infer visibility from ActivityPub addressing
 */
export function inferVisibilityFromAddressing(
	to: string[],
	cc: string[],
	followersUrl: string
): ContentVisibility {
	const PUBLIC = 'https://www.w3.org/ns/activitystreams#Public';

	const toSet = new Set(to);
	const ccSet = new Set(cc);

	if (toSet.has(PUBLIC)) return 'public';
	if (ccSet.has(PUBLIC)) return 'unlisted';
	if (toSet.has(followersUrl) && !ccSet.has(PUBLIC)) return 'followers';
	if (to.length > 0 && !toSet.has(followersUrl) && !toSet.has(PUBLIC)) return 'direct';
	return 'private';
}

/**
 * Check if content should be visible to a user
 */
export function isVisibleTo(
	visibility: ContentVisibility,
	viewerHandle: string | null,
	authorHandle: string,
	isFollower: boolean
): boolean {
	switch (visibility) {
		case 'public':
		case 'unlisted':
			return true;
		case 'followers':
			return viewerHandle === authorHandle || isFollower;
		case 'private':
			return viewerHandle === authorHandle;
		case 'direct':
			return viewerHandle === authorHandle;
		default:
			return false;
	}
}

/**
 * Human-readable visibility labels
 */
export const VISIBILITY_LABELS: Record<ContentVisibility, string> = {
	public: 'Public',
	unlisted: 'Unlisted',
	followers: 'Followers Only',
	private: 'Private',
	direct: 'Direct Message'
};

/**
 * Visibility icons (using Iconify names)
 */
export const VISIBILITY_ICONS: Record<ContentVisibility, string> = {
	public: 'mdi:earth',
	unlisted: 'mdi:lock-open-outline',
	followers: 'mdi:account-multiple',
	private: 'mdi:lock',
	direct: 'mdi:email-outline'
};
