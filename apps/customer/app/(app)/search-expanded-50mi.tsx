/**
 * HAULIX Customer Mobile App — Phase 03.47
 * Screen: Searching Up to 50 Miles (S50 - Maximum Radius)
 *
 * Authoritative Master Reference:
 * - Node 844:4967 (EN) / Node 844:7117 (ES)
 * - Upstream: S40 (/search-expanded-40mi)
 * - Next: No Driver Available (/no-driver-available)
 *
 * UNRESTRICTED FRONTEND ROUTING:
 * - Direct deep-link accessible without auth or prerequisite guards.
 */

import { W05SearchStageScreen } from "../../src/components/dispatch/W05SearchStageScreen";

export default function SearchExpanded50MiScreen() {
  return (
    <W05SearchStageScreen
      stage="s50"
      backRoute="/search-expanded-40mi"
      nextRoute="/no-driver-available"
      previewMatchRoute="/driver-matched"
      cancelRoute="/cancellation-windows"
      testIDPrefix="w05-s50"
    />
  );
}
