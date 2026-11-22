import fs from "node:fs";
import path from "node:path";
import { enTranslations as en, esTranslations as es } from "@haulix/i18n";

describe("C31-P Checking Booking Status — English (Node 763:1021) & Spanish (Node 766:1407)", () => {
  const routePath = path.resolve(__dirname, "../../app/(app)/checking-booking-status.tsx");
  const demoNavigatorPath = path.resolve(__dirname, "../components/demo/DemoScreenNavigator.tsx");

  it("verifies route file existence and demo navigator registration", () => {
    expect(fs.existsSync(routePath)).toBe(true);
    const navContent = fs.readFileSync(demoNavigatorPath, "utf8");
    expect(navContent).toContain('id: "c31p-es"');
    expect(navContent).toContain('id: "c31p-en"');
    expect(navContent).toContain('route: "/checking-booking-status"');
  });

  it("verifies navigation return to home and record booking checking state", () => {
    const routeContent = fs.readFileSync(routePath, "utf8");
    expect(routeContent).toContain('router.push("/(app)")');
    expect(routeContent).toContain('pathname: "/booking-recorded"');
    expect(routeContent).toContain('pathname: "/asap-request-recorded"');
    expect(routeContent).toContain('pathname: "/booking-not-confirmed"');
    expect(routeContent).toContain("recordBookingStatusChecking");
  });

  it("verifies exact C31-P English and Spanish translation strings", () => {
    expect(en.c31pCheckingBookingStatus.progressLabel).toBe("04 / 04  ·  CONFIRMATION");
    expect(es.c31pCheckingBookingStatus.progressLabel).toBe("04 / 04  ·  CONFIRMACIÓN");
    expect(en.c31pCheckingBookingStatus.screenTitle).toBe("Checking booking status");
    expect(es.c31pCheckingBookingStatus.screenTitle).toBe("Verificando estado de la reserva");
    expect(en.c31pCheckingBookingStatus.statusBadge).toBe("VERIFYING REQUEST");
    expect(es.c31pCheckingBookingStatus.statusBadge).toBe("VERIFICANDO SOLICITUD");
    expect(en.c31pCheckingBookingStatus.bookingRefValue).toBe("HX-DEMO-1027");
    expect(es.c31pCheckingBookingStatus.bookingRefValue).toBe("HX-DEMO-1027");
    expect(en.c31pCheckingBookingStatus.quoteValue).toBe("$356.00 USD");
    expect(es.c31pCheckingBookingStatus.quoteValue).toBe("$356.00 USD");
    expect(en.c31pCheckingBookingStatus.primaryCta).toBe("Back to home");
    expect(es.c31pCheckingBookingStatus.primaryCta).toBe("Volver al inicio");
  });

  it("verifies zero mock polling, zero backend mutation, and demonstration roadmap notice", () => {
    const routeContent = fs.readFileSync(routePath, "utf8");
    expect(routeContent).toContain("c31pCheckingBookingStatus.roadmapNoticeBody");
    expect(routeContent).toContain("c31pCheckingBookingStatus.uiNote");
    expect(routeContent).not.toContain("fetchBookingStatus");
    expect(routeContent).not.toContain("createBooking");
    expect(routeContent).not.toContain("dispatchDriver");
  });
});
