/**
 * HAULIX Customer Mobile App — Phase 03.23
 * C20-E Extra Access Help / Request Additional Handling Fixtures
 *
 * Authoritative Figma:
 *   - English: Node 382:1767 (430 × 1195 px)
 *   - Spanish: Node 980:9977 (430 × 1195 px)
 *
 * Scope: Optional labor / disassembly request draft.
 * NOTE: Does NOT approve disassembly labor, extra workers, pricing, or vehicle capacity.
 */

export interface C20EHandlingRequestItem {
  id: string;
  task: string;
  taskEs: string;
  location: string;
  locationEs: string;
  access: string;
  accessEs: string;
  scopeStatus: string;
  scopeStatusEs: string;
}

export interface C20EHandlingData {
  exampleRequest: C20EHandlingRequestItem;
  isRequested: boolean;
  isDeclined: boolean;
  status: "unrequested" | "pending_quote" | "declined";
}

export const C20E_DEFAULT_DATA: C20EHandlingData = {
  exampleRequest: {
    id: "req-table-disassembly",
    task: "Disassemble and reassemble table",
    taskEs: "Desmontar y volver a montar la mesa",
    location: "Living room",
    locationEs: "Sala de estar",
    access: "Ground level; driveway accessible",
    accessEs: "Planta baja; entrada vehicular accesible",
    scopeStatus: "Customer request · Not priced or accepted",
    scopeStatusEs: "Solicitud del cliente · Sin precio ni aceptación",
  },
  isRequested: false,
  isDeclined: false,
  status: "unrequested",
};

let currentHandlingState: C20EHandlingData = { ...C20E_DEFAULT_DATA };
type HandlingListener = (data: C20EHandlingData) => void;
const listeners = new Set<HandlingListener>();

export function getHandlingRequestState(): C20EHandlingData {
  return currentHandlingState;
}

export function saveHandlingRequestDraft(): void {
  currentHandlingState = {
    ...currentHandlingState,
    isRequested: true,
    isDeclined: false,
    status: "pending_quote",
  };
  notifyListeners();
}

export function declineHandlingRequest(): void {
  currentHandlingState = {
    ...currentHandlingState,
    isRequested: false,
    isDeclined: true,
    status: "declined",
  };
  notifyListeners();
}

export function resetHandlingRequest(): void {
  currentHandlingState = { ...C20E_DEFAULT_DATA };
  notifyListeners();
}

export function subscribeToHandlingRequest(listener: HandlingListener): () => void {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
}

function notifyListeners(): void {
  for (const listener of listeners) {
    listener(currentHandlingState);
  }
}
