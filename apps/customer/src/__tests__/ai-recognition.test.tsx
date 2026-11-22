import fs from "node:fs";
import path from "node:path";
import { enTranslations as en, esTranslations as es } from "@haulix/i18n";
import { C22_EVIDENCE_ITEMS } from "../fixtures/c28AiHandoffs";

describe("C22 AI Recognition Entry — English (Node 412:195) & Spanish (Node 987:9929)", () => {
  const routePath = path.resolve(__dirname, "../../app/(app)/ai-recognition.tsx");
  const upstreamRoutePath = path.resolve(__dirname, "../../app/(app)/ai-review-handoff.tsx");
  const demoNavigatorPath = path.resolve(__dirname, "../components/demo/DemoScreenNavigator.tsx");

  it("verifies route file and demo navigator registration", () => {
    expect(fs.existsSync(routePath)).toBe(true);
    const navContent = fs.readFileSync(demoNavigatorPath, "utf8");
    expect(navContent).toContain('id: "c22-es"');
    expect(navContent).toContain('id: "c22-en"');
    expect(navContent).toContain('route: "/ai-recognition"');
  });

  it("verifies upstream generic handoff connects to ai-recognition", () => {
    const upstreamContent = fs.readFileSync(upstreamRoutePath, "utf8");
    expect(upstreamContent).toContain('router.push("/ai-recognition")');
  });

  it("verifies exact C22 English and Spanish translation strings", () => {
    expect(en.c22AiRecognition.flowMarker).toBe("W03 · AI RECOGNITION & QUOTE");
    expect(es.c22AiRecognition.flowMarker).toBe("W03 · RECONOCIMIENTO IA Y COTIZACIÓN");
    expect(en.c22AiRecognition.title).toBe("Analyze your item photos");
    expect(es.c22AiRecognition.title).toBe("Analizar fotos de tus objetos");
    expect(en.c22AiRecognition.subtitle).toBe(
      "Four uploaded examples are ready for AI-assisted review."
    );
    expect(es.c22AiRecognition.subtitle).toBe(
      "Cuatro fotos de ejemplo listas para revisión con IA."
    );
    expect(en.c22AiRecognition.sectionIntakeTitle).toBe("Intake ready");
    expect(es.c22AiRecognition.sectionIntakeTitle).toBe("Solicitud lista");
    expect(en.c22AiRecognition.sectionEvidenceTitle).toBe("Uploaded evidence");
    expect(es.c22AiRecognition.sectionEvidenceTitle).toBe("Pruebas cargadas");
    expect(en.c22AiRecognition.sectionAdvisoryTitle).toBe(
      "AI offers suggestions, not measurements"
    );
    expect(es.c22AiRecognition.sectionAdvisoryTitle).toBe("La IA ofrece sugerencias, no medidas");
    expect(en.c22AiRecognition.primaryCta).toBe("Analyze 4 photos");
    expect(es.c22AiRecognition.primaryCta).toBe("Analizar 4 fotos");
    expect(en.c22AiRecognition.secondaryReviewManualCta).toBe("Review manual intake  ›");
    expect(es.c22AiRecognition.secondaryReviewManualCta).toBe("Revisar solicitud manual  ›");
    expect(en.c22AiRecognition.secondaryNoPhotosCta).toBe("No photos available  ›");
    expect(es.c22AiRecognition.secondaryNoPhotosCta).toBe("No hay fotos disponibles  ›");
    expect(en.c22AiRecognition.secondaryOfflineCta).toBe("Offline connection recovery  ›");
    expect(es.c22AiRecognition.secondaryOfflineCta).toBe("Recuperar conexión sin internet  ›");
  });

  it("verifies four genuine evidence items in fixture", () => {
    expect(C22_EVIDENCE_ITEMS).toHaveLength(4);
    expect(C22_EVIDENCE_ITEMS[0].id).toBe("sofa");
    expect(C22_EVIDENCE_ITEMS[1].id).toBe("mattresses");
    expect(C22_EVIDENCE_ITEMS[2].id).toBe("table");
    expect(C22_EVIDENCE_ITEMS[3].id).toBe("otherJunk");
  });

  it("verifies honest advisory notice and footer state disclaimer", () => {
    expect(en.c22AiRecognition.evidenceDisclaimer).toBe("Preserved concept evidence · Fictional");
    expect(es.c22AiRecognition.evidenceDisclaimer).toBe(
      "Pruebas de concepto conservadas · Ficticias"
    );
    expect(en.c22AiRecognition.footerDemo).toBe("DEMO STATE · No validated quote or booking yet");
    expect(es.c22AiRecognition.footerDemo).toBe(
      "ESTADO DEMO · Sin cotización ni reserva validadas"
    );
    expect(en.c22AiRecognition.noticeReviewManual).toContain("C23-M");
    expect(en.c22AiRecognition.noticeNoPhotos).toContain("C22-E");
    expect(en.c22AiRecognition.noticeOffline).toContain("C22-O");
  });
});
