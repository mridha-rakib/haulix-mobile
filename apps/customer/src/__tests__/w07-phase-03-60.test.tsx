/**
 * HAULIX Customer Mobile App — Phase 03.60
 * Test Suite: W07 Batch 6 — Scheduled Bookings, Categorized Support & Final Workflow Completion
 *
 * Verifies:
 * 1. Screen components exist and export default functional components with BackHandler
 * 2. Shared categorized support component W07SupportLayout exists and exports W07SupportLayout
 * 3. Unrestricted frontend accessibility (zero route guards, no auth/payment prerequisites)
 * 4. 10 bilingual entries registered in DemoScreenNavigator with exact Figma node IDs
 * 5. Exact symmetry in i18n dictionaries for w07HomeScheduled, w07SupportDriver, w07SupportService,
 *    w07SupportPayment, w07SupportOther, and common.inventoryScope across en.ts and es.ts
 * 6. 3-tab segment navigation between Active (/my-jobs), Scheduled (/my-jobs-scheduled), and History (/my-jobs-history)
 * 7. Topic cross-navigation between all support categories (/job-support, /job-support-driver,
 *    /job-support-service, /job-support-payment, /job-support-other)
 * 8. Category-aware failure preview and recovery routing in W07SupportLayout and job-support-failed.tsx
 * 9. Refund failure preview and recovery regression check in job-refund.tsx
 * 10. Symmetrical common.inventoryScope localization across all W07 screens
 * 11. Authoritative reconciliation: W07 34/34 canonical states and 68 bilingual variants complete
 */

import * as fs from "node:fs";
import * as path from "node:path";
import en from "../../../../packages/i18n/src/locales/en";
import es from "../../../../packages/i18n/src/locales/es";

const customerAppDir = path.resolve(__dirname, "../../app/(app)");
const componentsDir = path.resolve(__dirname, "../../src/components");

