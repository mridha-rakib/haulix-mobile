import { LOCAL_AVATARS } from "../assets/localAvatars";
import { DRIVER_DEMO_SCREENS } from "../components/demo/driverDemoScreens";
import { useCompletionEvidenceStore } from "../stores/completionEvidenceStore";
import { useNotificationStore } from "../stores/notificationStore";
import { resetAllStores } from "../stores/resetAllStores";
import { useSupportStore } from "../stores/supportStore";
import { APPROVED_MOCK_FEE_QUOTES, useWalletStore } from "../stores/walletStore";
import { useWorkerProfileStore } from "../stores/workerProfileStore";

describe("DW-FINAL Consolidated Frontend QA & Integrity", () => {
  beforeEach(() => {
    resetAllStores();
  });

  describe("1. Demo Navigator Inventory & Overlay Registration", () => {
    test("registers all 136 canonical bilingual screens and 14 supporting overlays", () => {
      const canonicalScreens = DRIVER_DEMO_SCREENS.filter((s) => s.id.startsWith("DW"));
      expect(canonicalScreens.length).toBe(136);

      const overlayScreens = DRIVER_DEMO_SCREENS.filter((s) => s.id.startsWith("OV"));
      expect(overlayScreens.length).toBe(14);

      // Total catalog items including the 6 tab navigation shortcuts
      expect(DRIVER_DEMO_SCREENS.length).toBe(156);
    });

    test("contains all 14 supporting overlays (OV01 to OV07 in EN and ES)", () => {
      const overlayScreens = DRIVER_DEMO_SCREENS.filter((s) => s.id.startsWith("OV"));
      expect(overlayScreens.length).toBe(14);

      const overlayIds = overlayScreens.map((s) => s.id);
      expect(overlayIds).toContain("OV01-EN");
      expect(overlayIds).toContain("OV01-ES");
      expect(overlayIds).toContain("OV02-EN");
      expect(overlayIds).toContain("OV02-ES");
      expect(overlayIds).toContain("OV03-EN");
      expect(overlayIds).toContain("OV03-ES");
      expect(overlayIds).toContain("OV04-EN");
      expect(overlayIds).toContain("OV04-ES");
      expect(overlayIds).toContain("OV05-EN");
      expect(overlayIds).toContain("OV05-ES");
      expect(overlayIds).toContain("OV06-EN");
      expect(overlayIds).toContain("OV06-ES");
      expect(overlayIds).toContain("OV07-EN");
      expect(overlayIds).toContain("OV07-ES");
    });

    test("contains exactly 68 unique canonical screen codes (DW01 to DW68)", () => {
      const canonicalScreens = DRIVER_DEMO_SCREENS.filter((s) => s.id.startsWith("DW"));
      const uniqueBaseCodes = new Set(canonicalScreens.map((s) => s.id.replace(/-E[NS]$/, "")));
      expect(uniqueBaseCodes.size).toBe(68);
      for (let i = 1; i <= 68; i++) {
        const code = `DW${i.toString().padStart(2, "0")}`;
        expect(uniqueBaseCodes.has(code)).toBe(true);
      }
    });
  });

  describe("2. Full State Reset Utility (resetAllStores)", () => {
    test("clears mutated state across stores back to initial canonical fixtures", () => {
      // Mutate wallet
      useWalletStore.getState().requestStandardCashOut("driver", 50000);
      expect(useWalletStore.getState().driverLedger.availableBalanceCents).toBe(78000);

      // Mutate support
      useSupportStore
        .getState()
        .submitTicket("driver", "earnings", "Need help with payment", undefined, {
          subject: "Test Issue",
        });
      expect(useSupportStore.getState().tickets.length).toBeGreaterThan(0);

      // Call global reset
      resetAllStores();

      // Verify reset
      expect(useWalletStore.getState().driverLedger.availableBalanceCents).toBe(128000);
      expect(useWalletStore.getState().driverLedger.reservedBalanceCents).toBe(0);
      expect(useSupportStore.getState().tickets.length).toBe(0);
    });
  });

  describe("3. Deterministic Fee Quotes & Strict Instant Cash Out Consent", () => {
    test("APPROVED_MOCK_FEE_QUOTES matches approved specifications", () => {
      expect(APPROVED_MOCK_FEE_QUOTES[128000]).toBe(1920); // $1,280.00 -> $19.20
      expect(APPROVED_MOCK_FEE_QUOTES[50000]).toBe(750); // $500.00 -> $7.50
      expect(APPROVED_MOCK_FEE_QUOTES[34000]).toBe(510); // $340.00 -> $5.10
      expect(APPROVED_MOCK_FEE_QUOTES[10000]).toBe(200); // $100.00 -> $2.00
      expect(APPROVED_MOCK_FEE_QUOTES[5000]).toBe(150); // $50.00 -> $1.50
    });

    test("rejects unapproved amounts without guessing or percentage formulas", () => {
      const walletStore = useWalletStore.getState();
      expect(walletStore.getInstantFeeQuote("driver", 77777)).toBeNull();
      expect(walletStore.getInstantFeeQuote("driver", 9999)).toBeNull();
    });

    test("removes consent-bypass: rejects instant cash out without previously reviewed valid quote", () => {
      const walletStore = useWalletStore.getState();
      walletStore.setActiveRole("driver");

      // No quote has been generated yet
      const resWithoutQuote = walletStore.requestInstantCashOut("driver", "fake-quote-id");
      expect(resWithoutQuote.success).toBe(false);
      expect(resWithoutQuote.error).toBe("INVALID_QUOTE");
    });

    test("rejects quote if worker role does not match context", () => {
      const walletStore = useWalletStore.getState();
      walletStore.setActiveRole("driver");
      const quote = walletStore.getInstantFeeQuote("driver", 128000);
      expect(quote).toBeDefined();

      // Attempt to execute with mismatched role "helper"
      const res = walletStore.requestInstantCashOut("helper", quote!.quoteId);
      expect(res.success).toBe(false);
      expect(res.error).toBe("WORKER_MISMATCH");
    });

    test("rejects instant cash out if quote is expired", () => {
      const walletStore = useWalletStore.getState();
      walletStore.setActiveRole("driver");
      const quote = walletStore.getInstantFeeQuote("driver", 128000);
      expect(quote).toBeDefined();

      // Manually set quote to past expiration
      useWalletStore.setState({
        activeQuote: {
          ...quote!,
          validUntilIso: new Date(Date.now() - 1000).toISOString(),
        },
      });

      const res = walletStore.requestInstantCashOut("driver", quote!.quoteId);
      expect(res.success).toBe(false);
      expect(res.error).toBe("QUOTE_EXPIRED");
    });

    test("standard bank withdrawal uses stable intent across repeated confirmations", () => {
      const walletStore = useWalletStore.getState();
      walletStore.setActiveRole("driver");

      // Consecutive calls without customIntentId reuse the stable session intent
      const res1 = walletStore.requestStandardCashOut("driver", 50000);
      expect(res1.success).toBe(true);
      expect(walletStore.getActiveWallet().availableBalanceCents).toBe(78000);

      const res2 = walletStore.requestStandardCashOut("driver", 50000);
      expect(res2.success).toBe(true);
      expect(res2.transaction?.id).toBe(res1.transaction?.id);
      expect(walletStore.getActiveWallet().availableBalanceCents).toBe(78000);
    });
  });

  describe("4. Payout Idempotency & Lifecycle", () => {
    test("re-requesting with existing active intent returns identical transaction without double reservation", () => {
      const walletStore = useWalletStore.getState();
      walletStore.setActiveRole("driver");

      const intentId = "intent-idemp-test-01";
      const res1 = walletStore.requestStandardCashOut("driver", 50000, intentId);
      expect(res1.success).toBe(true);
      expect(walletStore.getActiveWallet().availableBalanceCents).toBe(78000);
      expect(walletStore.getActiveWallet().reservedBalanceCents).toBe(50000);

      // Duplicate request with same intent
      const res2 = walletStore.requestStandardCashOut("driver", 50000, intentId);
      expect(res2.success).toBe(true);
      expect(res2.transaction?.id).toBe(res1.transaction?.id);
      // Balances must remain unchanged
      expect(walletStore.getActiveWallet().availableBalanceCents).toBe(78000);
      expect(walletStore.getActiveWallet().reservedBalanceCents).toBe(50000);
    });

    test("re-requesting with previously failed intent returns explicit error requiring retry", () => {
      const walletStore = useWalletStore.getState();
      walletStore.setActiveRole("driver");

      const intentId = "intent-fail-test-02";
      const res1 = walletStore.requestStandardCashOut("driver", 50000, intentId);
      walletStore.simulatePayoutFailure("driver", res1.transaction!.id, "Account closed");

      // Attempt duplicate request with same failed intent
      const res2 = walletStore.requestStandardCashOut("driver", 50000, intentId);
      expect(res2.success).toBe(false);
      expect(res2.error).toBe("DUPLICATE_REQUEST");
    });
  });

  describe("5. Earnings Eligibility & Per-Worker Independent Credit", () => {
    test("requires completion verification and payment settlement before releasing funds", () => {
      const walletStore = useWalletStore.getState();
      const compStore = useCompletionEvidenceStore.getState();
      const testJobId = "HX-AZ-DEMO-0042";
      walletStore.setActiveRole("driver");

      // Submit driver evidence
      compStore.attachDriverEvidence(testJobId, "before", "sofa-before.jpg");
      compStore.attachDriverEvidence(testJobId, "after", "sofa-after.jpg");
      compStore.submitDriverCompletion(testJobId);

      // Unverified check: completionVerificationStatus is UNVERIFIED -> rejected
      compStore.setCustomerReviewDecision(testJobId, "CONFIRMED");
      compStore.setCompletionVerificationStatus(testJobId, "UNVERIFIED");
      const unverifiedCredit = walletStore.creditJobEarningsToAvailable(testJobId, "driver");
      expect(unverifiedCredit).toBe(false);

      // Settlement check: paymentCaptureStatus is CAPTURE_SUCCESS but NOT SETTLED -> rejected
      compStore.setCompletionVerificationStatus(testJobId, "VERIFIED");
      useCompletionEvidenceStore.setState((s) => ({
        completionByJob: {
          ...s.completionByJob,
          [testJobId]: {
            ...s.completionByJob[testJobId],
            paymentCaptureStatus: "CAPTURE_SUCCESS" as const,
          },
        },
      }));
      const unsettledCredit = walletStore.creditJobEarningsToAvailable(testJobId, "driver");
      expect(unsettledCredit).toBe(false);

      // Now set paymentCaptureStatus to SETTLED -> driver credit succeeds!
      useCompletionEvidenceStore.setState((s) => ({
        completionByJob: {
          ...s.completionByJob,
          [testJobId]: {
            ...s.completionByJob[testJobId],
            paymentCaptureStatus: "SETTLED" as const,
          },
        },
      }));
      const initialDriverBal = walletStore.getWalletForRole("driver").availableBalanceCents;
      const driverCreditSuccess = walletStore.creditJobEarningsToAvailable(testJobId, "driver");
      expect(driverCreditSuccess).toBe(true);
      expect(walletStore.getWalletForRole("driver").availableBalanceCents).toBe(
        initialDriverBal + 9800
      );

      // Duplicate Driver credit is blocked
      const driverDuplicateCredit = walletStore.creditJobEarningsToAvailable(testJobId, "driver");
      expect(driverDuplicateCredit).toBe(false);

      // Helper is entitled to their own credit and is NOT blocked by Driver credit!
      const initialHelperBal = walletStore.getWalletForRole("helper").availableBalanceCents;
      const helperCreditSuccess = walletStore.creditJobEarningsToAvailable(testJobId, "helper");
      expect(helperCreditSuccess).toBe(true);
      expect(walletStore.getWalletForRole("helper").availableBalanceCents).toBe(
        initialHelperBal + 4900
      );

      // Duplicate Helper credit is blocked
      const helperDuplicateCredit = walletStore.creditJobEarningsToAvailable(testJobId, "helper");
      expect(helperDuplicateCredit).toBe(false);
    });
  });

  describe("6. Offline Avatar Assets & Worker Profiles", () => {
    test("worker profiles use local base64 data URIs with zero remote Unsplash URLs", () => {
      const { driverProfile, helperProfile } = useWorkerProfileStore.getState();

      expect(driverProfile.avatarUrl).toMatch(/^data:image\/png;base64,/);
      expect(helperProfile.avatarUrl).toMatch(/^data:image\/png;base64,/);
      expect(driverProfile.avatarUrl).not.toContain("unsplash.com");
      expect(helperProfile.avatarUrl).not.toContain("unsplash.com");

      expect(driverProfile.id).toBe("DRV-8821");
      expect(helperProfile.id).toBe("HLP-4402");
    });

    test("LOCAL_AVATARS exports valid data URIs for camera, gallery, driver, and helper", () => {
      expect(LOCAL_AVATARS.driver_alex).toMatch(/^data:image\/png;base64,/);
      expect(LOCAL_AVATARS.helper_marcus).toMatch(/^data:image\/png;base64,/);
      expect(LOCAL_AVATARS.avatar_camera).toMatch(/^data:image\/png;base64,/);
      expect(LOCAL_AVATARS.avatar_gallery).toMatch(/^data:image\/png;base64,/);
    });
  });

  describe("7. Support Ticket Store Integrity", () => {
    test("submits ticket with collision-resistant ID and worker ID binding", () => {
      const store = useSupportStore.getState();
      const res = store.submitTicket(
        "driver",
        "earnings",
        "Tip was not reflected after job completion",
        undefined,
        { subject: "Missing Tip" }
      );

      expect(res.success).toBe(true);
      expect(res.ticket).toBeDefined();
      expect(res.ticket?.ticketId).toMatch(/^TKT-2026-\d{4}-\d{3}$/);
      expect(res.ticket?.workerId).toBe("DRV-8821");
      expect(res.ticket?.status).toBe("received");
    });

    test("idempotently returns existing ticket for duplicate submission with identical message/category", () => {
      const store = useSupportStore.getState();
      const res1 = store.submitTicket(
        "helper",
        "safety",
        "Heavy items on narrow staircase with broken handrail",
        undefined,
        { subject: "Stairwell Obstruction" }
      );
      expect(res1.success).toBe(true);

      const res2 = store.submitTicket(
        "helper",
        "safety",
        "Heavy items on narrow staircase with broken handrail",
        undefined,
        { subject: "Stairwell Obstruction" }
      );
      expect(res2.success).toBe(true);
      expect(res2.ticket?.ticketId).toBe(res1.ticket?.ticketId);
    });

    test("allows lookup by ticket ID and last ticket for role", () => {
      const store = useSupportStore.getState();
      const res = store.submitTicket(
        "helper",
        "app_issue",
        "Camera feed did not open upon tapping shutter button"
      );

      const ticket = store.getTicketById(res.ticket?.ticketId || "");
      expect(ticket).toBeDefined();
      expect(ticket?.message).toContain("Camera feed did not open");

      const lastTicket = store.getLastTicketForRole("helper");
      expect(lastTicket?.ticketId).toBe(res.ticket?.ticketId);
    });
  });

  describe("8. Notification Store Deep Links & Role Preferences Isolation", () => {
    test("all notification deep links point to valid canonical routes", () => {
      const { notifications } = useNotificationStore.getState();
      const invalidRoutes = [
        "/offer-detail",
        "/vehicle-upload",
        "/helper-crew-invite",
        "/home",
        "/verification-documents",
        "/offer-expired",
      ];

      for (const item of notifications) {
        for (const badRoute of invalidRoutes) {
          expect(item.deepLinkHref).not.toBe(badRoute);
        }
        expect(item.deepLinkHref).toMatch(/^\/\(app\)\//);
      }
    });

    test("maintains isolated driver and helper notification preferences", () => {
      const store = useNotificationStore.getState();

      // Driver update does not affect helper
      store.updatePreferencesForRole("driver", { soundHaptics: false, emailSummaries: true });
      expect(store.getPreferencesForRole("driver").soundHaptics).toBe(false);
      expect(store.getPreferencesForRole("driver").emailSummaries).toBe(true);
      expect(store.getPreferencesForRole("helper").soundHaptics).toBe(true);
      expect(store.getPreferencesForRole("helper").emailSummaries).toBe(false);

      // Helper update does not affect driver
      store.updatePreferencesForRole("helper", { pushOffers: false });
      expect(store.getPreferencesForRole("helper").pushOffers).toBe(false);
      expect(store.getPreferencesForRole("driver").pushOffers).toBe(true);
    });
  });
});
