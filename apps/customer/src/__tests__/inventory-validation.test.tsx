import fs from "node:fs";
import path from "node:path";
import { enTranslations as en, esTranslations as es } from "@haulix/i18n";
import { getC10DemoProfile, resetProfileEdits } from "../fixtures/c10DemoProfile";
import { C19V_DEFAULT_ITEM } from "../fixtures/c19vValidation";

describe("C19-V Missing Measurements Validation — English (Node 382:1424) & Spanish (Node 980:9538)", () => {
  const c19vRoutePath = path.resolve(__dirname, "../../app/(app)/inventory-validation.tsx");
  const demoNavigatorPath = path.resolve(__dirname, "../components/demo/DemoScreenNavigator.tsx");

  afterEach(async () => {
    await resetProfileEdits("en");
    await resetProfileEdits("es");
  });

  it("1. verifies exact English copy from Figma Node 382:1424", () => {
    expect(en.c19v.stepIndicator).toBe("W02 · SERVICE DISCOVERY & INTAKE");
    expect(en.c19v.stepSub).toBe("  /  C19-V");
    expect(en.c19v.title).toBe("More details needed");
    expect(en.c19v.subtitle).toBe(
      "Quote-critical fields require clarification; do not invent estimates."
    );
    expect(en.c19v.customerContext).toBe("{{name}} · {{bookingId}}");
    expect(en.c19v.clarificationSectionTitle).toBe("Customer clarification");
    expect(en.c19v.labelItem).toBe("Item");
    expect(en.c19v.valueItem).toBe("Heavy cabinet");
    expect(en.c19v.labelQuantity).toBe("Quantity");
    expect(en.c19v.valueQuantity).toBe("1");
    expect(en.c19v.labelDimensions).toBe("Length / Width / Height");
    expect(en.c19v.valueDimensions).toBe("Not supplied");
    expect(en.c19v.labelWeight).toBe("Weight");
    expect(en.c19v.valueWeight).toBe("Unknown");
    expect(en.c19v.labelStairs).toBe("Stairs");
    expect(en.c19v.valueStairs).toBe("Not yet confirmed");
    expect(en.c19v.warningSectionTitle).toBe("Measurements unavailable");
    expect(en.c19v.actionRequiredBadge).toBe("Action required");
    expect(en.c19v.warningGuidance).toBe(
      "Enter an approximate size/weight or request helper inspection before booking."
    );
    expect(en.c19v.warningDisclaimer).toBe(
      "An uncertain load may be held for secondary dispatch review."
    );
    expect(en.c19v.completeInfoCta).toBe("Complete item information");
    expect(en.c19v.returnToInventoryCta).toBe("Return to inventory   ›");
    expect(en.c19v.footerDemo).toBe("DEMO ONLY  ·  No confirmed booking, rates or payment");
    expect(en.c19v.footerSrs).toBe("SRS  BK-03, AI-04, SV-14  ·  430 px / vertical scroll");
  });

  it("2. verifies exact Spanish copy from Figma Node 980:9538", () => {
    expect(es.c19v.stepIndicator).toBe("W02 · SERVICIOS Y RECEPCIÓN");
    expect(es.c19v.stepSub).toBe("  /  C19-V");
    expect(es.c19v.title).toBe("Se necesitan más detalles");
    expect(es.c19v.subtitle).toBe(
      "Los datos clave para cotizar necesitan aclaración; no inventar estimaciones."
    );
    expect(es.c19v.customerContext).toBe("{{name}} · {{bookingId}}");
    expect(es.c19v.clarificationSectionTitle).toBe("Aclaración del cliente");
    expect(es.c19v.labelItem).toBe("Objeto");
    expect(es.c19v.valueItem).toBe("Armario pesado");
    expect(es.c19v.labelQuantity).toBe("Cantidad");
    expect(es.c19v.valueQuantity).toBe("1");
    expect(es.c19v.labelDimensions).toBe("Largo / Ancho / Alto");
    expect(es.c19v.valueDimensions).toBe("No proporcionado");
    expect(es.c19v.labelWeight).toBe("Peso");
    expect(es.c19v.valueWeight).toBe("Desconocido");
    expect(es.c19v.labelStairs).toBe("Escaleras");
    expect(es.c19v.valueStairs).toBe("Aún sin confirmar");
    expect(es.c19v.warningSectionTitle).toBe("Medidas no disponibles");
    expect(es.c19v.actionRequiredBadge).toBe("Acción necesaria");
    expect(es.c19v.warningGuidance).toBe("Indica tamaño o peso aproximado, o añade fotos.");
    expect(es.c19v.warningDisclaimer).toBe(
      "Una carga incierta puede quedar pendiente de aclaración o revisión Admin en W03."
    );
    expect(es.c19v.completeInfoCta).toBe("Completa información del objeto");
    expect(es.c19v.returnToInventoryCta).toBe("Volver al inventario   ›");
    expect(es.c19v.footerDemo).toBe("SOLO DEMO · Sin reserva, tarifa ni pago confirmado");
    expect(es.c19v.footerSrs).toBe("SRS  BK-03, AI-04, SV-14  ·  430 px / desplazamiento vertical");
  });

  it("3. validates customer profiles for English (Sarah) and Spanish (Bryan)", () => {
    const enProfile = getC10DemoProfile("en");
    expect(enProfile.name).toBe("Sarah Mitchell");

    const esProfile = getC10DemoProfile("es");
    expect(esProfile.name).toBe("Bryan Lopez");
  });

  it("4. verifies route implementation and demo registration exist", () => {
    expect(fs.existsSync(c19vRoutePath)).toBe(true);
    const routeContent = fs.readFileSync(c19vRoutePath, "utf-8");
    expect(routeContent).toContain("c19v-complete-button");
    expect(routeContent).toContain("c19v-return-button");

    expect(fs.existsSync(demoNavigatorPath)).toBe(true);
    const demoContent = fs.readFileSync(demoNavigatorPath, "utf-8");
    expect(demoContent).toContain("c19v-en");
    expect(demoContent).toContain("c19v-es");
  });

  it("5. verifies fixture data integrity", () => {
    expect(C19V_DEFAULT_ITEM.details).toHaveLength(5);
    expect(C19V_DEFAULT_ITEM.details.map((d) => d.key)).toEqual([
      "item",
      "quantity",
      "dimensions",
      "weight",
      "stairs",
    ]);
  });
});
