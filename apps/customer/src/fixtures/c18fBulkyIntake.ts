/**
 * C18-F Furniture / Bulky-item Handling — Data & Constants Fixture
 *
 * Authoritative Figma: Node 382:959 (EN) & Node 977:9286 (ES)
 * Flow Context: W02 Service Discovery & Intake / C18-F
 */

export interface C18FTier {
  id: string;
  title: string;
  titleEs: string;
  subtitle: string;
  subtitleEs: string;
  badge?: string;
  badgeEs?: string;
  isSelected?: boolean;
}

export interface C18FIntakeData {
  serviceName: string;
  serviceNameEs: string;
  serviceSubtitle: string;
  serviceSubtitleEs: string;
  itemTitle: string;
  itemTitleEs: string;
  itemSpecs: string;
  itemSpecsEs: string;
  itemAccess: string;
  itemAccessEs: string;
  handlingNote: string;
  handlingNoteEs: string;
  tiers: C18FTier[];
}

export const C18F_DEFAULT_DATA: C18FIntakeData = {
  serviceName: "Furniture & Bulky Items",
  serviceNameEs: "Muebles y objetos pesados",
  serviceSubtitle: "Select handling tier and review inventory specifications.",
  serviceSubtitleEs: "Seleccione el nivel de manipulación y revise las especificaciones.",
  itemTitle: "3-seat fabric sofa",
  itemTitleEs: "Sofá de tela de tres plazas",
  itemSpecs: "1 item · ~82 × 35 × 34 in · ~125 lb",
  itemSpecsEs: "1 objeto · ~82 × 35 × 34 in · ~125 lb",
  itemAccess: "Ground-floor pickup · driveway",
  itemAccessEs: "Recogida en planta baja · entrada para autos",
  handlingNote: "Professional two-person lift required for stairs or tight doorways.",
  handlingNoteEs:
    "Se requiere elevación profesional de dos personas para escaleras o puertas estrechas.",
  tiers: [
    {
      id: "furniture-pickup",
      title: "Furniture Pickup",
      titleEs: "Retiro de muebles",
      subtitle: "Sofas, tables and common household pieces",
      subtitleEs: "Sofás, mesas y piezas habituales del hogar",
      isSelected: true,
    },
    {
      id: "appliance-removal",
      title: "Appliance Removal",
      titleEs: "Retiro de electrodomésticos",
      subtitle: "Washers, dryers, refrigerators (C18-A)",
      subtitleEs: "Lavadoras, secadoras, frigoríficos (C18-A)",
    },
    {
      id: "mattress-removal",
      title: "Mattress Removal",
      titleEs: "Retiro de colchones",
      subtitle: "Standard and oversized mattresses (C18-T)",
      subtitleEs: "Colchones estándar y de gran tamaño (C18-T)",
    },
    {
      id: "assembly-help",
      title: "Assembly Help",
      titleEs: "Extra de montaje / desmontaje",
      subtitle: "Disassembly and assembly assistance",
      subtitleEs: "Asistencia de desmontaje y montaje",
      badge: "Add-on",
      badgeEs: "Opcional",
    },
  ],
};

export const C18F_DEMO_CONSTANTS = {
  stepIndicator: "W02 · SERVICE DISCOVERY & INTAKE",
  stepSub: "/ C18-F",
  stepIndicatorEs: "W02 · SERVICIOS Y RECEPCIÓN",
  stepSubEs: "/ C18-F",
  defaultBookingId: "HX-DEMO-1027",
  defaultAddress: "2140 E Sample Road, Phoenix, AZ 85016",
  footerNotice1: "DEMO ONLY · No confirmed booking, rates or payment",
  footerNotice1Es: "SOLO DEMO · Sin reserva confirmada, tarifas ni pago",
  footerNotice2: "SRS BK-01, BK-02, SV-14 · 430 px / vertical scroll",
  footerNotice2Es: "SRS BK-01, BK-02, SV-14 · 430 px / desplazamiento vertical",
} as const;
