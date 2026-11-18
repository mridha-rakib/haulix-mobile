/**
 * C21 & C20-M Intake Review, Draft State & Moving Access Fixtures
 *
 * Authoritative Figma Nodes:
 * - C21: Node 382:1966 (EN) & Node 980:10268 (ES)
 * - C21-V: Node 382:2088 (EN) & Node 980:10409 (ES)
 * - C21-S: Node 382:2124 (EN) & Node 980:10461 (ES)
 * - C20-M: Node 392:180 (EN) & Node 980:10574 (ES)
 */

export interface C21MediaAttachment {
  id: string;
  nameKey: "mediaLabelSofa" | "mediaLabelMattresses" | "mediaLabelDining" | "mediaLabelBoxes";
  status: "attached" | "failed";
  imageKey: "sofa" | "mattresses" | "table" | "boxes";
}

export interface C21IntakeDraftState {
  isDraftSaved: boolean;
  savedTimestamp?: number;
  activeServiceId: string;
  activeBookingId: string;
  photoCount: number;
  hasUnknownWeightOrAccess: boolean;
  hasRestrictedItem: boolean;
  bothSafetyAcknowledged: boolean;
  mediaAttachments: C21MediaAttachment[];
}

export const C21_DEFAULT_ATTACHMENTS: C21MediaAttachment[] = [
  { id: "sofa", nameKey: "mediaLabelSofa", status: "attached", imageKey: "sofa" },
  { id: "mattresses", nameKey: "mediaLabelMattresses", status: "attached", imageKey: "mattresses" },
  { id: "table", nameKey: "mediaLabelDining", status: "attached", imageKey: "table" },
  { id: "boxes", nameKey: "mediaLabelBoxes", status: "attached", imageKey: "boxes" },
];

let draftState: C21IntakeDraftState = {
  isDraftSaved: false,
  activeServiceId: "junk-removal",
  activeBookingId: "HX-DEMO-1027",
  photoCount: 4,
  hasUnknownWeightOrAccess: false,
  hasRestrictedItem: false,
  bothSafetyAcknowledged: true,
  mediaAttachments: [...C21_DEFAULT_ATTACHMENTS],
};

type DraftListener = (state: C21IntakeDraftState) => void;
const draftListeners = new Set<DraftListener>();

export function getIntakeDraftState(): C21IntakeDraftState {
  return draftState;
}

export function saveIntakeDraft(): void {
  draftState = {
    ...draftState,
    isDraftSaved: true,
    savedTimestamp: Date.now(),
  };
  for (const listener of draftListeners) {
    listener(draftState);
  }
}

export function updateIntakeDraft(updates: Partial<C21IntakeDraftState>): void {
  draftState = {
    ...draftState,
    ...updates,
  };
  for (const listener of draftListeners) {
    listener(draftState);
  }
}

export function resetIntakeDraft(): void {
  draftState = {
    isDraftSaved: false,
    activeServiceId: "junk-removal",
    activeBookingId: "HX-DEMO-1027",
    photoCount: 4,
    hasUnknownWeightOrAccess: false,
    hasRestrictedItem: false,
    bothSafetyAcknowledged: true,
    mediaAttachments: [...C21_DEFAULT_ATTACHMENTS],
  };
  for (const listener of draftListeners) {
    listener(draftState);
  }
}

export function subscribeToIntakeDraft(listener: DraftListener): () => void {
  draftListeners.add(listener);
  return () => {
    draftListeners.delete(listener);
  };
}

export interface C20MMovingAccessData {
  customer: string;
  customerEs: string;
  pickup: string;
  dropoff: string;
  scope: string;
  scopeEs: string;
  largeItems: string;
  largeItemsEs: string;
  weight: string;
  weightEs: string;
  pickupStairs: string;
  pickupStairsEs: string;
  dropoffStairs: string;
  dropoffStairsEs: string;
  parkingNotes: string;
  parkingNotesEs: string;
}

export const C20M_DEFAULT_DATA: C20MMovingAccessData = {
  customer: "Daniel Ruiz · fictional",
  customerEs: "Daniel Ruiz · ficticio",
  pickup: "2140 E Sample Road, Phoenix, AZ 85016",
  dropoff: "5678 N Demo Avenue, Phoenix, AZ 85012",
  scope: "Household moving · 1-bedroom apartment",
  scopeEs: "Mudanza de vivienda · Apartamento de 1 dormitorio",
  largeItems: "2-seat couch ×1; dresser ×1; 12 moving boxes",
  largeItemsEs: "Sofá de 2 plazas ×1; tocador ×1; 12 cajas de mudanza",
  weight: "Customer estimate ~550 lb total",
  weightEs: "Estimación del cliente ~550 lb en total",
  pickupStairs: "Ground floor · apartment pickup",
  pickupStairsEs: "Planta baja · recogida en apartamento",
  dropoffStairs: "1 flight · no elevator",
  dropoffStairsEs: "1 tramo · sin ascensor",
  parkingNotes: "Driveway available · no packing requested",
  parkingNotesEs: "Entrada para autos disponible · sin embalaje solicitado",
};
