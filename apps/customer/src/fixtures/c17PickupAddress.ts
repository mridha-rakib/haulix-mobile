/**
 * C17 Choose Pickup Address — Data & Constants Fixture
 *
 * Authoritative Figma: Node 382:576 (430 × 1413 px)
 * Context: W02 Service Discovery & Intake / C17
 */

export interface C17SavedAddress {
  id: string;
  title: string;
  i18nTitleKey: string;
  fullAddress: string;
  street: string;
  city: string;
  state: string;
  zipCode: string;
  isDefault?: boolean;
}

export const C17_DEFAULT_SAVED_ADDRESSES: C17SavedAddress[] = [
  {
    id: "home-default",
    title: "Home · Default pickup",
    i18nTitleKey: "c17.homeTitle",
    fullAddress: "1234 E Example Lane, Phoenix, AZ 85014",
    street: "1234 E Example Lane",
    city: "Phoenix",
    state: "AZ",
    zipCode: "85014",
    isDefault: true,
  },
  {
    id: "relatives-residence",
    title: "Relative's residence",
    i18nTitleKey: "c17.relativeTitle",
    fullAddress: "5678 N Demo Avenue, Phoenix, AZ 85012",
    street: "5678 N Demo Avenue",
    city: "Phoenix",
    state: "AZ",
    zipCode: "85012",
    isDefault: false,
  },
];

export const C17_DEMO_CONSTANTS = {
  stepIndicator: "W02 · SERVICE DISCOVERY & INTAKE",
  stepSub: "/ C17",
  title: "Where should we collect?",
  subtitleTemplate:
    "Use {{name}}'s saved service address or enter a different Arizona pickup location.",
  defaultCustomerChip: "SARAH MITCHELL · HX-DEMO-1027",
  savedAddressesTitle: "Saved addresses",
  pickupInstructionsTitle: "Pickup instructions",
  labelContact: "Contact",
  labelServiceType: "Service type",
  labelPickupAccess: "Pickup access",
  pickupAccessValue: "Residential driveway · Details to confirm",
  addressRuleTitle: "Address rule",
  addressRule1: "Pickup must be validated for active Arizona service.",
  addressRule2: "A destination is added only when the selected service requires delivery.",
  confirmPickupCta: "Confirm pickup address",
  addAddressCta: "Add another address   ›",
  movingDropoffCta: "Moving drop-off example   ›",
  footerNoticeDemo: "DEMO ONLY  ·  No confirmed booking, rates or payment",
  footerNoticeSrs: "SRS  BK-02, CU-04, CU-09  ·  430 px / vertical scroll",
};
