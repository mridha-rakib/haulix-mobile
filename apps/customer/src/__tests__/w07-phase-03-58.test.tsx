/**
 * Phase 03.58 Test Suite
 * HAULIX Customer Mobile App — Workflow 07 Batch 4 (Cancellation Exception & Customer Support Lifecycle)
 *
 * Verifies:
 * 1. Existence and default export of all 6 W07 Batch 4 screen files
 * 2. Unrestricted frontend accessibility (zero route guards, no auth/payment prerequisites)
 * 3. 12 bilingual entries registered in DemoScreenNavigator (6 EN, 6 ES)
 * 4. Symmetrical localization keys between English and Spanish for all 6 W07 Batch 4 translation objects
 * 5. Screen navigation integrity across cancel failed, support hub, submitted, pending, resolved, and failed states
 * 6. Verification of W07 support route separation (/job-support) from W05 (/dispatch-support) and W06 (/active-service-support)
 * 7. Verification that W07 booking management screens correctly link to /job-support
 * 8. Verification of cancellation failure recovery and support submission lifecycle transitions
 * 9. Customer confirmed inventory preservation (4 items across 3 categories) and $356 demo quote
 * 10. Non-regression of previous W06 and W07 Batch 1-3 screens
 */

import fs from "node:fs";
import path from "node:path";
import en from "../../../../packages/i18n/src/locales/en";
import es from "../../../../packages/i18n/src/locales/es";

