import fs from "node:fs";
import path from "node:path";
import { enTranslations as en, esTranslations as es } from "@haulix/i18n";

describe("C27-A Request Service ASAP — English (Node 763:71) & Spanish (Node 766:457)", () => {
  const routePath = path.resolve(__dirname, "../../app/(app)/request-service-asap.tsx");
  const demoNavigatorPath = path.resolve(__dirname, "../components/demo/DemoScreenNavigator.tsx");

  it("verifies route file existence and demo navigator registration", () => {
    expect(fs.existsSync(routePath)).toBe(true);
    const navContent = fs.readFileSync(demoNavigatorPath, "utf8");
    expect(navContent).toContain('id: "c27a-es"');
    expect(navContent).toContain('id: "c27a-en"');
    expect(navContent).toContain('route: "/request-service-asap"');
  });

  it("verifies navigation transitions to C28 Booking Review and back to C27", () => {
    const routeContent = fs.readFileSync(routePath, "utf8");
    expect(routeContent).toContain('pathname: "/review-booking"');
    expect(routeContent).toContain('pathname: "/choose-service-time"');
    expect(routeContent).toContain('pathname: "/select-available-window"');
    expect(routeContent).toContain('pathname: "/no-eligible-driver"');
  });

  it("verifies exact C27-A English and Spanish translation strings", () => {
    expect(en.c27aRequestServiceAsap.progressLabel).toBe("01 / 04  ·  SCHEDULE");
    expect(es.c27aRequestServiceAsap.progressLabel).toBe("01 / 04  ·  HORARIO");
    expect(en.c27aRequestServiceAsap.screenTitle).toBe("Request service ASAP");
    expect(es.c27aRequestServiceAsap.screenTitle).toBe("Solicitar servicio cuanto antes");
    expect(en.c27aRequestServiceAsap.screenSubtitle).toBe(
      "A nearby verified driver must be eligible and online."
    );
    expect(es.c27aRequestServiceAsap.screenSubtitle).toBe(
      "Debe haber un conductor verificado, apto y disponible."
    );
    expect(en.c27aRequestServiceAsap.primaryCta).toBe("Continue if available");
    expect(es.c27aRequestServiceAsap.primaryCta).toBe("Continuar si hay disponibilidad");
    expect(en.c27aRequestServiceAsap.secondaryCta).toBe("No driver available");
    expect(es.c27aRequestServiceAsap.secondaryCta).toBe("No hay conductor");
    expect(en.c27aRequestServiceAsap.alternativeCta).toBe("Change timing");
    expect(es.c27aRequestServiceAsap.alternativeCta).toBe("Cambiar horario");
  });

  it("verifies ASAP eligibility notice, no-driver exception handling, and honest disclaimers", () => {
    const routeContent = fs.readFileSync(routePath, "utf8");
    expect(routeContent).toContain("c27aRequestServiceAsap.asapEligibility");
    expect(routeContent).toContain('pathname: "/no-eligible-driver"');
    expect(routeContent).toContain("c27aRequestServiceAsap.uiNote");
    expect(routeContent).not.toContain("dispatchDriver");
    expect(routeContent).not.toContain("guaranteedArrivalTime");
  });
});
