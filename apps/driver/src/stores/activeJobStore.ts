import { create } from "zustand";

export type TransitProgressStatus =
	| "EN_ROUTE"
	| "ON_SITE"
	| "WORKING"
	| "COMPLETED";

export type NetworkConnectionStatus = "CONNECTED" | "INTERRUPTED";

export type LocationPermissionStatus =
	| "ALWAYS_ALLOW"
	| "WHILE_IN_USE"
	| "DENIED";

export interface ActiveJobState {
	activeJobId: string;
	driverTransitStatus: TransitProgressStatus;
	helperTransitStatus: TransitProgressStatus;
	isDriverArrived: boolean;
	isHelperArrived: boolean;
	networkStatus: NetworkConnectionStatus;
	locationPermission: LocationPermissionStatus;
	originatingScreen: string;
	isCallModalOpen: boolean;
	isLocationModalOpen: boolean;

	// Actions
	setActiveJobId: (jobId: string) => void;
	setDriverTransitStatus: (status: TransitProgressStatus) => void;
	setHelperTransitStatus: (status: TransitProgressStatus) => void;
	confirmDriverArrival: () => void;
	confirmHelperArrival: () => void;
	setNetworkStatus: (status: NetworkConnectionStatus) => void;
	setLocationPermission: (permission: LocationPermissionStatus) => void;
	setOriginatingScreen: (route: string) => void;
	setCallModalOpen: (open: boolean) => void;
	setLocationModalOpen: (open: boolean) => void;
	resetActiveJob: () => void;
}

export const useActiveJobStore = create<ActiveJobState>((set) => ({
	activeJobId: "HX-AZ-DEMO-0042",
	driverTransitStatus: "EN_ROUTE",
	helperTransitStatus: "EN_ROUTE",
	isDriverArrived: false,
	isHelperArrived: false,
	networkStatus: "CONNECTED",
	locationPermission: "ALWAYS_ALLOW",
	originatingScreen: "/(app)/active-job",
	isCallModalOpen: false,
	isLocationModalOpen: false,

	setActiveJobId: (jobId) => set({ activeJobId: jobId }),

	setDriverTransitStatus: (status) =>
		set({
			driverTransitStatus: status,
			isDriverArrived:
				status === "ON_SITE" || status === "WORKING" || status === "COMPLETED",
		}),

	setHelperTransitStatus: (status) =>
		set({
			helperTransitStatus: status,
			isHelperArrived:
				status === "ON_SITE" || status === "WORKING" || status === "COMPLETED",
		}),

	confirmDriverArrival: () =>
		set({
			driverTransitStatus: "ON_SITE",
			isDriverArrived: true,
		}),

	confirmHelperArrival: () =>
		set({
			helperTransitStatus: "ON_SITE",
			isHelperArrived: true,
		}),

	setNetworkStatus: (status) => set({ networkStatus: status }),

	setLocationPermission: (permission) =>
		set({ locationPermission: permission }),

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
			networkStatus: "CONNECTED",
			locationPermission: "ALWAYS_ALLOW",
			originatingScreen: "/(app)/active-job",
			isCallModalOpen: false,
			isLocationModalOpen: false,
		}),
}));
