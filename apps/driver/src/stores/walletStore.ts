import { create } from "zustand";

export type WorkerRole = "driver" | "helper";

export type PayoutTransactionStatus = "completed" | "processing" | "failed";

export type PayoutMethodType = "standard_bank" | "instant_card";

export interface PayoutTransaction {
  id: string;
  amountCents: number;
  feeCents: number;
  netCents: number;
  method: PayoutMethodType;
  destination: string;
  referenceId: string;
  status: PayoutTransactionStatus;
  createdAt: string;
  completedAt?: string;
  failureReason?: string;
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

  // Actions
  setActiveRole: (role: WorkerRole) => void;
  getActiveWallet: () => WorkerLedger;
  getWalletForRole: (role: WorkerRole) => WorkerLedger;
  setActiveTransactionId: (id: string | null) => void;
  getTransactionById: (id: string) => PayoutTransaction | undefined;
  requestStandardCashOut: (role: WorkerRole, amountCents: number) => PayoutTransaction;
  getInstantFeeQuote: (amountCents: number) => { feeCents: number; netCents: number };
  requestInstantCashOut: (role: WorkerRole, amountCents: number) => PayoutTransaction;
  simulatePayoutFailure: (role: WorkerRole, transactionId: string, reason?: string) => void;
  retryFailedPayout: (role: WorkerRole, transactionId: string) => void;
  updateDirectDepositAccount: (
    role: WorkerRole,
    details: { bankName: string; last4: string; routingLast4: string }
  ) => void;
  updateInstantDebitCard: (
    role: WorkerRole,
    details: { cardBrand: string; last4: string; expiry: string }
  ) => void;
  setJobDisputeHold: (jobId: string, isHeld: boolean) => void;
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

export function calculateFareCommissionBreakdown(
  subtotalCents: number,
  tipCents: number,
  crewSize: number = 1
) {
  // 35% HAULIX platform commission on gross subtotal
  const platformFeeCents = Math.round(subtotalCents * 0.35);
  // 65% worker subtotal share
  const workerPoolCents = subtotalCents - platformFeeCents;
  // 100% tip pass-through
  const totalNetCents = workerPoolCents + tipCents;

  const perWorkerPoolCents = Math.floor(workerPoolCents / crewSize);
  const perWorkerTipCents = Math.floor(tipCents / crewSize);
  const perWorkerNetCents = perWorkerPoolCents + perWorkerTipCents;

  return {
    subtotalCents,
    platformFeeCents,
    workerPoolCents,
    tipCents,
    totalNetCents,
    perWorkerPoolCents,
    perWorkerTipCents,
    perWorkerNetCents,
  };
}

const INITIAL_DRIVER_LEDGER: WorkerLedger = {
  availableBalanceCents: 128000, // $1,280.00
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
  availableBalanceCents: 34000, // $340.00
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

  setActiveRole: (role: WorkerRole) => set({ activeRole: role }),

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
    const { driverLedger, helperLedger } = get();
    return (
      driverLedger.transactions.find((tx) => tx.id === id) ||
      helperLedger.transactions.find((tx) => tx.id === id)
    );
  },

  requestStandardCashOut: (role: WorkerRole, amountCents: number) => {
    const ledgerKey = role === "driver" ? "driverLedger" : "helperLedger";
    const currentLedger = get()[ledgerKey];

    const safeAmount = Math.min(Math.max(0, amountCents), currentLedger.availableBalanceCents);
    const txId = `tx-${Date.now()}`;
    const refNum = Math.floor(1000 + Math.random() * 9000);
    const referenceId = `TX-PO-2026-${refNum}`;

    const newTx: PayoutTransaction = {
      id: txId,
      amountCents: safeAmount,
      feeCents: 0,
      netCents: safeAmount,
      method: "standard_bank",
      destination: `${currentLedger.payoutAccounts.directDeposit.bankName} ····${currentLedger.payoutAccounts.directDeposit.last4}`,
      referenceId,
      status: "processing",
      createdAt: new Date().toISOString(),
    };

    set({
      [ledgerKey]: {
        ...currentLedger,
        availableBalanceCents: currentLedger.availableBalanceCents - safeAmount,
        reservedBalanceCents: currentLedger.reservedBalanceCents + safeAmount,
        transactions: [newTx, ...currentLedger.transactions],
      },
      activeTransactionId: txId,
    });

    return newTx;
  },

