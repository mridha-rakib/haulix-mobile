export type ServiceIconName =
	| "junk"
	| "moving"
	| "furniture"
	| "appliance"
	| "mattress"
	| "garage"
	| "store"
	| "assembly";

export interface ServiceCategoryItem {
	id: string;
	name: string;
	i18nKey: string;
	iconName: ServiceIconName;
	isDisabled?: boolean;
}

export const C01_SERVICE_CATEGORIES: ServiceCategoryItem[] = [
	{
		id: "junk-removal",
		name: "Junk Removal",
		i18nKey: "home.serviceJunkRemoval",
		iconName: "junk",
	},
	{
		id: "moving",
		name: "Moving",
		i18nKey: "home.serviceMoving",
		iconName: "moving",
	},
	{
		id: "furniture-pickup",
		name: "Furniture Pickup",
		i18nKey: "home.serviceFurniturePickup",
		iconName: "furniture",
	},
	{
		id: "appliance-removal",
		name: "Appliance Removal",
		i18nKey: "home.serviceApplianceRemoval",
		iconName: "appliance",
	},
	{
		id: "mattress-removal",
		name: "Mattress Removal",
		i18nKey: "home.serviceMattressRemoval",
		iconName: "mattress",
	},
	{
		id: "garage-cleanout",
		name: "Garage Cleanout",
		i18nKey: "home.serviceGarageCleanout",
		iconName: "garage",
	},
	{
		id: "store-pickup",
		name: "Store Pickup",
		i18nKey: "home.serviceStorePickup",
		iconName: "store",
	},
	{
		id: "assembly-addon",
		name: "Assembly Add-on",
		i18nKey: "home.serviceAssemblyAddon",
		iconName: "assembly",
		isDisabled: true,
	},
];

export interface RecentJobItem {
	id: string;
	title: string;
	addressLine1: string;
	addressLine2: string;
	status: string;
	date: string;
}

export const C01_RECENT_JOB_DEMO: RecentJobItem = {
	id: "HX-JOB-HIST-001",
	title: "Junk Removal",
	addressLine1: "1234 E Thomas Rd",
	addressLine2: "Phoenix, AZ 85014",
	status: "✓ Completed",
	date: "Apr 12, 2024",
};

export interface SavedAddressItem {
	id: string;
	label: string;
	address: string;
}

export const C01_SAVED_ADDRESS_DEMO: SavedAddressItem = {
	id: "HX-ADDR-001",
	label: "Home",
	address: "1234 E Thomas Rd, Phoenix, AZ 85014",
};
