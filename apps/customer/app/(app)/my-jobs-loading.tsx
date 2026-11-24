/**
 * HAULIX Customer Mobile App — Phase 03.55
 * Screen: My Jobs — Loading State (W07 Canonical State: HOME_LOADING)
 *
 * Authoritative Figma Reference:
 * - Frame ID: 892:6120 (EN: "W07-EN / HOME_LOADING · Loading your bookings")
 * - Frame ID: 893:6526 (ES: "W07-ES / HOME_LOADING · Cargando sus reservas")
 * - Parent Section: 891:5859 (EN) / 891:5860 (ES)
 * - File Key: meiXxwUNJaDo0a3mhcHBXv (Student Team)
 *
 * CRITICAL ARCHITECTURAL CONSTRAINTS:
 * - Pure frontend demonstration and deterministic prototype state.
 * - Displays loading skeleton preview without infinite block.
 * - CustomerBottomNav with activeTab="jobs".
 * - Unrestricted frontend navigation; zero route guards.
 */

import { colors, fontFamily } from "@haulix/design-tokens";
import { changeLocale, useTranslation } from "@haulix/i18n";
import { HaulixSafeArea } from "@haulix/ui";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useCallback, useEffect } from "react";
import {
	BackHandler,
	Pressable,
	ScrollView,
	StyleSheet,
	Text,
	View,
} from "react-native";
import { C32ClockIcon } from "../../src/components/dispatch/C32Icons";
import { CustomerBottomNav } from "../../src/components/navigation/CustomerBottomNav";

