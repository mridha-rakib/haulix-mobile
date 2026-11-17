/**
 * C18-M Moving Service Intake — Data & Constants Fixture
 *
 * Authoritative Figma: Node 382:881 (430 × 1643 px)
 * Flow Context: W02 Service Discovery & Intake / C18-M [BK-02, BK-03, SV-14]
 */

export interface C18MRouteData {
	customer: string;
	pickup: string;
	dropoff: string;
	requestedScope: string;
}

export interface C18MInventoryData {
	largeItems: string;
	estimatedWeight: string;
	originStairs: string;
	destinationStairs: string;
	packingRequest: string;
}

export const C18M_DEFAULT_ROUTE: C18MRouteData = {
	customer: "Daniel Ruiz · fictional",
	pickup: "2140 E Sample Road, Phoenix, AZ 85016",
	dropoff: "5678 N Demo Avenue, Phoenix, AZ 85012",
	requestedScope: "Household moving · 1-bedroom apartment",
};

export const C18M_DEFAULT_INVENTORY: C18MInventoryData = {
	largeItems: "2-seat couch ×1; dresser ×1; 12 moving boxes",
	estimatedWeight: "Customer estimate ~550 lb total",
	originStairs: "Ground floor",
	destinationStairs: "1 flight, no elevator",
	packingRequest: "No additional packing service selected",
};

export const C18M_DEMO_CONSTANTS = {
	stepIndicator: "W02 · SERVICE DISCOVERY & INTAKE",
	stepSub: "  /  C18-M",
	title: "Moving details",
	subtitle:
		"Separate fictional scenario HX-DEMO-MOVE-1034 · No production quote.",
	defaultBookingId: "HX-DEMO-MOVE-1034",
	fictionalCustomer: "DANIEL RUIZ · HX-DEMO-MOVE-1034",
	// Section A
	sectionARouteTitle: "Moving route",
	labelCustomer: "Customer",
	labelPickup: "Pickup",
	labelDropoff: "Drop-off",
	labelRequestedScope: "Requested scope",
	// Section B
	sectionBInventoryTitle: "Inventory & access",
	labelLargeItems: "Large items",
	labelEstimatedWeight: "Estimated weight",
	labelOriginStairs: "Origin stairs",
	labelDestinationStairs: "Destination stairs",
	labelPackingRequest: "Packing request",
	// Section C
	sectionCAssessmentTitle: "Load and crew assessment needed",
	badgeReviewRequired: "Review required",
	assessmentDescription:
		"Worker count/vehicle suitability is determined from approved capacity rules.",
	runtimeClarification:
		"This moving intake is a demo and does not modify other bookings.",
	figmaStaticClarification:
		"This is separate from Sarah Mitchell's junk removal booking.",
	// CTAs
	continueCta: "Continue moving details",
	returnServiceListCta: "Return to service list   ›",
	// Footers
	footerNoticeDemo: "DEMO ONLY  ·  No confirmed booking, rates or payment",
	footerNoticeSrs: "SRS  BK-02, BK-03, SV-14  ·  430 px / vertical scroll",
	// Notices
	noticeC20M:
		"Moving quote estimation (C20-M) is scheduled for an upcoming phase.",
	noticeNonMoving:
		"Moving details apply specifically to Moving services. Currently selected service is {{service}}. This screen presents an illustrative demo intake.",
} as const;
