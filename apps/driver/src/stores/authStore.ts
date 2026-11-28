import { create } from "zustand";

export type DriverRole = "PRIMARY_DRIVER" | "HELPER";

export interface DriverUser {
	id: string;
	fullName: string;
	name?: string;
	email: string;
	phone: string;
	role: DriverRole;
	isVerified: boolean;
	activeStatus: "ONLINE" | "OFFLINE" | "IN_SERVICE";
}

export interface OnboardingDraft {
	role: DriverRole;
	fullName: string;
	email: string;
	phone: string;
	password?: string;
	termsAccepted?: boolean;
	vehicleType?: "TRUCK" | "VAN" | "TRAILER" | "CAR";
	heavyLiftingConfirmed?: boolean;
}

interface DriverAuthState {
	isAuthenticated: boolean;
	user: DriverUser | null;
	currentUser: DriverUser | null;
	role: DriverRole;
	draft: OnboardingDraft;
	onboardingDraft: OnboardingDraft;
	pendingPhone: string;
	otpCountdown: number;
	lastResetEmail: string;
	isCleanMode: boolean;

	// Actions
	setCleanMode: (clean: boolean) => void;
	setRole: (role: DriverRole) => void;
	updateDraft: (partial: Partial<OnboardingDraft>) => void;
	setPendingPhone: (phone: string) => void;
	setLastResetEmail: (email: string) => void;
	decrementCountdown: () => void;
	resetCountdown: () => void;
	resetOtpCountdown: () => void;
	loginMock: (
		identifierOrRole?: string | DriverRole,
		optionalRole?: DriverRole,
	) => void;
	logout: () => void;
	verifyMockOtp: (code: string) => boolean;
}

const DEFAULT_DRAFT: OnboardingDraft = {
	role: "PRIMARY_DRIVER",
	fullName: "",
	email: "",
	phone: "",
	password: "",
	termsAccepted: false,
	vehicleType: "TRUCK",
	heavyLiftingConfirmed: false,
};

const DEMO_DRIVER: DriverUser = {
	id: "drv_demo_01",
	fullName: "Marcus Vance",
	name: "Marcus Vance",
	email: "m.vance@example.com",
	phone: "+1 (602) 555-0142",
	role: "PRIMARY_DRIVER",
	isVerified: true,
	activeStatus: "ONLINE",
};

const DEMO_HELPER: DriverUser = {
	id: "hlp_demo_02",
	fullName: "Elena Torres",
	name: "Elena Torres",
	email: "e.torres@example.com",
	phone: "+1 (602) 555-0199",
	role: "HELPER",
	isVerified: true,
	activeStatus: "ONLINE",
};

export const useDriverAuthStore = create<DriverAuthState>((set, get) => ({
	isAuthenticated: false,
	user: null,
	currentUser: null,
	role: "PRIMARY_DRIVER",
	draft: DEFAULT_DRAFT,
	onboardingDraft: DEFAULT_DRAFT,
	pendingPhone: "+1 (602) 555-0142",
	otpCountdown: 30,
	lastResetEmail: "name@example.com",
	isCleanMode: false,

	setCleanMode: (clean) => set({ isCleanMode: clean }),

	setRole: (role) =>
		set((state) => ({
			role,
			draft: { ...state.draft, role },
			onboardingDraft: { ...state.onboardingDraft, role },
		})),

	updateDraft: (partial) =>
		set((state) => {
			const nextDraft = { ...state.draft, ...partial };
			return {
				draft: nextDraft,
				onboardingDraft: nextDraft,
				role: partial.role ?? state.role,
			};
		}),

	setPendingPhone: (phone) => set({ pendingPhone: phone }),

	setLastResetEmail: (email) => set({ lastResetEmail: email }),

	decrementCountdown: () =>
		set((state) => ({
			otpCountdown: Math.max(0, state.otpCountdown - 1),
		})),

	resetCountdown: () => set({ otpCountdown: 30 }),
	resetOtpCountdown: () => set({ otpCountdown: 30 }),

	loginMock: (identifierOrRole, optionalRole) => {
		let targetRole: DriverRole = get().role;
		let email = "driver@haulix.com";

		if (
			identifierOrRole === "PRIMARY_DRIVER" ||
			identifierOrRole === "HELPER"
		) {
			targetRole = identifierOrRole;
		} else if (
			typeof identifierOrRole === "string" &&
			identifierOrRole.includes("@")
		) {
			email = identifierOrRole;
			if (optionalRole) targetRole = optionalRole;
		} else if (optionalRole) {
			targetRole = optionalRole;
		}

		const baseUser =
			targetRole === "PRIMARY_DRIVER" ? DEMO_DRIVER : DEMO_HELPER;
		const user: DriverUser = { ...baseUser, email };

		set({
			isAuthenticated: true,
			user,
			currentUser: user,
			role: targetRole,
		});
	},

	logout: () =>
		set({
			isAuthenticated: false,
			user: null,
			currentUser: null,
			draft: DEFAULT_DRAFT,
			onboardingDraft: DEFAULT_DRAFT,
		}),

	verifyMockOtp: (code: string) => {
		if (code === "000000") return false;
		if (code.length === 6) return true;
		return false;
	},
}));
