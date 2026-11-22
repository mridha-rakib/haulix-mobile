/**
 * C19-P Item Photo Uploads — Fixture
 *
 * Authoritative Figma: Node 382:1483 (EN) & Node 980:9613 (ES)
 * Flow Context: W02 Service Discovery & Intake / C19-P
 */

export interface C19PhotoItem {
	id: string;
	titleKey:
		| "photoSofaTitle"
		| "photoMattressesTitle"
		| "photoTableTitle"
		| "photoBoxesTitle";
	subtitleKey:
		| "photoSofaSub"
		| "photoMattressesSub"
		| "photoTableSub"
		| "photoBoxesSub";
	imageKey: "sofa" | "mattresses" | "table" | "boxes";
	testID: string;
}

export const C19P_PHOTO_ITEMS: C19PhotoItem[] = [
	{
		id: "sofa",
		titleKey: "photoSofaTitle",
		subtitleKey: "photoSofaSub",
		imageKey: "sofa",
		testID: "c19p-photo-sofa",
	},
	{
		id: "mattresses",
		titleKey: "photoMattressesTitle",
		subtitleKey: "photoMattressesSub",
		imageKey: "mattresses",
		testID: "c19p-photo-mattresses",
	},
	{
		id: "table",
		titleKey: "photoTableTitle",
		subtitleKey: "photoTableSub",
		imageKey: "table",
		testID: "c19p-photo-table",
	},
	{
		id: "boxes",
		titleKey: "photoBoxesTitle",
		subtitleKey: "photoBoxesSub",
		imageKey: "boxes",
		testID: "c19p-photo-boxes",
	},
];
