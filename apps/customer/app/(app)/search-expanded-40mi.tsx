/**
 * HAULIX Customer Mobile App — Phase 03.47
 * Screen: Search Expanded to 40 Miles (S40)
 *
 * Authoritative Master Reference:
 * - Node 844:4868 (EN) / Node 844:7018 (ES)
 * - Upstream: S30 (/search-expanding-30mi)
 * - Next: S50 (/search-expanded-50mi)
 *
 * UNRESTRICTED FRONTEND ROUTING:
 * - Direct deep-link accessible without auth or prerequisite guards.
 */

import { W05SearchStageScreen } from "../../src/components/dispatch/W05SearchStageScreen";

export default function SearchExpanded40MiScreen() {
  return (
    <W05SearchStageScreen
      stage="s40"
      backRoute="/search-expanding-30mi"
      nextRoute="/search-expanded-50mi"
      previewMatchRoute="/driver-matched"
      cancelRoute="/cancellation-windows"
      testIDPrefix="w05-s40"
    />
  );
}
