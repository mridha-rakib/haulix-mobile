/**
 * C19-E Manual Item Correction — Fixture
 *
 * Authoritative Figma: Node 382:1306 (EN) & Node 980:9388 (ES)
 * Flow Context: W02 Service Discovery & Intake / C19-E
 */

export interface C19EDetailRow {
	key: string;
	labelKey:
		| "labelItemType"
		| "labelQuantity"
		| "labelDimensions"
		| "labelWeight"
		| "labelRemovalDifficulty";
	valueKey:
		| "valueItemType"
		| "valueQuantity"
		| "valueDimensions"
		| "valueWeight"
		| "valueRemovalDifficulty";
}

export interface C19EItemData {
	itemSectionTitleKey: "itemSectionTitle";
	details: C19EDetailRow[];
}

export const C19E_DEFAULT_ITEM: C19EItemData = {
	itemSectionTitleKey: "itemSectionTitle",
	details: [
		{
			key: "itemType",
			labelKey: "labelItemType",
			valueKey: "valueItemType",
		},
		{
			key: "quantity",
			labelKey: "labelQuantity",
			valueKey: "valueQuantity",
		},
		{
			key: "dimensions",
			labelKey: "labelDimensions",
			valueKey: "valueDimensions",
		},
		{
			key: "weight",
			labelKey: "labelWeight",
			valueKey: "valueWeight",
		},
		{
			key: "removalDifficulty",
			labelKey: "labelRemovalDifficulty",
			valueKey: "valueRemovalDifficulty",
		},
	],
};
