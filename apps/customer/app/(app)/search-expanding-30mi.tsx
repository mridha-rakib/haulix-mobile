/**
 * HAULIX Customer Mobile App — Phase 03.47
 * Screen: Search Radius Expanding to 30 Miles (S30)
 *
 * Authoritative Master Reference:
 * - Node 844:4769 (EN) / Node 844:6919 (ES)
 * - Upstream: S20 (/search-expanded-20mi)
 * - Next: S40 (/search-expanded-40mi)
 *
 * UNRESTRICTED FRONTEND ROUTING:
 * - Direct deep-link accessible without auth or prerequisite guards.
 */

import { W05SearchStageScreen } from "../../src/components/dispatch/W05SearchStageScreen";

export default function SearchExpanding30MiScreen() {
  return (
    <W05SearchStageScreen
      stage="s30"
      backRoute="/search-expanded-20mi"
      nextRoute="/search-expanded-40mi"
      previewMatchRoute="/driver-matched"
      cancelRoute="/cancellation-windows"
      testIDPrefix="w05-s30"
    />
  );
}
