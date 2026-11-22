/**
 * HAULIX Customer Mobile App — Phase 03.36 / Phase 03.37
 * Typed Contracts & Scheduling State Fixtures: W04 Scheduling, Recovery & Booking Review
 *
 * Authoritative Figma References:
 * - C27: Node 763:2 (EN) / Node 766:388 (ES) — Choose your service time (430 × 990 / 1023 px)
 * - C27-A: Node 763:71 (EN) / Node 766:457 (ES) — Request service ASAP (430 × 905 px)
 * - C27-S: Node 763:133 (EN) / Node 766:519 (ES) — Select an available window (430 × 1198 / 1215 px)
 * - C27-V: Node 763:202 (EN) / Node 766:588 (ES) — Invalid same-day time (430 × 1044 px)
 * - C27-R: Node 763:269 (EN) / Node 766:655 (ES) — Unavailable / Stale slot (430 × 1044 / 1079 px)
 * - C27-N: Node 763:336 (EN) / Node 766:722 (ES) — No eligible driver found (430 × 805 px)
 * - C28: Node 763:396 (EN) / Node 766:782 (ES) — Review your booking (430 × 1195 / 1180 px)
 * - C28-C: Node 763:467 (EN) / Node 766:853 (ES) — Terms accepted for this quote (430 × 1128 / 1178 px)
 *
 * CRITICAL ARCHITECTURAL CONSTRAINTS:
 * - Pure frontend prototype demonstration.
 * - Customer confirmed quantities from W03 (1 sofa, 2 queen mattresses, 1 dining table = 4 pieces across 3 categories)
 *   are strictly preserved in the active customer journey.
 * - Isolated Figma recreation fixture (1 sofa + 2 chairs) is available specifically for 1:1 Figma demo screen inspection.
 * - Symmetrical illustrative subtotal is strictly $356.00 USD (non-binding demo subtotal).
 * - Zero fabricated backend bookings, no real driver assignment, no live Stripe transactions, no fake cancellations.
 */

export type TimingMode = "asap" | "scheduled";

export type PaymentMethodType = "card" | "wallet" | null;

export type SchedulingRecoveryState =
	| "asap_request_demo"
	| "scheduled_window_demo"
	| "invalid_same_day_example"
	| "stale_window_example"
	| "no_eligible_driver_example"
	| "selected_window_requires_revalidation"
	| "review_ready_demo"
	| "local_terms_acknowledged"
	| "terms_acknowledgement_invalidated"
	| "terms_changed"
	| "no_driver_cancelled"
	| "payment_method_selected"
	| "secure_card_demo"
	| "card_authentication_required"
	| "authorization_processing"
	| "authorization_declined"
	| "hold_expired"
	| "authorization_restoration_demo"
	| "fresh_hold_review_demo"
	| "fresh_hold_consent_acknowledged_demo"
	| "booking_status_checking_demo"
	| "booking_recorded_demo"
	| "asap_request_recorded_demo"
	| "booking_not_confirmed_demo"
	| "backend_availability_unverified";

export type InventorySourceMode = "active_w03_journey" | "w04_figma_demo";

export interface SchedulingDateOption {
	id: string;
	dayEn: string;
	dayEs: string;
	dateEn: string;
	dateEs: string;
	fullDateEn: string;
	fullDateEs: string;
}

export interface ServiceWindowOption {
	id: string;
	windowEn: string;
	windowEs: string;
	shortEn: string;
	shortEs: string;
}

export interface InventoryScopeDefinition {
	piecesCount: number;
	categoriesCount: number;
	confirmedItemsEn: string;
	confirmedItemsEs: string;
	serviceTypeEn: string;
	serviceTypeEs: string;
}

export const W03_CUSTOMER_CONFIRMED_INVENTORY: InventoryScopeDefinition = {
	piecesCount: 4,
	categoriesCount: 3,
	confirmedItemsEn: "1 sofa, 2 queen mattresses, 1 dining table (4 pieces)",
	confirmedItemsEs: "1 sofá, 2 colchones queen, 1 mesa de comedor (4 piezas)",
	serviceTypeEn: "Junk Removal · 3 categories / 4 pieces",
	serviceTypeEs: "Retiro de artículos · 3 categorías / 4 piezas",
} as const;

export const W04_FIGMA_DEMO_INVENTORY: InventoryScopeDefinition = {
	piecesCount: 3,
	categoriesCount: 2,
	confirmedItemsEn: "1 sofa + 2 chairs",
	confirmedItemsEs: "1 sofá + 2 sillas",
	serviceTypeEn: "FURNITURE REMOVAL · 1 SOFA + 2 CHAIRS",
	serviceTypeEs: "RETIRO DE MUEBLES · 1 SOFÁ + 2 SILLAS",
} as const;

