/**
 * HAULIX Customer Mobile App — Phase 03.37
 * Screen C27-N: No Eligible Driver Found
 *
 * Authoritative Figma References:
 * - English: Node 763:336 (430 × 805 px) — W04-EN / C27-N · No eligible driver found
 * - Spanish: Node 766:722 (430 × 805 px) — W04-ES / C27-N · No hay conductor disponible
 *
 * CRITICAL ARCHITECTURAL CONSTRAINTS:
 * - Pure frontend prototype demonstration.
 * - Customer confirmed quantities and active draft preserved.
 * - Replaces temporary notice with authentic recovery flow.
 * - Zero fabricated backend bookings, no real driver assignment, no live Stripe transactions, no fake cancellations.
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
import Svg, { Circle, Path } from "react-native-svg";
import { FlowHeaderBack } from "../../src/components/navigation/FlowHeaderBack";
import {
	getEffectiveServiceType,
	getW04Draft,
	recordFeeFreeCancellation,
	subscribeToW04Draft,
	updateW04Draft,
} from "../../src/fixtures/c36Scheduling";

function TruckIcon() {
	return (
		<Svg width={18} height={18} viewBox="0 0 24 24" fill="none">
			<Path
				d="M1 3H15V16H1V3Z"
				stroke={colors.brand}
				strokeWidth={2}
				strokeLinecap="round"
				strokeLinejoin="round"
			/>
			<Path
				d="M15 8H19L23 12V16H15V8Z"
				stroke={colors.brand}
				strokeWidth={2}
				strokeLinecap="round"
				strokeLinejoin="round"
			/>
			<Circle
				cx={5.5}
				cy={18.5}
				r={2.5}
				stroke={colors.brand}
				strokeWidth={2}
			/>
			<Circle
				cx={18.5}
				cy={18.5}
				r={2.5}
				stroke={colors.brand}
				strokeWidth={2}
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

export default function NoEligibleDriverScreen() {
	const { t, i18n } = useTranslation();
	const router = useRouter();
	const params = useLocalSearchParams<{ previewLocale?: string }>();
	const [draft, setDraft] = useState(getW04Draft);
	const [noticeMessage, setNoticeMessage] = useState<string | null>(null);

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
				pathname: "/request-service-asap",
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

	const handleScheduleForLater = useCallback(() => {
		updateW04Draft({
			timingMode: "scheduled",
			recoveryState: "scheduled_window_demo",
		});
		router.push({
			pathname: "/select-available-window",
			params: params.previewLocale
				? { previewLocale: params.previewLocale }
				: {},
		});
	}, [router, params.previewLocale]);

	const handleChangeRequest = useCallback(() => {
		router.push({
			pathname: "/choose-service-time",
			params: params.previewLocale
				? { previewLocale: params.previewLocale }
				: {},
		});
	}, [router, params.previewLocale]);

	const handleCancelWithoutFee = useCallback(() => {
		recordFeeFreeCancellation();
		router.push({
			pathname: "/no-driver-fee-free-cancellation",
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
					backA11y={t("c27nNoEligibleDriver.backA11y")}
					testID="c27n-header-back"
				/>

				<ScrollView
					contentContainerStyle={styles.scrollContent}
					showsVerticalScrollIndicator={false}
					testID="c27n-scroll-view"
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
						<Text style={styles.progressLabel} testID="c27n-progress-label">
							{t("c27nNoEligibleDriver.progressLabel")}
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
						<Text style={styles.screenTitle} testID="c27n-screen-title">
							{t("c27nNoEligibleDriver.screenTitle")}
						</Text>
						<Text style={styles.screenSubtitle}>
							{t("c27nNoEligibleDriver.screenSubtitle")}
						</Text>
					</View>

					{/* Location Badge */}
					<View style={styles.locationChip}>
						<LocationPinIcon />
						<Text style={styles.locationChipText}>
							{t("c27nNoEligibleDriver.serviceArea")}
						</Text>
					</View>

					{/* Future Cancellation Notice Banner */}
					{noticeMessage && (
						<View style={styles.noticeBanner} testID="c27n-notice-banner">
							<Text style={styles.noticeBannerText}>{noticeMessage}</Text>
							<Pressable
								onPress={() => setNoticeMessage(null)}
								style={styles.noticeDismiss}
								accessibilityRole="button"
								accessibilityLabel={t("c27nNoEligibleDriver.dismissNotice")}
							>
								<Text style={styles.noticeDismissText}>
									{t("c27nNoEligibleDriver.dismissNotice")}
								</Text>
							</Pressable>
						</View>
					)}

					{/* Main Card Container */}
					<View style={styles.mainCard} testID="c27n-main-card">
						<View style={styles.sectionHeadingRow}>
							<TruckIcon />
							<Text style={styles.sectionHeading}>
								{t("c27nNoEligibleDriver.sectionHeading")}
							</Text>
						</View>

						<Text style={styles.serviceTitle} testID="c27n-service-title">
							{getEffectiveServiceType(draft, currentLocale)}
						</Text>
						<Text style={styles.serviceNote}>
							{t("c27nNoEligibleDriver.serviceNote")}
						</Text>

						{/* Status Capsule */}
						<View style={styles.statusCapsule} testID="c27n-status-capsule">
							<Text style={styles.statusCapsuleText}>
								{t("c27nNoEligibleDriver.statusBadge")}
							</Text>
						</View>

						{/* Availability Check Warning Panel */}
						<View style={styles.warningPanel} testID="c27n-warning-panel">
							<View style={styles.warningHeadingRow}>
								<AlertTriangleIcon />
								<Text style={styles.warningHeading}>
									{t("c27nNoEligibleDriver.noticeHeading")}
								</Text>
							</View>
							<Text style={styles.warningBody}>
								{t("c27nNoEligibleDriver.noticeBody")}
							</Text>
						</View>
					</View>

					{/* Actions / CTAs */}
					<View style={styles.actionsContainer}>
						{/* Primary CTA: Schedule for later */}
						<Pressable
							style={styles.primaryButton}
							onPress={handleScheduleForLater}
							testID="c27n-primary-cta"
							accessibilityRole="button"
							accessibilityLabel={t("c27nNoEligibleDriver.primaryCta")}
						>
							<Text style={styles.primaryButtonText}>
								{t("c27nNoEligibleDriver.primaryCta")}
							</Text>
						</Pressable>

						{/* Secondary CTA: Change request */}
						<Pressable
							style={styles.secondaryButton}
							onPress={handleChangeRequest}
							testID="c27n-secondary-cta"
							accessibilityRole="button"
							accessibilityLabel={t("c27nNoEligibleDriver.secondaryCta")}
						>
							<Text style={styles.secondaryButtonText}>
								{t("c27nNoEligibleDriver.secondaryCta")}
							</Text>
						</Pressable>

						{/* Cancel without fee CTA */}
						<Pressable
							style={styles.cancelButton}
							onPress={handleCancelWithoutFee}
							testID="c27n-cancel-cta"
							accessibilityRole="button"
							accessibilityLabel={t("c27nNoEligibleDriver.cancelCta")}
						>
							<Text style={styles.cancelButtonText}>
								{t("c27nNoEligibleDriver.cancelCta")}
							</Text>
						</Pressable>
					</View>

					{/* Prototype Footer Note */}
					<Text style={styles.prototypeFooterNote}>
						{t("c27nNoEligibleDriver.uiNote")}
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
	noticeBanner: {
		backgroundColor: "rgba(242, 201, 76, 0.15)",
		borderWidth: 1,
		borderColor: "#F2C94C",
		borderRadius: 12,
		padding: 14,
		marginBottom: 20,
	},
	noticeBannerText: {
		fontFamily: fontFamily.regular,
		fontSize: 13,
		lineHeight: 18,
		color: colors.primaryText,
		marginBottom: 8,
	},
	noticeDismiss: {
		alignSelf: "flex-end",
		paddingVertical: 4,
		paddingHorizontal: 8,
	},
	noticeDismissText: {
		fontFamily: fontFamily.semiBold,
		fontSize: 12,
		color: "#F2C94C",
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
	statusCapsule: {
		backgroundColor: colors.elevated,
		borderRadius: 10,
		padding: 12,
		marginBottom: 16,
		borderWidth: 1,
		borderColor: colors.elevated,
	},
	statusCapsuleText: {
		fontFamily: fontFamily.regular,
		fontSize: 12,
		lineHeight: 17,
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
	cancelButton: {
		height: 48,
		alignItems: "center",
		justifyContent: "center",
	},
	cancelButtonText: {
		fontFamily: fontFamily.semiBold,
		fontSize: 14,
		color: "#FF5C5C",
	},
	prototypeFooterNote: {
		fontFamily: fontFamily.regular,
		fontSize: 11,
		color: colors.secondaryText,
		textAlign: "center",
		lineHeight: 16,
	},
});
