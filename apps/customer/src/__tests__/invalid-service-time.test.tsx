import fs from "node:fs";
import path from "node:path";
import { enTranslations as en, esTranslations as es } from "@haulix/i18n";

describe("C27-V Invalid Same-Day Service Time — English (Node 763:202) & Spanish (Node 766:588)", () => {
  const routePath = path.resolve(__dirname, "../../app/(app)/invalid-service-time.tsx");
  const demoNavigatorPath = path.resolve(__dirname, "../components/demo/DemoScreenNavigator.tsx");

  it("verifies route file existence and demo navigator registration", () => {
    expect(fs.existsSync(routePath)).toBe(true);
    const navContent = fs.readFileSync(demoNavigatorPath, "utf8");
    expect(navContent).toContain('id: "c27v-es"');
    expect(navContent).toContain('id: "c27v-en"');
    expect(navContent).toContain('route: "/invalid-service-time"');
  });

  it("verifies navigation transitions back to C27-S and C27", () => {
    const routeContent = fs.readFileSync(routePath, "utf8");
    expect(routeContent).toContain('pathname: "/select-available-window"');
    expect(routeContent).toContain('pathname: "/choose-service-time"');
  });

  it("verifies exact C27-V English and Spanish translation strings", () => {
    expect(en.c27vInvalidServiceTime.progressLabel).toBe("01 / 04  ·  SCHEDULE");
    expect(es.c27vInvalidServiceTime.progressLabel).toBe("01 / 04  ·  HORARIO");
    expect(en.c27vInvalidServiceTime.screenTitle).toBe("This time is too soon");
    expect(es.c27vInvalidServiceTime.screenTitle).toBe("La hora elegida es muy próxima");
    expect(en.c27vInvalidServiceTime.screenSubtitle).toBe(
      "Same-day scheduled service needs 60 minutes' initial notice."
    );
    expect(es.c27vInvalidServiceTime.screenSubtitle).toBe(
      "Los servicios de hoy requieren 60 minutos de anticipación."
    );
    expect(en.c27vInvalidServiceTime.statusBadge).toBe("NOT AVAILABLE");
    expect(es.c27vInvalidServiceTime.statusBadge).toBe("NO DISPONIBLE");
    expect(en.c27vInvalidServiceTime.noticeHeading).toBe("AVAILABILITY CHECK");
    expect(es.c27vInvalidServiceTime.noticeHeading).toBe("VALIDAR DISPONIBILIDAD");
    expect(en.c27vInvalidServiceTime.primaryCta).toBe("Select another time");
    expect(es.c27vInvalidServiceTime.primaryCta).toBe("Elegir otra hora");
    expect(en.c27vInvalidServiceTime.secondaryCta).toBe("Back to timing");
    expect(es.c27vInvalidServiceTime.secondaryCta).toBe("Volver a horarios");
  });

  it("verifies 60-minute notice policy disclosures, active draft preservation, and non-fabrication disclaimers", () => {
    const routeContent = fs.readFileSync(routePath, "utf8");
    expect(routeContent).toContain("c27vInvalidServiceTime.noticeHeading");
    expect(routeContent).toContain("c27vInvalidServiceTime.uiNote");
    expect(routeContent).not.toContain("reserveSlotLive");
    expect(routeContent).not.toContain("bypassNoticeRule");
  });
});
