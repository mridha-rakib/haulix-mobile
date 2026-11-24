/**
 * HAULIX Customer Mobile App — Phase 03.61 & Phase 03.62
 * Shared Components for W08 Delivery Completion & Wrap-Up Workflow
 *
 * Provides shared UI components matching authoritative Figma frames:
 * - W08Header: Circular Back button, HAUL IX wordmark, more menu
 * - W08StatusBadge: Briefcase icon + uppercase status badge (e.g. PROOF · DEMO)
 * - W08BookingCard: Verified HX-AZ-DEMO-0042 card with sofa thumbnail and calendar schedule
 * - W08DecisionCard: Customer review and decision breakdown (flexible items or 3-step)
 * - W08PaymentCard: Financial breakdown (items list or amount/status/payout/hold)
 * - W08PrototypeDisclaimer: Bottom disclaimer
 */

import { colors, fontFamily } from "@haulix/design-tokens";
import { useTranslation } from "@haulix/i18n";
import type React from "react";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import { C32BriefcaseIcon, C32CalendarIcon } from "../dispatch/C32Icons";

const SOFA_IMAGE = require("../../../assets/images/intake/c18j-sofa.png");

interface W08HeaderProps {
  onBack: () => void;
  backA11y?: string;
  title?: string;
  badgeText?: string;
  badgeVariant?: "warning" | "success" | "danger" | string;
  testID?: string;
}

export function W08Header({ onBack, backA11y = "Back", testID = "w08-header" }: W08HeaderProps) {
  return (
    <View style={styles.headerRow} testID={testID}>
      <Pressable
        accessibilityLabel={backA11y}
        accessibilityRole="button"
        onPress={onBack}
        style={styles.backCircle}
        testID={`${testID}-back-button`}
      >
        <Text style={styles.backArrowText}>←</Text>
      </Pressable>

      <View style={styles.wordmarkContainer}>
        <Text style={styles.wordmarkHaul}>HAUL</Text>
        <Text style={styles.wordmarkIx}>IX</Text>
      </View>

      <View style={styles.moreButton}>
        <Text style={styles.moreText}>•••</Text>
      </View>
    </View>
  );
}

interface W08StatusBadgeProps {
  label: string;
  testID?: string;
}

export function W08StatusBadge({ label, testID = "w08-status-badge" }: W08StatusBadgeProps) {
  return (
    <View style={styles.badgeBanner} testID={testID}>
      <View style={styles.badgeIconWrapper}>
        <C32BriefcaseIcon color={colors.brand} size={18} />
      </View>
      <Text style={styles.badgeText}>{label}</Text>
    </View>
  );
}

interface W08BookingCardProps {
  bookingRef?: string;
  serviceCategory?: string;
  itemSummary?: string;
  serviceSchedule?: string;
  testID?: string;
}

export function W08BookingCard({
  bookingRef = "HX-AZ-DEMO-0042",
  serviceCategory = "Furniture & Boxes",
  itemSummary = "4 items",
  serviceSchedule = "Wed, Oct 24 · 2:00 PM - 4:00 PM",
  testID = "w08-booking-card",
}: W08BookingCardProps) {
  const { t } = useTranslation();

  return (
    <View style={styles.bookingCard} testID={testID}>
      <View style={styles.bookingCardInner}>
        <View style={styles.sofaThumbnail}>
          <Image
            source={SOFA_IMAGE}
            style={styles.sofaThumbnailImage}
            resizeMode="cover"
            accessibilityLabel={itemSummary}
          />
        </View>
        <View style={styles.bookingMeta}>
          <Text style={styles.bookingRefText}>{bookingRef}</Text>
          <Text style={styles.bookingServiceText}>{serviceCategory}</Text>
          <Text style={styles.bookingItemsText}>
            {`${itemSummary} · ${t("common.inventoryScope")}`}
          </Text>
        </View>
      </View>
      <View style={styles.dividerSubtle} />
      <View style={styles.scheduleRow}>
        <C32CalendarIcon color={colors.secondaryText} size={16} />
        <Text style={styles.scheduleText}>{serviceSchedule}</Text>
      </View>
    </View>
  );
}

export interface W08CardItem {
  label: string;
  value: string;
}

function StatusPill({ text, variant }: { text: string; variant?: string }) {
  const pillStyle =
    variant === "danger"
      ? styles.statusPillDanger
      : variant === "success"
        ? styles.statusPillSuccess
        : styles.statusPillWarning;
  const textStyle =
    variant === "danger"
      ? styles.statusPillTextDanger
      : variant === "success"
        ? styles.statusPillTextSuccess
        : styles.statusPillTextWarning;

  return (
    <View style={[styles.statusPill, pillStyle]}>
      <Text style={[styles.statusPillText, textStyle]}>{text}</Text>
    </View>
  );
}

