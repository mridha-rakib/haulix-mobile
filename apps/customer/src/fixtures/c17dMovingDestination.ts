/**
 * C17-D Moving Destination — Data & Constants Fixture
 *
 * Authoritative Figma: Node 382:744 (430 × 1340 px)
 * Flow Context: W02 Service Discovery & Intake / C17-D [BK-02, SV-14]
 */

export interface C17DDestinationData {
  dropoffAddress: string;
  cityStateZip: string;
  destinationType: string;
  elevator: string;
}

export const C17D_DEFAULT_DESTINATION: C17DDestinationData = {
  dropoffAddress: "5678 N Demo Avenue",
  cityStateZip: "Phoenix, AZ 85012",
  destinationType: "Residential · 2nd floor",
  elevator: "No · Stairs need review",
};

export const C17D_DEMO_CONSTANTS = {
  stepIndicator: "W02 · SERVICE DISCOVERY & INTAKE",
  stepSub: "  /  C17-D",
  title: "Where is the drop-off?",
  subtitle: "Pickup-to-destination moving requires both validated locations.",
  defaultBookingId: "HX-DEMO-MOVE-1034",
  pickupTitle: "Pickup",
  originLabel: "Origin",
  destinationTitle: "Destination",
  dropoffAddressLabel: "Drop-off address",
  cityStateZipLabel: "City / State / ZIP",
  destinationTypeLabel: "Destination type",
  elevatorLabel: "Elevator",
  safetyTitle: "Safe handling checks apply",
  reviewRequiredBadge: "Review required",
  safetyDescription:
    "Moving capacity, stairs and crew requirements will be assessed during quotation.",
  continueCta: "Continue moving intake",
  returnPickupCta: "Return to pickup address   ›",
  footerNoticeDemo: "DEMO ONLY  ·  No confirmed booking, rates or payment",
  footerNoticeSrs: "SRS  BK-02, SV-14  ·  430 px / vertical scroll",
} as const;
