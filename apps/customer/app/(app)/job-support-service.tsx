/**
 * HAULIX Customer Mobile App — Phase 03.60
 * Screen: Customer Support - Service Issue (W07 Canonical State: SUPPORT_SERVICE)
 *
 * Authoritative Figma Reference:
 * - Frame ID: 897:6857 (EN: "W07-EN / SUPPORT_SERVICE · Service issue")
 * - Frame ID: 897:7331 (ES: "W07-ES / SUPPORT_SERVICE · Problema del servicio")
 * - Parent Section: 891:5859 (EN) / 891:5860 (ES)
 * - File Key: meiXxwUNJaDo0a3mhcHBXv (Student Team)
 *
 * CRITICAL ARCHITECTURAL CONSTRAINTS:
 * - Dedicated W07 booking-management support flow distinct from W05 and W06.
 * - Service issue topic initially active with category-specific hero and badge.
 * - Symmetrical bilingual support; zero route guards.
 */

import { W07SupportLayout } from "../../src/components/support/W07SupportLayout";

export default function JobSupportServiceScreen() {
	return (
		<W07SupportLayout
			defaultTopic="service"
			namespace="w07SupportService"
			screenTestId="w07-support-service"
			variant="service"
		/>
	);
}
