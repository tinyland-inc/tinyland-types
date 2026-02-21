/**
 * Product Transaction Types
 * Defines the 15 transaction methods for products
 */

/** All supported transaction types */
export type TransactionType =
	| 'inquiry'
	| 'ebay'
	| 'etsy'
	| 'amazon'
	| 'snail-mail'
	| 'monero'
	| 'stripe'
	| 'polar'
	| 'taler'
	| 'repository'
	| 'documentation'
	| 'booking'
	| 'liberapay'
	| 'kofi'
	| 'contribute-to-consume';

/** Transaction method configuration */
export interface TransactionMethod {
	type: TransactionType;
	enabled: boolean;
	label?: string;
	description?: string;
	url?: string;
	config?: TransactionConfig;
	priority?: number;
}

/** Type-specific configuration options */
export type TransactionConfig =
	| InquiryConfig
	| MarketplaceConfig
	| CryptoConfig
	| PaymentConfig
	| RepositoryConfig
	| BookingConfig
	| ContributeConfig;

export interface InquiryConfig {
	emailSubject?: string;
	formFields?: string[];
}

export interface MarketplaceConfig {
	listingId?: string;
	storeName?: string;
}

export interface CryptoConfig {
	address: string;
	network?: string;
}

export interface PaymentConfig {
	priceId?: string;
	amount?: number;
	currency?: string;
}

export interface RepositoryConfig {
	repoUrl: string;
	branch?: string;
	licenseSpdx?: string;
}

export interface BookingConfig {
	calendarUrl?: string;
	duration?: number;
	timezone?: string;
}

export interface ContributeConfig {
	requiredHours?: number;
	skills?: string[];
	instructions?: string;
}

/** Default labels for transaction types */
export const TRANSACTION_LABELS: Record<TransactionType, string> = {
	inquiry: 'Inquire',
	ebay: 'Buy on eBay',
	etsy: 'Buy on Etsy',
	amazon: 'Buy on Amazon',
	'snail-mail': 'Order by Mail',
	monero: 'Pay with Monero',
	stripe: 'Buy Now',
	polar: 'Subscribe',
	taler: 'Pay with Taler',
	repository: 'View Source',
	documentation: 'Read Docs',
	booking: 'Book Appointment',
	liberapay: 'Support on Liberapay',
	kofi: 'Buy me a Coffee',
	'contribute-to-consume': 'Contribute to Access'
};

/** Icons for transaction types */
export const TRANSACTION_ICONS: Record<TransactionType, string> = {
	inquiry: 'mdi:email-outline',
	ebay: 'simple-icons:ebay',
	etsy: 'simple-icons:etsy',
	amazon: 'simple-icons:amazon',
	'snail-mail': 'mdi:mailbox-outline',
	monero: 'simple-icons:monero',
	stripe: 'mdi:credit-card-outline',
	polar: 'mdi:polar',
	taler: 'mdi:currency-eur',
	repository: 'mdi:source-repository',
	documentation: 'mdi:file-document-outline',
	booking: 'mdi:calendar-clock',
	liberapay: 'simple-icons:liberapay',
	kofi: 'simple-icons:kofi',
	'contribute-to-consume': 'mdi:hand-heart-outline'
};

/** Helper to get enabled transactions sorted by priority */
export function getEnabledTransactions(methods: TransactionMethod[]): TransactionMethod[] {
	return methods
		.filter((m) => m.enabled)
		.sort((a, b) => (a.priority ?? 99) - (b.priority ?? 99));
}

/** Helper to get transaction label */
export function getTransactionLabel(method: TransactionMethod): string {
	return method.label ?? TRANSACTION_LABELS[method.type];
}
