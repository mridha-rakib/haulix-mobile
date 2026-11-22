/**
 * C20 Access & Labor Details — Fixture
 *
 * Authoritative Figma: Node 382:1680 (EN) & Node 980:9874 (ES)
 * Flow Context: W02 Service Discovery & Intake / C20
 */

export interface C20AccessDetailRow {
  id: string;
  labelKey:
    | "labelLocation"
    | "labelProperty"
    | "labelStairs"
    | "labelElevator"
    | "labelParking"
    | "labelCarryingDistance"
    | "labelDoorways";
  valueKey:
    | "valueLocation"
    | "valueProperty"
    | "valueStairs"
    | "valueElevator"
    | "valueParking"
    | "valueCarryingDistance"
    | "valueDoorways";
  testID: string;
}

export const C20_PICKUP_ACCESS_ROWS: C20AccessDetailRow[] = [
  {
    id: "location",
    labelKey: "labelLocation",
    valueKey: "valueLocation",
    testID: "c20-detail-location",
  },
  {
    id: "property",
    labelKey: "labelProperty",
    valueKey: "valueProperty",
    testID: "c20-detail-property",
  },
  {
    id: "stairs",
    labelKey: "labelStairs",
    valueKey: "valueStairs",
    testID: "c20-detail-stairs",
  },
  {
    id: "elevator",
    labelKey: "labelElevator",
    valueKey: "valueElevator",
    testID: "c20-detail-elevator",
  },
  {
    id: "parking",
    labelKey: "labelParking",
    valueKey: "valueParking",
    testID: "c20-detail-parking",
  },
  {
    id: "distance",
    labelKey: "labelCarryingDistance",
    valueKey: "valueCarryingDistance",
    testID: "c20-detail-distance",
  },
  {
    id: "doorways",
    labelKey: "labelDoorways",
    valueKey: "valueDoorways",
    testID: "c20-detail-doorways",
  },
];