function CardItemsList({ items }: { items: W08CardItem[] }) {
  return (
    <>
      {items.map((item, idx) => (
        <View key={item.label || idx} style={styles.infoBlock}>
          <Text style={styles.infoLabel}>{item.label}</Text>
          <Text style={styles.infoText}>{item.value}</Text>
        </View>
      ))}
    </>
  );
}

interface W08PaymentCardProps {
  heading?: string;
  title?: string;
  statusBadgeText?: string;
  statusBadgeVariant?: "warning" | "success" | "danger" | string;
  amountLabel?: string;
  amountValue?: string;
  statusLabel?: string;
  statusValue?: string;
  payoutLabel?: string;
  payoutValue?: string;
  holdLabel?: string;
  holdValue?: string;
  items?: W08CardItem[];
  helperNotice?: string;
  children?: React.ReactNode;
  testID?: string;
}

export function W08PaymentCard({
  heading,
  title,
  statusBadgeText,
  statusBadgeVariant,
  amountLabel,
  amountValue,
  statusLabel,
  statusValue,
  payoutLabel,
  payoutValue,
  holdLabel,
  holdValue,
  items,
  helperNotice,
  children,
  testID = "w08-payment-card",
}: W08PaymentCardProps) {
  const displayHeading = title || heading;

  const resolvedItems: W08CardItem[] =
    items ||
    (amountLabel && amountValue
      ? [
          { label: amountLabel, value: amountValue },
          { label: statusLabel || "", value: statusValue || "" },
          { label: payoutLabel || "", value: payoutValue || "" },
          { label: holdLabel || "", value: holdValue || "" },
        ]
      : []);

  return (
    <View style={styles.decisionCard} testID={testID}>
      <View style={styles.cardHeaderRow}>
        {displayHeading ? <Text style={styles.decisionHeading}>{displayHeading}</Text> : null}
        {statusBadgeText ? (
          <StatusPill text={statusBadgeText} variant={statusBadgeVariant} />
        ) : null}
      </View>

      <CardItemsList items={resolvedItems} />

      {helperNotice ? (
        <View style={styles.helperBox}>
          <Text style={styles.helperText}>{helperNotice}</Text>
        </View>
      ) : null}

      {children}
    </View>
  );
}

interface W08DecisionCardProps {
  heading?: string;
  title?: string;
  statusBadgeText?: string;
  statusBadgeVariant?: "warning" | "success" | "danger" | string;
  info1Label?: string;
  info1Text?: string;
  info2Label?: string;
  info2Text?: string;
  info3Label?: string;
  info3Text?: string;
  info4Label?: string;
  info4Text?: string;
  items?: W08CardItem[];
  helperNotice?: string;
  children?: React.ReactNode;
  testID?: string;
}

export function W08DecisionCard({
  heading,
  title,
  statusBadgeText,
  statusBadgeVariant,
  info1Label,
  info1Text,
  info2Label,
  info2Text,
  info3Label,
  info3Text,
  info4Label,
  info4Text,
  items,
  helperNotice,
  children,
  testID = "w08-decision-card",
}: W08DecisionCardProps) {
  const displayHeading = title || heading;

  const resolvedItems: W08CardItem[] =
    items ||
    (info1Label && info1Text
      ? [
          { label: info1Label, value: info1Text },
          { label: info2Label || "", value: info2Text || "" },
          { label: info3Label || "", value: info3Text || "" },
          ...(info4Label && info4Text ? [{ label: info4Label, value: info4Text }] : []),
        ]
      : []);

  return (
    <View style={styles.decisionCard} testID={testID}>
      <View style={styles.cardHeaderRow}>
        {displayHeading ? <Text style={styles.decisionHeading}>{displayHeading}</Text> : null}
        {statusBadgeText ? (
          <StatusPill text={statusBadgeText} variant={statusBadgeVariant} />
        ) : null}
      </View>

      <CardItemsList items={resolvedItems} />

      {helperNotice ? (
        <View style={styles.helperBox}>
          <Text style={styles.helperText}>{helperNotice}</Text>
        </View>
      ) : null}

      {children}
    </View>
  );
}

interface W08PrototypeDisclaimerProps {
  text: string;
  testID?: string;
}

export function W08PrototypeDisclaimer({
  text,
  testID = "w08-disclaimer",
}: W08PrototypeDisclaimerProps) {
  return (
    <Text style={styles.disclaimerText} testID={testID}>
      {text}
    </Text>
  );
}

