/**
 * HAULIX Customer Mobile App — Phase 03.54
 * Screen: Active Service — Completion Bridge (W06 Canonical State: W08_HANDOFF)
 *
 * Authoritative Figma Reference:
 * - Frame ID: 882:7891 (EN: "W06-EN / W08_HANDOFF · Next: proof and completion")
 * - Frame ID: 883:8255 (ES: "W06-ES / W08_HANDOFF · Siguiente: evidencia y finalización")
 * - Parent Section: 881:5131 (EN) / 881:5132 (ES)
 * - File Key: meiXxwUNJaDo0a3mhcHBXv (Student Team)
 *
 * CRITICAL ARCHITECTURAL CONSTRAINTS:
 * - Pure frontend demonstration and deterministic prototype state.
 * - Customer confirmed inventory: 4 pieces across 3 categories strictly preserved.
 * - Symmetrical illustrative quote: $356.00 USD.
 * - Bridges W06 completion toward upcoming W08 proof & review without looping back to W05.
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
	C32CheckCircleIcon,
	C32ClockIcon,
	C32LocationPinIcon,
	C32LockIcon,
	C32ShieldCheckIcon,
	C32TruckIcon,
} from "../../src/components/dispatch/C32Icons";
import { FlowHeaderBack } from "../../src/components/navigation/FlowHeaderBack";

export default function ActiveServiceCompletionBridgeScreen() {
	const { t, i18n } = useTranslation();
	const router = useRouter();
	const params = useLocalSearchParams<{ previewLocale?: string }>();
	const [proofPreviewVisible, setProofPreviewVisible] = useState(false);

	useEffect(() => {
		if (params.previewLocale && params.previewLocale !== i18n?.language) {
			changeLocale(params.previewLocale as "en" | "es");
		}
	}, [params.previewLocale, i18n]);

	const handleBack = useCallback(() => {
		if (router.canGoBack()) {
			router.back();
		} else {
			router.push({
				pathname: "/active-service-working",
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

	const handleReviewCompletionProof = useCallback(() => {
		router.push({
			pathname: "/completion-proof",
			params: params.previewLocale
				? { previewLocale: params.previewLocale }
				: {},
		});
	}, [router, params.previewLocale]);

	const handleReturnToActiveService = useCallback(() => {
		router.push({
			pathname: "/active-service-working",
			params: params.previewLocale
				? { previewLocale: params.previewLocale }
				: {},
		});
	}, [router, params.previewLocale]);

	const handleSupportLink = useCallback(() => {
		router.push({
			pathname: "/active-service-support",
			params: params.previewLocale
				? { previewLocale: params.previewLocale }
				: {},
		});
	}, [router, params.previewLocale]);

	const stages = [
		t("w06W08Handoff.stepAssigned"),
		t("w06W08Handoff.stepEnroute"),
		t("w06W08Handoff.stepArrived"),
		t("w06W08Handoff.stepService"),
		t("w06W08Handoff.stepReview"),
	];

	return (
		<HaulixSafeArea edges={["top", "bottom"]} style={styles.safeArea}>
			<FlowHeaderBack
				onBack={handleBack}
				backA11y={t("w06W08Handoff.backA11y")}
				testID="w06-w08-handoff-header"
			/>

			<ScrollView
				contentContainerStyle={styles.scrollContent}
				showsVerticalScrollIndicator={false}
				testID="w06-w08-handoff-scroll"
			>
				{/* 5-Step Service Stages: All 4 completed, Step 4 (Review) active */}
				<View style={styles.progressTrackContainer} testID="w06-progress-track">
					<View style={styles.progressLinkingTrack} />
					<View style={[styles.progressCompletedTrack, { width: "100%" }]} />
					<View style={styles.progressNodesRow}>
						{stages.map((stepName, idx) => {
							const isCompleted = idx < 4;
							const isActive = idx === 4;
							return (
								<View key={stepName} style={styles.progressNodeItem}>
									<View
										style={[
											styles.progressDot,
											isCompleted && styles.progressDotCompleted,
											isActive && styles.progressDotActive,
										]}
									/>
									<Text
										style={[
											styles.progressNodeLabel,
											isActive && styles.progressNodeLabelActive,
											isCompleted && styles.progressNodeLabelCompleted,
										]}
										numberOfLines={1}
									>
										{stepName}
									</Text>
								</View>
							);
						})}
					</View>
				</View>

				{/* Location Chip */}
				<View
					style={styles.locationChip}
					testID="w06-w08-handoff-location-chip"
				>
					<C32LocationPinIcon size={14} color={colors.brand} />
					<Text style={styles.locationChipText} numberOfLines={1}>
						{t("w06W08Handoff.serviceArea")}
					</Text>
				</View>

				{/* Screen Headline & Subtitle */}
				<View style={styles.headerBlock}>
					<Text style={styles.screenTitle} testID="w06-w08-handoff-title">
						{t("w06W08Handoff.screenTitle")}
					</Text>
					<Text style={styles.screenSubtitle} testID="w06-w08-handoff-subtitle">
						{t("w06W08Handoff.screenSubtitle")}
					</Text>
				</View>

				{/* Job Card with W08 Preview Badge */}
				<View style={styles.jobCard} testID="w06-w08-handoff-job-card">
					<View style={styles.jobCardHeader}>
						<View style={styles.previewBadge}>
							<Text style={styles.previewBadgeText}>
								{t("w06W08Handoff.statusBadge")}
							</Text>
						</View>
						<Text style={styles.bookingRefText}>
							{t("w06W08Handoff.bookingRefPrefix")}{" "}
							{t("w06W08Handoff.bookingRefValue")}
						</Text>
					</View>

					<View style={styles.divider} />

					<View style={styles.infoRow}>
						<View style={styles.iconCol}>
							<C32BoxIcon size={18} color={colors.brand} />
						</View>
						<View style={styles.textCol}>
							<Text style={styles.infoLabel}>
								{t("w06W08Handoff.serviceLabel")}
							</Text>
							<Text style={styles.infoValue}>
								{t("w06W08Handoff.serviceValue")}
							</Text>
						</View>
					</View>

					<View style={styles.infoRow}>
						<View style={styles.iconCol}>
							<C32TruckIcon size={18} color="#38BDF8" />
						</View>
						<View style={styles.textCol}>
							<Text style={styles.infoLabel}>
								{t("w06W08Handoff.driverLabel")}
							</Text>
							<Text style={styles.infoValue}>
								{t("w06W08Handoff.driverValue")}
							</Text>
						</View>
					</View>

					<View style={styles.infoRow}>
						<View style={styles.iconCol}>
							<C32CalendarIcon size={18} color="#F59E0B" />
						</View>
						<View style={styles.textCol}>
							<Text style={styles.infoLabel}>
								{t("w06W08Handoff.windowLabel")}
							</Text>
							<Text style={styles.infoValue}>
								{t("w06W08Handoff.windowValue")}
							</Text>
						</View>
					</View>
				</View>

				{/* Service Status & Next Updates Card */}
				<View style={styles.detailsCard} testID="w06-w08-handoff-details-card">
					<Text style={styles.detailsCategory}>
						{t("w06W08Handoff.cardCategoryLabel")}
					</Text>
					<Text style={styles.detailsHeading}>
						{t("w06W08Handoff.cardHeading")}
					</Text>

					<View style={styles.pointRow}>
						<View style={styles.pointIconWrap}>
							<C32ClockIcon size={18} color={colors.brand} />
						</View>
						<View style={styles.pointTextWrap}>
							<Text style={styles.pointTitle}>
								{t("w06W08Handoff.insight1Title")}
							</Text>
							<Text style={styles.pointDescription}>
								{t("w06W08Handoff.insight1Desc")}
							</Text>
						</View>
					</View>

					<View style={styles.pointRow}>
						<View style={styles.pointIconWrap}>
							<C32ShieldCheckIcon size={18} color={colors.brand} />
						</View>
						<View style={styles.pointTextWrap}>
							<Text style={styles.pointTitle}>
								{t("w06W08Handoff.insight2Title")}
							</Text>
							<Text style={styles.pointDescription}>
								{t("w06W08Handoff.insight2Desc")}
							</Text>
						</View>
					</View>

					<View style={styles.pointRow}>
						<View style={styles.pointIconWrap}>
							<C32LockIcon size={18} color={colors.brand} />
						</View>
						<View style={styles.pointTextWrap}>
							<Text style={styles.pointTitle}>
								{t("w06W08Handoff.insight3Title")}
							</Text>
							<Text style={styles.pointDescription}>
								{t("w06W08Handoff.insight3Desc")}
							</Text>
						</View>
					</View>
				</View>

				{/* Completion Notice Card */}
				<View
					style={styles.completionNoticeCard}
					testID="w06-w08-handoff-notice-card"
				>
					<C32CheckCircleIcon size={20} color={colors.brand} />
					<View style={styles.completionNoticeTextWrap}>
						<Text style={styles.completionNoticeTitle}>
							{t("w06W08Handoff.completionNoticeTitle")}
						</Text>
						<Text style={styles.completionNoticeDesc}>
							{t("w06W08Handoff.completionNoticeDesc")}
						</Text>
					</View>
				</View>

				{/* Optional Proof Preview Modal / Expanded Card */}
				{proofPreviewVisible && (
					<View style={styles.proofPreviewBox} testID="w06-w08-proof-preview">
						<Text style={styles.proofPreviewHeading}>
							{i18n?.language?.startsWith("es")
								? "Demostración de Entrega Completada"
								: "Completed Delivery Demonstration"}
						</Text>
						<Text style={styles.proofPreviewText}>
							{i18n?.language?.startsWith("es")
								? "El conductor Mike R. ha adjuntado la prueba fotográfica de descarga. La validación formal de entrega se ejecutará en Workflow 08."
								: "Driver Mike R. has attached unload photo evidence. Formal delivery validation and signature sign-off will execute in Workflow 08."}
						</Text>
					</View>
				)}

				{/* Action Buttons */}
				<Pressable
					style={({ pressed }) => [
						styles.primaryButton,
						pressed && styles.primaryButtonPressed,
					]}
					onPress={handleReviewCompletionProof}
					accessibilityRole="button"
					accessibilityLabel={t("w06W08Handoff.primaryCta")}
					testID="w06-w08-handoff-primary-cta"
				>
					<Text style={styles.primaryButtonText}>
						{t("w06W08Handoff.primaryCta")}
					</Text>
				</Pressable>

				<Pressable
					style={({ pressed }) => [
						styles.secondaryButton,
						pressed && styles.secondaryButtonPressed,
					]}
					onPress={handleReturnToActiveService}
					accessibilityRole="button"
					accessibilityLabel={t("w06W08Handoff.secondaryCta")}
					testID="w06-w08-handoff-secondary-cta"
				>
					<Text style={styles.secondaryButtonText}>
						{t("w06W08Handoff.secondaryCta")}
					</Text>
				</Pressable>

				<Pressable
					style={styles.altLinkButton}
					onPress={handleSupportLink}
					accessibilityRole="button"
					accessibilityLabel={t("w06W08Handoff.alternativeLink")}
					testID="w06-w08-handoff-alt-link"
				>
					<Text style={styles.altLinkText}>
						{t("w06W08Handoff.alternativeLink")}
					</Text>
				</Pressable>

				{/* Disclaimer */}
				<View style={styles.footerWrap}>
					<Text style={styles.footerDisclaimer}>
						{t("w06W08Handoff.prototypeDisclaimer")}
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
		paddingTop: 8,
		paddingBottom: 36,
	},
	progressTrackContainer: {
		marginBottom: 20,
		paddingTop: 8,
		position: "relative",
	},
	progressLinkingTrack: {
		position: "absolute",
		top: 15,
		left: 20,
		right: 20,
		height: 3,
		backgroundColor: colors.elevated,
		borderRadius: 2,
	},
	progressCompletedTrack: {
		position: "absolute",
		top: 15,
		left: 20,
		height: 3,
		backgroundColor: colors.brand,
		borderRadius: 2,
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
		width: 14,
		height: 14,
		borderRadius: 7,
		backgroundColor: colors.surface,
		borderWidth: 2,
		borderColor: colors.elevated,
		marginBottom: 6,
	},
	progressDotCompleted: {
		backgroundColor: colors.brand,
		borderColor: colors.brand,
	},
	progressDotActive: {
		backgroundColor: colors.brand,
		borderColor: colors.brand,
		transform: [{ scale: 1.2 }],
	},
	progressNodeLabel: {
		fontSize: 10,
		fontFamily: fontFamily.medium,
		color: colors.secondaryText,
		textAlign: "center",
	},
	progressNodeLabelActive: {
		color: colors.brand,
		fontFamily: fontFamily.bold,
	},
	progressNodeLabelCompleted: {
		color: colors.primaryText,
	},
	locationChip: {
		flexDirection: "row",
		alignItems: "center",
		backgroundColor: colors.surface,
		paddingHorizontal: 12,
		paddingVertical: 6,
		borderRadius: 8,
		alignSelf: "flex-start",
		marginBottom: 14,
		borderWidth: 1,
		borderColor: colors.elevated,
		gap: 6,
	},
	locationChipText: {
		fontSize: 11,
		fontFamily: fontFamily.semiBold,
		color: colors.brand,
		letterSpacing: 0.5,
	},
	headerBlock: {
		marginBottom: 20,
	},
	screenTitle: {
		fontSize: 24,
		fontFamily: fontFamily.bold,
		color: colors.primaryText,
		marginBottom: 6,
		letterSpacing: -0.3,
	},
	screenSubtitle: {
		fontSize: 13,
		fontFamily: fontFamily.regular,
		color: colors.secondaryText,
		lineHeight: 18,
	},
	jobCard: {
		backgroundColor: colors.surface,
		borderRadius: 14,
		borderWidth: 1,
		borderColor: colors.elevated,
		padding: 16,
		marginBottom: 16,
	},
	jobCardHeader: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
	},
	previewBadge: {
		backgroundColor: "rgba(186, 255, 66, 0.15)",
		paddingHorizontal: 10,
		paddingVertical: 5,
		borderRadius: 6,
		borderWidth: 1,
		borderColor: "rgba(186, 255, 66, 0.4)",
	},
	previewBadgeText: {
		fontSize: 10,
		fontFamily: fontFamily.bold,
		color: colors.brand,
		letterSpacing: 0.6,
	},
	bookingRefText: {
		fontSize: 12,
		fontFamily: fontFamily.medium,
		color: colors.secondaryText,
	},
	divider: {
		height: 1,
		backgroundColor: colors.elevated,
		marginVertical: 14,
	},
	infoRow: {
		flexDirection: "row",
		alignItems: "center",
		marginVertical: 6,
		gap: 12,
	},
	iconCol: {
		width: 32,
		height: 32,
		borderRadius: 8,
		backgroundColor: "rgba(255, 255, 255, 0.04)",
		alignItems: "center",
		justifyContent: "center",
	},
	textCol: {
		flex: 1,
		minWidth: 0,
	},
	infoLabel: {
		fontSize: 10,
		fontFamily: fontFamily.semiBold,
		color: colors.secondaryText,
		letterSpacing: 0.5,
		marginBottom: 2,
	},
	infoValue: {
		fontSize: 13,
		fontFamily: fontFamily.semiBold,
		color: colors.primaryText,
	},
	detailsCard: {
		backgroundColor: colors.surface,
		borderRadius: 14,
		borderWidth: 1,
		borderColor: colors.elevated,
		padding: 16,
		marginBottom: 16,
	},
	detailsCategory: {
		fontSize: 11,
		fontFamily: fontFamily.bold,
		color: colors.brand,
		letterSpacing: 0.8,
		marginBottom: 4,
	},
	detailsHeading: {
		fontSize: 16,
		fontFamily: fontFamily.bold,
		color: colors.primaryText,
		marginBottom: 14,
	},
	pointRow: {
		flexDirection: "row",
		marginVertical: 8,
		gap: 12,
	},
	pointIconWrap: {
		width: 32,
		height: 32,
		borderRadius: 8,
		backgroundColor: "rgba(186, 255, 66, 0.08)",
		alignItems: "center",
		justifyContent: "center",
	},
	pointTextWrap: {
		flex: 1,
		minWidth: 0,
	},
	pointTitle: {
		fontSize: 13,
		fontFamily: fontFamily.semiBold,
		color: colors.primaryText,
		marginBottom: 2,
	},
	pointDescription: {
		fontSize: 12,
		fontFamily: fontFamily.regular,
		color: colors.secondaryText,
		lineHeight: 16,
	},
	completionNoticeCard: {
		flexDirection: "row",
		alignItems: "flex-start",
		gap: 12,
		backgroundColor: "rgba(186, 255, 66, 0.08)",
		borderRadius: 14,
		padding: 16,
		marginBottom: 20,
		borderWidth: 1,
		borderColor: "rgba(186, 255, 66, 0.3)",
	},
	completionNoticeTextWrap: {
		flex: 1,
		minWidth: 0,
	},
	completionNoticeTitle: {
		fontSize: 13,
		fontFamily: fontFamily.bold,
		color: colors.brand,
		marginBottom: 4,
	},
	completionNoticeDesc: {
		fontSize: 12,
		fontFamily: fontFamily.regular,
		color: colors.primaryText,
		lineHeight: 17,
	},
	proofPreviewBox: {
		backgroundColor: colors.surface,
		borderRadius: 12,
		padding: 14,
		marginBottom: 16,
		borderWidth: 1,
		borderColor: colors.elevated,
	},
	proofPreviewHeading: {
		fontSize: 13,
		fontFamily: fontFamily.semiBold,
		color: colors.brand,
		marginBottom: 4,
	},
	proofPreviewText: {
		fontSize: 12,
		fontFamily: fontFamily.regular,
		color: colors.secondaryText,
		lineHeight: 16,
	},
	primaryButton: {
		height: 50,
		backgroundColor: colors.brand,
		borderRadius: 12,
		alignItems: "center",
		justifyContent: "center",
		marginBottom: 12,
	},
	primaryButtonPressed: {
		opacity: 0.88,
	},
	primaryButtonText: {
		fontSize: 15,
		fontFamily: fontFamily.bold,
		color: colors.background,
	},
	secondaryButton: {
		height: 48,
		backgroundColor: colors.surface,
		borderRadius: 12,
		borderWidth: 1,
		borderColor: colors.elevated,
		alignItems: "center",
		justifyContent: "center",
		marginBottom: 12,
	},
	secondaryButtonPressed: {
		backgroundColor: colors.elevated,
	},
	secondaryButtonText: {
		fontSize: 14,
		fontFamily: fontFamily.semiBold,
		color: colors.primaryText,
	},
	altLinkButton: {
		alignItems: "center",
		paddingVertical: 10,
		marginBottom: 16,
	},
	altLinkText: {
		fontSize: 13,
		fontFamily: fontFamily.medium,
		color: colors.secondaryText,
		textDecorationLine: "underline",
	},
	footerWrap: {
		alignItems: "center",
		marginTop: 8,
	},
	footerDisclaimer: {
		fontSize: 11,
		fontFamily: fontFamily.regular,
		color: colors.secondaryText,
		textAlign: "center",
		opacity: 0.7,
	},
});
