








export type ContentVisibility = 'public' | 'unlisted' | 'followers' | 'private' | 'direct';




export const CONTENT_VISIBILITY_VALUES = ['public', 'unlisted', 'followers', 'private', 'direct'] as const;





export type LegacyRBACVisibility = 'public' | 'members' | 'admin' | 'private';




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




export function isValidVisibility(value: string): value is ContentVisibility {
	return CONTENT_VISIBILITY_VALUES.includes(value as ContentVisibility);
}




export interface ActivityPubAddressing {
	to: string[];
	cc: string[];
	bto?: string[];
	bcc?: string[];
}




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




export const VISIBILITY_LABELS: Record<ContentVisibility, string> = {
	public: 'Public',
	unlisted: 'Unlisted',
	followers: 'Followers Only',
	private: 'Private',
	direct: 'Direct Message'
};




export const VISIBILITY_ICONS: Record<ContentVisibility, string> = {
	public: 'mdi:earth',
	unlisted: 'mdi:lock-open-outline',
	followers: 'mdi:account-multiple',
	private: 'mdi:lock',
	direct: 'mdi:email-outline'
};
