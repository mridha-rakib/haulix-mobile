import fs from "node:fs";
import path from "node:path";
import { enTranslations as en, esTranslations as es } from "@haulix/i18n";
import { getC10DemoProfile, resetProfileEdits } from "../fixtures/c10DemoProfile";
import { C19A_DEFAULT_ITEM } from "../fixtures/c19aAddItem";

describe("C19-A Add Item Manually — English (Node 382:1365) & Spanish (Node 980:9463)", () => {
  const c19aRoutePath = path.resolve(__dirname, "../../app/(app)/add-inventory-item.tsx");
  const demoNavigatorPath = path.resolve(__dirname, "../components/demo/DemoScreenNavigator.tsx");

  afterEach(async () => {
    await resetProfileEdits("en");
    await resetProfileEdits("es");
  });

  it("1. verifies exact English copy from Figma Node 382:1365", () => {
    expect(en.c19a.stepIndicator).toBe("W02 · SERVICE DISCOVERY & INTAKE");
    expect(en.c19a.stepSub).toBe("  /  C19-A");
    expect(en.c19a.title).toBe("Add another item");
    expect(en.c19a.subtitle).toBe(
      "Do not omit an item simply because it was not visible in a photo."
    );
    expect(en.c19a.customerContext).toBe("{{name}} · {{bookingId}}");
    expect(en.c19a.newItemSectionTitle).toBe("New item details");
    expect(en.c19a.labelItem).toBe("Item");
    expect(en.c19a.valueItem).toBe("Wooden bookshelf");
    expect(en.c19a.labelQuantity).toBe("Quantity");
    expect(en.c19a.valueQuantity).toBe("1");
    expect(en.c19a.labelDimensions).toBe("Approximate dimensions");
    expect(en.c19a.valueDimensions).toBe("48 × 15 × 72 inches");
    expect(en.c19a.labelEstimatedWeight).toBe("Estimated weight");
    expect(en.c19a.valueEstimatedWeight).toBe("~60 lb · customer estimate");
    expect(en.c19a.labelMaterial).toBe("Material");
    expect(en.c19a.valueMaterial).toBe("Wood; no restricted substances declared");
    expect(en.c19a.variationSectionTitle).toBe("Separate test variation");
    expect(en.c19a.serviceInfoBadge).toBe("Service information");
    expect(en.c19a.variationDisclaimer1).toBe(
      "This extra item is illustrative and allows separate review."
    );
    expect(en.c19a.variationDisclaimer2).toBe(
      "Quantity and safety checks must still match final physical cargo."
    );
    expect(en.c19a.reviewValidationCta).toBe("Review item validation");
    expect(en.c19a.returnWithoutAddingCta).toBe("Return without adding   ›");
    expect(en.c19a.footerDemo).toBe("DEMO ONLY  ·  No confirmed booking, rates or payment");
    expect(en.c19a.footerSrs).toBe("SRS  BK-03, AI-03  ·  430 px / vertical scroll");
  });

  it("2. verifies exact Spanish copy from Figma Node 980:9463", () => {
    expect(es.c19a.stepIndicator).toBe("W02 · SERVICIOS Y RECEPCIÓN");
    expect(es.c19a.stepSub).toBe("  /  C19-A");
    expect(es.c19a.title).toBe("Añadir otro objeto");
    expect(es.c19a.subtitle).toBe("No omitas objetos solo porque no aparezcan en una foto.");
    expect(es.c19a.customerContext).toBe("{{name}} · {{bookingId}}");
    expect(es.c19a.newItemSectionTitle).toBe("Detalles del nuevo objeto");
    expect(es.c19a.labelItem).toBe("Objeto");
    expect(es.c19a.valueItem).toBe("Estantería de madera");
    expect(es.c19a.labelQuantity).toBe("Cantidad");
    expect(es.c19a.valueQuantity).toBe("1");
    expect(es.c19a.labelDimensions).toBe("Dimensiones aproximadas");
    expect(es.c19a.valueDimensions).toBe("48 × 15 × 72 pulgadas");
    expect(es.c19a.labelEstimatedWeight).toBe("Peso estimado");
    expect(es.c19a.valueEstimatedWeight).toBe("~60 lb · Estimación del cliente");
    expect(es.c19a.labelMaterial).toBe("Material");
    expect(es.c19a.valueMaterial).toBe("Madera; no se declararon sustancias restringidas");
    expect(es.c19a.variationSectionTitle).toBe("Variante de prueba independiente");
    expect(es.c19a.serviceInfoBadge).toBe("Información del servicio");
    expect(es.c19a.variationDisclaimer1).toBe(
      "El objeto extra es ilustrativo y no cambia las 4 piezas de {{bookingId}} hasta guardarlo."
    );
    expect(es.c19a.variationDisclaimer2).toBe(
      "El servidor debe validar cantidad y controles de seguridad."
    );
    expect(es.c19a.reviewValidationCta).toBe("Revisar validación del objeto");
    expect(es.c19a.returnWithoutAddingCta).toBe("Volver sin añadir   ›");
    expect(es.c19a.footerDemo).toBe("SOLO DEMO · Sin reserva, tarifa ni pago confirmado");
    expect(es.c19a.footerSrs).toBe("SRS  BK-03, AI-03  ·  430 px / desplazamiento vertical");
  });

  it("3. validates customer profiles for English (Sarah) and Spanish (Bryan)", () => {
    const enProfile = getC10DemoProfile("en");
    expect(enProfile.name).toBe("Sarah Mitchell");

    const esProfile = getC10DemoProfile("es");
    expect(esProfile.name).toBe("Bryan Lopez");
  });

  it("4. verifies route implementation and demo registration exist", () => {
    expect(fs.existsSync(c19aRoutePath)).toBe(true);
    const routeContent = fs.readFileSync(c19aRoutePath, "utf-8");
    expect(routeContent).toContain("c19a-review-button");
    expect(routeContent).toContain("c19a-return-button");

    expect(fs.existsSync(demoNavigatorPath)).toBe(true);
    const demoContent = fs.readFileSync(demoNavigatorPath, "utf-8");
    expect(demoContent).toContain("c19a-en");
    expect(demoContent).toContain("c19a-es");
  });

  it("5. verifies fixture data integrity", () => {
    expect(C19A_DEFAULT_ITEM.details).toHaveLength(5);
    expect(C19A_DEFAULT_ITEM.details.map((d) => d.key)).toEqual([
      "item",
      "quantity",
      "dimensions",
      "estimatedWeight",
      "material",
    ]);
  });
});
