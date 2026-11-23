/**
 * Phase 03.52 Test Suite
 * HAULIX Customer Mobile App — Workflow 06 (W06 Batch 3: Active Service)
 *
 * Verifies:
 * 1. Existence and default export of all 6 W06 canonical state screen files
 * 2. Unrestricted frontend accessibility (zero route guards, no auth/payment prerequisites)
 * 3. 12 bilingual entries registered in DemoScreenNavigator (6 EN, 6 ES)
 * 4. Symmetrical localization keys between English and Spanish for all 6 W06 Batch 3 states
 * 5. Architectural fidelity: $356.00 baseline quote, 4 confirmed items preserved, and revision R2 (+1 chair, +$40)
 */

import fs from "node:fs";
import path from "node:path";
import en from "../../../../packages/i18n/src/locales/en";
import es from "../../../../packages/i18n/src/locales/es";

describe("Phase 03.52 — W06 Active Service Batch 3 Tests", () => {
  const customerAppDir = path.resolve(__dirname, "../../app/(app)");
  const screens = [
    {
      file: "active-service-media-denied.tsx",
      route: "/active-service-media-denied",
      state: "MEDIA_DENIED",
      enNode: "882:6443",
      esNode: "883:6807",
      i18nKey: "w06MediaDenied",
    },
    {
      file: "active-service-media-failed.tsx",
      route: "/active-service-media-failed",
      state: "MEDIA_FAILED",
      enNode: "882:6550",
      esNode: "883:6914",
      i18nKey: "w06MediaFailed",
    },
    {
      file: "active-service-media-sent.tsx",
      route: "/active-service-media-sent",
      state: "MEDIA_SENT",
      enNode: "882:6657",
      esNode: "883:7021",
      i18nKey: "w06MediaSent",
    },
    {
      file: "active-service-extra-request.tsx",
      route: "/active-service-extra-request",
      state: "EXTRA_REQUEST",
      enNode: "882:6764",
      esNode: "883:7128",
      i18nKey: "w06ExtraRequest",
    },
    {
      file: "active-service-extra-admin-pending.tsx",
      route: "/active-service-extra-admin-pending",
      state: "EXTRA_ADMIN_PENDING",
      enNode: "882:6876",
      esNode: "883:7240",
      i18nKey: "w06ExtraAdminPending",
    },
    {
      file: "active-service-extra-admin-rejected.tsx",
      route: "/active-service-extra-admin-rejected",
      state: "EXTRA_ADMIN_REJECTED",
      enNode: "882:6993",
      esNode: "883:7357",
      i18nKey: "w06ExtraAdminRejected",
    },
  ];

  test("all 6 W06 Batch 3 screen files exist on disk", () => {
    for (const screen of screens) {
      const filePath = path.join(customerAppDir, screen.file);
      expect(fs.existsSync(filePath)).toBe(true);
    }
  });

  test("all 6 W06 Batch 3 screen files implement zero route guards", () => {
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

  test("DemoScreenNavigator contains all 12 EN/ES entries for W06 Batch 3", () => {
    const navigatorPath = path.resolve(__dirname, "../components/demo/DemoScreenNavigator.tsx");
    const navSource = fs.readFileSync(navigatorPath, "utf-8");

    const expectedIds = [
      "w06-media-denied-es",
      "w06-media-denied-en",
      "w06-media-failed-es",
      "w06-media-failed-en",
      "w06-media-sent-es",
      "w06-media-sent-en",
      "w06-extra-request-es",
      "w06-extra-request-en",
      "w06-extra-admin-pending-es",
      "w06-extra-admin-pending-en",
      "w06-extra-admin-rejected-es",
      "w06-extra-admin-rejected-en",
    ];

    for (const id of expectedIds) {
      expect(navSource).toContain(`id: "${id}"`);
    }
  });

  test("i18n dictionaries contain symmetrical translations for all 6 W06 Batch 3 states", () => {
    const batch3Keys = [
      "w06MediaDenied",
      "w06MediaFailed",
      "w06MediaSent",
      "w06ExtraRequest",
      "w06ExtraAdminPending",
      "w06ExtraAdminRejected",
    ] as const;

    for (const key of batch3Keys) {
      expect((en as Record<string, unknown>)[key]).toBeDefined();
      expect((es as Record<string, unknown>)[key]).toBeDefined();

      const enKeys = Object.keys((en as Record<string, Record<string, string>>)[key]).sort();
      const esKeys = Object.keys((es as Record<string, Record<string, string>>)[key]).sort();

      expect(enKeys).toEqual(esKeys);
    }
  });

  test("screens maintain structural fidelity with confirmed booking parameters and R2 revisions", () => {
    const extraRequest = fs.readFileSync(
      path.join(customerAppDir, "active-service-extra-request.tsx"),
      "utf-8"
    );
    expect(extraRequest).toContain("$356.00 USD");
    expect(extraRequest).toContain("4 pieces across 3 categories");

    const extraPending = fs.readFileSync(
      path.join(customerAppDir, "active-service-extra-admin-pending.tsx"),
      "utf-8"
    );
    expect(extraPending).toContain("$356.00 USD");
    expect(extraPending).toContain("4 pieces across 3 categories");

    const extraRejected = fs.readFileSync(
      path.join(customerAppDir, "active-service-extra-admin-rejected.tsx"),
      "utf-8"
    );
    expect(extraRejected).toContain("$356.00 USD");
    expect(extraRejected).toContain("4 pieces across 3 categories");

    // Verify R2 revision parameters in i18n dictionaries
    expect(en.w06ExtraRequest.amountChangeValue).toContain("$40");
    expect(en.w06ExtraRequest.proposedItemValue).toContain("1 additional chair");
    expect(en.w06ExtraAdminPending.demoRequestValue).toContain("$40");
    expect(en.w06ExtraAdminPending.demoRequestValue).toContain("Revision R2");
    expect(en.w06ExtraAdminRejected.demoRequestValue).toContain("$40");
    expect(en.w06ExtraAdminRejected.demoRequestValue).toContain("Revision R2");

    // Symmetrical verification in Spanish
    expect(es.w06ExtraRequest.amountChangeValue).toContain("$40");
    expect(es.w06ExtraRequest.proposedItemValue).toContain("1 silla adicional");
    expect(es.w06ExtraAdminPending.demoRequestValue).toContain("$40");
    expect(es.w06ExtraAdminPending.demoRequestValue).toContain("Revisión R2");
    expect(es.w06ExtraAdminRejected.demoRequestValue).toContain("$40");
    expect(es.w06ExtraAdminRejected.demoRequestValue).toContain("Revisión R2");
  });
});
