/**
 * HAULIX Customer Mobile App — Phase 03.47
 * Screen: Search Expanded to 20 Miles (S20)
 *
 * Authoritative Master Reference:
 * - Node 844:4670 (EN) / Node 844:6820 (ES)
 * - Upstream: S10 (/searching-for-driver)
 * - Next: S30 (/search-expanding-30mi)
 *
 * UNRESTRICTED FRONTEND ROUTING:
 * - Direct deep-link accessible without auth or prerequisite guards.
 */

import { W05SearchStageScreen } from "../../src/components/dispatch/W05SearchStageScreen";

export default function SearchExpanded20MiScreen() {
  return (
    <W05SearchStageScreen
      stage="s20"
      backRoute="/searching-for-driver"
      nextRoute="/search-expanding-30mi"
      previewMatchRoute="/driver-matched"
      cancelRoute="/cancellation-windows"
      testIDPrefix="w05-s20"
    />
  );
}
