import { create } from "zustand";
import type { WorkerRole } from "./walletStore";

export interface SupportTicket {
  ticketId: string;
  workerId: string;
  workerRole: WorkerRole;
  category: string;
  jobId?: string;
  payoutTxId?: string;
  verificationType?: string;
  subject?: string;
  message: string;
  createdAt: string;
  status: "received" | "investigating" | "resolved" | "failed";
  retryCount?: number;
}

interface SupportState {
  tickets: SupportTicket[];
  lastTicket: SupportTicket | null;
  lastTicketByRole: Record<WorkerRole, SupportTicket | null>;
  mockFailureScenario: boolean;
  submitTicket: (
    role: WorkerRole,
    category: string,
    message: string,
    jobId?: string,
    context?: { payoutTxId?: string; verificationType?: string; subject?: string }
  ) => { success: boolean; ticket?: SupportTicket; error?: string };
  retryTicket: (ticketId: string) => { success: boolean; ticket?: SupportTicket; error?: string };
  getLastTicket: () => SupportTicket | null;
  getLastTicketForRole: (role: WorkerRole) => SupportTicket | null;
  getTicketById: (id: string) => SupportTicket | undefined;
  setMockFailureScenario: (enabled: boolean) => void;
  resetSupportStore: () => void;
}

export const useSupportStore = create<SupportState>((set, get) => ({
  tickets: [],
  lastTicket: null,
  lastTicketByRole: {
    driver: null,
    helper: null,
  },
  mockFailureScenario: false,

  submitTicket: (role, category, message, jobId, context) => {
    const trimmedMsg = message.trim();
    if (!trimmedMsg || trimmedMsg.length < 5) {
      return {
        success: false,
        error: "INVALID_MESSAGE",
      };
    }

    const workerId = role === "driver" ? "DRV-8821" : "HLP-4402";

    // Section 3.8: Submission Idempotency - check for duplicate submission within session
    const existing = get().tickets.find(
      (t) =>
        t.workerRole === role &&
        t.category === category &&
        t.message === trimmedMsg &&
        (jobId ? t.jobId === jobId.trim() : true)
    );
    if (existing) {
      set({
        lastTicket: existing,
        lastTicketByRole: { ...get().lastTicketByRole, [role]: existing },
      });
      return { success: true, ticket: existing };
    }

    const ticketId = `TKT-2026-${Date.now().toString().slice(-4)}-${Math.floor(100 + Math.random() * 900)}`;

    if (get().mockFailureScenario) {
      const failedTicket: SupportTicket = {
        ticketId,
        workerId,
        workerRole: role,
        category,
        jobId: jobId?.trim() || undefined,
        payoutTxId: context?.payoutTxId,
        verificationType: context?.verificationType,
        subject: context?.subject,
        message: trimmedMsg,
        createdAt: new Date().toISOString(),
        status: "failed",
        retryCount: 0,
      };

      set((state) => ({
        tickets: [failedTicket, ...state.tickets],
        lastTicket: failedTicket,
        lastTicketByRole: { ...state.lastTicketByRole, [role]: failedTicket },
      }));

      return {
        success: false,
        ticket: failedTicket,
        error: "SIMULATED_TRANSMISSION_FAILURE",
      };
    }

    const newTicket: SupportTicket = {
      ticketId,
      workerId,
      workerRole: role,
      category,
      jobId: jobId?.trim() || undefined,
      payoutTxId: context?.payoutTxId,
      verificationType: context?.verificationType,
      subject: context?.subject,
      message: trimmedMsg,
      createdAt: new Date().toISOString(),
      status: "received",
      retryCount: 0,
    };

    set((state) => ({
      tickets: [newTicket, ...state.tickets],
      lastTicket: newTicket,
      lastTicketByRole: { ...state.lastTicketByRole, [role]: newTicket },
    }));

    return { success: true, ticket: newTicket };
  },

  retryTicket: (ticketId) => {
    const ticket = get().tickets.find((t) => t.ticketId === ticketId);
    if (!ticket) {
      return { success: false, error: "TICKET_NOT_FOUND" };
    }

    const updated: SupportTicket = {
      ...ticket,
      status: "received",
      retryCount: (ticket.retryCount || 0) + 1,
    };

    set((state) => ({
      tickets: state.tickets.map((t) => (t.ticketId === ticketId ? updated : t)),
      lastTicket: updated,
      lastTicketByRole: { ...state.lastTicketByRole, [ticket.workerRole]: updated },
    }));

    return { success: true, ticket: updated };
  },

  getLastTicket: () => get().lastTicket,

  getLastTicketForRole: (role: WorkerRole) => get().lastTicketByRole[role],

  getTicketById: (id: string) => get().tickets.find((t) => t.ticketId === id),

  setMockFailureScenario: (enabled: boolean) => set({ mockFailureScenario: enabled }),

  resetSupportStore: () => {
    set({
      tickets: [],
      lastTicket: null,
      lastTicketByRole: {
        driver: null,
        helper: null,
      },
      mockFailureScenario: false,
    });
  },
}));
