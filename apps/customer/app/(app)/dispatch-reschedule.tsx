/**
 * HAULIX Customer Mobile App — Phase 03.49
 * Screen: Dispatch Reschedule (W05 Canonical State: RESCHEDULE)
 *
 * Authoritative Figma Reference:
 * - Frame ID: 844:6346 (EN: "W05-EN / RESCHEDULE · Choose another service window")
 * - Frame ID: 844:8496 (ES: "W05-ES / RESCHEDULE · Elige otra ventana de servicio")
 * - Parent Section: 836:4571 (EN) / 836:4572 (ES)
 * - File Key: meiXxwUNJaDo0a3mhcHBXv (Student Team)
 *
 * CRITICAL ARCHITECTURAL CONSTRAINTS:
 * - Pure frontend demonstration and deterministic prototype state.
 * - Customer confirmed inventory: 4 pieces across 3 categories strictly preserved.
 * - Symmetrical illustrative quote: $356.00 USD.
 * - Unrestricted frontend navigation; zero route guards.
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
import {
	C32BoxIcon,
	C32CalendarIcon,
	C32ClockAlertIcon,
	C32LocationPinIcon,
	C32RadarIcon,
	C32ShieldCheckIcon,
} from "../../src/components/dispatch/C32Icons";
import { HaulixDispatchMap } from "../../src/components/map/HaulixDispatchMap";
import { FlowHeaderBack } from "../../src/components/navigation/FlowHeaderBack";
import {
	getW05DispatchState,
	subscribeToW05DispatchState,
} from "../../src/fixtures/c32Dispatch";

export default function DispatchRescheduleScreen() {
	const { t, i18n } = useTranslation();
	const router = useRouter();
	const params = useLocalSearchParams<{ previewLocale?: string }>();
	const [_dispatchState, setDispatchState] = useState(getW05DispatchState);

	const currentLocale = (params.previewLocale ??
		(i18n?.language?.startsWith("es") ? "es" : "en")) as "en" | "es";

	useEffect(() => {
		if (params.previewLocale && params.previewLocale !== i18n?.language) {
			changeLocale(params.previewLocale as "en" | "es");
		}
	}, [params.previewLocale, i18n]);

	useEffect(() => {
		return subscribeToW05DispatchState((updated) =>
			setDispatchState({ ...updated }),
		);
	}, []);

	const handleBack = useCallback(() => {
		if (router.canGoBack()) {
			router.back();
		} else {
			router.push({
				pathname: "/no-driver-available",
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

	const handleOpenW04Scheduling = useCallback(() => {
		router.push({
			pathname: "/choose-service-time",
			params: params.previewLocale
				? { previewLocale: params.previewLocale }
				: {},
		});
	}, [router, params.previewLocale]);

	const handleBackToNoDriver = useCallback(() => {
		router.push({
			pathname: "/no-driver-available",
			params: params.previewLocale
				? { previewLocale: params.previewLocale }
				: {},
		});
	}, [router, params.previewLocale]);

	const handleAskForHelp = useCallback(() => {
		router.push({
			pathname: "/dispatch-support",
			params: params.previewLocale
				? { previewLocale: params.previewLocale }
				: {},
		});
	}, [router, params.previewLocale]);

	return (
		<HaulixSafeArea edges={["top", "bottom"]} style={styles.safeArea}>
			<FlowHeaderBack
				onBack={handleBack}
				backA11y={t("w05Reschedule.backA11y")}
				testID="w05-reschedule-header"
			/>

			<ScrollView
				contentContainerStyle={styles.scrollContent}
				showsVerticalScrollIndicator={false}
				testID="w05-reschedule-scroll"
			>
				{/* Progress Track */}
				<View style={styles.progressTrackContainer} testID="w05-progress-track">
					<View style={styles.progressLinkingTrack} />
					<View style={styles.progressCompletedTrack} />
					<View style={styles.progressNodesRow}>
						{["Booked", "Dispatch", "Driver", "Arrival", "Service"].map(
							(stepName, idx) => (
								<View key={stepName} style={styles.progressNodeItem}>
									<View
										style={[
											styles.progressDot,
											idx <= 1
												? styles.progressDotActive
												: styles.progressDotInactive,
										]}
									/>
									<Text
										style={[
											styles.progressNodeLabel,
											idx <= 1
												? styles.progressNodeLabelActive
												: styles.progressNodeLabelInactive,
										]}
									>
										{currentLocale === "es"
											? [
													"Reservado",
													"Despacho",
													"Conductor",
													"Llegada",
													"Servicio",
												][idx]
											: stepName}
									</Text>
								</View>
							),
						)}
					</View>
				</View>

				{/* Hero Section */}
				<View style={styles.heroSection}>
					<Text style={styles.heroHeading} testID="w05-hero-heading">
						{t("w05Reschedule.screenTitle")}
					</Text>
					<Text style={styles.heroSubtitle}>
						{t("w05Reschedule.screenSubtitle")}
					</Text>
				</View>

				{/* Location Badge */}
				<View style={styles.locationBadge} testID="w05-location-badge">
					<C32LocationPinIcon size={16} color={colors.brand} />
					<Text style={styles.locationText}>
						{t("w05Reschedule.serviceArea")}
					</Text>
				</View>

				{/* Map Viewport */}
				<View style={styles.mapCardWrap} testID="w05-map-wrap">
					<HaulixDispatchMap
						mode="reschedule"
						locale={currentLocale}
						height={235}
						pickupLabel={t("w05Reschedule.serviceArea")}
						mapBadgeLabel={t("w05Reschedule.mapLabel")}
						testID="w05-reschedule-map"
					/>
				</View>

				{/* Summary Card */}
				<View style={styles.cardContainer} testID="w05-summary-card">
					<View style={styles.cardHeaderRow}>
						<View style={styles.statusPillBrand}>
							<C32RadarIcon size={14} color={colors.brand} />
							<Text style={styles.statusPillTextBrand}>
								{t("w05Reschedule.statusBadge")}
							</Text>
						</View>
						<View style={styles.bookingRefWrap}>
							<Text style={styles.bookingRefPrefix}>
								{t("w05Reschedule.bookingRefPrefix")}
							</Text>
							<Text style={styles.bookingRefValue}>
								{t("w05Reschedule.bookingRefValue")}
							</Text>
						</View>
					</View>

					{/* Explanation Notice */}
					<View style={styles.noticeBanner}>
						<C32ShieldCheckIcon size={18} color={colors.brand} />
						<Text style={styles.noticeBannerText}>
							{t("w05Reschedule.statusExplanation")}
						</Text>
					</View>

					<View style={styles.cardDivider} />

					{/* Service Details */}
					<View style={styles.detailRow}>
						<C32BoxIcon size={18} color={colors.brand} />
						<View style={styles.detailTextCol}>
							<Text style={styles.detailLabel}>
								{t("w05Reschedule.serviceLabel")}
							</Text>
							<Text style={styles.detailValue}>
								{t("w05Reschedule.serviceValue")}
							</Text>
						</View>
					</View>

					{/* Date Details */}
					<View style={styles.detailRow}>
						<C32CalendarIcon size={18} color={colors.brand} />
						<View style={styles.detailTextCol}>
							<Text style={styles.detailLabel}>
								{t("w05Reschedule.dateLabel")}
							</Text>
							<Text style={styles.detailValue}>
								{t("w05Reschedule.dateValue")}
							</Text>
						</View>
					</View>

					{/* Quote Details */}
					<View style={styles.detailRow}>
						<C32ShieldCheckIcon size={18} color={colors.brand} />
						<View style={styles.detailTextCol}>
							<Text style={styles.detailLabel}>
								{t("w05Reschedule.quoteLabel")}
							</Text>
							<Text style={styles.detailValueQuote}>
								{t("w05Reschedule.quoteValue")}
							</Text>
						</View>
					</View>
				</View>

				{/* Dispatch Activity Card */}
				<View style={styles.activityCard} testID="w05-activity-card">
					<Text style={styles.activityHeading}>
						{t("w05Reschedule.activityHeader")}
					</Text>

					<View style={styles.activityItem}>
						<View style={styles.activityDot} />
						<View style={styles.activityTextCol}>
							<Text style={styles.activityTitle}>
								{t("w05Reschedule.activity1Title")}
							</Text>
							<Text style={styles.activityDesc}>
								{t("w05Reschedule.activity1Desc")}
							</Text>
						</View>
					</View>

					<View style={styles.activityItem}>
						<View style={styles.activityDot} />
						<View style={styles.activityTextCol}>
							<Text style={styles.activityTitle}>
								{t("w05Reschedule.activity2Title")}
							</Text>
							<Text style={styles.activityDesc}>
								{t("w05Reschedule.activity2Desc")}
							</Text>
						</View>
					</View>

					<View style={styles.activityItem}>
						<View style={styles.activityDot} />
						<View style={styles.activityTextCol}>
							<Text style={styles.activityTitle}>
								{t("w05Reschedule.activity3Title")}
							</Text>
							<Text style={styles.activityDesc}>
								{t("w05Reschedule.activity3Desc")}
							</Text>
						</View>
					</View>
				</View>

				{/* Actions */}
				<View style={styles.actionsContainer}>
					<Pressable
						style={styles.primaryButton}
						onPress={handleOpenW04Scheduling}
						accessibilityRole="button"
						accessibilityLabel={t("w05Reschedule.primaryCta")}
						testID="w05-reschedule-primary-cta"
					>
						<Text style={styles.primaryButtonText}>
							{t("w05Reschedule.primaryCta")}
						</Text>
					</Pressable>

					<Pressable
						style={styles.secondaryButton}
						onPress={handleBackToNoDriver}
						accessibilityRole="button"
						accessibilityLabel={t("w05Reschedule.secondaryCta")}
						testID="w05-reschedule-secondary-cta"
					>
						<Text style={styles.secondaryButtonText}>
							{t("w05Reschedule.secondaryCta")}
						</Text>
					</Pressable>

					<Pressable
						style={styles.tertiaryLink}
						onPress={handleAskForHelp}
						accessibilityRole="button"
						accessibilityLabel={t("w05Reschedule.alternativeLink")}
						testID="w05-reschedule-tertiary-link"
					>
						<Text style={styles.tertiaryLinkText}>
							{t("w05Reschedule.alternativeLink")}
						</Text>
					</Pressable>
				</View>

				{/* Prototype Disclaimer */}
				<View style={styles.disclaimerContainer}>
					<Text style={styles.disclaimerText}>
						{t("w05Reschedule.prototypeDisclaimer")}
					</Text>
				</View>
			</ScrollView>
		</HaulixSafeArea>
	);
}

