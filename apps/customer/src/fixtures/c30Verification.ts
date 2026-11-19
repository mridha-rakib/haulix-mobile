/**
 * HAULIX Customer Mobile App — Phase 03.30
 * Fixtures & Typed Contracts: AI Uncertainty, Inventory Verification & Manual Recovery
 *
 * Authoritative Figma References:
 * - C22-Q: Node 412:515 (EN) / Node 987:10309 (ES) — Uncertain AI Result
 * - C23:   Node 412:563 (EN) / Node 987:10367 (ES) — Verify Suggested Inventory
 * - C23-M: Node 412:748 (EN) / Node 987:10581 (ES) — Manual Item Verification
 * - C23-U: Node 412:803 (EN) / Node 987:10646 (ES) — Measurement Clarification
 *
 * CRITICAL NON-FABRICATION RULE:
 * Customer-entered data (e.g. mattress qty = 2) is NEVER silently overwritten by
 * illustrative AI suggestions (suggested qty = 1).
 * Uncertainty requires human customer confirmation or manual admin review.
 */

export interface UncertainEvidenceItem {
  id: string;
  imageKey: "mattresses";
  itemType: string;
  customerEnteredQty: number;
  aiVerificationStatus: "uncertain_1_or_2";
  confidenceState: "low_visibility_or_overlap";
}

export interface VerificationInventoryItem {
  id: string;
  key: "sofa" | "mattresses" | "table";
  imageKey: "sofa" | "mattresses" | "table";
  customerQty: number;
  aiSuggestedQty: number;
  hasMismatch: boolean;
  weightDescription: string;
}

export interface ManualRecordField {
  id: string;
  fieldKey: "sofa" | "mattresses" | "table" | "evidence";
  customerValue: string;
}

export interface ClarificationDetailField {
  id: string;
  fieldKey: "item" | "quantity" | "weight" | "exact" | "lifting";
  fieldValue: string;
}

export const C22Q_UNCERTAIN_EVIDENCE: UncertainEvidenceItem = {
  id: "uncertain-mattresses-01",
  imageKey: "mattresses",
  itemType: "Queen mattresses",
  customerEnteredQty: 2,
  aiVerificationStatus: "uncertain_1_or_2",
  confidenceState: "low_visibility_or_overlap",
};

export const C23_VERIFICATION_ITEMS: readonly VerificationInventoryItem[] = [
  {
    id: "item-sofa-01",
    key: "sofa",
    imageKey: "sofa",
    customerQty: 1,
    aiSuggestedQty: 1,
    hasMismatch: false,
    weightDescription: "~125 lb",
  },
  {
    id: "item-mattresses-02",
    key: "mattresses",
    imageKey: "mattresses",
    customerQty: 2, // Invariant: Sarah entered 2 mattresses
    aiSuggestedQty: 1,
    hasMismatch: true,
    weightDescription: "~70 lb each",
  },
  {
    id: "item-table-03",
    key: "table",
    imageKey: "table",
    customerQty: 1,
    aiSuggestedQty: 1,
    hasMismatch: false,
    weightDescription: "~85 lb",
  },
];

export const C23M_MANUAL_RECORDS: readonly ManualRecordField[] = [
  {
    id: "rec-sofa",
    fieldKey: "sofa",
    customerValue: "1 × 3-seat · ~125 lb",
  },
  {
    id: "rec-mattresses",
    fieldKey: "mattresses",
    customerValue: "2 × queen · ~70 lb each",
  },
  {
    id: "rec-table",
    fieldKey: "table",
    customerValue: "1 × table · ~85 lb",
  },
  {
    id: "rec-evidence",
    fieldKey: "evidence",
    customerValue: "Customer-entered and 4 intake images where available",
  },
];

export const C23U_CLARIFICATION_DETAILS: readonly ClarificationDetailField[] = [
  {
    id: "clarify-item",
    fieldKey: "item",
    fieldValue: "Overlapping queen mattresses",
  },
  {
    id: "clarify-qty",
    fieldKey: "quantity",
    fieldValue: "2",
  },
  {
    id: "clarify-weight",
    fieldKey: "weight",
    fieldValue: "~70 lb · estimated",
  },
  {
    id: "clarify-exact",
    fieldKey: "exact",
    fieldValue: "Unavailable",
  },
  {
    id: "clarify-lifting",
    fieldKey: "lifting",
    fieldValue: "Confirm safe handling",
  },
];
