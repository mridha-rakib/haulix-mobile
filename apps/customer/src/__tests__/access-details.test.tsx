import fs from "node:fs";
import path from "node:path";
import { enTranslations as en, esTranslations as es } from "@haulix/i18n";
import { getC10DemoProfile, resetProfileEdits } from "../fixtures/c10DemoProfile";
import { C20_PICKUP_ACCESS_ROWS } from "../fixtures/c20AccessDetails";

describe("C20 Access & Labor Details — English (Node 382:1680) & Spanish (Node 980:9874)", () => {
  const routePath = path.resolve(__dirname, "../../app/(app)/access-details.tsx");
  const demoNavigatorPath = path.resolve(__dirname, "../components/demo/DemoScreenNavigator.tsx");

  afterEach(async () => {
    await resetProfileEdits("en");
    await resetProfileEdits("es");
  });

  it("1. verifies exact English copy from Figma Node 382:1680", () => {
    expect(en.c20.stepIndicator).toBe("W02 · SERVICE DISCOVERY & INTAKE");
    expect(en.c20.stepSub).toBe("  /  C20");
    expect(en.c20.title).toBe("How can the crew access items?");
    expect(en.c20.subtitle).toBe(
      "Accurate access details support safe labor, vehicle and quote estimation."
    );
    expect(en.c20.customerContext).toBe("{{name}} · {{bookingId}}");
    expect(en.c20.pickupAccessSectionTitle).toBe("Pickup access · {{name}}");
    expect(en.c20.labelLocation).toBe("Location");
    expect(en.c20.valueLocation).toBe("1234 E Example Lane, Phoenix, AZ 85014");
    expect(en.c20.labelProperty).toBe("Property");
    expect(en.c20.valueProperty).toBe("Single-family residence");
    expect(en.c20.labelStairs).toBe("Stairs at pickup");
    expect(en.c20.valueStairs).toBe("No stairs · ground level");
    expect(en.c20.labelElevator).toBe("Elevator");
    expect(en.c20.valueElevator).toBe("Not required");
    expect(en.c20.labelParking).toBe("Parking");
    expect(en.c20.valueParking).toBe("Driveway available");
    expect(en.c20.labelCarryingDistance).toBe("Carrying distance");
    expect(en.c20.valueCarryingDistance).toBe("~25 feet · customer estimate");
    expect(en.c20.labelDoorways).toBe("Doorway restrictions");
    expect(en.c20.valueDoorways).toBe("Standard residential doorway");
    expect(en.c20.additionalHelpSectionTitle).toBe("Additional help");
    expect(en.c20.disassemblyTitle).toBe("Disassembly required?");
    expect(en.c20.disassemblySub).toBe("No · Original sofa fits through available access");
    expect(en.c20.packingTitle).toBe("Packing / assembly request");
    expect(en.c20.packingSub).toBe("Not selected · Extra price if approved");
    expect(en.c20.crewEligibilitySectionTitle).toBe("Crew eligibility remains conditional");
    expect(en.c20.reviewRequiredBadge).toBe("Review required");
    expect(en.c20.crewGuidance1).toBe(
      "Vehicle size, safe lifting and helper count are evaluated against approved rules."
    );
    expect(en.c20.crewGuidance2).toBe("No extra labor charge is approved in this intake step.");
    expect(en.c20.continueCta).toBe("Continue to service restrictions");
    expect(en.c20.editQuantitiesCta).toBe("Edit item quantities   ›");
    expect(en.c20.footerDemo).toBe("DEMO ONLY  ·  No confirmed booking, rates or payment");
    expect(en.c20.footerSrs).toBe(
      "SRS  BK-02, BK-03, SV-02, SV-04, SV-14  ·  430 px / vertical scroll"
    );
  });

  it("2. verifies exact Spanish copy from Figma Node 980:9874", () => {
    expect(es.c20.stepIndicator).toBe("W02 · SERVICIOS Y SOLICITUD");
    expect(es.c20.stepSub).toBe("  /  C20");
    expect(es.c20.title).toBe("¿Cómo puede acceder el equipo a los objetos?");
    expect(es.c20.subtitle).toBe(
      "Datos precisos del acceso ayudan a estimar personal, vehículo y precio."
    );
    expect(es.c20.customerContext).toBe("{{name}} · {{bookingId}}");
    expect(es.c20.pickupAccessSectionTitle).toBe("Acceso de recogida · {{name}}");
    expect(es.c20.labelLocation).toBe("Ubicación");
    expect(es.c20.valueLocation).toBe("1234 E Example Lane, Phoenix, AZ 85014");
    expect(es.c20.labelProperty).toBe("Propiedad");
    expect(es.c20.valueProperty).toBe("Casa unifamiliar");
    expect(es.c20.labelStairs).toBe("Escaleras en recogida");
    expect(es.c20.valueStairs).toBe("Sin escaleras · Planta baja");
    expect(es.c20.labelElevator).toBe("Ascensor");
    expect(es.c20.valueElevator).toBe("No es necesario");
    expect(es.c20.labelParking).toBe("Estacionamiento");
    expect(es.c20.valueParking).toBe("Entrada para vehículos disponible");
    expect(es.c20.labelCarryingDistance).toBe("Distancia de traslado");
    expect(es.c20.valueCarryingDistance).toBe("~25 pies · Estimación del cliente");
    expect(es.c20.labelDoorways).toBe("Restricciones de puertas");
    expect(es.c20.valueDoorways).toBe("Puerta residencial estándar");
    expect(es.c20.additionalHelpSectionTitle).toBe("Ayuda adicional");
    expect(es.c20.disassemblyTitle).toBe("¿Se requiere desmontaje?");
    expect(es.c20.disassemblySub).toBe("No · El sofá entra por el acceso disponible");
    expect(es.c20.packingTitle).toBe("Solicitud de embalaje / montaje");
    expect(es.c20.packingSub).toBe("No seleccionado · Costo adicional si se aprueba");
    expect(es.c20.crewEligibilitySectionTitle).toBe("Elegibilidad del equipo pendiente");
    expect(es.c20.reviewRequiredBadge).toBe("Revisión necesaria");
    expect(es.c20.crewGuidance1).toBe(
      "Tamaño del vehículo, elevación segura y ayudantes se evalúan según reglas aprobadas."
    );
    expect(es.c20.crewGuidance2).toBe(
      "No se ha aprobado cobro extra de mano de obra en esta etapa."
    );
    expect(es.c20.continueCta).toBe("Continuar a restricciones del servicio");
    expect(es.c20.editQuantitiesCta).toBe("Editar cantidades   ›");
    expect(es.c20.footerDemo).toBe("SOLO DEMO · Sin reserva, tarifa ni pago confirmado");
    expect(es.c20.footerSrs).toBe(
      "SRS  BK-02, BK-03, SV-02, SV-04, SV-14  ·  430 px / desplazamiento vertical"
    );
  });

  it("3. validates customer profiles for English and Spanish", () => {
    const enProfile = getC10DemoProfile("en");
    expect(enProfile.name).toBe("Sarah Mitchell");

    const esProfile = getC10DemoProfile("es");
    expect(esProfile.name).toBe("Bryan Lopez");
  });

  it("4. validates 7 pickup access rows in fixture", () => {
    expect(C20_PICKUP_ACCESS_ROWS).toHaveLength(7);
    const ids = C20_PICKUP_ACCESS_ROWS.map((r) => r.id);
    expect(ids).toEqual([
      "location",
      "property",
      "stairs",
      "elevator",
      "parking",
      "distance",
      "doorways",
    ]);
  });

  it("4. verifies route file and DemoScreenNavigator registration", () => {
    expect(fs.existsSync(routePath)).toBe(true);
    const content = fs.readFileSync(routePath, "utf-8");
    expect(content).toContain("c20-continue-button");
    expect(content).toContain("c20-edit-quantities-button");
    expect(content).toContain("c20-pickup-access-card");
    expect(content).toContain("c20-additional-help-card");
    expect(content).toContain("c20-crew-eligibility-card");

    const navContent = fs.readFileSync(demoNavigatorPath, "utf-8");
    expect(navContent).toContain("c20-en");
    expect(navContent).toContain("c20-es");
  });
});
