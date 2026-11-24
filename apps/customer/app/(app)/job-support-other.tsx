/**
 * HAULIX Customer Mobile App — Phase 03.60
 * Screen: Customer Support - Other Issue (W07 Canonical State: SUPPORT_OTHER)
 *
 * Authoritative Figma Reference:
 * - Frame ID: 897:7049 (EN: "W07-EN / SUPPORT_OTHER · Other support issue")
 * - Frame ID: 897:7523 (ES: "W07-ES / SUPPORT_OTHER · Otra incidencia")
 * - Parent Section: 891:5859 (EN) / 891:5860 (ES)
 * - File Key: meiXxwUNJaDo0a3mhcHBXv (Student Team)
 *
 * CRITICAL ARCHITECTURAL CONSTRAINTS:
 * - Dedicated W07 booking-management support flow distinct from W05 and W06.
 * - Other issue topic initially active with category-specific hero and badge.
 * - Symmetrical bilingual support; zero route guards.
 */

import { W07SupportLayout } from "../../src/components/support/W07SupportLayout";

export default function JobSupportOtherScreen() {
  return (
    <W07SupportLayout
      defaultTopic="other"
      namespace="w07SupportOther"
      screenTestId="w07-support-other"
      variant="other"
    />
  );
}
