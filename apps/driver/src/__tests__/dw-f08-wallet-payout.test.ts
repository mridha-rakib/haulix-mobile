import { driverEn } from "../i18n/driverEn";
import { driverEs } from "../i18n/driverEs";
import { useCompletionEvidenceStore } from "../stores/completionEvidenceStore";
import {
  calculateFareCommissionBreakdown,
  formatCents,
  useWalletStore,
} from "../stores/walletStore";

describe("DW-F08 Worker Wallet, Ledger & Cash Out", () => {
  beforeEach(() => {
    useWalletStore.getState().resetWalletStore();
    useCompletionEvidenceStore.getState().resetCompletionStore();
  });

  describe("1. Currency and Commission Arithmetic", () => {
    test("formatCents formats integer cents to dollar string", () => {
      expect(formatCents(128000)).toBe("$1,280.00");
      expect(formatCents(34000)).toBe("$340.00");
      expect(formatCents(0)).toBe("$0.00");
      expect(formatCents(9800)).toBe("$98.00");
      expect(formatCents(1920)).toBe("$19.20");
      expect(formatCents(-4200)).toBe("-$42.00");
    });

    test("65/35 fare breakdown applies to subtotal only with 100% tip pass-through", () => {
      const grossSubtotalCents = 12000; // $120.00
      const tipCents = 2000; // $20.00
      const breakdown = calculateFareCommissionBreakdown(grossSubtotalCents, tipCents, 1);

      // 35% platform fee = $42.00
      expect(breakdown.platformFeeCents).toBe(4200);
      // 65% worker pool = $78.00
      expect(breakdown.workerPoolCents).toBe(7800);
      // 100% tip pass-through = $20.00
      expect(breakdown.tipCents).toBe(2000);
      // Net total payable = $78.00 + $20.00 = $98.00
      expect(breakdown.totalNetCents).toBe(9800);
    });

    test("crew split splits worker pool and tip equally by default", () => {
      const grossSubtotalCents = 12000;
      const tipCents = 2000;
      const breakdown = calculateFareCommissionBreakdown(grossSubtotalCents, tipCents, 2);

      // Each worker gets half of $78.00 ($39.00) and half of $20.00 tip ($10.00) = $49.00
      expect(breakdown.perWorkerPoolCents).toBe(3900);
      expect(breakdown.perWorkerTipCents).toBe(1000);
      expect(breakdown.perWorkerNetCents).toBe(4900);
    });
  });

  describe("2. Driver and Helper Ledger Segregation", () => {
    test("driver ledger initializes with $1,280.00 available and 5 completed jobs", () => {
      useWalletStore.getState().setActiveRole("driver");
      const wallet = useWalletStore.getState().getActiveWallet();

      expect(wallet.availableBalanceCents).toBe(128000);
      expect(wallet.completedJobsCount).toBe(5);
      expect(wallet.payoutAccounts.directDeposit.bankName).toBe("Chase Bank");
      expect(wallet.payoutAccounts.directDeposit.last4).toBe("4109");
      expect(wallet.payoutAccounts.instantDebitCard.last4).toBe("9012");
    });

    test("helper ledger initializes with $340.00 available and 3 completed jobs", () => {
      useWalletStore.getState().setActiveRole("helper");
      const wallet = useWalletStore.getState().getActiveWallet();

      expect(wallet.availableBalanceCents).toBe(34000);
      expect(wallet.completedJobsCount).toBe(3);
      expect(wallet.payoutAccounts.directDeposit.bankName).toBe("Wells Fargo");
      expect(wallet.payoutAccounts.directDeposit.last4).toBe("8832");
      expect(wallet.payoutAccounts.instantDebitCard.last4).toBe("5541");
    });
  });

  describe("3. Standard and Instant Cash Out Lifecycle", () => {
    test("standard cash out reserves funds with $0 fee", () => {
      const store = useWalletStore.getState();
      store.setActiveRole("driver");

      const res = store.requestStandardCashOut("driver", 50000); // $500.00
      expect(res.success).toBe(true);
      const tx = res.transaction!;
      expect(tx.feeCents).toBe(0);
      expect(tx.netCents).toBe(50000);
      expect(tx.method).toBe("standard_bank");
      expect(tx.status).toBe("processing");

      const wallet = store.getActiveWallet();
      expect(wallet.availableBalanceCents).toBe(128000 - 50000);
      expect(wallet.reservedBalanceCents).toBe(50000);
    });

    test("instant fee quote calculates 1.5% with minimum threshold", () => {
      const store = useWalletStore.getState();
      // $1,280.00 * 1.5% = $19.20 (1920 cents)
      const quote = store.getInstantFeeQuote(128000)!;
      expect(quote.feeCents).toBe(1920);
      expect(quote.netCents).toBe(128000 - 1920);

      // Low amount minimum fee threshold
      const lowQuote = store.getInstantFeeQuote(5000)!; // $50.00
      expect(lowQuote.feeCents).toBe(150); // min $1.50
    });

    test("instant cash out deducts available balance and creates processing transaction", () => {
      const store = useWalletStore.getState();
      store.setActiveRole("driver");

      const res = store.requestInstantCashOut("driver", 128000);
      expect(res.success).toBe(true);
      const tx = res.transaction!;
      expect(tx.feeCents).toBe(1920);
      expect(tx.netCents).toBe(128000 - 1920);
      expect(tx.method).toBe("instant_card");
      expect(tx.status).toBe("processing");

      const wallet = store.getActiveWallet();
      expect(wallet.availableBalanceCents).toBe(0);
      expect(wallet.reservedBalanceCents).toBe(128000);
    });

    test("payout failure restores reserved funds to available balance", () => {
      const store = useWalletStore.getState();
      store.setActiveRole("driver");

      const res = store.requestStandardCashOut("driver", 40000);
      const tx = res.transaction!;
      expect(store.getActiveWallet().availableBalanceCents).toBe(88000);

      store.simulatePayoutFailure("driver", tx.id, "Invalid routing number");
      const walletAfterFail = store.getActiveWallet();
      expect(walletAfterFail.availableBalanceCents).toBe(128000);
      expect(walletAfterFail.reservedBalanceCents).toBe(0);

      const failedTx = store.getTransactionById(tx.id);
      expect(failedTx?.status).toBe("failed");
      expect(failedTx?.failureReason).toBe("Invalid routing number");
    });

    test("retry failed payout transitions status to processing and reserves balance again", () => {
      const store = useWalletStore.getState();
      store.setActiveRole("driver");

      const res = store.requestStandardCashOut("driver", 40000);
      const tx = res.transaction!;
      store.simulatePayoutFailure("driver", tx.id);
      expect(store.getActiveWallet().availableBalanceCents).toBe(128000);

      const retryRes = store.retryFailedPayout("driver", tx.id);
      expect(retryRes.success).toBe(true);
      const retriedTx = retryRes.transaction!;
      expect(retriedTx.status).toBe("processing");
      expect(retriedTx.retryOf).toBe(tx.id);
      expect(store.getActiveWallet().availableBalanceCents).toBe(88000);
    });
  });

  describe("4. Completion Evidence Idempotency & Review States (DW-F07 Residuals)", () => {
    test("repeated submission preserves submittedAt and submissionId idempotency", () => {
      const store = useCompletionEvidenceStore.getState();
      const jobId = "HX-AZ-DEMO-0042";

      store.attachDriverEvidence(jobId, "before", "sofa-before.jpg");
      store.attachDriverEvidence(jobId, "after", "sofa-after.jpg");

      const sub1 = store.submitDriverCompletion(jobId);
      expect(sub1.success).toBe(true);
      const rec1 = store.getCompletionRecord(jobId);
      const initialTimestamp = rec1.submittedAt;
      const initialId = rec1.submissionId;

      // Resubmit
      const sub2 = store.submitDriverCompletion(jobId);
      expect(sub2.success).toBe(true);
      const rec2 = store.getCompletionRecord(jobId);
      expect(rec2.submittedAt).toBe(initialTimestamp);
      expect(rec2.submissionId).toBe(initialId);
    });

    test("retry submission validates required evidence and mock failure scenario", () => {
      const store = useCompletionEvidenceStore.getState();
      const jobId = "HX-AZ-DEMO-0042";

      // Remove after photo to test missing evidence
      store.removeDriverEvidence(jobId, "after");
      const retryWithoutAfter = store.retryDriverSubmission(jobId);
      expect(retryWithoutAfter.success).toBe(false);
      expect(retryWithoutAfter.error).toContain("MISSING_REQUIRED_EVIDENCE");

      // Attach after photo
      store.attachDriverEvidence(jobId, "after", "sofa-after.jpg");
      store.setMockFailureScenario(true);
      const retryWithMockFail = store.retryDriverSubmission(jobId);
      expect(retryWithMockFail.success).toBe(false);
      expect(retryWithMockFail.error).toContain("SIMULATED_NETWORK_FAILURE");

      store.setMockFailureScenario(false);
      const retrySuccess = store.retryDriverSubmission(jobId);
      expect(retrySuccess.success).toBe(true);
    });

    test("reviewWindowExpiresAt is a valid ISO timestamp string", () => {
      const store = useCompletionEvidenceStore.getState();
      const jobId = "HX-AZ-DEMO-0042";
      store.attachDriverEvidence(jobId, "before", "sofa-before.jpg");
      store.attachDriverEvidence(jobId, "after", "sofa-after.jpg");
      store.submitDriverCompletion(jobId);

      const record = store.getCompletionRecord(jobId);
      expect(record.reviewWindowExpiresAt).toBeDefined();
      const parsedDate = new Date(record.reviewWindowExpiresAt || "");
      expect(parsedDate.getTime()).not.toBeNaN();
    });
  });

  describe("5. Bilingual Translation Completeness for DW-F08", () => {
    const requiredSections = [
      "earningsOverview",
      "earningsDetail",
      "cashOutMethods",
      "cashOutStatus",
      "payoutHistory",
      "payoutAccount",
      "payoutFailed",
      "standardCashOut",
      "instantPayoutReview",
      "payoutMethodOverlay",
    ] as const;

    test.each(requiredSections)("section '%s' contains matching keys in En and Es", (sec) => {
      const enKeys = Object.keys((driverEn.driver as any)[sec] || {});
      const esKeys = Object.keys((driverEs.driver as any)[sec] || {});

      expect(enKeys.length).toBeGreaterThan(0);
      expect(esKeys.length).toBeGreaterThan(0);

      for (const k of enKeys) {
        expect(esKeys).toContain(k);
      }
    });
  });
});
