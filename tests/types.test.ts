






import { describe, it, expect, expectTypeOf } from 'vitest';


import type {
	ContentVisibility,
	BlogFrontmatter,
	AdminRole,
	AdminPermission,
	PublishingStatus,
	AuthorReference,
	ProgressVariant,
	SeriesPost,
	HarnessConfig,
	LayoutMode,
	SidebarPosition,
	GalleryLayoutMode,
	EventFrontmatter,
	NoteFrontmatter,
	BlogPost,
	NoteDisplay,
	MetricValue,
	SystemHealth,
} from '../src/index';


import {
	CONTENT_VISIBILITY_VALUES,
	VISIBILITY_LABELS,
	VISIBILITY_ICONS,
	migrateVisibility,
	isValidVisibility,
	AdminAction,
	VALIDATION_RULES,
	ROLE_PERMISSIONS,
	PERMISSIONS,
	STATUS_TRANSITIONS,
	STATUS_LABELS,
	STATUS_COLORS,
	STATUS_ICONS,
	TRANSITION_PERMISSIONS,
	canTransition,
	isPublishingStatus,
	isPubliclyVisible,
	DEFAULT_HARNESS_CONFIG,
	LAYOUT_WIDTH_CLASSES,
	resolveHarnessConfig,
	normalizeFrontmatter,
	noteToDisplay,
} from '../src/index';





describe('type-level assertions', () => {
	it('ContentVisibility is a string literal union', () => {
		expectTypeOf<ContentVisibility>().toBeString();
	});

	it('AdminRole is a string literal union', () => {
		expectTypeOf<AdminRole>().toBeString();
	});

	it('AdminPermission is a string literal union', () => {
		expectTypeOf<AdminPermission>().toBeString();
	});

	it('PublishingStatus is a string literal union', () => {
		expectTypeOf<PublishingStatus>().toBeString();
	});

	it('ProgressVariant is a string literal union', () => {
		expectTypeOf<ProgressVariant>().toBeString();
	});

	it('LayoutMode is a string literal union', () => {
		expectTypeOf<LayoutMode>().toBeString();
	});

	it('SidebarPosition is a string literal union', () => {
		expectTypeOf<SidebarPosition>().toBeString();
	});

	it('GalleryLayoutMode is a string literal union', () => {
		expectTypeOf<GalleryLayoutMode>().toBeString();
	});

	it('AuthorReference has required name and handle', () => {
		expectTypeOf<AuthorReference>().toHaveProperty('name');
		expectTypeOf<AuthorReference>().toHaveProperty('handle');
	});

	it('BlogFrontmatter has title field', () => {
		expectTypeOf<BlogFrontmatter>().toHaveProperty('title');
	});

	it('SeriesPost has slug, title, order', () => {
		expectTypeOf<SeriesPost>().toHaveProperty('slug');
		expectTypeOf<SeriesPost>().toHaveProperty('title');
		expectTypeOf<SeriesPost>().toHaveProperty('order');
	});

	it('HarnessConfig has layout property', () => {
		expectTypeOf<HarnessConfig>().toHaveProperty('layout');
	});
});





