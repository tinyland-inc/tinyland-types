




import type { ContentVisibility } from './content-visibility.js';
import type { VideoEmbed } from './blog.js';
import type { AuthorReference } from './author.js';
import type { NoteHarnessConfig } from './harness-config.js';


export type { NoteHarnessConfig };




export interface NoteFrontmatter {
	
	content?: string; 

	
	publishedAt?: string;
	updatedAt?: string;
	visibility?: ContentVisibility;
	published?: boolean;

	
	





	author?: AuthorReference | string;

	
	inReplyTo?: string; 
	conversation?: string; 

	
	sensitive?: boolean;
	spoilerText?: string;

	
	images?: string[];
	videos?: VideoEmbed[];

	
	mentions?: string[]; 
	hashtags?: string[];

	
	likes?: number;
	boosts?: number;
	replies?: number;

	
	activityPubId?: string;
	url?: string;

	
	
	ui?: NoteHarnessConfig;
}

export interface Note {
	frontmatter: NoteFrontmatter;
	content: string;
	slug: string;
	filePath?: string;
}

export interface NoteDisplay {
	slug: string;
	content: string;
	publishedAt: string;
	author: string;
	visibility: ContentVisibility;
	inReplyTo?: string;
	sensitive: boolean;
	spoilerText?: string;
	images: string[];
	hashtags: string[];
	mentions: string[];
	likes: number;
	boosts: number;
	replies: number;
}




export function noteToDisplay(note: Note): NoteDisplay {
	const { frontmatter } = note;

	return {
		slug: note.slug,
		content: note.content || frontmatter.content || '',
		publishedAt: frontmatter.publishedAt || new Date().toISOString(),
		author: typeof frontmatter.author === 'string'
			? frontmatter.author
			: frontmatter.author?.handle || 'unknown',
		visibility: frontmatter.visibility || 'public',
		inReplyTo: frontmatter.inReplyTo,
		sensitive: frontmatter.sensitive || false,
		spoilerText: frontmatter.spoilerText,
		images: frontmatter.images || [],
		hashtags: frontmatter.hashtags || [],
		mentions: frontmatter.mentions || [],
		likes: frontmatter.likes || 0,
		boosts: frontmatter.boosts || 0,
		replies: frontmatter.replies || 0
	};
}