export interface W04CustomerDraft {
	bookingId: string;
	customerName: string;
	serviceType: string;
	pickupAreaEn: string;
	pickupAreaEs: string;
	confirmedItemsEn: string;
	confirmedItemsEs: string;
	illustrativeSubtotal: string;
	conditionalCancellationFee: string;
	timingMode: TimingMode | null;
	selectedDateId: string;
	selectedWindowId: string;
	termsConsentAccepted: boolean;
	termsVersion: string;
	termsAcknowledgedQuote: string;
	recoveryState: SchedulingRecoveryState;
	inventorySource: InventorySourceMode;
	selectedPaymentMethod: PaymentMethodType;
	freshHoldConsentAccepted: boolean;
}

export const SAMPLE_DATES: readonly SchedulingDateOption[] = [
	{
		id: "date-nov-03",
		dayEn: "TUE",
		dayEs: "MAR",
		dateEn: "NOV 03",
		dateEs: "03 NOV",
		fullDateEn: "Tue, Nov 3",
		fullDateEs: "Mar., 3 nov.",
	},
	{
		id: "date-nov-04",
		dayEn: "WED",
		dayEs: "MIÉ",
		dateEn: "NOV 04",
		dateEs: "04 NOV",
		fullDateEn: "Wed, Nov 4",
		fullDateEs: "Mié., 4 nov.",
	},
	{
		id: "date-nov-05",
		dayEn: "THU",
		dayEs: "JUE",
		dateEn: "NOV 05",
		dateEs: "05 NOV",
		fullDateEn: "Thu, Nov 5",
		fullDateEs: "Jue., 5 nov.",
	},
	{
		id: "date-nov-06",
		dayEn: "FRI",
		dayEs: "VIE",
		dateEn: "NOV 06",
		dateEs: "06 NOV",
		fullDateEn: "Fri, Nov 6",
		fullDateEs: "Vie., 6 nov.",
	},
] as const;

export const SAMPLE_WINDOWS: readonly ServiceWindowOption[] = [
	{
		id: "win-10-12",
		windowEn: "10:00 AM – 12:00 PM",
		windowEs: "10:00 – 12:00",
		shortEn: "10 AM–12 PM",
		shortEs: "10–12",
	},
	{
		id: "win-12-14",
		windowEn: "12:00 PM – 2:00 PM",
		windowEs: "12:00 – 14:00",
		shortEn: "12 PM–2 PM",
		shortEs: "12–14",
	},
	{
		id: "win-14-16",
		windowEn: "2:00 PM – 4:00 PM",
		windowEs: "14:00 – 16:00",
		shortEn: "2 PM–4 PM",
		shortEs: "14–16",
	},
	{
		id: "win-16-18",
		windowEn: "4:00 PM – 6:00 PM",
		windowEs: "16:00 – 18:00",
		shortEn: "4 PM–6 PM",
		shortEs: "16–18",
	},
] as const;

export const DEFAULT_W04_DRAFT: W04CustomerDraft = {
	bookingId: "HX-DEMO-1027",
	customerName: "Sarah Mitchell",
	serviceType: "FURNITURE REMOVAL · 1 SOFA + 2 CHAIRS",
	pickupAreaEn: "Phoenix, AZ 85004 · demo",
	pickupAreaEs: "Phoenix, AZ 85004 · ejemplo",
	confirmedItemsEn: "1 sofa + 2 chairs",
	confirmedItemsEs: "1 sofá + 2 sillas",
	illustrativeSubtotal: "$356.00",
	conditionalCancellationFee: "$100.00",
	timingMode: null,
	selectedDateId: "date-nov-03",
	selectedWindowId: "win-10-12",
	termsConsentAccepted: false,
	termsVersion: "2026.11-v1",
	termsAcknowledgedQuote: "$356.00",
	recoveryState: "backend_availability_unverified",
	inventorySource: "w04_figma_demo",
	selectedPaymentMethod: "card",
	freshHoldConsentAccepted: false,
};

// In-memory persistent draft store for active user session
let currentDraft: W04CustomerDraft = { ...DEFAULT_W04_DRAFT };
const listeners = new Set<(draft: W04CustomerDraft) => void>();

export function getW04Draft(): W04CustomerDraft {
	return currentDraft;
}

export function updateW04Draft(
	updates: Partial<W04CustomerDraft>,
): W04CustomerDraft {
	currentDraft = { ...currentDraft, ...updates };
	listeners.forEach((listener) => {
		listener(currentDraft);
	});
	return currentDraft;
}

export function resetW04Draft(): void {
	currentDraft = { ...DEFAULT_W04_DRAFT };
	listeners.forEach((listener) => {
		listener(currentDraft);
	});
}

export function subscribeToW04Draft(
	listener: (draft: W04CustomerDraft) => void,
): () => void {
	listeners.add(listener);
	return () => {
		listeners.delete(listener);
	};
}

/**
 * Acknowledges terms locally for the active draft.
 */
export function acknowledgeTermsConsent(): W04CustomerDraft {
	return updateW04Draft({
		termsConsentAccepted: true,
		recoveryState: "local_terms_acknowledged",
		termsAcknowledgedQuote: currentDraft.illustrativeSubtotal,
	});
}

