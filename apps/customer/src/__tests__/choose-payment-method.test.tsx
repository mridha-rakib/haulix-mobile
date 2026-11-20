import fs from "node:fs";
import path from "node:path";
import { enTranslations as en, esTranslations as es } from "@haulix/i18n";

describe("C29 Choose Payment Method — English (Node 763:605) & Spanish (Node 766:991)", () => {
  const routePath = path.resolve(__dirname, "../../app/(app)/choose-payment-method.tsx");
  const demoNavigatorPath = path.resolve(__dirname, "../components/demo/DemoScreenNavigator.tsx");

  it("verifies route file existence and demo navigator registration", () => {
    expect(fs.existsSync(routePath)).toBe(true);
    const navContent = fs.readFileSync(demoNavigatorPath, "utf8");
    expect(navContent).toContain('id: "c29-es"');
    expect(navContent).toContain('id: "c29-en"');
    expect(navContent).toContain('route: "/choose-payment-method"');
  });

  it("verifies navigation transitions to C29-M and back to C28-C", () => {
    const routeContent = fs.readFileSync(routePath, "utf8");
    expect(routeContent).toContain('pathname: "/secure-card-setup"');
    expect(routeContent).toContain('pathname: "/booking-terms-accepted"');
    expect(routeContent).toContain("selectPaymentMethod");
  });

  it("verifies exact C29 English and Spanish translation strings", () => {
    expect(en.c29ChoosePaymentMethod.progressLabel).toBe("03 / 04  ·  PAYMENT");
    expect(es.c29ChoosePaymentMethod.progressLabel).toBe("03 / 04  ·  PAGO");
    expect(en.c29ChoosePaymentMethod.screenTitle).toBe("Choose payment method");
    expect(es.c29ChoosePaymentMethod.screenTitle).toBe("Elige el método de pago");
    expect(en.c29ChoosePaymentMethod.amountBadge).toBe("HOLD ONLY");
    expect(es.c29ChoosePaymentMethod.amountBadge).toBe("SOLO RETENCIÓN");
    expect(en.c29ChoosePaymentMethod.totalAmount).toBe("$356.00");
    expect(es.c29ChoosePaymentMethod.totalAmount).toBe("$356.00");
    expect(en.c29ChoosePaymentMethod.primaryCta).toBe("Continue with card");
    expect(es.c29ChoosePaymentMethod.primaryCta).toBe("Continuar con tarjeta");
    expect(en.c29ChoosePaymentMethod.secondaryCta).toBe("Review terms again");
    expect(es.c29ChoosePaymentMethod.secondaryCta).toBe("Revisar condiciones");
  });

  it("verifies secure handoff disclosures, no credit card storage, and honest boundary disclaimers", () => {
    const routeContent = fs.readFileSync(routePath, "utf8");
    expect(routeContent).toContain("c29ChoosePaymentMethod.uiNote");
    expect(routeContent).not.toContain("chargeStripePayment");
    expect(routeContent).not.toContain("storeCardCredentials");
  });
});
