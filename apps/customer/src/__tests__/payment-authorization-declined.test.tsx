import fs from "node:fs";
import path from "node:path";
import { enTranslations as en, esTranslations as es } from "@haulix/i18n";

describe("C30-D Authorization Was Declined — English (Node 763:814) & Spanish (Node 766:1200)", () => {
  const routePath = path.resolve(__dirname, "../../app/(app)/payment-authorization-declined.tsx");
  const demoNavigatorPath = path.resolve(__dirname, "../components/demo/DemoScreenNavigator.tsx");

  it("verifies route file existence and demo navigator registration", () => {
    expect(fs.existsSync(routePath)).toBe(true);
    const navContent = fs.readFileSync(demoNavigatorPath, "utf8");
    expect(navContent).toContain('id: "c30d-es"');
    expect(navContent).toContain('id: "c30d-en"');
    expect(navContent).toContain('route: "/payment-authorization-declined"');
  });

  it("verifies recovery transitions to C29 and C29-M retry", () => {
    const routeContent = fs.readFileSync(routePath, "utf8");
    expect(routeContent).toContain('pathname: "/choose-payment-method"');
    expect(routeContent).toContain('pathname: "/secure-card-setup"');
    expect(routeContent).toContain("recordAuthorizationDeclined");
  });

  it("verifies exact C30-D English and Spanish translation strings and canonical identity", () => {
    expect(en.c30dAuthorizationDeclined.progressLabel).toBe("03 / 04  ·  PAYMENT");
    expect(es.c30dAuthorizationDeclined.progressLabel).toBe("03 / 04  ·  PAGO");
    expect(en.c30dAuthorizationDeclined.screenTitle).toBe("Authorization was declined");
    expect(es.c30dAuthorizationDeclined.screenTitle).toBe("La autorización fue rechazada");
    expect(en.c30dAuthorizationDeclined.declinedBadge).toBe("AUTHORIZATION DECLINED");
    expect(es.c30dAuthorizationDeclined.declinedBadge).toBe("AUTORIZACIÓN RECHAZADA");
    expect(en.c30dAuthorizationDeclined.attemptedAmountValue).toBe("$356.00 USD");
    expect(es.c30dAuthorizationDeclined.attemptedAmountValue).toBe("$356.00 USD");
    expect(en.c30dAuthorizationDeclined.primaryCta).toBe("Try another payment method");
    expect(es.c30dAuthorizationDeclined.primaryCta).toBe("Probar otro método de pago");
    expect(en.c30dAuthorizationDeclined.secondaryCta).toBe("Retry with same card");
    expect(es.c30dAuthorizationDeclined.secondaryCta).toBe("Reintentar con la misma tarjeta");
  });

  it("verifies explicit zero charge statement and preserved inventory scope", () => {
    const routeContent = fs.readFileSync(routePath, "utf8");
    expect(routeContent).toContain("c30dAuthorizationDeclined.noChargeStatement");
    expect(routeContent).toContain("getEffectiveConfirmedItems");
    expect(routeContent).toContain("c30dAuthorizationDeclined.uiNote");
  });
});
