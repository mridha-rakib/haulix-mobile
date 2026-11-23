/**
 * Phase 03.55 Test Suite
 * HAULIX Customer Mobile App — Workflow 07 Batch 1 (My Jobs, Booking History & Details)
 *
 * Verifies:
 * 1. Existence and default export of all 6 W07 Batch 1 screen files
 * 2. Unrestricted frontend accessibility (zero route guards, no auth/payment prerequisites)
 * 3. 12 bilingual entries registered in DemoScreenNavigator (6 EN, 6 ES)
 * 4. Symmetrical localization keys between English and Spanish for all 6 W07 translation objects
 * 5. Screen navigation integrity across My Jobs, Details, History, Empty, Loading, and Access states
 * 6. Bottom navigation visibility with activeTab="jobs" and ROUTE_MAP registration
 * 7. Structural fidelity: $356.00 USD quote and 4 confirmed items across 3 categories
 * 8. W06 completion preservation (no regression to W06 handoff)
 */

import fs from "node:fs";
import path from "node:path";
import en from "../../../../packages/i18n/src/locales/en";
import es from "../../../../packages/i18n/src/locales/es";

describe("Phase 03.55 — W07 Batch 1 Tests", () => {
  const customerAppDir = path.resolve(__dirname, "../../app/(app)");

  const w07Batch1Screens = [
    {
      file: "my-jobs.tsx",
      route: "/my-jobs",
      state: "HOME",
      enNode: "892:5859",
      esNode: "893:6265",
      i18nKey: "w07Home",
      hasBottomNav: true,
    },
    {
      file: "my-jobs-empty.tsx",
      route: "/my-jobs-empty",
      state: "HOME_EMPTY",
      enNode: "892:5946",
      esNode: "893:6352",
      i18nKey: "w07HomeEmpty",
      hasBottomNav: true,
    },
    {
      file: "my-jobs-history.tsx",
      route: "/my-jobs-history",
      state: "HOME_HISTORY",
      enNode: "892:6033",
      esNode: "893:6439",
      i18nKey: "w07HomeHistory",
      hasBottomNav: true,
    },
    {
      file: "my-jobs-loading.tsx",
      route: "/my-jobs-loading",
      state: "HOME_LOADING",
      enNode: "892:6120",
      esNode: "893:6526",
      i18nKey: "w07HomeLoading",
      hasBottomNav: true,
    },
    {
      file: "my-jobs-access.tsx",
      route: "/my-jobs-access",
      state: "HOME_ACCESS",
      enNode: "892:6207",
      esNode: "893:6613",
      i18nKey: "w07HomeAccess",
      hasBottomNav: false,
    },
    {
      file: "job-details.tsx",
      route: "/job-details",
      state: "DETAILS",
      enNode: "892:6294",
      esNode: "893:6700",
      i18nKey: "w07Details",
      hasBottomNav: false,
    },
  ];

  test("all 6 W07 Batch 1 screen files exist on disk with default export", () => {
    expect(w07Batch1Screens).toHaveLength(6);
    for (const screen of w07Batch1Screens) {
      const filePath = path.join(customerAppDir, screen.file);
      expect(fs.existsSync(filePath)).toBe(true);
      const source = fs.readFileSync(filePath, "utf-8");
      expect(source).toContain("export default function");
    }
  });

  test("all 6 W07 Batch 1 screen files implement zero route guards and hardware BackHandler", () => {
    for (const screen of w07Batch1Screens) {
      const filePath = path.join(customerAppDir, screen.file);
      const source = fs.readFileSync(filePath, "utf-8");

      expect(source).not.toContain("useAuthGuard");
      expect(source).not.toContain("requireAuth");
      expect(source).not.toContain("requirePayment");
      expect(source).toContain("BackHandler");
      expect(source).toContain("hardwareBackPress");
    }
  });

  test("DemoScreenNavigator registers all 12 bilingual EN/ES entries for W07 Batch 1", () => {
    const navigatorPath = path.resolve(__dirname, "../components/demo/DemoScreenNavigator.tsx");
    const navSource = fs.readFileSync(navigatorPath, "utf-8");

    for (const screen of w07Batch1Screens) {
      expect(navSource).toContain(`Node ${screen.enNode}`);
      expect(navSource).toContain(`Node ${screen.esNode}`);
      expect(navSource).toContain(screen.route);
    }
  });

  test("all 6 W07 localization objects have identical key parity between English and Spanish", () => {
    for (const screen of w07Batch1Screens) {
      const enObj = (en as Record<string, unknown>)[screen.i18nKey] as Record<string, unknown>;
      const esObj = (es as Record<string, unknown>)[screen.i18nKey] as Record<string, unknown>;

      expect(enObj).toBeDefined();
      expect(esObj).toBeDefined();

      const enKeys = Object.keys(enObj).sort();
      const esKeys = Object.keys(esObj).sort();
      expect(enKeys).toEqual(esKeys);
    }
  });

  test("verifies CustomerBottomNav integration and activeTab rules", () => {
    const bottomNavPath = path.resolve(__dirname, "../components/navigation/CustomerBottomNav.tsx");
    const bottomNavSource = fs.readFileSync(bottomNavPath, "utf-8");
    expect(bottomNavSource).toContain('jobs: "/my-jobs"');

    for (const screen of w07Batch1Screens) {
      const filePath = path.join(customerAppDir, screen.file);
      const source = fs.readFileSync(filePath, "utf-8");
      if (screen.hasBottomNav) {
        expect(source).toContain('<CustomerBottomNav activeTab="jobs" />');
      } else {
        expect(source).not.toContain("<CustomerBottomNav");
      }
    }
  });

  test("verifies navigation routing across W07 Batch 1 screens", () => {
    // 1. My Jobs routes to details, history, and empty
    const myJobsSource = fs.readFileSync(path.join(customerAppDir, "my-jobs.tsx"), "utf-8");
    expect(myJobsSource).toContain('pathname: "/job-details"');
    expect(myJobsSource).toContain('pathname: "/my-jobs-history"');
    expect(myJobsSource).toContain('pathname: "/my-jobs-empty"');

    // 2. Empty state routes back to my-jobs, details, and support
    const emptySource = fs.readFileSync(path.join(customerAppDir, "my-jobs-empty.tsx"), "utf-8");
    expect(emptySource).toContain('pathname: "/my-jobs"');
    expect(emptySource).toContain('pathname: "/job-details"');
    expect(emptySource).toContain('pathname: "/job-support"');

    // 3. History state routes to details and back to my-jobs
    const historySource = fs.readFileSync(
      path.join(customerAppDir, "my-jobs-history.tsx"),
      "utf-8"
    );
    expect(historySource).toContain('pathname: "/job-details-history"');
    expect(historySource).toContain('pathname: "/my-jobs"');

    // 4. Loading state routes to my-jobs, empty preview, and access-denied
    const loadingSource = fs.readFileSync(
      path.join(customerAppDir, "my-jobs-loading.tsx"),
      "utf-8"
    );
    expect(loadingSource).toContain('pathname: "/my-jobs"');
    expect(loadingSource).toContain('pathname: "/my-jobs-empty"');
    expect(loadingSource).toContain('pathname: "/my-jobs-access"');

    // 5. Access state routes to my-jobs and support
    const accessSource = fs.readFileSync(path.join(customerAppDir, "my-jobs-access.tsx"), "utf-8");
    expect(accessSource).toContain('pathname: "/my-jobs"');
    expect(accessSource).toContain('pathname: "/job-support"');

    // 6. Details screen routes to reschedule, cancel, support, and back to my-jobs
    const detailsSource = fs.readFileSync(path.join(customerAppDir, "job-details.tsx"), "utf-8");
    expect(detailsSource).toContain('pathname: "/job-reschedule"');
    expect(detailsSource).toContain('pathname: "/job-cancel-fee"');
    expect(detailsSource).toContain('pathname: "/job-support"');
    expect(detailsSource).toContain('pathname: "/my-jobs"');
  });

  test("verifies confirmed inventory (4 pieces across 3 categories) and illustrative quote ($356.00 USD)", () => {
    const myJobsSource = fs.readFileSync(path.join(customerAppDir, "my-jobs.tsx"), "utf-8");
    expect(myJobsSource).toContain("4 pieces across 3 categories");
    expect(myJobsSource).toContain("$356.00 USD · DEMO");

    const historySource = fs.readFileSync(
      path.join(customerAppDir, "my-jobs-history.tsx"),
      "utf-8"
    );
    expect(historySource).toContain("4 pieces across 3 categories");
    expect(historySource).toContain("$356.00 USD · DEMO");

    const detailsSource = fs.readFileSync(path.join(customerAppDir, "job-details.tsx"), "utf-8");
    expect(detailsSource).toContain("4 pieces across 3 categories");
    expect(detailsSource).toContain("$356.00 USD");
  });

  test("verifies W06 completion preservation (no regression on W06 handoff)", () => {
    const bridgePath = path.join(customerAppDir, "active-service-completion-bridge.tsx");
    expect(fs.existsSync(bridgePath)).toBe(true);
    const bridgeSource = fs.readFileSync(bridgePath, "utf-8");
    expect(bridgeSource).toContain("ActiveServiceCompletionBridgeScreen");
  });
});
