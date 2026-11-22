import fs from "node:fs";
import path from "node:path";
import { enTranslations as en, esTranslations as es } from "@haulix/i18n";
import { C22E_DEFAULT_LEDGER } from "../fixtures/c29AiResults";

describe("C22-E Missing Photo Evidence — English (Node 412:474) & Spanish (Node 987:10259)", () => {
  const routePath = path.resolve(__dirname, "../../app/(app)/ai-missing-photos.tsx");
  const recognitionRoutePath = path.resolve(__dirname, "../../app/(app)/ai-recognition.tsx");
  const demoNavigatorPath = path.resolve(__dirname, "../components/demo/DemoScreenNavigator.tsx");

  it("verifies route file and demo navigator registration", () => {
    expect(fs.existsSync(routePath)).toBe(true);
    const navContent = fs.readFileSync(demoNavigatorPath, "utf8");
    expect(navContent).toContain('id: "c22e-es"');
    expect(navContent).toContain('id: "c22e-en"');
    expect(navContent).toContain('route: "/ai-missing-photos"');
  });

  it("verifies C22 connects to C22-E missing photos", () => {
    const recognitionContent = fs.readFileSync(recognitionRoutePath, "utf8");
    expect(recognitionContent).toContain('pathname: "/ai-missing-photos"');
  });

  it("verifies exact C22-E English and Spanish translation strings", () => {
    expect(en.c22eAiMissingPhotos.flowMarker).toBe("W03 · AI RECOGNITION & QUOTE");
    expect(es.c22eAiMissingPhotos.flowMarker).toBe("W03 · RECONOCIMIENTO IA Y COTIZACIÓN");
    expect(en.c22eAiMissingPhotos.title).toBe("Add photos or confirm manually");
    expect(es.c22eAiMissingPhotos.title).toBe("Añadir fotos o confirmar manualmente");
    expect(en.c22eAiMissingPhotos.subtitle).toBe(
      "Without image evidence, AI image recognition cannot reliably identify unseen items."
    );
    expect(es.c22eAiMissingPhotos.subtitle).toBe(
      "Sin fotos, la IA no puede identificar objetos que no ve."
    );
    expect(en.c22eAiMissingPhotos.sectionMissingTitle).toBe("No uploaded image evidence");
    expect(es.c22eAiMissingPhotos.sectionMissingTitle).toBe("No hay fotos cargadas como prueba");
    expect(en.c22eAiMissingPhotos.missingSupporting).toBe(
      "No visual measurements will be fabricated."
    );
    expect(es.c22eAiMissingPhotos.missingSupporting).toBe(
      "No se inventarán medidas a partir de imágenes."
    );
    expect(en.c22eAiMissingPhotos.missingGuidance).toBe(
      "Customer-entered details remain available; uncertain requests require clarification or Admin review."
    );
    expect(es.c22eAiMissingPhotos.missingGuidance).toBe(
      "Se conservan los datos; casos inciertos requieren aclaración o revisión Admin."
    );
    expect(en.c22eAiMissingPhotos.primaryCta).toBe("Review existing intake photos");
    expect(es.c22eAiMissingPhotos.primaryCta).toBe("Revisar fotos existentes de la solicitud");
    expect(en.c22eAiMissingPhotos.secondaryManualDetailsCta).toBe(
      "Enter verified details manually  ›"
    );
    expect(es.c22eAiMissingPhotos.secondaryManualDetailsCta).toBe(
      "Introducir detalles verificados manualmente  ›"
    );
  });

  it("verifies empty photo evidence ledger and non-fabrication of measurements", () => {
    expect(C22E_DEFAULT_LEDGER.bookingId).toBe("HX-DEMO-1027");
    expect(C22E_DEFAULT_LEDGER.validPhotoCount).toBe(0);
    expect(C22E_DEFAULT_LEDGER.allowVisualMeasurements).toBe(false);
  });

  it("verifies return to intake photo review and upcoming manual details notice", () => {
    expect(en.c22eAiMissingPhotos.noticeReviewPhotos).toBe("Returning to intake photo management.");
    expect(en.c22eAiMissingPhotos.noticeManualDetails).toContain("C23-M");
    expect(es.c22eAiMissingPhotos.noticeManualDetails).toContain("C23-M");
    expect(en.c22eAiMissingPhotos.footerDemo).toBe(
      "DEMO STATE · No validated quote or booking yet"
    );
  });
});
