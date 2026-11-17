import fs from "node:fs";
import path from "node:path";
import { enTranslations as en, esTranslations as es } from "@haulix/i18n";
import { getC10DemoProfile, resetProfileEdits } from "../fixtures/c10DemoProfile";
import { C18R_DEFAULT_DATA, C18R_DEMO_CONSTANTS } from "../fixtures/c18rRetailIntake";

describe("C18-R Retail Store Pickup — English (Node 382:1115) & Spanish (Node 977:9474)", () => {
  const c18rRoutePath = path.resolve(__dirname, "../../app/(app)/retail-intake.tsx");
  const c18IconsPath = path.resolve(__dirname, "../components/discovery/C18BatchIcons.tsx");
  const demoNavigatorPath = path.resolve(__dirname, "../components/demo/DemoScreenNavigator.tsx");

  afterEach(async () => {
    await resetProfileEdits("en");
    await resetProfileEdits("es");
  });

  it("1. verifies exact English copy from Figma Node 382:1115", () => {
    expect(en.c18r.stepIndicator).toBe("W02 · SERVICE DISCOVERY & INTAKE");
    expect(en.c18r.stepSub).toBe("  /  C18-R");
    expect(en.c18r.title).toBe("Retail store pickup");
    expect(en.c18r.subtitle).toBe("Authorize order collection from retail partner or store.");
    expect(en.c18r.customerContext).toBe("{{name}} · {{bookingId}}");
    expect(en.c18r.retailerCardTitle).toBe("Store & order authorization");
    expect(en.c18r.labelStore).toBe("Retail store");
    expect(en.c18r.storeValue).toBe("Home Depot · Phoenix");
    expect(en.c18r.labelStoreAddress).toBe("Store address");
    expect(en.c18r.storeAddressValue).toBe("1800 E Demo Way, Phoenix, AZ 85016");
    expect(en.c18r.labelOrderNumber).toBe("Order identifier");
    expect(en.c18r.orderNumberValue).toBe("HD-DEMO-58321 · fictional");
    expect(en.c18r.labelAuthorizedCollector).toBe("Pickup contact");
    expect(en.c18r.authorizedCollectorValue).toBe("Order holder or authorized collector");
    expect(en.c18r.labelStatus).toBe("Order status");
    expect(en.c18r.statusValue).toBe("Customer says ready · store has not verified");
    expect(en.c18r.deliveryCardTitle).toBe("Delivery & item specifications");
    expect(en.c18r.labelDropoff).toBe("Drop-off destination");
    expect(en.c18r.dropoffValue).toBe("5678 N Demo Avenue, Phoenix, AZ 85012");
    expect(en.c18r.labelExpectedItems).toBe("Expected items");
    expect(en.c18r.expectedItemsValue).toBe("Flat-pack shelving ×2 · boxed furniture ×1");
    expect(en.c18r.labelEstimatedLoad).toBe("Estimated load");
    expect(en.c18r.estimatedLoadValue).toBe("Customer estimate; confirm packaging and weight");
    expect(en.c18r.labelNotes).toBe("Collection notes");
    expect(en.c18r.notesValue).toBe("Bring order identifier and authorized pickup details");
    expect(en.c18r.apiCardTitle).toBe("Direct Retailer Integration");
    expect(en.c18r.reviewBadge).toBe("Review required");
    expect(en.c18r.apiNotice).toBe("Direct retailer API integration is not active in demo mode.");
    expect(en.c18r.continueCta).toBe("Review retail pickup intake");
    expect(en.c18r.missingOrderCta).toBe("Try missing-order validation   ›");
    expect(en.c18r.footerDemo).toBe("DEMO ONLY  ·  No confirmed booking, rates or payment");
    expect(en.c18r.footerSrs).toBe("SRS  BK-01, BK-02, SV-14  ·  430 px / vertical scroll");
  });

  it("2. verifies exact Spanish copy from Figma Node 977:9474", () => {
    expect(es.c18r.stepIndicator).toBe("W02 · SERVICIOS Y RECEPCIÓN");
    expect(es.c18r.stepSub).toBe("  /  C18-R");
    expect(es.c18r.title).toBe("Recogida de compra en tienda");
    expect(es.c18r.subtitle).toBe(
      "Autorice la recogida de su pedido en tienda o comercio colaborador."
    );
    expect(es.c18r.customerContext).toBe("{{name}} · {{bookingId}}");
    expect(es.c18r.retailerCardTitle).toBe("Tienda y autorización del pedido");
    expect(es.c18r.labelStore).toBe("Tienda comercial");
    expect(es.c18r.storeValue).toBe("Home Depot · Phoenix");
    expect(es.c18r.labelStoreAddress).toBe("Dirección de tienda");
    expect(es.c18r.storeAddressValue).toBe("1800 E Demo Way, Phoenix, AZ 85016");
    expect(es.c18r.labelOrderNumber).toBe("Identificador del pedido");
    expect(es.c18r.orderNumberValue).toBe("HD-DEMO-58321 · ficticio");
    expect(es.c18r.labelAuthorizedCollector).toBe("Contacto de recogida");
    expect(es.c18r.authorizedCollectorValue).toBe("Titular del pedido o recolector autorizado");
    expect(es.c18r.labelStatus).toBe("Estado del pedido");
    expect(es.c18r.statusValue).toBe(
      "El cliente dice que está listo · la tienda no lo ha verificado"
    );
    expect(es.c18r.deliveryCardTitle).toBe("Entrega y especificaciones de objetos");
    expect(es.c18r.labelDropoff).toBe("Destino de entrega");
    expect(es.c18r.dropoffValue).toBe("5678 N Demo Avenue, Phoenix, AZ 85012");
    expect(es.c18r.labelExpectedItems).toBe("Objetos esperados");
    expect(es.c18r.expectedItemsValue).toBe("Estanterías en paquete plano ×2 · mueble en caja ×1");
    expect(es.c18r.labelEstimatedLoad).toBe("Carga estimada");
    expect(es.c18r.estimatedLoadValue).toBe("Estimación del cliente; confirmar embalaje y peso");
    expect(es.c18r.labelNotes).toBe("Notas de recogida");
    expect(es.c18r.notesValue).toBe(
      "Llevar identificador de pedido y datos de recogida autorizada"
    );
    expect(es.c18r.apiCardTitle).toBe("Integración Directa con Tiendas");
    expect(es.c18r.reviewBadge).toBe("Revisión necesaria");
    expect(es.c18r.apiNotice).toBe(
      "La integración directa con la API de la tienda no está activa en modo demo."
    );
    expect(es.c18r.continueCta).toBe("Revisar recogida en tienda");
    expect(es.c18r.missingOrderCta).toBe("Probar validación de pedido faltante   ›");
    expect(es.c18r.footerDemo).toBe("SOLO DEMO · Sin reserva confirmada, tarifas ni pago");
    expect(es.c18r.footerSrs).toBe("SRS  BK-01, BK-02, SV-14  ·  430 px / desplazamiento vertical");
  });

  it("3. verifies retail storefront icon and disclaimers", () => {
    const iconsSource = fs.readFileSync(c18IconsPath, "utf8");
    expect(iconsSource).toContain("C18RetailIcon");
    expect(iconsSource).toContain("C18HazardShieldIcon");
  });

  it("4. verifies demo screen navigator registration", () => {
    const navSource = fs.readFileSync(demoNavigatorPath, "utf8");
    expect(navSource).toContain('id: "c18r-en"');
    expect(navSource).toContain('id: "c18r-es"');
    expect(navSource).toContain('route: "/retail-intake"');
  });
});
