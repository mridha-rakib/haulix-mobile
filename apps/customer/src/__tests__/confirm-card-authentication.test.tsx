import fs from "node:fs";
import path from "node:path";
import { enTranslations as en, esTranslations as es } from "@haulix/i18n";

describe("C29-3D Confirm Card Authentication — English (Node 763:676) & Spanish (Node 766:1062)", () => {
  const routePath = path.resolve(__dirname, "../../app/(app)/confirm-card-authentication.tsx");
  const demoNavigatorPath = path.resolve(__dirname, "../components/demo/DemoScreenNavigator.tsx");

  it("verifies route file existence and demo navigator registration", () => {
    expect(fs.existsSync(routePath)).toBe(true);
    const navContent = fs.readFileSync(demoNavigatorPath, "utf8");
    expect(navContent).toContain('id: "c29_3d-es"');
    expect(navContent).toContain('id: "c29_3d-en"');
    expect(navContent).toContain('route: "/confirm-card-authentication"');
  });

  it("verifies navigation transitions to C29-P and cancellation return to C29", () => {
    const routeContent = fs.readFileSync(routePath, "utf8");
    expect(routeContent).toContain('pathname: "/payment-authorization-pending"');
    expect(routeContent).toContain('pathname: "/choose-payment-method"');
    expect(routeContent).toContain("recordCardAuthenticationRequired");
  });

  it("verifies exact C29-3D English and Spanish translation strings", () => {
    expect(en.c29_3dCardAuthentication.progressLabel).toBe("03 / 04  ·  PAYMENT");
    expect(es.c29_3dCardAuthentication.progressLabel).toBe("03 / 04  ·  PAGO");
    expect(en.c29_3dCardAuthentication.screenTitle).toBe("Confirm your card authentication");
    expect(es.c29_3dCardAuthentication.screenTitle).toBe("Confirma la autenticación de tu tarjeta");
    expect(en.c29_3dCardAuthentication.securityBadge).toBe(
      "3D SECURE 2.0  ·  ISSUER AUTHENTICATION"
    );
    expect(es.c29_3dCardAuthentication.securityBadge).toBe(
      "3D SECURE 2.0  ·  AUTENTICACIÓN DEL EMISOR"
    );
    expect(en.c29_3dCardAuthentication.holdAmountValue).toBe("$356.00 USD");
    expect(es.c29_3dCardAuthentication.holdAmountValue).toBe("$356.00 USD");
    expect(en.c29_3dCardAuthentication.primaryCta).toBe("Simulate successful authentication");
    expect(es.c29_3dCardAuthentication.primaryCta).toBe("Simular autenticación exitosa");
    expect(en.c29_3dCardAuthentication.secondaryCta).toBe("Cancel and return to payment methods");
    expect(es.c29_3dCardAuthentication.secondaryCta).toBe("Cancelar y volver a métodos de pago");
  });

  it("verifies zero sensitive data collection (no PAN, CVV, OTP inputs)", () => {
    const routeContent = fs.readFileSync(routePath, "utf8");
    expect(routeContent).toContain("c29_3dCardAuthentication.uiNote");
    expect(routeContent).not.toContain("TextInput");
    expect(routeContent).not.toContain("saveCardData");
    expect(routeContent).not.toContain("otpInput");
  });
});
