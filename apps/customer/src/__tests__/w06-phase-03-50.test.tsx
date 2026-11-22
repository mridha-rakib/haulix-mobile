/**
 * Phase 03.50 Test Suite
 * HAULIX Customer Mobile App — Workflow 06 (W06 Batch 1: Active Service)
 *
 * Verifies:
 * 1. Existence and default export of all 6 W06 canonical state screen files
 * 2. Unrestricted frontend accessibility (zero route guards, no auth/payment prerequisites)
 * 3. 12 bilingual entries registered in DemoScreenNavigator (6 EN, 6 ES)
 * 4. Symmetrical localization keys between English and Spanish for all 6 W06 states
 * 5. Architectural fidelity: $356.00 quote and 4 confirmed items preserved
 */

import fs from "node:fs";
import path from "node:path";
import en from "../../../../packages/i18n/src/locales/en";
import es from "../../../../packages/i18n/src/locales/es";

describe("Phase 03.50 — W06 Active Service Batch 1 Tests", () => {
  const customerAppDir = path.resolve(__dirname, "../../app/(app)");
  const screens = [
    {
      file: "active-service-awaiting-departure.tsx",
      route: "/active-service-awaiting-departure",
      state: "PRE",
      enNode: "882:5131",
      esNode: "883:5495",
      i18nKey: "w06Pre",
    },
    {
      file: "active-service-en-route.tsx",
      route: "/active-service-en-route",
      state: "ENROUTE",
      enNode: "882:5245",
      esNode: "883:5609",
      i18nKey: "w06Enroute",
    },
    {
      file: "active-service-eta-pending.tsx",
      route: "/active-service-eta-pending",
      state: "ETA_PENDING",
      enNode: "882:5356",
      esNode: "883:5720",
      i18nKey: "w06EtaPending",
    },
    {
      file: "active-service-gps-offline.tsx",
      route: "/active-service-gps-offline",
      state: "GPS_OFFLINE",
      enNode: "882:5470",
      esNode: "883:5834",
      i18nKey: "w06GpsOffline",
    },
    {
      file: "active-service-gps-denied.tsx",
      route: "/active-service-gps-denied",
      state: "GPS_DENIED",
      enNode: "882:5584",
      esNode: "883:5948",
      i18nKey: "w06GpsDenied",
    },
    {
      file: "active-service-driver-arrived.tsx",
      route: "/active-service-driver-arrived",
      state: "ARRIVED",
      enNode: "882:5698",
      esNode: "883:6062",
      i18nKey: "w06Arrived",
    },
  ];

  test("all 6 W06 screen files exist on disk", () => {
    for (const screen of screens) {
      const filePath = path.join(customerAppDir, screen.file);
      expect(fs.existsSync(filePath)).toBe(true);
    }
  });

  test("all 6 W06 screen files implement zero route guards", () => {
    for (const screen of screens) {
      const filePath = path.join(customerAppDir, screen.file);
      const source = fs.readFileSync(filePath, "utf-8");

      // Must not contain redirects blocking access on unauthenticated / unpaid states
      expect(source).not.toContain("useAuthGuard");
      expect(source).not.toContain("requireAuth");
      expect(source).not.toContain("requirePayment");
      // Must have BackHandler support for physical Android
      expect(source).toContain("BackHandler");
      expect(source).toContain("hardwareBackPress");
    }
  });

  test("DemoScreenNavigator contains all 12 EN/ES entries for W06 Batch 1", () => {
    const navigatorPath = path.resolve(__dirname, "../components/demo/DemoScreenNavigator.tsx");
    const navSource = fs.readFileSync(navigatorPath, "utf-8");

    const expectedIds = [
      "w06-pre-es",
      "w06-pre-en",
      "w06-enroute-es",
      "w06-enroute-en",
      "w06-eta-pending-es",
      "w06-eta-pending-en",
      "w06-gps-offline-es",
      "w06-gps-offline-en",
      "w06-gps-denied-es",
      "w06-gps-denied-en",
      "w06-arrived-es",
      "w06-arrived-en",
    ];

    for (const id of expectedIds) {
      expect(navSource).toContain(`id: "${id}"`);
    }
  });

  test("bilingual i18n dictionaries have identical keys for all 6 W06 states", () => {
    const w06Keys: Array<
      "w06Pre" | "w06Enroute" | "w06EtaPending" | "w06GpsOffline" | "w06GpsDenied" | "w06Arrived"
    > = ["w06Pre", "w06Enroute", "w06EtaPending", "w06GpsOffline", "w06GpsDenied", "w06Arrived"];

    for (const k of w06Keys) {
      expect(en[k]).toBeDefined();
      expect(es[k]).toBeDefined();

      const enKeys = Object.keys(en[k]).sort();
      const esKeys = Object.keys(es[k]).sort();
      expect(enKeys).toEqual(esKeys);
    }
  });

  test("order summary preserves $356.00 quote and 4 confirmed items across all screens", () => {
    for (const screen of screens) {
      const filePath = path.join(customerAppDir, screen.file);
      const source = fs.readFileSync(filePath, "utf-8");

      expect(source).toContain("$356.00 USD");
      expect(source).toContain("1 sofa + 2 chairs + 1 table");
    }
  });
});