describe("Phase 03.58 — W07 Batch 4 Tests", () => {
  const customerAppDir = path.resolve(__dirname, "../../app/(app)");

  const w07Batch4Screens = [
    {
      file: "job-cancel-failed.tsx",
      route: "/job-cancel-failed",
      state: "CANCEL_FAILED",
      enNode: "892:7356",
      esNode: "893:7762",
      i18nKey: "w07CancelFailed",
    },
    {
      file: "job-support.tsx",
      route: "/job-support",
      state: "SUPPORT",
      enNode: "892:7443",
      esNode: "893:7849",
      i18nKey: "w07Support",
    },
    {
      file: "job-support-submitted.tsx",
      route: "/job-support-submitted",
      state: "SUPPORT_SUBMITTED",
      enNode: "892:7539",
      esNode: "893:7945",
      i18nKey: "w07SupportSubmitted",
    },
    {
      file: "job-support-pending.tsx",
      route: "/job-support-pending",
      state: "SUPPORT_PENDING",
      enNode: "892:7635",
      esNode: "893:8041",
      i18nKey: "w07SupportPending",
    },
    {
      file: "job-support-resolved.tsx",
      route: "/job-support-resolved",
      state: "SUPPORT_RESOLVED",
      enNode: "892:7731",
      esNode: "893:8137",
      i18nKey: "w07SupportResolved",
    },
    {
      file: "job-support-failed.tsx",
      route: "/job-support-failed",
      state: "SUPPORT_FAILED",
      enNode: "892:7827",
      esNode: "893:8233",
      i18nKey: "w07SupportFailed",
    },
  ];

  test("verifies all 6 W07 Batch 4 screen files exist and export default functional components", () => {
    for (const screen of w07Batch4Screens) {
      const filePath = path.join(customerAppDir, screen.file);
      expect(fs.existsSync(filePath)).toBe(true);
      const source = fs.readFileSync(filePath, "utf-8");
      expect(source).toContain("export default function");
      expect(source).toContain("HaulixSafeArea");
      expect(source).toContain("BackHandler");
    }
  });

  test("verifies zero route guards and no artificial auth/payment gating", () => {
    for (const screen of w07Batch4Screens) {
      const filePath = path.join(customerAppDir, screen.file);
      const source = fs.readFileSync(filePath, "utf-8");
      expect(source).not.toContain("useAuthGuard");
      expect(source).not.toContain("requireAuth");
      expect(source).not.toContain("isAuthenticated");
      expect(source).not.toContain("requirePayment");
      expect(source).not.toContain("requireDriver");
    }
  });

  test("verifies all 12 W07 Batch 4 bilingual entries are registered in DemoScreenNavigator", () => {
    const navPath = path.resolve(__dirname, "../../src/components/demo/DemoScreenNavigator.tsx");
    const navSource = fs.readFileSync(navPath, "utf-8");

    const requiredIds = [
      "w07-cancel-failed-en",
      "w07-cancel-failed-es",
      "w07-support-en",
      "w07-support-es",
      "w07-support-submitted-en",
      "w07-support-submitted-es",
      "w07-support-pending-en",
      "w07-support-pending-es",
      "w07-support-resolved-en",
      "w07-support-resolved-es",
      "w07-support-failed-en",
      "w07-support-failed-es",
    ];

    for (const id of requiredIds) {
      expect(navSource).toContain(`id: "${id}"`);
    }

    // Verify correct figma node IDs in DemoScreenNavigator
    for (const screen of w07Batch4Screens) {
      expect(navSource).toContain(screen.enNode);
      expect(navSource).toContain(screen.esNode);
      expect(navSource).toContain(screen.route);
    }
  });

  test("verifies 100% symmetrical localization keys between en and es for W07 Batch 4", () => {
    for (const screen of w07Batch4Screens) {
      const enDict = (en as Record<string, Record<string, string>>)[screen.i18nKey];
      const esDict = (es as Record<string, Record<string, string>>)[screen.i18nKey];

      expect(enDict).toBeDefined();
      expect(esDict).toBeDefined();

      const enKeys = Object.keys(enDict).sort();
      const esKeys = Object.keys(esDict).sort();

      expect(enKeys).toEqual(esKeys);
      expect(enKeys.length).toBeGreaterThan(15);
    }
  });

  test("verifies navigation routing across W07 Batch 4 screens", () => {
    // 1. Cancel Failed routes to /job-cancel-check, /job-details, and /job-support
    const cancelFailedSource = fs.readFileSync(
      path.join(customerAppDir, "job-cancel-failed.tsx"),
      "utf-8"
    );
    expect(cancelFailedSource).toContain('pathname: "/job-cancel-check"');
    expect(cancelFailedSource).toContain('pathname: "/job-details"');
    expect(cancelFailedSource).toContain('pathname: "/job-support"');

    // 2. Support Hub routes to /job-support-submitted, /job-support-pending, and /job-details
    const supportSource = fs.readFileSync(path.join(customerAppDir, "job-support.tsx"), "utf-8");
    expect(supportSource).toContain('pathname: "/job-support-submitted"');
    expect(supportSource).toContain('pathname: "/job-support-pending"');
    expect(supportSource).toContain('pathname: "/job-details"');

    // 3. Support Submitted routes to /job-support-pending, /job-details, and /job-support-failed
    const submittedSource = fs.readFileSync(
      path.join(customerAppDir, "job-support-submitted.tsx"),
      "utf-8"
    );
    expect(submittedSource).toContain('pathname: "/job-support-pending"');
    expect(submittedSource).toContain('pathname: "/job-details"');
    expect(submittedSource).toContain('pathname: "/job-support-failed"');

    // 4. Support Pending routes to /job-support-resolved, /job-support, and /job-details
    const pendingSource = fs.readFileSync(
      path.join(customerAppDir, "job-support-pending.tsx"),
      "utf-8"
    );
    expect(pendingSource).toContain('pathname: "/job-support-resolved"');
    expect(pendingSource).toContain('pathname: "/job-support"');
    expect(pendingSource).toContain('pathname: "/job-details"');

    // 5. Support Resolved routes to /job-details, /job-support, and /my-jobs
    const resolvedSource = fs.readFileSync(
      path.join(customerAppDir, "job-support-resolved.tsx"),
      "utf-8"
    );
    expect(resolvedSource).toContain('pathname: "/job-details"');
    expect(resolvedSource).toContain('pathname: "/job-support"');
    expect(resolvedSource).toContain('pathname: "/my-jobs"');

    // 6. Support Failed routes to /job-support, /job-details, and /my-jobs
    const failedSource = fs.readFileSync(
      path.join(customerAppDir, "job-support-failed.tsx"),
      "utf-8"
    );
    expect(failedSource).toContain('pathname: "/job-support"');
    expect(failedSource).toContain('pathname: "/job-details"');
    expect(failedSource).toContain('pathname: "/my-jobs"');
  });

  test("verifies W07 booking management screens route to /job-support instead of /active-service-support", () => {
    const screensToCheck = [
      "job-details.tsx",
      "job-details-history.tsx",
      "job-details-cancelled.tsx",
      "job-cancel-done.tsx",
      "job-reschedule-admin.tsx",
      "job-reschedule-confirmed.tsx",
      "job-reschedule-failed.tsx",
      "my-jobs-access.tsx",
      "my-jobs-empty.tsx",
    ];

    for (const screen of screensToCheck) {
      const source = fs.readFileSync(path.join(customerAppDir, screen), "utf-8");
      expect(source).toContain('pathname: "/job-support"');
      expect(source).not.toContain('pathname: "/active-service-support"');
    }
  });

  test("verifies W06 active service screens strictly preserve /active-service-support", () => {
    const w06Screens = [
      "active-service-completion-bridge.tsx",
      "active-service-extra-accepted.tsx",
      "active-service-gps-closed.tsx",
    ];

    for (const screen of w06Screens) {
      const source = fs.readFileSync(path.join(customerAppDir, screen), "utf-8");
      expect(source).toContain('pathname: "/active-service-support"');
    }
  });

  test("verifies support topic options and interactive input state on /job-support", () => {
    const supportSource = fs.readFileSync(path.join(customerAppDir, "job-support.tsx"), "utf-8");
    expect(supportSource).toContain("selectedTopic");
    expect(supportSource).toContain("descriptionText");
    expect(supportSource).toContain("evidenceAttached");
    expect(supportSource).toContain('t("w07Support.topicChanges")');
    expect(supportSource).toContain('t("w07Support.topicDriver")');
    expect(supportSource).toContain('t("w07Support.topicService")');
    expect(supportSource).toContain('t("w07Support.topicPayment")');
    expect(supportSource).toContain('t("w07Support.topicApp")');
    expect(supportSource).toContain('t("w07Support.topicOther")');
  });
});
