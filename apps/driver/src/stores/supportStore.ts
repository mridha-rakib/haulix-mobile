import { create } from "zustand";
import type { WorkerRole } from "./walletStore";

export interface SupportTicket {
  ticketId: string;
  workerRole: WorkerRole;
  category: string;
  jobId?: string;
  message: string;
  createdAt: string;
  status: "received" | "investigating" | "resolved";
}

interface SupportState {
  tickets: SupportTicket[];
  lastTicket: SupportTicket | null;
  submitTicket: (
    role: WorkerRole,
    category: string,
    message: string,
    jobId?: string
  ) => SupportTicket;
  getLastTicket: () => SupportTicket | null;
  resetSupportStore: () => void;
}

export const useSupportStore = create<SupportState>((set, get) => ({
  tickets: [],
  lastTicket: null,

  submitTicket: (role: WorkerRole, category: string, message: string, jobId?: string) => {
    const randomNum = Math.floor(1000 + Math.random() * 9000);
    const ticketId = `TKT-2026-${randomNum}`;

    const newTicket: SupportTicket = {
      ticketId,
      workerRole: role,
      category,
      jobId: jobId?.trim() || undefined,
      message,
      createdAt: new Date().toISOString(),
      status: "received",
    };

    set((state) => ({
      tickets: [newTicket, ...state.tickets],
      lastTicket: newTicket,
    }));

    return newTicket;
  },

  getLastTicket: () => get().lastTicket,

  resetSupportStore: () => {
    set({
      tickets: [],
      lastTicket: null,
    });
  },
}));
