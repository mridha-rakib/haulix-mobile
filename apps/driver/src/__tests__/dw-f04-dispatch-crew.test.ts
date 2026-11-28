import { driverEn } from "../i18n/driverEn";
import { driverEs } from "../i18n/driverEs";
import { useAvailabilityStore } from "../stores/availabilityStore";
import { useDispatchCrewStore } from "../stores/dispatchCrewStore";

describe("DW-F04 Dispatch, Offers & Crew Management Tests", () => {
	beforeEach(() => {
		useDispatchCrewStore.getState().resetDispatchCrew();
		useAvailabilityStore.getState().resetAvailability();
	});

	describe("Job Offers Lifecycle & Concurrency", () => {
		it("initializes with deterministic approved mock offers", () => {
			const state = useDispatchCrewStore.getState();
			expect(state.offers.length).toBeGreaterThanOrEqual(3);
			expect(state.offers[0].id).toBe("HX-AZ-DEMO-0042");
			expect(state.offers[0].status).toBe("AVAILABLE");
			expect(state.offers[0].cargoSize).toBe("CARGO: MEDIUM");
			expect(state.offers[0].estimatedPayout).toBe(142.5);
		});

		it("accepts a job offer atomically and updates crew assignment context", () => {
			const store = useDispatchCrewStore.getState();
			const success = store.acceptJobOffer("HX-AZ-DEMO-0042");

			expect(success).toBe(true);
			const updated = useDispatchCrewStore.getState();
			const acceptedJob = updated.offers.find(
				(o) => o.id === "HX-AZ-DEMO-0042",
			);
			expect(acceptedJob?.status).toBe("ACCEPTED");
			expect(updated.crewReadiness.driverStatus).toBe("ACCEPTED");
			expect(updated.selectedJobId).toBe("HX-AZ-DEMO-0042");
		});

		it("prevents duplicate job acceptance (atomic concurrency lock)", () => {
			const store = useDispatchCrewStore.getState();
			const first = store.acceptJobOffer("HX-AZ-DEMO-0042");
			expect(first).toBe(true);

			const second = store.acceptJobOffer("HX-AZ-DEMO-0042");
			expect(second).toBe(false);
		});

		it("declines a job offer without affecting other offers", () => {
			const store = useDispatchCrewStore.getState();
			store.declineJobOffer("OFFER-DEMO-02");

			const state = useDispatchCrewStore.getState();
			const declined = state.offers.find((o) => o.id === "OFFER-DEMO-02");
			const untouched = state.offers.find((o) => o.id === "HX-AZ-DEMO-0042");

			expect(declined?.status).toBe("DECLINED");
			expect(untouched?.status).toBe("AVAILABLE");
		});

		it("marks offer expired when timer expires or peer claims it", () => {
			const store = useDispatchCrewStore.getState();
			store.expireJobOffer("HX-AZ-DEMO-0042");

			const state = useDispatchCrewStore.getState();
			const expired = state.offers.find((o) => o.id === "HX-AZ-DEMO-0042");
			expect(expired?.status).toBe("EXPIRED");
		});

		it("maintains selected job context consistently across operations", () => {
			const store = useDispatchCrewStore.getState();
			store.setSelectedJobId("OFFER-DEMO-03");

			const selected = store.getSelectedJob();
			expect(selected.id).toBe("OFFER-DEMO-03");
			expect(selected.titleEn).toBe("Moving Assistance");
		});
	});

	describe("Helper Invitation & Independent Decision Engine", () => {
		it("sends helper invitation with 3-minute countdown and pending status", () => {
			const store = useDispatchCrewStore.getState();
			const inv = store.sendHelperInvitation("HX-AZ-DEMO-0042", "helper-a");

			expect(inv.id).toBeDefined();
			expect(inv.jobId).toBe("HX-AZ-DEMO-0042");
			expect(inv.helperId).toBe("helper-a");
			expect(inv.status).toBe("PENDING");
			expect(inv.countdownSeconds).toBe(180);
			expect(inv.estimatedEarnings).toBe(70.0);

			const state = useDispatchCrewStore.getState();
			expect(state.crewReadiness.helperStatus).toBe("PENDING");
			expect(state.crewReadiness.isCrewReady).toBe(false);
		});

		it("prevents duplicate pending invitations for the same job and helper", () => {
			const store = useDispatchCrewStore.getState();
			const inv1 = store.sendHelperInvitation("HX-AZ-DEMO-0042", "helper-a");
			const inv2 = store.sendHelperInvitation("HX-AZ-DEMO-0042", "helper-a");

			expect(inv1.id).toBe(inv2.id);
			expect(
				useDispatchCrewStore
					.getState()
					.invitations.filter(
						(i) => i.jobId === "HX-AZ-DEMO-0042" && i.status === "PENDING",
					).length,
			).toBe(1);
		});

		it("cancels pending invitation and releases crew reservation lock", () => {
			const store = useDispatchCrewStore.getState();
			const inv = store.sendHelperInvitation("HX-AZ-DEMO-0042", "helper-a");
			store.cancelHelperInvitation(inv.id);

			const state = useDispatchCrewStore.getState();
			const cancelled = state.invitations.find((i) => i.id === inv.id);
			expect(cancelled?.status).toBe("CANCELLED");
			expect(state.crewReadiness.isCrewReady).toBe(false);
		});

		it("handles Helper independent acceptance and confirms crew readiness", () => {
			const store = useDispatchCrewStore.getState();
			const inv = store.sendHelperInvitation("HX-AZ-DEMO-0042", "helper-a");
			store.helperAcceptInvitation(inv.id);

			const state = useDispatchCrewStore.getState();
			const accepted = state.invitations.find((i) => i.id === inv.id);
			expect(accepted?.status).toBe("ACCEPTED");
			expect(state.crewReadiness.helperStatus).toBe("ACCEPTED");
			expect(state.crewReadiness.isCrewReady).toBe(true);
		});

		it("handles Helper independent decline and sets crew readiness incomplete", () => {
			const store = useDispatchCrewStore.getState();
			const inv = store.sendHelperInvitation("HX-AZ-DEMO-0042", "helper-a");
			store.helperDeclineInvitation(inv.id);

			const state = useDispatchCrewStore.getState();
			const declined = state.invitations.find((i) => i.id === inv.id);
			expect(declined?.status).toBe("DECLINED");
			expect(state.crewReadiness.helperStatus).toBe("DECLINED");
			expect(state.crewReadiness.isCrewReady).toBe(false);
		});
	});

	describe("Scenario Engine & Reset Isolation", () => {
		it("switches to EXPIRED scenario properly", () => {
			const store = useDispatchCrewStore.getState();
			store.setScenario("EXPIRED");

			const state = useDispatchCrewStore.getState();
			expect(state.offers[0].status).toBe("EXPIRED");
		});

		it("switches to CREW_READY scenario with both driver & helper accepted", () => {
			const store = useDispatchCrewStore.getState();
			store.setScenario("CREW_READY");

			const state = useDispatchCrewStore.getState();
			expect(state.crewReadiness.driverStatus).toBe("ACCEPTED");
			expect(state.crewReadiness.helperStatus).toBe("ACCEPTED");
			expect(state.crewReadiness.isCrewReady).toBe(true);
		});

		it("resets dispatch and crew store to clean initial state", () => {
			const store = useDispatchCrewStore.getState();
			store.acceptJobOffer("HX-AZ-DEMO-0042");
			store.resetDispatchCrew();

			const state = useDispatchCrewStore.getState();
			expect(state.offers[0].status).toBe("AVAILABLE");
			expect(state.crewReadiness.isCrewReady).toBe(false);
		});
	});

	describe("DW-F03 Residual Corrections: Role-Specific Availability", () => {
		it("isolates Driver preferences from Helper preferences", () => {
			const store = useAvailabilityStore.getState();

			store.saveRolePreferences("PRIMARY_DRIVER", {
				serviceRadiusMiles: 75,
				workingDays: ["Mon", "Wed", "Fri"],
			});

			const driverPrefs = store.getRolePreferences("PRIMARY_DRIVER");
			const helperPrefs = store.getRolePreferences("HELPER");

			expect(driverPrefs.serviceRadiusMiles).toBe(75);
			expect(driverPrefs.workingDays).toEqual(["Mon", "Wed", "Fri"]);

			// Helper preferences must remain unaffected
			expect(helperPrefs.serviceRadiusMiles).toBe(25);
			expect(helperPrefs.workingDays).toContain("Sat");
		});

		it("enforces OFFLINE status when vacation mode is enabled", () => {
			const store = useAvailabilityStore.getState();
			store.setDriverStatus("ONLINE");

			store.saveRolePreferences("PRIMARY_DRIVER", { vacationMode: true });

			const state = useAvailabilityStore.getState();
			expect(state.driverStatus).toBe("OFFLINE");
			expect(state.driverPreferences.vacationMode).toBe(true);
		});

		it("clears vacation mode when user manually goes ONLINE", () => {
			const store = useAvailabilityStore.getState();
			store.saveRolePreferences("PRIMARY_DRIVER", { vacationMode: true });
			expect(useAvailabilityStore.getState().driverStatus).toBe("OFFLINE");

			store.setDriverStatus("ONLINE");
			const state = useAvailabilityStore.getState();
			expect(state.driverStatus).toBe("ONLINE");
			expect(state.driverPreferences.vacationMode).toBe(false);
		});
	});

	describe("Bilingual Localization Parity (EN & ES)", () => {
		it("verifies all DW-F04 translation keys exist in both English and Spanish", () => {
			const en = driverEn.driver;
			const es = driverEs.driver;

			const keys: (keyof typeof en)[] = [
				"jobOffers" as any,
				"jobDetails" as any,
				"offerUnavailable" as any,
				"inviteHelper" as any,
				"chooseHelper" as any,
				"invitationPending" as any,
				"helperInvitations" as any,
				"reviewInvitation" as any,
				"crewReadiness" as any,
			];

			for (const k of keys) {
				expect(en[k]).toBeDefined();
				expect(es[k]).toBeDefined();
				expect(typeof en[k]).toBe("object");
				expect(typeof es[k]).toBe("object");

				// Subkeys parity
				const subKeysEn = Object.keys(en[k] as object);
				const subKeysEs = Object.keys(es[k] as object);
				for (const sub of subKeysEn) {
					expect(subKeysEs).toContain(sub);
				}
			}
		});
	});
});
