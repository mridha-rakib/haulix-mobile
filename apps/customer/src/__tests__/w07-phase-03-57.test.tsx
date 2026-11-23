/**
 * Phase 03.57 Test Suite
 * HAULIX Customer Mobile App — Workflow 07 Batch 3 (Reschedule Outcomes & Cancellation Management)
 *
 * Verifies:
 * 1. Existence and default export of all 6 W07 Batch 3 screen files
 * 2. Unrestricted frontend accessibility (zero route guards, no auth/payment prerequisites)
 * 3. 12 bilingual entries registered in DemoScreenNavigator (6 EN, 6 ES)
 * 4. Symmetrical localization keys between English and Spanish for all 6 W07 Batch 3 translation objects
 * 5. Screen navigation integrity across reschedule confirmed, reschedule failed, cancel fee, free, check, and done
 * 6. Verification that job-reschedule-pending transitions to /job-reschedule-confirmed and /job-reschedule-failed
 * 7. Verification that job-details navigates to /job-cancel-fee (W07 cancellation flow)
 * 8. Structural fidelity: 4 confirmed items across 3 categories and fee distinction ($100 vs $0)
 * 9. Non-regression of W06 completion and W07 Batch 1 & 2 screens
 */

import fs from "node:fs";
import path from "node:path";
import en from "../../../../packages/i18n/src/locales/en";
import es from "../../../../packages/i18n/src/locales/es";

