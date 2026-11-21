/**
 * HAULIX Customer Mobile App — Phase 03.43
 * Typed Contracts & Dispatch State Fixtures: Workflow 05 (Dispatch & Assignment)
 *
 * Authoritative Figma Master Sections:
 * - Page 1:2: 01 — Customer App (5 Screens)
 * - Section 836:4571: W05 — ENGLISH | Dispatch • Matching • Driver • Crew • Exceptions • W06
 * - Section 836:4572: W05 — ESPAÑOL | Despacho • Asignación • Equipo • Excepciones • W06
 * - Canonical Handoff Frames: 763:1290 (EN) / 766:1676 (ES)
 * - Foundational Concept: Node 111:13 (C05 · Job Tracking)
 *
 * CRITICAL ARCHITECTURAL CONSTRAINTS:
 * - Pure frontend demonstration and deterministic prototype state.
 * - Customer confirmed quantities from W03 (1 sofa, 2 queen mattresses, 1 dining table = 4 pieces across 3 categories)
 *   are strictly preserved in the active customer journey.
 * - Symmetrical illustrative subtotal is strictly $356.00 USD (non-binding demo subtotal).
 * - Zero fabricated backend dispatch queues, live driver GPS streaming, or unauthorized Stripe card charges.
 * - Cancellation terms: 100% fee-free before driver match and during 5-minute grace period;
 *   illustrative $100.00 conditional fee applies post-grace period while en route, subject to stated exceptions.
 */

import { W03_CUSTOMER_CONFIRMED_INVENTORY } from "./c36Scheduling";

export type DispatchSearchPhase =
  | "searching"
  | "matched"
  | "en_route"
  | "cancellation_windows"
  | "cancelled_fee_free"
  | "no_driver"
  | "driver_late"
  | "reassigned"
  | "canceled";

export interface DispatchDriver {
  id: string;
  name: string;
  rating: number;
  completedJobs: number;
  phone: string;
  isVerified: boolean;
}

export interface DispatchVehicle {
  makeModel: string;
  colorEn: string;
  colorEs: string;
  licensePlate: string;
  tierEn: string;
  tierEs: string;
}

export interface DispatchCrew {
  driver: DispatchDriver;
  helperCount: number;
  crewSummaryEn: string;
  crewSummaryEs: string;
  vehicle: DispatchVehicle;
  estimatedArrivalMin: number;
  distanceMiles: number;
}

export interface CancellationWindowInfo {
  tierId: "before_assignment" | "grace_period" | "post_assignment";
  titleEn: string;
  titleEs: string;
  badgeEn: string;
  badgeEs: string;
  feeAmount: string;
  descriptionEn: string;
  descriptionEs: string;
  isFeeFree: boolean;
}

export interface W05DispatchState {
  phase: DispatchSearchPhase;
  previousPhase?: DispatchSearchPhase;
  bookingRef: string;
  pickupAddressEn: string;
  pickupAddressEs: string;
  serviceTierEn: string;
  serviceTierEs: string;
  quoteAmount: string;
  confirmedItemsEn: string;
  confirmedItemsEs: string;
  crew: DispatchCrew;
  searchElapsedSeconds: number;
  isCancelled: boolean;
  cancelReason: string | null;
}

/**
 * Standard demonstration crew fixture
 */
export const W05_DEMO_CREW: DispatchCrew = {
  driver: {
    id: "drv-782",
    name: "Marcus Vance",
    rating: 4.9,
    completedJobs: 312,
    phone: "(602) 555-0194",
    isVerified: true,
  },
  helperCount: 1,
  crewSummaryEn: "Primary Driver + 1 Helper (2-Person Crew)",
  crewSummaryEs: "Conductor principal + 1 ayudante (equipo de 2 personas)",
  vehicle: {
    makeModel: "Ford Transit High Roof",
    colorEn: "Alpine White",
    colorEs: "Blanco alpino",
    licensePlate: "#AZ-HLX29",
    tierEn: "Cargo Van · Heavy Load",
    tierEs: "Furgoneta de carga · Carga pesada",
  },
  estimatedArrivalMin: 11,
  distanceMiles: 2.8,
};

