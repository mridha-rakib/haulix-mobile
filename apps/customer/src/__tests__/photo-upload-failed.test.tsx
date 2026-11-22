import fs from "node:fs";
import path from "node:path";
import { enTranslations as en, esTranslations as es } from "@haulix/i18n";
import { getC10DemoProfile, resetProfileEdits } from "../fixtures/c10DemoProfile";
import { C19PF_SAVED_PHOTOS } from "../fixtures/c19pfFailure";

describe("C19-P-F Photo Upload Failure — English (Node 382:1590) & Spanish (Node 980:9752)", () => {
  const routePath = path.resolve(__dirname, "../../app/(app)/photo-upload-failed.tsx");
  const demoNavigatorPath = path.resolve(__dirname, "../components/demo/DemoScreenNavigator.tsx");

  afterEach(async () => {
    await resetProfileEdits("en");
    await resetProfileEdits("es");
  });

  it("1. verifies exact English copy from Figma Node 382:1590", () => {
    expect(en.c19pf.stepIndicator).toBe("W02 · SERVICE DISCOVERY & INTAKE");
    expect(en.c19pf.stepSub).toBe("  /  C19-P-F");
    expect(en.c19pf.title).toBe("Photo could not be uploaded");
    expect(en.c19pf.subtitle).toBe(
      "The selected attachment was not saved. Other confirmed photos remain."
    );
    expect(en.c19pf.customerContext).toBe("{{name}} · {{bookingId}}");
    expect(en.c19pf.networkSectionTitle).toBe("Network interrupted");
    expect(en.c19pf.actionRequiredBadge).toBe("Action required");
    expect(en.c19pf.errorNotice1).toBe("Example: additional-item image upload failed at 87%.");
    expect(en.c19pf.errorNotice2).toBe(
      "No failed or incomplete upload may be represented as successfully attached."
    );
    expect(en.c19pf.savedPhotosSectionTitle).toBe("Saved photos");
    expect(en.c19pf.photoSofaTitle).toBe("Sofa · saved");
    expect(en.c19pf.photoMattressTitle).toBe("Mattress · saved");
    expect(en.c19pf.photoTableTitle).toBe("Dining table · saved");
    expect(en.c19pf.photoSub).toBe("Attached · replaceable demo media");
    expect(en.c19pf.retryCta).toBe("Retry failed upload");
    expect(en.c19pf.continueWithSavedCta).toBe("Continue with saved media   ›");
    expect(en.c19pf.footerDemo).toBe("DEMO ONLY  ·  No confirmed booking, rates or payment");
    expect(en.c19pf.footerSrs).toBe("SRS  BK-04, NFR-01  ·  430 px / vertical scroll");
  });

  it("2. verifies exact Spanish copy from Figma Node 980:9752", () => {
    expect(es.c19pf.stepIndicator).toBe("W02 · SERVICIOS Y SOLICITUD");
    expect(es.c19pf.stepSub).toBe("  /  C19-P-F");
    expect(es.c19pf.title).toBe("No se pudo subir la foto");
    expect(es.c19pf.subtitle).toBe(
      "El adjunto seleccionado no se guardó. Las otras fotos permanecen."
    );
    expect(es.c19pf.customerContext).toBe("{{name}} · {{bookingId}}");
    expect(es.c19pf.networkSectionTitle).toBe("Red interrumpida");
    expect(es.c19pf.actionRequiredBadge).toBe("Acción necesaria");
    expect(es.c19pf.errorNotice1).toBe("Ejemplo: falló la carga de imagen adicional al 87 %.");
    expect(es.c19pf.errorNotice2).toBe(
      "Una carga fallida o incompleta no puede figurar como adjunta."
    );
    expect(es.c19pf.savedPhotosSectionTitle).toBe("Fotos guardadas");
    expect(es.c19pf.photoSofaTitle).toBe("Sofá · Guardado");
    expect(es.c19pf.photoMattressTitle).toBe("Colchón · guardado");
    expect(es.c19pf.photoTableTitle).toBe("Mesa de comedor · guardada");
    expect(es.c19pf.photoSub).toBe("Adjunto · archivo de ejemplo reemplazable");
    expect(es.c19pf.retryCta).toBe("Reintentar carga fallida");
    expect(es.c19pf.continueWithSavedCta).toBe("Continuar con fotos guardadas   ›");
    expect(es.c19pf.footerDemo).toBe("SOLO DEMO · Sin reserva, tarifa ni pago confirmado");
    expect(es.c19pf.footerSrs).toBe("SRS  BK-04, NFR-01  ·  430 px / desplazamiento vertical");
  });

  it("3. validates customer profiles for English and Spanish", () => {
    const enProfile = getC10DemoProfile("en");
    expect(enProfile.name).toBe("Sarah Mitchell");

    const esProfile = getC10DemoProfile("es");
    expect(esProfile.name).toBe("Bryan Lopez");
  });

  it("4. validates exactly 3 saved photos are shown and failed 4th photo is excluded", () => {
    expect(C19PF_SAVED_PHOTOS).toHaveLength(3);
    const keys = C19PF_SAVED_PHOTOS.map((p) => p.imageKey);
    expect(keys).toEqual(["sofa", "mattresses", "table"]);
    expect(keys).not.toContain("boxes");
  });

  it("4. verifies route file and DemoScreenNavigator registration", () => {
    expect(fs.existsSync(routePath)).toBe(true);
    const content = fs.readFileSync(routePath, "utf-8");
    expect(content).toContain("c19pf-retry-button");
    expect(content).toContain("c19pf-continue-saved-button");
    expect(content).toContain("c19pf-network-card");
    expect(content).toContain("c19pf-saved-photos-card");

    const navContent = fs.readFileSync(demoNavigatorPath, "utf-8");
    expect(navContent).toContain("c19pf-en");
    expect(navContent).toContain("c19pf-es");
  });
});
