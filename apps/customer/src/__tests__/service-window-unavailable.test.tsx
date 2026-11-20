import fs from "node:fs";
import path from "node:path";
import { enTranslations as en, esTranslations as es } from "@haulix/i18n";

describe("C27-R Service Window Unavailable — English (Node 763:269) & Spanish (Node 766:655)", () => {
  const routePath = path.resolve(__dirname, "../../app/(app)/service-window-unavailable.tsx");
  const demoNavigatorPath = path.resolve(__dirname, "../components/demo/DemoScreenNavigator.tsx");

  it("verifies route file existence and demo navigator registration", () => {
    expect(fs.existsSync(routePath)).toBe(true);
    const navContent = fs.readFileSync(demoNavigatorPath, "utf8");
    expect(navContent).toContain('id: "c27r-es"');
    expect(navContent).toContain('id: "c27r-en"');
    expect(navContent).toContain('route: "/service-window-unavailable"');
  });

  it("verifies navigation transitions to C27-S and C27-A", () => {
    const routeContent = fs.readFileSync(routePath, "utf8");
    expect(routeContent).toContain('pathname: "/select-available-window"');
    expect(routeContent).toContain('pathname: "/request-service-asap"');
  });

  it("verifies exact C27-R English and Spanish translation strings", () => {
    expect(en.c27rServiceWindowUnavailable.progressLabel).toBe("01 / 04  ·  SCHEDULE");
    expect(es.c27rServiceWindowUnavailable.progressLabel).toBe("01 / 04  ·  HORARIO");
    expect(en.c27rServiceWindowUnavailable.screenTitle).toBe("That slot is no longer available");
    expect(es.c27rServiceWindowUnavailable.screenTitle).toBe("Ese horario ya no está disponible");
    expect(en.c27rServiceWindowUnavailable.screenSubtitle).toBe(
      "Driver availability may change before booking."
    );
    expect(es.c27rServiceWindowUnavailable.screenSubtitle).toBe(
      "La disponibilidad de conductores puede cambiar antes de reservar."
    );
    expect(en.c27rServiceWindowUnavailable.primaryCta).toBe("Refresh available times");
    expect(es.c27rServiceWindowUnavailable.primaryCta).toBe("Actualizar horarios");
    expect(en.c27rServiceWindowUnavailable.secondaryCta).toBe("Check ASAP option");
    expect(es.c27rServiceWindowUnavailable.secondaryCta).toBe("Consultar servicio inmediato");
  });

  it("verifies stale slot blocking, active draft preservation, and non-fabrication disclaimers", () => {
    const routeContent = fs.readFileSync(routePath, "utf8");
    expect(routeContent).toContain("c27rServiceWindowUnavailable.noticeHeading");
    expect(routeContent).toContain("c27rServiceWindowUnavailable.uiNote");
    expect(routeContent).not.toContain("forceHoldSlot");
    expect(routeContent).not.toContain("simulateRealtimeBooking");
  });
});
