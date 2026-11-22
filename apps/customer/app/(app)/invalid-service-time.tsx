/**
 * HAULIX Customer Mobile App — Phase 03.37
 * Screen C27-V: Invalid Same-Day Service Time
 *
 * Authoritative Figma References:
 * - English: Node 763:202 (430 × 1044 px) — W04-EN / C27-V · Invalid same-day time
 * - Spanish: Node 766:588 (430 × 1044 px) — W04-ES / C27-V · La hora elegida es muy próxima
 *
 * CRITICAL ARCHITECTURAL CONSTRAINTS:
 * - Pure frontend prototype demonstration.
 * - Customer confirmed quantities and active draft preserved.
 * - Replaces temporary notice with authentic recovery flow.
 * - Zero fabricated backend bookings, no real driver assignment, no live Stripe transactions.
 */

import { colors, fontFamily } from "@haulix/design-tokens";
import { changeLocale, useTranslation } from "@haulix/i18n";
import { HaulixSafeArea } from "@haulix/ui";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useCallback, useEffect, useState } from "react";
import {
	BackHandler,
	Pressable,
	ScrollView,
	StyleSheet,
	Text,
	View,
} from "react-native";
import Svg, { Circle, Path, Rect } from "react-native-svg";
import { FlowHeaderBack } from "../../src/components/navigation/FlowHeaderBack";
import {
	getEffectiveServiceType,
	getW04Draft,
	subscribeToW04Draft,
	updateW04Draft,
} from "../../src/fixtures/c36Scheduling";

function CalendarIcon() {
	return (
		<Svg width={18} height={18} viewBox="0 0 24 24" fill="none">
			<Rect
				x={3}
				y={4}
				width={18}
				height={18}
				rx={2}
				stroke={colors.brand}
				strokeWidth={2}
			/>
			<Path
				d="M16 2V6M8 2V6M3 10H21"
				stroke={colors.brand}
				strokeWidth={2}
				strokeLinecap="round"
			/>
		</Svg>
	);
}

function AlertTriangleIcon() {
	return (
		<Svg width={18} height={18} viewBox="0 0 24 24" fill="none">
			<Path
				d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z"
				stroke="#F2C94C"
				strokeWidth={2}
				strokeLinecap="round"
				strokeLinejoin="round"
			/>
			<Path
				d="M12 9v4M12 17h.01"
				stroke="#F2C94C"
				strokeWidth={2}
				strokeLinecap="round"
			/>
		</Svg>
	);
}

function LocationPinIcon() {
	return (
		<Svg width={14} height={14} viewBox="0 0 24 24" fill="none">
			<Path
				d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"
				stroke={colors.brand}
				strokeWidth={2}
				strokeLinecap="round"
				strokeLinejoin="round"
			/>
			<Circle cx={12} cy={10} r={3} stroke={colors.brand} strokeWidth={2} />
		</Svg>
	);
}

