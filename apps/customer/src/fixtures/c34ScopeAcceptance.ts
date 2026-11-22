/**
 * HAULIX Customer Mobile App — Phase 03.34
 * Fixtures & Typed Contracts: Quote Acceptance, Unapproved Rates & Scope Confirmation Recovery
 *
 * Authoritative Figma References:
 * - C25-A: Node 412:1335 (EN) / Node 987:11278 (ES) — Quote Acceptance Review (430 × 1252 px)
 * - C25-E: Node 412:1388 (EN) / Node 987:11343 (ES) — Unapproved Rate Rules (430 × 799 px)
 * - C26-A: Node 412:1470 (EN) / Node 987:11445 (ES) — Scope Accepted (430 × 971 px)
 * - C26-R: Node 412:1517 (EN) / Node 987:11501 (ES) — Scope Acceptance Recovery (430 × 814 px)
 *
 * CRITICAL ARCHITECTURAL CONSTRAINTS:
 * - Pure frontend prototype demonstration.
 * - Customer confirmed quantities (Queen mattresses = 2, total 4 pieces across 3 categories) are strictly preserved.
 * - Symmetrical illustrative subtotal is strictly $356 USD (not an approved Arizona tariff, not a guaranteed charge).
 * - Zero fabricated backend acceptance, no live Stripe transactions, no booking records, no Admin mutations.
 */

export interface BookingDraftSummary {
	bookingId: string;
	customerName: string;
	serviceType: string;
	itemSummary: string;
	pickupAddress: string;
}

export interface NextRequiredStepItem {
	id: string;
	number: number;
	textKey: string;
}

export const C25A_DEFAULT_DRAFT: BookingDraftSummary = {
	bookingId: "HX-DEMO-1027",
	customerName: "Sarah Mitchell",
	serviceType: "Junk Removal",
	itemSummary: "3 item types / 4 individual pieces",
	pickupAddress: "1234 E Example Lane, Phoenix, AZ 85014",
} as const;

export const C25A_ILLUSTRATIVE_SUBTOTAL = "$356";

export const C26A_NEXT_REQUIRED_STEPS: readonly NextRequiredStepItem[] = [
	{
		id: "step-schedule",
		number: 1,
		textKey: "step1Schedule",
	},
	{
		id: "step-terms",
		number: 2,
		textKey: "step2Terms",
	},
	{
		id: "step-payment",
		number: 3,
		textKey: "step3Payment",
	},
] as const;
