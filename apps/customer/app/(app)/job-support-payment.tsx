/**
 * HAULIX Customer Mobile App — Phase 03.60
 * Screen: Customer Support - Payment Issue (W07 Canonical State: SUPPORT_PAYMENT)
 *
 * Authoritative Figma Reference:
 * - Frame ID: 897:6953 (EN: "W07-EN / SUPPORT_PAYMENT · Payment issue")
 * - Frame ID: 897:7427 (ES: "W07-ES / SUPPORT_PAYMENT · Problema de pago")
 * - Parent Section: 891:5859 (EN) / 891:5860 (ES)
 * - File Key: meiXxwUNJaDo0a3mhcHBXv (Student Team)
 *
 * CRITICAL ARCHITECTURAL CONSTRAINTS:
 * - Dedicated W07 booking-management support flow distinct from W05, W06, and W07 Refund.
 * - Payment issue topic initially active with category-specific hero and badge.
 * - Symmetrical bilingual support; zero route guards.
 */

import { W07SupportLayout } from "../../src/components/support/W07SupportLayout";

export default function JobSupportPaymentScreen() {
  return (
    <W07SupportLayout
      defaultTopic="payment"
      namespace="w07SupportPayment"
      screenTestId="w07-support-payment"
      variant="payment"
    />
  );
}
