import fs from "node:fs";
import path from "node:path";
import { enTranslations as en, esTranslations as es } from "@haulix/i18n";

describe("C27-N No Eligible Driver Found — English (Node 763:336) & Spanish (Node 766:722)", () => {
  const routePath = path.resolve(__dirname, "../../app/(app)/no-eligible-driver.tsx");
  const demoNavigatorPath = path.resolve(__dirname, "../components/demo/DemoScreenNavigator.tsx");

  it("verifies route file existence and demo navigator registration", () => {
    expect(fs.existsSync(routePath)).toBe(true);
    const navContent = fs.readFileSync(demoNavigatorPath, "utf8");
    expect(navContent).toContain('id: "c27n-es"');
    expect(navContent).toContain('id: "c27n-en"');
    expect(navContent).toContain('route: "/no-eligible-driver"');
  });

  it("verifies navigation transitions to C27-S, C27, and back to C27-A", () => {
    const routeContent = fs.readFileSync(routePath, "utf8");
    expect(routeContent).toContain('pathname: "/select-available-window"');
    expect(routeContent).toContain('pathname: "/choose-service-time"');
    expect(routeContent).toContain('pathname: "/request-service-asap"');
  });

  it("verifies exact C27-N English and Spanish translation strings", () => {
    expect(en.c27nNoEligibleDriver.progressLabel).toBe("01 / 04  ·  SCHEDULE");
    expect(es.c27nNoEligibleDriver.progressLabel).toBe("01 / 04  ·  HORARIO");
    expect(en.c27nNoEligibleDriver.screenTitle).toBe("No eligible driver found");
    expect(es.c27nNoEligibleDriver.screenTitle).toBe("No hay conductor disponible");
    expect(en.c27nNoEligibleDriver.screenSubtitle).toBe(
      "ASAP service cannot be guaranteed right now."
    );
    expect(es.c27nNoEligibleDriver.screenSubtitle).toBe(
      "No podemos garantizar servicio inmediato ahora."
    );
    expect(en.c27nNoEligibleDriver.primaryCta).toBe("Schedule for later");
    expect(es.c27nNoEligibleDriver.primaryCta).toBe("Programar para después");
    expect(en.c27nNoEligibleDriver.secondaryCta).toBe("Change request");
    expect(es.c27nNoEligibleDriver.secondaryCta).toBe("Modificar solicitud");
    expect(en.c27nNoEligibleDriver.cancelCta).toBe("Cancel without fee");
    expect(es.c27nNoEligibleDriver.cancelCta).toBe("Cancelar sin cargo");
  });

  it("verifies fee-free cancellation routing, no fake drivers, and honest boundary disclaimers", () => {
    const routeContent = fs.readFileSync(routePath, "utf8");
    expect(routeContent).toContain('pathname: "/no-driver-fee-free-cancellation"');
    expect(routeContent).toContain("c27nNoEligibleDriver.uiNote");
    expect(routeContent).not.toContain("chargeCancellationFee");
    expect(routeContent).not.toContain("fakeDriverAssigned");
  });
});
