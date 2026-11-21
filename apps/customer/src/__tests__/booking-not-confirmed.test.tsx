import fs from "node:fs";
import path from "node:path";
import { enTranslations as en, esTranslations as es } from "@haulix/i18n";

describe("C31-F Booking Not Yet Confirmed — English (Node 763:1221) & Spanish (Node 766:1607)", () => {
  const routePath = path.resolve(__dirname, "../../app/(app)/booking-not-confirmed.tsx");
  const demoNavigatorPath = path.resolve(__dirname, "../components/demo/DemoScreenNavigator.tsx");

  it("verifies route file existence and demo navigator registration", () => {
    expect(fs.existsSync(routePath)).toBe(true);
    const navContent = fs.readFileSync(demoNavigatorPath, "utf8");
    expect(navContent).toContain('id: "c31f-es"');
    expect(navContent).toContain('id: "c31f-en"');
    expect(navContent).toContain('route: "/booking-not-confirmed"');
  });

  it("verifies recovery route to C27-S and state recording", () => {
    const routeContent = fs.readFileSync(routePath, "utf8");
    expect(routeContent).toContain('pathname: "/select-available-window"');
    expect(routeContent).toContain("recordBookingNotConfirmed");
    expect(routeContent).toContain("getEffectiveConfirmedItems");
  });

  it("verifies exact C31-F English and Spanish translation strings and semantic meaning", () => {
    expect(en.c31fBookingNotConfirmed.progressLabel).toBe("04 / 04  ·  STATUS PENDING");
    expect(es.c31fBookingNotConfirmed.progressLabel).toBe("04 / 04  ·  ESTADO PENDIENTE");
    expect(en.c31fBookingNotConfirmed.screenTitle).toBe("Booking not yet confirmed");
    expect(es.c31fBookingNotConfirmed.screenTitle).toBe("La reserva aún no está confirmada");
    expect(en.c31fBookingNotConfirmed.statusBadge).toBe("NOT YET CONFIRMED");
    expect(es.c31fBookingNotConfirmed.statusBadge).toBe("AÚN NO CONFIRMADA");
    expect(en.c31fBookingNotConfirmed.primaryCta).toBe("Choose another service window");
    expect(en.c31fBookingNotConfirmed.secondaryCta).toBe("Keep waiting & return to home");
    expect(es.c31fBookingNotConfirmed.primaryCta).toBe("Elegir otra franja horaria");
    expect(es.c31fBookingNotConfirmed.secondaryCta).toBe("Seguir esperando y volver al inicio");
  });

  it("verifies unconfirmed status is not marked as dispatch or payment failure", () => {
    const routeContent = fs.readFileSync(routePath, "utf8");
    expect(routeContent).toContain("c31fBookingNotConfirmed.uiNote");
    expect(routeContent).not.toContain("dispatchFailed");
    expect(routeContent).not.toContain("paymentFailed");
    expect(routeContent).not.toContain("bookingCancelled");
  });
});
