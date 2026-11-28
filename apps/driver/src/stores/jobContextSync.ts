import { useActiveJobStore } from "./activeJobStore";
import { useCompletionEvidenceStore } from "./completionEvidenceStore";
import { type MockJobOffer, useDispatchCrewStore } from "./dispatchCrewStore";
import { useJobMessagesStore } from "./jobMessagesStore";
import { useServiceProgressStore } from "./serviceProgressStore";

/**
 * Unified Job Context Synchronizer
 *
 * Ensures an accepted or selected job ID follows the user consistently through:
 * Job Details → Crew Readiness → Active Job → On-Site Progress → Completion Evidence → Completion Confirmation.
 *
 * Prevents silent fallback to "HX-AZ-DEMO-0042" when another valid job offer is selected.
 */
export function syncActiveJobContext(jobId: string) {
  if (!jobId) return;

  // Synchronize across all active stores
  useDispatchCrewStore.getState().setSelectedJobId(jobId);
  useActiveJobStore.getState().setActiveJobId(jobId);
  useServiceProgressStore.getState().setActiveJobId(jobId);
  useCompletionEvidenceStore.getState().setActiveJobId(jobId);
  useJobMessagesStore.getState().setCurrentJobId(jobId);
}

/**
 * Helper to get the currently selected job offer from dispatchCrewStore,
 * falling back gracefully if not yet loaded.
 */
export function getActiveJobOffer(jobId?: string): MockJobOffer {
  const dispatchStore = useDispatchCrewStore.getState();
  const targetId = jobId || useActiveJobStore.getState().activeJobId || dispatchStore.selectedJobId;
  const found = dispatchStore.offers.find((o) => o.id === targetId);
  return found || dispatchStore.offers[0];
}