  getInstantFeeQuote: (amountCents: number) => {
    // 1.5% fee with min $1.50 (150 cents)
    const feeCents = Math.max(150, Math.round(amountCents * 0.015));
    const netCents = Math.max(0, amountCents - feeCents);
    return { feeCents, netCents };
  },

  requestInstantCashOut: (role: WorkerRole, amountCents: number) => {
    const ledgerKey = role === "driver" ? "driverLedger" : "helperLedger";
    const currentLedger = get()[ledgerKey];

    const safeAmount = Math.min(Math.max(0, amountCents), currentLedger.availableBalanceCents);
    const { feeCents, netCents } = get().getInstantFeeQuote(safeAmount);

    const txId = `tx-${Date.now()}`;
    const refNum = Math.floor(1000 + Math.random() * 9000);
    const referenceId = `TX-PO-2026-${refNum}`;

    const newTx: PayoutTransaction = {
      id: txId,
      amountCents: safeAmount,
      feeCents,
      netCents,
      method: "instant_card",
      destination: `${currentLedger.payoutAccounts.instantDebitCard.cardBrand} ····${currentLedger.payoutAccounts.instantDebitCard.last4}`,
      referenceId,
      status: "processing",
      createdAt: new Date().toISOString(),
    };

    set({
      [ledgerKey]: {
        ...currentLedger,
        availableBalanceCents: currentLedger.availableBalanceCents - safeAmount,
        reservedBalanceCents: currentLedger.reservedBalanceCents + safeAmount,
        transactions: [newTx, ...currentLedger.transactions],
      },
      activeTransactionId: txId,
    });

    return newTx;
  },

  simulatePayoutFailure: (role: WorkerRole, transactionId: string, reason?: string) => {
    const ledgerKey = role === "driver" ? "driverLedger" : "helperLedger";
    const currentLedger = get()[ledgerKey];
    const tx = currentLedger.transactions.find((t) => t.id === transactionId);

    if (!tx || tx.status === "failed") return;

    const updatedTransactions = currentLedger.transactions.map((t) => {
      if (t.id === transactionId) {
        return {
          ...t,
          status: "failed" as PayoutTransactionStatus,
          failureReason: reason || "Bank transfer declined: Invalid routing or closed account",
        };
      }
      return t;
    });

    // Refund reserved balance back to available balance
    set({
      [ledgerKey]: {
        ...currentLedger,
        availableBalanceCents: currentLedger.availableBalanceCents + tx.amountCents,
        reservedBalanceCents: Math.max(0, currentLedger.reservedBalanceCents - tx.amountCents),
        transactions: updatedTransactions,
      },
    });
  },

  retryFailedPayout: (role: WorkerRole, transactionId: string) => {
    const ledgerKey = role === "driver" ? "driverLedger" : "helperLedger";
    const currentLedger = get()[ledgerKey];
    const tx = currentLedger.transactions.find((t) => t.id === transactionId);

    if (tx?.status !== "failed") return;

    if (currentLedger.availableBalanceCents < tx.amountCents) {
      return; // Cannot retry if insufficient funds
    }

    const updatedTransactions = currentLedger.transactions.map((t) => {
      if (t.id === transactionId) {
        return {
          ...t,
          status: "processing" as PayoutTransactionStatus,
          failureReason: undefined,
          createdAt: new Date().toISOString(),
        };
      }
      return t;
    });

    set({
      [ledgerKey]: {
        ...currentLedger,
        availableBalanceCents: currentLedger.availableBalanceCents - tx.amountCents,
        reservedBalanceCents: currentLedger.reservedBalanceCents + tx.amountCents,
        transactions: updatedTransactions,
      },
      activeTransactionId: transactionId,
    });
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

  resetWalletStore: () => {
    set({
      activeRole: "driver",
      driverLedger: INITIAL_DRIVER_LEDGER,
      helperLedger: INITIAL_HELPER_LEDGER,
      activeTransactionId: "tx-po-01",
    });
  },
}));
