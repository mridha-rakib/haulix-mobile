/**
 * HAULIX Customer Mobile App — Phase 03.61
 * Shared Components for W08 Delivery Completion & Wrap-Up Workflow
 *
 * Provides shared UI components matching authoritative Figma frames:
 * - W08Header: Circular Back button, HAUL IX wordmark, more menu
 * - W08StatusBadge: Briefcase icon + uppercase status badge (e.g. PROOF · DEMO)
 * - W08BookingCard: Verified HX-AZ-DEMO-0042 card with sofa thumbnail and calendar schedule
 * - W08DecisionCard: 3-step customer review and decision breakdown (Evidence, Customer, Stripe)
 * - W08PrototypeDisclaimer: Bottom disclaimer
 */

import { colors, fontFamily } from "@haulix/design-tokens";
import { useTranslation } from "@haulix/i18n";
import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { C32BriefcaseIcon, C32CalendarIcon } from "../dispatch/C32Icons";

interface W08HeaderProps {
	onBack: () => void;
	backA11y?: string;
	testID?: string;
}

export function W08Header({
	onBack,
	backA11y = "Back",
	testID = "w08-header",
}: W08HeaderProps) {
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

export function W08StatusBadge({
	label,
	testID = "w08-status-badge",
}: W08StatusBadgeProps) {
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
	bookingRef: string;
	serviceCategory: string;
	itemSummary: string;
	serviceSchedule: string;
	testID?: string;
}

export function W08BookingCard({
	bookingRef,
	serviceCategory,
	itemSummary,
	serviceSchedule,
	testID = "w08-booking-card",
}: W08BookingCardProps) {
	const { t } = useTranslation();

	return (
		<View style={styles.bookingCard} testID={testID}>
			<View style={styles.bookingCardInner}>
				<View style={styles.sofaThumbnail}>
					<Text style={styles.sofaThumbnailIcon}>🛋️</Text>
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

interface W08DecisionCardProps {
	heading: string;
	info1Label: string;
	info1Text: string;
	info2Label: string;
	info2Text: string;
	info3Label: string;
	info3Text: string;
	children?: React.ReactNode;
	testID?: string;
}

export function W08DecisionCard({
	heading,
	info1Label,
	info1Text,
	info2Label,
	info2Text,
	info3Label,
	info3Text,
	children,
	testID = "w08-decision-card",
}: W08DecisionCardProps) {
	return (
		<View style={styles.decisionCard} testID={testID}>
			<Text style={styles.decisionHeading}>{heading}</Text>

			<View style={styles.infoBlock}>
				<Text style={styles.infoLabel}>{info1Label}</Text>
				<Text style={styles.infoText}>{info1Text}</Text>
			</View>

			<View style={styles.infoBlock}>
				<Text style={styles.infoLabel}>{info2Label}</Text>
				<Text style={styles.infoText}>{info2Text}</Text>
			</View>

			<View style={styles.infoBlock}>
				<Text style={styles.infoLabel}>{info3Label}</Text>
				<Text style={styles.infoText}>{info3Text}</Text>
			</View>

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
		height: 56,
		justifyContent: "space-between",
		paddingHorizontal: 20,
	},
	backCircle: {
		alignItems: "center",
		backgroundColor: colors.surface,
		borderRadius: 22,
		height: 44,
		justifyContent: "center",
		width: 44,
	},
	backArrowText: {
		color: colors.primaryText,
		fontFamily: fontFamily.bold,
		fontSize: 20,
	},
	wordmarkContainer: {
		flexDirection: "row",
	},
	wordmarkHaul: {
		color: "#f5f9f7",
		fontFamily: fontFamily.bold,
		fontSize: 26,
	},
	wordmarkIx: {
		color: colors.brand,
		fontFamily: fontFamily.bold,
		fontSize: 26,
	},
	moreButton: {
		alignItems: "center",
		height: 44,
		justifyContent: "center",
		width: 44,
	},
	moreText: {
		color: colors.secondaryText,
		fontFamily: fontFamily.bold,
		fontSize: 20,
	},
	badgeBanner: {
		alignItems: "center",
		backgroundColor: colors.surface,
		borderRadius: 12,
		flexDirection: "row",
		gap: 10,
		paddingHorizontal: 12,
		paddingVertical: 10,
	},
	badgeIconWrapper: {
		alignItems: "center",
		height: 18,
		justifyContent: "center",
		width: 18,
	},
	badgeText: {
		color: colors.brand,
		fontFamily: fontFamily.semiBold,
		fontSize: 12,
		letterSpacing: 0.5,
	},
	bookingCard: {
		backgroundColor: colors.surface,
		borderColor: colors.elevated,
		borderRadius: 16,
		borderWidth: 1,
		gap: 12,
		padding: 14,
	},
	bookingCardInner: {
		alignItems: "center",
		flexDirection: "row",
		gap: 12,
	},
	sofaThumbnail: {
		alignItems: "center",
		backgroundColor: "#1c2420",
		borderRadius: 10,
		height: 72,
		justifyContent: "center",
		width: 88,
	},
	sofaThumbnailIcon: {
		fontSize: 32,
	},
	bookingMeta: {
		flex: 1,
		gap: 3,
	},
	bookingRefText: {
		color: colors.primaryText,
		fontFamily: fontFamily.semiBold,
		fontSize: 12,
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
	disclaimerText: {
		color: colors.secondaryText,
		fontFamily: fontFamily.regular,
		fontSize: 10,
		paddingVertical: 8,
		textAlign: "center",
	},
});