export default function MyJobsLoadingScreen() {
	const { t, i18n } = useTranslation();
	const router = useRouter();
	const params = useLocalSearchParams<{ previewLocale?: string }>();

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
				pathname: "/my-jobs",
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

	const handleRetry = useCallback(() => {
		router.push({
			pathname: "/my-jobs",
			params: params.previewLocale
				? { previewLocale: params.previewLocale }
				: {},
		});
	}, [router, params.previewLocale]);

	const handlePreviewEmpty = useCallback(() => {
		router.push({
			pathname: "/my-jobs-empty",
			params: params.previewLocale
				? { previewLocale: params.previewLocale }
				: {},
		});
	}, [router, params.previewLocale]);

	const handleAccessDeniedPreview = useCallback(() => {
		router.push({
			pathname: "/my-jobs-access",
			params: params.previewLocale
				? { previewLocale: params.previewLocale }
				: {},
		});
	}, [router, params.previewLocale]);

	return (
		<HaulixSafeArea edges={["top"]} style={styles.safeArea}>
			{/* Brand Header */}
			<View style={styles.headerRow} testID="w07-loading-header">
				<Pressable
					accessibilityLabel={t("w07HomeLoading.backA11y")}
					accessibilityRole="button"
					hitSlop={8}
					onPress={handleBack}
					style={styles.backButton}
					testID="w07-loading-back-btn"
				>
					<Text style={styles.backChevron}>‹</Text>
				</Pressable>
				<View style={styles.brandTitleContainer}>
					<Text style={styles.brandHaul}>{t("w07HomeLoading.brandHaul")}</Text>
					<Text style={styles.brandIx}>{t("w07HomeLoading.brandIx")}</Text>
				</View>
				<View style={styles.menuDotsContainer}>
					<Text style={styles.menuDotsText}>
						{t("w07HomeLoading.menuDots")}
					</Text>
				</View>
			</View>

			<ScrollView
				contentContainerStyle={styles.scrollContent}
				showsVerticalScrollIndicator={false}
				testID="w07-loading-scroll"
			>
				{/* Title and Subtitle */}
				<View style={styles.titleContainer}>
					<Text style={styles.screenTitle} testID="w07-loading-title">
						{t("w07HomeLoading.screenTitle")}
					</Text>
					<Text style={styles.screenSubtitle} testID="w07-loading-subtitle">
						{t("w07HomeLoading.screenSubtitle")}
					</Text>
				</View>

				{/* Section Badge */}
				<View style={styles.sectionBadge} testID="w07-loading-badge">
					<View style={styles.sectionBadgeIconWrap}>
						<C32ClockIcon size={14} color="#F2C94C" />
					</View>
					<Text style={styles.sectionBadgeText}>
						{t("w07HomeLoading.badgeLoading")}
					</Text>
				</View>

				{/* Filter Tabs / Pills */}
				<View style={styles.filterPillsRow} testID="w07-loading-filter-pills">
					<View style={[styles.filterPill, styles.filterPillActive]}>
						<Text style={styles.filterPillActiveText}>
							{t("w07HomeLoading.tabActive")}
						</Text>
					</View>
					<View style={styles.filterPill}>
						<Text style={styles.filterPillText}>
							{t("w07HomeLoading.tabScheduled")}
						</Text>
					</View>
					<View style={styles.filterPill}>
						<Text style={styles.filterPillText}>
							{t("w07HomeLoading.tabHistory")}
						</Text>
					</View>
				</View>

				{/* Loading Skeleton Cards */}
				<View
					style={styles.loadingSkeletonCard}
					testID="w07-loading-skeleton-1"
				>
					<View style={styles.skeletonTopRow}>
						<View style={styles.skeletonThumbnail} />
						<View style={styles.skeletonTextCol}>
							<View style={[styles.skeletonLine, { width: "45%" }]} />
							<View style={[styles.skeletonLine, { width: "70%" }]} />
							<View style={[styles.skeletonLine, { width: "90%" }]} />
						</View>
					</View>
					<View style={styles.cardDivider} />
					<View style={[styles.skeletonLine, { width: "60%" }]} />
				</View>

				<View
					style={styles.loadingSkeletonCard}
					testID="w07-loading-skeleton-2"
				>
					<View style={styles.skeletonNoticeWrap}>
						<Text style={styles.loadingHeading}>
							{t("w07HomeLoading.cardHeading")}
						</Text>
						<Text style={styles.loadingNoticeText}>
							{t("w07HomeLoading.loadingNotice")}
						</Text>
					</View>
					<View style={styles.cardDivider} />
					<Text style={styles.disclaimerOwnerText}>
						{t("w07HomeLoading.disclaimerOwner")}
					</Text>
				</View>

				{/* Action Buttons */}
				<Pressable
					accessibilityLabel={t("w07HomeLoading.primaryCta")}
					accessibilityRole="button"
					onPress={handleRetry}
					style={({ pressed }) => [
						styles.primaryButton,
						pressed && styles.primaryButtonPressed,
					]}
					testID="w07-loading-primary-cta"
				>
					<Text style={styles.primaryButtonText}>
						{t("w07HomeLoading.primaryCta")}
					</Text>
				</Pressable>

				<Pressable
					accessibilityLabel={t("w07HomeLoading.secondaryCta")}
					accessibilityRole="button"
					onPress={handlePreviewEmpty}
					style={({ pressed }) => [
						styles.secondaryButton,
						pressed && styles.secondaryButtonPressed,
					]}
					testID="w07-loading-secondary-cta"
				>
					<Text style={styles.secondaryButtonText}>
						{t("w07HomeLoading.secondaryCta")}
					</Text>
				</Pressable>

				<Pressable
					accessibilityLabel={t("w07HomeLoading.altLink")}
					accessibilityRole="button"
					onPress={handleAccessDeniedPreview}
					style={styles.altLinkButton}
					testID="w07-loading-alt-link"
				>
					<Text style={styles.altLinkText}>{t("w07HomeLoading.altLink")}</Text>
				</Pressable>

				{/* Prototype Disclaimer */}
				<View style={styles.footerWrap}>
					<Text style={styles.footerDisclaimer}>
						{t("w07HomeLoading.prototypeDisclaimer")}
					</Text>
				</View>
			</ScrollView>

			{/* Customer Bottom Navigation */}
			<CustomerBottomNav activeTab="jobs" />
		</HaulixSafeArea>
	);
}

