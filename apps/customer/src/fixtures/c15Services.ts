/**
 * C15 Service Discovery — Service Categories Fixture
 *
 * Authoritative Figma: Node 382:126 (430 × 1791 px)
 * Seven approved services for W02 Service Discovery & Intake.
 * Note: Assembly Add-on is strictly omitted from C15.
 */

export type C15ServiceId =
	| "junk-removal"
	| "moving"
	| "furniture-pickup"
	| "appliance-removal"
	| "mattress-removal"
	| "garage-cleanout"
	| "store-pickup";

export type C15ServiceIconName =
	| "junk"
	| "moving"
	| "furniture"
	| "appliance"
	| "mattress"
	| "garage"
	| "store";

export interface C15ServiceItem {
	id: C15ServiceId;
	name: string;
	subtitle: string;
	i18nTitleKey: string;
	i18nSubtitleKey: string;
	iconName: C15ServiceIconName;
	sourceRowNode: string;
	futureDestinationNode: string;
	futureState: string;
}

export const C15_SERVICES: C15ServiceItem[] = [
	{
		id: "junk-removal",
		name: "Junk Removal",
		subtitle: "Non-hazardous hauling and disposal",
		i18nTitleKey: "c15.serviceJunkRemoval",
		i18nSubtitleKey: "c15.subtitleJunkRemoval",
		iconName: "junk",
		sourceRowNode: "382:152",
		futureDestinationNode: "382:805",
		futureState: "C18-J",
	},
	{
		id: "moving",
		name: "Moving",
		subtitle: "Pickup-to-destination transport",
		i18nTitleKey: "c15.serviceMoving",
		i18nSubtitleKey: "c15.subtitleMoving",
		iconName: "moving",
		sourceRowNode: "382:160",
		futureDestinationNode: "382:881",
		futureState: "C18-M",
	},
	{
		id: "furniture-pickup",
		name: "Furniture Pickup",
		subtitle: "Sofas, tables and other furniture",
		i18nTitleKey: "c15.serviceFurniturePickup",
		i18nSubtitleKey: "c15.subtitleFurniturePickup",
		iconName: "furniture",
		sourceRowNode: "382:171",
		futureDestinationNode: "382:959",
		futureState: "C18-F",
	},
	{
		id: "appliance-removal",
		name: "Appliance Removal",
		subtitle: "Approved appliance removal",
		i18nTitleKey: "c15.serviceApplianceRemoval",
		i18nSubtitleKey: "c15.subtitleApplianceRemoval",
		iconName: "appliance",
		sourceRowNode: "382:179",
		futureDestinationNode: "387:177",
		futureState: "C18-A",
	},
	{
		id: "mattress-removal",
		name: "Mattress Removal",
		subtitle: "Mattress handling and disposal review",
		i18nTitleKey: "c15.serviceMattressRemoval",
		i18nSubtitleKey: "c15.subtitleMattressRemoval",
		iconName: "mattress",
		sourceRowNode: "382:187",
		futureDestinationNode: "387:274",
		futureState: "C18-T",
	},
	{
		id: "garage-cleanout",
		name: "Garage Cleanout",
		subtitle: "Photos, access and contamination screening",
		i18nTitleKey: "c15.serviceGarageCleanout",
		i18nSubtitleKey: "c15.subtitleGarageCleanout",
		iconName: "garage",
		sourceRowNode: "382:195",
		futureDestinationNode: "382:1056",
		futureState: "C18-G",
	},
	{
		id: "store-pickup",
		name: "Store Pickup",
		subtitle: "Store order collection and delivery",
		i18nTitleKey: "c15.serviceStorePickup",
		i18nSubtitleKey: "c15.subtitleStorePickup",
		iconName: "store",
		sourceRowNode: "382:203",
		futureDestinationNode: "382:1115",
		futureState: "C18-R",
	},
];

export const C15_DEMO_CONSTANTS = {
	stepIndicator: "W02 · SERVICE DISCOVERY & INTAKE",
	stepSub: "/ C15",
	title: "What can we help with?",
	subtitle: "Choose the approved service that matches your task.",
	defaultBookingId: "HX-DEMO-1027",
	serviceAreaTitle: "Service area",
	serviceAreaRegion: "Phoenix, Arizona · Initial service region",
	serviceAreaNote:
		"Eligible Arizona service area checked again before booking.",
	availableServicesTitle: "Available services",
	serviceInfoTitle: "Service information",
	noQuoteNote: "No quote or appointment has been confirmed yet.",
	footerNotice1: "DEMO ONLY · No confirmed booking, rates or payment",
	footerNotice2: "SRS BK-01, SV-01, AI-12 · 430 px / vertical scroll",
} as const;
