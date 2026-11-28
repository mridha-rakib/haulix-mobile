import { create } from "zustand";

export type ApprovalDecision = "PENDING" | "APPROVED" | "DECLINED";
export type OverallApprovalStatus = "PENDING" | "APPROVED" | "DECLINED";

export interface AdditionalWorkRequest {
  id: string;
  jobId: string;
  requestedBy: "PRIMARY_DRIVER" | "HELPER";
  requestedScope: string;
  requestedScopeEs: string;
  proposedPrice: number;
  adminDecision: ApprovalDecision;
  customerDecision: ApprovalDecision;
  status: OverallApprovalStatus;
  isApplied: boolean;
  createdAt: string;
}

export interface JobServiceProgress {
  jobId: string;
  // Driver milestones (Figma 1086:512 / DW19)
  driverPickupArrived: boolean;
  driverWorkStarted: boolean;
  driverServiceInProgress: boolean;
  driverReadyForCompletion: boolean;

  // Helper milestones (Figma 1309:1052 / DW63)
  helperOnSite: boolean;
  helperTasksAssigned: boolean;
  helperSafetyConfirmed: boolean;
  helperWorkEvidenceCaptured: boolean;

  // Scope tracking
  originalScope: string;
  originalScopeEs: string;
  currentScope: string;
  currentScopeEs: string;

  // Requests
  additionalRequests: AdditionalWorkRequest[];
}

const DEFAULT_ORIGINAL_SCOPE = "Furniture removal · 1 sofa + 2 chairs";
const DEFAULT_ORIGINAL_SCOPE_ES = "Retiro de muebles · 1 sofá + 2 sillas";

export const INITIAL_SERVICE_PROGRESS: Record<string, JobServiceProgress> = {
  "HX-AZ-DEMO-0042": {
    jobId: "HX-AZ-DEMO-0042",
    driverPickupArrived: true,
    driverWorkStarted: false,
    driverServiceInProgress: false,
    driverReadyForCompletion: false,
    helperOnSite: true,
    helperTasksAssigned: true,
    helperSafetyConfirmed: true,
    helperWorkEvidenceCaptured: false,
    originalScope: DEFAULT_ORIGINAL_SCOPE,
    originalScopeEs: DEFAULT_ORIGINAL_SCOPE_ES,
    currentScope: DEFAULT_ORIGINAL_SCOPE,
    currentScopeEs: DEFAULT_ORIGINAL_SCOPE_ES,
    additionalRequests: [
      {
        id: "req-extra-001",
        jobId: "HX-AZ-DEMO-0042",
        requestedBy: "PRIMARY_DRIVER",
        requestedScope: "Example additional chair / stair carry",
        requestedScopeEs: "Silla adicional o escaleras · ejemplo",
        proposedPrice: 35.0,
        adminDecision: "PENDING",
        customerDecision: "PENDING",
        status: "PENDING",
        isApplied: false,
        createdAt: "10:30 AM",
      },
    ],
  },
};

export interface ServiceProgressState {
  activeJobId: string;
  serviceProgressByJob: Record<string, JobServiceProgress>;
  activeRequestId: string | null;

  // Actions
  setActiveJobId: (jobId: string) => void;
  getServiceProgress: (jobId?: string) => JobServiceProgress;
  getActiveRequest: (jobId?: string) => AdditionalWorkRequest | null;
  setDriverMilestone: (
    jobId: string,
    milestone:
      | "driverPickupArrived"
      | "driverWorkStarted"
      | "driverServiceInProgress"
      | "driverReadyForCompletion",
    value: boolean
  ) => void;
  setHelperMilestone: (
    jobId: string,
    milestone:
      | "helperOnSite"
      | "helperTasksAssigned"
      | "helperSafetyConfirmed"
      | "helperWorkEvidenceCaptured",
    value: boolean
  ) => void;
  createAdditionalWorkRequest: (params: {
    jobId?: string;
    requestedBy?: "PRIMARY_DRIVER" | "HELPER";
    requestedScope: string;
    requestedScopeEs?: string;
    proposedPrice?: number;
  }) => AdditionalWorkRequest;
  setAdminDecision: (requestId: string, decision: ApprovalDecision, isQAOverride?: boolean) => void;
  setCustomerDecision: (
    requestId: string,
    decision: ApprovalDecision,
    isQAOverride?: boolean
  ) => void;
  setBothApprovals: (requestId: string, approved: boolean) => void;
  setMockApprovalScenario: (
    requestId: string,
    scenario: "PENDING" | "APPROVED" | "DECLINED" | "ADMIN_ONLY" | "CUSTOMER_ONLY"
  ) => void;
  applyApprovedScope: (requestId: string) => boolean;
  resetServiceProgress: () => void;
}

function computeOverallStatus(
  admin: ApprovalDecision,
  customer: ApprovalDecision
): OverallApprovalStatus {
  if (admin === "DECLINED" || customer === "DECLINED") {
    return "DECLINED";
  }
  if (admin === "APPROVED" && customer === "APPROVED") {
    return "APPROVED";
  }
  return "PENDING";
}

