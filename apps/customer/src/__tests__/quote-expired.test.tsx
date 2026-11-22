import fs from "node:fs";
import path from "node:path";
import { enTranslations as en, esTranslations as es } from "@haulix/i18n";

describe("C25-X Quote Expired Refresh — English (Node 412:1429) & Spanish (Node 987:11394)", () => {
  const routePath = path.resolve(__dirname, "../../app/(app)/quote-expired.tsx");
  const illustrativeRoutePath = path.resolve(__dirname, "../../app/(app)/illustrative-quote.tsx");
  const demoNavigatorPath = path.resolve(__dirname, "../components/demo/DemoScreenNavigator.tsx");

  it("verifies route file existence and demo navigator registration", () => {
    expect(fs.existsSync(routePath)).toBe(true);
    const navContent = fs.readFileSync(demoNavigatorPath, "utf8");
    expect(navContent).toContain('id: "c25x-es"');
    expect(navContent).toContain('id: "c25x-en"');
    expect(navContent).toContain('route: "/quote-expired"');
  });

  it("verifies upstream C24-Q routes to C25-X, and C25-X navigates to C24-P and C25", () => {
    const illustrativeContent = fs.readFileSync(illustrativeRoutePath, "utf8");
    expect(illustrativeContent).toContain('pathname: "/quote-expired"');

    const routeContent = fs.readFileSync(routePath, "utf8");
    expect(routeContent).toContain('pathname: "/quote-processing"');
    expect(routeContent).toContain('pathname: "/itemized-quote"');
  });

  it("verifies exact C25-X English and Spanish translation strings", () => {
    expect(en.c25xQuoteExpired.flowMarker).toBe("W03 · AI RECOGNITION & QUOTE");
    expect(es.c25xQuoteExpired.flowMarker).toBe("W03 · RECONOCIMIENTO IA Y COTIZACIÓN");
    expect(en.c25xQuoteExpired.flowSub).toBe("  /  C25-X");
    expect(es.c25xQuoteExpired.flowSub).toBe("  /  C25-X");
    expect(en.c25xQuoteExpired.title).toBe("Your estimate needs a refresh");
    expect(es.c25xQuoteExpired.title).toBe("Debes actualizar tu estimación");
    expect(en.c25xQuoteExpired.subtitle).toBe(
      "Availability or pricing rules may have changed since the demonstration snapshot."
    );
    expect(es.c25xQuoteExpired.subtitle).toBe(
      "Disponibilidad o tarifas podrían cambiar respecto al ejemplo."
    );
    expect(en.c25xQuoteExpired.noticeTitle).toBe("Estimate refresh needed");
    expect(es.c25xQuoteExpired.noticeTitle).toBe("Es necesario actualizar la estimación");
    expect(en.c25xQuoteExpired.guidanceNoCharge).toBe(
      "Do not charge or book from an outdated draft estimate."
    );
    expect(es.c25xQuoteExpired.guidanceNoCharge).toBe(
      "No cobres ni reserves con una estimación caducada."
    );
    expect(en.c25xQuoteExpired.guidanceRecheck).toBe(
      "Re-check current input and pricing-rule version before continuing."
    );
    expect(es.c25xQuoteExpired.guidanceRecheck).toBe(
      "Revalida datos y versión de tarifas antes de continuar."
    );
    expect(en.c25xQuoteExpired.primaryCta).toBe("Refresh estimate");
    expect(es.c25xQuoteExpired.primaryCta).toBe("Actualizar estimación");
    expect(en.c25xQuoteExpired.secondaryCta).toBe("Review previous example  ›");
    expect(es.c25xQuoteExpired.secondaryCta).toBe("Revisar ejemplo anterior  ›");
  });

  it("verifies non-fabrication of quote expiration timestamp or binding states", () => {
    const routeContent = fs.readFileSync(routePath, "utf8");
    expect(routeContent).toContain("c25xQuoteExpired.footerDemo");
    expect(routeContent).toContain("c25xQuoteExpired.footerSrs");
    expect(routeContent).not.toContain("Date.now() +");
    expect(routeContent).not.toContain("expiredAt");
  });
});
