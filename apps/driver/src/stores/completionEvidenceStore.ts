import { create } from "zustand";

export type EvidenceCategory = "before" | "after" | "taskPhoto1" | "taskPhoto2";

export type EvidenceSubmissionStatus = "DRAFT" | "READY" | "SUBMITTING" | "SUBMITTED" | "FAILED";

export type CompletionReviewStatus =
  | "EVIDENCE_SUBMITTED"
  | "REVIEW_PENDING"
  | "CUSTOMER_CONFIRMED"
  | "AUTO_CLOSURE_ELIGIBLE"
  | "DISPUTE_HOLD"
  | "PAYMENT_CAPTURE_PENDING"
  | "PAYMENT_SETTLED"
  | "WORKER_PAYOUT_PENDING";

export interface EvidenceItem {
  id: string;
  jobId: string;
  workerId: string;
  workerRole: "PRIMARY_DRIVER" | "HELPER";
  category: EvidenceCategory;
  localUri: string;
  labelEn: string;
  labelEs: string;
  capturedAt: string;
  timestampIso: string;
}

export interface JobCompletionRecord {
  jobId: string;
  driverEvidence: {
    before: EvidenceItem | null;
    after: EvidenceItem | null;
  };
  helperEvidence: {
    taskPhoto1: EvidenceItem | null;
    taskPhoto2: EvidenceItem | null;
  };
  driverSubmissionStatus: EvidenceSubmissionStatus;
  helperSubmissionStatus: EvidenceSubmissionStatus;
  reviewStatus: CompletionReviewStatus;
  submittedAt: string | null;
  reviewWindowExpiresAt: string | null;
  disputeReason: string | null;
  finalEarningsEstimate: number;
  tipsAmount: number;
  isPaidOut: boolean;
}

export const INITIAL_COMPLETION_RECORDS: Record<string, JobCompletionRecord> = {
  "HX-AZ-DEMO-0042": {
    jobId: "HX-AZ-DEMO-0042",
    driverEvidence: {
      before: {
        id: "ev-driver-before-001",
        jobId: "HX-AZ-DEMO-0042",
        workerId: "driver-alex",
        workerRole: "PRIMARY_DRIVER",
        category: "before",
        localUri: "assets/evidence/evidence-sofa-before.png",
        labelEn: "Living room sofa · Pre-existing condition documented",
        labelEs: "Sofá de sala · Condición previa documentada",
        capturedAt: "10:15 AM",
        timestampIso: "2026-11-28T10:15:00.000Z",
      },
      after: {
        id: "ev-driver-after-001",
        jobId: "HX-AZ-DEMO-0042",
        workerId: "driver-alex",
        workerRole: "PRIMARY_DRIVER",
        category: "after",
        localUri: "assets/evidence/evidence-room-after.png",
        labelEn: "Cleared living room space · Furniture loaded safely",
        labelEs: "Espacio despejado en sala · Muebles cargados con seguridad",
        capturedAt: "10:45 AM",
        timestampIso: "2026-11-28T10:45:00.000Z",
      },
    },
    helperEvidence: {
      taskPhoto1: {
        id: "ev-helper-task1-001",
        jobId: "HX-AZ-DEMO-0042",
        workerId: "helper-a",
        workerRole: "HELPER",
        category: "taskPhoto1",
        localUri: "assets/evidence/evidence-helper-task1.png",
        labelEn: "Mattress packaging & carry support",
        labelEs: "Embalaje de colchón y apoyo de carga",
        capturedAt: "10:20 AM",
        timestampIso: "2026-11-28T10:20:00.000Z",
      },
      taskPhoto2: {
        id: "ev-helper-task2-001",
        jobId: "HX-AZ-DEMO-0042",
        workerId: "helper-a",
        workerRole: "HELPER",
        category: "taskPhoto2",
        localUri: "assets/evidence/evidence-helper-task2.png",
        labelEn: "Boxes loading & truck tie-down",
        labelEs: "Carga de cajas y sujeción en camión",
        capturedAt: "10:40 AM",
        timestampIso: "2026-11-28T10:40:00.000Z",
      },
    },
    driverSubmissionStatus: "READY",
    helperSubmissionStatus: "DRAFT",
    reviewStatus: "REVIEW_PENDING",
    submittedAt: null,
    reviewWindowExpiresAt: "24 hours after customer delivery notice",
    disputeReason: null,
    finalEarningsEstimate: 142.5,
    tipsAmount: 20.0,
    isPaidOut: false,
  },
};