export default function InvalidServiceTimeScreen() {
	const { t, i18n } = useTranslation();
	const router = useRouter();
	const params = useLocalSearchParams<{ previewLocale?: string }>();
	const [draft, setDraft] = useState(getW04Draft);

	useEffect(() => {
		return subscribeToW04Draft((nextDraft) => {
			setDraft(nextDraft);
		});
	}, []);

	const currentLocale =
		params.previewLocale === "es" ? "es" : i18n.language === "es" ? "es" : "en";

	useEffect(() => {
		if (params.previewLocale && params.previewLocale !== i18n.language) {
			changeLocale(params.previewLocale as "en" | "es");
		}
	}, [params.previewLocale, i18n.language]);

	const handleBack = useCallback(() => {
		if (router.canGoBack()) {
			router.back();
		} else {
			router.push({
				pathname: "/select-available-window",
				params: params.previewLocale
					? { previewLocale: params.previewLocale }
					: {},
			});
		}
	}, [router, params.previewLocale]);

	useEffect(() => {
		const sub = BackHandler.addEventListener("hardwareBackPress", () => {
			handleBack();
			return true;
		});
		return () => sub.remove();
	}, [handleBack]);

	const handleSelectAnotherTime = useCallback(() => {
		updateW04Draft({ recoveryState: "scheduled_window_demo" });
		router.push({
			pathname: "/select-available-window",
			params: params.previewLocale
				? { previewLocale: params.previewLocale }
				: {},
		});
	}, [router, params.previewLocale]);

	const handleBackToTiming = useCallback(() => {
		router.push({
			pathname: "/choose-service-time",
			params: params.previewLocale
				? { previewLocale: params.previewLocale }
				: {},
		});
	}, [router, params.previewLocale]);

	return (
		<HaulixSafeArea>
			<View style={styles.container}>
				<FlowHeaderBack
					onBack={handleBack}
					backA11y={t("c27vInvalidServiceTime.backA11y")}
					testID="c27v-header-back"
				/>

				<ScrollView
					contentContainerStyle={styles.scrollContent}
					showsVerticalScrollIndicator={false}
					testID="c27v-scroll-view"
				>
					{/* Brand Header */}
					<View style={styles.brandRow}>
						<Text style={styles.brandHaul}>
							HAUL<Text style={styles.brandIx}>IX</Text>
						</Text>
						<Text style={styles.tagline}>
							{currentLocale === "es"
								? "LO RECOGEMOS TODO."
								: "WE HAUL IT ALL."}
						</Text>
					</View>

					{/* 4-Step Progress Indicator */}
					<View style={styles.progressContainer}>
						<Text style={styles.progressLabel} testID="c27v-progress-label">
							{t("c27vInvalidServiceTime.progressLabel")}
						</Text>
						<View style={styles.progressBarRow}>
							<View
								style={[styles.progressSegment, styles.progressSegmentActive]}
							/>
							<View style={styles.progressSegment} />
							<View style={styles.progressSegment} />
							<View style={styles.progressSegment} />
						</View>
					</View>

					{/* Screen Title & Subtitle */}
					<View style={styles.titleContainer}>
						<Text style={styles.screenTitle} testID="c27v-screen-title">
							{t("c27vInvalidServiceTime.screenTitle")}
						</Text>
						<Text style={styles.screenSubtitle}>
							{t("c27vInvalidServiceTime.screenSubtitle")}
						</Text>
					</View>

					{/* Location Badge */}
					<View style={styles.locationChip}>
						<LocationPinIcon />
						<Text style={styles.locationChipText}>
							{t("c27vInvalidServiceTime.serviceArea")}
						</Text>
					</View>

					{/* Main Card Container */}
					<View style={styles.mainCard} testID="c27v-main-card">
						<View style={styles.sectionHeadingRow}>
							<CalendarIcon />
							<Text style={styles.sectionHeading}>
								{t("c27vInvalidServiceTime.sectionHeading")}
							</Text>
						</View>

						<Text style={styles.serviceTitle} testID="c27v-service-title">
							{getEffectiveServiceType(draft, currentLocale)}
						</Text>
						<Text style={styles.serviceNote}>
							{t("c27vInvalidServiceTime.serviceNote")}
						</Text>

						{/* Blocked Slot Example Capsule */}
						<View
							style={styles.blockedSlotContainer}
							testID="c27v-blocked-slot"
						>
							<View style={styles.badgeRow}>
								<View style={styles.unavailableBadge}>
									<Text style={styles.unavailableBadgeText}>
										{t("c27vInvalidServiceTime.statusBadge")}
									</Text>
								</View>
							</View>
							<Text style={styles.slotTitle}>
								{t("c27vInvalidServiceTime.exampleSlotTitle")}
							</Text>
							<Text style={styles.slotSubtitle}>
								{t("c27vInvalidServiceTime.exampleSlotSubtitle")}
							</Text>
						</View>

						{/* Availability Check Warning Panel */}
						<View style={styles.warningPanel} testID="c27v-warning-panel">
							<View style={styles.warningHeadingRow}>
								<AlertTriangleIcon />
								<Text style={styles.warningHeading}>
									{t("c27vInvalidServiceTime.noticeHeading")}
								</Text>
							</View>
							<Text style={styles.warningBody}>
								{t("c27vInvalidServiceTime.noticeBody")}
							</Text>
						</View>
					</View>

					{/* Actions / CTAs */}
					<View style={styles.actionsContainer}>
						{/* Primary CTA: Select another time */}
						<Pressable
							style={styles.primaryButton}
							onPress={handleSelectAnotherTime}
							testID="c27v-primary-cta"
							accessibilityRole="button"
							accessibilityLabel={t("c27vInvalidServiceTime.primaryCta")}
						>
							<Text style={styles.primaryButtonText}>
								{t("c27vInvalidServiceTime.primaryCta")}
							</Text>
						</Pressable>

						{/* Secondary CTA: Back to timing */}
						<Pressable
							style={styles.secondaryButton}
							onPress={handleBackToTiming}
							testID="c27v-secondary-cta"
							accessibilityRole="button"
							accessibilityLabel={t("c27vInvalidServiceTime.secondaryCta")}
						>
							<Text style={styles.secondaryButtonText}>
								{t("c27vInvalidServiceTime.secondaryCta")}
							</Text>
						</Pressable>
					</View>

					{/* Prototype Footer Note */}
					<Text style={styles.prototypeFooterNote}>
						{t("c27vInvalidServiceTime.uiNote")}
					</Text>
				</ScrollView>
			</View>
		</HaulixSafeArea>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: colors.background,
	},
	scrollContent: {
		paddingHorizontal: 20,
		paddingTop: 12,
		paddingBottom: 40,
	},
	brandRow: {
		flexDirection: "row",
		alignItems: "baseline",
		gap: 8,
		marginBottom: 16,
	},
	brandHaul: {
		fontFamily: fontFamily.bold,
		fontSize: 22,
		color: colors.primaryText,
		letterSpacing: -0.5,
	},
	brandIx: {
		color: colors.brand,
	},
	tagline: {
		fontFamily: fontFamily.semiBold,
		fontSize: 10,
		letterSpacing: 1.5,
		color: colors.secondaryText,
	},
	progressContainer: {
		marginBottom: 20,
	},
	progressLabel: {
		fontFamily: fontFamily.semiBold,
		fontSize: 11,
		letterSpacing: 1.5,
		color: colors.brand,
		textTransform: "uppercase",
		marginBottom: 8,
	},
	progressBarRow: {
		flexDirection: "row",
		gap: 6,
	},
	progressSegment: {
		flex: 1,
		height: 4,
		borderRadius: 2,
		backgroundColor: colors.elevated,
	},
	progressSegmentActive: {
		backgroundColor: colors.brand,
	},
	titleContainer: {
		marginBottom: 14,
	},
	screenTitle: {
		fontFamily: fontFamily.bold,
		fontSize: 26,
		lineHeight: 32,
		color: colors.primaryText,
		marginBottom: 6,
	},
	screenSubtitle: {
		fontFamily: fontFamily.regular,
		fontSize: 14,
		lineHeight: 20,
		color: colors.secondaryText,
	},
	locationChip: {
		flexDirection: "row",
		alignItems: "center",
		alignSelf: "flex-start",
		gap: 6,
		paddingHorizontal: 10,
		paddingVertical: 5,
		borderRadius: 16,
		backgroundColor: colors.elevated,
		borderWidth: 1,
		borderColor: colors.elevated,
		marginBottom: 20,
	},
	locationChipText: {
		fontFamily: fontFamily.semiBold,
		fontSize: 11,
		letterSpacing: 0.8,
		color: colors.primaryText,
	},
	mainCard: {
		backgroundColor: colors.surface,
		borderRadius: 16,
		borderWidth: 1,
		borderColor: colors.elevated,
		padding: 16,
		marginBottom: 24,
	},
	sectionHeadingRow: {
		flexDirection: "row",
		alignItems: "center",
		gap: 8,
		marginBottom: 6,
	},
	sectionHeading: {
		fontFamily: fontFamily.semiBold,
		fontSize: 12,
		letterSpacing: 1.2,
		color: colors.brand,
		textTransform: "uppercase",
	},
	serviceTitle: {
		fontFamily: fontFamily.bold,
		fontSize: 16,
		color: colors.primaryText,
		marginBottom: 4,
	},
	serviceNote: {
		fontFamily: fontFamily.regular,
		fontSize: 12,
		color: colors.secondaryText,
		marginBottom: 16,
	},
	blockedSlotContainer: {
		backgroundColor: colors.elevated,
		borderRadius: 12,
		padding: 16,
		marginBottom: 16,
		borderWidth: 1,
		borderColor: "rgba(242, 201, 76, 0.3)",
	},
	badgeRow: {
		flexDirection: "row",
		marginBottom: 8,
	},
	unavailableBadge: {
		backgroundColor: "rgba(242, 201, 76, 0.15)",
		borderWidth: 1,
		borderColor: "#F2C94C",
		borderRadius: 6,
		paddingHorizontal: 8,
		paddingVertical: 3,
	},
	unavailableBadgeText: {
		fontFamily: fontFamily.semiBold,
		fontSize: 10,
		letterSpacing: 1,
		color: "#F2C94C",
		textTransform: "uppercase",
	},
	slotTitle: {
		fontFamily: fontFamily.bold,
		fontSize: 15,
		color: colors.primaryText,
		marginBottom: 4,
	},
	slotSubtitle: {
		fontFamily: fontFamily.regular,
		fontSize: 13,
		color: colors.secondaryText,
	},
	warningPanel: {
		backgroundColor: "#1C170E",
		borderRadius: 12,
		borderWidth: 1,
		borderColor: "rgba(242, 201, 76, 0.4)",
		padding: 14,
	},
	warningHeadingRow: {
		flexDirection: "row",
		alignItems: "center",
		gap: 8,
		marginBottom: 6,
	},
	warningHeading: {
		fontFamily: fontFamily.semiBold,
		fontSize: 12,
		letterSpacing: 1,
		color: "#F2C94C",
		textTransform: "uppercase",
	},
	warningBody: {
		fontFamily: fontFamily.regular,
		fontSize: 13,
		lineHeight: 18,
		color: colors.secondaryText,
	},
	actionsContainer: {
		gap: 12,
		marginBottom: 20,
	},
	primaryButton: {
		height: 52,
		borderRadius: 12,
		backgroundColor: colors.brand,
		alignItems: "center",
		justifyContent: "center",
	},
	primaryButtonText: {
		fontFamily: fontFamily.bold,
		fontSize: 15,
		color: "#080B0B",
	},
	secondaryButton: {
		height: 52,
		borderRadius: 12,
		backgroundColor: colors.elevated,
		borderWidth: 1,
		borderColor: colors.elevated,
		alignItems: "center",
		justifyContent: "center",
	},
	secondaryButtonText: {
		fontFamily: fontFamily.semiBold,
		fontSize: 15,
		color: colors.primaryText,
	},
	prototypeFooterNote: {
		fontFamily: fontFamily.regular,
		fontSize: 11,
		color: colors.secondaryText,
		textAlign: "center",
		lineHeight: 16,
	},
});
