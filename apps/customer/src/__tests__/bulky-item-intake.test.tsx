import fs from "node:fs";
import path from "node:path";
import { enTranslations as en, esTranslations as es } from "@haulix/i18n";
import { resetProfileEdits } from "../fixtures/c10DemoProfile";
import { C18F_DEFAULT_DATA } from "../fixtures/c18fBulkyIntake";

describe("C18-F Bulky Item Intake — English (Node 382:959) & Spanish (Node 977:9286)", () => {
  const _c18fRoutePath = path.resolve(__dirname, "../../app/(app)/bulky-item-intake.tsx");
  const c18IconsPath = path.resolve(__dirname, "../components/discovery/C18BatchIcons.tsx");
  const demoNavigatorPath = path.resolve(__dirname, "../components/demo/DemoScreenNavigator.tsx");

  afterEach(async () => {
    await resetProfileEdits("en");
    await resetProfileEdits("es");
  });

  it("1. verifies exact English copy from Figma Node 382:959", () => {
    expect(en.c18f.stepIndicator).toBe("W02 · SERVICE DISCOVERY & INTAKE");
    expect(en.c18f.stepSub).toBe("  /  C18-F");
    expect(en.c18f.title).toBe("Furniture & Bulky items");
    expect(en.c18f.subtitle).toBe("Select handling tier and review inventory specifications.");
    expect(en.c18f.customerContext).toBe("{{name}} · {{bookingId}}");
    expect(en.c18f.tiersCardTitle).toBe("Select handling tier");
    expect(en.c18f.inventoryCardTitle).toBe("Example inventory specification");
    expect(en.c18f.labelItem).toBe("Item");
    expect(en.c18f.itemValue).toBe("3-seat fabric sofa");
    expect(en.c18f.labelDimensions).toBe("Dimensions & weight");
    expect(en.c18f.dimensionsValue).toBe("1 item · ~82 × 35 × 34 in · ~125 lb");
    expect(en.c18f.labelAccess).toBe("Access & staging");
    expect(en.c18f.accessValue).toBe("Ground-floor pickup · driveway");
    expect(en.c18f.handlingBadge).toBe("Two-person lift required");
    expect(en.c18f.continueCta).toBe("Review furniture inventory");
    expect(en.c18f.categoriesCta).toBe("See service categories   ›");
    expect(en.c18f.footerDemo).toBe("DEMO ONLY  ·  No confirmed booking, rates or payment");
    expect(en.c18f.footerSrs).toBe("SRS  BK-01, BK-02, SV-14  ·  430 px / vertical scroll");
  });

  it("2. verifies exact Spanish copy from Figma Node 977:9286", () => {
    expect(es.c18f.stepIndicator).toBe("W02 · SERVICIOS Y RECEPCIÓN");
    expect(es.c18f.stepSub).toBe("  /  C18-F");
    expect(es.c18f.title).toBe("Muebles y objetos pesados");
    expect(es.c18f.subtitle).toBe(
      "Seleccione el nivel de manipulación y revise las especificaciones."
    );
    expect(es.c18f.customerContext).toBe("{{name}} · {{bookingId}}");
    expect(es.c18f.tiersCardTitle).toBe("Seleccione nivel de servicio");
    expect(es.c18f.inventoryCardTitle).toBe("Ejemplo de especificación de inventario");
    expect(es.c18f.labelItem).toBe("Objeto");
    expect(es.c18f.itemValue).toBe("Sofá de tela de tres plazas");
    expect(es.c18f.labelDimensions).toBe("Dimensiones y peso");
    expect(es.c18f.dimensionsValue).toBe("1 objeto · ~82 × 35 × 34 in · ~125 lb");
    expect(es.c18f.labelAccess).toBe("Acceso y preparación");
    expect(es.c18f.accessValue).toBe("Recogida en planta baja · entrada para autos");
    expect(es.c18f.handlingBadge).toBe("Elevación de dos personas requerida");
    expect(es.c18f.continueCta).toBe("Revisar retiro de muebles");
    expect(es.c18f.categoriesCta).toBe("Ver categorías de servicio   ›");
    expect(es.c18f.footerDemo).toBe("SOLO DEMO · Sin reserva confirmada, tarifas ni pago");
    expect(es.c18f.footerSrs).toBe("SRS  BK-01, BK-02, SV-14  ·  430 px / desplazamiento vertical");
  });

  it("3. verifies tier structure in fixture and icons", () => {
    expect(C18F_DEFAULT_DATA.tiers).toHaveLength(4);
    expect(C18F_DEFAULT_DATA.tiers[0].id).toBe("furniture-pickup");
    expect(C18F_DEFAULT_DATA.tiers[1].id).toBe("appliance-removal");
    expect(C18F_DEFAULT_DATA.tiers[2].id).toBe("mattress-removal");
    expect(C18F_DEFAULT_DATA.tiers[3].id).toBe("assembly-help");

    const iconsSource = fs.readFileSync(c18IconsPath, "utf8");
    expect(iconsSource).toContain("C18FurnitureIcon");
    expect(iconsSource).toContain("C18ApplianceIcon");
    expect(iconsSource).toContain("C18MattressIcon");
    expect(iconsSource).toContain("C18ToolsIcon");
  });

  it("4. verifies demo screen navigator registration", () => {
    const navSource = fs.readFileSync(demoNavigatorPath, "utf8");
    expect(navSource).toContain('id: "c18f-en"');
    expect(navSource).toContain('id: "c18f-es"');
    expect(navSource).toContain('route: "/bulky-item-intake"');
  });
});