export interface CompletionEvidenceState {
  activeJobId: string;
  completionByJob: Record<string, JobCompletionRecord>;
  mockFailureScenario: boolean;

  // Actions
  setActiveJobId: (jobId: string) => void;
  getCompletionRecord: (jobId?: string) => JobCompletionRecord;
  attachDriverEvidence: (
    jobId: string,
    category: "before" | "after",
    localUri?: string,
    labelEn?: string,
    labelEs?: string
  ) => void;
  removeDriverEvidence: (jobId: string, category: "before" | "after") => void;
  attachHelperEvidence: (
    jobId: string,
    category: "taskPhoto1" | "taskPhoto2",
    localUri?: string,
    labelEn?: string,
    labelEs?: string
  ) => void;
  removeHelperEvidence: (jobId: string, category: "taskPhoto1" | "taskPhoto2") => void;
  submitDriverCompletion: (jobId?: string) => {
    success: boolean;
    error?: string;
  };
  submitHelperWork: (jobId?: string) => { success: boolean; error?: string };
  retryDriverSubmission: (jobId?: string) => { success: boolean };
  retryHelperSubmission: (jobId?: string) => { success: boolean };
  setReviewStatus: (jobId: string, status: CompletionReviewStatus) => void;
  setMockFailureScenario: (enabled: boolean) => void;
  resetCompletionStore: () => void;
}

