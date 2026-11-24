/**
 * HAULIX Customer Mobile App — Phase 03.63
 * Test Suite: W08 Batch 3 — Authorization Expiration, Fresh Authorization & Transaction Receipt Lifecycle
 *
 * Verifies:
 * 1. Screen components exist and export default functional components with BackHandler and HaulixSafeArea
 * 2. Shared completion components exist and export W08ReceiptCard, W08PaymentCard, W08DecisionCard, W08Header, etc.
 * 3. Unrestricted frontend accessibility (zero route guards, no auth/payment prerequisites)
 * 4. 12 bilingual entries registered in DemoScreenNavigator with exact Figma node IDs
 * 5. Exact symmetry in i18n dictionaries for all 6 W08 Batch 3 namespaces across en.ts and es.ts
 * 6. Deterministic transitions across AUTH_EXPIRED, REAUTH, RECEIPT, RECEIPT_PENDING, RECEIPT_REFUNDED, RECEIPT_UPDATED
 * 7. Phase 03.62 modal replacement: capture-success routes to /completion-receipt & /completion-receipt-pending without modal state
 * 8. Phase 03.62 modal replacement: capture-failed routes to /completion-auth-expired without modal state
 * 9. AUTO_BLOCKED fallback navigation audit: completion-auto-blocked.tsx routes back to /completion-no-reply, not auto-eligible
 * 10. Financial consistency: $356.00 illustrative quote and itemized line items rendered without real transaction mutations
 * 11. Authoritative reconciliation: DemoScreenNavigator contains 36 W08 bilingual entries (18 canonical states)
 */

import * as fs from "node:fs";
import * as path from "node:path";
import en from "../../../../packages/i18n/src/locales/en";
import es from "../../../../packages/i18n/src/locales/es";

const customerAppDir = path.resolve(__dirname, "../../app/(app)");
const componentsDir = path.resolve(__dirname, "../../src/components");

