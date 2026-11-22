import fs from "node:fs";
import path from "node:path";
import { enTranslations as en, esTranslations as es } from "@haulix/i18n";
import { C24REV_CORRECTION_ITEMS } from "../fixtures/c33QuoteTerms";

describe("C24-REV Quote Revision Requested — English (Node 412:1214) & Spanish (Node 987:11137)", () => {
  const routePath = path.resolve(__dirname, "../../app/(app)/quote-revision.tsx");
  const illustrativeRoutePath = path.resolve(__dirname, "../../app/(app)/illustrative-quote.tsx");
  const demoNavigatorPath = path.resolve(__dirname, "../components/demo/DemoScreenNavigator.tsx");

  it("verifies route file existence and demo navigator registration", () => {
    expect(fs.existsSync(routePath)).toBe(true);
    const navContent = fs.readFileSync(demoNavigatorPath, "utf8");
    expect(navContent).toContain('id: "c24rev-es"');
    expect(navContent).toContain('id: "c24rev-en"');
    expect(navContent).toContain('route: "/quote-revision"');
  });

  it("verifies upstream C24-Q routes to C24-REV, and C24-REV navigates to C24-P and C23-C", () => {
    const illustrativeContent = fs.readFileSync(illustrativeRoutePath, "utf8");
    expect(illustrativeContent).toContain('pathname: "/quote-revision"');

    const routeContent = fs.readFileSync(routePath, "utf8");
    expect(routeContent).toContain('pathname: "/quote-processing"');
    expect(routeContent).toContain('pathname: "/correct-ai-items"');
    expect(routeContent).toContain('pathname: "/illustrative-quote"');
  });

  it("verifies customer corrections fixtures preserve mattress count = 2", () => {
    expect(C24REV_CORRECTION_ITEMS).toHaveLength(3);
    expect(en.c24revQuoteRevision.correctionMattress).toContain("Sarah confirmed 2");
    expect(es.c24revQuoteRevision.correctionMattress).toContain("Sarah confirmó 2");
  });

  it("verifies exact C24-REV English and Spanish translation strings", () => {
    expect(en.c24revQuoteRevision.flowMarker).toBe("W03 · AI RECOGNITION & QUOTE");
    expect(es.c24revQuoteRevision.flowMarker).toBe("W03 · RECONOCIMIENTO IA Y COTIZACIÓN");
    expect(en.c24revQuoteRevision.flowSub).toBe("  /  C24-REV");
    expect(es.c24revQuoteRevision.flowSub).toBe("  /  C24-REV");
    expect(en.c24revQuoteRevision.title).toBe("Recalculate after an edit");
    expect(es.c24revQuoteRevision.title).toBe("Recalcular tras editar");
    expect(en.c24revQuoteRevision.subtitle).toBe(
      "Pricing depends on the saved item quantities, access and rate-rule version."
    );
    expect(es.c24revQuoteRevision.subtitle).toBe(
      "El precio depende de cantidades guardadas, acceso y reglas vigentes."
    );
    expect(en.c24revQuoteRevision.sectionCorrectionsTitle).toBe("Customer corrections");
    expect(es.c24revQuoteRevision.sectionCorrectionsTitle).toBe("Correcciones del cliente");
    expect(en.c24revQuoteRevision.noticeTitle).toBe("Quote is being refreshed");
    expect(es.c24revQuoteRevision.noticeTitle).toBe("Se está actualizando la cotización");
    expect(en.c24revQuoteRevision.guidanceRules).toBe(
      "Do not assume a new amount without validated rules."
    );
    expect(es.c24revQuoteRevision.guidanceRules).toBe(
      "No supongas un nuevo importe sin reglas validadas."
    );
    expect(en.c24revQuoteRevision.primaryCta).toBe("Recalculate from confirmed inputs");
    expect(es.c24revQuoteRevision.primaryCta).toBe("Recalcular con datos confirmados");
    expect(en.c24revQuoteRevision.secondaryCta).toBe("Edit item measurements  ›");
    expect(es.c24revQuoteRevision.secondaryCta).toBe("Editar medidas del objeto  ›");
  });
});
