import { create } from "zustand";

export type OfferStatus = "AVAILABLE" | "ACCEPTED" | "DECLINED" | "EXPIRED" | "UNAVAILABLE";

export type InvitationStatus = "PENDING" | "ACCEPTED" | "DECLINED" | "CANCELLED";

export type CrewReadinessStatus = "INCOMPLETE" | "PENDING" | "ACCEPTED" | "READY";

export interface MockJobOffer {
  id: string;
  titleEn: string;
  titleEs: string;
  category: string;
  locationEn: string;
  locationEs: string;
  pickupRouteEn: string;
  pickupRouteEs: string;
  serviceItemsEn: string;
  serviceItemsEs: string;
  scheduleEn: string;
  scheduleEs: string;
  distanceMiles: number;
  radialRingEn: string;
  radialRingEs: string;
  cargoSize: string;
  vehicleRequired: string;
  crewRequiredEn: string;
  crewRequiredEs: string;
  estimatedPayout: number;
  subtotal: number;
  helperPayout: number;
  status: OfferStatus;
  isNew: boolean;
  noteEn: string;
  noteEs: string;
}

export interface MockHelperProfile {
  id: string;
  nameEn: string;
  nameEs: string;
  rating: number;
  proximityEn: string;
  proximityEs: string;
  isEligible: boolean;
  isAvailable: boolean;
  isFavorite: boolean;
}

export interface MockHelperInvitation {
  id: string;
  jobId: string;
  driverId: string;
  driverName: string;
  helperId: string;
  helperName: string;
  status: InvitationStatus;
  countdownSeconds: number;
  estimatedEarnings: number;
  createdAt: string;
}

export interface MockCrewReadiness {
  jobId: string;
  driverName: string;
  driverStatus: "ACCEPTED" | "PENDING";
  helperName: string;
  helperStatus: "PENDING" | "ACCEPTED" | "DECLINED";
  isCrewReady: boolean;
}

export const INITIAL_JOB_OFFERS: MockJobOffer[] = [
  {
    id: "HX-AZ-DEMO-0042",
    titleEn: "Furniture Removal",
    titleEs: "Retiro de muebles",
    category: "FURNITURE",
    locationEn: "Phoenix, AZ · 4.8 mi",
    locationEs: "Phoenix, AZ · 4.8 mi",
    pickupRouteEn: "Phoenix, AZ · example route",
    pickupRouteEs: "Phoenix, AZ · ruta de ejemplo",
    serviceItemsEn: "1 sofa + 2 chairs · subject to confirmation",
    serviceItemsEs: "1 sofá + 2 sillas · sujeto a confirmación",
    scheduleEn: "Tue, Nov 3 · 10:00 AM–12:00 PM MST",
    scheduleEs: "Mar., 3 nov. · 10:00–12:00 MST",
    distanceMiles: 4.8,
    radialRingEn: "10 mi radius",
    radialRingEs: "Radio de 10 mi",
    cargoSize: "CARGO: MEDIUM",
    vehicleRequired: "BOX TRUCK REQUIRED",
    crewRequiredEn: "1 DRIVER + 1 HELPER",
    crewRequiredEs: "1 CONDUCTOR + 1 AYUDANTE",
    estimatedPayout: 142.5,
    subtotal: 400.0,
    helperPayout: 70.0,
    status: "AVAILABLE",
    isNew: true,
    noteEn: "Review before accepting · estimate only",
    noteEs: "Revisa antes de aceptar · estimación",
  },
  {
    id: "OFFER-DEMO-02",
    titleEn: "Garage Cleanout",
    titleEs: "Limpieza de garaje",
    category: "CLEANOUT",
    locationEn: "Tempe, AZ · 9.4 mi",
    locationEs: "Tempe, AZ · 9.4 mi",
    pickupRouteEn: "Tempe, AZ · example route",
    pickupRouteEs: "Tempe, AZ · ruta de ejemplo",
    serviceItemsEn: "Boxes + metal shelving · heavy items",
    serviceItemsEs: "Cajas + estanterías metálicas · objetos pesados",
    scheduleEn: "Wed, Nov 4 · 1:00 PM–3:00 PM MST",
    scheduleEs: "Mié., 4 nov. · 13:00–15:00 MST",
    distanceMiles: 9.4,
    radialRingEn: "10 mi radius",
    radialRingEs: "Radio de 10 mi",
    cargoSize: "CARGO: LARGE",
    vehicleRequired: "BOX TRUCK REQUIRED",
    crewRequiredEn: "1 DRIVER + 1 HELPER",
    crewRequiredEs: "1 CONDUCTOR + 1 AYUDANTE",
    estimatedPayout: 95.0,
    subtotal: 300.0,
    helperPayout: 55.0,
    status: "AVAILABLE",
    isNew: true,
    noteEn: "Quote server-confirmed · estimate only",
    noteEs: "Cotización confirmada por servidor · estimación",
  },
  {
    id: "OFFER-DEMO-03",
    titleEn: "Moving Assistance",
    titleEs: "Ayuda en mudanza",
    category: "MOVING",
    locationEn: "Scottsdale, AZ · 6.1 mi",
    locationEs: "Scottsdale, AZ · 6.1 mi",
    pickupRouteEn: "Scottsdale, AZ · example route",
    pickupRouteEs: "Scottsdale, AZ · ruta de ejemplo",
    serviceItemsEn: "Appliance dolly + 4 furniture pieces",
    serviceItemsEs: "Carretilla para electrodomésticos + 4 muebles",
    scheduleEn: "Thu, Nov 5 · 9:00 AM–11:00 AM MST",
    scheduleEs: "Jue., 5 nov. · 9:00–11:00 MST",
    distanceMiles: 6.1,
    radialRingEn: "20 mi radius",
    radialRingEs: "Radio de 20 mi",
    cargoSize: "CARGO: MEDIUM",
    vehicleRequired: "CARGO VAN",
    crewRequiredEn: "1 DRIVER + 1 HELPER",
    crewRequiredEs: "1 CONDUCTOR + 1 AYUDANTE",
    estimatedPayout: 118.0,
    subtotal: 350.0,
    helperPayout: 65.0,
    status: "AVAILABLE",
    isNew: true,
    noteEn: "Quote server-confirmed · estimate only",
    noteEs: "Cotización confirmada por servidor · estimación",
  },
];

