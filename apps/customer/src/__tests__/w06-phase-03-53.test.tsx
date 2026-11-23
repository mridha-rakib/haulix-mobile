/**
 * Phase 03.53 Test Suite
 * HAULIX Customer Mobile App — Workflow 06 (W06 Batch 4: Additional Work Decisions & Service Exceptions)
 *
 * Verifies:
 * 1. Existence and default export of all 6 W06 canonical state screen files (States 19-24)
 * 2. Unrestricted frontend accessibility (zero route guards, no auth/payment prerequisites)
 * 3. 12 bilingual entries registered in DemoScreenNavigator (6 EN, 6 ES)
 * 4. Symmetrical localization keys between English and Spanish for all 6 W06 Batch 4 states
 * 5. Distinct routing destinations and decision branches (Admin approval -> Customer accept/decline/expire)
 * 6. Strict architectural separation between W05 /driver-no-show and W06 /active-service-no-show
 * 7. Strict architectural separation between Admin rejection (EXTRA_ADMIN_REJECTED) and Customer decline (EXTRA_DECLINED)
 * 8. Location sharing terminated / closed behavior in GPS_CLOSED
 * 9. Structural fidelity: $356.00 baseline quote, 4 confirmed items preserved, and revision R2 (+$40)
 */

import fs from "node:fs";
import path from "node:path";
import en from "../../../../packages/i18n/src/locales/en";
import es from "../../../../packages/i18n/src/locales/es";

