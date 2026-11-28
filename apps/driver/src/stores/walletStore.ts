import { create } from "zustand";
import { useCompletionEvidenceStore } from "./completionEvidenceStore";

export const APPROVED_MOCK_FEE_QUOTES: Record<number, number> = {
  // Canonical Driver Balance: $1,280.00 -> $19.20 fee (Figma 1325:1866)
  128000: 1920,
  // Mid withdrawal: $500.00 -> $7.50 fee
  50000: 750,
  // Helper canonical balance: $340.00 -> $5.10 fee
  34000: 510,
  // Helper partial: $100.00 -> $2.00 fee
  10000: 200,
  // Minimum withdrawal threshold: $50.00 -> $1.50 fee
  5000: 150,
};

export type WorkerRole = "driver" | "helper";

export type PayoutTransactionStatus = "processing" | "unknown" | "completed" | "failed";

export type PayoutMethodType = "standard_bank" | "instant_card";

export interface PayoutTransaction {
  id: string;
  intentId: string;
  workerId: string;
  workerRole: WorkerRole;
  amountCents: number;
  feeCents: number;
  netCents: number;
  method: PayoutMethodType;
  destination: string;
  referenceId: string;
  status: PayoutTransactionStatus;
  quoteId?: string;
  retryOf?: string;
  createdAt: string;
  completedAt?: string;
  failureReason?: string;
}

export interface InstantFeeQuote {
  quoteId: string;
  workerId: string;
  workerRole: WorkerRole;
  requestedAmountCents: number;
  feeAmountCents: number;
  netAmountCents: number;
  feeCents: number;
  netCents: number;
  payoutMethod: "instant_card";
  maskedDestination: string;
  validUntilIso: string;
  isMockQuote: true;
}

export type PayoutErrorCode =
  | "INVALID_AMOUNT"
  | "INSUFFICIENT_FUNDS"
  | "AMOUNT_BELOW_FEE"
  | "INVALID_QUOTE"
  | "QUOTE_EXPIRED"
  | "DUPLICATE_INTENT"
  | "DUPLICATE_REQUEST"
  | "WORKER_MISMATCH"
  | "DESTINATION_MISMATCH"
  | "UNAUTHORIZED_ROLE";

export interface PayoutOperationResult {
  success: boolean;
  transaction?: PayoutTransaction;
  error?: PayoutErrorCode;
  errorMessage?: string;
}

export interface JobActivityRecord {
  id: string;
  jobId: string;
  jobTitle: string;
  subtotalCents: number;
  platformFeeCents: number;
  workerPoolCents: number;
  tipCents: number;
  netPayableCents: number;
  date: string;
  status: "available" | "pending_review" | "dispute_hold";
  reviewWindowExpiresAt?: string;
}

export interface MaskedPayoutAccount {
  directDeposit: {
    bankName: string;
    accountType: string;
    last4: string;
    routingLast4: string;
  };
  instantDebitCard: {
    cardBrand: string;
    last4: string;
    expiry: string;
  };
}

export interface WorkerLedger {
  workerId: string;
  workerRole: WorkerRole;
  availableBalanceCents: number;
  pendingBalanceCents: number;
  reservedBalanceCents: number;
  paidOutTotalCents: number;
  completedJobsCount: number;
  transactions: PayoutTransaction[];
  recentJobs: JobActivityRecord[];
  payoutAccounts: MaskedPayoutAccount;
}

export interface WalletStoreState {
  activeRole: WorkerRole;
  driverLedger: WorkerLedger;
  helperLedger: WorkerLedger;
  activeTransactionId: string | null;
  activeQuote: InstantFeeQuote | null;

