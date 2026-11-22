/**
 * C19-V Missing Measurements Validation — Fixture
 *
 * Authoritative Figma: Node 382:1424 (EN) & Node 980:9538 (ES)
 * Flow Context: W02 Service Discovery & Intake / C19-V
 */

export interface C19VDetailRow {
  key: string;
  labelKey: "labelItem" | "labelQuantity" | "labelDimensions" | "labelWeight" | "labelStairs";
  valueKey: "valueItem" | "valueQuantity" | "valueDimensions" | "valueWeight" | "valueStairs";
}

export interface C19VItemData {
  clarificationSectionTitleKey: "clarificationSectionTitle";
  details: C19VDetailRow[];
}

export const C19V_DEFAULT_ITEM: C19VItemData = {
  clarificationSectionTitleKey: "clarificationSectionTitle",
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
      key: "weight",
      labelKey: "labelWeight",
      valueKey: "valueWeight",
    },
    {
      key: "stairs",
      labelKey: "labelStairs",
      valueKey: "valueStairs",
    },
  ],
};