describe("W07 Phase 03.60 — Scheduled Bookings & Categorized Support Lifecycle", () => {
  const batch6Screens = [
    {
      file: "my-jobs-scheduled.tsx",
      route: "/my-jobs-scheduled",
      state: "HOME_SCHEDULED",
      enNode: "897:6671",
      esNode: "897:7145",
      enId: "w07-home-scheduled-en",
      esId: "w07-home-scheduled-es",
      i18nKey: "w07HomeScheduled",
    },
    {
      file: "job-support-driver.tsx",
      route: "/job-support-driver",
      state: "SUPPORT_DRIVER",
      enNode: "897:6761",
      esNode: "897:7235",
      enId: "w07-support-driver-en",
      esId: "w07-support-driver-es",
      i18nKey: "w07SupportDriver",
    },
    {
      file: "job-support-service.tsx",
      route: "/job-support-service",
      state: "SUPPORT_SERVICE",
      enNode: "897:6857",
      esNode: "897:7331",
      enId: "w07-support-service-en",
      esId: "w07-support-service-es",
      i18nKey: "w07SupportService",
    },
    {
      file: "job-support-payment.tsx",
      route: "/job-support-payment",
      state: "SUPPORT_PAYMENT",
      enNode: "897:6953",
      esNode: "897:7427",
      enId: "w07-support-payment-en",
      esId: "w07-support-payment-es",
      i18nKey: "w07SupportPayment",
    },
    {
      file: "job-support-other.tsx",
      route: "/job-support-other",
      state: "SUPPORT_OTHER",
      enNode: "897:7049",
      esNode: "897:7523",
      enId: "w07-support-other-en",
      esId: "w07-support-other-es",
      i18nKey: "w07SupportOther",
    },
  ];

  test("verifies all 5 new screen files exist and export default functional components with BackHandler", () => {
    for (const screen of batch6Screens) {
      const filePath = path.join(customerAppDir, screen.file);
      expect(fs.existsSync(filePath)).toBe(true);

      const content = fs.readFileSync(filePath, "utf-8");
      expect(content).toContain("export default function");

      if (screen.file === "my-jobs-scheduled.tsx") {
        expect(content).toContain("BackHandler.addEventListener");
        expect(content).toContain("hardwareBackPress");
        expect(content).toContain("HaulixSafeArea");
        expect(content).toContain("useTranslation");
      } else {
        // Categorized support screens utilize W07SupportLayout
        expect(content).toContain("W07SupportLayout");
      }
    }

    // Verify W07SupportLayout itself provides BackHandler and HaulixSafeArea
    const layoutPath = path.join(componentsDir, "support/W07SupportLayout.tsx");
    const layoutContent = fs.readFileSync(layoutPath, "utf-8");
    expect(layoutContent).toContain("BackHandler.addEventListener");
    expect(layoutContent).toContain("hardwareBackPress");
    expect(layoutContent).toContain("HaulixSafeArea");
    expect(layoutContent).toContain("useTranslation");
  });

  test("verifies shared categorized support component W07SupportLayout exists and exports W07SupportLayout", () => {
    const layoutPath = path.join(componentsDir, "support/W07SupportLayout.tsx");
    expect(fs.existsSync(layoutPath)).toBe(true);

    const layoutSource = fs.readFileSync(layoutPath, "utf-8");
    expect(layoutSource).toContain("export function W07SupportLayout");
    expect(layoutSource).toContain("handleSelectTopic");
    expect(layoutSource).toContain("handlePreviewFailure");
  });

  test("verifies zero route guards and no artificial auth/payment gating across all 5 new screens", () => {
    for (const screen of batch6Screens) {
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

    for (const screen of batch6Screens) {
      expect(navSource).toContain(`id: "${screen.enId}"`);
      expect(navSource).toContain(`id: "${screen.esId}"`);
      expect(navSource).toContain(screen.enNode);
      expect(navSource).toContain(screen.esNode);
      expect(navSource).toContain(screen.route);
    }
  });

  test("verifies exact symmetry across all 5 W07 batch 6 i18n namespaces", () => {
    for (const screen of batch6Screens) {
      const enDict = (en as Record<string, Record<string, string>>)[screen.i18nKey];
      const esDict = (es as Record<string, Record<string, string>>)[screen.i18nKey];

      expect(enDict).toBeDefined();
      expect(esDict).toBeDefined();

      const enKeys = Object.keys(enDict).sort();
      const esKeys = Object.keys(esDict).sort();

      expect(enKeys).toEqual(esKeys);
      expect(enKeys.length).toBeGreaterThanOrEqual(20);

      for (const k of enKeys) {
        expect(enDict[k]).toBeTruthy();
        expect(esDict[k]).toBeTruthy();
      }
    }
  });

  test("verifies common.inventoryScope is symmetrically defined in en.ts and es.ts", () => {
    expect(en.common.inventoryScope).toBe("4 pieces across 3 categories");
    expect(es.common.inventoryScope).toBe("4 piezas en 3 categorías");
  });

  test("verifies 3-tab segment navigation between Active, Scheduled, and History", () => {
    // Active -> /my-jobs
    const activeSrc = fs.readFileSync(path.join(customerAppDir, "my-jobs.tsx"), "utf-8");
    expect(activeSrc).toContain('pathname: "/my-jobs-scheduled"');
    expect(activeSrc).toContain('pathname: "/my-jobs-history"');

    // Scheduled -> /my-jobs-scheduled
    const scheduledSrc = fs.readFileSync(
      path.join(customerAppDir, "my-jobs-scheduled.tsx"),
      "utf-8"
    );
    expect(scheduledSrc).toContain('pathname: "/my-jobs"');
    expect(scheduledSrc).toContain('pathname: "/my-jobs-history"');
    expect(scheduledSrc).toContain('pathname: "/job-details"');
    expect(scheduledSrc).toContain('pathname: "/job-reschedule"');

    // History -> /my-jobs-history
    const historySrc = fs.readFileSync(path.join(customerAppDir, "my-jobs-history.tsx"), "utf-8");
    expect(historySrc).toContain('pathname: "/my-jobs"');
    expect(historySrc).toContain('pathname: "/my-jobs-scheduled"');
  });

  test("verifies topic cross-navigation between all support categories", () => {
    const layoutSrc = fs.readFileSync(
      path.join(componentsDir, "support/W07SupportLayout.tsx"),
      "utf-8"
    );
    expect(layoutSrc).toContain('pathname: "/job-support"');
    expect(layoutSrc).toContain('pathname: "/job-support-driver"');
    expect(layoutSrc).toContain('pathname: "/job-support-service"');
    expect(layoutSrc).toContain('pathname: "/job-support-payment"');
    expect(layoutSrc).toContain('pathname: "/job-support-other"');
  });

  test("verifies category-aware failure preview and recovery routing in W07SupportLayout and job-support-failed.tsx", () => {
    const layoutSrc = fs.readFileSync(
      path.join(componentsDir, "support/W07SupportLayout.tsx"),
      "utf-8"
    );
    expect(layoutSrc).toContain('pathname: "/job-support-failed"');
    expect(layoutSrc).toContain(
      'originatingCategory: variant === "default" ? selectedTopic : variant'
    );

    const failedSrc = fs.readFileSync(path.join(customerAppDir, "job-support-failed.tsx"), "utf-8");
    expect(failedSrc).toContain("originatingCategory?: string");
    expect(failedSrc).toContain("supportOriginRoute");
    expect(failedSrc).toContain("/job-support-driver");
    expect(failedSrc).toContain("/job-support-service");
    expect(failedSrc).toContain("/job-support-payment");
    expect(failedSrc).toContain("/job-support-other");
  });

  test("regression check: job-refund.tsx has failure preview button and job-refund-failed recovery", () => {
    const refundSrc = fs.readFileSync(path.join(customerAppDir, "job-refund.tsx"), "utf-8");
    expect(refundSrc).toContain('pathname: "/job-refund-failed"');
    expect(refundSrc).toContain("w07-refund-preview-failed-btn");

    const refundFailedSrc = fs.readFileSync(
      path.join(customerAppDir, "job-refund-failed.tsx"),
      "utf-8"
    );
    expect(refundFailedSrc).toContain('pathname: "/job-refund"');
  });

  test("verifies all W07 screens use localized common.inventoryScope rather than hardcoded English", () => {
    const w07Files = [
      "my-jobs.tsx",
      "my-jobs-scheduled.tsx",
      "my-jobs-history.tsx",
      "job-details.tsx",
      "job-details-history.tsx",
      "job-details-cancelled.tsx",
      "job-support.tsx",
      "job-support-driver.tsx",
      "job-support-service.tsx",
      "job-support-payment.tsx",
      "job-support-other.tsx",
      "job-support-failed.tsx",
      "job-refund.tsx",
      "job-refund-pending.tsx",
      "job-refund-resolved.tsx",
      "job-refund-rejected.tsx",
      "job-refund-failed.tsx",
    ];

    for (const file of w07Files) {
      const fullPath = path.join(customerAppDir, file);
      if (fs.existsSync(fullPath)) {
        const content = fs.readFileSync(fullPath, "utf-8");
        // Should not contain hardcoded English inventory piece summary
        expect(content).not.toContain("· 4 pieces across 3 categories");
      }
    }
  });

  test("authoritative reconciliation: DemoScreenNavigator contains all 34 canonical W07 states (68 bilingual entries)", () => {
    const navPath = path.resolve(__dirname, "../../src/components/demo/DemoScreenNavigator.tsx");
    const navSource = fs.readFileSync(navPath, "utf-8");

    // Count w07 entries
    const w07Entries = navSource.match(/id:\s*"w07-[a-z0-9-]+"/g) || [];
    expect(w07Entries.length).toBe(68);
  });
});
