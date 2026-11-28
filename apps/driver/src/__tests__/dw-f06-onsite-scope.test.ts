import { DRIVER_DEMO_SCREENS } from "../components/demo/driverDemoScreens";
import { driverEn } from "../i18n/driverEn";
import { driverEs } from "../i18n/driverEs";
import { useActiveJobStore } from "../stores/activeJobStore";
import { useJobMessagesStore } from "../stores/jobMessagesStore";
import { useServiceProgressStore } from "../stores/serviceProgressStore";

describe("DW-F06 On-Site Service & Scope Revisions Tests", () => {
  beforeEach(() => {
    useServiceProgressStore.getState().resetServiceProgress();
    useActiveJobStore.getState().resetActiveJob();
    useJobMessagesStore.getState().resetMessages();
  });

  describe("Service Progress & Milestone Management", () => {
    it("initializes with deterministic active job and initial milestones", () => {
      const store = useServiceProgressStore.getState();
      expect(store.activeJobId).toBe("HX-AZ-DEMO-0042");

      const progress = store.getServiceProgress();
      expect(progress.jobId).toBe("HX-AZ-DEMO-0042");
      expect(progress.driverPickupArrived).toBe(true);
      expect(progress.driverWorkStarted).toBe(false);
      expect(progress.driverServiceInProgress).toBe(false);
      expect(progress.driverReadyForCompletion).toBe(false);

      expect(progress.helperOnSite).toBe(true);
      expect(progress.helperTasksAssigned).toBe(true);
      expect(progress.helperSafetyConfirmed).toBe(true);
      expect(progress.helperWorkEvidenceCaptured).toBe(false);

      expect(progress.originalScope).toBe("Furniture removal · 1 sofa + 2 chairs");
      expect(progress.currentScope).toBe("Furniture removal · 1 sofa + 2 chairs");
    });

    it("updates driver milestones independently", () => {
      const store = useServiceProgressStore.getState();
      const jobId = "HX-AZ-DEMO-0042";

      store.setDriverMilestone(jobId, "driverWorkStarted", true);
      expect(store.getServiceProgress().driverWorkStarted).toBe(true);
      expect(store.getServiceProgress().driverServiceInProgress).toBe(false);

      store.setDriverMilestone(jobId, "driverServiceInProgress", true);
      expect(store.getServiceProgress().driverServiceInProgress).toBe(true);

      store.setDriverMilestone(jobId, "driverReadyForCompletion", true);
      expect(store.getServiceProgress().driverReadyForCompletion).toBe(true);
    });

    it("updates helper milestones independently without affecting driver milestones", () => {
      const store = useServiceProgressStore.getState();
      const jobId = "HX-AZ-DEMO-0042";

      store.setHelperMilestone(jobId, "helperWorkEvidenceCaptured", true);
      expect(store.getServiceProgress().helperWorkEvidenceCaptured).toBe(true);
      expect(store.getServiceProgress().driverReadyForCompletion).toBe(false);
    });

    it("maintains job-scoped progress isolation across multiple jobs", () => {
      const store = useServiceProgressStore.getState();
      const jobA = "HX-AZ-DEMO-0042";
      const jobB = "HX-AZ-DEMO-0099";

      store.setDriverMilestone(jobA, "driverWorkStarted", true);
      store.setDriverMilestone(jobB, "driverWorkStarted", false);

      expect(store.getServiceProgress(jobA).driverWorkStarted).toBe(true);
      expect(store.getServiceProgress(jobB).driverWorkStarted).toBe(false);
    });
  });

  describe("Two-Party Scope Revision Approval Policy", () => {
    it("creates a new additional work request with PENDING status", () => {
      const store = useServiceProgressStore.getState();
      const req = store.createAdditionalWorkRequest({
        jobId: "HX-AZ-DEMO-0042",
        requestedBy: "PRIMARY_DRIVER",
        requestedScope: "Disassemble extra bunk bed",
        requestedScopeEs: "Desarmar litera adicional",
        proposedPrice: 50.0,
      });

      expect(req.status).toBe("PENDING");
      expect(req.adminDecision).toBe("PENDING");
      expect(req.customerDecision).toBe("PENDING");
      expect(req.isApplied).toBe(false);
      expect(req.requestedScope).toBe("Disassemble extra bunk bed");
    });

    it("remains PENDING if only Admin approves", () => {
      const store = useServiceProgressStore.getState();
      const req = store.getActiveRequest();
      expect(req).not.toBeNull();

      if (req) {
        store.setAdminDecision(req.id, "APPROVED");
        const updated = store.getActiveRequest();
        expect(updated?.adminDecision).toBe("APPROVED");
        expect(updated?.customerDecision).toBe("PENDING");
        expect(updated?.status).toBe("PENDING");
      }
    });

    it("remains PENDING if only Customer accepts", () => {
      const store = useServiceProgressStore.getState();
      const req = store.getActiveRequest();
      expect(req).not.toBeNull();

      if (req) {
        store.setCustomerDecision(req.id, "APPROVED");
        const updated = store.getActiveRequest();
        expect(updated?.adminDecision).toBe("PENDING");
        expect(updated?.customerDecision).toBe("APPROVED");
        expect(updated?.status).toBe("PENDING");
      }
    });

    it("becomes APPROVED only when both Admin AND Customer approve", () => {
      const store = useServiceProgressStore.getState();
      const req = store.getActiveRequest();
      expect(req).not.toBeNull();

      if (req) {
        store.setAdminDecision(req.id, "APPROVED");
        store.setCustomerDecision(req.id, "APPROVED");
        const updated = store.getActiveRequest();
        expect(updated?.status).toBe("APPROVED");
      }
    });

    it("becomes DECLINED if either Admin or Customer declines", () => {
      const store = useServiceProgressStore.getState();
      const req = store.getActiveRequest();
      expect(req).not.toBeNull();

      if (req) {
        store.setAdminDecision(req.id, "APPROVED");
        store.setCustomerDecision(req.id, "DECLINED");
        const updated = store.getActiveRequest();
        expect(updated?.status).toBe("DECLINED");
      }
    });

    it("applies approved scope idempotently exactly once", () => {
      const store = useServiceProgressStore.getState();
      const req = store.getActiveRequest();
      expect(req).not.toBeNull();

      if (req) {
        store.setBothApprovals(req.id, true);
        expect(store.getActiveRequest()?.status).toBe("APPROVED");

        // First application succeeds
        const appliedFirst = store.applyApprovedScope(req.id);
        expect(appliedFirst).toBe(true);

        const progress = store.getServiceProgress();
        expect(progress.currentScope).toContain("Example additional chair");
        expect(store.getActiveRequest()?.isApplied).toBe(true);

        // Second application is idempotent
        const appliedSecond = store.applyApprovedScope(req.id);
        expect(appliedSecond).toBe(false);
      }
    });

    it("does not alter original scope if extra work is declined", () => {
      const store = useServiceProgressStore.getState();
      const req = store.getActiveRequest();
      expect(req).not.toBeNull();

      if (req) {
        store.setCustomerDecision(req.id, "DECLINED");
        const applied = store.applyApprovedScope(req.id);
        expect(applied).toBe(false);

        const progress = store.getServiceProgress();
        expect(progress.currentScope).toBe("Furniture removal · 1 sofa + 2 chairs");
        expect(progress.originalScope).toBe("Furniture removal · 1 sofa + 2 chairs");
      }
    });
  });

  describe("DW-F05 Residual Fixes Verification", () => {
    it("maintains multi-job isolation in activeJobStore progress", () => {
      const store = useActiveJobStore.getState();
      store.setDriverTransitStatus("ON_SITE", "JOB-1");
      store.setDriverTransitStatus("EN_ROUTE", "JOB-2");

      expect(store.getJobProgress("JOB-1").driverTransitStatus).toBe("ON_SITE");
      expect(store.getJobProgress("JOB-2").driverTransitStatus).toBe("EN_ROUTE");
    });

    it("maintains conversation message and attachment filtering by jobId", () => {
      const msgStore = useJobMessagesStore.getState();
      msgStore.sendMessage("Hello Job A", "PRIMARY_DRIVER", "Alex", "JOB-A");
      msgStore.sendMessage("Hello Job B", "PRIMARY_DRIVER", "Alex", "JOB-B");

      const messagesA = msgStore.getJobMessages("JOB-A");
      const messagesB = msgStore.getJobMessages("JOB-B");

      expect(messagesA.length).toBeGreaterThan(0);
      expect(messagesB.length).toBeGreaterThan(0);
      expect(messagesA.some((m) => m.content === "Hello Job A")).toBe(true);
      expect(messagesA.some((m) => m.content === "Hello Job B")).toBe(false);
      expect(messagesB.some((m) => m.content === "Hello Job B")).toBe(true);
    });
  });

  describe("Bilingual Localization Completeness (EN & ES)", () => {
    const requiredSections = [
      "onSiteProgress",
      "additionalWorkApproval",
      "extraWorkPending",
      "extraWorkApproved",
      "extraWorkDeclined",
      "helperOnSiteProgress",
    ] as const;

    it("verifies all required DW-F06 localization dictionaries exist in English", () => {
      for (const section of requiredSections) {
        expect(driverEn.driver[section]).toBeDefined();
        expect(typeof driverEn.driver[section].title).toBe("string");
        expect(driverEn.driver[section].title.length).toBeGreaterThan(0);
      }
    });

    it("verifies all required DW-F06 localization dictionaries exist in Spanish", () => {
      for (const section of requiredSections) {
        expect(driverEs.driver[section]).toBeDefined();
        expect(typeof driverEs.driver[section].title).toBe("string");
        expect(driverEs.driver[section].title.length).toBeGreaterThan(0);
      }
    });

    it("verifies Spanish strings are genuine translations, not untranslated English fallbacks", () => {
      expect(driverEs.driver.onSiteProgress.title).not.toBe(driverEn.driver.onSiteProgress.title);
      expect(driverEs.driver.additionalWorkApproval.title).not.toBe(
        driverEn.driver.additionalWorkApproval.title
      );
      expect(driverEs.driver.extraWorkPending.title).not.toBe(
        driverEn.driver.extraWorkPending.title
      );
      expect(driverEs.driver.extraWorkApproved.title).not.toBe(
        driverEn.driver.extraWorkApproved.title
      );
      expect(driverEs.driver.extraWorkDeclined.title).not.toBe(
        driverEn.driver.extraWorkDeclined.title
      );
      expect(driverEs.driver.helperOnSiteProgress.title).not.toBe(
        driverEn.driver.helperOnSiteProgress.title
      );
    });
  });

  describe("QA Navigator Registration", () => {
    it("registers all 6 canonical screens in both EN and ES (12 entries total)", () => {
      const expectedIds = [
        "DW19-EN",
        "DW19-ES",
        "DW20-EN",
        "DW20-ES",
        "DW51-EN",
        "DW51-ES",
        "DW52-EN",
        "DW52-ES",
        "DW53-EN",
        "DW53-ES",
        "DW63-EN",
        "DW63-ES",
      ];

      for (const id of expectedIds) {
        const found = DRIVER_DEMO_SCREENS.find((s) => s.id === id);
        expect(found).toBeDefined();
        expect(found?.route).toBeTruthy();
        expect(found?.name).toBeTruthy();
      }
    });
  });
});
