import fs from "node:fs";
import path from "node:path";
import { colors } from "@haulix/design-tokens";
import { enTranslations as en, esTranslations as es } from "@haulix/i18n";
import { getC10DemoProfile } from "../fixtures/c10DemoProfile";
import { C15_SERVICES, type C15ServiceId } from "../fixtures/c15Services";

describe("C15 Service Discovery — Bilingual Implementation (Figma 382:126 & 974:8843)", () => {
  const serviceDiscoveryRoutePath = path.resolve(
    __dirname,
    "../../app/(app)/service-discovery.tsx"
  );
  const homeRoutePath = path.resolve(__dirname, "../../app/(app)/index.tsx");
  const bottomNavPath = path.resolve(__dirname, "../components/navigation/CustomerBottomNav.tsx");
  const c15IconsPath = path.resolve(__dirname, "../components/discovery/C15Icons.tsx");
  const demoNavigatorPath = path.resolve(__dirname, "../components/demo/DemoScreenNavigator.tsx");
  const originalSvgDir = path.resolve(__dirname, "../../assets/c15/original-svg");

  it("verifies C15 Service Discovery route exists and strictly omits CustomerBottomNav", () => {
    expect(fs.existsSync(serviceDiscoveryRoutePath)).toBe(true);

    const source = fs.readFileSync(serviceDiscoveryRoutePath, "utf8");
    expect(source).toContain("export default function ServiceDiscoveryScreen");
    expect(source).toContain("useTranslation");
    expect(source).toContain("HaulixSafeArea");
    expect(source).toContain("FlowHeaderStart");
    // Strictly NO bottom navbar on C15
    expect(source).not.toContain("<CustomerBottomNav");
    expect(source).not.toContain("activeTab=");
  });

  it("verifies the 7 approved services are defined in exact Figma order without Assembly Add-on", () => {
    const expectedIds: C15ServiceId[] = [
      "junk-removal",
      "moving",
      "furniture-pickup",
      "appliance-removal",
      "mattress-removal",
      "garage-cleanout",
      "store-pickup",
    ];

    expect(C15_SERVICES).toHaveLength(7);
    expectedIds.forEach((expectedId, idx) => {
      expect(C15_SERVICES[idx].id).toBe(expectedId);
    });

    // Assembly Add-on is strictly omitted from C15
    expect(C15_SERVICES.some((s) => s.id === ("assembly-addon" as never))).toBe(false);
  });

  it("verifies all 10 original Figma SVGs exist in assets folder", () => {
    const expectedSvgFiles = [
      "context_check_17.svg",
      "service_appliance_25.svg",
      "service_chevron_17.svg",
      "service_furniture_25.svg",
      "service_garage_25.svg",
      "service_info_check_18.svg",
      "service_junk_removal_25.svg",
      "service_mattress_25.svg",
      "service_moving_25.svg",
      "service_store_25.svg",
    ];

    expectedSvgFiles.forEach((filename) => {
      const fullPath = path.join(originalSvgDir, filename);
      expect(fs.existsSync(fullPath)).toBe(true);
      const content = fs.readFileSync(fullPath, "utf8");
      expect(content).toContain("<svg");
      expect(content).toContain("</svg>");
    });
  });

  it("verifies C15Icons exports all 10 typed SVG components", () => {
    expect(fs.existsSync(c15IconsPath)).toBe(true);
    const source = fs.readFileSync(c15IconsPath, "utf8");

    const expectedExports = [
      "ContextCheckIcon",
      "ServiceInfoCheckIcon",
      "ServiceChevronIcon",
      "ServiceJunkRemovalIcon",
      "ServiceMovingIcon",
      "ServiceFurnitureIcon",
      "ServiceApplianceIcon",
      "ServiceMattressIcon",
      "ServiceGarageIcon",
      "ServiceStoreIcon",
    ];

    expectedExports.forEach((exp) => {
      expect(source).toContain(`export function ${exp}`);
    });
  });

  it("verifies authoritative C15 English strings match Figma node 382:126", () => {
    expect(en.c15.stepIndicator).toBe("W02 · SERVICE DISCOVERY & INTAKE");
    expect(en.c15.stepSub).toBe("/ C15");
    expect(en.c15.title).toBe("What can we help with?");
    expect(en.c15.subtitle).toBe("Choose the approved service that matches your task.");
    expect(en.c15.serviceAreaTitle).toBe("Service area");
    expect(en.c15.serviceAreaRegion).toBe("Phoenix, Arizona · Initial service region");
    expect(en.c15.serviceAreaNote).toBe(
      "Eligible Arizona service area checked again before booking."
    );
    expect(en.c15.availableServicesTitle).toBe("Available services");
    expect(en.c15.serviceJunkRemoval).toBe("Junk Removal");
    expect(en.c15.serviceMoving).toBe("Moving");
    expect(en.c15.serviceFurniturePickup).toBe("Furniture Pickup");
    expect(en.c15.serviceApplianceRemoval).toBe("Appliance Removal");
    expect(en.c15.serviceMattressRemoval).toBe("Mattress Removal");
    expect(en.c15.serviceGarageCleanout).toBe("Garage Cleanout");
    expect(en.c15.serviceStorePickup).toBe("Store Pickup");
    expect(en.c15.customerInfoTitle).toBe("For {{name}}");
    expect(en.c15.serviceInfo).toBe("Service information");
    expect(en.c15.draftBooking).toBe("Draft booking {{bookingId}} · {{service}}");
    expect(en.c15.noQuoteNote).toBe("No quote or appointment has been confirmed yet.");
    expect(en.c15.selectServiceCta).toBe("Select {{service}}");
    expect(en.c15.checkServiceArea).toBe("Check Service Area ›");
    expect(en.c15.viewLocationRestrictions).toBe("View location restrictions ›");
    expect(en.c15.serviceNotListed).toBe("Service not listed? Check options ›");
    expect(en.c15.footerNoticeDemo).toBe("DEMO ONLY · No confirmed booking, rates or payment");
    expect(en.c15.footerNoticeSrs).toBe("SRS BK-01, SV-01, AI-12 · 430 px / vertical scroll");
  });

  it("verifies authoritative C15 Spanish strings match Figma node 974:8843 and C15_ES_TRANSLATIONS.csv", () => {
    expect(es.c15.stepIndicator).toBe("W02 · SERVICIOS Y SOLICITUD");
    expect(es.c15.stepSub).toBe("/ C15");
    expect(es.c15.title).toBe("¿En qué podemos ayudarte?");
    expect(es.c15.subtitle).toBe("Elige el servicio autorizado que necesitas.");
    expect(es.c15.serviceAreaTitle).toBe("Zona de servicio");
    expect(es.c15.serviceAreaRegion).toBe("Phoenix, Arizona · Zona inicial");
    expect(es.c15.serviceAreaNote).toBe("La cobertura en Arizona se valida antes de reservar");
    expect(es.c15.availableServicesTitle).toBe("Servicios disponibles");
    expect(es.c15.serviceJunkRemoval).toBe("Retiro de objetos");
    expect(es.c15.subtitleJunkRemoval).toBe("Retiro y eliminación de residuos no peligrosos");
    expect(es.c15.serviceMoving).toBe("Mudanzas");
    expect(es.c15.subtitleMoving).toBe("Transporte del origen al destino");
    expect(es.c15.serviceFurniturePickup).toBe("Retiro de muebles");
    expect(es.c15.subtitleFurniturePickup).toBe("Sofás, mesas y otros muebles");
    expect(es.c15.serviceApplianceRemoval).toBe("Retiro de electrodomésticos");
    expect(es.c15.subtitleApplianceRemoval).toBe("Retiro autorizado de electrodomésticos");
    expect(es.c15.serviceMattressRemoval).toBe("Retiro de colchones");
    expect(es.c15.subtitleMattressRemoval).toBe("Revisión de manejo y eliminación de colchones");
    expect(es.c15.serviceGarageCleanout).toBe("Limpieza de garaje");
    expect(es.c15.subtitleGarageCleanout).toBe("Fotos, acceso y revisión de contaminación");
    expect(es.c15.serviceStorePickup).toBe("Recogida en tienda");
    expect(es.c15.subtitleStorePickup).toBe("Recogida y entrega de pedidos");
    expect(es.c15.customerInfoTitle).toBe("Para {{name}}");
    expect(es.c15.serviceInfo).toBe("Información del servicio");
    expect(es.c15.draftBooking).toBe("Solicitud {{bookingId}} · {{service}}");
    expect(es.c15.noQuoteNote).toBe("Aún no hay cotización ni cita confirmada.");
    expect(es.c15.selectServiceCta).toBe("Elegir {{service}}");
    expect(es.c15.checkServiceArea).toBe("Verificar zona de servicio ›");
    expect(es.c15.viewLocationRestrictions).toBe("Ver restricciones de ubicación ›");
    expect(es.c15.serviceNotListed).toBe("¿No ves tu servicio? Ver opciones ›");
    expect(es.c15.footerNoticeDemo).toBe("SOLO DEMO · Sin reserva, tarifa ni pago confirmado");
    expect(es.c15.footerNoticeSrs).toBe(
      "SRS BK-01, SV-01, AI-12 · 430 px / desplazamiento vertical"
    );
  });

  it("verifies locale-scoped demo profile isolation: English Sarah Mitchell vs Spanish Bryan Lopez", () => {
    const enProfile = getC10DemoProfile("en");
    const esProfile = getC10DemoProfile("es");

    expect(enProfile.name).toBe("Sarah Mitchell");
    expect(esProfile.name).toBe("Bryan Lopez");
    expect(enProfile.name).not.toBe(esProfile.name);
  });

  it("verifies C01 Home routes to C15 in both English and Spanish", () => {
    const homeSource = fs.readFileSync(homeRoutePath, "utf8");
    const bottomNavSource = fs.readFileSync(bottomNavPath, "utf8");

    // Routes to /service-discovery
    expect(homeSource).toContain("/service-discovery");
    expect(bottomNavSource).toContain("/service-discovery");

    // Passes stable service ID
    expect(homeSource).toContain("params: { service: svc.id }");

    // Preserves disabled state for Assembly Add-on
    expect(homeSource).toContain("svc.isDisabled");
  });

  it("verifies DemoScreenNavigator contains both c15-en and c15-es entries", () => {
    const navSource = fs.readFileSync(demoNavigatorPath, "utf8");
    expect(navSource).toContain('id: "c15-en"');
    expect(navSource).toContain('name: "C15 · Service Discovery (English)"');
    expect(navSource).toContain('id: "c15-es"');
    expect(navSource).toContain('name: "C15 · Seleccionar Servicio (Español)"');
    expect(navSource).toContain('figmaNode: "Node 974:8843"');
    expect(navSource).toContain('locale: "es"');
  });

  it("verifies design tokens use authoritative HAULIX lime and dark background", () => {
    expect(colors.brand).toBe("#BAFF42");
    expect(colors.background).toBe("#080B0B");
    expect(colors.primaryText).toBe("#F6F8F6");
    expect(colors.secondaryText).toBe("#ADB7B1");
  });
});
