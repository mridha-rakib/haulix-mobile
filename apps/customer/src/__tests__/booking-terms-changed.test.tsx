import fs from "node:fs";
import path from "node:path";
import { enTranslations as en, esTranslations as es } from "@haulix/i18n";

describe("C28-U Booking Terms Changed — English (Node 763:536) & Spanish (Node 766:922)", () => {
  const routePath = path.resolve(__dirname, "../../app/(app)/booking-terms-changed.tsx");
  const demoNavigatorPath = path.resolve(__dirname, "../components/demo/DemoScreenNavigator.tsx");

  it("verifies route file existence and demo navigator registration", () => {
    expect(fs.existsSync(routePath)).toBe(true);
    const navContent = fs.readFileSync(demoNavigatorPath, "utf8");
    expect(navContent).toContain('id: "c28u-es"');
    expect(navContent).toContain('id: "c28u-en"');
    expect(navContent).toContain('route: "/booking-terms-changed"');
  });

  it("verifies navigation transitions and consent invalidation return to C28", () => {
    const routeContent = fs.readFileSync(routePath, "utf8");
    expect(routeContent).toContain('pathname: "/review-booking"');
    expect(routeContent).toContain('pathname: "/select-available-window"');
    expect(routeContent).toContain("invalidateTermsConsent");
  });

  it("verifies exact C28-U English and Spanish translation strings", () => {
    expect(en.c28uBookingTermsChanged.progressLabel).toBe("02 / 04  ·  TERMS");
    expect(es.c28uBookingTermsChanged.progressLabel).toBe("02 / 04  ·  CONDICIONES");
    expect(en.c28uBookingTermsChanged.screenTitle).toBe("Booking terms have changed");
    expect(es.c28uBookingTermsChanged.screenTitle).toBe("Las condiciones de reserva han cambiado");
    expect(en.c28uBookingTermsChanged.warningBadge).toBe("TERMS UPDATED (v2)");
    expect(es.c28uBookingTermsChanged.warningBadge).toBe("CONDICIONES ACTUALIZADAS (v2)");
    expect(en.c28uBookingTermsChanged.estimateValue).toBe("$356.00");
    expect(es.c28uBookingTermsChanged.estimateValue).toBe("$356.00");
    expect(en.c28uBookingTermsChanged.primaryCta).toBe("Review updated terms");
    expect(es.c28uBookingTermsChanged.primaryCta).toBe("Revisar condiciones actualizadas");
    expect(en.c28uBookingTermsChanged.secondaryCta).toBe("Back to scheduling");
    expect(es.c28uBookingTermsChanged.secondaryCta).toBe("Volver a programación");
  });

  it("verifies terms invalidation protocol, honest disclaimers, and safe simulation boundaries", () => {
    const routeContent = fs.readFileSync(routePath, "utf8");
    expect(routeContent).toContain("c28uBookingTermsChanged.uiNote");
    expect(routeContent).not.toContain("chargeStripePayment");
    expect(routeContent).not.toContain("createLiveBooking");
  });
});
