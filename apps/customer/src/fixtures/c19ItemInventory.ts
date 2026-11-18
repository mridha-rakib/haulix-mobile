/**
 * C19 Item Inventory — Fixture
 *
 * Authoritative Figma: Node 382:1248 (EN) & Node 980:9314 (ES)
 * Flow Context: W02 Service Discovery & Intake / C19
 */

export interface C19DeclaredItem {
  id: string;
  name: string;
  nameEs: string;
  countDimensions: string;
  countDimensionsEs: string;
  weight: string;
  weightEs: string;
  imageKey: "sofa" | "mattresses" | "table";
}

export interface C19InventoryData {
  title: string;
  titleEs: string;
  subtitle: string;
  subtitleEs: string;
  sectionItemsTitle: string;
  sectionItemsTitleEs: string;
  summaryTitle: string;
  summaryTitleEs: string;
  summaryCount: string;
  summaryCountEs: string;
  summaryDisclaimer1: string;
  summaryDisclaimer1Es: string;
  summaryDisclaimer2: string;
  summaryDisclaimer2Es: string;
  items: C19DeclaredItem[];
}

export const C19_DEFAULT_DATA: C19InventoryData = {
  title: "Check your item list",
  titleEs: "Revisa tu lista de objetos",
  subtitle: "Confirm manual descriptions before AI-assisted review and quote.",
  subtitleEs: "Confirma descripciones antes de la revisión y cotización con IA.",
  sectionItemsTitle: "Confirmed draft quantities",
  sectionItemsTitleEs: "Cantidades confirmadas del borrador",
  summaryTitle: "Summary",
  summaryTitleEs: "Resumen",
  summaryCount: "3 item types · 4 individual pieces",
  summaryCountEs: "3 tipos de objetos · 4 piezas",
  summaryDisclaimer1: "All dimensions and weights are customer estimates only.",
  summaryDisclaimer1Es: "Todas las dimensiones y pesos son estimaciones del cliente.",
  summaryDisclaimer2: "AI may suggest categories in W03; it cannot override confirmed corrections.",
  summaryDisclaimer2Es:
    "La IA puede sugerir categorías en W03, sin reemplazar correcciones confirmadas.",
  items: [
    {
      id: "sofa",
      name: "3-seat sofa",
      nameEs: "Sofá de tres plazas",
      countDimensions: "Qty 1 · 82 × 35 × 34 in",
      countDimensionsEs: "Cant. 1 · 82 × 35 × 34 pulg.",
      weight: "~125 lb",
      weightEs: "~125 lb",
      imageKey: "sofa",
    },
    {
      id: "mattresses",
      name: "Queen mattresses",
      nameEs: "Colchones tamaño queen",
      countDimensions: "Qty 2 · 80 × 60 × 11 in each",
      countDimensionsEs: "Cant. 2 · 80 × 60 × 11 pulg. c/u",
      weight: "~70 lb each",
      weightEs: "~70 lb cada uno",
      imageKey: "mattresses",
    },
    {
      id: "table",
      name: "Dining table",
      nameEs: "Mesa de comedor",
      countDimensions: "Qty 1 · 60 × 36 × 30 in",
      countDimensionsEs: "Cant. 1 · 60 × 36 × 30 pulg.",
      weight: "~85 lb",
      weightEs: "~85 lb",
      imageKey: "table",
    },
  ],
};

export const C19_DEMO_CONSTANTS = {
  stepIndicator: "W02 · SERVICE DISCOVERY & INTAKE",
  stepSub: "/ C19",
  stepIndicatorEs: "W02 · SERVICIOS Y RECEPCIÓN",
  stepSubEs: "/ C19",
  defaultBookingId: "HX-DEMO-1027",
  footerNotice1: "DEMO ONLY  ·  No confirmed booking, rates or payment",
  footerNotice1Es: "SOLO DEMO · Sin reserva, tarifa ni pago confirmado",
  footerNotice2: "SRS  BK-03, AI-02, AI-03, AI-04  ·  430 px / vertical scroll",
  footerNotice2Es: "SRS  BK-03, AI-02, AI-03, AI-04  ·  430 px / desplazamiento vertical",
} as const;

let currentInventory: C19InventoryData = JSON.parse(JSON.stringify(C19_DEFAULT_DATA));
type InventoryListener = (data: C19InventoryData) => void;
const listeners = new Set<InventoryListener>();

export function getDraftInventory(): C19InventoryData {
  return currentInventory;
}

export function updateDraftInventoryItem(id: string, updates: Partial<C19DeclaredItem>): void {
  currentInventory = {
    ...currentInventory,
    items: currentInventory.items.map((item) => (item.id === id ? { ...item, ...updates } : item)),
  };
  for (const listener of listeners) {
    listener(currentInventory);
  }
}

export function resetDraftInventory(): void {
  currentInventory = JSON.parse(JSON.stringify(C19_DEFAULT_DATA));
  for (const listener of listeners) {
    listener(currentInventory);
  }
}

export function subscribeToDraftInventory(listener: InventoryListener): () => void {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
}
