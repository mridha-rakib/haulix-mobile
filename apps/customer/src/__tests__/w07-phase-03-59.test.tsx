/**
 * HAULIX Customer Mobile App — Phase 03.59
 * Test Suite: W07 Batch 5 — Refund & Dispute Review Lifecycle (States 25–29)
 *
 * Verifies:
 * 1. Screen components exist and export default functional components
 * 2. Unrestricted frontend accessibility (zero route guards, no auth/payment prerequisites)
 * 3. 10 bilingual entries registered in DemoScreenNavigator with correct node IDs and routes
 * 4. Exact symmetry in i18n dictionaries for w07Refund, w07RefundPending, w07RefundResolved,
 *    w07RefundRejected, and w07RefundFailed across en.ts and es.ts
 * 5. Deterministic navigation routing and hardware BackHandler across all 5 states
 * 6. Job details (history and cancelled) properly route to /job-refund
 * 7. Regression check: job-support.tsx uses localized attachmentActive key
 */

import * as fs from "node:fs";
import * as path from "node:path";
import en from "../../../../packages/i18n/src/locales/en";
import es from "../../../../packages/i18n/src/locales/es";

const customerAppDir = path.resolve(__dirname, "../../app/(app)");

describe("W07 Phase 03.59 — Refund & Dispute Review Lifecycle", () => {
  const refundScreens = [
    {
      file: "job-refund.tsx",
      route: "/job-refund",
      state: "REFUND",
      enNode: "892:7923",
      esNode: "893:8329",
      enId: "w07-refund-en",
      esId: "w07-refund-es",
      i18nKey: "w07Refund",
    },
    {
      file: "job-refund-pending.tsx",
      route: "/job-refund-pending",
      state: "REFUND_PENDING",
      enNode: "892:8011",
      esNode: "893:8417",
      enId: "w07-refund-pending-en",
      esId: "w07-refund-pending-es",
      i18nKey: "w07RefundPending",
    },
    {
      file: "job-refund-resolved.tsx",
      route: "/job-refund-resolved",
      state: "REFUND_RESOLVED",
      enNode: "892:8099",
      esNode: "893:8505",
      enId: "w07-refund-resolved-en",
      esId: "w07-refund-resolved-es",
      i18nKey: "w07RefundResolved",
    },
    {
      file: "job-refund-rejected.tsx",
      route: "/job-refund-rejected",
      state: "REFUND_REJECTED",
      enNode: "892:8187",
      esNode: "893:8593",
      enId: "w07-refund-rejected-en",
      esId: "w07-refund-rejected-es",
      i18nKey: "w07RefundRejected",
    },
    {
      file: "job-refund-failed.tsx",
      route: "/job-refund-failed",
      state: "REFUND_FAILED",
      enNode: "892:8275",
      esNode: "893:8681",
      enId: "w07-refund-failed-en",
      esId: "w07-refund-failed-es",
      i18nKey: "w07RefundFailed",
    },
  ];

  test("verifies all 5 refund screen files exist and export default functional components with BackHandler", () => {
    for (const screen of refundScreens) {
      const filePath = path.join(customerAppDir, screen.file);
      expect(fs.existsSync(filePath)).toBe(true);

      const content = fs.readFileSync(filePath, "utf-8");
      expect(content).toContain("export default function");
      expect(content).toContain("BackHandler.addEventListener");
      expect(content).toContain("hardwareBackPress");
      expect(content).toContain("HaulixSafeArea");
      expect(content).toContain("useTranslation");
    }
  });

  test("verifies zero route guards and no artificial auth/payment gating", () => {
    for (const screen of refundScreens) {
      const filePath = path.join(customerAppDir, screen.file);
      const source = fs.readFileSync(filePath, "utf-8");
      expect(source).not.toContain("useAuthGuard");
      expect(source).not.toContain("requireAuth");
      expect(source).not.toContain("isAuthenticated");
      expect(source).not.toContain("requirePayment");
      expect(source).not.toContain("requireDriver");
    }
  });

  test("verifies DemoScreenNavigator registers all 10 bilingual entries with exact Figma node IDs", () => {
    const navPath = path.resolve(__dirname, "../../src/components/demo/DemoScreenNavigator.tsx");
    const navSource = fs.readFileSync(navPath, "utf-8");

    for (const screen of refundScreens) {
      expect(navSource).toContain(`id: "${screen.enId}"`);
      expect(navSource).toContain(`id: "${screen.esId}"`);
      expect(navSource).toContain(screen.enNode);
      expect(navSource).toContain(screen.esNode);
      expect(navSource).toContain(screen.route);
    }
  });

  test("verifies exact symmetry across all 5 W07 refund i18n namespaces", () => {
    for (const screen of refundScreens) {
      const enDict = (en as Record<string, Record<string, string>>)[screen.i18nKey];
      const esDict = (es as Record<string, Record<string, string>>)[screen.i18nKey];

      expect(enDict).toBeDefined();
      expect(esDict).toBeDefined();

      const enKeys = Object.keys(enDict).sort();
      const esKeys = Object.keys(esDict).sort();

      expect(enKeys).toEqual(esKeys);
      expect(enKeys.length).toBeGreaterThanOrEqual(25);

      for (const k of enKeys) {
        expect(enDict[k]).toBeTruthy();
        expect(esDict[k]).toBeTruthy();
      }
    }
  });

  test("verifies deterministic navigation routing across W07 refund screens", () => {
    // 1. REFUND (/job-refund) routes to /job-refund-pending, /job-details, /job-support
    const refundSrc = fs.readFileSync(path.join(customerAppDir, "job-refund.tsx"), "utf-8");
    expect(refundSrc).toContain('pathname: "/job-refund-pending"');
    expect(refundSrc).toContain('pathname: "/job-details"');
    expect(refundSrc).toContain('pathname: "/job-support"');

    // 2. REFUND_PENDING (/job-refund-pending) routes to /job-refund-resolved, /job-refund-rejected, /job-details
    const pendingSrc = fs.readFileSync(
      path.join(customerAppDir, "job-refund-pending.tsx"),
      "utf-8"
    );
    expect(pendingSrc).toContain('pathname: "/job-refund-resolved"');
    expect(pendingSrc).toContain('pathname: "/job-refund-rejected"');
    expect(pendingSrc).toContain('pathname: "/job-details"');

    // 3. REFUND_RESOLVED (/job-refund-resolved) routes to /job-details, /my-jobs, /job-support
    const resolvedSrc = fs.readFileSync(
      path.join(customerAppDir, "job-refund-resolved.tsx"),
      "utf-8"
    );
    expect(resolvedSrc).toContain('pathname: "/job-details"');
    expect(resolvedSrc).toContain('pathname: "/my-jobs"');
    expect(resolvedSrc).toContain('pathname: "/job-support"');

    // 4. REFUND_REJECTED (/job-refund-rejected) routes to /job-support, /job-details, /job-refund
    const rejectedSrc = fs.readFileSync(
      path.join(customerAppDir, "job-refund-rejected.tsx"),
      "utf-8"
    );
    expect(rejectedSrc).toContain('pathname: "/job-support"');
    expect(rejectedSrc).toContain('pathname: "/job-details"');
    expect(rejectedSrc).toContain('pathname: "/job-refund"');

    // 5. REFUND_FAILED (/job-refund-failed) routes to /job-refund, /job-details, /job-support
    const failedSrc = fs.readFileSync(path.join(customerAppDir, "job-refund-failed.tsx"), "utf-8");
    expect(failedSrc).toContain('pathname: "/job-refund"');
    expect(failedSrc).toContain('pathname: "/job-details"');
    expect(failedSrc).toContain('pathname: "/job-support"');
  });

  test("verifies job-details-history and job-details-cancelled route to /job-refund", () => {
    const historySrc = fs.readFileSync(
      path.join(customerAppDir, "job-details-history.tsx"),
      "utf-8"
    );
    expect(historySrc).toContain('pathname: "/job-refund"');

    const cancelledSrc = fs.readFileSync(
      path.join(customerAppDir, "job-details-cancelled.tsx"),
      "utf-8"
    );
    expect(cancelledSrc).toContain('pathname: "/job-refund"');
  });

  test("regression check: job-support.tsx uses localized attachmentActive key", () => {
    const supportSrc = fs.readFileSync(path.join(customerAppDir, "job-support.tsx"), "utf-8");
    expect(supportSrc).not.toContain('"✓ Photo attached"');
    expect(supportSrc).toContain('t("w07Support.attachmentActive")');
    expect(en.w07Support.attachmentActive).toBe("✓ Photo attached");
    expect(es.w07Support.attachmentActive).toBe("✓ Foto adjunta");
  });
});
