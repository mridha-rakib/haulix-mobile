import fs from "node:fs";
import path from "node:path";
import { enTranslations as en, esTranslations as es } from "@haulix/i18n";

describe("C31-S Your Booking Is Recorded — English (Node 763:1089) & Spanish (Node 766:1475)", () => {
  const routePath = path.resolve(__dirname, "../../app/(app)/booking-recorded.tsx");
  const demoNavigatorPath = path.resolve(__dirname, "../components/demo/DemoScreenNavigator.tsx");

  it("verifies route file existence and demo navigator registration", () => {
    expect(fs.existsSync(routePath)).toBe(true);
    const navContent = fs.readFileSync(demoNavigatorPath, "utf8");
    expect(navContent).toContain('id: "c31s-es"');
    expect(navContent).toContain('id: "c31s-en"');
    expect(navContent).toContain('route: "/booking-recorded"');
  });

  it("verifies return to home and state recording", () => {
    const routeContent = fs.readFileSync(routePath, "utf8");
    expect(routeContent).toContain('router.push("/(app)")');
    expect(routeContent).toContain("recordBookingRecorded");
    expect(routeContent).toContain("getEffectiveConfirmedItems");
  });

  it("verifies exact C31-S English and Spanish translation strings and semantic meaning", () => {
    expect(en.c31sBookingRecorded.progressLabel).toBe("04 / 04  ·  BOOKING RECORDED");
    expect(es.c31sBookingRecorded.progressLabel).toBe("04 / 04  ·  RESERVA REGISTRADA");
    expect(en.c31sBookingRecorded.screenTitle).toBe("Your booking is recorded");
    expect(es.c31sBookingRecorded.screenTitle).toBe("Tu reserva está registrada");
    expect(en.c31sBookingRecorded.statusBadge).toBe("BOOKING RECORDED");
    expect(es.c31sBookingRecorded.statusBadge).toBe("RESERVA REGISTRADA");
    expect(en.c31sBookingRecorded.holdAmountValue).toBe("$356.00 USD");
    expect(es.c31sBookingRecorded.holdAmountValue).toBe("$356.00 USD");
    expect(en.c31sBookingRecorded.primaryCta).toBe("View service overview");
    expect(en.c31sBookingRecorded.secondaryCta).toBe("Back to home");
    expect(es.c31sBookingRecorded.primaryCta).toBe("Ver resumen de servicio");
    expect(es.c31sBookingRecorded.secondaryCta).toBe("Volver al inicio");
  });

  it("verifies honest demonstration boundary and zero fake driver assignment", () => {
    const routeContent = fs.readFileSync(routePath, "utf8");
    expect(routeContent).toContain("c31sBookingRecorded.uiNote");
    expect(routeContent).not.toContain("driverAssigned: true");
    expect(routeContent).not.toContain("createLiveBooking");
    expect(routeContent).not.toContain("capturePayment");
  });
});