const styles = StyleSheet.create({
  headerRow: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  backCircle: {
    alignItems: "center",
    backgroundColor: colors.surface,
    borderColor: colors.elevated,
    borderRadius: 20,
    borderWidth: 1,
    height: 40,
    justifyContent: "center",
    width: 40,
  },
  backArrowText: {
    color: colors.primaryText,
    fontSize: 18,
  },
  wordmarkContainer: {
    flexDirection: "row",
  },
  wordmarkHaul: {
    color: colors.primaryText,
    fontFamily: fontFamily.bold,
    fontSize: 18,
    letterSpacing: 1,
  },
  wordmarkIx: {
    color: colors.brand,
    fontFamily: fontFamily.bold,
    fontSize: 18,
    letterSpacing: 1,
  },
  moreButton: {
    alignItems: "center",
    height: 40,
    justifyContent: "center",
    width: 40,
  },
  moreText: {
    color: colors.secondaryText,
    fontSize: 16,
    letterSpacing: 2,
  },
  badgeBanner: {
    alignItems: "center",
    backgroundColor: colors.surface,
    borderColor: colors.elevated,
    borderRadius: 12,
    borderWidth: 1,
    flexDirection: "row",
    gap: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  badgeIconWrapper: {
    alignItems: "center",
    justifyContent: "center",
  },
  badgeText: {
    color: colors.brand,
    fontFamily: fontFamily.bold,
    fontSize: 11,
    letterSpacing: 0.5,
  },
  cardHeaderRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  statusPill: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  statusPillWarning: {
    backgroundColor: "rgba(234, 179, 8, 0.15)",
  },
  statusPillSuccess: {
    backgroundColor: "rgba(34, 197, 94, 0.15)",
  },
  statusPillDanger: {
    backgroundColor: "rgba(239, 68, 68, 0.15)",
  },
  statusPillText: {
    fontFamily: fontFamily.bold,
    fontSize: 10,
    letterSpacing: 0.5,
  },
  statusPillTextWarning: {
    color: "#EAB308",
  },
  statusPillTextSuccess: {
    color: "#22C55E",
  },
  statusPillTextDanger: {
    color: "#EF4444",
  },
  bookingCard: {
    backgroundColor: colors.surface,
    borderColor: colors.elevated,
    borderRadius: 16,
    borderWidth: 1,
    gap: 12,
    padding: 16,
  },
  bookingCardInner: {
    flexDirection: "row",
    gap: 12,
  },
  sofaThumbnail: {
    alignItems: "center",
    backgroundColor: colors.background,
    borderRadius: 10,
    height: 56,
    justifyContent: "center",
    overflow: "hidden",
    width: 56,
  },
  sofaThumbnailImage: {
    borderRadius: 8,
    height: "100%",
    width: "100%",
  },
  bookingMeta: {
    flex: 1,
    gap: 2,
    justifyContent: "center",
  },
  bookingRefText: {
    color: colors.secondaryText,
    fontFamily: fontFamily.medium,
    fontSize: 10,
    letterSpacing: 0.5,
  },
  bookingServiceText: {
    color: colors.primaryText,
    fontFamily: fontFamily.bold,
    fontSize: 13,
  },
  bookingItemsText: {
    color: colors.secondaryText,
    fontFamily: fontFamily.regular,
    fontSize: 11,
  },
  dividerSubtle: {
    backgroundColor: colors.elevated,
    height: 1,
  },
  scheduleRow: {
    alignItems: "center",
    flexDirection: "row",
    gap: 8,
  },
  scheduleText: {
    color: colors.primaryText,
    fontFamily: fontFamily.medium,
    fontSize: 11,
  },
  decisionCard: {
    backgroundColor: colors.surface,
    borderColor: colors.elevated,
    borderRadius: 16,
    borderWidth: 1,
    gap: 12,
    padding: 16,
  },
  decisionHeading: {
    color: colors.primaryText,
    fontFamily: fontFamily.bold,
    fontSize: 17,
  },
  infoBlock: {
    gap: 3,
  },
  infoLabel: {
    color: colors.brand,
    fontFamily: fontFamily.semiBold,
    fontSize: 10,
    letterSpacing: 0.5,
  },
  infoText: {
    color: colors.primaryText,
    fontFamily: fontFamily.regular,
    fontSize: 12,
    lineHeight: 16,
  },
  helperBox: {
    backgroundColor: "rgba(255, 255, 255, 0.04)",
    borderColor: colors.elevated,
    borderRadius: 8,
    borderWidth: 1,
    padding: 10,
    marginTop: 4,
  },
  helperText: {
    color: colors.secondaryText,
    fontFamily: fontFamily.regular,
    fontSize: 11,
    lineHeight: 16,
  },
  disclaimerText: {
    color: colors.secondaryText,
    fontFamily: fontFamily.regular,
    fontSize: 10,
    paddingVertical: 8,
    textAlign: "center",
  },
});
