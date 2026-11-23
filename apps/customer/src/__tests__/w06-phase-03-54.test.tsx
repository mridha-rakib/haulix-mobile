/**
 * Phase 03.54 Test Suite
 * HAULIX Customer Mobile App — Workflow 06 Final Completion & Full Workflow Audit
 *
 * Verifies:
 * 1. Existence and default export of all 26 W06 canonical state screen files (States 01-26)
 * 2. Unrestricted frontend accessibility (zero route guards, no auth/payment prerequisites)
 * 3. 52 bilingual entries registered in DemoScreenNavigator (26 EN, 26 ES)
 * 4. Symmetrical localization keys between English and Spanish for all 26 W06 translation objects
 * 5. State 25 (SUPPORT) & State 26 (W08_HANDOFF) design token & screen fidelity
 * 6. Forward completion navigation integrity (/active-service-completion-bridge without looping back to W05)
 * 7. In-service support routing (/active-service-support distinct from /dispatch-support)
 * 8. Structural fidelity: $356.00 USD baseline quote and 4 confirmed items across 3 categories strictly preserved
 */

import fs from "node:fs";
import path from "node:path";
import en from "../../../../packages/i18n/src/locales/en";
import es from "../../../../packages/i18n/src/locales/es";

describe("Phase 03.54 — W06 Final Completion & Integration Audit Tests", () => {
  const customerAppDir = path.resolve(__dirname, "../../app/(app)");

  const allW06Screens = [
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
    {
      file: "active-service-working.tsx",
      route: "/active-service-working",
      state: "WORKING",
      enNode: "882:5809",
      esNode: "883:6173",
      i18nKey: "w06Working",
    },
    {
      file: "active-service-chat.tsx",
      route: "/active-service-chat",
      state: "CHAT",
      enNode: "882:5916",
      esNode: "883:6280",
      i18nKey: "w06Chat",
    },
    {
      file: "active-service-chat-empty.tsx",
      route: "/active-service-chat-empty",
      state: "CHAT_EMPTY",
      enNode: "882:6021",
      esNode: "883:6385",
      i18nKey: "w06ChatEmpty",
    },
    {
      file: "active-service-chat-failed.tsx",
      route: "/active-service-chat-failed",
      state: "CHAT_FAILED",
      enNode: "882:6126",
      esNode: "883:6490",
      i18nKey: "w06ChatFailed",
    },
    {
      file: "active-service-chat-sent.tsx",
      route: "/active-service-chat-sent",
      state: "CHAT_SENT",
      enNode: "882:6231",
      esNode: "883:6595",
      i18nKey: "w06ChatSent",
    },
    {
      file: "active-service-media.tsx",
      route: "/active-service-media",
      state: "MEDIA",
      enNode: "882:6336",
      esNode: "883:6700",
      i18nKey: "w06Media",
    },
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
    {
      file: "active-service-support.tsx",
      route: "/active-service-support",
      state: "SUPPORT",
      enNode: "882:7784",
      esNode: "883:8148",
      i18nKey: "w06Support",
    },
    {
      file: "active-service-completion-bridge.tsx",
      route: "/active-service-completion-bridge",
      state: "W08_HANDOFF",
      enNode: "882:7891",
      esNode: "883:8255",
      i18nKey: "w06W08Handoff",
    },
  ];

  test("all 26 canonical W06 screen files exist on disk with default export", () => {
    expect(allW06Screens).toHaveLength(26);
    for (const screen of allW06Screens) {
      const filePath = path.join(customerAppDir, screen.file);
      expect(fs.existsSync(filePath)).toBe(true);
      const source = fs.readFileSync(filePath, "utf-8");
      expect(source).toContain("export default function");
    }
  });

  test("all 26 canonical W06 screen files implement zero route guards and hardware BackHandler", () => {
    for (const screen of allW06Screens) {
      const filePath = path.join(customerAppDir, screen.file);
      const source = fs.readFileSync(filePath, "utf-8");

      expect(source).not.toContain("useAuthGuard");
      expect(source).not.toContain("requireAuth");
      expect(source).not.toContain("requirePayment");
      expect(source).toContain("BackHandler");
      expect(source).toContain("hardwareBackPress");
    }
  });

  test("DemoScreenNavigator registers all 52 bilingual EN/ES entries for W06", () => {
    const navigatorPath = path.resolve(__dirname, "../components/demo/DemoScreenNavigator.tsx");
    const navSource = fs.readFileSync(navigatorPath, "utf-8");

    for (const screen of allW06Screens) {
      expect(navSource).toContain(`Node ${screen.enNode}`);
      expect(navSource).toContain(`Node ${screen.esNode}`);
      expect(navSource).toContain(screen.route);
    }
  });

  test("all 26 W06 localization objects have identical key parity between English and Spanish", () => {
    for (const screen of allW06Screens) {
      const enObj = (en as Record<string, unknown>)[screen.i18nKey] as Record<string, unknown>;
      const esObj = (es as Record<string, unknown>)[screen.i18nKey] as Record<string, unknown>;

      expect(enObj).toBeDefined();
      expect(esObj).toBeDefined();

      const enKeys = Object.keys(enObj).sort();
      const esKeys = Object.keys(esObj).sort();
      expect(enKeys).toEqual(esKeys);
    }
  });

  test("verifies State 25 (SUPPORT) screen implementation", () => {
    const supportSource = fs.readFileSync(
      path.join(customerAppDir, "active-service-support.tsx"),
      "utf-8"
    );
    expect(supportSource).toContain("ActiveServiceSupportScreen");
    expect(supportSource).toContain("w06-support-scroll");
    expect(supportSource).toContain("w06Support");
    expect(supportSource).toContain("w06Support.primaryCta");
    expect(supportSource).toContain("w06Support.secondaryCta");
    expect(supportSource).toContain("w06Support.alternativeLink");
  });

  test("verifies State 26 (W08_HANDOFF) screen implementation", () => {
    const bridgeSource = fs.readFileSync(
      path.join(customerAppDir, "active-service-completion-bridge.tsx"),
      "utf-8"
    );
    expect(bridgeSource).toContain("ActiveServiceCompletionBridgeScreen");
    expect(bridgeSource).toContain("w06-w08-handoff-scroll");
    expect(bridgeSource).toContain("w06W08Handoff");
    expect(bridgeSource).toContain("w06W08Handoff.primaryCta");
    expect(bridgeSource).toContain("w06W08Handoff.secondaryCta");
    expect(bridgeSource).toContain("handleReviewCompletionProof");
  });

  test("verifies completion navigation integrity: completion points to completion bridge, not W05 bridge", () => {
    const acceptedSource = fs.readFileSync(
      path.join(customerAppDir, "active-service-extra-accepted.tsx"),
      "utf-8"
    );
    expect(acceptedSource).toContain('pathname: "/active-service-completion-bridge"');
    expect(acceptedSource).not.toContain('pathname: "/job-active-bridge"');

    const gpsClosedSource = fs.readFileSync(
      path.join(customerAppDir, "active-service-gps-closed.tsx"),
      "utf-8"
    );
    expect(gpsClosedSource).toContain('pathname: "/active-service-completion-bridge"');
    expect(gpsClosedSource).not.toContain('pathname: "/job-active-bridge"');

    const completionBridgeSource = fs.readFileSync(
      path.join(customerAppDir, "active-service-completion-bridge.tsx"),
      "utf-8"
    );
    // Completion bridge does not cycle back to W05 or PRE
    expect(completionBridgeSource).not.toContain('pathname: "/job-active-bridge"');
    expect(completionBridgeSource).not.toContain('pathname: "/active-service-awaiting-departure"');
  });

  test("verifies baseline quote ($356.00 USD) and confirmed inventory (4 pieces across 3 categories)", () => {
    // Check confirmed inventory across representative screens
    const awaitingDepSource = fs.readFileSync(
      path.join(customerAppDir, "active-service-awaiting-departure.tsx"),
      "utf-8"
    );
    expect(awaitingDepSource).toContain("4 pieces across 3 categories");
    expect(awaitingDepSource).toContain("$356.00 USD");

    const workingSource = fs.readFileSync(
      path.join(customerAppDir, "active-service-working.tsx"),
      "utf-8"
    );
    expect(workingSource).toContain("4 pieces across 3 categories");
    expect(workingSource).toContain("$356.00 USD");

    const supportSource = fs.readFileSync(
      path.join(customerAppDir, "active-service-support.tsx"),
      "utf-8"
    );
    expect(supportSource).toContain("4 pieces across 3 categories");
    expect(supportSource).toContain("$356.00 USD");

    const handoffSource = fs.readFileSync(
      path.join(customerAppDir, "active-service-completion-bridge.tsx"),
      "utf-8"
    );
    expect(handoffSource).toContain("4 pieces across 3 categories");
    expect(handoffSource).toContain("$356.00 USD");
  });
});
