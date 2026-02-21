// Calendar system type definitions

export interface CollectionConfig {
	name: string;
	displayName: string;
	description: string;
	color: string;
	icon?: string;
	isPublic: boolean;
}

export interface CalendarCollection extends CollectionConfig {
	id: number;
	sync_enabled: boolean;
	created_at: Date;
	updated_at: Date;
}

export interface SyncResult {
	success: boolean;
	error?: string;
	summary: {
		totalEvents: number;
		totalSynced: number;
		totalErrors: number;
		duration: number;
	};
	errors: Array<{
		eventId: string;
		error: string;
	}>;
	mdsvex?: {
		total: number;
		synced: number;
		errors: Array<{ eventId: string; error: string }>;
	};
	database?: {
		total: number;
		synced: number;
		errors: Array<{ eventId: string; error: string }>;
	};
}

export interface Conflict {
	id: string;
	eventSlug: string;
	xandikosUid: string;
	conflictType: 'update' | 'delete' | 'create';
	localData: any;
	remoteData: any;
	detectedAt: Date;
}

export interface ResolutionStrategy {
	type: 'local-first' | 'remote-first' | 'newest' | 'manual';
	resolver?: (conflict: Conflict) => Promise<any>;
}

export interface WebhookEvent {
	type: 'event.created' | 'event.updated' | 'event.deleted';
	source: 'mdsvex' | 'xandikos';
	data: any;
	timestamp: Date;
}

export interface RecurrencePattern {
	frequency: 'daily' | 'weekly' | 'monthly' | 'yearly';
	interval: number;
	count?: number;
	until?: Date;
	byDay?: string[];
	byMonth?: number[];
	byMonthDay?: number[];
	bySetPos?: number;
}

export interface EventOccurrence {
	date: Date;
	isException: boolean;
	exceptionData?: any;
	originalEvent: any;
}

export interface RecurrenceUpdate {
	scope: 'this' | 'future' | 'all';
	changes: any;
	reason?: string;
}

export interface Permissions {
	read: string[]; // user roles
	write: string[];
	admin: string[];
}
