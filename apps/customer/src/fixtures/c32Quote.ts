/**
 * HAULIX Customer Mobile App — Phase 03.32
 * Fixtures & Typed Contracts: Quote Calculation Processing, Admin Resolution & Illustrative Quote Overview
 *
 * Authoritative Figma References:
 * - C24-P: Node 412:910 (EN) / Node 987:10772 (ES) — Quote Calculation Processing (430 × 1107 px)
 * - C24-ADM-S: Node 412:1054 (EN) / Node 987:10945 (ES) — Admin Review Resolved (430 × 971 px)
 * - C24-ADM-D: Node 412:1099 (EN) / Node 987:11000 (ES) — Admin Clarification Requested (430 × 814 px)
 * - C24-Q: Node 412:1140 (EN) / Node 987:11051 (ES) — Illustrative Quote Overview (430 × 1598 px)
 *
 * CRITICAL ARCHITECTURAL CONSTRAINTS:
 * - Pure frontend prototype demonstration.
 * - Customer confirmed quantities (Queen mattresses = 2, total 4 pieces) are strictly preserved.
 * - Illustrative estimate: fixed sample total of $356 (160 + 75 + 36 + 60 + 25 USD).
 * - Genuine photograph assets (sofa, mattresses, dining table) reused from existing intake assets.
 * - Zero fabricated backend pricing, live tariffs, actual Admin mutations, or mock bookings.
 */

export interface QuoteCalculationStep {
  id: string;
  stepKey: "inventory" | "crew" | "route" | "rules";
  labelKey: string;
  valueKey: string;
}

export interface AdminResolvedScope {
  itemsSummary: string;
  pickupLocation: string;
  disclaimer: string;
}

export interface QuotePriceRow {
  id: string;
  labelKey: string;
  amount: string;
}

export interface QuoteIncludedItem {
  id: string;
  itemKey: "sofa" | "mattresses" | "table";
  imageKey: "sofa" | "mattresses" | "table";
  titleKey: string;
  qtyKey: string;
  weightKey: string;
}

export interface IllustrativeQuoteSummary {
  subtotalAmount: string;
  includedItemsCount: number;
  priceRows: readonly QuotePriceRow[];
  disclaimerKeys: {
    subtotalOnly: string;
    noAdditionalWork: string;
  };
}

export const C24P_CALCULATION_STEPS: readonly QuoteCalculationStep[] = [
  {
    id: "step-inventory",
    stepKey: "inventory",
    labelKey: "eventInventoryLabel",
    valueKey: "eventInventoryValue",
  },
  {
    id: "step-crew",
    stepKey: "crew",
    labelKey: "eventEligibilityLabel",
    valueKey: "eventEligibilityValue",
  },
  {
    id: "step-route",
    stepKey: "route",
    labelKey: "eventRouteLabel",
    valueKey: "eventRouteValue",
  },
  {
    id: "step-rules",
    stepKey: "rules",
    labelKey: "eventRulesLabel",
    valueKey: "eventRulesValue",
  },
] as const;

export const C24Q_INCLUDED_ITEMS: readonly QuoteIncludedItem[] = [
  {
    id: "item-sofa",
    itemKey: "sofa",
    imageKey: "sofa",
    titleKey: "itemSofaTitle",
    qtyKey: "itemSofaQty",
    weightKey: "itemSofaWeight",
  },
  {
    id: "item-mattresses",
    itemKey: "mattresses",
    imageKey: "mattresses",
    titleKey: "itemMattressesTitle",
    qtyKey: "itemMattressesQty",
    weightKey: "itemMattressesWeight",
  },
  {
    id: "item-table",
    itemKey: "table",
    imageKey: "table",
    titleKey: "itemTableTitle",
    qtyKey: "itemTableQty",
    weightKey: "itemTableWeight",
  },
] as const;

export const C24Q_PRICE_ROWS: readonly QuotePriceRow[] = [
  {
    id: "price-labor",
    labelKey: "priceLaborLabel",
    amount: "$160",
  },
  {
    id: "price-vehicle",
    labelKey: "priceVehicleLabel",
    amount: "$75",
  },
  {
    id: "price-distance",
    labelKey: "priceDistanceLabel",
    amount: "$36",
  },
  {
    id: "price-disposal",
    labelKey: "priceDisposalLabel",
    amount: "$60",
  },
  {
    id: "price-access",
    labelKey: "priceAccessLabel",
    amount: "$25",
  },
] as const;

export const C24Q_ILLUSTRATIVE_TOTAL = "$356";