  // Actions
  setActiveRole: (role: WorkerRole) => void;
  getActiveWallet: () => WorkerLedger;
  getWalletForRole: (role: WorkerRole) => WorkerLedger;
  setActiveTransactionId: (id: string | null) => void;
  getTransactionById: (id: string) => PayoutTransaction | undefined;
  getInstantFeeQuote: (
    roleOrAmount: WorkerRole | number,
    maybeAmount?: number
  ) => InstantFeeQuote | null;
  requestStandardCashOut: (
    role: WorkerRole,
    amountCents: number,
    customIntentId?: string
  ) => PayoutOperationResult;
  requestInstantCashOut: (
    role: WorkerRole,
    quoteIdOrAmount: string | number,
    customIntentId?: string
  ) => PayoutOperationResult;
  simulatePayoutFailure: (role: WorkerRole, transactionId: string, reason?: string) => void;
  settlePayoutSuccess: (role: WorkerRole, transactionId: string) => void;
  retryFailedPayout: (role: WorkerRole, transactionId: string) => PayoutOperationResult;
  updateDirectDepositAccount: (
    role: WorkerRole,
    details: { bankName: string; last4: string; routingLast4: string }
  ) => void;
  updateInstantDebitCard: (
    role: WorkerRole,
    details: { cardBrand: string; last4: string; expiry: string }
  ) => void;
  setJobDisputeHold: (jobId: string, isHeld: boolean) => void;
  creditJobEarningsToAvailable: (jobId: string) => boolean;
  resetWalletStore: () => void;
}

export function formatCents(cents: number): string {
  const isNegative = cents < 0;
  const abs = Math.abs(cents);
  const dollars = Math.floor(abs / 100);
  const remainingCents = abs % 100;
  const formattedDollars = dollars.toLocaleString("en-US");
  const formattedCents = remainingCents.toString().padStart(2, "0");
  return `${isNegative ? "-" : ""}$${formattedDollars}.${formattedCents}`;
}

export interface WorkerCompensationBreakdown {
  subtotalCents: number;
  platformFeeCents: number;
  workerPoolCents: number;
  tipCents: number;
  totalNetCents: number;
  driverCompensationCents: number;
  helperCompensationCents: number;
  driverTipCents: number;
  helperTipCents: number;
  driverTotalNetCents: number;
  helperTotalNetCents: number;
  perWorkerPoolCents?: number;
  perWorkerTipCents?: number;
  perWorkerNetCents?: number;
}

export function calculateFareCommissionBreakdown(
  subtotalCents: number,
  tipCents: number,
  crewSize: number = 1,
  customDriverAllocationCents?: number,
  customHelperAllocationCents?: number
): WorkerCompensationBreakdown {
  // 35% HAULIX platform commission applied strictly to gross subtotal
  const platformFeeCents = Math.round(subtotalCents * 0.35);
  // 65% total worker pool
  const workerPoolCents = subtotalCents - platformFeeCents;
  // 100% tip pass-through with zero platform deduction
  const totalNetCents = workerPoolCents + tipCents;

  if (crewSize <= 1) {
    return {
      subtotalCents,
      platformFeeCents,
      workerPoolCents,
      tipCents,
      totalNetCents,
      driverCompensationCents: workerPoolCents,
      helperCompensationCents: 0,
      driverTipCents: tipCents,
      helperTipCents: 0,
      driverTotalNetCents: totalNetCents,
      helperTotalNetCents: 0,
      perWorkerPoolCents: workerPoolCents,
      perWorkerTipCents: tipCents,
      perWorkerNetCents: totalNetCents,
    };
  }

  // Multi-worker crew:
  // If explicitly documented per-worker mock allocations from approved fixtures are provided, use them.
  // Otherwise, distribute the worker earnings pool evenly across crew members without unverified percentage assumptions.
  let driverCompensationCents: number;
  let helperCompensationCents: number;

  if (customDriverAllocationCents !== undefined && customHelperAllocationCents !== undefined) {
    driverCompensationCents = customDriverAllocationCents;
    helperCompensationCents = customHelperAllocationCents;
  } else {
    const equalShare = Math.floor(workerPoolCents / crewSize);
    driverCompensationCents = equalShare;
    helperCompensationCents = workerPoolCents - equalShare;
  }

  const driverTipCents = Math.floor(tipCents / crewSize);
  const helperTipCents = tipCents - driverTipCents;

  const perWorkerPool = Math.floor(workerPoolCents / crewSize);
  const perWorkerTip = Math.floor(tipCents / crewSize);

  return {
    subtotalCents,
    platformFeeCents,
    workerPoolCents,
    tipCents,
    totalNetCents,
    driverCompensationCents,
    helperCompensationCents,
    driverTipCents,
    helperTipCents,
    driverTotalNetCents: driverCompensationCents + driverTipCents,
    helperTotalNetCents: helperCompensationCents + helperTipCents,
    perWorkerPoolCents: perWorkerPool,
    perWorkerTipCents: perWorkerTip,
    perWorkerNetCents: perWorkerPool + perWorkerTip,
  };
}