export const W05_DRIVER_LATE_CREW: DispatchCrew = {
  driver: {
    id: "drv-883",
    name: "Mike R.",
    rating: 4.8,
    completedJobs: 219,
    phone: "(602) 555-0182",
    isVerified: true,
  },
  helperCount: 0,
  crewSummaryEn: "1 driver · helper pending",
  crewSummaryEs: "1 conductor · ayudante pendiente",
  vehicle: {
    makeModel: "Cargo Van",
    colorEn: "White",
    colorEs: "Blanca",
    licensePlate: "AZ 7HT-9234",
    tierEn: "White cargo van · AZ 7HT-9234",
    tierEs: "Furgoneta blanca · AZ 7HT-9234",
  },
  estimatedArrivalMin: 25,
  distanceMiles: 4.5,
};

export const W05_REASSIGNED_CREW: DispatchCrew = {
  driver: {
    id: "drv-914",
    name: "Sarah L.",
    rating: 4.9,
    completedJobs: 405,
    phone: "(602) 555-0147",
    isVerified: true,
  },
  helperCount: 1,
  crewSummaryEn: "1 driver · helper confirmed",
  crewSummaryEs: "1 conductor · ayudante confirmado",
  vehicle: {
    makeModel: "Pickup Truck",
    colorEn: "Gray",
    colorEs: "Gris",
    licensePlate: "AZ 4ML-2308",
    tierEn: "Gray pickup · AZ 4ML-2308",
    tierEs: "Camioneta gris · AZ 4ML-2308",
  },
  estimatedArrivalMin: 18,
  distanceMiles: 3.8,
};

/**
 * Authoritative 3-tier cancellation window policy
 */
export const W05_CANCELLATION_WINDOWS: readonly CancellationWindowInfo[] = [
  {
    tierId: "before_assignment",
    titleEn: "Before Driver Assignment",
    titleEs: "Antes de la asignación del conductor",
    badgeEn: "100% Free · No Charge",
    badgeEs: "100% Gratis · Sin cargo",
    feeAmount: "$0.00",
    descriptionEn:
      "While dispatch is actively searching for a driver, you may cancel at any moment with zero penalty. In this prototype, simulated card hold is released with zero actual funds charged.",
    descriptionEs:
      "Mientras el despacho busca un conductor, puedes cancelar en cualquier momento sin penalización. En este prototipo, la retención simulada se libera sin cobro de fondos reales.",
    isFeeFree: true,
  },
  {
    tierId: "grace_period",
    titleEn: "First 5 Minutes of Match",
    titleEs: "Primeros 5 minutos de coincidencia",
    badgeEn: "Grace Period · Fee-Free",
    badgeEs: "Periodo de gracia · Sin cargo",
    feeAmount: "$0.00",
    descriptionEn:
      "A 5-minute fee-free grace period begins immediately when a driver is matched. Review vehicle and crew details with full flexibility to exit in this demo.",
    descriptionEs:
      "Comienza un periodo de gracia de 5 minutos sin cargo justo cuando se asigna un conductor. Revisa los datos del vehículo y equipo con total libertad.",
    isFeeFree: true,
  },
  {
    tierId: "post_assignment",
    titleEn: "After Grace Period · En Route",
    titleEs: "Tras el periodo de gracia · En camino",
    badgeEn: "Conditional $100 Fee",
    badgeEs: "Cargo condicional de $100",
    feeAmount: "$100.00",
    descriptionEn:
      "If cancelled after 5 minutes while the crew is actively traveling to your pickup location, an illustrative $100.00 dispatch fee may apply to compensate driver transit time, unless an approved waiver applies (e.g. driver arrival delayed >15 min).",
    descriptionEs:
      "Si cancelas después de 5 minutos mientras el equipo viaja activamente a tu recogida, podría aplicar un cargo ilustrativo de $100.00 por traslado del conductor, salvo excepciones aprobadas (p. ej. retraso del conductor >15 min).",
    isFeeFree: false,
  },
] as const;

