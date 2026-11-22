import fs from "node:fs";
import path from "node:path";
import { enTranslations as en, esTranslations as es } from "@haulix/i18n";

describe("C28 Review Your Booking — English (Node 763:396) & Spanish (Node 766:782)", () => {
  const routePath = path.resolve(__dirname, "../../app/(app)/review-booking.tsx");
  const demoNavigatorPath = path.resolve(__dirname, "../components/demo/DemoScreenNavigator.tsx");

  it("verifies route file existence and demo navigator registration", () => {
    expect(fs.existsSync(routePath)).toBe(true);
    const navContent = fs.readFileSync(demoNavigatorPath, "utf8");
    expect(navContent).toContain('id: "c28-es"');
    expect(navContent).toContain('id: "c28-en"');
    expect(navContent).toContain('route: "/review-booking"');
  });

  it("verifies navigation transitions and edit service time returns to scheduling", () => {
    const routeContent = fs.readFileSync(routePath, "utf8");
    expect(routeContent).toContain('"/select-available-window"');
    expect(routeContent).toContain('"/request-service-asap"');
    expect(routeContent).toContain('"/booking-terms-accepted"');
  });

  it("verifies exact C28 English and Spanish translation strings", () => {
    expect(en.c28ReviewBooking.progressLabel).toBe("02 / 04  ·  TERMS");
    expect(es.c28ReviewBooking.progressLabel).toBe("02 / 04  ·  CONDICIONES");
    expect(en.c28ReviewBooking.screenTitle).toBe("Review your booking");
    expect(es.c28ReviewBooking.screenTitle).toBe("Revisa tu reserva");
    expect(en.c28ReviewBooking.screenSubtitle).toBe(
      "Confirm scope, sample estimate, time and cancellation policy."
    );
    expect(es.c28ReviewBooking.screenSubtitle).toBe(
      "Confirma servicio, presupuesto de ejemplo, horario y condiciones."
    );
    expect(en.c28ReviewBooking.pricingSample).toBe("$356.00");
    expect(es.c28ReviewBooking.pricingSample).toBe("$356.00");
    expect(en.c28ReviewBooking.cancellationPolicy).toBe(
      "Cancellation: conditional $100 post-assignment fee; agreed exceptions apply."
    );
    expect(es.c28ReviewBooking.cancellationPolicy).toBe(
      "Cancelación: posible cargo de $100 tras asignación, sujeto a excepciones aprobadas."
    );
    expect(en.c28ReviewBooking.primaryCta).toBe("Continue to payment");
    expect(es.c28ReviewBooking.primaryCta).toBe("Continuar al pago");
    expect(en.c28ReviewBooking.secondaryCta).toBe("Policy was updated");
    expect(es.c28ReviewBooking.secondaryCta).toBe("Cambió la política");
    expect(en.c28ReviewBooking.alternativeCta).toBe("Edit service time");
    expect(es.c28ReviewBooking.alternativeCta).toBe("Editar horario");
  });

  it("verifies terms consent gating, conditional cancellation fee, and honest disclaimers", () => {
    const routeContent = fs.readFileSync(routePath, "utf8");
    expect(routeContent).toContain("c28ReviewBooking.consentValidationError");
    expect(routeContent).toContain('pathname: "/booking-terms-accepted"');
    expect(routeContent).toContain('pathname: "/booking-terms-changed"');
    expect(routeContent).toContain("c28ReviewBooking.uiNote");
    expect(routeContent).not.toContain("chargeStripePayment");
    expect(routeContent).not.toContain("createLiveBooking");
  });
});