const INITIAL_DRIVER_LEDGER: WorkerLedger = {
  workerId: "DRV-8821",
  workerRole: "driver",
  availableBalanceCents: 128000, // $1,280.00 (Figma 1086:670)
  pendingBalanceCents: 12000, // $120.00
  reservedBalanceCents: 0,
  paidOutTotalCents: 345000, // $3,450.00
  completedJobsCount: 5,
  payoutAccounts: {
    directDeposit: {
      bankName: "Chase Bank",
      accountType: "Checking",
      last4: "4109",
      routingLast4: "1024",
    },
    instantDebitCard: {
      cardBrand: "Visa",
      last4: "9012",
      expiry: "08/28",
    },
  },
  transactions: [
    {
      id: "tx-po-01",
      intentId: "intent-po-01",
      workerId: "DRV-8821",
      workerRole: "driver",
      amountCents: 64000,
      feeCents: 960,
      netCents: 63040,
      method: "instant_card",
      destination: "Visa ····9012",
      referenceId: "TX-PO-2026-0711",
      status: "completed",
      createdAt: "2026-11-20T14:30:00.000Z",
      completedAt: "2026-11-20T14:48:00.000Z",
    },
    {
      id: "tx-po-02",
      intentId: "intent-po-02",
      workerId: "DRV-8821",
      workerRole: "driver",
      amountCents: 45000,
      feeCents: 0,
      netCents: 45000,
      method: "standard_bank",
      destination: "Chase ····4109",
      referenceId: "TX-PO-2026-0684",
      status: "completed",
      createdAt: "2026-11-15T09:15:00.000Z",
      completedAt: "2026-11-17T11:00:00.000Z",
    },
    {
      id: "tx-po-03",
      intentId: "intent-po-03",
      workerId: "DRV-8821",
      workerRole: "driver",
      amountCents: 85000,
      feeCents: 0,
      netCents: 85000,
      method: "standard_bank",
      destination: "Chase ····4109",
      referenceId: "TX-PO-2026-0599",
      status: "failed",
      createdAt: "2026-11-10T16:20:00.000Z",
      failureReason: "Bank transfer declined: Invalid routing or closed account",
    },
  ],
  recentJobs: [
    {
      id: "act-01",
      jobId: "HX-AZ-DEMO-0042",
      jobTitle: "Furniture Removal",
      subtotalCents: 12000, // $120.00
      platformFeeCents: 4200, // $42.00 (35%)
      workerPoolCents: 7800, // $78.00 (65%)
      tipCents: 2000, // $20.00 (100% pass-through)
      netPayableCents: 9800, // $98.00
      date: "Nov 28, 2026",
      status: "pending_review",
      reviewWindowExpiresAt: "2026-11-29T10:45:00.000Z",
    },
    {
      id: "act-02",
      jobId: "HX-AZ-DEMO-0039",
      jobTitle: "Heavy Appliance Delivery",
      subtotalCents: 20000,
      platformFeeCents: 7000,
      workerPoolCents: 13000,
      tipCents: 2500,
      netPayableCents: 15500,
      date: "Nov 27, 2026",
      status: "available",
    },
    {
      id: "act-03",
      jobId: "HX-AZ-DEMO-0035",
      jobTitle: "Office Cleanout & Move",
      subtotalCents: 45000,
      platformFeeCents: 15750,
      workerPoolCents: 29250,
      tipCents: 5000,
      netPayableCents: 34250,
      date: "Nov 25, 2026",
      status: "available",
    },
    {
      id: "act-04",
      jobId: "HX-AZ-DEMO-0028",
      jobTitle: "Storage Unit Relocation",
      subtotalCents: 38000,
      platformFeeCents: 13300,
      workerPoolCents: 24700,
      tipCents: 4000,
      netPayableCents: 28700,
      date: "Nov 23, 2026",
      status: "available",
    },
    {
      id: "act-05",
      jobId: "HX-AZ-DEMO-0021",
      jobTitle: "Apartment Move Assistance",
      subtotalCents: 52000,
      platformFeeCents: 18200,
      workerPoolCents: 33800,
      tipCents: 6000,
      netPayableCents: 39800,
      date: "Nov 21, 2026",
      status: "available",
    },
  ],
};

