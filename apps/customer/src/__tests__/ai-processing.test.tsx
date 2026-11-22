import fs from "node:fs";
import path from "node:path";
import { enTranslations as en, esTranslations as es } from "@haulix/i18n";
import { C22P_EVIDENCE_ITEMS } from "../fixtures/c28AiHandoffs";

describe("C22-P AI Processing Demonstration — English (Node 412:262) & Spanish (Node 987:10006)", () => {
  const routePath = path.resolve(__dirname, "../../app/(app)/ai-processing.tsx");
  const recognitionRoutePath = path.resolve(__dirname, "../../app/(app)/ai-recognition.tsx");
  const demoNavigatorPath = path.resolve(__dirname, "../components/demo/DemoScreenNavigator.tsx");

  it("verifies route file and demo navigator registration", () => {
    expect(fs.existsSync(routePath)).toBe(true);
    const navContent = fs.readFileSync(demoNavigatorPath, "utf8");
    expect(navContent).toContain('id: "c22p-es"');
    expect(navContent).toContain('id: "c22p-en"');
    expect(navContent).toContain('route: "/ai-processing"');
  });

  it("verifies C22 connects to C22-P", () => {
    const recognitionContent = fs.readFileSync(recognitionRoutePath, "utf8");
    expect(recognitionContent).toContain('pathname: "/ai-processing"');
  });

  it("verifies exact C22-P English and Spanish translation strings", () => {
    expect(en.c22pAiProcessing.flowMarker).toBe("W03 · AI RECOGNITION & QUOTE");
    expect(es.c22pAiProcessing.flowMarker).toBe("W03 · RECONOCIMIENTO IA Y COTIZACIÓN");
    expect(en.c22pAiProcessing.title).toBe("Analyzing uploaded photos");
    expect(es.c22pAiProcessing.title).toBe("Analizando fotos cargadas");
    expect(en.c22pAiProcessing.subtitle).toBe(
      "Checking visible item categories and approximate counts."
    );
    expect(es.c22pAiProcessing.subtitle).toBe(
      "Verificando categorías visibles y cantidades aproximadas."
    );
    expect(en.c22pAiProcessing.sectionProgressTitle).toBe("Recognition progress");
    expect(es.c22pAiProcessing.sectionProgressTitle).toBe("Progreso del reconocimiento");
    expect(en.c22pAiProcessing.sectionEvidenceTitle).toBe("Evidence being analyzed");
    expect(es.c22pAiProcessing.sectionEvidenceTitle).toBe("Pruebas en análisis");
    expect(en.c22pAiProcessing.sectionProcessingStateTitle).toBe("Processing state");
    expect(es.c22pAiProcessing.sectionProcessingStateTitle).toBe("Estado de procesamiento");
    expect(en.c22pAiProcessing.primaryCta).toBe("View recognition result");
    expect(es.c22pAiProcessing.primaryCta).toBe("Ver resultado del reconocimiento");
    expect(en.c22pAiProcessing.secondaryNetworkFailureCta).toBe("Network failure example  ›");
    expect(es.c22pAiProcessing.secondaryNetworkFailureCta).toBe("Ejemplo de fallo de red  ›");
    expect(en.c22pAiProcessing.secondaryUncertainCta).toBe("Uncertain recognition example  ›");
    expect(es.c22pAiProcessing.secondaryUncertainCta).toBe("Ejemplo de reconocimiento incierto  ›");
  });

  it("verifies four progress events and demonstration statuses", () => {
    expect(en.c22pAiProcessing.progressUploadValidation).toBe("Upload validation");
    expect(en.c22pAiProcessing.progressUploadValidationStatus).toBe("Complete");
    expect(en.c22pAiProcessing.progressItemClassification).toBe("Item classification");
    expect(en.c22pAiProcessing.progressItemClassificationStatus).toBe("Processing · demo progress");
    expect(en.c22pAiProcessing.progressCompareList).toBe("Compare to customer list");
    expect(en.c22pAiProcessing.progressCompareListStatus).toBe("Pending");
    expect(en.c22pAiProcessing.progressSafetyChecks).toBe("Safety/uncertainty checks");
    expect(en.c22pAiProcessing.progressSafetyChecksStatus).toBe("Pending");

    // Spanish progress rows
    expect(es.c22pAiProcessing.progressUploadValidation).toBe("Validación de carga");
    expect(es.c22pAiProcessing.progressUploadValidationStatus).toBe("Completo");
    expect(es.c22pAiProcessing.progressItemClassification).toBe("Clasificación de objetos");
    expect(es.c22pAiProcessing.progressItemClassificationStatus).toBe("Procesando · Progreso demo");
    expect(es.c22pAiProcessing.progressCompareList).toBe("Comparar con lista del cliente");
    expect(es.c22pAiProcessing.progressCompareListStatus).toBe("Pendiente");
    expect(es.c22pAiProcessing.progressSafetyChecks).toBe("Controles de seguridad e incertidumbre");
    expect(es.c22pAiProcessing.progressSafetyChecksStatus).toBe("Pendiente");
  });

  it("verifies exactly two evidence items analyzed in C22-P", () => {
    expect(C22P_EVIDENCE_ITEMS).toHaveLength(2);
    expect(C22P_EVIDENCE_ITEMS[0].id).toBe("sofa");
    expect(C22P_EVIDENCE_ITEMS[1].id).toBe("mattresses");
  });

  it("verifies explicit simulated design state disclosure and future notices", () => {
    expect(en.c22pAiProcessing.processingStateText).toBe(
      "This is a simulated design state; no AI provider has been called."
    );
    expect(es.c22pAiProcessing.processingStateText).toBe(
      "Este es un estado simulado; no se llamó a ningún proveedor de IA."
    );
    expect(en.c22pAiProcessing.noticeUpcomingResult).toContain("C22-D");
    expect(es.c22pAiProcessing.noticeUpcomingResult).toContain("C22-D");
    expect(en.c22pAiProcessing.noticeNetworkFailure).toContain("C22-F");
    expect(es.c22pAiProcessing.noticeUncertainResult).toContain("C22-Q");
  });
});