/**
 * Invalidate terms consent if scope, quote or policy changes.
 */
export function invalidateTermsConsent(
	reason = "policy_updated",
): W04CustomerDraft {
	return updateW04Draft({
		termsConsentAccepted: false,
		termsVersion: "2026.11-v2",
		recoveryState:
			reason === "policy_updated"
				? "terms_changed"
				: "terms_acknowledgement_invalidated",
	});
}

/**
 * Select a payment method for the active booking draft.
 */
export function selectPaymentMethod(
	method: PaymentMethodType,
): W04CustomerDraft {
	return updateW04Draft({
		selectedPaymentMethod: method,
		recoveryState: "payment_method_selected",
	});
}

/**
 * Record fee-free cancellation when no driver could be found.
 */
export function recordFeeFreeCancellation(): W04CustomerDraft {
	return updateW04Draft({
		recoveryState: "no_driver_cancelled",
	});
}

/**
 * Record secure card setup demonstration state.
 */
export function recordSecureCardSetupDemo(): W04CustomerDraft {
	return updateW04Draft({
		recoveryState: "secure_card_demo",
	});
}

/**
 * Record card authentication required demonstration state (C29-3D).
 */
export function recordCardAuthenticationRequired(): W04CustomerDraft {
	return updateW04Draft({
		recoveryState: "card_authentication_required",
	});
}

/**
 * Record authorization processing demonstration state (C29-P).
 */
export function recordAuthorizationProcessing(): W04CustomerDraft {
	return updateW04Draft({
		recoveryState: "authorization_processing",
	});
}

/**
 * Record authorization declined demonstration state (C30-D).
 */
export function recordAuthorizationDeclined(): W04CustomerDraft {
	return updateW04Draft({
		recoveryState: "authorization_declined",
	});
}

/**
 * Record card hold expired demonstration state (C30-E).
 */
export function recordHoldExpired(): W04CustomerDraft {
	return updateW04Draft({
		recoveryState: "hold_expired",
	});
}

/**
 * Record authorization restoration demonstration state (C30-R).
 */
export function recordAuthorizationRestoration(): W04CustomerDraft {
	return updateW04Draft({
		recoveryState: "authorization_restoration_demo",
	});
}

/**
 * Record fresh card hold review demonstration state (C30-C).
 */
export function recordFreshHoldReview(): W04CustomerDraft {
	return updateW04Draft({
		recoveryState: "fresh_hold_review_demo",
		freshHoldConsentAccepted: false,
	});
}

/**
 * Explicitly acknowledges fresh hold consent (C30-CA).
 */
export function acknowledgeFreshHoldConsent(): W04CustomerDraft {
	return updateW04Draft({
		recoveryState: "fresh_hold_consent_acknowledged_demo",
		freshHoldConsentAccepted: true,
		termsVersion: "2026.11-v2",
	});
}

/**
 * Record booking status checking demonstration state (C31-P).
 */
export function recordBookingStatusChecking(): W04CustomerDraft {
	return updateW04Draft({
		recoveryState: "booking_status_checking_demo",
	});
}

/**
 * Record scheduled booking recorded state (C31-S).
 */
export function recordBookingRecorded(): W04CustomerDraft {
	return updateW04Draft({
		recoveryState: "booking_recorded_demo",
	});
}

/**
 * Record ASAP request recorded state (C31-A).
 */
export function recordAsapRequestRecorded(): W04CustomerDraft {
	return updateW04Draft({
		recoveryState: "asap_request_recorded_demo",
		timingMode: "asap",
	});
}

/**
 * Record booking not yet confirmed state (C31-F).
 */
export function recordBookingNotConfirmed(): W04CustomerDraft {
	return updateW04Draft({
		recoveryState: "booking_not_confirmed_demo",
	});
}

/**
 * Selects confirmed items text based on inventory source mode and language.
 */
export function getEffectiveConfirmedItems(
	draft: W04CustomerDraft,
	locale: string,
): string {
	if (draft.inventorySource === "active_w03_journey") {
		return locale === "es"
			? W03_CUSTOMER_CONFIRMED_INVENTORY.confirmedItemsEs
			: W03_CUSTOMER_CONFIRMED_INVENTORY.confirmedItemsEn;
	}
	return locale === "es" ? draft.confirmedItemsEs : draft.confirmedItemsEn;
}

/**
 * Selects service type title text based on inventory source mode and language.
 */
export function getEffectiveServiceType(
	draft: W04CustomerDraft,
	locale: string,
): string {
	if (draft.inventorySource === "active_w03_journey") {
		return locale === "es"
			? W03_CUSTOMER_CONFIRMED_INVENTORY.serviceTypeEs
			: W03_CUSTOMER_CONFIRMED_INVENTORY.serviceTypeEn;
	}
	return draft.serviceType;
}
