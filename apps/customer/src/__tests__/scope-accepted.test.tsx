import fs from "node:fs";
import path from "node:path";
import { enTranslations as en, esTranslations as es } from "@haulix/i18n";

describe("C26-A Scope Accepted — English (Node 412:1470) & Spanish (Node 987:11445)", () => {
  const routePath = path.resolve(__dirname, "../../app/(app)/scope-accepted.tsx");
  const acceptanceReviewPath = path.resolve(
    __dirname,
    "../../app/(app)/quote-acceptance-review.tsx"
  );
  const demoNavigatorPath = path.resolve(__dirname, "../components/demo/DemoScreenNavigator.tsx");

  it("verifies route file existence and demo navigator registration", () => {
    expect(fs.existsSync(routePath)).toBe(true);
    const navContent = fs.readFileSync(demoNavigatorPath, "utf8");
    expect(navContent).toContain('id: "c26a-es"');
    expect(navContent).toContain('id: "c26a-en"');
    expect(navContent).toContain('route: "/scope-accepted"');
  });

  it("verifies upstream C25-A routes to C26-A, and C26-A navigates back to C25", () => {
    const acceptanceContent = fs.readFileSync(acceptanceReviewPath, "utf8");
    expect(acceptanceContent).toContain('pathname: "/scope-accepted"');

    const routeContent = fs.readFileSync(routePath, "utf8");
    expect(routeContent).toContain('pathname: "/itemized-quote"');
    expect(routeContent).toContain('pathname: "/quote-acceptance-review"');
  });

  it("verifies exact C26-A English and Spanish translation strings", () => {
    expect(en.c26aScopeAccepted.flowMarker).toBe("W03 · AI RECOGNITION & QUOTE");
    expect(es.c26aScopeAccepted.flowMarker).toBe("W03 · RECONOCIMIENTO IA Y COTIZACIÓN");
    expect(en.c26aScopeAccepted.flowSub).toBe("  /  C26-A");
    expect(es.c26aScopeAccepted.flowSub).toBe("  /  C26-A");
    expect(en.c26aScopeAccepted.title).toBe("Quote scope reviewed");
    expect(es.c26aScopeAccepted.title).toBe("Alcance de la cotización revisado");
    expect(en.c26aScopeAccepted.sectionSuccessTitle).toBe("Scope acceptance recorded (prototype)");
    expect(es.c26aScopeAccepted.sectionSuccessTitle).toBe(
      "Aceptación del alcance registrada (prototipo)"
    );
    expect(en.c26aScopeAccepted.sectionStepsTitle).toBe("Next required steps");
    expect(es.c26aScopeAccepted.sectionStepsTitle).toBe("Próximos pasos obligatorios");
    expect(en.c26aScopeAccepted.primaryCta).toBe("Continue to Schedule & Payment");
    expect(es.c26aScopeAccepted.primaryCta).toBe("Continuar a programación y pago");
    expect(en.c26aScopeAccepted.secondaryCta).toBe("Revisit itemized estimate  ›");
    expect(es.c26aScopeAccepted.secondaryCta).toBe("Volver a la estimación detallada  ›");
  });

  it("verifies non-fabrication constraints, upcoming W04 banner, and honest disclaimers", () => {
    const routeContent = fs.readFileSync(routePath, "utf8");
    expect(routeContent).toContain("c26aScopeAccepted.footerDemo");
    expect(routeContent).toContain("c26aScopeAccepted.footerSrs");
    expect(routeContent).toContain("c26aScopeAccepted.noticeW04Upcoming");
    expect(routeContent).not.toContain("dispatchDriver");
    expect(routeContent).not.toContain("createBookingReceipt");
  });
});
