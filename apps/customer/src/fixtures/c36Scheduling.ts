/**
 * HAULIX Customer Mobile App — Phase 03.36
 * Typed Contracts & Scheduling State Fixtures: W04 Scheduling & Booking Review
 *
 * Authoritative Figma References:
 * - C27: Node 763:2 (EN) / Node 766:388 (ES) — Choose your service time (430 × 990 / 1023 px)
 * - C27-A: Node 763:71 (EN) / Node 766:457 (ES) — Request service ASAP (430 × 905 px)
 * - C27-S: Node 763:133 (EN) / Node 766:519 (ES) — Select an available window (430 × 1198 / 1215 px)
 * - C28: Node 763:396 (EN) / Node 766:782 (ES) — Review your booking (430 × 1195 / 1180 px)
 *
 * CRITICAL ARCHITECTURAL CONSTRAINTS:
 * - Pure frontend prototype demonstration.
 * - Customer confirmed quantities (Queen mattresses = 2, total 4 pieces across 3 categories) are strictly preserved.
 * - Symmetrical illustrative subtotal is strictly $356.00 USD (not an approved Arizona tariff, not a guaranteed charge).
 * - Zero fabricated backend bookings, no real driver assignment, no live Stripe transactions.
 */

export type TimingMode = "asap" | "scheduled";

export interface SchedulingDateOption {
  id: string;
  dayEn: string;
  dayEs: string;
  dateEn: string;
  dateEs: string;
  fullDateEn: string;
  fullDateEs: string;
}

export interface ServiceWindowOption {
  id: string;
  windowEn: string;
  windowEs: string;
  shortEn: string;
  shortEs: string;
}

export interface W04CustomerDraft {
  bookingId: string;
  customerName: string;
  serviceType: string;
  pickupAreaEn: string;
  pickupAreaEs: string;
  confirmedItemsEn: string;
  confirmedItemsEs: string;
  illustrativeSubtotal: string;
  conditionalCancellationFee: string;
  timingMode: TimingMode | null;
  selectedDateId: string;
  selectedWindowId: string;
  termsConsentAccepted: boolean;
}

export const SAMPLE_DATES: readonly SchedulingDateOption[] = [
  {
    id: "date-nov-03",
    dayEn: "TUE",
    dayEs: "MAR",
    dateEn: "NOV 03",
    dateEs: "03 NOV",
    fullDateEn: "Tue, Nov 3",
    fullDateEs: "Mar., 3 nov.",
  },
  {
    id: "date-nov-04",
    dayEn: "WED",
    dayEs: "MIÉ",
    dateEn: "NOV 04",
    dateEs: "04 NOV",
    fullDateEn: "Wed, Nov 4",
    fullDateEs: "Mié., 4 nov.",
  },
  {
    id: "date-nov-05",
    dayEn: "THU",
    dayEs: "JUE",
    dateEn: "NOV 05",
    dateEs: "05 NOV",
    fullDateEn: "Thu, Nov 5",
    fullDateEs: "Jue., 5 nov.",
  },
  {
    id: "date-nov-06",
    dayEn: "FRI",
    dayEs: "VIE",
    dateEn: "NOV 06",
    dateEs: "06 NOV",
    fullDateEn: "Fri, Nov 6",
    fullDateEs: "Vie., 6 nov.",
  },
] as const;

export const SAMPLE_WINDOWS: readonly ServiceWindowOption[] = [
  {
    id: "win-10-12",
    windowEn: "10:00 AM – 12:00 PM",
    windowEs: "10:00 – 12:00",
    shortEn: "10 AM–12 PM",
    shortEs: "10–12",
  },
  {
    id: "win-12-14",
    windowEn: "12:00 PM – 2:00 PM",
    windowEs: "12:00 – 14:00",
    shortEn: "12 PM–2 PM",
    shortEs: "12–14",
  },
  {
    id: "win-14-16",
    windowEn: "2:00 PM – 4:00 PM",
    windowEs: "14:00 – 16:00",
    shortEn: "2 PM–4 PM",
    shortEs: "14–16",
  },
  {
    id: "win-16-18",
    windowEn: "4:00 PM – 6:00 PM",
    windowEs: "16:00 – 18:00",
    shortEn: "4 PM–6 PM",
    shortEs: "16–18",
  },
] as const;

export const DEFAULT_W04_DRAFT: W04CustomerDraft = {
  bookingId: "HX-DEMO-1027",
  customerName: "Sarah Mitchell",
  serviceType: "FURNITURE REMOVAL · 1 SOFA + 2 CHAIRS",
  pickupAreaEn: "Phoenix, AZ 85004 · demo",
  pickupAreaEs: "Phoenix, AZ 85004 · ejemplo",
  confirmedItemsEn: "1 sofa + 2 chairs",
  confirmedItemsEs: "1 sofá + 2 sillas",
  illustrativeSubtotal: "$356.00",
  conditionalCancellationFee: "$100.00",
  timingMode: null,
  selectedDateId: "date-nov-03",
  selectedWindowId: "win-10-12",
  termsConsentAccepted: false,
};

// In-memory persistent draft store for active user session
let currentDraft: W04CustomerDraft = { ...DEFAULT_W04_DRAFT };
const listeners = new Set<(draft: W04CustomerDraft) => void>();

export function getW04Draft(): W04CustomerDraft {
  return currentDraft;
}

export function updateW04Draft(updates: Partial<W04CustomerDraft>): W04CustomerDraft {
  currentDraft = { ...currentDraft, ...updates };
  listeners.forEach((listener) => {
    listener(currentDraft);
  });
  return currentDraft;
}

export function resetW04Draft(): void {
  currentDraft = { ...DEFAULT_W04_DRAFT };
  listeners.forEach((listener) => {
    listener(currentDraft);
  });
}

export function subscribeToW04Draft(listener: (draft: W04CustomerDraft) => void): () => void {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
}
