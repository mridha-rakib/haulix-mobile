/**
 * HAULIX Customer Mobile App — Phase 03.23
 * C20-X Restricted Material Review Fixtures
 *
 * Authoritative Figma:
 *   - English: Node 382:1911 (430 × 1180 px)
 *   - Spanish: Node 980:10197 (430 × 1180 px)
 *
 * Scope: Restricted or prohibited materials requiring clarification or refusal.
 * Garage Cleanout illustrative flagged item fixture isolation.
 */

export interface C20XFlaggedItem {
  id: string;
  description: string;
  descriptionEs: string;
  material: string;
  materialEs: string;
  photo: string;
  photoEs: string;
  service: string;
  serviceEs: string;
}

export const C20X_DEFAULT_FLAGGED_ITEM: C20XFlaggedItem = {
  id: "flagged-containers-garage",
  description: "Unlabeled containers in garage",
  descriptionEs: "Recipientes sin etiqueta en el garaje",
  material: "Unknown · Customer clarification required",
  materialEs: "Desconocido · Se requiere aclaración del cliente",
  photo: "Not yet supplied",
  photoEs: "Aún no proporcionado",
  service: "Garage Cleanout",
  serviceEs: "Limpieza de garaje",
};

let currentFlaggedItem: C20XFlaggedItem | null = { ...C20X_DEFAULT_FLAGGED_ITEM };
type FlaggedListener = (item: C20XFlaggedItem | null) => void;
const listeners = new Set<FlaggedListener>();

export function getFlaggedItem(): C20XFlaggedItem | null {
  return currentFlaggedItem;
}

export function removeFlaggedItemFromDraft(): void {
  currentFlaggedItem = null;
  notifyListeners();
}

export function resetFlaggedItem(): void {
  currentFlaggedItem = { ...C20X_DEFAULT_FLAGGED_ITEM };
  notifyListeners();
}

export function subscribeToFlaggedItem(listener: FlaggedListener): () => void {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
}

function notifyListeners(): void {
  for (const listener of listeners) {
    listener(currentFlaggedItem);
  }
}