const INITIAL_HELPER_LEDGER: WorkerLedger = {
  workerId: "HLP-4402",
  workerRole: "helper",
  availableBalanceCents: 34000, // $340.00 (Figma 1086:1049)
  pendingBalanceCents: 4900, // $49.00
  reservedBalanceCents: 0,
  paidOutTotalCents: 85000, // $850.00
  completedJobsCount: 3,
  payoutAccounts: {
    directDeposit: {
      bankName: "Wells Fargo",
      accountType: "Checking",
      last4: "8832",
      routingLast4: "5512",
    },
    instantDebitCard: {
      cardBrand: "Mastercard",
      last4: "5541",
      expiry: "11/27",
    },
  },
  transactions: [
    {
      id: "tx-hlp-01",
      intentId: "intent-hlp-01",
      workerId: "HLP-4402",
      workerRole: "helper",
      amountCents: 25000,
      feeCents: 0,
      netCents: 25000,
      method: "standard_bank",
      destination: "Wells Fargo ····8832",
      referenceId: "TX-PO-2026-0740",
      status: "completed",
      createdAt: "2026-11-22T10:00:00.000Z",
      completedAt: "2026-11-24T12:00:00.000Z",
    },
  ],
  recentJobs: [
    {
      id: "act-h-01",
      jobId: "HX-AZ-DEMO-0042",
      jobTitle: "Furniture Removal (Helper Share)",
      subtotalCents: 6000,
      platformFeeCents: 2100,
      workerPoolCents: 3900,
      tipCents: 1000,
      netPayableCents: 4900,
      date: "Nov 28, 2026",
      status: "pending_review",
      reviewWindowExpiresAt: "2026-11-29T10:45:00.000Z",
    },
    {
      id: "act-h-02",
      jobId: "HX-AZ-DEMO-0039",
      jobTitle: "Appliance Move Helper",
      subtotalCents: 10000,
      platformFeeCents: 3500,
      workerPoolCents: 6500,
      tipCents: 1250,
      netPayableCents: 7750,
      date: "Nov 27, 2026",
      status: "available",
    },
    {
      id: "act-h-03",
      jobId: "HX-AZ-DEMO-0035",
      jobTitle: "Office Cleanout Helper",
      subtotalCents: 22500,
      platformFeeCents: 7875,
      workerPoolCents: 14625,
      tipCents: 2500,
      netPayableCents: 17125,
      date: "Nov 25, 2026",
      status: "available",
    },
  ],
};