function updateRequestDecision(
  r: AdditionalWorkRequest,
  targetId: string,
  type: "admin" | "customer",
  decision: ApprovalDecision,
  isQAOverride: boolean
): AdditionalWorkRequest {
  if (r.id !== targetId) return r;
  if (r.isApplied && !isQAOverride) return r;
  if (r.status === "DECLINED" && decision === "APPROVED" && !isQAOverride) {
    return r;
  }

  const adminDecision = type === "admin" ? decision : r.adminDecision;
  const customerDecision = type === "customer" ? decision : r.customerDecision;
  const newStatus = computeOverallStatus(adminDecision, customerDecision);

  return {
    ...r,
    adminDecision,
    customerDecision,
    status: newStatus,
  };
}

function applyMockScenario(
  r: AdditionalWorkRequest,
  targetId: string,
  scenario: "PENDING" | "APPROVED" | "DECLINED" | "ADMIN_ONLY" | "CUSTOMER_ONLY"
): AdditionalWorkRequest {
  if (r.id !== targetId) return r;
  let admin: ApprovalDecision = "PENDING";
  let customer: ApprovalDecision = "PENDING";
  if (scenario === "APPROVED") {
    admin = "APPROVED";
    customer = "APPROVED";
  } else if (scenario === "DECLINED") {
    admin = "DECLINED";
    customer = "DECLINED";
  } else if (scenario === "ADMIN_ONLY") {
    admin = "APPROVED";
    customer = "PENDING";
  } else if (scenario === "CUSTOMER_ONLY") {
    admin = "PENDING";
    customer = "APPROVED";
  }
  const status = computeOverallStatus(admin, customer);
  return {
    ...r,
    adminDecision: admin,
    customerDecision: customer,
    status,
  };
}

