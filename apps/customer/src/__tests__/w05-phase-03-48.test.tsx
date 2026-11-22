import fs from "node:fs";
import path from "node:path";

jest.mock("react-native-svg", () => {
  const React = require("react");
  const Component = (props: any) => React.createElement("svg-mock", props);
  return {
    __esModule: true,
    default: Component,
    Svg: Component,
    Circle: Component,
    Defs: Component,
    G: Component,
    Line: Component,
    Path: Component,
    Pattern: Component,
    Polygon: Component,
    Polyline: Component,
    Rect: Component,
    Text: Component,
  };
});

import { enTranslations as en, esTranslations as es } from "@haulix/i18n";
import { getW05DispatchState, resetDispatchDemo } from "../fixtures/c32Dispatch";

describe("HAULIX Phase 03.48 — W05 Batch 4 Canonical States & Unrestricted Frontend Routing", () => {
  const routesDir = path.resolve(__dirname, "../../app/(app)");
  const demoNavPath = path.resolve(__dirname, "../components/demo/DemoScreenNavigator.tsx");

  beforeEach(() => {
    resetDispatchDemo();
  });

  describe("1. Unrestricted Frontend Routing & File Existence", () => {
    const batch4Screens = [
      {
        file: "driver-offer-pending.tsx",
        route: "/driver-offer-pending",
        testID: "w05-accept-pending-screen",
      },
      {
        file: "driver-profile-details.tsx",
        route: "/driver-profile-details",
        testID: "w05-driver-details-screen",
      },
      {
        file: "helper-matching.tsx",
        route: "/helper-matching",
        testID: "w05-helper-pending-screen",
      },
      {
        file: "dispatch-retry.tsx",
        route: "/dispatch-retry",
        testID: "w05-dispatch-retry-screen",
      },
    ];

    it("verifies all four Batch 4 screen files exist with export default", () => {
      for (const item of batch4Screens) {
        const filePath = path.join(routesDir, item.file);
        expect(fs.existsSync(filePath)).toBe(true);
        const content = fs.readFileSync(filePath, "utf8");
        expect(content).toContain("export default function");
        expect(content).toContain(item.testID);
      }
    });

    it("verifies zero authentication, payment, or dispatch prerequisite guards exist", () => {
      for (const item of batch4Screens) {
        const filePath = path.join(routesDir, item.file);
        const content = fs.readFileSync(filePath, "utf8");
        expect(content).not.toMatch(/if\s*\(!isAuthenticated\)/);
        expect(content).not.toMatch(/if\s*\(!hasBooking\)/);
        expect(content).not.toMatch(/router\.replace\(['"]\/(auth|login)/);
        expect(content).not.toMatch(/router\.replace\(['"]\/(sign-in)/);
      }
    });

    it("verifies hardware back button handling with BackHandler in all screens", () => {
      for (const item of batch4Screens) {
        const filePath = path.join(routesDir, item.file);
        const content = fs.readFileSync(filePath, "utf8");
        expect(content).toContain("BackHandler.addEventListener");
        expect(content).toContain("hardwareBackPress");
      }
    });
  });

  describe("2. QA Navigator Registration (8 Entries)", () => {
    it("verifies all 8 EN/ES entries are registered in DemoScreenNavigator", () => {
      const navContent = fs.readFileSync(demoNavPath, "utf8");

      const expectedEntries = [
        {
          id: "w05-accept-pending-es",
          route: "/driver-offer-pending",
          locale: "es",
          node: "844:7216",
        },
        {
          id: "w05-accept-pending-en",
          route: "/driver-offer-pending",
          locale: "en",
          node: "844:5066",
        },
        {
          id: "w05-driver-details-es",
          route: "/driver-profile-details",
          locale: "es",
          node: "844:7434",
        },
        {
          id: "w05-driver-details-en",
          route: "/driver-profile-details",
          locale: "en",
          node: "844:5284",
        },
        {
          id: "w05-helper-matching-es",
          route: "/helper-matching",
          locale: "es",
          node: "844:7553",
        },
        {
          id: "w05-helper-matching-en",
          route: "/helper-matching",
          locale: "en",
          node: "844:5403",
        },
        {
          id: "w05-dispatch-retry-es",
          route: "/dispatch-retry",
          locale: "es",
          node: "844:7791",
        },
        {
          id: "w05-dispatch-retry-en",
          route: "/dispatch-retry",
          locale: "en",
          node: "844:5641",
        },
      ];

      for (const entry of expectedEntries) {
        expect(navContent).toContain(`id: "${entry.id}"`);
        expect(navContent).toContain(`route: "${entry.route}"`);
        expect(navContent).toContain(`locale: "${entry.locale}"`);
        expect(navContent).toContain(entry.node);
      }
    });
  });

  describe("3. Bilingual Localization Parity & Integrity", () => {
    const w05Sections = [
      "w05AcceptPending",
      "w05DriverDetails",
      "w05HelperPending",
      "w05Restart",
    ] as const;

    it("confirms complete structural symmetry between EN and ES dictionaries", () => {
      for (const section of w05Sections) {
        const enKeys = Object.keys((en as any)[section]).sort();
        const esKeys = Object.keys((es as any)[section]).sort();

        expect(enKeys).toEqual(esKeys);
        expect(enKeys.length).toBeGreaterThan(15);

        // Verify no empty values
        for (const key of enKeys) {
          const enVal = (en as any)[section][key];
          const esVal = (es as any)[section][key];
          expect(typeof enVal).toBe("string");
          expect(typeof esVal).toBe("string");
          expect(enVal.trim().length).toBeGreaterThan(0);
          expect(esVal.trim().length).toBeGreaterThan(0);
        }
      }
    });

    it("confirms exact authentic Figma strings", () => {
      // ACCEPT_PENDING
      expect(en.w05AcceptPending.screenTitle).toBe("Awaiting valid driver acceptance");
      expect(es.w05AcceptPending.screenTitle).toBe("Esperando aceptación válida");
      expect(en.w05AcceptPending.statusBadge).toBe("ACCEPTANCE PENDING");
      expect(es.w05AcceptPending.statusBadge).toBe("ACEPTACIÓN PENDIENTE");
      expect(en.w05AcceptPending.primaryCta).toBe("Demo: valid driver accepts");
      expect(es.w05AcceptPending.primaryCta).toBe("Demo: acepta el conductor");

      // DRIVER_DETAILS
      expect(en.w05DriverDetails.screenTitle).toBe("Your verified driver");
      expect(es.w05DriverDetails.screenTitle).toBe("Tu conductor verificado");
      expect(en.w05DriverDetails.statusBadge).toBe("DRIVER DETAILS");
      expect(es.w05DriverDetails.statusBadge).toBe("DATOS DEL CONDUCTOR");
      expect(en.w05DriverDetails.driverName).toBe("Mike R.");
      expect(en.w05DriverDetails.vehicleValue).toBe("White cargo van · AZ 7HT-9234");
      expect(es.w05DriverDetails.vehicleValue).toBe("Furgoneta blanca · AZ 7HT-9234");

      // HELPER_PENDING
      expect(en.w05HelperPending.screenTitle).toBe("Waiting for helper confirmation");
      expect(es.w05HelperPending.screenTitle).toBe("Esperando confirmación del ayudante");
      expect(en.w05HelperPending.statusBadge).toBe("CREW PENDING");
      expect(es.w05HelperPending.statusBadge).toBe("EQUIPO PENDIENTE");

      // RESTART
      expect(en.w05Restart.screenTitle).toBe("Finding a replacement driver");
      expect(es.w05Restart.screenTitle).toBe("Buscando conductor sustituto");
      expect(en.w05Restart.statusBadge).toBe("REASSIGNING");
      expect(es.w05Restart.statusBadge).toBe("REASIGNANDO");
    });
  });

  describe("4. Fixture & Mathematical Geometry Integrity", () => {
    it("confirms consistent booking identification and simulated $356 quote across screens", () => {
      expect(en.w05AcceptPending.bookingRefValue).toBe("HX-AZ-DEMO-0042");
      expect(en.w05AcceptPending.quoteValue).toBe("$356.00 · DEMO");
      expect(en.w05DriverDetails.bookingRefValue).toBe("HX-AZ-DEMO-0042");
      expect(en.w05DriverDetails.quoteValue).toBe("$356.00 · DEMO");
      expect(en.w05HelperPending.bookingRefValue).toBe("HX-AZ-DEMO-0042");
      expect(en.w05HelperPending.quoteValue).toBe("$356.00 · DEMO");
      expect(en.w05Restart.bookingRefValue).toBe("HX-AZ-DEMO-0042");
      expect(en.w05Restart.quoteValue).toBe("$356.00 · DEMO");
    });

    it("confirms dispatch state fixture maintains consistent demo driver info", () => {
      const state = getW05DispatchState();
      expect(state.bookingRef).toBe("#HLX-7829-BK");
      expect(state.quoteAmount).toBe("$356.00");
    });
  });
});