export const INITIAL_HELPERS: MockHelperProfile[] = [
  {
    id: "helper-a",
    nameEn: "Verified Helper A",
    nameEs: "Ayudante verificado A",
    rating: 4.9,
    proximityEn: "2.4 mi away",
    proximityEs: "A 2.4 mi",
    isEligible: true,
    isAvailable: true,
    isFavorite: true,
  },
  {
    id: "helper-b",
    nameEn: "Verified Helper B",
    nameEs: "Ayudante verificado B",
    rating: 4.8,
    proximityEn: "4.1 mi away",
    proximityEs: "A 4.1 mi",
    isEligible: true,
    isAvailable: true,
    isFavorite: false,
  },
];

export interface DispatchCrewState {
  offers: MockJobOffer[];
  selectedJobId: string;
  helpers: MockHelperProfile[];
  selectedHelperId: string | null;
  invitations: MockHelperInvitation[];
  activeInvitationId: string | null;
  crewReadinessByJob: Record<string, MockCrewReadiness>;
  crewReadiness: MockCrewReadiness;
  offersFilter: "available" | "invitations" | "expired";

  // Actions
  setSelectedJobId: (jobId: string) => void;
  getSelectedJob: () => MockJobOffer;
  getCrewReadiness: (jobId?: string) => MockCrewReadiness;
  setOffersFilter: (filter: "available" | "invitations" | "expired") => void;

  acceptJobOffer: (jobId: string) => boolean;
  declineJobOffer: (jobId: string) => void;
  expireJobOffer: (jobId: string) => void;

  selectHelper: (helperId: string) => void;
  sendHelperInvitation: (jobId: string, helperId: string) => MockHelperInvitation;
  cancelHelperInvitation: (invitationId: string) => void;

  helperAcceptInvitation: (invitationId: string) => boolean;
  helperDeclineInvitation: (invitationId: string) => boolean;

  setCrewReady: (isReady: boolean, jobId?: string) => void;
  setScenario: (
    scenario:
      | "AVAILABLE"
      | "EXPIRED"
      | "ACCEPTED"
      | "PENDING_INVITE"
      | "ACCEPTED_INVITE"
      | "DECLINED_INVITE"
      | "CREW_INCOMPLETE"
      | "CREW_READY"
  ) => void;
  resetDispatchCrew: () => void;
}

const DEFAULT_READINESS: MockCrewReadiness = {
  jobId: "HX-AZ-DEMO-0042",
  driverName: "Alex",
  driverStatus: "ACCEPTED",
  helperName: "Helper · independent response",
  helperStatus: "PENDING",
  isCrewReady: false,
};

