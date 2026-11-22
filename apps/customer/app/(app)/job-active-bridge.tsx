/**
 * HAULIX Customer Mobile App — Phase 03.49
 * Screen: Job Active Bridge (W05 Canonical State: W06_BRIDGE)
 *
 * Authoritative Figma Reference:
 * - Frame ID: 844:6537 (EN: "W05-EN / W06_BRIDGE · Next: arrival and service")
 * - Frame ID: 844:8687 (ES: "W05-ES / W06_BRIDGE · Siguiente: llegada y servicio")
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
	Image,
	Pressable,
	ScrollView,
	StyleSheet,
	Text,
	View,
} from "react-native";
import {
	C32BoxIcon,
	C32CalendarIcon,
	C32CheckCircleIcon,
	C32LocationPinIcon,
	C32ShieldCheckIcon,
	C32TruckIcon,
	C32UsersIcon,
} from "../../src/components/dispatch/C32Icons";
import { HaulixDispatchMap } from "../../src/components/map/HaulixDispatchMap";
import { FlowHeaderBack } from "../../src/components/navigation/FlowHeaderBack";
import {
	getW05DispatchState,
	subscribeToW05DispatchState,
} from "../../src/fixtures/c32Dispatch";

export default function JobActiveBridgeScreen() {
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
				pathname: "/crew-tracking",
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

	const handleOpenActiveService = useCallback(() => {
		router.push({
			pathname: "/crew-tracking",
			params: params.previewLocale
				? { previewLocale: params.previewLocale }
				: {},
		});
	}, [router, params.previewLocale]);

	const handleReviewCrewReadiness = useCallback(() => {
		router.push({
			pathname: "/helper-matching",
			params: params.previewLocale
				? { previewLocale: params.previewLocale }
				: {},
		});
	}, [router, params.previewLocale]);

	const handleViewDriverDetails = useCallback(() => {
		router.push({
			pathname: "/driver-profile-details",
			params: params.previewLocale
				? { previewLocale: params.previewLocale }
				: {},
		});
	}, [router, params.previewLocale]);

	return (
		<HaulixSafeArea edges={["top", "bottom"]} style={styles.safeArea}>
			<FlowHeaderBack
				onBack={handleBack}
				backA11y={t("w05W06Bridge.backA11y")}
				testID="w05-bridge-header"
			/>

			<ScrollView
				contentContainerStyle={styles.scrollContent}
				showsVerticalScrollIndicator={false}
				testID="w05-bridge-scroll"
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
											idx <= 3
												? styles.progressDotActive
												: styles.progressDotInactive,
										]}
									/>
									<Text
										style={[
											styles.progressNodeLabel,
											idx <= 3
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
						{t("w05W06Bridge.screenTitle")}
					</Text>
					<Text style={styles.heroSubtitle}>
						{t("w05W06Bridge.screenSubtitle")}
					</Text>
				</View>

				{/* Location Badge */}
				<View style={styles.locationBadge} testID="w05-location-badge">
					<C32LocationPinIcon size={16} color={colors.brand} />
					<Text style={styles.locationText}>
						{t("w05W06Bridge.serviceArea")}
					</Text>
				</View>

				{/* Map Viewport */}
				<View style={styles.mapCardWrap} testID="w05-map-wrap">
					<HaulixDispatchMap
						mode="w06_bridge"
						locale={currentLocale}
						height={235}
						pickupLabel={t("w05W06Bridge.serviceArea")}
						mapBadgeLabel={t("w05W06Bridge.mapLabel")}
						testID="w05-bridge-map"
					/>
				</View>

				{/* Summary Card */}
				<View style={styles.cardContainer} testID="w05-summary-card">
					<View style={styles.cardHeaderRow}>
						<View style={styles.statusPillBrand}>
							<C32CheckCircleIcon size={14} color={colors.brand} />
							<Text style={styles.statusPillTextBrand}>
								{t("w05W06Bridge.statusBadge")}
							</Text>
						</View>
						<View style={styles.bookingRefWrap}>
							<Text style={styles.bookingRefPrefix}>
								{t("w05W06Bridge.bookingRefPrefix")}
							</Text>
							<Text style={styles.bookingRefValue}>
								{t("w05W06Bridge.bookingRefValue")}
							</Text>
						</View>
					</View>

					{/* Driver Profile Row */}
					<View style={styles.driverProfileRow}>
						<View style={styles.avatarWrap}>
							<Image
								source={require("../../assets/images/driver-mike.png")}
								style={styles.avatarImage}
								resizeMode="cover"
							/>
						</View>
						<View style={styles.driverInfoCol}>
							<Text style={styles.driverName}>
								{t("w05W06Bridge.driverName")}
							</Text>
							<Text style={styles.driverVerification}>
								{t("w05W06Bridge.driverVerified")}
							</Text>
						</View>
					</View>

					<View style={styles.cardDivider} />

					{/* Vehicle Details */}
					<View style={styles.detailRow}>
						<C32TruckIcon size={18} color={colors.brand} />
						<View style={styles.detailTextCol}>
							<Text style={styles.detailLabel}>
								{t("w05W06Bridge.vehicleLabel")}
							</Text>
							<Text style={styles.detailValue}>
								{t("w05W06Bridge.vehicleValue")}
							</Text>
						</View>
					</View>

					{/* Crew Details */}
					<View style={styles.detailRow}>
						<C32UsersIcon size={18} color={colors.brand} />
						<View style={styles.detailTextCol}>
							<Text style={styles.detailLabel}>
								{t("w05W06Bridge.crewLabel")}
							</Text>
							<Text style={styles.detailValue}>
								{t("w05W06Bridge.crewValue")}
							</Text>
						</View>
					</View>

					{/* Service Details */}
					<View style={styles.detailRow}>
						<C32BoxIcon size={18} color={colors.brand} />
						<View style={styles.detailTextCol}>
							<Text style={styles.detailLabel}>
								{t("w05W06Bridge.serviceLabel")}
							</Text>
							<Text style={styles.detailValue}>
								{t("w05W06Bridge.serviceValue")}
							</Text>
						</View>
					</View>

					{/* Date Details */}
					<View style={styles.detailRow}>
						<C32CalendarIcon size={18} color={colors.brand} />
						<View style={styles.detailTextCol}>
							<Text style={styles.detailLabel}>
								{t("w05W06Bridge.dateLabel")}
							</Text>
							<Text style={styles.detailValue}>
								{t("w05W06Bridge.dateValue")}
							</Text>
						</View>
					</View>

					{/* Quote Details */}
					<View style={styles.detailRow}>
						<C32ShieldCheckIcon size={18} color={colors.brand} />
						<View style={styles.detailTextCol}>
							<Text style={styles.detailLabel}>
								{t("w05W06Bridge.quoteLabel")}
							</Text>
							<Text style={styles.detailValueQuote}>
								{t("w05W06Bridge.quoteValue")}
							</Text>
						</View>
					</View>
				</View>

				{/* Next Updates Card */}
				<View style={styles.updatesCard} testID="w05-updates-card">
					<Text style={styles.updatesHeading}>
						{t("w05W06Bridge.activityHeader")}
					</Text>

					<View style={styles.updateItem}>
						<View style={styles.updateDot} />
						<View style={styles.updateTextCol}>
							<Text style={styles.updateTitle}>
								{t("w05W06Bridge.activity1Title")}
							</Text>
							<Text style={styles.updateDesc}>
								{t("w05W06Bridge.activity1Desc")}
							</Text>
						</View>
					</View>

					<View style={styles.updateItem}>
						<View style={styles.updateDot} />
						<View style={styles.updateTextCol}>
							<Text style={styles.updateTitle}>
								{t("w05W06Bridge.activity2Title")}
							</Text>
							<Text style={styles.updateDesc}>
								{t("w05W06Bridge.activity2Desc")}
							</Text>
						</View>
					</View>

					<View style={styles.updateItem}>
						<View style={styles.updateDot} />
						<View style={styles.updateTextCol}>
							<Text style={styles.updateTitle}>
								{t("w05W06Bridge.activity3Title")}
							</Text>
							<Text style={styles.updateDesc}>
								{t("w05W06Bridge.activity3Desc")}
							</Text>
						</View>
					</View>
				</View>

				{/* Actions */}
				<View style={styles.actionsContainer}>
					<Pressable
						style={styles.primaryButton}
						onPress={handleOpenActiveService}
						accessibilityRole="button"
						accessibilityLabel={t("w05W06Bridge.primaryCta")}
						testID="w05-bridge-primary-cta"
					>
						<Text style={styles.primaryButtonText}>
							{t("w05W06Bridge.primaryCta")}
						</Text>
					</Pressable>

					<Pressable
						style={styles.secondaryButton}
						onPress={handleReviewCrewReadiness}
						accessibilityRole="button"
						accessibilityLabel={t("w05W06Bridge.secondaryCta")}
						testID="w05-bridge-secondary-cta"
					>
						<Text style={styles.secondaryButtonText}>
							{t("w05W06Bridge.secondaryCta")}
						</Text>
					</Pressable>

					<Pressable
						style={styles.tertiaryLink}
						onPress={handleViewDriverDetails}
						accessibilityRole="button"
						accessibilityLabel={t("w05W06Bridge.alternativeLink")}
						testID="w05-bridge-tertiary-link"
					>
						<Text style={styles.tertiaryLinkText}>
							{t("w05W06Bridge.alternativeLink")}
						</Text>
					</Pressable>
				</View>

				{/* Prototype Disclaimer */}
				<View style={styles.disclaimerContainer}>
					<Text style={styles.disclaimerText}>
						{t("w05W06Bridge.prototypeDisclaimer")}
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
		width: "75%",
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
	driverProfileRow: {
		flexDirection: "row",
		alignItems: "center",
		gap: 12,
		marginBottom: 14,
	},
	avatarWrap: {
		width: 48,
		height: 48,
		borderRadius: 24,
		overflow: "hidden",
		backgroundColor: colors.elevated,
	},
	avatarImage: {
		width: "100%",
		height: "100%",
	},
	driverInfoCol: {
		flex: 1,
	},
	driverName: {
		fontSize: 15,
		fontFamily: fontFamily.bold,
		color: colors.primaryText,
		marginBottom: 2,
	},
	driverVerification: {
		fontSize: 12,
		fontFamily: fontFamily.medium,
		color: colors.brand,
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
	updatesCard: {
		backgroundColor: colors.surface,
		borderRadius: 16,
		borderWidth: 1,
		borderColor: colors.elevated,
		padding: 16,
		marginBottom: 20,
	},
	updatesHeading: {
		fontSize: 13,
		fontFamily: fontFamily.bold,
		color: colors.primaryText,
		letterSpacing: 0.5,
		marginBottom: 12,
	},
	updateItem: {
		flexDirection: "row",
		alignItems: "flex-start",
		gap: 10,
		marginBottom: 12,
	},
	updateDot: {
		width: 6,
		height: 6,
		borderRadius: 3,
		backgroundColor: colors.brand,
		marginTop: 6,
	},
	updateTextCol: {
		flex: 1,
	},
	updateTitle: {
		fontSize: 13,
		fontFamily: fontFamily.semiBold,
		color: colors.primaryText,
		marginBottom: 2,
	},
	updateDesc: {
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