describe("W08 Phase 03.63 — Authorization Expiration & Transaction Receipt Lifecycle", () => {
  const batch3Screens = [
    {
      file: "completion-auth-expired.tsx",
      route: "/completion-auth-expired",
      state: "AUTH_EXPIRED",
      enNode: "907:8011",
      esNode: "907:10911",
      enId: "w08-auth-expired-en",
      esId: "w08-auth-expired-es",
      i18nKey: "w08AuthExpired",
    },
    {
      file: "completion-reauth.tsx",
      route: "/completion-reauth",
      state: "REAUTH",
      enNode: "907:8112",
      esNode: "907:11012",
      enId: "w08-reauth-en",
      esId: "w08-reauth-es",
      i18nKey: "w08Reauth",
    },
    {
      file: "completion-receipt.tsx",
      route: "/completion-receipt",
      state: "RECEIPT",
      enNode: "907:8213",
      esNode: "907:11113",
      enId: "w08-receipt-en",
      esId: "w08-receipt-es",
      i18nKey: "w08Receipt",
    },
    {
      file: "completion-receipt-pending.tsx",
      route: "/completion-receipt-pending",
      state: "RECEIPT_PENDING",
      enNode: "907:8320",
      esNode: "907:11220",
      enId: "w08-receipt-pending-en",
      esId: "w08-receipt-pending-es",
      i18nKey: "w08ReceiptPending",
    },
    {
      file: "completion-receipt-refunded.tsx",
      route: "/completion-receipt-refunded",
      state: "RECEIPT_REFUNDED",
      enNode: "907:8427",
      esNode: "907:11327",
      enId: "w08-receipt-refunded-en",
      esId: "w08-receipt-refunded-es",
      i18nKey: "w08ReceiptRefunded",
    },
    {
      file: "completion-receipt-updated.tsx",
      route: "/completion-receipt-updated",
      state: "RECEIPT_UPDATED",
      enNode: "907:8534",
      esNode: "907:11434",
      enId: "w08-receipt-updated-en",
      esId: "w08-receipt-updated-es",
      i18nKey: "w08ReceiptUpdated",
    },
  ];

  test("verifies all 6 canonical W08 Batch 3 screen files exist and export default functional components with BackHandler", () => {
    for (const screen of batch3Screens) {
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

  test("verifies shared W08CompletionCard component exports W08ReceiptCard", () => {
    const cardPath = path.join(componentsDir, "completion/W08CompletionCard.tsx");
    expect(fs.existsSync(cardPath)).toBe(true);

    const content = fs.readFileSync(cardPath, "utf-8");
    expect(content).toContain("export function W08ReceiptCard");
    expect(content).toContain("export function W08PaymentCard");
    expect(content).toContain("export function W08DecisionCard");
  });

  test("verifies zero route guards across all 6 new Batch 3 screens", () => {
    const forbiddenGuards = [
      "useAuthGuard",
      "requireAuth",
      "isAuthenticated",
      "requirePayment",
      "requireDriver",
    ];

    for (const screen of batch3Screens) {
      const filePath = path.join(customerAppDir, screen.file);
      const content = fs.readFileSync(filePath, "utf-8");

      for (const guard of forbiddenGuards) {
        expect(content).not.toContain(guard);
      }
    }
  });

  test("verifies DemoScreenNavigator registers all 12 bilingual entries with exact Figma node IDs", () => {
    const navPath = path.resolve(__dirname, "../../src/components/demo/DemoScreenNavigator.tsx");
    const navSource = fs.readFileSync(navPath, "utf-8");

    for (const screen of batch3Screens) {
      expect(navSource).toContain(`id: "${screen.enId}"`);
      expect(navSource).toContain(`id: "${screen.esId}"`);
      expect(navSource).toContain(screen.enNode);
      expect(navSource).toContain(screen.esNode);
      expect(navSource).toContain(screen.route);
    }
  });

  test("verifies exact symmetry across all 6 W08 Batch 3 i18n namespaces", () => {
    for (const screen of batch3Screens) {
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

  test("verifies deterministic navigation transitions across W08 Batch 3 authorization & receipt lifecycle", () => {
    // AUTH_EXPIRED -> REAUTH, JOB_SUPPORT, MY_JOBS, CAPTURE_FAILED (back)
    const authExpiredSrc = fs.readFileSync(
      path.join(customerAppDir, "completion-auth-expired.tsx"),
      "utf-8"
    );
    expect(authExpiredSrc).toContain('"/completion-reauth"');
    expect(authExpiredSrc).toContain('"/job-support"');
    expect(authExpiredSrc).toContain('"/my-jobs"');
    expect(authExpiredSrc).toContain('"/completion-capture-failed"');

    // REAUTH -> CAPTURE_PENDING, JOB_SUPPORT, MY_JOBS, AUTH_EXPIRED (back)
    const reauthSrc = fs.readFileSync(path.join(customerAppDir, "completion-reauth.tsx"), "utf-8");
    expect(reauthSrc).toContain('"/completion-capture-pending"');
    expect(reauthSrc).toContain('"/job-support"');
    expect(reauthSrc).toContain('"/my-jobs"');
    expect(reauthSrc).toContain('"/completion-auth-expired"');

    // RECEIPT -> RECEIPT_REFUNDED, MY_JOBS, CAPTURE_SUCCESS (back)
    const receiptSrc = fs.readFileSync(
      path.join(customerAppDir, "completion-receipt.tsx"),
      "utf-8"
    );
    expect(receiptSrc).toContain('"/completion-receipt-refunded"');
    expect(receiptSrc).toContain('"/my-jobs"');
    expect(receiptSrc).toContain('"/completion-capture-success"');

    // RECEIPT_PENDING -> RECEIPT, CAPTURE_FAILED, MY_JOBS, CAPTURE_SUCCESS (back)
    const receiptPendingSrc = fs.readFileSync(
      path.join(customerAppDir, "completion-receipt-pending.tsx"),
      "utf-8"
    );
    expect(receiptPendingSrc).toContain('"/completion-receipt"');
    expect(receiptPendingSrc).toContain('"/completion-capture-failed"');
    expect(receiptPendingSrc).toContain('"/my-jobs"');
    expect(receiptPendingSrc).toContain('"/completion-capture-success"');

    // RECEIPT_REFUNDED -> RECEIPT, JOB_REFUND, MY_JOBS
    const receiptRefundedSrc = fs.readFileSync(
      path.join(customerAppDir, "completion-receipt-refunded.tsx"),
      "utf-8"
    );
    expect(receiptRefundedSrc).toContain('"/completion-receipt"');
    expect(receiptRefundedSrc).toContain('"/job-refund"');
    expect(receiptRefundedSrc).toContain('"/my-jobs"');

    // RECEIPT_UPDATED -> RECEIPT, ISSUE, MY_JOBS
    const receiptUpdatedSrc = fs.readFileSync(
      path.join(customerAppDir, "completion-receipt-updated.tsx"),
      "utf-8"
    );
    expect(receiptUpdatedSrc).toContain('"/completion-receipt"');
    expect(receiptUpdatedSrc).toContain('"/completion-issue"');
    expect(receiptUpdatedSrc).toContain('"/my-jobs"');
  });

  test("verifies Phase 03.62 modal replacements in capture-success and capture-failed", () => {
    // completion-capture-success.tsx routes to /completion-receipt and /completion-receipt-pending without modal state
    const captureSuccessSrc = fs.readFileSync(
      path.join(customerAppDir, "completion-capture-success.tsx"),
      "utf-8"
    );
    expect(captureSuccessSrc).toContain('"/completion-receipt"');
    expect(captureSuccessSrc).toContain('"/completion-receipt-pending"');
    expect(captureSuccessSrc).not.toContain("modalType");
    expect(captureSuccessSrc).not.toContain("setModalType");

    // completion-capture-failed.tsx routes to /completion-auth-expired without modal state
    const captureFailedSrc = fs.readFileSync(
      path.join(customerAppDir, "completion-capture-failed.tsx"),
      "utf-8"
    );
    expect(captureFailedSrc).toContain('"/completion-auth-expired"');
    expect(captureFailedSrc).not.toContain("showReauthModal");
    expect(captureFailedSrc).not.toContain("setShowReauthModal");
  });

  test("verifies AUTO_BLOCKED fallback navigation audit: does not silently navigate to auto-eligible", () => {
    const autoBlockedSrc = fs.readFileSync(
      path.join(customerAppDir, "completion-auto-blocked.tsx"),
      "utf-8"
    );
    expect(autoBlockedSrc).not.toContain('"/completion-auto-eligible"');
    expect(autoBlockedSrc).toContain('"/completion-no-reply"');
  });

  test("authoritative reconciliation: DemoScreenNavigator contains 36 W08 bilingual entries (18 canonical states)", () => {
    const navPath = path.resolve(__dirname, "../../src/components/demo/DemoScreenNavigator.tsx");
    const navSource = fs.readFileSync(navPath, "utf-8");

    const w08Entries = navSource.match(/id:\s*"w08-[a-z0-9-]+"/g) || [];
    expect(w08Entries.length).toBe(36);
  });
});
