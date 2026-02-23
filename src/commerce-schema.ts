



export type OfferAvailability =
	| 'InStock' | 'OutOfStock' | 'PreOrder' | 'SoldOut'
	| 'OnlineOnly' | 'LimitedAvailability' | 'Discontinued';

export type PaymentMethod =
	| 'Cash' | 'CreditCard' | 'Cryptocurrency' | 'BankTransfer'
	| 'PaymentService' | 'Subscription' | 'Donation' | 'Exchange';

export interface PriceSpecification {
	'@type': 'PriceSpecification' | 'UnitPriceSpecification';
	price: number | string;
	priceCurrency: string;
	valueAddedTaxIncluded?: boolean;
	validFrom?: string;
	validThrough?: string;
	minPrice?: number;
	maxPrice?: number;
}

export interface SchemaOffer {
	'@context': 'https://schema.org';
	'@type': 'Offer';
	'@id': string;
	name: string;
	description?: string;
	url?: string;
	price?: number | string;
	priceCurrency?: string;
	priceSpecification?: PriceSpecification;
	availability: OfferAvailability;
	availabilityStarts?: string;
	availabilityEnds?: string;
	seller?: {
		'@type': 'Person' | 'Organization';
		name: string;
		url?: string;
	};
	itemOffered?: {
		'@type': 'Product' | 'Service' | 'CreativeWork';
		name: string;
		description?: string;
		url?: string;
		image?: string;
	};
	acceptedPaymentMethod?: PaymentMethod[];
	transactionType: string;
	externalUrl?: string;
	requiresAction?: string;
}

export interface TransactionMapping {
	transactionType: string;
	schemaType: 'Offer' | 'DonateAction' | 'BuyAction' | 'ReserveAction';
	paymentMethods: PaymentMethod[];
	defaultAvailability: OfferAvailability;
	requiresExternalUrl: boolean;
	isMonetary: boolean;
	isCryptocurrency: boolean;
	isSubscription: boolean;
	isDonation: boolean;
}

export const TRANSACTION_MAPPINGS: Record<string, TransactionMapping> = {
	inquiry: { transactionType: 'inquiry', schemaType: 'Offer', paymentMethods: [], defaultAvailability: 'InStock', requiresExternalUrl: false, isMonetary: false, isCryptocurrency: false, isSubscription: false, isDonation: false },
	ebay: { transactionType: 'ebay', schemaType: 'Offer', paymentMethods: ['CreditCard', 'PaymentService'], defaultAvailability: 'OnlineOnly', requiresExternalUrl: true, isMonetary: true, isCryptocurrency: false, isSubscription: false, isDonation: false },
	etsy: { transactionType: 'etsy', schemaType: 'Offer', paymentMethods: ['CreditCard', 'PaymentService'], defaultAvailability: 'OnlineOnly', requiresExternalUrl: true, isMonetary: true, isCryptocurrency: false, isSubscription: false, isDonation: false },
	amazon: { transactionType: 'amazon', schemaType: 'Offer', paymentMethods: ['CreditCard', 'PaymentService'], defaultAvailability: 'OnlineOnly', requiresExternalUrl: true, isMonetary: true, isCryptocurrency: false, isSubscription: false, isDonation: false },
	'snail-mail': { transactionType: 'snail-mail', schemaType: 'Offer', paymentMethods: ['Cash', 'BankTransfer'], defaultAvailability: 'InStock', requiresExternalUrl: false, isMonetary: true, isCryptocurrency: false, isSubscription: false, isDonation: false },
	monero: { transactionType: 'monero', schemaType: 'Offer', paymentMethods: ['Cryptocurrency'], defaultAvailability: 'InStock', requiresExternalUrl: false, isMonetary: true, isCryptocurrency: true, isSubscription: false, isDonation: false },
	stripe: { transactionType: 'stripe', schemaType: 'Offer', paymentMethods: ['CreditCard', 'PaymentService'], defaultAvailability: 'InStock', requiresExternalUrl: false, isMonetary: true, isCryptocurrency: false, isSubscription: false, isDonation: false },
	polar: { transactionType: 'polar', schemaType: 'Offer', paymentMethods: ['Subscription', 'PaymentService'], defaultAvailability: 'OnlineOnly', requiresExternalUrl: true, isMonetary: true, isCryptocurrency: false, isSubscription: true, isDonation: false },
	taler: { transactionType: 'taler', schemaType: 'Offer', paymentMethods: ['BankTransfer', 'PaymentService'], defaultAvailability: 'InStock', requiresExternalUrl: false, isMonetary: true, isCryptocurrency: false, isSubscription: false, isDonation: false },
	repository: { transactionType: 'repository', schemaType: 'Offer', paymentMethods: [], defaultAvailability: 'OnlineOnly', requiresExternalUrl: true, isMonetary: false, isCryptocurrency: false, isSubscription: false, isDonation: false },
	documentation: { transactionType: 'documentation', schemaType: 'Offer', paymentMethods: [], defaultAvailability: 'OnlineOnly', requiresExternalUrl: true, isMonetary: false, isCryptocurrency: false, isSubscription: false, isDonation: false },
	booking: { transactionType: 'booking', schemaType: 'ReserveAction', paymentMethods: ['PaymentService', 'CreditCard'], defaultAvailability: 'LimitedAvailability', requiresExternalUrl: true, isMonetary: true, isCryptocurrency: false, isSubscription: false, isDonation: false },
	liberapay: { transactionType: 'liberapay', schemaType: 'DonateAction', paymentMethods: ['Donation', 'PaymentService'], defaultAvailability: 'OnlineOnly', requiresExternalUrl: true, isMonetary: true, isCryptocurrency: false, isSubscription: true, isDonation: true },
	kofi: { transactionType: 'kofi', schemaType: 'DonateAction', paymentMethods: ['Donation', 'PaymentService'], defaultAvailability: 'OnlineOnly', requiresExternalUrl: true, isMonetary: true, isCryptocurrency: false, isSubscription: false, isDonation: true },
	'contribute-to-consume': { transactionType: 'contribute-to-consume', schemaType: 'Offer', paymentMethods: ['Exchange'], defaultAvailability: 'InStock', requiresExternalUrl: false, isMonetary: false, isCryptocurrency: false, isSubscription: false, isDonation: false }
};

export function getTransactionMapping(type: string): TransactionMapping | undefined {
	return TRANSACTION_MAPPINGS[type];
}

export function requiresExternalUrl(type: string): boolean {
	return TRANSACTION_MAPPINGS[type]?.requiresExternalUrl ?? false;
}

export function isMonetary(type: string): boolean {
	return TRANSACTION_MAPPINGS[type]?.isMonetary ?? false;
}

export function getSupportedTransactionTypes(): string[] {
	return Object.keys(TRANSACTION_MAPPINGS);
}
