/**
 * Phase 03.56 Test Suite
 * HAULIX Customer Mobile App — Workflow 07 Batch 2 (Booking Details, Rescheduling & Admin Review)
 *
 * Verifies:
 * 1. Existence and default export of all 6 W07 Batch 2 screen files
 * 2. Unrestricted frontend accessibility (zero route guards, no auth/payment prerequisites)
 * 3. 12 bilingual entries registered in DemoScreenNavigator (6 EN, 6 ES)
 * 4. Symmetrical localization keys between English and Spanish for all 6 W07 Batch 2 translation objects
 * 5. Screen navigation integrity across history details, cancelled details, reschedule, free, admin, and pending
 * 6. Verification that job-details navigates to /job-reschedule (W07 booking management)
 * 7. Structural fidelity: $356.00 USD quote and 4 confirmed items across 3 categories
 * 8. Non-regression of W06 completion and W07 Batch 1 screens
 */

import fs from "node:fs";
import path from "node:path";
import en from "../../../../packages/i18n/src/locales/en";
import es from "../../../../packages/i18n/src/locales/es";

describe("Phase 03.56 — W07 Batch 2 Tests", () => {
  const customerAppDir = path.resolve(__dirname, "../../app/(app)");

  const w07Batch2Screens = [
    {
      file: "job-details-history.tsx",
      route: "/job-details-history",
      state: "DETAILS_HISTORY",
      enNode: "892:6376",
      esNode: "893:6782",
      i18nKey: "w07DetailsHistory",
    },
    {
      file: "job-details-cancelled.tsx",
      route: "/job-details-cancelled",
      state: "DETAILS_CANCELLED",
      enNode: "892:6458",
      esNode: "893:6864",
      i18nKey: "w07DetailsCancelled",
    },
    {
      file: "job-reschedule.tsx",
      route: "/job-reschedule",
      state: "RESCHEDULE",
      enNode: "892:6540",
      esNode: "893:6946",
      i18nKey: "w07Reschedule",
    },
    {
      file: "job-reschedule-free.tsx",
      route: "/job-reschedule-free",
      state: "RESCHED_FREE",
      enNode: "892:6618",
      esNode: "893:7024",
      i18nKey: "w07ReschedFree",
    },
    {
      file: "job-reschedule-admin.tsx",
      route: "/job-reschedule-admin",
      state: "RESCHED_ADMIN",
      enNode: "892:6696",
      esNode: "893:7102",
      i18nKey: "w07ReschedAdmin",
    },
    {
      file: "job-reschedule-pending.tsx",
      route: "/job-reschedule-pending",
      state: "RESCHED_PENDING",
      enNode: "892:6774",
      esNode: "893:7180",
      i18nKey: "w07ReschedPending",
    },
  ];

  test("all 6 W07 Batch 2 screen files exist on disk with default export", () => {
    expect(w07Batch2Screens).toHaveLength(6);
    for (const screen of w07Batch2Screens) {
      const filePath = path.join(customerAppDir, screen.file);
      expect(fs.existsSync(filePath)).toBe(true);
      const source = fs.readFileSync(filePath, "utf-8");
      expect(source).toContain("export default function");
    }
  });

  test("all 6 W07 Batch 2 screen files implement zero route guards and hardware BackHandler", () => {
    for (const screen of w07Batch2Screens) {
      const filePath = path.join(customerAppDir, screen.file);
      const source = fs.readFileSync(filePath, "utf-8");

      expect(source).not.toContain("useAuthGuard");
      expect(source).not.toContain("requireAuth");
      expect(source).not.toContain("requirePayment");
      expect(source).toContain("BackHandler");
      expect(source).toContain("hardwareBackPress");
    }
  });

  test("DemoScreenNavigator registers all 12 bilingual EN/ES entries for W07 Batch 2", () => {
    const navigatorPath = path.resolve(__dirname, "../components/demo/DemoScreenNavigator.tsx");
    const navSource = fs.readFileSync(navigatorPath, "utf-8");

    for (const screen of w07Batch2Screens) {
      expect(navSource).toContain(`Node ${screen.enNode}`);
      expect(navSource).toContain(`Node ${screen.esNode}`);
      expect(navSource).toContain(screen.route);
    }
  });

  test("all 6 W07 Batch 2 localization objects have identical key parity between English and Spanish", () => {
    for (const screen of w07Batch2Screens) {
      const enObj = (en as Record<string, unknown>)[screen.i18nKey] as Record<string, unknown>;
      const esObj = (es as Record<string, unknown>)[screen.i18nKey] as Record<string, unknown>;

      expect(enObj).toBeDefined();
      expect(esObj).toBeDefined();

      const enKeys = Object.keys(enObj).sort();
      const esKeys = Object.keys(esObj).sort();
      expect(enKeys).toEqual(esKeys);
    }
  });

  test("verifies navigation routing across W07 Batch 2 screens", () => {
    // 1. Past Service Details routes to refund review (/job-support) and back to history
    const historyDetailsSource = fs.readFileSync(
      path.join(customerAppDir, "job-details-history.tsx"),
      "utf-8"
    );
    expect(historyDetailsSource).toContain('pathname: "/job-support"');
    expect(historyDetailsSource).toContain('pathname: "/my-jobs-history"');

    // 2. Cancelled Booking Details routes to My Jobs and job-support
    const cancelledSource = fs.readFileSync(
      path.join(customerAppDir, "job-details-cancelled.tsx"),
      "utf-8"
    );
    expect(cancelledSource).toContain('pathname: "/my-jobs"');
    expect(cancelledSource).toContain('pathname: "/job-support"');

    // 3. Reschedule Booking routes to free change, late change (admin), and keeps current time (/job-details)
    const rescheduleSource = fs.readFileSync(
      path.join(customerAppDir, "job-reschedule.tsx"),
      "utf-8"
    );
    expect(rescheduleSource).toContain('pathname: "/job-reschedule-free"');
    expect(rescheduleSource).toContain('pathname: "/job-reschedule-admin"');
    expect(rescheduleSource).toContain('pathname: "/job-details"');

    // 4. Qualifying Free Reschedule routes to pending review preview, another window, and original booking
    const freeSource = fs.readFileSync(
      path.join(customerAppDir, "job-reschedule-free.tsx"),
      "utf-8"
    );
    expect(freeSource).toContain('pathname: "/job-reschedule-pending"');
    expect(freeSource).toContain('pathname: "/job-reschedule"');
    expect(freeSource).toContain('pathname: "/job-details"');

    // 5. Reschedule Needs Review routes to pending, another date, and contact support
    const adminSource = fs.readFileSync(
      path.join(customerAppDir, "job-reschedule-admin.tsx"),
      "utf-8"
    );
    expect(adminSource).toContain('pathname: "/job-reschedule-pending"');
    expect(adminSource).toContain('pathname: "/job-reschedule"');
    expect(adminSource).toContain('pathname: "/job-support"');

    // 6. Reschedule Under Review routes to preview outcomes and back to job-details
    const pendingSource = fs.readFileSync(
      path.join(customerAppDir, "job-reschedule-pending.tsx"),
      "utf-8"
    );
    expect(pendingSource).toContain('pathname: "/job-details"');
  });

  test("verifies job-details now routes to /job-reschedule for W07 booking management", () => {
    const detailsSource = fs.readFileSync(path.join(customerAppDir, "job-details.tsx"), "utf-8");
    expect(detailsSource).toContain('pathname: "/job-reschedule"');
  });

  test("verifies my-jobs-history routes to /job-details-history and /job-details-cancelled", () => {
    const myJobsHistorySource = fs.readFileSync(
      path.join(customerAppDir, "my-jobs-history.tsx"),
      "utf-8"
    );
    expect(myJobsHistorySource).toContain('pathname: "/job-details-history"');
    expect(myJobsHistorySource).toContain('pathname: "/job-details-cancelled"');
  });

  test("verifies confirmed inventory (4 pieces across 3 categories) and quote ($356.00 USD)", () => {
    for (const screen of w07Batch2Screens) {
      const filePath = path.join(customerAppDir, screen.file);
      const source = fs.readFileSync(filePath, "utf-8");
      expect(source).toContain("4 pieces across 3 categories");
    }

    const historyDetailsSource = fs.readFileSync(
      path.join(customerAppDir, "job-details-history.tsx"),
      "utf-8"
    );
    expect(historyDetailsSource).toContain("$356.00 USD");

    const cancelledSource = fs.readFileSync(
      path.join(customerAppDir, "job-details-cancelled.tsx"),
      "utf-8"
    );
    expect(cancelledSource).toContain("$356.00 USD");
  });

  test("verifies W06 completion and W07 Batch 1 non-regression", () => {
    const bridgePath = path.join(customerAppDir, "active-service-completion-bridge.tsx");
    expect(fs.existsSync(bridgePath)).toBe(true);

    const myJobsPath = path.join(customerAppDir, "my-jobs.tsx");
    expect(fs.existsSync(myJobsPath)).toBe(true);

    const jobDetailsPath = path.join(customerAppDir, "job-details.tsx");
    expect(fs.existsSync(jobDetailsPath)).toBe(true);
  });
});
