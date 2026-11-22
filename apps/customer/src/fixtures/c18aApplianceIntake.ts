/**
 * C18-A Appliance Removal Intake — Fixture
 *
 * Authoritative Figma: Node 387:177 (EN) & Node 977:9572 (ES)
 * Flow Context: W02 Service Discovery & Intake / C18-A
 */

export interface C18ATier {
  id: string;
  title: string;
  titleEs: string;
  subtitle: string;
  subtitleEs: string;
  badge?: string;
  badgeEs?: string;
  isSelected?: boolean;
}

export interface C18AIntakeData {
  serviceName: string;
  serviceNameEs: string;
  serviceSubtitle: string;
  serviceSubtitleEs: string;
  itemTitle: string;
  itemTitleEs: string;
  itemQuantity: string;
  itemQuantityEs: string;
  itemSize: string;
  itemSizeEs: string;
  itemWeight: string;
  itemWeightEs: string;
  itemAccess: string;
  itemAccessEs: string;
  handlingTitle: string;
  handlingTitleEs: string;
  handlingNotice1: string;
  handlingNotice1Es: string;
  handlingNotice2: string;
  handlingNotice2Es: string;
  tiers: C18ATier[];
}

export const C18A_DEFAULT_DATA: C18AIntakeData = {
  serviceName: "Appliance removal details",
  serviceNameEs: "Detalles del retiro de electrodomésticos",
  serviceSubtitle: "Document appliance dimensions, disconnect requirements and safe handling.",
  serviceSubtitleEs: "Indica dimensiones, desconexión y manejo seguro del aparato.",
  itemTitle: "Front-load washing machine",
  itemTitleEs: "Lavadora de carga frontal",
  itemQuantity: "1",
  itemQuantityEs: "1",
  itemSize: "27 × 29 × 39 in",
  itemSizeEs: "27 × 29 × 39 in",
  itemWeight: "~170 lb · customer estimate",
  itemWeightEs: "~170 lb · Estimación del cliente",
  itemAccess: "Ground floor · utility connections need review",
  itemAccessEs: "Planta baja · Revisar conexiones",
  handlingTitle: "Additional handling check",
  handlingTitleEs: "Control de manejo adicional",
  handlingNotice1:
    "Appliance disconnection, capacity and approved disposal restrictions require checking.",
  handlingNotice1Es: "Se deben revisar desconexión, capacidad y eliminación aprobada.",
  handlingNotice2: "No electrical or water disconnection is automatically included.",
  handlingNotice2Es: "La desconexión eléctrica o de agua no está incluida.",
  tiers: [
    {
      id: "appliance-removal",
      title: "Appliance Removal",
      titleEs: "Retiro de electrodomésticos",
      subtitle: "Appliance type and safe disconnect details",
      subtitleEs: "Tipo de aparato y desconexión segura",
      isSelected: true,
    },
    {
      id: "furniture-pickup",
      title: "Furniture Pickup",
      titleEs: "Retiro de muebles",
      subtitle: "Sofas, tables and bulky furniture",
      subtitleEs: "Sofás, mesas y muebles voluminosos",
    },
    {
      id: "mattress-removal",
      title: "Mattress Removal",
      titleEs: "Retiro de colchones",
      subtitle: "Size, quantity and local disposal eligibility",
      subtitleEs: "Tamaño, cantidad y eliminación local permitida",
    },
    {
      id: "assembly-help",
      title: "Assembly / Disassembly add-on",
      titleEs: "Extra de montaje / desmontaje",
      subtitle: "Optional labor · not standalone booking",
      subtitleEs: "Mano de obra opcional · No es reserva independiente",
      badge: "Add-on",
      badgeEs: "Opcional",
    },
  ],
};

export const C18A_DEMO_CONSTANTS = {
  stepIndicator: "W02 · SERVICE DISCOVERY & INTAKE",
  stepSub: "/ C18-A",
  stepIndicatorEs: "W02 · SERVICIOS Y RECEPCIÓN",
  stepSubEs: "/ C18-A",
  defaultBookingId: "HX-DEMO-1027",
  defaultAddress: "2140 E Sample Road, Phoenix, AZ 85016",
  footerNotice1: "DEMO ONLY  ·  No confirmed booking, rates or payment",
  footerNotice1Es: "SOLO DEMO · Sin reserva, tarifa ni pago confirmado",
  footerNotice2: "SRS  BK-01, BK-03, SV-02, SV-04, SV-14  ·  430 px / vertical scroll",
  footerNotice2Es: "SRS  BK-01, BK-03, SV-02, SV-04, SV-14  ·  430 px / desplazamiento vertical",
} as const;
