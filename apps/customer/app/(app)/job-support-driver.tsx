/**
 * HAULIX Customer Mobile App — Phase 03.60
 * Screen: Customer Support - Driver Issue (W07 Canonical State: SUPPORT_DRIVER)
 *
 * Authoritative Figma Reference:
 * - Frame ID: 897:6761 (EN: "W07-EN / SUPPORT_DRIVER · Driver issue")
 * - Frame ID: 897:7235 (ES: "W07-ES / SUPPORT_DRIVER · Problema del conductor")
 * - Parent Section: 891:5859 (EN) / 891:5860 (ES)
 * - File Key: meiXxwUNJaDo0a3mhcHBXv (Student Team)
 *
 * CRITICAL ARCHITECTURAL CONSTRAINTS:
 * - Dedicated W07 booking-management support flow distinct from W05 and W06.
 * - Driver issue topic initially active with category-specific hero and badge.
 * - Symmetrical bilingual support; zero route guards.
 */

import { W07SupportLayout } from "../../src/components/support/W07SupportLayout";

export default function JobSupportDriverScreen() {
	return (
		<W07SupportLayout
			defaultTopic="driver"
			namespace="w07SupportDriver"
			screenTestId="w07-support-driver"
			variant="driver"
		/>
	);
}