describe('const object validations', () => {
	it('CONTENT_VISIBILITY_VALUES contains all 5 levels', () => {
		expect(CONTENT_VISIBILITY_VALUES).toEqual(['public', 'unlisted', 'followers', 'private', 'direct']);
	});

	it('VISIBILITY_LABELS has an entry for every visibility value', () => {
		for (const v of CONTENT_VISIBILITY_VALUES) {
			expect(VISIBILITY_LABELS).toHaveProperty(v);
			expect(typeof VISIBILITY_LABELS[v]).toBe('string');
		}
	});

	it('VISIBILITY_ICONS has an entry for every visibility value', () => {
		for (const v of CONTENT_VISIBILITY_VALUES) {
			expect(VISIBILITY_ICONS).toHaveProperty(v);
		}
	});

	it('AdminAction enum has expected members', () => {
		expect(AdminAction.LOGIN).toBe('login');
		expect(AdminAction.USER_CREATED).toBe('user_created');
		expect(AdminAction.CONTENT_DELETED).toBe('content_deleted');
	});

	it('ROLE_PERMISSIONS covers all 8 admin roles', () => {
		const expectedRoles: AdminRole[] = [
			'super_admin', 'admin', 'moderator', 'editor',
			'event_manager', 'contributor', 'member', 'viewer',
		];
		for (const role of expectedRoles) {
			expect(ROLE_PERMISSIONS).toHaveProperty(role);
			expect(Array.isArray(ROLE_PERMISSIONS[role])).toBe(true);
		}
	});

	it('super_admin has all permissions', () => {
		expect(ROLE_PERMISSIONS.super_admin).toContain('admin.security.manage');
		expect(ROLE_PERMISSIONS.super_admin.length).toBe(Object.keys(PERMISSIONS).length);
	});

	it('STATUS_TRANSITIONS covers all publishing statuses', () => {
		const statuses: PublishingStatus[] = ['draft', 'pending', 'scheduled', 'published', 'archived'];
		for (const s of statuses) {
			expect(STATUS_TRANSITIONS).toHaveProperty(s);
		}
	});

	it('DEFAULT_HARNESS_CONFIG has sensible defaults', () => {
		expect(DEFAULT_HARNESS_CONFIG.layout).toBe('prose');
		expect(DEFAULT_HARNESS_CONFIG.showHeader).toBe(true);
		expect(DEFAULT_HARNESS_CONFIG.showSidebar).toBe(false);
		expect(DEFAULT_HARNESS_CONFIG.sidebarPosition).toBe('right');
	});

	it('LAYOUT_WIDTH_CLASSES maps all layout modes', () => {
		expect(LAYOUT_WIDTH_CLASSES).toHaveProperty('full');
		expect(LAYOUT_WIDTH_CLASSES).toHaveProperty('prose');
		expect(LAYOUT_WIDTH_CLASSES).toHaveProperty('wide');
	});

	it('VALIDATION_RULES has username, handle, and password', () => {
		expect(VALIDATION_RULES.username.minLength).toBe(3);
		expect(VALIDATION_RULES.password.minLength).toBe(12);
		expect(VALIDATION_RULES.handle.maxLength).toBe(20);
	});
});





describe('runtime helpers', () => {
	it('migrateVisibility maps legacy values', () => {
		expect(migrateVisibility('members')).toBe('followers');
		expect(migrateVisibility('admin')).toBe('private');
		expect(migrateVisibility('published')).toBe('public');
		expect(migrateVisibility(undefined)).toBe('public');
	});

	it('isValidVisibility accepts valid values and rejects invalid', () => {
		expect(isValidVisibility('public')).toBe(true);
		expect(isValidVisibility('direct')).toBe(true);
		expect(isValidVisibility('bogus')).toBe(false);
	});

	it('canTransition enforces valid state machine edges', () => {
		expect(canTransition('draft', 'published')).toBe(true);
		expect(canTransition('published', 'pending')).toBe(false);
		expect(canTransition('archived', 'draft')).toBe(true);
	});

	it('isPublishingStatus validates status strings', () => {
		expect(isPublishingStatus('draft')).toBe(true);
		expect(isPublishingStatus('nope')).toBe(false);
	});

	it('isPubliclyVisible is true only for published', () => {
		expect(isPubliclyVisible('published')).toBe(true);
		expect(isPubliclyVisible('draft')).toBe(false);
		expect(isPubliclyVisible('archived')).toBe(false);
	});

	it('resolveHarnessConfig merges overrides with defaults', () => {
		const resolved = resolveHarnessConfig({ layout: 'wide', showSidebar: true });
		expect(resolved.layout).toBe('wide');
		expect(resolved.showSidebar).toBe(true);
		expect(resolved.showHeader).toBe(true); 
	});

	it('normalizeFrontmatter extracts title and author', () => {
		const result = normalizeFrontmatter({
			title: 'Hello',
			author: { name: 'Jess', handle: 'jess' },
			publishedAt: '2026-01-01',
		});
		expect(result.title).toBe('Hello');
		expect(result.author?.name).toBe('Jess');
		expect(result.publishedAt).toBe('2026-01-01');
	});

	it('noteToDisplay converts Note to NoteDisplay', () => {
		const display = noteToDisplay({
			frontmatter: {
				publishedAt: '2026-02-01T00:00:00Z',
				author: { name: 'Jess', handle: 'jess' },
				visibility: 'public',
				hashtags: ['test'],
			},
			content: 'Hello world',
			slug: 'hello',
		});
		expect(display.slug).toBe('hello');
		expect(display.content).toBe('Hello world');
		expect(display.author).toBe('jess');
		expect(display.hashtags).toEqual(['test']);
	});
});
