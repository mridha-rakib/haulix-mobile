/**
 * HAULIX Customer Mobile App — Phase 03.29
 * Fixtures & Typed Contracts: AI Results, Failure, Offline & Missing Media Previews
 *
 * Authoritative Figma Reference:
 * - C22-D: Node 412:328 (EN) / Node 987:10084 (ES)
 * - C22-F: Node 412:388 (EN) / Node 987:10154 (ES)
 * - C22-O: Node 412:433 (EN) / Node 987:10209 (ES)
 * - C22-E: Node 412:474 (EN) / Node 987:10259 (ES)
 *
 * CRITICAL NON-FABRICATION RULE:
 * Customer-entered data (e.g. mattress qty = 2) is NEVER silently overwritten by
 * illustrative AI suggestions (suggested qty = 1).
 */

export interface AiSuggestedItem {
	id: string;
	nameKey: "sofa" | "mattress" | "diningTable";
	imageKey: "sofa" | "mattresses" | "table";
	suggestedQty: number;
	customerQty: number;
	hasMismatch: boolean;
	needsConfirmation: boolean;
}

export interface AiFailureDraftLedger {
	bookingId: string;
	attachmentCount: number;
	hasPublishedQuote: boolean;
	hasActiveBooking: boolean;
}

export interface AiOfflineDraftLedger {
	bookingId: string;
	isSimulatedOfflinePreview: boolean;
	draftPreserved: boolean;
}

export interface AiMissingPhotosDraftLedger {
	bookingId: string;
	validPhotoCount: number;
	allowVisualMeasurements: boolean;
}

export const C22D_SUGGESTED_ITEMS: readonly AiSuggestedItem[] = [
	{
		id: "item-sofa-01",
		nameKey: "sofa",
		imageKey: "sofa",
		suggestedQty: 1,
		customerQty: 1,
		hasMismatch: false,
		needsConfirmation: true,
	},
	{
		id: "item-mattress-02",
		nameKey: "mattress",
		imageKey: "mattresses",
		suggestedQty: 1,
		customerQty: 2, // Customer quantity 2 is preserved!
		hasMismatch: true,
		needsConfirmation: true,
	},
	{
		id: "item-table-03",
		nameKey: "diningTable",
		imageKey: "table",
		suggestedQty: 1,
		customerQty: 1,
		hasMismatch: false,
		needsConfirmation: true,
	},
] as const;

export const C22F_DEFAULT_LEDGER: AiFailureDraftLedger = {
	bookingId: "HX-DEMO-1027",
	attachmentCount: 4,
	hasPublishedQuote: false,
	hasActiveBooking: false,
};

export const C22O_DEFAULT_LEDGER: AiOfflineDraftLedger = {
	bookingId: "HX-DEMO-1027",
	isSimulatedOfflinePreview: true,
	draftPreserved: true,
};

export const C22E_DEFAULT_LEDGER: AiMissingPhotosDraftLedger = {
	bookingId: "HX-DEMO-1027",
	validPhotoCount: 0,
	allowVisualMeasurements: false,
};