export const useServiceProgressStore = create<ServiceProgressState>((set, get) => ({
  activeJobId: "HX-AZ-DEMO-0042",
  serviceProgressByJob: JSON.parse(JSON.stringify(INITIAL_SERVICE_PROGRESS)),
  activeRequestId: "req-extra-001",

  setActiveJobId: (jobId) => set({ activeJobId: jobId }),

  getServiceProgress: (jobId) => {
    const s = get();
    const targetId = jobId || s.activeJobId;
    if (!s.serviceProgressByJob[targetId]) {
      let initialScope = DEFAULT_ORIGINAL_SCOPE;
      let initialScopeEs = DEFAULT_ORIGINAL_SCOPE_ES;
      try {
        const { useDispatchCrewStore } = require("./dispatchCrewStore");
        const offer = useDispatchCrewStore
          .getState()
          ?.offers?.find((o: { id: string }) => o.id === targetId);
        if (offer?.serviceItemsEn) {
          initialScope = offer.serviceItemsEn;
          initialScopeEs = offer.serviceItemsEs || offer.serviceItemsEn;
        }
      } catch {
        // Fallback to default
      }

      const fallback: JobServiceProgress = {
        jobId: targetId,
        driverPickupArrived: true,
        driverWorkStarted: false,
        driverServiceInProgress: false,
        driverReadyForCompletion: false,
        helperOnSite: true,
        helperTasksAssigned: true,
        helperSafetyConfirmed: true,
        helperWorkEvidenceCaptured: false,
        originalScope: initialScope,
        originalScopeEs: initialScopeEs,
        currentScope: initialScope,
        currentScopeEs: initialScopeEs,
        additionalRequests: [],
      };
      set({
        serviceProgressByJob: {
          ...s.serviceProgressByJob,
          [targetId]: fallback,
        },
      });
      return fallback;
    }
    return s.serviceProgressByJob[targetId];
  },

  getActiveRequest: (jobId) => {
    const s = get();
    const progress = s.getServiceProgress(jobId);
    if (s.activeRequestId) {
      const found = progress.additionalRequests.find((r) => r.id === s.activeRequestId);
      if (found) return found;
    }
    return progress.additionalRequests[0] || null;
  },

  setDriverMilestone: (jobId, milestone, value) => {
    const s = get();
    const prog = s.getServiceProgress(jobId);
    const updated: JobServiceProgress = {
      ...prog,
      [milestone]: value,
    };
    set({
      serviceProgressByJob: {
        ...s.serviceProgressByJob,
        [jobId]: updated,
      },
    });
  },

  setHelperMilestone: (jobId, milestone, value) => {
    const s = get();
    const prog = s.getServiceProgress(jobId);
    const updated: JobServiceProgress = {
      ...prog,
      [milestone]: value,
    };
    set({
      serviceProgressByJob: {
        ...s.serviceProgressByJob,
        [jobId]: updated,
      },
    });
  },

  createAdditionalWorkRequest: ({
    jobId,
    requestedBy = "PRIMARY_DRIVER",
    requestedScope,
    requestedScopeEs,
    proposedPrice = 35.0,
  }) => {
    const s = get();
    const targetJobId = jobId || s.activeJobId;
    const prog = s.getServiceProgress(targetJobId);

    // Deduplication: prevent duplicate pending request with identical scope text
    const cleanScope = requestedScope.trim().toLowerCase();
    const existing = prog.additionalRequests.find(
      (r) => r.status === "PENDING" && r.requestedScope.trim().toLowerCase() === cleanScope
    );
    if (existing) {
      set({ activeRequestId: existing.id });
      return existing;
    }

    const newReqId = `req-${targetJobId}-${prog.additionalRequests.length + 1}`;
    const newReq: AdditionalWorkRequest = {
      id: newReqId,
      jobId: targetJobId,
      requestedBy,
      requestedScope: requestedScope.trim(),
      requestedScopeEs: (requestedScopeEs || "Servicio adicional solicitado en sitio").trim(),
      proposedPrice,
      adminDecision: "PENDING",
      customerDecision: "PENDING",
      status: "PENDING",
      isApplied: false,
      createdAt: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
    };

    const updated: JobServiceProgress = {
      ...prog,
      additionalRequests: [newReq, ...prog.additionalRequests],
    };

    set({
      activeRequestId: newReq.id,
      serviceProgressByJob: {
        ...s.serviceProgressByJob,
        [targetJobId]: updated,
      },
    });

    return newReq;
  },

  setAdminDecision: (requestId, decision, isQAOverride = false) => {
    const s = get();
    const newMap: Record<string, JobServiceProgress> = {};
    for (const [jId, prog] of Object.entries(s.serviceProgressByJob)) {
      newMap[jId] = {
        ...prog,
        additionalRequests: prog.additionalRequests.map((r) =>
          updateRequestDecision(r, requestId, "admin", decision, isQAOverride)
        ),
      };
    }
    set({ serviceProgressByJob: newMap });
  },

  setCustomerDecision: (requestId, decision, isQAOverride = false) => {
    const s = get();
    const newMap: Record<string, JobServiceProgress> = {};
    for (const [jId, prog] of Object.entries(s.serviceProgressByJob)) {
      newMap[jId] = {
        ...prog,
        additionalRequests: prog.additionalRequests.map((r) =>
          updateRequestDecision(r, requestId, "customer", decision, isQAOverride)
        ),
      };
    }
    set({ serviceProgressByJob: newMap });
  },

  setBothApprovals: (requestId, approved) => {
    const s = get();
    const decision: ApprovalDecision = approved ? "APPROVED" : "DECLINED";
    const newMap: Record<string, JobServiceProgress> = {};

    for (const [jId, prog] of Object.entries(s.serviceProgressByJob)) {
      const reqs = prog.additionalRequests.map((r) => {
        if (r.id === requestId) {
          const newStatus = computeOverallStatus(decision, decision);
          return {
            ...r,
            adminDecision: decision,
            customerDecision: decision,
            status: newStatus,
          };
        }
        return r;
      });
      newMap[jId] = { ...prog, additionalRequests: reqs };
    }

    set({ serviceProgressByJob: newMap });
  },

  setMockApprovalScenario: (requestId, scenario) => {
    const s = get();
    const newMap: Record<string, JobServiceProgress> = {};
    for (const [jId, prog] of Object.entries(s.serviceProgressByJob)) {
      newMap[jId] = {
        ...prog,
        additionalRequests: prog.additionalRequests.map((r) =>
          applyMockScenario(r, requestId, scenario)
        ),
      };
    }
    set({ serviceProgressByJob: newMap });
  },

  applyApprovedScope: (requestId) => {
    const s = get();
    let applied = false;
    const newMap: Record<string, JobServiceProgress> = {};

    for (const [jId, prog] of Object.entries(s.serviceProgressByJob)) {
      let matched = false;
      const reqs = prog.additionalRequests.map((r) => {
        if (r.id === requestId) {
          matched = true;
          if (r.status === "APPROVED" && !r.isApplied) {
            applied = true;
            return { ...r, isApplied: true };
          }
        }
        return r;
      });

      if (matched && applied) {
        // Rebuild cumulative currentScope from originalScope + ALL applied approved requests
        const appliedRevs = reqs.filter((r) => r.isApplied && r.status === "APPROVED");
        const cumScope = [prog.originalScope, ...appliedRevs.map((r) => r.requestedScope)].join(
          " + "
        );
        const cumScopeEs = [
          prog.originalScopeEs,
          ...appliedRevs.map((r) => r.requestedScopeEs || r.requestedScope),
        ].join(" + ");

        newMap[jId] = {
          ...prog,
          currentScope: cumScope,
          currentScopeEs: cumScopeEs,
          additionalRequests: reqs,
        };
      } else {
        newMap[jId] = prog;
      }
    }

    if (applied) {
      set({ serviceProgressByJob: newMap });
    }
    return applied;
  },

  resetServiceProgress: () =>
    set({
      activeJobId: "HX-AZ-DEMO-0042",
      serviceProgressByJob: JSON.parse(JSON.stringify(INITIAL_SERVICE_PROGRESS)),
      activeRequestId: "req-extra-001",
    }),
}));
