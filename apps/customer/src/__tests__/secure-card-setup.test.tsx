import fs from "node:fs";
import path from "node:path";
import { enTranslations as en, esTranslations as es } from "@haulix/i18n";

describe("C29-M Secure Card Setup — English (Node 814:4531) & Spanish (Node 814:4604)", () => {
  const routePath = path.resolve(__dirname, "../../app/(app)/secure-card-setup.tsx");
  const demoNavigatorPath = path.resolve(__dirname, "../components/demo/DemoScreenNavigator.tsx");

  it("verifies route file existence and demo navigator registration", () => {
    expect(fs.existsSync(routePath)).toBe(true);
    const navContent = fs.readFileSync(demoNavigatorPath, "utf8");
    expect(navContent).toContain('id: "c29m-es"');
    expect(navContent).toContain('id: "c29m-en"');
    expect(navContent).toContain('route: "/secure-card-setup"');
  });

  it("verifies navigation transitions to C29-3D authentication and provider handoff return to C29", () => {
    const routeContent = fs.readFileSync(routePath, "utf8");
    expect(routeContent).toContain('pathname: "/confirm-card-authentication"');
    expect(routeContent).toContain('pathname: "/choose-payment-method"');
    expect(routeContent).toContain("recordSecureCardSetupDemo");
  });

  it("verifies exact C29-M English and Spanish translation strings", () => {
    expect(en.c29mSecureCardSetup.progressLabel).toBe("03 / 04  ·  PAYMENT");
    expect(es.c29mSecureCardSetup.progressLabel).toBe("03 / 04  ·  PAGO");
    expect(en.c29mSecureCardSetup.screenTitle).toBe("Secure card setup");
    expect(es.c29mSecureCardSetup.screenTitle).toBe("Configuración segura de tarjeta");
    expect(en.c29mSecureCardSetup.securityBadge).toBe("256-BIT ENCRYPTION · SECURE HANDOFF");
    expect(es.c29mSecureCardSetup.securityBadge).toBe("ENCRIPTACIÓN DE 256 BITS · PASARELA SEGURA");
    expect(en.c29mSecureCardSetup.authAmountValue).toBe("$356.00 USD");
    expect(es.c29mSecureCardSetup.authAmountValue).toBe("$356.00 USD");
    expect(en.c29mSecureCardSetup.primaryCta).toBe("Simulate secure authorization");
    expect(es.c29mSecureCardSetup.primaryCta).toBe("Simular autorización segura");
    expect(en.c29mSecureCardSetup.secondaryCta).toBe("Change payment method");
    expect(es.c29mSecureCardSetup.secondaryCta).toBe("Cambiar método de pago");
  });

  it("verifies non-interactive card representation, zero sensitive data storage, and security disclaimers", () => {
    const routeContent = fs.readFileSync(routePath, "utf8");
    expect(routeContent).toContain("c29mSecureCardSetup.uiNote");
    expect(routeContent).not.toContain("TextInput");
    expect(routeContent).not.toContain("saveCardData");
    expect(routeContent).not.toContain("cvvInput");
  });
});
