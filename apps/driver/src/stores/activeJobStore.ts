import { create } from "zustand";

export type TransitProgressStatus = "EN_ROUTE" | "ON_SITE" | "WORKING" | "COMPLETED";

export type NetworkConnectionStatus = "CONNECTED" | "INTERRUPTED";

export type LocationPermissionStatus = "ALWAYS_ALLOW" | "WHILE_IN_USE" | "DENIED";

export interface JobTransitProgress {
  driverTransitStatus: TransitProgressStatus;
  helperTransitStatus: TransitProgressStatus;
  isDriverArrived: boolean;
  isHelperArrived: boolean;
}

const DEFAULT_TRANSIT_PROGRESS: JobTransitProgress = {
  driverTransitStatus: "EN_ROUTE",
  helperTransitStatus: "EN_ROUTE",
  isDriverArrived: false,
  isHelperArrived: false,
};

export interface ActiveJobState {
  activeJobId: string;
  driverTransitStatus: TransitProgressStatus;
  helperTransitStatus: TransitProgressStatus;
  isDriverArrived: boolean;
  isHelperArrived: boolean;
  jobProgressByJob: Record<string, JobTransitProgress>;
  networkStatus: NetworkConnectionStatus;
  locationPermission: LocationPermissionStatus;
  originatingScreen: string;
  isCallModalOpen: boolean;
  isLocationModalOpen: boolean;

  // Actions
  setActiveJobId: (jobId: string) => void;
  getJobProgress: (jobId?: string) => JobTransitProgress;
  setDriverTransitStatus: (status: TransitProgressStatus, jobId?: string) => void;
  setHelperTransitStatus: (status: TransitProgressStatus, jobId?: string) => void;
  confirmDriverArrival: (jobId?: string) => void;
  confirmHelperArrival: (jobId?: string) => void;
  setNetworkStatus: (status: NetworkConnectionStatus) => void;
  setLocationPermission: (permission: LocationPermissionStatus) => void;
  setOriginatingScreen: (route: string) => void;
  setCallModalOpen: (open: boolean) => void;
  setLocationModalOpen: (open: boolean) => void;
  resetActiveJob: () => void;
}

export const useActiveJobStore = create<ActiveJobState>((set, get) => ({
  activeJobId: "HX-AZ-DEMO-0042",
  driverTransitStatus: "EN_ROUTE",
  helperTransitStatus: "EN_ROUTE",
  isDriverArrived: false,
  isHelperArrived: false,
  jobProgressByJob: {
    "HX-AZ-DEMO-0042": { ...DEFAULT_TRANSIT_PROGRESS },
  },
  networkStatus: "CONNECTED",
  locationPermission: "ALWAYS_ALLOW",
  originatingScreen: "/(app)/active-job",
  isCallModalOpen: false,
  isLocationModalOpen: false,

  setActiveJobId: (jobId) => {
    const s = get();
    const currentProgress = s.jobProgressByJob[jobId] || { ...DEFAULT_TRANSIT_PROGRESS };
    set({
      activeJobId: jobId,
      driverTransitStatus: currentProgress.driverTransitStatus,
      helperTransitStatus: currentProgress.helperTransitStatus,
      isDriverArrived: currentProgress.isDriverArrived,
      isHelperArrived: currentProgress.isHelperArrived,
      jobProgressByJob: {
        ...s.jobProgressByJob,
        [jobId]: currentProgress,
      },
    });
  },

  getJobProgress: (jobId) => {
    const s = get();
    const id = jobId || s.activeJobId;
    return s.jobProgressByJob[id] || { ...DEFAULT_TRANSIT_PROGRESS };
  },

  setDriverTransitStatus: (status, jobId) => {
    const s = get();
    const id = jobId || s.activeJobId;
    const prev = s.jobProgressByJob[id] || { ...DEFAULT_TRANSIT_PROGRESS };
    const isArrived = status === "ON_SITE" || status === "WORKING" || status === "COMPLETED";
    const updated = {
      ...prev,
      driverTransitStatus: status,
      isDriverArrived: isArrived,
    };
    const isCurrent = id === s.activeJobId;
    set({
      jobProgressByJob: {
        ...s.jobProgressByJob,
        [id]: updated,
      },
      ...(isCurrent
        ? {
            driverTransitStatus: status,
            isDriverArrived: isArrived,
          }
        : {}),
    });
  },

  setHelperTransitStatus: (status, jobId) => {
    const s = get();
    const id = jobId || s.activeJobId;
    const prev = s.jobProgressByJob[id] || { ...DEFAULT_TRANSIT_PROGRESS };
    const isArrived = status === "ON_SITE" || status === "WORKING" || status === "COMPLETED";
    const updated = {
      ...prev,
      helperTransitStatus: status,
      isHelperArrived: isArrived,
    };
    const isCurrent = id === s.activeJobId;
    set({
      jobProgressByJob: {
        ...s.jobProgressByJob,
        [id]: updated,
      },
      ...(isCurrent
        ? {
            helperTransitStatus: status,
            isHelperArrived: isArrived,
          }
        : {}),
    });
  },

  confirmDriverArrival: (jobId) => {
    const s = get();
    const id = jobId || s.activeJobId;
    const prev = s.jobProgressByJob[id] || { ...DEFAULT_TRANSIT_PROGRESS };
    const updated = {
      ...prev,
      driverTransitStatus: "ON_SITE" as TransitProgressStatus,
      isDriverArrived: true,
    };
    const isCurrent = id === s.activeJobId;
    set({
      jobProgressByJob: {
        ...s.jobProgressByJob,
        [id]: updated,
      },
      ...(isCurrent
        ? {
            driverTransitStatus: "ON_SITE",
            isDriverArrived: true,
          }
        : {}),
    });
  },

  confirmHelperArrival: (jobId) => {
    const s = get();
    const id = jobId || s.activeJobId;
    const prev = s.jobProgressByJob[id] || { ...DEFAULT_TRANSIT_PROGRESS };
    const updated = {
      ...prev,
      helperTransitStatus: "ON_SITE" as TransitProgressStatus,
      isHelperArrived: true,
    };
    const isCurrent = id === s.activeJobId;
    set({
      jobProgressByJob: {
        ...s.jobProgressByJob,
        [id]: updated,
      },
      ...(isCurrent
        ? {
            helperTransitStatus: "ON_SITE",
            isHelperArrived: true,
          }
        : {}),
    });
  },

  setNetworkStatus: (status) => set({ networkStatus: status }),

  setLocationPermission: (permission) => set({ locationPermission: permission }),

  setOriginatingScreen: (route) => set({ originatingScreen: route }),

  setCallModalOpen: (open) => set({ isCallModalOpen: open }),

  setLocationModalOpen: (open) => set({ isLocationModalOpen: open }),

  resetActiveJob: () =>
    set({
      activeJobId: "HX-AZ-DEMO-0042",
      driverTransitStatus: "EN_ROUTE",
      helperTransitStatus: "EN_ROUTE",
      isDriverArrived: false,
      isHelperArrived: false,
      jobProgressByJob: {
        "HX-AZ-DEMO-0042": { ...DEFAULT_TRANSIT_PROGRESS },
      },
      networkStatus: "CONNECTED",
      locationPermission: "ALWAYS_ALLOW",
      originatingScreen: "/(app)/active-job",
      isCallModalOpen: false,
      isLocationModalOpen: false,
    }),
}));
