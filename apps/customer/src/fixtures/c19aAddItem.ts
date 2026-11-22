/**
 * C19-A Add Item Manually — Fixture
 *
 * Authoritative Figma: Node 382:1365 (EN) & Node 980:9463 (ES)
 * Flow Context: W02 Service Discovery & Intake / C19-A
 */

export interface C19ADetailRow {
	key: string;
	labelKey:
		| "labelItem"
		| "labelQuantity"
		| "labelDimensions"
		| "labelEstimatedWeight"
		| "labelMaterial";
	valueKey:
		| "valueItem"
		| "valueQuantity"
		| "valueDimensions"
		| "valueEstimatedWeight"
		| "valueMaterial";
}

export interface C19AItemData {
	newItemSectionTitleKey: "newItemSectionTitle";
	details: C19ADetailRow[];
}

export const C19A_DEFAULT_ITEM: C19AItemData = {
	newItemSectionTitleKey: "newItemSectionTitle",
	details: [
		{
			key: "item",
			labelKey: "labelItem",
			valueKey: "valueItem",
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
			key: "estimatedWeight",
			labelKey: "labelEstimatedWeight",
			valueKey: "valueEstimatedWeight",
		},
		{
			key: "material",
			labelKey: "labelMaterial",
			valueKey: "valueMaterial",
		},
	],
};
