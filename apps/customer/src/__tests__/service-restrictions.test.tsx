import fs from "node:fs";
import path from "node:path";
import { enTranslations as en, esTranslations as es } from "@haulix/i18n";
import { getC10DemoProfile, resetProfileEdits } from "../fixtures/c10DemoProfile";
import {
  C20R_SAFETY_ROWS,
  getAcknowledgementsState,
  resetAcknowledgements,
  setAcknowledgement,
} from "../fixtures/c20rSafety";

describe("C20-R Safety & Restrictions — English (Node 382:1873) & Spanish (Node 980:10115)", () => {
  const routePath = path.resolve(__dirname, "../../app/(app)/service-restrictions.tsx");
  const demoNavigatorPath = path.resolve(__dirname, "../components/demo/DemoScreenNavigator.tsx");

  beforeEach(() => {
    resetAcknowledgements();
  });

  afterEach(async () => {
    await resetProfileEdits("en");
    await resetProfileEdits("es");
    resetAcknowledgements();
  });

  it("1. verifies exact English copy from Figma Node 382:1873", () => {
    expect(en.c20r.stepIndicator).toBe("W02 · SERVICE DISCOVERY & INTAKE");
    expect(en.c20r.stepSub).toBe("  /  C20-R");
    expect(en.c20r.title).toBe("Confirm item safety");
    expect(en.c20r.subtitle).toBe("Restricted or uncertain loads are not automatically accepted.");
    expect(en.c20r.sectionQuestionsTitle).toBe("Safety questions");
    expect(en.c20r.labelChemicals).toBe("Hazardous chemicals / fuels");
    expect(en.c20r.valueChemicals).toBe("Sarah reports none");
    expect(en.c20r.labelPaints).toBe("Paints, solvents / unknown liquids");
    expect(en.c20r.valuePaints).toBe("No known items");
    expect(en.c20r.labelSharps).toBe("Unsecured sharp materials");
    expect(en.c20r.valueSharps).toBe("No known items");
    expect(en.c20r.labelContainers).toBe("Heavy or unknown-content containers");
    expect(en.c20r.valueContainers).toBe("No unverified contents declared");
    expect(en.c20r.sectionAckTitle).toBe("Customer acknowledgement");
    expect(en.c20r.ackItemsLabel).toBe("The listed items and photos represent my request.");
    expect(en.c20r.ackDisclosedLabel).toBe(
      "I have disclosed items I know may be hazardous, unusually heavy or unsafe."
    );
    expect(en.c20r.ackDisclaimer).toBe(
      "Final acceptance depends on approved local disposal, vehicle and worker eligibility."
    );
    expect(en.c20r.acknowledgeCta).toBe("Acknowledge and review");
    expect(en.c20r.needHelpCta).toBe("I need help with an item   ›");
    expect(en.c20r.incompleteAccessCta).toBe("Access information incomplete   ›");
    expect(en.c20r.footerDemo).toBe("DEMO ONLY  ·  No confirmed booking, rates or payment");
    expect(en.c20r.footerSrs).toBe("SRS  SV-01, SV-02, SV-12, BK-03  ·  430 px / vertical scroll");
  });

  it("2. verifies exact Spanish copy from Figma Node 980:10115", () => {
    expect(es.c20r.stepIndicator).toBe("W02 · SERVICIOS Y SOLICITUD");
    expect(es.c20r.stepSub).toBe("  /  C20-R");
    expect(es.c20r.title).toBe("Confirmar seguridad de los objetos");
    expect(es.c20r.subtitle).toBe(
      "Las cargas restringidas o inciertas no se aceptan automáticamente."
    );
    expect(es.c20r.sectionQuestionsTitle).toBe("Preguntas de seguridad");
    expect(es.c20r.labelChemicals).toBe("Químicos peligrosos / combustibles");
    expect(es.c20r.valueChemicals).toBe("Sarah indica que no hay");
    expect(es.c20r.labelPaints).toBe("Pinturas, disolventes / líquidos desconocidos");
    expect(es.c20r.valuePaints).toBe("Sin objetos conocidos");
    expect(es.c20r.labelSharps).toBe("Objetos cortantes sin asegurar");
    expect(es.c20r.valueSharps).toBe("Sin objetos conocidos");
    expect(es.c20r.labelContainers).toBe("Recipientes pesados o de contenido desconocido");
    expect(es.c20r.valueContainers).toBe("No se declararon contenidos sin verificar");
    expect(es.c20r.sectionAckTitle).toBe("Confirmación del cliente");
    expect(es.c20r.ackItemsLabel).toBe("Los objetos y fotos de la lista representan mi solicitud.");
    expect(es.c20r.ackDisclosedLabel).toBe(
      "He declarado los objetos que podrían ser peligrosos, muy pesados o inseguros."
    );
    expect(es.c20r.ackDisclaimer).toBe(
      "La aceptación final depende de eliminación local, vehículo y personal autorizados."
    );
    expect(es.c20r.acknowledgeCta).toBe("Confirmar y revisar");
    expect(es.c20r.needHelpCta).toBe("Necesito ayuda con un objeto   ›");
    expect(es.c20r.incompleteAccessCta).toBe("Datos de acceso incompletos   ›");
    expect(es.c20r.footerDemo).toBe("SOLO DEMO · Sin reserva, tarifa ni pago confirmado");
    expect(es.c20r.footerSrs).toBe(
      "SRS  SV-01, SV-02, SV-12, BK-03  ·  430 px / desplazamiento vertical"
    );
  });

  it("3. validates customer profiles for English and Spanish", () => {
    const enProfile = getC10DemoProfile("en");
    expect(enProfile.name).toBe("Sarah Mitchell");

    const esProfile = getC10DemoProfile("es");
    expect(esProfile.name).toBe("Bryan Lopez");
  });

  it("4. validates 4 safety question rows with dynamic customer name adaptation", () => {
    expect(C20R_SAFETY_ROWS).toHaveLength(4);
    const ids = C20R_SAFETY_ROWS.map((r) => r.id);
    expect(ids).toEqual(["chemicals", "paints", "sharps", "containers"]);

    const chemRow = C20R_SAFETY_ROWS[0];
    expect(chemRow.getValue("Sarah Mitchell", "en")).toBe("Sarah reports none");
    expect(chemRow.getValue("Bryan Lopez", "es")).toBe("Bryan indica que no hay");
  });

  it("5. validates independent acknowledgement toggle states", () => {
    expect(getAcknowledgementsState().itemsRepresentRequest).toBe(false);
    expect(getAcknowledgementsState().disclosedSafetyRisks).toBe(false);

    setAcknowledgement("itemsRepresentRequest", true);
    expect(getAcknowledgementsState().itemsRepresentRequest).toBe(true);
    expect(getAcknowledgementsState().disclosedSafetyRisks).toBe(false);

    setAcknowledgement("disclosedSafetyRisks", true);
    expect(getAcknowledgementsState().itemsRepresentRequest).toBe(true);
    expect(getAcknowledgementsState().disclosedSafetyRisks).toBe(true);

    resetAcknowledgements();
    expect(getAcknowledgementsState().itemsRepresentRequest).toBe(false);
    expect(getAcknowledgementsState().disclosedSafetyRisks).toBe(false);
  });

  it("6. verifies route file and DemoScreenNavigator registration", () => {
    expect(fs.existsSync(routePath)).toBe(true);
    const content = fs.readFileSync(routePath, "utf-8");
    expect(content).toContain("c20r-acknowledge-button");
    expect(content).toContain("c20r-need-help-button");
    expect(content).toContain("c20r-incomplete-access-button");
    expect(content).toContain("c20r-ack-checkbox-items");
    expect(content).toContain("c20r-ack-checkbox-disclosed");

    const navContent = fs.readFileSync(demoNavigatorPath, "utf-8");
    expect(navContent).toContain("c20r-en");
    expect(navContent).toContain("c20r-es");
  });
});
