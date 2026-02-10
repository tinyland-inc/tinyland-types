/**
 * Admin user types and interfaces
 * App-specific user management types.
 */

export type AdminRole =
	| 'super_admin'
	| 'admin'
	| 'moderator'
	| 'editor'
	| 'event_manager'
	| 'contributor'
	| 'member'
	| 'viewer';

export interface AdminUser {
	id: string;
	username: string;
	displayName?: string;
	name?: string;
	handle?: string;
	email?: string;
	password?: string;
	passwordHash?: string;
	totpSecret?: string | null;
	totpSecretId?: string | null;
	totpEnabled?: boolean;
	tempPassword?: string;
	qrCode?: string;
	totpUri?: string;
	createdAt?: string;
	updatedAt?: string;
	lastLoginAt?: string | null;
	lastLogin?: string;
	isActive?: boolean;
	firstLogin?: boolean;
	needsOnboarding?: boolean;
	onboardingStep?: number;
	role: AdminRole;
	permissions?: string[];
	certificateCn?: string;
	invitedBy?: string;
	invitationToken?: string;
	invitationExpires?: string;
	profileVisibility?: 'private' | 'draft' | 'public';
	profilePhoto?: string;
	bio?: string;
	pronouns?: string;
	socialLinks?: {
		twitter?: string;
		instagram?: string;
		facebook?: string;
	};
	preferences?: {
		emailNotifications?: boolean;
		theme?: string;
		timezone?: string;
		contentPageSettings?: {
			forceTheme: string | null;
			forceDarkMode: 'light' | 'dark' | null;
			forceA11y: boolean;
		};
	};
	backupCodes?: string[];
	/** @deprecated Use certificateCn instead */
	certificate_cn?: string;
	/** @deprecated Use invitedBy instead */
	invited_by?: string;
	/** @deprecated Use invitationToken instead */
	invitation_token?: string;
}

export type AdminRoleType = AdminRole;

export interface CreateUserDto {
	username: string;
	password: string;
	role: AdminRole | string;
	displayName?: string;
	permissions?: string[];
	totpEnabled?: boolean;
	invitedBy?: string;
	needsOnboarding?: boolean;
	onboardingStep?: number;
	firstLogin?: boolean;
}

export interface UpdateUserDto {
	username?: string;
	displayName?: string;
	role?: AdminRole;
	permissions?: string[];
	isActive?: boolean;
}

export interface AdminInvite {
	id: string;
	token: string;
	handle?: string;
	role: AdminRole;
	createdBy: string;
	createdByHandle: string;
	createdAt: string;
	expiresAt: string;
	message?: string;
	acceptedAt?: string;
	usedAt?: string;
	usedBy?: string;
	temporaryTotpSecret?: string;
	isActive: boolean;
	metadata?: {
		targetHandle?: string;
		inviterHandle?: string;
		message?: string;
	};
}

export interface UserFilters {
	role?: AdminRole;
	isActive?: boolean;
	totpEnabled?: boolean;
	search?: string;
	sortBy?: 'username' | 'created_at' | 'last_login_at';
	sortOrder?: 'asc' | 'desc';
	page?: number;
	limit?: number;
}

export interface ActivityLog {
	id: string;
	timestamp: string;
	userId: string;
	username: string;
	action: AdminAction;
	targetId?: string;
	targetType?: string;
	targetUsername?: string;
	metadata?: Record<string, unknown>;
	ipAddress?: string;
	userAgent?: string;
	success: boolean;
	errorMessage?: string;
}

export interface AdminActivityLog {
	id: string;
	adminUserId: string;
	adminUsername?: string;
	action: string;
	resourceType: string;
	resourceId: string | null;
	ipAddress: string | null;
	userAgent: string | null;
	details: unknown | null;
	createdAt: string;
	/** @deprecated Use adminUserId instead */
	admin_user_id?: string;
	/** @deprecated Use resourceType instead */
	resource_type?: string;
	/** @deprecated Use resourceId instead */
	resource_id?: string | null;
	/** @deprecated Use ipAddress instead */
	ip_address?: string | null;
	/** @deprecated Use userAgent instead */
	user_agent?: string | null;
	/** @deprecated Use createdAt instead */
	created_at?: string;
}

