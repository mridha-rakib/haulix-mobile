import fs from "node:fs";
import path from "node:path";
import { enTranslations as en, esTranslations as es } from "@haulix/i18n";

describe("C25-E Unapproved Rate Rules — English (Node 412:1388) & Spanish (Node 987:11343)", () => {
  const routePath = path.resolve(__dirname, "../../app/(app)/unapproved-rate-rules.tsx");
  const itemizedRoutePath = path.resolve(__dirname, "../../app/(app)/itemized-quote.tsx");
  const demoNavigatorPath = path.resolve(__dirname, "../components/demo/DemoScreenNavigator.tsx");

  it("verifies route file existence and demo navigator registration", () => {
    expect(fs.existsSync(routePath)).toBe(true);
    const navContent = fs.readFileSync(demoNavigatorPath, "utf8");
    expect(navContent).toContain('id: "c25e-es"');
    expect(navContent).toContain('id: "c25e-en"');
    expect(navContent).toContain('route: "/unapproved-rate-rules"');
  });

  it("verifies upstream C25 routes to C25-E, and C25-E navigates to C24-ADM and C25", () => {
    const itemizedContent = fs.readFileSync(itemizedRoutePath, "utf8");
    expect(itemizedContent).toContain('pathname: "/unapproved-rate-rules"');

    const routeContent = fs.readFileSync(routePath, "utf8");
    expect(routeContent).toContain('pathname: "/admin-review-pending"');
    expect(routeContent).toContain('pathname: "/itemized-quote"');
  });

  it("verifies exact C25-E English and Spanish translation strings", () => {
    expect(en.c25eUnapprovedRateRules.flowMarker).toBe("W03 · AI RECOGNITION & QUOTE");
    expect(es.c25eUnapprovedRateRules.flowMarker).toBe("W03 · RECONOCIMIENTO IA Y COTIZACIÓN");
    expect(en.c25eUnapprovedRateRules.flowSub).toBe("  /  C25-E");
    expect(es.c25eUnapprovedRateRules.flowSub).toBe("  /  C25-E");
    expect(en.c25eUnapprovedRateRules.title).toBe("This price cannot be issued yet");
    expect(es.c25eUnapprovedRateRules.title).toBe("Este precio todavía no puede emitirse");
    expect(en.c25eUnapprovedRateRules.subtitle).toBe(
      "A final price is unavailable until approved service-rate and eligibility rules are available."
    );
    expect(es.c25eUnapprovedRateRules.subtitle).toBe(
      "No hay precio final hasta aprobar las tarifas y la elegibilidad del servicio."
    );
    expect(en.c25eUnapprovedRateRules.primaryCta).toBe("Request service-rate review");
    expect(es.c25eUnapprovedRateRules.primaryCta).toBe("Solicitar revisión de tarifas");
    expect(en.c25eUnapprovedRateRules.secondaryCta).toBe("Back to quote review  ›");
    expect(es.c25eUnapprovedRateRules.secondaryCta).toBe("Volver a revisar cotización  ›");
  });

  it("verifies unapproved rate rules safeguards and honest disclaimers", () => {
    const routeContent = fs.readFileSync(routePath, "utf8");
    expect(routeContent).toContain("c25eUnapprovedRateRules.footerDemo");
    expect(routeContent).toContain("c25eUnapprovedRateRules.footerSrs");
    expect(routeContent).not.toContain("bindingPrice");
    expect(routeContent).not.toContain("approveRate");
  });
});
