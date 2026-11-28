import { useActiveJobStore } from "./activeJobStore";
import { useDriverAuthStore } from "./authStore";
import { useAvailabilityStore } from "./availabilityStore";
import { useCompletionEvidenceStore } from "./completionEvidenceStore";
import { useDispatchCrewStore } from "./dispatchCrewStore";
import { useDriverDocumentStore } from "./documentStore";
import { useJobMessagesStore } from "./jobMessagesStore";
import { useNotificationStore } from "./notificationStore";
import { useServiceProgressStore } from "./serviceProgressStore";
import { useSupportStore } from "./supportStore";
import { useWalletStore } from "./walletStore";
import { useWorkerProfileStore } from "./workerProfileStore";

/**
 * Resets all 12 application stores to fresh immutable baseline mock fixtures
 * ensuring complete state isolation and zero cross-workflow data contamination.
 */
export function resetAllStores() {
  useDriverAuthStore.getState().logout();
  useDriverAuthStore.getState().setRole("PRIMARY_DRIVER");
  useDriverAuthStore.getState().setCleanMode(false);
  useDriverDocumentStore.getState().resetDocuments();
  useAvailabilityStore.getState().resetAvailability();
  useDispatchCrewStore.getState().resetDispatchCrew();
  useActiveJobStore.getState().resetActiveJob();
  useServiceProgressStore.getState().resetServiceProgress();
  useCompletionEvidenceStore.getState().resetCompletionStore();
  useJobMessagesStore.getState().resetMessages();
  useWalletStore.getState().resetWalletStore();
  useWorkerProfileStore.getState().resetProfileStore();
  useNotificationStore.getState().resetNotificationStore();
  useSupportStore.getState().resetSupportStore();
}
