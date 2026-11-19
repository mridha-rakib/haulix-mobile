import fs from "node:fs";
import path from "node:path";
import { enTranslations as en, esTranslations as es } from "@haulix/i18n";
import { C22Q_UNCERTAIN_EVIDENCE } from "../fixtures/c30Verification";

describe("C22-Q Uncertain AI Result — English (Node 412:515) & Spanish (Node 987:10309)", () => {
  const routePath = path.resolve(__dirname, "../../app/(app)/ai-uncertain-result.tsx");
  const processingRoutePath = path.resolve(__dirname, "../../app/(app)/ai-processing.tsx");
  const demoNavigatorPath = path.resolve(__dirname, "../components/demo/DemoScreenNavigator.tsx");

  it("verifies route file and demo navigator registration", () => {
    expect(fs.existsSync(routePath)).toBe(true);
    const navContent = fs.readFileSync(demoNavigatorPath, "utf8");
    expect(navContent).toContain('id: "c22q-es"');
    expect(navContent).toContain('id: "c22q-en"');
    expect(navContent).toContain('route: "/ai-uncertain-result"');
  });

  it("verifies C22-P connects to C22-Q", () => {
    const processingContent = fs.readFileSync(processingRoutePath, "utf8");
    expect(processingContent).toContain('pathname: "/ai-uncertain-result"');
  });

  it("verifies exact C22-Q English and Spanish translation strings", () => {
    expect(en.c22qAiUncertainResult.flowMarker).toBe("W03 · AI RECOGNITION & QUOTE");
    expect(es.c22qAiUncertainResult.flowMarker).toBe("W03 · RECONOCIMIENTO IA Y COTIZACIÓN");
    expect(en.c22qAiUncertainResult.title).toBe("We need a closer look");
    expect(es.c22qAiUncertainResult.title).toBe("Necesitamos revisar más de cerca");
    expect(en.c22qAiUncertainResult.subtitle).toBe(
      "Photo overlap or low visibility prevents reliable classification."
    );
    expect(es.c22qAiUncertainResult.subtitle).toBe(
      "Superposición o poca visibilidad impiden clasificar con fiabilidad."
    );
    expect(en.c22qAiUncertainResult.sectionClarificationTitle).toBe("Image needs clarification");
    expect(es.c22qAiUncertainResult.sectionClarificationTitle).toBe(
      "La imagen necesita aclaración"
    );
    expect(en.c22qAiUncertainResult.sectionUncertainTitle).toBe("Category or count uncertain");
    expect(es.c22qAiUncertainResult.sectionUncertainTitle).toBe("Categoría o cantidad incierta");
    expect(en.c22qAiUncertainResult.primaryCta).toBe("Correct the item list");
    expect(es.c22qAiUncertainResult.primaryCta).toBe("Corregir lista de objetos");
    expect(en.c22qAiUncertainResult.secondaryCta).toBe("Request manual quote review  ›");
    expect(es.c22qAiUncertainResult.secondaryCta).toBe("Solicitar revisión manual del precio  ›");
  });

  it("verifies uncertain item fixture data contract and invariant count", () => {
    expect(C22Q_UNCERTAIN_EVIDENCE.customerEnteredQty).toBe(2);
    expect(C22Q_UNCERTAIN_EVIDENCE.aiVerificationStatus).toBe("uncertain_1_or_2");
    expect(C22Q_UNCERTAIN_EVIDENCE.imageKey).toBe("mattresses");
  });

  it("verifies genuine image assets referenced by C22-Q exist on disk", () => {
    const assetsDir = path.resolve(__dirname, "../../assets/images/intake");
    expect(fs.existsSync(path.join(assetsDir, "c18j-mattresses.png"))).toBe(true);
  });
});