export const useWalletStore = create<WalletStoreState>((set, get) => ({
  activeRole: "driver",
  driverLedger: INITIAL_DRIVER_LEDGER,
  helperLedger: INITIAL_HELPER_LEDGER,
  activeTransactionId: "tx-po-01",
  activeQuote: null,

  setActiveRole: (role: WorkerRole) => {
    const s = get();
    if (s.activeRole !== role) {
      set({
        activeRole: role,
        activeTransactionId: role === "driver" ? "tx-po-01" : "tx-hlp-01",
        activeQuote: null,
      });
    }
  },

  getActiveWallet: () => {
    const { activeRole, driverLedger, helperLedger } = get();
    return activeRole === "driver" ? driverLedger : helperLedger;
  },

  getWalletForRole: (role: WorkerRole) => {
    const { driverLedger, helperLedger } = get();
    return role === "driver" ? driverLedger : helperLedger;
  },

  setActiveTransactionId: (id: string | null) => set({ activeTransactionId: id }),

  getTransactionById: (id: string) => {
    const { activeRole, driverLedger, helperLedger } = get();
    // Strict isolation: only search active worker's transactions
    const ledger = activeRole === "driver" ? driverLedger : helperLedger;
    return ledger.transactions.find((tx) => tx.id === id);
  },

  getInstantFeeQuote: (roleOrAmount: WorkerRole | number, maybeAmount?: number) => {
    let role: WorkerRole = get().activeRole;
    let amountCents: number = 0;
    if (typeof roleOrAmount === "number") {
      amountCents = roleOrAmount;
    } else {
      role = roleOrAmount;
      amountCents = maybeAmount ?? 0;
    }
    const ledger = get().getWalletForRole(role);
    if (amountCents <= 0 || !Number.isInteger(amountCents) || !Number.isFinite(amountCents)) {
      return null;
    }
    if (amountCents > ledger.availableBalanceCents) {
      return null;
    }

    // Deterministic mock quote fixtures from approved specifications (Figma 1325:1866):
    // Removes arbitrary mathematical formulas; unsupported amounts return null (quote-unavailable)
    if (!(amountCents in APPROVED_MOCK_FEE_QUOTES)) {
      return null;
    }

    const feeAmountCents = APPROVED_MOCK_FEE_QUOTES[amountCents];
    const netAmountCents = amountCents - feeAmountCents;
    if (netAmountCents <= 0) return null;

    const quote: InstantFeeQuote = {
      quoteId: `quote-${role}-${Date.now()}-${Math.floor(100000 + Math.random() * 900000)}`,
      workerId: ledger.workerId,
      workerRole: role,
      requestedAmountCents: amountCents,
      feeAmountCents,
      netAmountCents,
      feeCents: feeAmountCents,
      netCents: netAmountCents,
      payoutMethod: "instant_card",
      maskedDestination: `${ledger.payoutAccounts.instantDebitCard.cardBrand} ····${ledger.payoutAccounts.instantDebitCard.last4}`,
      validUntilIso: new Date(Date.now() + 15 * 60 * 1000).toISOString(),
      isMockQuote: true,
    };

    set({ activeQuote: quote });
    return quote;
  },

  requestStandardCashOut: (
    role: WorkerRole,
    amountCents: number,
    customIntentId?: string
  ): PayoutOperationResult => {
    const ledgerKey = role === "driver" ? "driverLedger" : "helperLedger";
    const currentLedger = get()[ledgerKey];

    // Validation
    if (amountCents <= 0 || !Number.isInteger(amountCents) || !Number.isFinite(amountCents)) {
      return {
        success: false,
        error: "INVALID_AMOUNT",
        errorMessage: "Please enter a valid amount greater than $0.00",
      };
    }

    if (amountCents > currentLedger.availableBalanceCents) {
      return {
        success: false,
        error: "INSUFFICIENT_FUNDS",
        errorMessage: "Requested amount exceeds your available balance",
      };
    }

    const intentId = customIntentId || `intent-${role}-${amountCents}-${Date.now()}`;

    // Stable Payout Intent Check across ALL transaction states (processing, completed, failed)
    const existingIntent = currentLedger.transactions.find((tx) => tx.intentId === intentId);
    if (existingIntent) {
      if (existingIntent.status === "completed" || existingIntent.status === "processing") {
        return {
          success: true,
          transaction: existingIntent,
        };
      }
      if (existingIntent.status === "failed") {
        return {
          success: false,
          error: "DUPLICATE_REQUEST",
          errorMessage:
            "A payout with this intent ID has previously failed. Please initiate an explicit retry.",
        };
      }
    }

    const txId = `tx-std-${Date.now()}-${Math.floor(100000 + Math.random() * 900000)}`;
    const refNum = Math.floor(1000 + Math.random() * 9000);
    const referenceId = `TX-PO-2026-${refNum}`;

    const newTx: PayoutTransaction = {
      id: txId,
      intentId,
      workerId: currentLedger.workerId,
      workerRole: role,
      amountCents,
      feeCents: 0,
      netCents: amountCents,
      method: "standard_bank",
      destination: `${currentLedger.payoutAccounts.directDeposit.bankName} ····${currentLedger.payoutAccounts.directDeposit.last4}`,
      referenceId,
      status: "processing",
      createdAt: new Date().toISOString(),
    };

    set({
      [ledgerKey]: {
        ...currentLedger,
        availableBalanceCents: currentLedger.availableBalanceCents - amountCents,
        reservedBalanceCents: currentLedger.reservedBalanceCents + amountCents,
        transactions: [newTx, ...currentLedger.transactions],
      },
      activeTransactionId: txId,
    });

    return { success: true, transaction: newTx };
  },

  requestInstantCashOut: (
    role: WorkerRole,
    quoteIdOrAmount: string | number,
    customIntentId?: string
  ): PayoutOperationResult => {
    let quote = get().activeQuote;
    const ledgerKey = role === "driver" ? "driverLedger" : "helperLedger";
    const currentLedger = get()[ledgerKey];

    // Section 3.3: Enforce Quote Context Integrity
    if (typeof quoteIdOrAmount === "string") {
      if (!quote || quote.quoteId !== quoteIdOrAmount) {
        return {
          success: false,
          error: "INVALID_QUOTE",
          errorMessage: "The fee quote is invalid or has expired. Please review a new quote.",
        };
      }
    } else {
      quote = get().getInstantFeeQuote(role, quoteIdOrAmount);
      if (!quote) {
        return {
          success: false,
          error: "INVALID_QUOTE",
          errorMessage: "No valid fee quote available for this amount.",
        };
      }
    }

    // Validate worker ID and role binding
    if (quote.workerId !== currentLedger.workerId || quote.workerRole !== role) {
      return {
        success: false,
        error: "WORKER_MISMATCH",
        errorMessage: "This fee quote was issued to a different worker context.",
      };
    }

    // Validate destination binding
    const currentCard = currentLedger.payoutAccounts.instantDebitCard;
    const expectedDest = `${currentCard.cardBrand} ····${currentCard.last4}`;
    if (quote.maskedDestination !== expectedDest) {
      return {
        success: false,
        error: "DESTINATION_MISMATCH",
        errorMessage: "The payout destination has changed. Please review a new quote.",
      };
    }

    if (new Date(quote.validUntilIso).getTime() <= Date.now()) {
      return {
        success: false,
        error: "QUOTE_EXPIRED",
        errorMessage: "This fee quote has expired. Please review a new quote.",
      };
    }

    const amountCents = quote.requestedAmountCents;
    if (amountCents > currentLedger.availableBalanceCents) {
      return {
        success: false,
        error: "INSUFFICIENT_FUNDS",
        errorMessage: "Requested amount exceeds your available balance",
      };
    }

    if (amountCents <= quote.feeAmountCents) {
      return {
        success: false,
        error: "AMOUNT_BELOW_FEE",
        errorMessage: "Requested amount is too low to cover the processing fee",
      };
    }

    const intentId = customIntentId || `intent-${role}-${quote.quoteId}`;

    // Stable Payout Intent Check across ALL transaction states
    const existingIntent = currentLedger.transactions.find((tx) => tx.intentId === intentId);
    if (existingIntent) {
      if (existingIntent.status === "completed" || existingIntent.status === "processing") {
        return {
          success: true,
          transaction: existingIntent,
        };
      }
      if (existingIntent.status === "failed") {
        return {
          success: false,
          error: "DUPLICATE_REQUEST",
          errorMessage:
            "A payout with this intent ID has previously failed. Please initiate an explicit retry.",
        };
      }
    }

    const txId = `tx-inst-${Date.now()}-${Math.floor(100000 + Math.random() * 900000)}`;
    const refNum = Math.floor(1000 + Math.random() * 9000);
    const referenceId = `TX-PO-2026-${refNum}`;

    const newTx: PayoutTransaction = {
      id: txId,
      intentId,
      workerId: currentLedger.workerId,
      workerRole: role,
      amountCents,
      feeCents: quote.feeAmountCents,
      netCents: quote.netAmountCents,
      method: "instant_card",
      destination: quote.maskedDestination,
      referenceId,
      status: "processing",
      quoteId: quote.quoteId,
      createdAt: new Date().toISOString(),
    };

    set({
      [ledgerKey]: {
        ...currentLedger,
        availableBalanceCents: currentLedger.availableBalanceCents - amountCents,
        reservedBalanceCents: currentLedger.reservedBalanceCents + amountCents,
        transactions: [newTx, ...currentLedger.transactions],
      },
      activeTransactionId: txId,
      activeQuote: null,
    });

    return { success: true, transaction: newTx };
  },

  simulatePayoutFailure: (role: WorkerRole, transactionId: string, reason?: string) => {
    const ledgerKey = role === "driver" ? "driverLedger" : "helperLedger";
    const currentLedger = get()[ledgerKey];
    const tx = currentLedger.transactions.find((t) => t.id === transactionId);

    // Completed transactions cannot be changed to failed; already failed transactions cannot double-refund
    if (!tx || tx.status === "completed" || tx.status === "failed") {
      return;
    }

    const updatedTransactions = currentLedger.transactions.map((t) => {
      if (t.id === transactionId) {
        return {
          ...t,
          status: "failed" as const,
          failureReason: reason || "Bank transfer declined: Invalid routing or closed account",
        };
      }
      return t;
    });

    // Refund reserved balance back to available balance exactly once
    set({
      [ledgerKey]: {
        ...currentLedger,
        availableBalanceCents: currentLedger.availableBalanceCents + tx.amountCents,
        reservedBalanceCents: Math.max(0, currentLedger.reservedBalanceCents - tx.amountCents),
        transactions: updatedTransactions,
      },
    });
  },

  settlePayoutSuccess: (role: WorkerRole, transactionId: string) => {
    const ledgerKey = role === "driver" ? "driverLedger" : "helperLedger";
    const currentLedger = get()[ledgerKey];
    const tx = currentLedger.transactions.find((t) => t.id === transactionId);

    if (tx?.status !== "processing") {
      return;
    }

    const updatedTransactions = currentLedger.transactions.map((t) => {
      if (t.id === transactionId) {
        return {
          ...t,
          status: "completed" as const,
          completedAt: new Date().toISOString(),
        };
      }
      return t;
    });

    set({
      [ledgerKey]: {
        ...currentLedger,
        reservedBalanceCents: Math.max(0, currentLedger.reservedBalanceCents - tx.amountCents),
        paidOutTotalCents: currentLedger.paidOutTotalCents + tx.netCents,
        transactions: updatedTransactions,
      },
    });
  },

  retryFailedPayout: (role: WorkerRole, transactionId: string): PayoutOperationResult => {
    const ledgerKey = role === "driver" ? "driverLedger" : "helperLedger";
    const currentLedger = get()[ledgerKey];
    const failedTx = currentLedger.transactions.find((t) => t.id === transactionId);

    if (failedTx?.status !== "failed") {
      return {
        success: false,
        error: "INVALID_AMOUNT",
        errorMessage: "Only failed transactions can be retried",
      };
    }

    if (currentLedger.availableBalanceCents < failedTx.amountCents) {
      return {
        success: false,
        error: "INSUFFICIENT_FUNDS",
        errorMessage: "Available balance is insufficient to re-attempt this payout",
      };
    }

    // Create a new linked retry attempt preserving the historical failed record!
    const retryTxId = `tx-retry-${Date.now()}`;
    const refNum = Math.floor(1000 + Math.random() * 9000);
    const referenceId = `TX-PO-2026-${refNum}`;

    const retryTx: PayoutTransaction = {
      id: retryTxId,
      intentId: `retry-intent-${failedTx.id}-${Date.now()}`,
      workerId: currentLedger.workerId,
      workerRole: role,
      amountCents: failedTx.amountCents,
      feeCents: failedTx.feeCents,
      netCents: failedTx.netCents,
      method: failedTx.method,
      destination: failedTx.destination,
      referenceId,
      status: "processing",
      retryOf: failedTx.id,
      createdAt: new Date().toISOString(),
    };

    set({
      [ledgerKey]: {
        ...currentLedger,
        availableBalanceCents: currentLedger.availableBalanceCents - failedTx.amountCents,
        reservedBalanceCents: currentLedger.reservedBalanceCents + failedTx.amountCents,
        transactions: [retryTx, ...currentLedger.transactions],
      },
      activeTransactionId: retryTxId,
    });

    return { success: true, transaction: retryTx };
  },

  updateDirectDepositAccount: (
    role: WorkerRole,
    details: { bankName: string; last4: string; routingLast4: string }
  ) => {
    const ledgerKey = role === "driver" ? "driverLedger" : "helperLedger";
    const currentLedger = get()[ledgerKey];
    set({
      [ledgerKey]: {
        ...currentLedger,
        payoutAccounts: {
          ...currentLedger.payoutAccounts,
          directDeposit: {
            ...currentLedger.payoutAccounts.directDeposit,
            bankName: details.bankName,
            last4: details.last4,
            routingLast4: details.routingLast4,
          },
        },
      },
    });
  },

  updateInstantDebitCard: (
    role: WorkerRole,
    details: { cardBrand: string; last4: string; expiry: string }
  ) => {
    const ledgerKey = role === "driver" ? "driverLedger" : "helperLedger";
    const currentLedger = get()[ledgerKey];
    set({
      [ledgerKey]: {
        ...currentLedger,
        payoutAccounts: {
          ...currentLedger.payoutAccounts,
          instantDebitCard: {
            cardBrand: details.cardBrand,
            last4: details.last4,
            expiry: details.expiry,
          },
        },
      },
    });
  },

  setJobDisputeHold: (jobId: string, isHeld: boolean) => {
    const { driverLedger, helperLedger } = get();

    const updateRecentJobs = (jobs: JobActivityRecord[]) =>
      jobs.map((j) => {
        if (j.jobId === jobId) {
          return {
            ...j,
            status: isHeld ? ("dispute_hold" as const) : ("pending_review" as const),
          };
        }
        return j;
      });

    set({
      driverLedger: {
        ...driverLedger,
        recentJobs: updateRecentJobs(driverLedger.recentJobs),
      },
      helperLedger: {
        ...helperLedger,
        recentJobs: updateRecentJobs(helperLedger.recentJobs),
      },
    });
  },

  creditJobEarningsToAvailable: (jobId: string): boolean => {
    const { activeRole } = get();
    const ledgerKey = activeRole === "driver" ? "driverLedger" : "helperLedger";
    const currentLedger = get()[ledgerKey];

    const jobIndex = currentLedger.recentJobs.findIndex((j) => j.jobId === jobId);
    if (jobIndex === -1) return false;

    const job = currentLedger.recentJobs[jobIndex];
    // Cannot credit if in dispute hold or already available
    if (job.status !== "pending_review") {
      return false;
    }

    // Section 3.5: Verify completion record conditions from completionEvidenceStore
    const evidenceStore = useCompletionEvidenceStore.getState();
    const completionRecord = evidenceStore.getCompletionRecord(jobId);
    if (completionRecord) {
      // 1. Evidence must be submitted
      if (completionRecord.driverSubmissionStatus !== "SUBMITTED") {
        return false;
      }
      // 2. Unresolved disputes block ledger credit
      if (completionRecord.disputeStatus !== "NONE") {
        return false;
      }
      // 3. Review condition: Customer confirmed or review window elapsed
      if (
        completionRecord.customerReviewStatus !== "CUSTOMER_CONFIRMED" &&
        completionRecord.customerReviewStatus !== "AUTO_CLOSURE_ELIGIBLE"
      ) {
        return false;
      }
      // 4. Payment settlement condition
      if (
        completionRecord.paymentCaptureStatus !== "SETTLED" &&
        completionRecord.paymentCaptureStatus !== "CAPTURE_SUCCESS"
      ) {
        return false;
      }
      // 5. Must not be already credited
      if (completionRecord.earningsEligibility === "CREDITED") {
        return false;
      }
    }

    const updatedJob: JobActivityRecord = {
      ...job,
      status: "available",
    };

    const updatedRecentJobs = [...currentLedger.recentJobs];
    updatedRecentJobs[jobIndex] = updatedJob;

    set({
      [ledgerKey]: {
        ...currentLedger,
        availableBalanceCents: currentLedger.availableBalanceCents + job.netPayableCents,
        pendingBalanceCents: Math.max(0, currentLedger.pendingBalanceCents - job.netPayableCents),
        recentJobs: updatedRecentJobs,
      },
    });

    if (completionRecord) {
      evidenceStore.setEarningsEligibility(jobId, "CREDITED");
    }

    return true;
  },

  resetWalletStore: () => {
    set({
      activeRole: "driver",
      driverLedger: INITIAL_DRIVER_LEDGER,
      helperLedger: INITIAL_HELPER_LEDGER,
      activeTransactionId: "tx-po-01",
      activeQuote: null,
    });
  },
}));
