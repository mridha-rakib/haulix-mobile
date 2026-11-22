/**
 * HAULIX Customer Mobile App — Phase 03.45
 * Automated Tests: W05 Batch 2 Frontend Implementation
 *
 * Covers canonical screens:
 * 1. NO_DRIVER: /no-driver-available (Node 844:6070 EN / 844:8220 ES)
 * 2. DRIVER_LATE: /driver-arrival-update (Node 844:5859 EN / 844:8009 ES)
 * 3. REASSIGNED: /driver-reassigned (Node 844:5740 EN / 844:7890 ES)
 * 4. CANCELED: /request-canceled (Node 844:6254 EN / 844:8404 ES)
 */

import fs from "node:fs";
import path from "node:path";
import { enTranslations as en, esTranslations as es } from "@haulix/i18n";
import {
  getW05DispatchState,
  resetDispatchDemo,
  setDispatchPhase,
  W05_DRIVER_LATE_CREW,
  W05_REASSIGNED_CREW,
} from "../fixtures/c32Dispatch";

describe("HAULIX Phase 03.45 — W05 Batch 2 Remaining Dispatch Screens", () => {
  const routesDir = path.resolve(__dirname, "../../app/(app)");
  const demoNavPath = path.resolve(__dirname, "../components/demo/DemoScreenNavigator.tsx");
  const iconsPath = path.resolve(__dirname, "../components/dispatch/C32Icons.tsx");

  beforeEach(() => {
    resetDispatchDemo();
  });

  describe("1. Route Architecture & File Presence", () => {
    const batch2Screens = [
      {
        id: "no-driver",
        file: "no-driver-available.tsx",
        route: "/no-driver-available",
        enNode: "844:6070",
        esNode: "844:8220",
      },
      {
        id: "driver-late",
        file: "driver-arrival-update.tsx",
        route: "/driver-arrival-update",
        enNode: "844:5859",
        esNode: "844:8009",
      },
      {
        id: "reassigned",
        file: "driver-reassigned.tsx",
        route: "/driver-reassigned",
        enNode: "844:5740",
        esNode: "844:7890",
      },
      {
        id: "canceled",
        file: "request-canceled.tsx",
        route: "/request-canceled",
        enNode: "844:6254",
        esNode: "844:8404",
      },
    ];

    it.each(batch2Screens)(
      "confirms screen file exists for $file and exports default component",
      ({ file }) => {
        const filePath = path.join(routesDir, file);
        expect(fs.existsSync(filePath)).toBe(true);
        const content = fs.readFileSync(filePath, "utf8");
        expect(content).toContain("export default function");
      }
    );

    it("verifies DemoScreenNavigator registers all 8 bilingual Batch 2 screen variants", () => {
      const navContent = fs.readFileSync(demoNavPath, "utf8");
      expect(navContent).toContain('id: "w05-no-driver-en"');
      expect(navContent).toContain('id: "w05-no-driver-es"');
      expect(navContent).toContain('id: "w05-driver-late-en"');
      expect(navContent).toContain('id: "w05-driver-late-es"');
      expect(navContent).toContain('id: "w05-reassigned-en"');
      expect(navContent).toContain('id: "w05-reassigned-es"');
      expect(navContent).toContain('id: "w05-canceled-en"');
      expect(navContent).toContain('id: "w05-canceled-es"');

      expect(navContent).toContain('route: "/no-driver-available"');
      expect(navContent).toContain('route: "/driver-arrival-update"');
      expect(navContent).toContain('route: "/driver-reassigned"');
      expect(navContent).toContain('route: "/request-canceled"');
    });
  });

  describe("2. Symmetrical English & Spanish Localization Integrity", () => {
    const namespaces = ["w05NoDriver", "w05DriverLate", "w05Reassigned", "w05Canceled"] as const;

    it.each(namespaces)("confirms namespace %s exists with identical keys in EN and ES", (ns) => {
      const enNs = (en as Record<string, Record<string, string>>)[ns];
      const esNs = (es as Record<string, Record<string, string>>)[ns];

      expect(enNs).toBeDefined();
      expect(esNs).toBeDefined();

      const enKeys = Object.keys(enNs).sort();
      const esKeys = Object.keys(esNs).sort();
      expect(enKeys).toEqual(esKeys);

      for (const key of enKeys) {
        expect(enNs[key].trim().length).toBeGreaterThan(0);
        expect(esNs[key].trim().length).toBeGreaterThan(0);
      }
    });

    it("verifies specific Figma canonical text matches in w05NoDriver", () => {
      expect(en.w05NoDriver.screenTitle).toBe("No driver available");
      expect(es.w05NoDriver.screenTitle).toBe("No hay conductor disponible");
      expect(en.w05NoDriver.statusBadge).toBe("NO MATCH · 50 MI");
      expect(es.w05NoDriver.statusBadge).toBe("SIN COINCIDENCIA · 50 MI");
      expect(en.w05NoDriver.primaryCta).toBe("Reschedule booking");
      expect(es.w05NoDriver.primaryCta).toBe("Reprogramar reserva");
      expect(en.w05NoDriver.secondaryCta).toBe("Cancel with no fee");
      expect(es.w05NoDriver.secondaryCta).toBe("Cancelar sin cargo");
    });

    it("verifies specific Figma canonical text matches in w05DriverLate", () => {
      expect(en.w05DriverLate.screenTitle).toBe("Driver arrival update");
      expect(es.w05DriverLate.screenTitle).toBe("Actualización de llegada");
      expect(en.w05DriverLate.statusBadge).toBe("ARRIVAL DELAY");
      expect(es.w05DriverLate.statusBadge).toBe("DEMORA DE LLEGADA");
      expect(en.w05DriverLate.driverName).toBe("Mike R.");
      expect(en.w05DriverLate.primaryCta).toBe("Check no-show options");
      expect(es.w05DriverLate.primaryCta).toBe("Revisar ausencia");
      expect(en.w05DriverLate.secondaryCta).toBe("View W06 handoff");
      expect(es.w05DriverLate.secondaryCta).toBe("Ver siguiente etapa W06");
    });

    it("verifies specific Figma canonical text matches in w05Reassigned", () => {
      expect(en.w05Reassigned.screenTitle).toBe("Driver reassigned");
      expect(es.w05Reassigned.screenTitle).toBe("Conductor reasignado");
      expect(en.w05Reassigned.statusBadge).toBe("REASSIGNED");
      expect(es.w05Reassigned.statusBadge).toBe("REASIGNADO");
      expect(en.w05Reassigned.driverName).toBe("Sarah L.");
      expect(en.w05Reassigned.primaryCta).toBe("Continue to arrival status");
      expect(es.w05Reassigned.primaryCta).toBe("Continuar a llegada");
      expect(en.w05Reassigned.secondaryCta).toBe("Review driver details");
      expect(es.w05Reassigned.secondaryCta).toBe("Detalles del conductor");
    });

    it("verifies specific Figma canonical text matches in w05Canceled", () => {
      expect(en.w05Canceled.screenTitle).toBe("Request canceled without fee");
      expect(es.w05Canceled.screenTitle).toBe("Solicitud cancelada sin cargo");
      expect(en.w05Canceled.statusBadge).toBe("CANCELED · $0 FEE");
      expect(es.w05Canceled.statusBadge).toBe("CANCELADA · CARGO $0");
      expect(en.w05Canceled.primaryCta).toBe("Schedule another request");
      expect(es.w05Canceled.primaryCta).toBe("Programar otro servicio");
      expect(en.w05Canceled.secondaryCta).toBe("Start new demo search");
      expect(es.w05Canceled.secondaryCta).toBe("Nueva búsqueda demo");
    });
  });

  describe("3. Dispatch State & Crew Fixture Integrity", () => {
    it("verifies Mike R. driver late fixture", () => {
      expect(W05_DRIVER_LATE_CREW.driver.name).toBe("Mike R.");
      expect(W05_DRIVER_LATE_CREW.vehicle.licensePlate).toBe("AZ 7HT-9234");
      expect(W05_DRIVER_LATE_CREW.crewSummaryEn).toContain("helper pending");
    });

    it("verifies Sarah L. reassigned driver fixture", () => {
      expect(W05_REASSIGNED_CREW.driver.name).toBe("Sarah L.");
      expect(W05_REASSIGNED_CREW.vehicle.licensePlate).toBe("AZ 4ML-2308");
      expect(W05_REASSIGNED_CREW.crewSummaryEn).toContain("helper confirmed");
    });

    it("verifies dispatch phase transitions preserve state deterministically", () => {
      setDispatchPhase("no_driver");
      expect(getW05DispatchState().phase).toBe("no_driver");

      setDispatchPhase("driver_late");
      expect(getW05DispatchState().phase).toBe("driver_late");

      setDispatchPhase("reassigned");
      expect(getW05DispatchState().phase).toBe("reassigned");

      setDispatchPhase("canceled");
      expect(getW05DispatchState().phase).toBe("canceled");
    });
  });

  describe("4. Vector Icons & Visual Artifact Verification", () => {
    it("confirms essential dispatch vector icons are available", () => {
      const iconsContent = fs.readFileSync(iconsPath, "utf8");
      expect(iconsContent).toContain("C32AlertTriangleIcon");
      expect(iconsContent).toContain("C32BoxIcon");
      expect(iconsContent).toContain("C32CalendarIcon");
      expect(iconsContent).toContain("C32UsersIcon");
      expect(iconsContent).toContain("C32CheckCircleIcon");
      expect(iconsContent).toContain("C32BellIcon");
    });
  });
});
