import { driverTranslationsEn } from "../i18n/driverEn";
import { driverTranslationsEs } from "../i18n/driverEs";
import { useCompletionEvidenceStore } from "../stores/completionEvidenceStore";
import { useDispatchCrewStore } from "../stores/dispatchCrewStore";
import { syncActiveJobContext } from "../stores/jobContextSync";
import { useServiceProgressStore } from "../stores/serviceProgressStore";

describe("DW-F07 Completion Evidence, Proof & Review Window", () => {
  beforeEach(() => {
    useCompletionEvidenceStore.getState().resetCompletionStore();
    useServiceProgressStore.getState().resetServiceProgress();
    useDispatchCrewStore.getState().resetDispatchCrew();
  });

  describe("1. DW-F06 Residual Fixes Verification", () => {
    test("1.1 accumulates multiple approved scope revisions without duplication", () => {
      const store = useServiceProgressStore.getState();
      const jobId = "HX-AZ-DEMO-0042";

      // Create Request 1
      const req1 = store.createAdditionalWorkRequest({
        jobId,
        requestedScope: "Heavy dining table disassembly",
        requestedScopeEs: "Desmontaje de mesa de comedor pesada",
        proposedPrice: 40.0,
      });
      expect(req1).not.toBeNull();

      // Admin and customer approve Request 1
      store.setBothApprovals(req1.id, true);
      store.applyApprovedScope(req1.id);

      let progress = store.getServiceProgress(jobId);
      expect(progress.currentScope).toContain("Heavy dining table disassembly");

      // Create Request 2
      const req2 = store.createAdditionalWorkRequest({
        jobId,
        requestedScope: "Basement flight stairs carry",
        requestedScopeEs: "Transporte por escaleras de sótano",
        proposedPrice: 25.0,
      });
      expect(req2).not.toBeNull();

      // Admin and customer approve Request 2
      store.setBothApprovals(req2.id, true);
      store.applyApprovedScope(req2.id);

      progress = store.getServiceProgress(jobId);
      expect(progress.currentScope).toContain("Heavy dining table disassembly");
      expect(progress.currentScope).toContain("Basement flight stairs carry");
      const appliedCount = progress.additionalRequests.filter((r) => r.isApplied).length;
      expect(appliedCount).toBe(2);

      // Re-applying request 1 must be idempotent and not duplicate
      const reapplyResult = store.applyApprovedScope(req1.id);
      expect(reapplyResult).toBe(false);
      progress = store.getServiceProgress(jobId);
      const appliedCountAfter = progress.additionalRequests.filter((r) => r.isApplied).length;
      expect(appliedCountAfter).toBe(2);
    });

    test("1.2 prevents modifying applied or declined requests without QA override", () => {
      const store = useServiceProgressStore.getState();
      const jobId = "HX-AZ-DEMO-0042";

      const req = store.createAdditionalWorkRequest({
        jobId,
        requestedScope: "Extra stairs carry",
        requestedScopeEs: "Escaleras extra",
        proposedPrice: 30.0,
      });
      expect(req).not.toBeNull();

      // Decline customer side
      store.setCustomerDecision(req.id, "DECLINED");
      let currentReq = useServiceProgressStore
        .getState()
        .getServiceProgress(jobId)
        .additionalRequests.find((r) => r.id === req.id);
      expect(currentReq?.status).toBe("DECLINED");

      // Attempting to approve a declined request directly without QA override does not alter state
      store.setAdminDecision(req.id, "APPROVED");
      currentReq = useServiceProgressStore
        .getState()
        .getServiceProgress(jobId)
        .additionalRequests.find((r) => r.id === req.id);
      expect(currentReq?.status).toBe("DECLINED");

      // QA override allows simulation
      store.setAdminDecision(req.id, "APPROVED", true);
      currentReq = useServiceProgressStore
        .getState()
        .getServiceProgress(jobId)
        .additionalRequests.find((r) => r.id === req.id);
      expect(currentReq?.adminDecision).toBe("APPROVED");
    });

    test("1.3 prevents duplicate additional work request submission with identical scope", () => {
      const store = useServiceProgressStore.getState();
      const jobId = "HX-AZ-DEMO-0042";

      const first = store.createAdditionalWorkRequest({
        jobId,
        requestedScope: "Identical extra work description",
        requestedScopeEs: "Descripción idéntica",
        proposedPrice: 50.0,
      });
      expect(first).not.toBeNull();

      // Duplicate attempt should return existing request
      const duplicate = store.createAdditionalWorkRequest({
        jobId,
        requestedScope: "Identical extra work description",
        requestedScopeEs: "Descripción idéntica",
        proposedPrice: 50.0,
      });
      expect(duplicate.id).toBe(first.id);
    });

    test("1.4 maintains unified job context synchronization across stores", () => {
      const targetJobId = "HX-TEST-JOB-9999";

      syncActiveJobContext(targetJobId);

      const progress = useServiceProgressStore.getState().getServiceProgress(targetJobId);
      expect(progress.jobId).toBe(targetJobId);

      const completion = useCompletionEvidenceStore.getState().getCompletionRecord(targetJobId);
      expect(completion.jobId).toBe(targetJobId);
    });
  });

  describe("2. Completion Evidence Store & Workflow Validation", () => {
    test("2.1 Driver evidence capture attaches photos with ISO timestamps", () => {
      const store = useCompletionEvidenceStore.getState();
      const jobId = "HX-AZ-DEMO-0042";

      store.attachDriverEvidence(
        jobId,
        "before",
        "assets/evidence/custom-before.png",
        "Custom Before Label",
        "Etiqueta antes personalizada"
      );

      const record = store.getCompletionRecord(jobId);
      expect(record.driverEvidence.before).not.toBeNull();
      expect(record.driverEvidence.before?.category).toBe("before");
      expect(record.driverEvidence.before?.workerRole).toBe("PRIMARY_DRIVER");
      expect(record.driverEvidence.before?.timestampIso).toBeDefined();
    });

    test("2.2 Driver completion submission enforces required before & after proof", () => {
      const store = useCompletionEvidenceStore.getState();
      const jobId = "HX-AZ-DEMO-0042";

      // Remove before photo
      store.removeDriverEvidence(jobId, "before");

      const result = store.submitDriverCompletion(jobId);
      expect(result.success).toBe(false);
      expect(result.error).toBe("MISSING_REQUIRED_EVIDENCE");

      // Attach before photo
      store.attachDriverEvidence(jobId, "before", "assets/evidence/evidence-sofa-before.png");

      const successResult = store.submitDriverCompletion(jobId);
      expect(successResult.success).toBe(true);

      const updated = store.getCompletionRecord(jobId);
      expect(updated.driverSubmissionStatus).toBe("SUBMITTED");
      expect(updated.reviewStatus).toBe("REVIEW_PENDING");
      expect(updated.submittedAt).toBeDefined();
    });

    test("2.3 Simulated network failure and idempotent retry", () => {
      const store = useCompletionEvidenceStore.getState();
      const jobId = "HX-AZ-DEMO-0042";

      store.setMockFailureScenario(true);

      const failedResult = store.submitDriverCompletion(jobId);
      expect(failedResult.success).toBe(false);
      expect(store.getCompletionRecord(jobId).driverSubmissionStatus).toBe("FAILED");

      // Retry resolves
      store.setMockFailureScenario(false);
      const retryResult = store.retryDriverSubmission(jobId);
      expect(retryResult.success).toBe(true);
      expect(store.getCompletionRecord(jobId).driverSubmissionStatus).toBe("SUBMITTED");
    });

    test("2.4 Helper evidence submission is independent and does not finalize overall job", () => {
      const store = useCompletionEvidenceStore.getState();
      const jobId = "HX-AZ-DEMO-0042";

      // Initially helper submission is DRAFT
      expect(store.getCompletionRecord(jobId).helperSubmissionStatus).toBe("DRAFT");

      const result = store.submitHelperWork(jobId);
      expect(result.success).toBe(true);

      const record = store.getCompletionRecord(jobId);
      expect(record.helperSubmissionStatus).toBe("SUBMITTED");
      // Overall job remains dependent on Driver review window
      expect(record.reviewStatus).not.toBe("PAYMENT_SETTLED");
    });

    test("2.5 Review status transitions adhere to 24-hour review & dispute hold policy", () => {
      const store = useCompletionEvidenceStore.getState();
      const jobId = "HX-AZ-DEMO-0042";

      // Transition to DISPUTE_HOLD
      store.setReviewStatus(jobId, "DISPUTE_HOLD");
      expect(store.getCompletionRecord(jobId).reviewStatus).toBe("DISPUTE_HOLD");

      // Transition to CUSTOMER_CONFIRMED
      store.setReviewStatus(jobId, "CUSTOMER_CONFIRMED");
      expect(store.getCompletionRecord(jobId).reviewStatus).toBe("CUSTOMER_CONFIRMED");

      // Transition to AUTO_CLOSURE_ELIGIBLE
      store.setReviewStatus(jobId, "AUTO_CLOSURE_ELIGIBLE");
      expect(store.getCompletionRecord(jobId).reviewStatus).toBe("AUTO_CLOSURE_ELIGIBLE");
    });
  });

  describe("3. Bilingual Localization Integrity", () => {
    test("3.1 DW21, DW22, DW64, DW65 keys exist in both English and Spanish", () => {
      const en = driverTranslationsEn.driver;
      const es = driverTranslationsEs.driver;

      // DW21 Completion Evidence
      expect(en.completionEvidence.headerLabel).toBe("DELIVERY PROOF");
      expect(es.completionEvidence.headerLabel).toBe("PRUEBA DE ENTREGA");
      expect(en.completionEvidence.submitCta).toBe("Submit and complete");
      expect(es.completionEvidence.submitCta).toBe("Enviar y finalizar");

      // DW22 Job Completed
      expect(en.jobCompleted.badgeEvidenceReceived).toBe("EVIDENCE RECEIVED");
      expect(es.jobCompleted.badgeEvidenceReceived).toBe("EVIDENCIA RECIBIDA");
      expect(en.jobCompleted.payoutPendingNotice).toBe("Evidence received · final payout pending");
      expect(es.jobCompleted.payoutPendingNotice).toBe("Evidencia recibida · pago final pendiente");
      expect(en.jobCompleted.nonPaymentNotice).toBe(
        "This preview does not trigger payment or cash out."
      );
      expect(es.jobCompleted.nonPaymentNotice).toBe(
        "Esta vista no genera pagos ni retiros de fondos."
      );

      // DW64 Helper Work Evidence
      expect(en.helperWorkEvidence.roleBadge).toBe("HELPER ROLE");
      expect(es.helperWorkEvidence.roleBadge).toBe("ROL DE AYUDANTE");
      expect(en.helperWorkEvidence.submitCta).toBe("Submit my work proof");
      expect(es.helperWorkEvidence.submitCta).toBe("Enviar evidencia de mi trabajo");

      // DW65 Helper Work Submitted
      expect(en.helperWorkSubmitted.badgeSubmitted).toBe("WORK SUBMITTED");
      expect(es.helperWorkSubmitted.badgeSubmitted).toBe("TRABAJO ENVIADO");
      expect(en.helperWorkSubmitted.awaitingFinalizationNotice).toBe(
        "Individual proof submitted · overall job completion pending"
      );
      expect(es.helperWorkSubmitted.awaitingFinalizationNotice).toBe(
        "Prueba individual enviada · finalización del trabajo pendiente"
      );
    });
  });
});