export const useCompletionEvidenceStore = create<CompletionEvidenceState>((set, get) => ({
  activeJobId: "HX-AZ-DEMO-0042",
  completionByJob: JSON.parse(JSON.stringify(INITIAL_COMPLETION_RECORDS)),
  mockFailureScenario: false,

  setActiveJobId: (jobId) => set({ activeJobId: jobId }),

  getCompletionRecord: (jobId) => {
    const s = get();
    const targetId = jobId || s.activeJobId;
    if (!s.completionByJob[targetId]) {
      const fallback: JobCompletionRecord = {
        jobId: targetId,
        driverEvidence: { before: null, after: null },
        helperEvidence: { taskPhoto1: null, taskPhoto2: null },
        driverSubmissionStatus: "DRAFT",
        helperSubmissionStatus: "DRAFT",
        reviewStatus: "EVIDENCE_SUBMITTED",
        submittedAt: null,
        reviewWindowExpiresAt: null,
        disputeReason: null,
        finalEarningsEstimate: 142.5,
        tipsAmount: 20.0,
        isPaidOut: false,
      };
      set({
        completionByJob: {
          ...s.completionByJob,
          [targetId]: fallback,
        },
      });
      return fallback;
    }
    return s.completionByJob[targetId];
  },

  attachDriverEvidence: (jobId, category, localUri, labelEn, labelEs) => {
    const s = get();
    const targetId = jobId || s.activeJobId;
    const record = s.getCompletionRecord(targetId);

    const defaultUri =
      category === "before"
        ? "assets/evidence/evidence-sofa-before.png"
        : "assets/evidence/evidence-room-after.png";

    const defaultLabelEn =
      category === "before"
        ? "Pre-service furniture inspection photo"
        : "Post-service cleared room delivery photo";

    const defaultLabelEs =
      category === "before"
        ? "Foto de inspección de muebles previa al servicio"
        : "Foto de entrega y área despejada post-servicio";

    const newItem: EvidenceItem = {
      id: `ev-driver-${category}-${Date.now().toString().slice(-6)}`,
      jobId: targetId,
      workerId: "driver-alex",
      workerRole: "PRIMARY_DRIVER",
      category,
      localUri: localUri || defaultUri,
      labelEn: labelEn || defaultLabelEn,
      labelEs: labelEs || defaultLabelEs,
      capturedAt: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
      timestampIso: new Date().toISOString(),
    };

    const updatedDriverEvidence = {
      ...record.driverEvidence,
      [category]: newItem,
    };

    const isReady = Boolean(updatedDriverEvidence.before) && Boolean(updatedDriverEvidence.after);

    const updatedRecord: JobCompletionRecord = {
      ...record,
      driverEvidence: updatedDriverEvidence,
      driverSubmissionStatus: isReady ? "READY" : "DRAFT",
    };

    set({
      completionByJob: {
        ...s.completionByJob,
        [targetId]: updatedRecord,
      },
    });
  },

  removeDriverEvidence: (jobId, category) => {
    const s = get();
    const targetId = jobId || s.activeJobId;
    const record = s.getCompletionRecord(targetId);

    const updatedDriverEvidence = {
      ...record.driverEvidence,
      [category]: null,
    };

    set({
      completionByJob: {
        ...s.completionByJob,
        [targetId]: {
          ...record,
          driverEvidence: updatedDriverEvidence,
          driverSubmissionStatus: "DRAFT",
        },
      },
    });
  },

  attachHelperEvidence: (jobId, category, localUri, labelEn, labelEs) => {
    const s = get();
    const targetId = jobId || s.activeJobId;
    const record = s.getCompletionRecord(targetId);

    const defaultUri =
      category === "taskPhoto1"
        ? "assets/evidence/evidence-helper-task1.png"
        : "assets/evidence/evidence-helper-task2.png";

    const defaultLabelEn =
      category === "taskPhoto1" ? "Helper task 1: Labor start" : "Helper task 2: Labor completed";

    const defaultLabelEs =
      category === "taskPhoto1"
        ? "Tarea de ayudante 1: Inicio de labor"
        : "Tarea de ayudante 2: Labor completada";

    const newItem: EvidenceItem = {
      id: `ev-helper-${category}-${Date.now().toString().slice(-6)}`,
      jobId: targetId,
      workerId: "helper-a",
      workerRole: "HELPER",
      category,
      localUri: localUri || defaultUri,
      labelEn: labelEn || defaultLabelEn,
      labelEs: labelEs || defaultLabelEs,
      capturedAt: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
      timestampIso: new Date().toISOString(),
    };

    const updatedHelperEvidence = {
      ...record.helperEvidence,
      [category]: newItem,
    };

    const hasAtLeastOne =
      Boolean(updatedHelperEvidence.taskPhoto1) || Boolean(updatedHelperEvidence.taskPhoto2);

    set({
      completionByJob: {
        ...s.completionByJob,
        [targetId]: {
          ...record,
          helperEvidence: updatedHelperEvidence,
          helperSubmissionStatus: hasAtLeastOne ? "READY" : "DRAFT",
        },
      },
    });
  },

  removeHelperEvidence: (jobId, category) => {
    const s = get();
    const targetId = jobId || s.activeJobId;
    const record = s.getCompletionRecord(targetId);

    const updatedHelperEvidence = {
      ...record.helperEvidence,
      [category]: null,
    };

    const hasAtLeastOne =
      Boolean(updatedHelperEvidence.taskPhoto1) || Boolean(updatedHelperEvidence.taskPhoto2);

    set({
      completionByJob: {
        ...s.completionByJob,
        [targetId]: {
          ...record,
          helperEvidence: updatedHelperEvidence,
          helperSubmissionStatus: hasAtLeastOne ? "READY" : "DRAFT",
        },
      },
    });
  },

  submitDriverCompletion: (jobId) => {
    const s = get();
    const targetId = jobId || s.activeJobId;
    const record = s.getCompletionRecord(targetId);

    // Required evidence validation: Both before and after photos are mandatory for Driver
    if (!record.driverEvidence.before || !record.driverEvidence.after) {
      return {
        success: false,
        error: "MISSING_REQUIRED_EVIDENCE",
      };
    }

    // Simulated failure scenario if toggled in QA
    if (s.mockFailureScenario) {
      set({
        completionByJob: {
          ...s.completionByJob,
          [targetId]: {
            ...record,
            driverSubmissionStatus: "FAILED",
          },
        },
      });
      return {
        success: false,
        error: "SIMULATED_NETWORK_FAILURE",
      };
    }

    // Successful submission: transitions to SUBMITTED and marks review window open
    const updated: JobCompletionRecord = {
      ...record,
      driverSubmissionStatus: "SUBMITTED",
      reviewStatus: "REVIEW_PENDING",
      submittedAt: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
      reviewWindowExpiresAt: "24 hours",
    };

    set({
      completionByJob: {
        ...s.completionByJob,
        [targetId]: updated,
      },
    });

    return { success: true };
  },

  submitHelperWork: (jobId) => {
    const s = get();
    const targetId = jobId || s.activeJobId;
    const record = s.getCompletionRecord(targetId);

    // Helper requirement: At least one task labor photo
    if (!record.helperEvidence.taskPhoto1 && !record.helperEvidence.taskPhoto2) {
      return {
        success: false,
        error: "MISSING_HELPER_EVIDENCE",
      };
    }

    if (s.mockFailureScenario) {
      set({
        completionByJob: {
          ...s.completionByJob,
          [targetId]: {
            ...record,
            helperSubmissionStatus: "FAILED",
          },
        },
      });
      return {
        success: false,
        error: "SIMULATED_NETWORK_FAILURE",
      };
    }

    // Helper submission marks helperSubmissionStatus as SUBMITTED,
    // without prematurely completing the overall driver job!
    const updated: JobCompletionRecord = {
      ...record,
      helperSubmissionStatus: "SUBMITTED",
    };

    set({
      completionByJob: {
        ...s.completionByJob,
        [targetId]: updated,
      },
    });

    return { success: true };
  },

  retryDriverSubmission: (jobId) => {
    const s = get();
    const targetId = jobId || s.activeJobId;
    const record = s.getCompletionRecord(targetId);

    if (!record.driverEvidence.before || !record.driverEvidence.after) {
      return { success: false };
    }

    const updated: JobCompletionRecord = {
      ...record,
      driverSubmissionStatus: "SUBMITTED",
      reviewStatus: "REVIEW_PENDING",
      submittedAt: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
    };

    set({
      completionByJob: {
        ...s.completionByJob,
        [targetId]: updated,
      },
    });

    return { success: true };
  },

  retryHelperSubmission: (jobId) => {
    const s = get();
    const targetId = jobId || s.activeJobId;
    const record = s.getCompletionRecord(targetId);

    const updated: JobCompletionRecord = {
      ...record,
      helperSubmissionStatus: "SUBMITTED",
    };

    set({
      completionByJob: {
        ...s.completionByJob,
        [targetId]: updated,
      },
    });

    return { success: true };
  },

  setReviewStatus: (jobId, status) => {
    const s = get();
    const targetId = jobId || s.activeJobId;
    const record = s.getCompletionRecord(targetId);

    set({
      completionByJob: {
        ...s.completionByJob,
        [targetId]: {
          ...record,
          reviewStatus: status,
        },
      },
    });
  },

  setMockFailureScenario: (enabled) => set({ mockFailureScenario: enabled }),

  resetCompletionStore: () =>
    set({
      activeJobId: "HX-AZ-DEMO-0042",
      completionByJob: JSON.parse(JSON.stringify(INITIAL_COMPLETION_RECORDS)),
      mockFailureScenario: false,
    }),
}));