describe("Phase 03.57 — W07 Batch 3 Tests", () => {
  const customerAppDir = path.resolve(__dirname, "../../app/(app)");

  const w07Batch3Screens = [
    {
      file: "job-reschedule-confirmed.tsx",
      route: "/job-reschedule-confirmed",
      state: "RESCHED_CONFIRMED",
      enNode: "892:6852",
      esNode: "893:7258",
      i18nKey: "w07ReschedConfirmed",
    },
    {
      file: "job-reschedule-failed.tsx",
      route: "/job-reschedule-failed",
      state: "RESCHED_FAILED",
      enNode: "892:6930",
      esNode: "893:7336",
      i18nKey: "w07ReschedFailed",
    },
    {
      file: "job-cancel-fee.tsx",
      route: "/job-cancel-fee",
      state: "CANCEL_FEE",
      enNode: "892:7008",
      esNode: "893:7414",
      i18nKey: "w07CancelFee",
    },
    {
      file: "job-cancel-free.tsx",
      route: "/job-cancel-free",
      state: "CANCEL_FREE",
      enNode: "892:7095",
      esNode: "893:7501",
      i18nKey: "w07CancelFree",
    },
    {
      file: "job-cancel-check.tsx",
      route: "/job-cancel-check",
      state: "CANCEL_CHECK",
      enNode: "892:7182",
      esNode: "893:7588",
      i18nKey: "w07CancelCheck",
    },
    {
      file: "job-cancel-done.tsx",
      route: "/job-cancel-done",
      state: "CANCEL_DONE",
      enNode: "892:7269",
      esNode: "893:7675",
      i18nKey: "w07CancelDone",
    },
  ];

  test("all 6 W07 Batch 3 screen files exist on disk with default export", () => {
    expect(w07Batch3Screens).toHaveLength(6);
    for (const screen of w07Batch3Screens) {
      const filePath = path.join(customerAppDir, screen.file);
      expect(fs.existsSync(filePath)).toBe(true);
      const source = fs.readFileSync(filePath, "utf-8");
      expect(source).toContain("export default function");
    }
  });

  test("all 6 W07 Batch 3 screen files implement zero route guards and hardware BackHandler", () => {
    for (const screen of w07Batch3Screens) {
      const filePath = path.join(customerAppDir, screen.file);
      const source = fs.readFileSync(filePath, "utf-8");

      expect(source).not.toContain("useAuthGuard");
      expect(source).not.toContain("requireAuth");
      expect(source).not.toContain("requirePayment");
      expect(source).toContain("BackHandler");
      expect(source).toContain("hardwareBackPress");
    }
  });

  test("DemoScreenNavigator registers all 12 bilingual EN/ES entries for W07 Batch 3", () => {
    const navigatorPath = path.resolve(__dirname, "../components/demo/DemoScreenNavigator.tsx");
    const navSource = fs.readFileSync(navigatorPath, "utf-8");

    for (const screen of w07Batch3Screens) {
      expect(navSource).toContain(`Node ${screen.enNode}`);
      expect(navSource).toContain(`Node ${screen.esNode}`);
      expect(navSource).toContain(screen.route);
    }
  });

  test("all 6 W07 Batch 3 localization objects have identical key parity between English and Spanish", () => {
    for (const screen of w07Batch3Screens) {
      const enObj = (en as Record<string, unknown>)[screen.i18nKey] as Record<string, unknown>;
      const esObj = (es as Record<string, unknown>)[screen.i18nKey] as Record<string, unknown>;

      expect(enObj).toBeDefined();
      expect(esObj).toBeDefined();

      const enKeys = Object.keys(enObj).sort();
      const esKeys = Object.keys(esObj).sort();
      expect(enKeys).toEqual(esKeys);
    }
  });

  test("verifies navigation routing across W07 Batch 3 screens", () => {
    // 1. Reschedule Confirmed routes to /job-details, /my-jobs, and /active-service-support
    const confirmedSource = fs.readFileSync(
      path.join(customerAppDir, "job-reschedule-confirmed.tsx"),
      "utf-8"
    );
    expect(confirmedSource).toContain('pathname: "/job-details"');
    expect(confirmedSource).toContain('pathname: "/my-jobs"');
    expect(confirmedSource).toContain('pathname: "/active-service-support"');

    // 2. Reschedule Failed routes to /job-reschedule, /job-details, and /active-service-support
    const failedSource = fs.readFileSync(
      path.join(customerAppDir, "job-reschedule-failed.tsx"),
      "utf-8"
    );
    expect(failedSource).toContain('pathname: "/job-reschedule"');
    expect(failedSource).toContain('pathname: "/job-details"');
    expect(failedSource).toContain('pathname: "/active-service-support"');

    // 3. Cancel Fee routes to /job-cancel-check, /job-details, and /job-cancel-free
    const cancelFeeSource = fs.readFileSync(
      path.join(customerAppDir, "job-cancel-fee.tsx"),
      "utf-8"
    );
    expect(cancelFeeSource).toContain('pathname: "/job-cancel-check"');
    expect(cancelFeeSource).toContain('pathname: "/job-details"');
    expect(cancelFeeSource).toContain('pathname: "/job-cancel-free"');

    // 4. Cancel Free routes to /job-cancel-done, /job-details, and /job-cancel-fee
    const cancelFreeSource = fs.readFileSync(
      path.join(customerAppDir, "job-cancel-free.tsx"),
      "utf-8"
    );
    expect(cancelFreeSource).toContain('pathname: "/job-cancel-done"');
    expect(cancelFreeSource).toContain('pathname: "/job-details"');
    expect(cancelFreeSource).toContain('pathname: "/job-cancel-fee"');

    // 5. Cancel Check routes to /job-cancel-done, /job-details, and /job-cancel-fee
    const cancelCheckSource = fs.readFileSync(
      path.join(customerAppDir, "job-cancel-check.tsx"),
      "utf-8"
    );
    expect(cancelCheckSource).toContain('pathname: "/job-cancel-done"');
    expect(cancelCheckSource).toContain('pathname: "/job-details"');
    expect(cancelCheckSource).toContain('pathname: "/job-cancel-fee"');

    // 6. Cancel Done routes to /my-jobs, /job-details-cancelled, and /active-service-support
    const cancelDoneSource = fs.readFileSync(
      path.join(customerAppDir, "job-cancel-done.tsx"),
      "utf-8"
    );
    expect(cancelDoneSource).toContain('pathname: "/my-jobs"');
    expect(cancelDoneSource).toContain('pathname: "/job-details-cancelled"');
    expect(cancelDoneSource).toContain('pathname: "/active-service-support"');
  });

  test("verifies job-reschedule-pending routes to /job-reschedule-confirmed and /job-reschedule-failed", () => {
    const pendingSource = fs.readFileSync(
      path.join(customerAppDir, "job-reschedule-pending.tsx"),
      "utf-8"
    );
    expect(pendingSource).toContain('pathname: "/job-reschedule-confirmed"');
    expect(pendingSource).toContain('pathname: "/job-reschedule-failed"');
  });

  test("verifies job-details now routes to /job-cancel-fee for W07 customer cancellation flow", () => {
    const detailsSource = fs.readFileSync(path.join(customerAppDir, "job-details.tsx"), "utf-8");
    expect(detailsSource).toContain('pathname: "/job-cancel-fee"');
  });

  test("verifies confirmed inventory (4 pieces across 3 categories) and fee policy distinction", () => {
    for (const screen of w07Batch3Screens) {
      const filePath = path.join(customerAppDir, screen.file);
      const source = fs.readFileSync(filePath, "utf-8");
      expect(source).toContain("4 pieces across 3 categories");
    }

    const cancelFeeSource = fs.readFileSync(
      path.join(customerAppDir, "job-cancel-fee.tsx"),
      "utf-8"
    );
    expect(cancelFeeSource).toContain('t("w07CancelFee.policyHeading")');
    expect(en.w07CancelFee.policyHeading).toBe("A $100 fee may apply");

    const cancelFreeSource = fs.readFileSync(
      path.join(customerAppDir, "job-cancel-free.tsx"),
      "utf-8"
    );
    expect(cancelFreeSource).toContain('t("w07CancelFree.policyHeading")');
    expect(en.w07CancelFree.policyHeading).toBe("Fee-free cancellation");
  });

  test("verifies non-regression of W06 completion and W07 Batch 1 & 2 screens", () => {
    const bridgePath = path.join(customerAppDir, "active-service-completion-bridge.tsx");
    expect(fs.existsSync(bridgePath)).toBe(true);

    const myJobsPath = path.join(customerAppDir, "my-jobs.tsx");
    expect(fs.existsSync(myJobsPath)).toBe(true);

    const reschedulePath = path.join(customerAppDir, "job-reschedule.tsx");
    expect(fs.existsSync(reschedulePath)).toBe(true);

    const historyDetailsPath = path.join(customerAppDir, "job-details-history.tsx");
    expect(fs.existsSync(historyDetailsPath)).toBe(true);
  });
});
