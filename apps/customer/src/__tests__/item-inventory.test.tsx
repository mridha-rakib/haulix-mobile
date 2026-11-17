import fs from "node:fs";
import path from "node:path";
import { enTranslations as en, esTranslations as es } from "@haulix/i18n";
import { getC10DemoProfile, resetProfileEdits } from "../fixtures/c10DemoProfile";
import { C19_DEFAULT_DATA } from "../fixtures/c19ItemInventory";

describe("C19 Item Inventory — English (Node 382:1248) & Spanish (Node 980:9314)", () => {
  const c19RoutePath = path.resolve(__dirname, "../../app/(app)/item-inventory.tsx");
  const c18IconsPath = path.resolve(__dirname, "../components/discovery/C18BatchIcons.tsx");
  const demoNavigatorPath = path.resolve(__dirname, "../components/demo/DemoScreenNavigator.tsx");

  afterEach(async () => {
    await resetProfileEdits("en");
    await resetProfileEdits("es");
  });

  it("1. verifies exact English copy from Figma Node 382:1248", () => {
    expect(en.c19.stepIndicator).toBe("W02 · SERVICE DISCOVERY & INTAKE");
    expect(en.c19.stepSub).toBe("  /  C19");
    expect(en.c19.title).toBe("Check your item list");
    expect(en.c19.subtitle).toBe(
      "Confirm manual descriptions before AI-assisted review and quote."
    );
    expect(en.c19.customerContext).toBe("{{name}} · {{bookingId}}");
    expect(en.c19.sectionItemsTitle).toBe("Confirmed draft quantities");
    expect(en.c19.summaryTitle).toBe("Summary");
    expect(en.c19.summaryCount).toBe("3 item types · 4 individual pieces");
    expect(en.c19.summaryDisclaimer1).toBe(
      "All dimensions and weights are customer estimates only."
    );
    expect(en.c19.summaryDisclaimer2).toBe(
      "AI may suggest categories in W03; it cannot override confirmed corrections."
    );
    expect(en.c19.continueCta).toBe("Continue to item photos");
    expect(en.c19.correctMeasurementsCta).toBe("Correct item measurements   ›");
    expect(en.c19.addAnotherItemCta).toBe("Add another item   ›");
    expect(en.c19.incompleteExampleCta).toBe("Incomplete measurement example   ›");
    expect(en.c19.footerDemo).toBe("DEMO ONLY  ·  No confirmed booking, rates or payment");
    expect(en.c19.footerSrs).toBe("SRS  BK-03, AI-02, AI-03, AI-04  ·  430 px / vertical scroll");
  });

  it("2. verifies exact Spanish copy from Figma Node 980:9314", () => {
    expect(es.c19.stepIndicator).toBe("W02 · SERVICIOS Y RECEPCIÓN");
    expect(es.c19.stepSub).toBe("  /  C19");
    expect(es.c19.title).toBe("Revisa tu lista de objetos");
    expect(es.c19.subtitle).toBe(
      "Confirma descripciones antes de la revisión y cotización con IA."
    );
    expect(es.c19.customerContext).toBe("{{name}} · {{bookingId}}");
    expect(es.c19.sectionItemsTitle).toBe("Cantidades confirmadas del borrador");
    expect(es.c19.summaryTitle).toBe("Resumen");
    expect(es.c19.summaryCount).toBe("3 tipos de objetos · 4 piezas");
    expect(es.c19.summaryDisclaimer1).toBe(
      "Todas las dimensiones y pesos son estimaciones del cliente."
    );
    expect(es.c19.summaryDisclaimer2).toBe(
      "La IA puede sugerir categorías en W03, sin reemplazar correcciones confirmadas."
    );
    expect(es.c19.continueCta).toBe("Continuar a fotos de objetos");
    expect(es.c19.correctMeasurementsCta).toBe("Corregir medidas del objeto   ›");
    expect(es.c19.addAnotherItemCta).toBe("Añadir otro objeto   ›");
    expect(es.c19.incompleteExampleCta).toBe("Ejemplo de medidas incompletas   ›");
    expect(es.c19.footerDemo).toBe("SOLO DEMO · Sin reserva, tarifa ni pago confirmado");
    expect(es.c19.footerSrs).toBe(
      "SRS  BK-03, AI-02, AI-03, AI-04  ·  430 px / desplazamiento vertical"
    );
  });

  it("3. verifies genuine image assets and item specifications", () => {
    expect(C19_DEFAULT_DATA.items).toHaveLength(3);
    expect(C19_DEFAULT_DATA.items[0].id).toBe("sofa");
    expect(C19_DEFAULT_DATA.items[1].id).toBe("mattresses");
    expect(C19_DEFAULT_DATA.items[2].id).toBe("table");

    const routeSource = fs.readFileSync(c19RoutePath, "utf8");
    expect(routeSource).toContain("c18j-sofa.png");
    expect(routeSource).toContain("c18j-mattresses.png");
    expect(routeSource).toContain("c18j-table.png");

    const iconsSource = fs.readFileSync(c18IconsPath, "utf8");
    expect(iconsSource).toContain("C18CheckIcon");
  });

  it("4. verifies demo screen navigator registration for English and Spanish", () => {
    const navSource = fs.readFileSync(demoNavigatorPath, "utf8");
    expect(navSource).toContain('id: "c19-en"');
    expect(navSource).toContain('id: "c19-es"');
    expect(navSource).toContain('route: "/item-inventory"');
  });

  it("5. verifies route file structure and dynamic profile isolation", () => {
    const routeSource = fs.readFileSync(c19RoutePath, "utf8");
    expect(routeSource).toContain("useCustomerProfile");
    expect(routeSource).toContain("FlowHeaderBack");
    expect(routeSource).toContain("c19-customer-chip");

    const enProfile = getC10DemoProfile("en");
    expect(enProfile.name).toBe("Sarah Mitchell");

    const esProfile = getC10DemoProfile("es");
    expect(esProfile.name).toBe("Bryan Lopez");
  });
});