describe("Phase 03.53 — W06 Active Service Batch 4 Tests", () => {
  const customerAppDir = path.resolve(__dirname, "../../app/(app)");
  const screens = [
    {
      file: "active-service-extra-approved.tsx",
      route: "/active-service-extra-approved",
      state: "EXTRA_APPROVED",
      enNode: "882:7105",
      esNode: "883:7469",
      i18nKey: "w06ExtraApproved",
    },
    {
      file: "active-service-extra-expired.tsx",
      route: "/active-service-extra-expired",
      state: "EXTRA_EXPIRED",
      enNode: "882:7222",
      esNode: "883:7586",
      i18nKey: "w06ExtraExpired",
    },
    {
      file: "active-service-extra-accepted.tsx",
      route: "/active-service-extra-accepted",
      state: "EXTRA_ACCEPTED",
      enNode: "882:7339",
      esNode: "883:7703",
      i18nKey: "w06ExtraAccepted",
    },
    {
      file: "active-service-extra-declined.tsx",
      route: "/active-service-extra-declined",
      state: "EXTRA_DECLINED",
      enNode: "882:7451",
      esNode: "883:7815",
      i18nKey: "w06ExtraDeclined",
    },
    {
      file: "active-service-no-show.tsx",
      route: "/active-service-no-show",
      state: "NO_SHOW",
      enNode: "882:7563",
      esNode: "883:7927",
      i18nKey: "w06NoShow",
    },
    {
      file: "active-service-gps-closed.tsx",
      route: "/active-service-gps-closed",
      state: "GPS_CLOSED",
      enNode: "882:7670",
      esNode: "883:8034",
      i18nKey: "w06GpsClosed",
    },
  ];

  test("all 6 W06 Batch 4 screen files exist on disk with default export", () => {
    for (const screen of screens) {
      const filePath = path.join(customerAppDir, screen.file);
      expect(fs.existsSync(filePath)).toBe(true);
      const source = fs.readFileSync(filePath, "utf-8");
      expect(source).toContain("export default function");
    }
  });

  test("all 6 W06 Batch 4 screen files implement zero route guards and hardware BackHandler", () => {
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

  test("DemoScreenNavigator contains all 12 EN/ES entries for W06 Batch 4", () => {
    const navigatorPath = path.resolve(__dirname, "../components/demo/DemoScreenNavigator.tsx");
    const navSource = fs.readFileSync(navigatorPath, "utf-8");

    const expectedIds = [
      "w06-extra-approved-es",
      "w06-extra-approved-en",
      "w06-extra-expired-es",
      "w06-extra-expired-en",
      "w06-extra-accepted-es",
      "w06-extra-accepted-en",
      "w06-extra-declined-es",
      "w06-extra-declined-en",
      "w06-no-show-es",
      "w06-no-show-en",
      "w06-gps-closed-es",
      "w06-gps-closed-en",
    ];

    for (const id of expectedIds) {
      expect(navSource).toContain(`id: "${id}"`);
    }
  });

  test("i18n dictionaries contain symmetrical translations for all 6 W06 Batch 4 states", () => {
    const batch4Keys = [
      "w06ExtraApproved",
      "w06ExtraExpired",
      "w06ExtraAccepted",
      "w06ExtraDeclined",
      "w06NoShow",
      "w06GpsClosed",
    ] as const;

    for (const key of batch4Keys) {
      expect((en as Record<string, unknown>)[key]).toBeDefined();
      expect((es as Record<string, unknown>)[key]).toBeDefined();

      const enKeys = Object.keys((en as Record<string, Record<string, string>>)[key]).sort();
      const esKeys = Object.keys((es as Record<string, Record<string, string>>)[key]).sort();

      expect(enKeys).toEqual(esKeys);
    }
  });

  test("verifies conceptual decision branches and router destinations in extra work screens", () => {
    // 1. EXTRA_ADMIN_PENDING routes to EXTRA_APPROVED upon approved preview
    const adminPendingSource = fs.readFileSync(
      path.join(customerAppDir, "active-service-extra-admin-pending.tsx"),
      "utf-8"
    );
    expect(adminPendingSource).toContain('pathname: "/active-service-extra-approved"');
    expect(adminPendingSource).toContain('pathname: "/active-service-extra-admin-rejected"');

    // 2. EXTRA_APPROVED routes to EXTRA_ACCEPTED on accept, EXTRA_DECLINED on decline
    const approvedSource = fs.readFileSync(
      path.join(customerAppDir, "active-service-extra-approved.tsx"),
      "utf-8"
    );
    expect(approvedSource).toContain('pathname: "/active-service-extra-accepted"');
    expect(approvedSource).toContain('pathname: "/active-service-extra-declined"');

    // 3. EXTRA_EXPIRED prevents acceptance and routes to request review or working
    const expiredSource = fs.readFileSync(
      path.join(customerAppDir, "active-service-extra-expired.tsx"),
      "utf-8"
    );
    expect(expiredSource).toContain('pathname: "/active-service-extra-request"');
    expect(expiredSource).toContain('pathname: "/active-service-working"');
    expect(expiredSource).not.toContain('pathname: "/active-service-extra-accepted"');

    // 4. EXTRA_ACCEPTED routes back to working or completion handoff
    const acceptedSource = fs.readFileSync(
      path.join(customerAppDir, "active-service-extra-accepted.tsx"),
      "utf-8"
    );
    expect(acceptedSource).toContain('pathname: "/active-service-working"');
    expect(acceptedSource).toContain('pathname: "/active-service-completion-bridge"');

    // 5. EXTRA_DECLINED routes to working and chat
    const declinedSource = fs.readFileSync(
      path.join(customerAppDir, "active-service-extra-declined.tsx"),
      "utf-8"
    );
    expect(declinedSource).toContain('pathname: "/active-service-working"');
    expect(declinedSource).toContain('pathname: "/active-service-chat"');
  });

  test("verifies strict separation between W05 /driver-no-show and W06 /active-service-no-show", () => {
    const w05NoShowPath = path.join(customerAppDir, "driver-no-show.tsx");
    const w06NoShowPath = path.join(customerAppDir, "active-service-no-show.tsx");

    expect(fs.existsSync(w05NoShowPath)).toBe(true);
    expect(fs.existsSync(w06NoShowPath)).toBe(true);

    const w05Source = fs.readFileSync(w05NoShowPath, "utf-8");
    const w06Source = fs.readFileSync(w06NoShowPath, "utf-8");

    // Both files must be independent and not duplicate each other's testIDs
    expect(w05Source).toContain("w05-no-show-header");
    expect(w06Source).toContain("w06-no-show-header");
  });

  test("verifies strict separation between Admin rejection and Customer decline", () => {
    // EXTRA_ADMIN_REJECTED represents Admin refusal (e.g. vehicle capacity)
    expect(en.w06ExtraAdminRejected.statusBadge).toBe("ADMIN DECLINED");
    expect(es.w06ExtraAdminRejected.statusBadge).toBe("ADMIN RECHAZÓ");

    // EXTRA_DECLINED represents explicit customer refusal of the extra work
    expect(en.w06ExtraDeclined.statusBadge).toBe("ORIGINAL SCOPE ONLY");
    expect(es.w06ExtraDeclined.statusBadge).toBe("SOLO ALCANCE ORIGINAL");
  });

  test("verifies location sharing ended state in GPS_CLOSED", () => {
    const gpsClosedSource = fs.readFileSync(
      path.join(customerAppDir, "active-service-gps-closed.tsx"),
      "utf-8"
    );
    expect(gpsClosedSource).toContain("w06-gps-closed-header");
    expect(en.w06GpsClosed.statusBadge).toBe("GPS CLOSED");
    expect(es.w06GpsClosed.statusBadge).toBe("GPS CERRADO");
    expect(en.w06GpsClosed.locationStoppedTitle).toBe("Location stopped when job closes");
    expect(es.w06GpsClosed.locationStoppedTitle).toBe("Ubicación detenida al cerrar servicio");
  });

  test("screens maintain structural fidelity with confirmed booking parameters and R2 revisions", () => {
    for (const screen of screens) {
      const source = fs.readFileSync(path.join(customerAppDir, screen.file), "utf-8");
      expect(source).toContain("$356.00 USD");
      expect(source).toContain("4 pieces across 3 categories");
    }

    // Verify R2 revision parameters in i18n dictionaries
    expect(en.w06ExtraApproved.amountChangeValue).toContain("$40");
    expect(en.w06ExtraApproved.proposedItemValue).toContain("1 additional chair");
    expect(en.w06ExtraExpired.amountChangeValue).toContain("$40");
    expect(en.w06ExtraAccepted.amountChangeValue).toContain("$40");
    expect(en.w06ExtraDeclined.amountChangeValue).toContain("$40");

    // Symmetrical verification in Spanish
    expect(es.w06ExtraApproved.amountChangeValue).toContain("$40");
    expect(es.w06ExtraApproved.proposedItemValue).toContain("1 silla adicional");
    expect(es.w06ExtraExpired.amountChangeValue).toContain("$40");
    expect(es.w06ExtraAccepted.amountChangeValue).toContain("$40");
    expect(es.w06ExtraDeclined.amountChangeValue).toContain("$40");
  });
});
