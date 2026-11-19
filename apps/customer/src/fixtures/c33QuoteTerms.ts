/**
 * HAULIX Customer Mobile App — Phase 03.33
 * Fixtures & Typed Contracts: Quote Error Recovery, Revision, Itemized Terms & Expiry
 *
 * Authoritative Figma References:
 * - C24-F: Node 412:965 (EN) / Node 987:10837 (ES) — Quote Error Recovery (430 × 757 px)
 * - C24-REV: Node 412:1214 (EN) / Node 987:11137 (ES) — Quote Revision Requested (430 × 952 px)
 * - C25: Node 412:1260 (EN) / Node 987:11193 (ES) — Itemized Quote & Terms (430 × 1690 px)
 * - C25-X: Node 412:1429 (EN) / Node 987:11394 (ES) — Quote Expired Refresh (430 × 799 px)
 *
 * CRITICAL ARCHITECTURAL CONSTRAINTS:
 * - Pure frontend prototype demonstration.
 * - Customer confirmed quantities (Queen mattresses = 2, total 4 pieces across 3 categories) are strictly preserved.
 * - Symmetrical 6-row itemized breakdown totaling exactly $356 USD ($160 + $75 + $36 + $60 + $25 + $0 = $356).
 * - Zero fabricated backend pricing, live tariffs, actual Admin mutations, or mock bookings.
 */

export interface ItemizedChargeRow {
  id: string;
  labelKey: string;
  amount: string;
}

export interface QuoteReferenceDetails {
  bookingId: string;
  customerName: string;
  serviceTypeKey: string;
  locationKey: string;
  crewKey: string;
}

export interface CustomerCorrectionItem {
  id: string;
  textKey: string;
}

export const C25_ITEMIZED_CHARGES: readonly ItemizedChargeRow[] = [
  {
    id: "charge-labor",
    labelKey: "chargeLabor",
    amount: "$160",
  },
  {
    id: "charge-vehicle",
    labelKey: "chargeVehicle",
    amount: "$75",
  },
  {
    id: "charge-distance",
    labelKey: "chargeDistance",
    amount: "$36",
  },
  {
    id: "charge-disposal",
    labelKey: "chargeDisposal",
    amount: "$60",
  },
  {
    id: "charge-access",
    labelKey: "chargeAccess",
    amount: "$25",
  },
  {
    id: "charge-optional",
    labelKey: "chargeOptional",
    amount: "$0",
  },
] as const;

export const C25_ILLUSTRATIVE_TOTAL = "$356";
export const C25_ILLUSTRATIVE_FORMULA = "160 + 75 + 36 + 60 + 25 = 356";

export const C24REV_CORRECTION_ITEMS: readonly CustomerCorrectionItem[] = [
  {
    id: "corr-mattress",
    textKey: "correctionMattress",
  },
  {
    id: "corr-verified",
    textKey: "correctionVerified",
  },
  {
    id: "corr-recalc",
    textKey: "correctionRecalc",
  },
] as const;
