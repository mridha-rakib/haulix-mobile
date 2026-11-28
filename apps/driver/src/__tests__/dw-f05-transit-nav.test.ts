import { DRIVER_DEMO_SCREENS } from "../components/demo/driverDemoScreens";
import { driverEn } from "../i18n/driverEn";
import { driverEs } from "../i18n/driverEs";
import { useActiveJobStore } from "../stores/activeJobStore";
import { useDispatchCrewStore } from "../stores/dispatchCrewStore";
import { useJobMessagesStore } from "../stores/jobMessagesStore";

describe("DW-F05 Active Transit, GPS Navigation & Chat Tests", () => {
  beforeEach(() => {
    useActiveJobStore.getState().resetActiveJob();
    useJobMessagesStore.getState().resetMessages();
    useDispatchCrewStore.getState().resetDispatchCrew();
  });

  describe("Active Transit & Independent Arrival State Machine", () => {
    it("initializes with deterministic active job and en-route state", () => {
      const state = useActiveJobStore.getState();
      expect(state.activeJobId).toBe("HX-AZ-DEMO-0042");
      expect(state.driverTransitStatus).toBe("EN_ROUTE");
      expect(state.helperTransitStatus).toBe("EN_ROUTE");
      expect(state.isDriverArrived).toBe(false);
      expect(state.isHelperArrived).toBe(false);
      expect(state.networkStatus).toBe("CONNECTED");
      expect(state.locationPermission).toBe("ALWAYS_ALLOW");
      expect(state.isCallModalOpen).toBe(false);
      expect(state.isLocationModalOpen).toBe(false);
    });

    it("confirms driver arrival independently without altering helper arrival", () => {
      const store = useActiveJobStore.getState();
      store.confirmDriverArrival();

      const state = useActiveJobStore.getState();
      expect(state.driverTransitStatus).toBe("ON_SITE");
      expect(state.isDriverArrived).toBe(true);
      expect(state.helperTransitStatus).toBe("EN_ROUTE");
      expect(state.isHelperArrived).toBe(false);
    });

    it("confirms helper arrival independently without altering driver arrival", () => {
      const store = useActiveJobStore.getState();
      store.confirmHelperArrival();

      const state = useActiveJobStore.getState();
      expect(state.helperTransitStatus).toBe("ON_SITE");
      expect(state.isHelperArrived).toBe(true);
      expect(state.driverTransitStatus).toBe("EN_ROUTE");
      expect(state.isDriverArrived).toBe(false);
    });

    it("allows both driver and helper to be on site simultaneously", () => {
      const store = useActiveJobStore.getState();
      store.confirmDriverArrival();
      store.confirmHelperArrival();

      const state = useActiveJobStore.getState();
      expect(state.isDriverArrived).toBe(true);
      expect(state.isHelperArrived).toBe(true);
      expect(state.driverTransitStatus).toBe("ON_SITE");
      expect(state.helperTransitStatus).toBe("ON_SITE");
    });

    it("manages network and location permission diagnostic states", () => {
      const store = useActiveJobStore.getState();
      store.setNetworkStatus("INTERRUPTED");
      store.setLocationPermission("DENIED");

      let state = useActiveJobStore.getState();
      expect(state.networkStatus).toBe("INTERRUPTED");
      expect(state.locationPermission).toBe("DENIED");

      store.setNetworkStatus("CONNECTED");
      store.setLocationPermission("ALWAYS_ALLOW");

      state = useActiveJobStore.getState();
      expect(state.networkStatus).toBe("CONNECTED");
      expect(state.locationPermission).toBe("ALWAYS_ALLOW");
    });

    it("toggles call preview (OV-06) and location permission (OV-07) modals", () => {
      const store = useActiveJobStore.getState();
      store.setCallModalOpen(true);
      expect(useActiveJobStore.getState().isCallModalOpen).toBe(true);

      store.setCallModalOpen(false);
      expect(useActiveJobStore.getState().isCallModalOpen).toBe(false);

      store.setLocationModalOpen(true);
      expect(useActiveJobStore.getState().isLocationModalOpen).toBe(true);

      store.setLocationModalOpen(false);
      expect(useActiveJobStore.getState().isLocationModalOpen).toBe(false);
    });

    it("resets active job state completely on resetActiveJob()", () => {
      const store = useActiveJobStore.getState();
      store.confirmDriverArrival();
      store.confirmHelperArrival();
      store.setNetworkStatus("INTERRUPTED");
      store.setCallModalOpen(true);

      store.resetActiveJob();

      const state = useActiveJobStore.getState();
      expect(state.isDriverArrived).toBe(false);
      expect(state.isHelperArrived).toBe(false);
      expect(state.driverTransitStatus).toBe("EN_ROUTE");
      expect(state.helperTransitStatus).toBe("EN_ROUTE");
      expect(state.networkStatus).toBe("CONNECTED");
      expect(state.isCallModalOpen).toBe(false);
    });
  });

  describe("Job Messages Store & Queue Lifecycle", () => {
    it("initializes with authoritative seed conversation and attachments", () => {
      const state = useJobMessagesStore.getState();
      expect(state.messages.length).toBeGreaterThanOrEqual(2);
      expect(state.currentJobId).toBe("HX-AZ-DEMO-0042");

      const customerMsg = state.messages.find((m) => m.senderRole === "CUSTOMER");
      const driverMsg = state.messages.find((m) => m.senderRole === "PRIMARY_DRIVER");

      expect(customerMsg).toBeDefined();
      expect(driverMsg).toBeDefined();
      expect(state.attachments.length).toBeGreaterThanOrEqual(2);
    });

    it("sends a new outgoing message and appends to the conversation", () => {
      const store = useJobMessagesStore.getState();
      const initialCount = store.messages.length;

      store.sendMessage("I am approaching the gate now", "PRIMARY_DRIVER", "You");

      const state = useJobMessagesStore.getState();
      expect(state.messages.length).toBe(initialCount + 1);

      const lastMsg = state.messages[state.messages.length - 1];
      expect(lastMsg.content).toBe("I am approaching the gate now");
      expect(lastMsg.senderRole).toBe("PRIMARY_DRIVER");
      expect(lastMsg.status).toBe("SUBMITTED");
    });

    it("handles message failure and subsequent retry", () => {
      const store = useJobMessagesStore.getState();
      store.sendMessage("Test message for failure", "PRIMARY_DRIVER", "You");

      let state = useJobMessagesStore.getState();
      const newMsg = state.messages[state.messages.length - 1];

      store.failMessage(newMsg.id);
      state = useJobMessagesStore.getState();
      const failedMsg = state.messages.find((m) => m.id === newMsg.id);
      expect(failedMsg?.status).toBe("FAILED");

      store.retryMessage(newMsg.id);
      state = useJobMessagesStore.getState();
      const retriedMsg = state.messages.find((m) => m.id === newMsg.id);
      expect(retriedMsg?.status).toBe("SUBMITTED");
    });
  });

  describe("DW-F04 Residual State Management Corrections", () => {
    it("acceptJobOffer accepts only AVAILABLE offers and rejects invalid states", () => {
      const store = useDispatchCrewStore.getState();

      // Successful acceptance of AVAILABLE offer
      const success = store.acceptJobOffer("HX-AZ-DEMO-0042");
      expect(success).toBe(true);

      // Attempting to re-accept an already ACCEPTED offer must fail
      const duplicate = store.acceptJobOffer("HX-AZ-DEMO-0042");
      expect(duplicate).toBe(false);

      // Attempting to accept a non-existent or expired offer must fail
      const invalid = store.acceptJobOffer("NON_EXISTENT_ID");
      expect(invalid).toBe(false);
    });

    it("declineJobOffer and expireJobOffer do not overwrite ACCEPTED offers", () => {
      const store = useDispatchCrewStore.getState();
      store.acceptJobOffer("HX-AZ-DEMO-0042");

      // Attempt to decline already accepted offer
      store.declineJobOffer("HX-AZ-DEMO-0042");
      let state = useDispatchCrewStore.getState();
      let job = state.offers.find((o) => o.id === "HX-AZ-DEMO-0042");
      expect(job?.status).toBe("ACCEPTED");

      // Attempt to expire already accepted offer
      store.expireJobOffer("HX-AZ-DEMO-0042");
      state = useDispatchCrewStore.getState();
      job = state.offers.find((o) => o.id === "HX-AZ-DEMO-0042");
      expect(job?.status).toBe("ACCEPTED");
    });

    it("isolates crew readiness across distinct job IDs", () => {
      const store = useDispatchCrewStore.getState();

      const r1 = store.getCrewReadiness("HX-AZ-DEMO-0042");
      const r2 = store.getCrewReadiness("OFFER-DEMO-02");

      expect(r1.jobId).toBe("HX-AZ-DEMO-0042");
      expect(r2.jobId).toBe("OFFER-DEMO-02");
    });

    it("derives helper invitation payout from job.helperPayout dynamically", () => {
      const store = useDispatchCrewStore.getState();
      const invite = store.sendHelperInvitation("HX-AZ-DEMO-0042", "helper-a");

      expect(invite).toBeDefined();
      expect(invite?.estimatedEarnings).toBe(70.0);
    });
  });

  describe("Bilingual Translation Symmetry", () => {
    const modules = [
      "activeJob",
      "jobMessages",
      "connectionInterrupted",
      "messageStatus",
      "locationConnection",
      "helperActiveJob",
      "callOverlay",
      "locationOverlay",
    ] as const;

    modules.forEach((mod) => {
      it(`verifies symmetric keys for module: ${mod}`, () => {
        const enObj = (driverEn.driver as Record<string, unknown>)[mod] as Record<string, unknown>;
        const esObj = (driverEs.driver as Record<string, unknown>)[mod] as Record<string, unknown>;

        expect(enObj).toBeDefined();
        expect(esObj).toBeDefined();

        const enKeys = Object.keys(enObj);
        const esKeys = Object.keys(esObj);

        expect(enKeys.sort()).toEqual(esKeys.sort());

        enKeys.forEach((key) => {
          expect(enObj[key]).toBeTruthy();
          expect(esObj[key]).toBeTruthy();
        });
      });
    });
  });

  describe("QA Navigator DW-F05 Coverage", () => {
    const expectedDwf05Ids = [
      "DW17-EN",
      "DW17-ES",
      "DW18-EN",
      "DW18-ES",
      "DW34-EN",
      "DW34-ES",
      "DW47-EN",
      "DW47-ES",
      "DW50-EN",
      "DW50-ES",
      "DW62-EN",
      "DW62-ES",
      "OV06-EN",
      "OV06-ES",
      "OV07-EN",
      "OV07-ES",
    ];

    expectedDwf05Ids.forEach((id) => {
      it(`contains registered QA screen: ${id}`, () => {
        const found = DRIVER_DEMO_SCREENS.find((s) => s.id === id);
        expect(found).toBeDefined();
        expect(found?.route).toBeTruthy();
        expect(found?.figmaNode).toBeTruthy();
        expect(found?.name).toBeTruthy();
      });
    });
  });
});