const styles = StyleSheet.create({
	safeArea: {
		flex: 1,
		backgroundColor: colors.background,
	},
	scrollContent: {
		paddingHorizontal: 20,
		paddingBottom: 40,
	},
	progressTrackContainer: {
		marginTop: 8,
		marginBottom: 16,
		position: "relative",
	},
	progressLinkingTrack: {
		position: "absolute",
		top: 5,
		left: 16,
		right: 16,
		height: 2,
		backgroundColor: colors.elevated,
	},
	progressCompletedTrack: {
		position: "absolute",
		top: 5,
		left: 16,
		width: "30%",
		height: 2,
		backgroundColor: colors.brand,
	},
	progressNodesRow: {
		flexDirection: "row",
		justifyContent: "space-between",
	},
	progressNodeItem: {
		alignItems: "center",
		width: 60,
	},
	progressDot: {
		width: 12,
		height: 12,
		borderRadius: 6,
		marginBottom: 4,
	},
	progressDotActive: {
		backgroundColor: colors.brand,
	},
	progressDotInactive: {
		backgroundColor: colors.elevated,
		borderWidth: 1,
		borderColor: colors.elevated,
	},
	progressNodeLabel: {
		fontSize: 10,
		fontFamily: fontFamily.medium,
	},
	progressNodeLabelActive: {
		color: colors.primaryText,
	},
	progressNodeLabelInactive: {
		color: colors.secondaryText,
	},
	heroSection: {
		marginTop: 8,
		marginBottom: 14,
	},
	heroHeading: {
		fontSize: 26,
		fontFamily: fontFamily.bold,
		color: colors.primaryText,
		lineHeight: 32,
		marginBottom: 6,
	},
	heroSubtitle: {
		fontSize: 14,
		fontFamily: fontFamily.regular,
		color: colors.secondaryText,
		lineHeight: 20,
	},
	locationBadge: {
		flexDirection: "row",
		alignItems: "center",
		alignSelf: "flex-start",
		backgroundColor: colors.surface,
		borderWidth: 1,
		borderColor: colors.elevated,
		borderRadius: 20,
		paddingVertical: 6,
		paddingHorizontal: 12,
		gap: 6,
		marginBottom: 16,
	},
	locationText: {
		fontSize: 11,
		fontFamily: fontFamily.medium,
		color: colors.secondaryText,
		letterSpacing: 0.5,
	},
	mapCardWrap: {
		borderRadius: 16,
		overflow: "hidden",
		borderWidth: 1,
		borderColor: colors.elevated,
		marginBottom: 16,
	},
	cardContainer: {
		backgroundColor: colors.surface,
		borderRadius: 16,
		borderWidth: 1,
		borderColor: colors.elevated,
		padding: 16,
		marginBottom: 16,
	},
	cardHeaderRow: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
		marginBottom: 14,
	},
	statusPillBrand: {
		flexDirection: "row",
		alignItems: "center",
		backgroundColor: "rgba(186, 255, 66, 0.12)",
		borderWidth: 1,
		borderColor: "rgba(186, 255, 66, 0.3)",
		paddingVertical: 5,
		paddingHorizontal: 10,
		borderRadius: 12,
		gap: 6,
	},
	statusPillTextBrand: {
		fontSize: 10,
		fontFamily: fontFamily.bold,
		color: colors.brand,
		letterSpacing: 0.8,
	},
	bookingRefWrap: {
		flexDirection: "row",
		alignItems: "center",
		gap: 4,
	},
	bookingRefPrefix: {
		fontSize: 11,
		fontFamily: fontFamily.regular,
		color: colors.secondaryText,
	},
	bookingRefValue: {
		fontSize: 11,
		fontFamily: fontFamily.bold,
		color: colors.primaryText,
	},
	noticeBanner: {
		flexDirection: "row",
		alignItems: "center",
		backgroundColor: "rgba(186, 255, 66, 0.08)",
		borderWidth: 1,
		borderColor: "rgba(186, 255, 66, 0.2)",
		borderRadius: 10,
		padding: 12,
		gap: 10,
		marginBottom: 14,
	},
	noticeBannerText: {
		flex: 1,
		fontSize: 12,
		fontFamily: fontFamily.medium,
		color: colors.brand,
		lineHeight: 16,
	},
	cardDivider: {
		height: 1,
		backgroundColor: colors.elevated,
		marginBottom: 14,
	},
	detailRow: {
		flexDirection: "row",
		alignItems: "center",
		gap: 12,
		marginBottom: 12,
	},
	detailTextCol: {
		flex: 1,
	},
	detailLabel: {
		fontSize: 10,
		fontFamily: fontFamily.bold,
		color: colors.secondaryText,
		letterSpacing: 0.8,
		marginBottom: 2,
	},
	detailValue: {
		fontSize: 13,
		fontFamily: fontFamily.semiBold,
		color: colors.primaryText,
	},
	detailValueQuote: {
		fontSize: 14,
		fontFamily: fontFamily.bold,
		color: colors.brand,
	},
	activityCard: {
		backgroundColor: colors.surface,
		borderRadius: 16,
		borderWidth: 1,
		borderColor: colors.elevated,
		padding: 16,
		marginBottom: 20,
	},
	activityHeading: {
		fontSize: 13,
		fontFamily: fontFamily.bold,
		color: colors.primaryText,
		letterSpacing: 0.5,
		marginBottom: 12,
	},
	activityItem: {
		flexDirection: "row",
		alignItems: "flex-start",
		gap: 10,
		marginBottom: 12,
	},
	activityDot: {
		width: 6,
		height: 6,
		borderRadius: 3,
		backgroundColor: colors.brand,
		marginTop: 6,
	},
	activityTextCol: {
		flex: 1,
	},
	activityTitle: {
		fontSize: 13,
		fontFamily: fontFamily.semiBold,
		color: colors.primaryText,
		marginBottom: 2,
	},
	activityDesc: {
		fontSize: 12,
		fontFamily: fontFamily.regular,
		color: colors.secondaryText,
		lineHeight: 16,
	},
	actionsContainer: {
		gap: 12,
		marginBottom: 20,
	},
	primaryButton: {
		backgroundColor: colors.brand,
		borderRadius: 12,
		paddingVertical: 14,
		alignItems: "center",
		justifyContent: "center",
	},
	primaryButtonText: {
		fontSize: 14,
		fontFamily: fontFamily.bold,
		color: "#080B0B",
		letterSpacing: 0.5,
	},
	secondaryButton: {
		backgroundColor: colors.surface,
		borderRadius: 12,
		borderWidth: 1,
		borderColor: colors.elevated,
		paddingVertical: 14,
		alignItems: "center",
		justifyContent: "center",
	},
	secondaryButtonText: {
		fontSize: 14,
		fontFamily: fontFamily.semiBold,
		color: colors.primaryText,
	},
	tertiaryLink: {
		paddingVertical: 8,
		alignItems: "center",
	},
	tertiaryLinkText: {
		fontSize: 13,
		fontFamily: fontFamily.semiBold,
		color: colors.brand,
		textDecorationLine: "underline",
	},
	disclaimerContainer: {
		alignItems: "center",
		paddingVertical: 8,
	},
	disclaimerText: {
		fontSize: 10,
		fontFamily: fontFamily.regular,
		color: colors.secondaryText,
		textAlign: "center",
		letterSpacing: 0.5,
	},
});
