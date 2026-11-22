import fs from "node:fs";
import path from "node:path";
import { enTranslations as en, esTranslations as es } from "@haulix/i18n";
import { getC10DemoProfile, resetProfileEdits } from "../fixtures/c10DemoProfile";
import { C20V_DEFAULT_DATA } from "../fixtures/c20vMissingAccess";

describe("C20-V Incomplete Access Validation — English (Node 382:1822) & Spanish (Node 980:10048)", () => {
  const routePath = path.resolve(__dirname, "../../app/(app)/access-validation.tsx");
  const demoNavigatorPath = path.resolve(__dirname, "../components/demo/DemoScreenNavigator.tsx");

  afterEach(async () => {
    await resetProfileEdits("en");
    await resetProfileEdits("es");
  });

  it("1. verifies exact English copy from Figma Node 382:1822", () => {
    expect(en.c20v.stepIndicator).toBe("W02 · SERVICE DISCOVERY & INTAKE");
    expect(en.c20v.stepSub).toBe("  /  C20-V");
    expect(en.c20v.title).toBe("Please confirm site access");
    expect(en.c20v.subtitle).toBe("Required safety and pickup details are missing.");
    expect(en.c20v.sectionMissingTitle).toBe("Missing information");
    expect(en.c20v.labelStairs).toBe("Stairs");
    expect(en.c20v.valueStairs).toBe("Not confirmed");
    expect(en.c20v.labelParking).toBe("Parking");
    expect(en.c20v.valueParking).toBe("Unknown");
    expect(en.c20v.labelHeavyItemAccess).toBe("Heavy-item access");
    expect(en.c20v.valueHeavyItemAccess).toBe("Door and hallway clearance unknown");
    expect(en.c20v.sectionWarningTitle).toBe("Safety details required");
    expect(en.c20v.warningBadge).toBe("Action required");
    expect(en.c20v.warningGuidance1).toBe(
      "Confirm access before continuing to quote-critical review."
    );
    expect(en.c20v.warningGuidance2).toBe(
      "Do not assume that a crew or vehicle can safely handle the load."
    );
    expect(en.c20v.editAccessCta).toBe("Edit access information");
    expect(en.c20v.returnToItemsCta).toBe("Return to items   ›");
    expect(en.c20v.footerDemo).toBe("DEMO ONLY  ·  No confirmed booking, rates or payment");
    expect(en.c20v.footerSrs).toBe("SRS  BK-02, SV-14  ·  430 px / vertical scroll");
  });

  it("2. verifies exact Spanish copy from Figma Node 980:10048", () => {
    expect(es.c20v.stepIndicator).toBe("W02 · SERVICIOS Y SOLICITUD");
    expect(es.c20v.stepSub).toBe("  /  C20-V");
    expect(es.c20v.title).toBe("Confirma el acceso al lugar");
    expect(es.c20v.subtitle).toBe("Faltan datos obligatorios de seguridad y recogida.");
    expect(es.c20v.sectionMissingTitle).toBe("Información faltante");
    expect(es.c20v.labelStairs).toBe("Escaleras");
    expect(es.c20v.valueStairs).toBe("Sin confirmar");
    expect(es.c20v.labelParking).toBe("Estacionamiento");
    expect(es.c20v.valueParking).toBe("Desconocido");
    expect(es.c20v.labelHeavyItemAccess).toBe("Acceso para objetos pesados");
    expect(es.c20v.valueHeavyItemAccess).toBe("Ancho libre de puertas y pasillos desconocido");
    expect(es.c20v.sectionWarningTitle).toBe("Se necesitan datos de seguridad");
    expect(es.c20v.warningBadge).toBe("Acción necesaria");
    expect(es.c20v.warningGuidance1).toBe(
      "Confirma el acceso antes de la revisión necesaria para cotizar."
    );
    expect(es.c20v.warningGuidance2).toBe(
      "No supongas que el equipo o vehículo puede manejar la carga."
    );
    expect(es.c20v.editAccessCta).toBe("Editar información del acceso");
    expect(es.c20v.returnToItemsCta).toBe("Volver a objetos   ›");
    expect(es.c20v.footerDemo).toBe("SOLO DEMO · Sin reserva, tarifa ni pago confirmado");
    expect(es.c20v.footerSrs).toBe("SRS  BK-02, SV-14  ·  430 px / desplazamiento vertical");
  });

  it("3. validates customer profiles for English and Spanish", () => {
    const enProfile = getC10DemoProfile("en");
    expect(enProfile.name).toBe("Sarah Mitchell");

    const esProfile = getC10DemoProfile("es");
    expect(esProfile.name).toBe("Bryan Lopez");
  });

  it("4. validates 3 missing information rows in fixture", () => {
    expect(C20V_DEFAULT_DATA.rows).toHaveLength(3);
    const ids = C20V_DEFAULT_DATA.rows.map((r) => r.id);
    expect(ids).toEqual(["stairs", "parking", "heavy-item"]);
    expect(C20V_DEFAULT_DATA.actionRequired).toBe(true);
  });

  it("5. verifies route file and DemoScreenNavigator registration", () => {
    expect(fs.existsSync(routePath)).toBe(true);
    const content = fs.readFileSync(routePath, "utf-8");
    expect(content).toContain("c20v-edit-access-button");
    expect(content).toContain("c20v-return-items-button");
    expect(content).toContain("c20v-missing-info-card");
    expect(content).toContain("c20v-warning-card");

    const navContent = fs.readFileSync(demoNavigatorPath, "utf-8");
    expect(navContent).toContain("c20v-en");
    expect(navContent).toContain("c20v-es");
  });
});
