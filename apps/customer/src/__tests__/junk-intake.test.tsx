import fs from "node:fs";
import path from "node:path";
import { enTranslations as en, esTranslations as es } from "@haulix/i18n";
import { getC10DemoProfile, resetProfileEdits } from "../fixtures/c10DemoProfile";
import { C15_SERVICES } from "../fixtures/c15Services";
import { C18J_DEFAULT_DATA, C18J_DEMO_CONSTANTS } from "../fixtures/c18jJunkIntake";

describe("C18-J Junk Removal Intake — English (Node 382:805) & Spanish (Node 977:9100)", () => {
  const c18jRoutePath = path.resolve(__dirname, "../../app/(app)/junk-intake.tsx");
  const c18IconsPath = path.resolve(__dirname, "../components/discovery/C18BatchIcons.tsx");
  const demoNavigatorPath = path.resolve(__dirname, "../components/demo/DemoScreenNavigator.tsx");

  afterEach(async () => {
    await resetProfileEdits("en");
    await resetProfileEdits("es");
  });

  it("1. verifies exact English copy from Figma Node 382:805", () => {
    expect(en.c18j.stepIndicator).toBe("W02 · SERVICE DISCOVERY & INTAKE");
    expect(en.c18j.stepSub).toBe("  /  C18-J");
    expect(en.c18j.title).toBe("Junk removal intake");
    expect(en.c18j.subtitle).toBe("Review items to be cleared from your pickup location.");
    expect(en.c18j.customerContext).toBe("{{name}} · {{bookingId}}");
    expect(en.c18j.serviceCardTitle).toBe("Service & pickup point");
    expect(en.c18j.labelService).toBe("Service");
    expect(en.c18j.serviceValue).toBe("Junk Removal · Non-hazardous");
    expect(en.c18j.labelPickupPoint).toBe("Pickup point");
    expect(en.c18j.pickupPointValue).toBe("Living room / garage staging area");
    expect(en.c18j.labelSpecialNotes).toBe("Special notes");
    expect(en.c18j.specialNotesValue).toBe("Please protect door frames when removing sofa");
    expect(en.c18j.itemsCardTitle).toBe("Declared item list (3 items)");
    expect(en.c18j.summaryPieces).toBe("4 pieces declared");
    expect(en.c18j.summaryWeight).toBe("~350 lb estimated");
    expect(en.c18j.reviewBadge).toBe("Review required before dispatch");
    expect(en.c18j.continueCta).toBe("Review and edit items");
    expect(en.c18j.differentServiceCta).toBe("Choose different service   ›");
    expect(en.c18j.footerDemo).toBe("DEMO ONLY  ·  No confirmed booking, rates or payment");
    expect(en.c18j.footerSrs).toBe("SRS  BK-01, BK-02, SV-14  ·  430 px / vertical scroll");
  });

  it("2. verifies exact Spanish copy from Figma Node 977:9100", () => {
    expect(es.c18j.stepIndicator).toBe("W02 · SERVICIOS Y RECEPCIÓN");
    expect(es.c18j.stepSub).toBe("  /  C18-J");
    expect(es.c18j.title).toBe("Solicitud de retiro de chatarra");
    expect(es.c18j.subtitle).toBe(
      "Revise los objetos que se retirarán de su ubicación de recogida."
    );
    expect(es.c18j.customerContext).toBe("{{name}} · {{bookingId}}");
    expect(es.c18j.serviceCardTitle).toBe("Servicio y punto de recogida");
    expect(es.c18j.labelService).toBe("Servicio");
    expect(es.c18j.serviceValue).toBe("Retiro de chatarra · No peligroso");
    expect(es.c18j.labelPickupPoint).toBe("Punto de recogida");
    expect(es.c18j.pickupPointValue).toBe("Sala de estar / área de preparación del garaje");
    expect(es.c18j.labelSpecialNotes).toBe("Notas especiales");
    expect(es.c18j.specialNotesValue).toBe(
      "Por favor proteja los marcos de las puertas al retirar el sofá"
    );
    expect(es.c18j.itemsCardTitle).toBe("Lista de objetos declarados (3 objetos)");
    expect(es.c18j.summaryPieces).toBe("4 piezas declaradas");
    expect(es.c18j.summaryWeight).toBe("~350 lb estimados");
    expect(es.c18j.reviewBadge).toBe("Revisión requerida antes del despacho");
    expect(es.c18j.continueCta).toBe("Revisar y editar objetos");
    expect(es.c18j.differentServiceCta).toBe("Elegir otro servicio   ›");
    expect(es.c18j.footerDemo).toBe("SOLO DEMO · Sin reserva confirmada, tarifas ni pago");
    expect(es.c18j.footerSrs).toBe("SRS  BK-01, BK-02, SV-14  ·  430 px / desplazamiento vertical");
  });

  it("3. verifies genuine image assets and icons in source code", () => {
    const routeSource = fs.readFileSync(c18jRoutePath, "utf8");
    expect(routeSource).toContain("c18j-sofa.png");
    expect(routeSource).toContain("c18j-mattresses.png");
    expect(routeSource).toContain("c18j-table.png");

    const iconsSource = fs.readFileSync(c18IconsPath, "utf8");
    expect(iconsSource).toContain("C18JunkIcon");
    expect(iconsSource).toContain("C18HazardShieldIcon");
    expect(iconsSource).toContain("C18CheckIcon");
  });

  it("4. verifies demo screen navigator registration for English and Spanish", () => {
    const navSource = fs.readFileSync(demoNavigatorPath, "utf8");
    expect(navSource).toContain('id: "c18j-en"');
    expect(navSource).toContain('id: "c18j-es"');
    expect(navSource).toContain('route: "/junk-intake"');
  });

  it("5. verifies dynamic customer profile isolation", () => {
    const enProfile = getC10DemoProfile("en");
    expect(enProfile.name).toBe("Sarah Mitchell");

    const esProfile = getC10DemoProfile("es");
    expect(esProfile.name).toBe("Bryan Lopez");
  });
});
