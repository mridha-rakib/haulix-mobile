import fs from "node:fs";
import path from "node:path";
import { enTranslations as en, esTranslations as es } from "@haulix/i18n";
import { C22F_DEFAULT_LEDGER } from "../fixtures/c29AiResults";

describe("C22-F Recognition Failed / Preserved Draft — English (Node 412:388) & Spanish (Node 987:10154)", () => {
  const routePath = path.resolve(__dirname, "../../app/(app)/ai-recognition-failed.tsx");
  const processingRoutePath = path.resolve(__dirname, "../../app/(app)/ai-processing.tsx");
  const demoNavigatorPath = path.resolve(__dirname, "../components/demo/DemoScreenNavigator.tsx");

  it("verifies route file and demo navigator registration", () => {
    expect(fs.existsSync(routePath)).toBe(true);
    const navContent = fs.readFileSync(demoNavigatorPath, "utf8");
    expect(navContent).toContain('id: "c22f-es"');
    expect(navContent).toContain('id: "c22f-en"');
    expect(navContent).toContain('route: "/ai-recognition-failed"');
  });

  it("verifies C22-P connects to C22-F network failure example", () => {
    const processingContent = fs.readFileSync(processingRoutePath, "utf8");
    expect(processingContent).toContain('pathname: "/ai-recognition-failed"');
  });

  it("verifies exact C22-F English and Spanish translation strings", () => {
    expect(en.c22fAiRecognitionFailed.flowMarker).toBe("W03 · AI RECOGNITION & QUOTE");
    expect(es.c22fAiRecognitionFailed.flowMarker).toBe("W03 · RECONOCIMIENTO IA Y COTIZACIÓN");
    expect(en.c22fAiRecognitionFailed.title).toBe("AI analysis couldn't finish");
    expect(es.c22fAiRecognitionFailed.title).toBe("El análisis de IA no pudo terminar");
    expect(en.c22fAiRecognitionFailed.subtitle).toBe(
      "Upload evidence is still attached to the draft."
    );
    expect(es.c22fAiRecognitionFailed.subtitle).toBe("Las pruebas adjuntas siguen en el borrador.");
    expect(en.c22fAiRecognitionFailed.sectionErrorTitle).toBe("Recognition service unavailable");
    expect(es.c22fAiRecognitionFailed.sectionErrorTitle).toBe(
      "Servicio de reconocimiento no disponible"
    );
    expect(en.c22fAiRecognitionFailed.sectionDraftTitle).toBe("Preserved draft");
    expect(es.c22fAiRecognitionFailed.sectionDraftTitle).toBe("Borrador conservado");
    expect(en.c22fAiRecognitionFailed.primaryCta).toBe("Retry recognition");
    expect(es.c22fAiRecognitionFailed.primaryCta).toBe("Reintentar reconocimiento");
    expect(en.c22fAiRecognitionFailed.secondaryManualDetailsCta).toBe("Use manual item details  ›");
    expect(es.c22fAiRecognitionFailed.secondaryManualDetailsCta).toBe(
      "Usar datos manuales de objetos  ›"
    );
  });

  it("verifies draft preservation ledger and no booking or payment created", () => {
    expect(C22F_DEFAULT_LEDGER.bookingId).toBe("HX-DEMO-1027");
    expect(C22F_DEFAULT_LEDGER.attachmentCount).toBe(4);
    expect(C22F_DEFAULT_LEDGER.hasPublishedQuote).toBe(false);
    expect(C22F_DEFAULT_LEDGER.hasActiveBooking).toBe(false);

    expect(en.c22fAiRecognitionFailed.draftNotice).toBe("No booking or payment created");
    expect(es.c22fAiRecognitionFailed.draftNotice).toBe("No se creó reserva ni pago");
  });

  it("verifies localized attachment summary string with corrected Spanish translation", () => {
    expect(en.c22fAiRecognitionFailed.draftSummary).toBe(
      "{{bookingId}} · {{attachmentCount}} attachments"
    );
    // Explicit runtime fix: 4 adjuntos instead of raw English "4 attachments"
    expect(es.c22fAiRecognitionFailed.draftSummary).toBe(
      "{{bookingId}} · {{attachmentCount}} adjuntos"
    );
  });

  it("verifies safe retry and manual details notice", () => {
    expect(en.c22fAiRecognitionFailed.noticeRetryDemo).toContain("AI processing demonstration");
    expect(en.c22fAiRecognitionFailed.noticeManualDetails).toContain("C23-M");
    expect(es.c22fAiRecognitionFailed.noticeManualDetails).toContain("C23-M");
  });
});
