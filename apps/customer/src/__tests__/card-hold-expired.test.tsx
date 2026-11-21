import fs from "node:fs";
import path from "node:path";
import { enTranslations as en, esTranslations as es } from "@haulix/i18n";

describe("C30-E Your Card Hold Expired — English (Node 763:883) & Spanish (Node 766:1269)", () => {
  const routePath = path.resolve(__dirname, "../../app/(app)/card-hold-expired.tsx");
  const demoNavigatorPath = path.resolve(__dirname, "../components/demo/DemoScreenNavigator.tsx");

  it("verifies route file existence and demo navigator registration", () => {
    expect(fs.existsSync(routePath)).toBe(true);
    const navContent = fs.readFileSync(demoNavigatorPath, "utf8");
    expect(navContent).toContain('id: "c30e-es"');
    expect(navContent).toContain('id: "c30e-en"');
    expect(navContent).toContain('route: "/card-hold-expired"');
  });

  it("verifies recovery transitions to C29 re-authorization, C27 scheduling return, and C30-C hold review", () => {
    const routeContent = fs.readFileSync(routePath, "utf8");
    expect(routeContent).toContain('pathname: "/choose-payment-method"');
    expect(routeContent).toContain('pathname: "/choose-service-time"');
    expect(routeContent).toContain('pathname: "/review-fresh-card-hold"');
    expect(routeContent).toContain("recordHoldExpired");
  });

  it("verifies exact C30-E English and Spanish translation strings and canonical identity", () => {
    expect(en.c30eCardHoldExpired.progressLabel).toBe("03 / 04  ·  PAYMENT");
    expect(es.c30eCardHoldExpired.progressLabel).toBe("03 / 04  ·  PAGO");
    expect(en.c30eCardHoldExpired.screenTitle).toBe("Your card hold expired");
    expect(es.c30eCardHoldExpired.screenTitle).toBe("La retención de tu tarjeta venció");
    expect(en.c30eCardHoldExpired.expiredBadge).toBe("HOLD EXPIRED  ·  $0.00 CHARGED");
    expect(es.c30eCardHoldExpired.expiredBadge).toBe("RETENCIÓN VENCIDA  ·  $0.00 COBRADO");
    expect(en.c30eCardHoldExpired.priorHoldValue).toBe("$356.00 USD");
    expect(es.c30eCardHoldExpired.priorHoldValue).toBe("$356.00 USD");
    expect(en.c30eCardHoldExpired.currentChargeValue).toBe("$0.00 (Zero funds deducted)");
    expect(es.c30eCardHoldExpired.currentChargeValue).toBe("$0.00 (Cero fondos deducidos)");
    expect(en.c30eCardHoldExpired.primaryCta).toBe("Re-authorize payment");
    expect(es.c30eCardHoldExpired.primaryCta).toBe("Reautorizar pago");
    expect(en.c30eCardHoldExpired.secondaryCta).toBe("Back to scheduling");
    expect(es.c30eCardHoldExpired.secondaryCta).toBe("Volver a programación");
  });

  it("verifies automatic release details and preserved inventory scope", () => {
    const routeContent = fs.readFileSync(routePath, "utf8");
    expect(routeContent).toContain("c30eCardHoldExpired.expirationNotice");
    expect(routeContent).toContain("getEffectiveConfirmedItems");
    expect(routeContent).toContain("c30eCardHoldExpired.uiNote");
  });
});
