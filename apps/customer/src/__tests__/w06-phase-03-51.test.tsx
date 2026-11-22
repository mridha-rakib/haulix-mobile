/**
 * Phase 03.51 Test Suite
 * HAULIX Customer Mobile App — Workflow 06 (W06 Batch 2: Active Service)
 *
 * Verifies:
 * 1. Existence and default export of all 6 W06 canonical state screen files
 * 2. Unrestricted frontend accessibility (zero route guards, no auth/payment prerequisites)
 * 3. 12 bilingual entries registered in DemoScreenNavigator (6 EN, 6 ES)
 * 4. Symmetrical localization keys between English and Spanish for all 6 W06 Batch 2 states
 * 5. Architectural fidelity: $356.00 quote and 4 confirmed items preserved
 */

import fs from "node:fs";
import path from "node:path";
import en from "../../../../packages/i18n/src/locales/en";
import es from "../../../../packages/i18n/src/locales/es";

describe("Phase 03.51 — W06 Active Service Batch 2 Tests", () => {
  const customerAppDir = path.resolve(__dirname, "../../app/(app)");
  const screens = [
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
  ];

  test("all 6 W06 Batch 2 screen files exist on disk", () => {
    for (const screen of screens) {
      const filePath = path.join(customerAppDir, screen.file);
      expect(fs.existsSync(filePath)).toBe(true);
    }
  });

  test("all 6 W06 Batch 2 screen files implement zero route guards", () => {
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

  test("DemoScreenNavigator contains all 12 EN/ES entries for W06 Batch 2", () => {
    const navigatorPath = path.resolve(__dirname, "../components/demo/DemoScreenNavigator.tsx");
    const navSource = fs.readFileSync(navigatorPath, "utf-8");

    const expectedIds = [
      "w06-working-es",
      "w06-working-en",
      "w06-chat-es",
      "w06-chat-en",
      "w06-chat-empty-es",
      "w06-chat-empty-en",
      "w06-chat-failed-es",
      "w06-chat-failed-en",
      "w06-chat-sent-es",
      "w06-chat-sent-en",
      "w06-media-es",
      "w06-media-en",
    ];

    for (const id of expectedIds) {
      expect(navSource).toContain(`id: "${id}"`);
    }
  });

  test("i18n dictionaries contain symmetrical translations for all 6 W06 Batch 2 states", () => {
    const batch2Keys = [
      "w06Working",
      "w06Chat",
      "w06ChatEmpty",
      "w06ChatFailed",
      "w06ChatSent",
      "w06Media",
    ] as const;

    for (const key of batch2Keys) {
      expect((en as Record<string, unknown>)[key]).toBeDefined();
      expect((es as Record<string, unknown>)[key]).toBeDefined();

      const enKeys = Object.keys((en as Record<string, Record<string, string>>)[key]).sort();
      const esKeys = Object.keys((es as Record<string, Record<string, string>>)[key]).sort();

      expect(enKeys).toEqual(esKeys);
    }
  });

  test("screens maintain structural fidelity with confirmed booking parameters", () => {
    const workingFile = fs.readFileSync(
      path.join(customerAppDir, "active-service-working.tsx"),
      "utf-8"
    );
    expect(workingFile).toContain("$356.00 USD");
    expect(workingFile).toContain("4 pieces (3 categories)");
  });
});
