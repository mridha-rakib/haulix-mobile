import fs from "node:fs";
import path from "node:path";
import { enTranslations as en, esTranslations as es } from "@haulix/i18n";

describe("C28-C Terms Accepted for This Quote — English (Node 763:467) & Spanish (Node 766:853)", () => {
  const routePath = path.resolve(__dirname, "../../app/(app)/booking-terms-accepted.tsx");
  const demoNavigatorPath = path.resolve(__dirname, "../components/demo/DemoScreenNavigator.tsx");

  it("verifies route file existence and demo navigator registration", () => {
    expect(fs.existsSync(routePath)).toBe(true);
    const navContent = fs.readFileSync(demoNavigatorPath, "utf8");
    expect(navContent).toContain('id: "c28c-es"');
    expect(navContent).toContain('id: "c28c-en"');
    expect(navContent).toContain('route: "/booking-terms-accepted"');
  });

  it("verifies navigation transitions back to C28", () => {
    const routeContent = fs.readFileSync(routePath, "utf8");
    expect(routeContent).toContain('pathname: "/review-booking"');
  });

  it("verifies exact C28-C English and Spanish translation strings", () => {
    expect(en.c28cBookingTermsAccepted.progressLabel).toBe("02 / 04  ·  TERMS");
    expect(es.c28cBookingTermsAccepted.progressLabel).toBe("02 / 04  ·  CONDICIONES");
    expect(en.c28cBookingTermsAccepted.screenTitle).toBe("Terms accepted for this quote");
    expect(es.c28cBookingTermsAccepted.screenTitle).toBe(
      "Condiciones aceptadas para esta cotización"
    );
    expect(en.c28cBookingTermsAccepted.screenSubtitle).toBe(
      "Consent is specific to the displayed quote and policy version."
    );
    expect(es.c28cBookingTermsAccepted.screenSubtitle).toBe(
      "El consentimiento corresponde a la cotización y versión de términos mostradas."
    );
    expect(en.c28cBookingTermsAccepted.pendingBadge).toBe("PENDING");
    expect(es.c28cBookingTermsAccepted.pendingBadge).toBe("PENDIENTE");
    expect(en.c28cBookingTermsAccepted.pricingSample).toBe("$356.00");
    expect(es.c28cBookingTermsAccepted.pricingSample).toBe("$356.00");
    expect(en.c28cBookingTermsAccepted.consentText).toBe(
      "I have read and agree to the displayed booking and cancellation terms."
    );
    expect(es.c28cBookingTermsAccepted.consentText).toBe(
      "He leído y acepto las condiciones de reserva y cancelación que se muestran."
    );
    expect(en.c28cBookingTermsAccepted.primaryCta).toBe("Continue to secure payment");
    expect(es.c28cBookingTermsAccepted.primaryCta).toBe("Continuar al pago seguro");
    expect(en.c28cBookingTermsAccepted.secondaryCta).toBe("Review terms again");
    expect(es.c28cBookingTermsAccepted.secondaryCta).toBe("Revisar condiciones");
  });

  it("verifies explicit terms consent state, payment handoff boundary, and non-fabrication disclaimers", () => {
    const routeContent = fs.readFileSync(routePath, "utf8");
    expect(routeContent).toContain("c28cBookingTermsAccepted.futureNoticePaymentHandoff");
    expect(routeContent).toContain("c28cBookingTermsAccepted.uiNote");
    expect(routeContent).not.toContain("chargeStripePayment");
    expect(routeContent).not.toContain("createLiveBooking");
  });
});
