/**
 * C16 Service Area Eligibility — Data & Constants Fixture
 *
 * Authoritative Figma: Node 382:323 (430 × 1314 px)
 * Owner Visual Reference: references/OWNER_C16_PREMIUM_TARGET.png
 */

export interface C16PickupAddress {
  street: string;
  city: string;
  state: string;
  zipCode: string;
}

export const C16_DEMO_ADDRESS: C16PickupAddress = {
  street: "1234 E Example Lane",
  city: "Phoenix",
  state: "Arizona",
  zipCode: "85014",
};

export const C16_DEMO_CONSTANTS = {
  stepIndicator: "W02 · SERVICE DISCOVERY & INTAKE",
  stepSub: "/ C16",
  title: "Check your service area",
  subtitle:
    "Arizona is the only launch state. Availability depends on the exact address and service.",
  regionCardTitle: "Requested pickup region",
  eligibilityTitle: "Arizona request – Demo eligible",
  demoStatus: "Completed in this demo",
  candidateArea: "Phoenix, AZ 85014 – Candidate service area",
  eligibilityNotice: "Final location eligibility and capacity are validated before dispatch.",
  useLocationCta: "Use this location",
  changeLocationCta: "Choose another location   ›",
  outsideZoneCta: "See outside-zone response   ›",
  permissionHelpCta: "Location permission help   ›",
  footerNoticeDemo: "DEMO ONLY – No confirmed booking, rates or payment",
  footerNoticeSrs: "SRS BK-01, BK-02, SV-08, SV-12 · 430 px / vertical scroll",
};
