/**
 * HAULIX Customer Mobile App — Phase 03.31
 * Fixtures & Typed Contracts: AI Item Correction, Customer Confirmation & Admin Review
 *
 * Authoritative Figma References:
 * - C23-C: Node 412:625 (EN) / Node 987:10439 (ES) — Correct AI Items
 * - C23-S: Node 412:683 (EN) / Node 987:10506 (ES) — Customer Confirmed Items
 * - C23-R: Node 412:861 (EN) / Node 987:10714 (ES) — Rejected AI Identification
 * - C24-ADM: Node 412:1006 (EN) / Node 987:10887 (ES) — Admin Review Pending
 *
 * CRITICAL ARCHITECTURAL CONSTRAINTS:
 * - Customer confirmed quantities (Queen mattresses = 2) always override AI suggestions (1).
 * - Genuine photograph assets (sofa, mattresses, dining table) reused from existing intake assets.
 * - Frontend prototype only: no real AI inference, quote calculation, backend/Admin decision, or payment.
 */

export interface CorrectionField {
  id: string;
  fieldKey: "itemName" | "quantity" | "dimensions" | "weight" | "photo";
  defaultValue: string;
}

export interface ConfirmedItem {
  id: string;
  itemKey: "sofa" | "mattresses" | "table";
  imageKey: "sofa" | "mattresses" | "table";
  confirmedQty: number;
  weightSummary: string;
  dimensionsSummary: string;
}

export interface ConfirmedQuotationInputs {
  pickupAddress: string;
  accessConditions: string;
  evidenceSummary: string;
}

export interface RejectedItemEvidence {
  id: string;
  itemKey: "mattresses";
  imageKey: "mattresses";
  customerQty: number;
  aiSuggestedQty: number;
}

export interface AdminReviewCase {
  id: string;
  customerName: string;
  requestType: string;
  concernDescription: string;
  reviewStatus: "pending_authorized_admin_review";
}

export const C23C_DEFAULT_CORRECTION_FIELDS: readonly CorrectionField[] = [
  {
    id: "corr-name",
    fieldKey: "itemName",
    defaultValue: "Queen mattress",
  },
  {
    id: "corr-qty",
    fieldKey: "quantity",
    defaultValue: "2",
  },
  {
    id: "corr-dims",
    fieldKey: "dimensions",
    defaultValue: "80 × 60 × 11 in · customer estimated",
  },
  {
    id: "corr-weight",
    fieldKey: "weight",
    defaultValue: "~70 lb · customer estimated",
  },
  {
    id: "corr-photo",
    fieldKey: "photo",
    defaultValue: "Existing image retained",
  },
];

export const C23S_CONFIRMED_ITEMS: readonly ConfirmedItem[] = [
  {
    id: "confirmed-sofa-01",
    itemKey: "sofa",
    imageKey: "sofa",
    confirmedQty: 1,
    weightSummary: "Quantity 1 · ~125 lb",
    dimensionsSummary: "82 × 35 × 34 in · estimated",
  },
  {
    id: "confirmed-mattresses-02",
    itemKey: "mattresses",
    imageKey: "mattresses",
    confirmedQty: 2, // Invariant: customer confirmed 2 mattresses
    weightSummary: "Quantity 2 · ~70 lb each",
    dimensionsSummary: "80 × 60 × 11 in each · estimated",
  },
  {
    id: "confirmed-table-03",
    itemKey: "table",
    imageKey: "table",
    confirmedQty: 1,
    weightSummary: "Quantity 1 · ~85 lb",
    dimensionsSummary: "60 × 36 × 30 in · estimated",
  },
];

export const C23S_QUOTATION_INPUTS: ConfirmedQuotationInputs = {
  pickupAddress: "1234 E Example Lane, Phoenix, AZ 85014",
  accessConditions: "ground level · driveway · ~25 ft carry",
  evidenceSummary: "4 source images · customer-confirmed quantities",
};

export const C23R_REJECTED_ITEM: RejectedItemEvidence = {
  id: "rejected-mattresses-01",
  itemKey: "mattresses",
  imageKey: "mattresses",
  customerQty: 2,
  aiSuggestedQty: 1,
};

export const C24ADM_REVIEW_CASE: AdminReviewCase = {
  id: "case-sv-demo-1027",
  customerName: "Sarah Mitchell",
  requestType: "Service request · Sarah Mitchell · Demo",
  concernDescription: "Concern: service-rate or eligibility rule needs approval",
  reviewStatus: "pending_authorized_admin_review",
};