export const useDispatchCrewStore = create<DispatchCrewState>((set, get) => ({
  offers: [...INITIAL_JOB_OFFERS],
  selectedJobId: "HX-AZ-DEMO-0042",
  helpers: [...INITIAL_HELPERS],
  selectedHelperId: "helper-a",
  invitations: [
    {
      id: "INV-DEMO-0042",
      jobId: "HX-AZ-DEMO-0042",
      driverId: "driver-alex",
      driverName: "Alex",
      helperId: "helper-a",
      helperName: "Verified Helper A",
      status: "PENDING",
      countdownSeconds: 180,
      estimatedEarnings: 70.0,
      createdAt: new Date().toISOString(),
    },
  ],
  activeInvitationId: "INV-DEMO-0042",
  crewReadinessByJob: {
    "HX-AZ-DEMO-0042": { ...DEFAULT_READINESS },
  },
  crewReadiness: { ...DEFAULT_READINESS },
  offersFilter: "available",

  setSelectedJobId: (jobId) => {
    const s = get();
    const currentReadiness = s.crewReadinessByJob[jobId] || {
      ...DEFAULT_READINESS,
      jobId,
    };
    set({
      selectedJobId: jobId,
      crewReadiness: currentReadiness,
    });
  },

  getSelectedJob: () => {
    const s = get();
    return s.offers.find((o) => o.id === s.selectedJobId) || s.offers[0];
  },

  getCrewReadiness: (jobId) => {
    const s = get();
    const id = jobId || s.selectedJobId;
    return s.crewReadinessByJob[id] || { ...DEFAULT_READINESS, jobId: id };
  },

  setOffersFilter: (filter) => set({ offersFilter: filter }),

  acceptJobOffer: (jobId) => {
    const s = get();
    const existing = s.offers.find((o) => o.id === jobId);
    // Strict transition: Only AVAILABLE offers can be accepted
    if (existing?.status !== "AVAILABLE") {
      return false; // Rejects duplicate, expired, declined, or unavailable offers
    }

    const nextReadiness: MockCrewReadiness = s.crewReadinessByJob[jobId] || {
      ...DEFAULT_READINESS,
      jobId,
      driverStatus: "ACCEPTED",
    };

    set((state) => ({
      offers: state.offers.map((o) =>
        o.id === jobId ? { ...o, status: "ACCEPTED", isNew: false } : o
      ),
      selectedJobId: jobId,
      crewReadinessByJob: {
        ...state.crewReadinessByJob,
        [jobId]: { ...nextReadiness, driverStatus: "ACCEPTED" },
      },
      crewReadiness: { ...nextReadiness, driverStatus: "ACCEPTED" },
    }));

    try {
      const { syncActiveJobContext } = require("./jobContextSync");
      syncActiveJobContext(jobId);
    } catch {
      // fallback
    }

    return true;
  },

  declineJobOffer: (jobId) => {
    set((state) => ({
      // Invariant: Do not overwrite an already accepted assignment
      offers: state.offers.map((o) =>
        o.id === jobId && o.status !== "ACCEPTED" ? { ...o, status: "DECLINED", isNew: false } : o
      ),
    }));
  },

  expireJobOffer: (jobId) => {
    set((state) => ({
      // Invariant: Do not overwrite an already accepted assignment
      offers: state.offers.map((o) =>
        o.id === jobId && o.status !== "ACCEPTED" ? { ...o, status: "EXPIRED", isNew: false } : o
      ),
    }));
  },

  selectHelper: (helperId) => set({ selectedHelperId: helperId }),

  sendHelperInvitation: (jobId, helperId) => {
    const s = get();
    const helper = s.helpers.find((h) => h.id === helperId) || s.helpers[0];
    const job = s.offers.find((o) => o.id === jobId) || s.offers[0];

    const existing = s.invitations.find(
      (inv) => inv.jobId === jobId && inv.helperId === helperId && inv.status === "PENDING"
    );

    if (existing) {
      return existing; // prevent duplicate pending invitation
    }

    const newInv: MockHelperInvitation = {
      id: `INV-${Date.now().toString().slice(-6)}`,
      jobId,
      driverId: "driver-alex",
      driverName: "Alex",
      helperId,
      helperName: helper.nameEn,
      status: "PENDING",
      countdownSeconds: 180,
      estimatedEarnings: job.helperPayout, // Job-consistent helper payout
      createdAt: new Date().toISOString(),
    };

    const nextReadiness: MockCrewReadiness = {
      jobId,
      driverName: "Alex",
      driverStatus: "ACCEPTED",
      helperName: helper.nameEn,
      helperStatus: "PENDING",
      isCrewReady: false,
    };

    set((state) => ({
      invitations: [newInv, ...state.invitations],
      activeInvitationId: newInv.id,
      selectedHelperId: helperId,
      crewReadinessByJob: {
        ...state.crewReadinessByJob,
        [jobId]: nextReadiness,
      },
      crewReadiness: state.selectedJobId === jobId ? nextReadiness : state.crewReadiness,
    }));

    return newInv;
  },

  cancelHelperInvitation: (invitationId) => {
    const s = get();
    const inv = s.invitations.find((i) => i.id === invitationId);
    if (!inv) return;

    const jobId = inv.jobId;
    const nextReadiness: MockCrewReadiness = {
      ...(s.crewReadinessByJob[jobId] || DEFAULT_READINESS),
      jobId,
      helperStatus: "PENDING",
      isCrewReady: false,
    };

    set((state) => ({
      invitations: state.invitations.map((i) =>
        i.id === invitationId ? { ...i, status: "CANCELLED" } : i
      ),
      crewReadinessByJob: {
        ...state.crewReadinessByJob,
        [jobId]: nextReadiness,
      },
      crewReadiness: state.selectedJobId === jobId ? nextReadiness : state.crewReadiness,
    }));
  },

  helperAcceptInvitation: (invitationId) => {
    const s = get();
    const inv = s.invitations.find((i) => i.id === invitationId);
    // Invariant: Unknown or cancelled/declined invitations cannot be accepted
    if (!inv || inv.status === "CANCELLED" || inv.status === "DECLINED") {
      return false;
    }

    const jobId = inv.jobId;
    const helperName = inv.helperName || "Elena Torres";
    const nextReadiness: MockCrewReadiness = {
      ...(s.crewReadinessByJob[jobId] || DEFAULT_READINESS),
      jobId,
      helperName,
      helperStatus: "ACCEPTED",
      isCrewReady: true,
    };

    set((state) => ({
      invitations: state.invitations.map((i) =>
        i.id === invitationId ? { ...i, status: "ACCEPTED" } : i
      ),
      crewReadinessByJob: {
        ...state.crewReadinessByJob,
        [jobId]: nextReadiness,
      },
      crewReadiness: state.selectedJobId === jobId ? nextReadiness : state.crewReadiness,
    }));
    return true;
  },

  helperDeclineInvitation: (invitationId) => {
    const s = get();
    const inv = s.invitations.find((i) => i.id === invitationId);
    if (!inv) return false;

    const jobId = inv.jobId;
    const nextReadiness: MockCrewReadiness = {
      ...(s.crewReadinessByJob[jobId] || DEFAULT_READINESS),
      jobId,
      helperStatus: "DECLINED",
      isCrewReady: false,
    };

    set((state) => ({
      invitations: state.invitations.map((i) =>
        i.id === invitationId ? { ...i, status: "DECLINED" } : i
      ),
      crewReadinessByJob: {
        ...state.crewReadinessByJob,
        [jobId]: nextReadiness,
      },
      crewReadiness: state.selectedJobId === jobId ? nextReadiness : state.crewReadiness,
    }));
    return true;
  },

  setCrewReady: (isReady, jobId) => {
    const s = get();
    const id = jobId || s.selectedJobId;
    const nextReadiness: MockCrewReadiness = {
      ...(s.crewReadinessByJob[id] || DEFAULT_READINESS),
      jobId: id,
      isCrewReady: isReady,
    };
    set((state) => ({
      crewReadinessByJob: {
        ...state.crewReadinessByJob,
        [id]: nextReadiness,
      },
      crewReadiness: state.selectedJobId === id ? nextReadiness : state.crewReadiness,
    }));
  },

  setScenario: (scenario) => {
    const defaultJob = INITIAL_JOB_OFFERS[0];
    switch (scenario) {
      case "AVAILABLE": {
        const readiness = {
          jobId: defaultJob.id,
          driverName: "Alex",
          driverStatus: "ACCEPTED" as const,
          helperName: "Helper · independent response",
          helperStatus: "PENDING" as const,
          isCrewReady: false,
        };
        set({
          offers: [...INITIAL_JOB_OFFERS],
          selectedJobId: defaultJob.id,
          invitations: [],
          crewReadinessByJob: { [defaultJob.id]: readiness },
          crewReadiness: readiness,
        });
        break;
      }

      case "EXPIRED":
        set((state) => ({
          offers: state.offers.map((o) =>
            o.id === defaultJob.id ? { ...o, status: "EXPIRED" } : o
          ),
          selectedJobId: defaultJob.id,
        }));
        break;

      case "ACCEPTED":
        set((state) => ({
          offers: state.offers.map((o) =>
            o.id === defaultJob.id ? { ...o, status: "ACCEPTED" } : o
          ),
          selectedJobId: defaultJob.id,
        }));
        break;

      case "PENDING_INVITE": {
        const readiness = {
          jobId: defaultJob.id,
          driverName: "Alex",
          driverStatus: "ACCEPTED" as const,
          helperName: "Verified Helper A",
          helperStatus: "PENDING" as const,
          isCrewReady: false,
        };
        set((state) => ({
          offers: state.offers.map((o) =>
            o.id === defaultJob.id ? { ...o, status: "ACCEPTED" } : o
          ),
          selectedJobId: defaultJob.id,
          invitations: [
            {
              id: "INV-DEMO-0042",
              jobId: defaultJob.id,
              driverId: "driver-alex",
              driverName: "Alex",
              helperId: "helper-a",
              helperName: "Verified Helper A",
              status: "PENDING",
              countdownSeconds: 180,
              estimatedEarnings: defaultJob.helperPayout,
              createdAt: new Date().toISOString(),
            },
          ],
          activeInvitationId: "INV-DEMO-0042",
          crewReadinessByJob: {
            ...state.crewReadinessByJob,
            [defaultJob.id]: readiness,
          },
          crewReadiness: readiness,
        }));
        break;
      }

      case "ACCEPTED_INVITE":
      case "CREW_READY": {
        const readiness = {
          jobId: defaultJob.id,
          driverName: "Alex",
          driverStatus: "ACCEPTED" as const,
          helperName: "Verified Helper A",
          helperStatus: "ACCEPTED" as const,
          isCrewReady: true,
        };
        set((state) => ({
          offers: state.offers.map((o) =>
            o.id === defaultJob.id ? { ...o, status: "ACCEPTED" } : o
          ),
          selectedJobId: defaultJob.id,
          invitations: [
            {
              id: "INV-DEMO-0042",
              jobId: defaultJob.id,
              driverId: "driver-alex",
              driverName: "Alex",
              helperId: "helper-a",
              helperName: "Verified Helper A",
              status: "ACCEPTED",
              countdownSeconds: 0,
              estimatedEarnings: defaultJob.helperPayout,
              createdAt: new Date().toISOString(),
            },
          ],
          activeInvitationId: "INV-DEMO-0042",
          crewReadinessByJob: {
            ...state.crewReadinessByJob,
            [defaultJob.id]: readiness,
          },
          crewReadiness: readiness,
        }));
        break;
      }

      case "DECLINED_INVITE":
      case "CREW_INCOMPLETE": {
        const readiness = {
          jobId: defaultJob.id,
          driverName: "Alex",
          driverStatus: "ACCEPTED" as const,
          helperName: "Verified Helper A",
          helperStatus: "DECLINED" as const,
          isCrewReady: false,
        };
        set((state) => ({
          offers: state.offers.map((o) =>
            o.id === defaultJob.id ? { ...o, status: "ACCEPTED" } : o
          ),
          selectedJobId: defaultJob.id,
          invitations: [
            {
              id: "INV-DEMO-0042",
              jobId: defaultJob.id,
              driverId: "driver-alex",
              driverName: "Alex",
              helperId: "helper-a",
              helperName: "Verified Helper A",
              status: "DECLINED",
              countdownSeconds: 0,
              estimatedEarnings: defaultJob.helperPayout,
              createdAt: new Date().toISOString(),
            },
          ],
          activeInvitationId: "INV-DEMO-0042",
          crewReadinessByJob: {
            ...state.crewReadinessByJob,
            [defaultJob.id]: readiness,
          },
          crewReadiness: readiness,
        }));
        break;
      }
    }
  },

  resetDispatchCrew: () => {
    const defaultJob = INITIAL_JOB_OFFERS[0];
    const readiness = {
      jobId: defaultJob.id,
      driverName: "Alex",
      driverStatus: "ACCEPTED" as const,
      helperName: "Helper · independent response",
      helperStatus: "PENDING" as const,
      isCrewReady: false,
    };
    set({
      offers: [...INITIAL_JOB_OFFERS],
      selectedJobId: "HX-AZ-DEMO-0042",
      helpers: [...INITIAL_HELPERS],
      selectedHelperId: "helper-a",
      invitations: [
        {
          id: "INV-DEMO-0042",
          jobId: "HX-AZ-DEMO-0042",
          driverId: "driver-alex",
          driverName: "Alex",
          helperId: "helper-a",
          helperName: "Verified Helper A",
          status: "PENDING",
          countdownSeconds: 180,
          estimatedEarnings: defaultJob.helperPayout,
          createdAt: new Date().toISOString(),
        },
      ],
      activeInvitationId: "INV-DEMO-0042",
      crewReadinessByJob: { "HX-AZ-DEMO-0042": readiness },
      crewReadiness: readiness,
      offersFilter: "available",
    });
  },
}));