export enum AdminAction {
	LOGIN = 'login',
	LOGOUT = 'logout',
	LOGIN_FAILED = 'login_failed',
	USER_CREATED = 'user_created',
	USER_UPDATED = 'user_updated',
	USER_DELETED = 'user_deleted',
	USER_INVITED = 'user_invited',
	USER_STATUS_CHANGED = 'user_status_changed',
	PASSWORD_RESET = 'password_reset',
	PASSWORD_CHANGED = 'password_changed',
	TOTP_ENABLED = 'totpEnabled',
	TOTP_DISABLED = 'totp_disabled',
	PERMISSIONS_UPDATED = 'permissions_updated',
	ROLE_CHANGED = 'role_changed',
	CONTENT_CREATED = 'content_created',
	CONTENT_UPDATED = 'content_updated',
	CONTENT_DELETED = 'content_deleted',
	SETTINGS_UPDATED = 'settings_updated',
	SECURITY_SETTINGS_CHANGED = 'security_settings_changed'
}

export interface LogFilters {
	userId?: string;
	action?: AdminAction;
	targetType?: string;
	startDate?: string;
	endDate?: string;
	success?: boolean;
	page?: number;
	limit?: number;
}

export type AdminPermission =
	| 'admin.access'
	| 'admin.users.manage'
	| 'admin.users.moderate'
	| 'admin.content.manage'
	| 'admin.content.moderate'
	| 'admin.events.manage'
	| 'admin.analytics.view'
	| 'admin.settings.manage'
	| 'admin.security.manage';

export const VALIDATION_RULES = {
	username: {
		pattern: /^[a-zA-Z0-9_-]{3,20}$/,
		minLength: 3,
		maxLength: 20,
		message: 'Username must be 3-20 characters, alphanumeric with _ or -'
	},
	handle: {
		pattern: /^[a-zA-Z0-9_-]{3,20}$/,
		minLength: 3,
		maxLength: 20,
		message: 'Handle must be 3-20 characters, alphanumeric with _ or -'
	},
	password: {
		minLength: 12,
		requireUppercase: true,
		requireLowercase: true,
		requireNumber: true,
		requireSpecial: true,
		message: 'Password must be at least 12 characters with uppercase, lowercase, number, and special character'
	}
} as const;

/** Permission definitions (mirrors @tinyland-inc/tinyland-auth) */
export const PERMISSIONS: Record<string, string> = {
	'admin.access': 'Access admin panel',
	'admin.users.manage': 'Manage users',
	'admin.users.moderate': 'Moderate users',
	'admin.content.manage': 'Manage content',
	'admin.content.moderate': 'Moderate content',
	'admin.events.manage': 'Manage events',
	'admin.analytics.view': 'View analytics',
	'admin.settings.manage': 'Manage settings',
	'admin.security.manage': 'Manage security'
};

export const ROLE_PERMISSIONS: Record<AdminRole, AdminPermission[]> = {
	super_admin: [
		'admin.access', 'admin.users.manage', 'admin.users.moderate',
		'admin.content.manage', 'admin.content.moderate', 'admin.events.manage',
		'admin.analytics.view', 'admin.settings.manage', 'admin.security.manage'
	],
	admin: [
		'admin.access', 'admin.users.manage', 'admin.users.moderate',
		'admin.content.manage', 'admin.content.moderate', 'admin.events.manage',
		'admin.analytics.view', 'admin.settings.manage'
	],
	moderator: [
		'admin.access', 'admin.users.moderate',
		'admin.content.moderate', 'admin.analytics.view'
	],
	editor: [
		'admin.access', 'admin.content.manage', 'admin.content.moderate'
	],
	event_manager: [
		'admin.access', 'admin.events.manage'
	],
	contributor: ['admin.access', 'admin.content.manage'],
	member: ['admin.access'],
	viewer: ['admin.access']
};