/**
 * Helper to determine whether a given phase is eligible for fee-free exit
 */
export function isCancellationFeeFree(phase: DispatchSearchPhase): boolean {
  return phase === "searching" || phase === "matched";
}

/**
 * Initial canonical dispatch state preserving customer draft invariants
 */
export const INITIAL_W05_DISPATCH_STATE: W05DispatchState = {
  phase: "searching",
  previousPhase: undefined,
  bookingRef: "#HLX-7829-BK",
  pickupAddressEn: "1234 E Example Lane, Phoenix, AZ 85014",
  pickupAddressEs: "1234 E Example Lane, Phoenix, AZ 85014",
  serviceTierEn: "ASAP Priority Dispatch",
  serviceTierEs: "Despacho prioritario ASAP",
  quoteAmount: "$356.00",
  confirmedItemsEn: W03_CUSTOMER_CONFIRMED_INVENTORY.confirmedItemsEn, // 1 sofa, 2 queen mattresses, 1 dining table (4 pieces)
  confirmedItemsEs: W03_CUSTOMER_CONFIRMED_INVENTORY.confirmedItemsEs,
  crew: W05_DEMO_CREW,
  searchElapsedSeconds: 42,
  isCancelled: false,
  cancelReason: null,
};

let currentDispatchState: W05DispatchState = { ...INITIAL_W05_DISPATCH_STATE };
const listeners = new Set<(state: W05DispatchState) => void>();

export function getW05DispatchState(): W05DispatchState {
  return { ...currentDispatchState };
}

export function updateW05DispatchState(partial: Partial<W05DispatchState>): W05DispatchState {
  currentDispatchState = { ...currentDispatchState, ...partial };
  for (const listener of listeners) {
    listener(currentDispatchState);
  }
  return currentDispatchState;
}

export function subscribeToW05DispatchState(
  listener: (state: W05DispatchState) => void
): () => void {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
}

export function setDispatchPhase(
  phase: DispatchSearchPhase,
  preservePrevious = true
): W05DispatchState {
  const previousPhase = preservePrevious
    ? currentDispatchState.phase !== "cancellation_windows"
      ? currentDispatchState.phase
      : currentDispatchState.previousPhase
    : undefined;
  return updateW05DispatchState({ phase, previousPhase });
}

export function simulateDriverMatched(): W05DispatchState {
  return updateW05DispatchState({
    phase: "matched",
    previousPhase: "searching",
    crew: {
      ...W05_DEMO_CREW,
      estimatedArrivalMin: 14,
      distanceMiles: 3.2,
    },
  });
}

export function simulateCrewEnRoute(): W05DispatchState {
  return updateW05DispatchState({
    phase: "en_route",
    previousPhase: "matched",
    crew: {
      ...W05_DEMO_CREW,
      estimatedArrivalMin: 11,
      distanceMiles: 2.8,
    },
  });
}

export function simulateFeeFreeExit(reason = "customer_requested_fee_free"): W05DispatchState {
  const effectivePhase =
    currentDispatchState.phase === "cancellation_windows"
      ? (currentDispatchState.previousPhase ?? "en_route")
      : currentDispatchState.phase;

  const isEligible = isCancellationFeeFree(effectivePhase);

  return updateW05DispatchState({
    phase: isEligible ? "cancelled_fee_free" : currentDispatchState.phase,
    isCancelled: isEligible,
    cancelReason: isEligible ? reason : "requires_delay_waiver_review",
  });
}

export function resetDispatchDemo(): W05DispatchState {
  currentDispatchState = { ...INITIAL_W05_DISPATCH_STATE };
  for (const listener of listeners) {
    listener(currentDispatchState);
  }
  return currentDispatchState;
}