const styles = StyleSheet.create({
	safeArea: {
		flex: 1,
		backgroundColor: colors.background,
	},
	headerRow: {
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-between",
		paddingHorizontal: 16,
		paddingVertical: 12,
		borderBottomWidth: 1,
		borderBottomColor: colors.elevated,
	},
	backButton: {
		width: 36,
		height: 36,
		borderRadius: 18,
		backgroundColor: colors.surface,
		borderWidth: 1,
		borderColor: colors.elevated,
		alignItems: "center",
		justifyContent: "center",
	},
	backChevron: {
		fontSize: 22,
		fontFamily: fontFamily.bold,
		color: colors.primaryText,
		marginTop: -2,
	},
	brandTitleContainer: {
		flexDirection: "row",
		alignItems: "center",
	},
	brandHaul: {
		fontSize: 18,
		fontFamily: fontFamily.bold,
		color: colors.primaryText,
		letterSpacing: 0.5,
	},
	brandIx: {
		fontSize: 18,
		fontFamily: fontFamily.bold,
		color: colors.brand,
		letterSpacing: 0.5,
	},
	menuDotsContainer: {
		width: 36,
		height: 36,
		alignItems: "center",
		justifyContent: "center",
	},
	menuDotsText: {
		fontSize: 18,
		fontFamily: fontFamily.bold,
		color: colors.secondaryText,
	},
	scrollContent: {
		paddingHorizontal: 16,
		paddingTop: 16,
		paddingBottom: 24,
	},
	titleContainer: {
		marginBottom: 16,
	},
	screenTitle: {
		fontSize: 24,
		fontFamily: fontFamily.bold,
		color: colors.primaryText,
		marginBottom: 4,
	},
	screenSubtitle: {
		fontSize: 13,
		fontFamily: fontFamily.regular,
		color: colors.secondaryText,
		lineHeight: 18,
	},
	sectionBadge: {
		flexDirection: "row",
		alignItems: "center",
		backgroundColor: colors.surface,
		paddingHorizontal: 10,
		paddingVertical: 6,
		borderRadius: 8,
		borderWidth: 1,
		borderColor: colors.elevated,
		alignSelf: "flex-start",
		marginBottom: 14,
		gap: 6,
	},
	sectionBadgeIconWrap: {
		width: 16,
		height: 16,
		alignItems: "center",
		justifyContent: "center",
	},
	sectionBadgeText: {
		fontSize: 11,
		fontFamily: fontFamily.bold,
		color: "#F2C94C",
		letterSpacing: 0.6,
	},
	filterPillsRow: {
		flexDirection: "row",
		gap: 8,
		marginBottom: 16,
	},
	filterPill: {
		paddingHorizontal: 14,
		paddingVertical: 7,
		borderRadius: 8,
		backgroundColor: colors.surface,
		borderWidth: 1,
		borderColor: colors.elevated,
	},
	filterPillActive: {
		backgroundColor: colors.brand,
		borderColor: colors.brand,
	},
	filterPillText: {
		fontSize: 12,
		fontFamily: fontFamily.semiBold,
		color: colors.secondaryText,
	},
	filterPillActiveText: {
		fontSize: 12,
		fontFamily: fontFamily.bold,
		color: colors.background,
	},
	loadingSkeletonCard: {
		backgroundColor: colors.surface,
		borderRadius: 14,
		borderWidth: 1,
		borderColor: colors.elevated,
		padding: 16,
		marginBottom: 16,
	},
	skeletonTopRow: {
		flexDirection: "row",
		gap: 12,
		alignItems: "center",
	},
	skeletonThumbnail: {
		width: 60,
		height: 60,
		borderRadius: 10,
		backgroundColor: colors.elevated,
	},
	skeletonTextCol: {
		flex: 1,
		gap: 8,
	},
	skeletonLine: {
		height: 12,
		borderRadius: 6,
		backgroundColor: colors.elevated,
	},
	skeletonNoticeWrap: {
		paddingVertical: 6,
	},
	loadingHeading: {
		fontSize: 15,
		fontFamily: fontFamily.bold,
		color: colors.primaryText,
		marginBottom: 6,
	},
	loadingNoticeText: {
		fontSize: 13,
		fontFamily: fontFamily.regular,
		color: colors.secondaryText,
		lineHeight: 18,
	},
	cardDivider: {
		height: 1,
		backgroundColor: colors.elevated,
		marginVertical: 12,
	},
	disclaimerOwnerText: {
		fontSize: 11,
		fontFamily: fontFamily.regular,
		color: colors.secondaryText,
		opacity: 0.8,
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
		marginBottom: 8,
	},
	footerDisclaimer: {
		fontSize: 11,
		fontFamily: fontFamily.regular,
		color: colors.secondaryText,
		textAlign: "center",
		opacity: 0.7,
	},
});
