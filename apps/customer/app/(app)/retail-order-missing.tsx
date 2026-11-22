import { colors, fontFamily } from "@haulix/design-tokens";
import { useTranslation } from "@haulix/i18n";
import { HaulixSafeArea } from "@haulix/ui";
import { useRouter } from "expo-router";
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
	C18AlertTriangleIcon,
	C18CheckIcon,
} from "../../src/components/discovery/C18BatchIcons";
import { FlowHeaderBack } from "../../src/components/navigation/FlowHeaderBack";
import {
	getC10DemoProfile,
	loadProfileEdits,
	subscribeToProfileEdits,
} from "../../src/fixtures/c10DemoProfile";
import {
	C18RE_DEFAULT_DATA,
	C18RE_DEMO_CONSTANTS,
} from "../../src/fixtures/c18reRetailMissing";

function useCustomerProfile(locale: "en" | "es") {
	const [profile, setProfile] = useState(() => getC10DemoProfile(locale));
	useEffect(() => {
		loadProfileEdits().then(() => setProfile(getC10DemoProfile(locale)));
		return subscribeToProfileEdits(() => setProfile(getC10DemoProfile(locale)));
	}, [locale]);
	return profile;
}

export default function RetailOrderMissingScreen() {
	const { t, i18n } = useTranslation();
	const router = useRouter();
	const currentLocale = (i18n?.language?.startsWith("es") ? "es" : "en") as
		| "en"
		| "es";
	const isEs = currentLocale === "es";

	const profile = useCustomerProfile(currentLocale);
	const bookingId = C18RE_DEMO_CONSTANTS.defaultBookingId;

	const [noticeMessage, setNoticeMessage] = useState<string | null>(null);

	const handleBack = useCallback(() => {
		if (router.canGoBack()) {
			router.back();
		} else {
			router.replace({ pathname: "/retail-intake" });
		}
	}, [router]);

	useEffect(() => {
		const sub = BackHandler.addEventListener("hardwareBackPress", () => {
			handleBack();
			return true;
		});
		return () => sub.remove();
	}, [handleBack]);

	const handleEditRetail = useCallback(() => {
		router.replace({ pathname: "/retail-intake" });
	}, [router]);

	const handleBackToSelection = useCallback(() => {
		router.push("/service-discovery");
	}, [router]);

	const data = C18RE_DEFAULT_DATA;

	return (
		<HaulixSafeArea edges={["top", "left", "right"]} style={styles.safeArea}>
			<FlowHeaderBack
				testID="c18re-header-back"
				onBack={handleBack}
				backA11y={t("c18re.backA11y")}
			/>

			{noticeMessage && (
				<View style={styles.noticeBox} testID="c18re-notice-banner">
					<Text style={styles.noticeText}>{noticeMessage}</Text>
					<Pressable
						onPress={() => setNoticeMessage(null)}
						style={styles.noticeDismiss}
						accessibilityRole="button"
						accessibilityLabel={t("c18re.noticeDismiss")}
						testID="c18re-notice-dismiss"
					>
						<Text style={styles.noticeDismissText}>
							{t("c18re.noticeDismiss")}
						</Text>
					</Pressable>
				</View>
			)}

			<ScrollView
				style={styles.scrollView}
				contentContainerStyle={styles.scrollContent}
				showsVerticalScrollIndicator={false}
			>
				{/* Step Indicator */}
				<View style={styles.stepChipContainer}>
					<Text style={styles.stepChipLeft}>
						{isEs
							? C18RE_DEMO_CONSTANTS.stepIndicatorEs
							: C18RE_DEMO_CONSTANTS.stepIndicator}
					</Text>
					<Text style={styles.stepChipRight}>
						{isEs
							? C18RE_DEMO_CONSTANTS.stepSubEs
							: C18RE_DEMO_CONSTANTS.stepSub}
					</Text>
				</View>

				{/* Heading */}
				<View style={styles.headingSection}>
					<Text style={styles.titleText}>{t("c18re.title")}</Text>
					<Text style={styles.subtitleText}>{t("c18re.subtitle")}</Text>

					{/* Dynamic Customer Chip */}
					<View style={styles.customerChip} testID="c18re-customer-chip">
						<C18CheckIcon size={17} color={colors.brand} />
						<Text style={styles.customerChipText}>
							{profile.name.toUpperCase()} · {bookingId}
						</Text>
					</View>
				</View>

				{/* Validation Review Card */}
				<View style={styles.card}>
					<Text style={styles.cardTitle}>{t("c18re.validationCardTitle")}</Text>

					<View style={styles.rowItem}>
						<Text style={styles.rowLabel}>{t("c18re.labelRetailer")}</Text>
						<Text style={styles.rowValue}>
							{isEs ? data.retailerNameEs : data.retailerName}
						</Text>
					</View>

					<View style={styles.rowDivider} />

					<View style={styles.rowItem}>
						<Text style={styles.rowLabel}>{t("c18re.labelOrderNumber")}</Text>
						<View
							style={styles.missingBadge}
							testID="c18re-missing-order-badge"
						>
							<Text style={styles.missingBadgeText}>
								{isEs ? data.orderNumberStatusEs : data.orderNumberStatus}
							</Text>
						</View>
					</View>

					<View style={styles.rowDivider} />

					<View style={styles.rowItem}>
						<Text style={styles.rowLabel}>{t("c18re.labelStoreLocation")}</Text>
						<Text style={styles.rowValue}>
							{isEs ? data.storeLocationStatusEs : data.storeLocationStatus}
						</Text>
					</View>
				</View>

				{/* Cannot Proceed Yet — Error Card */}
				<View style={styles.errorCard} testID="c18re-error-card">
					<View style={styles.errorHeaderRow}>
						<Text style={styles.errorCardTitle}>
							{t("c18re.cannotProceedTitle")}
						</Text>
						<View style={styles.actionRequiredBadge}>
							<C18AlertTriangleIcon size={13} color="#EF4444" />
							<Text style={styles.actionRequiredBadgeText}>
								{t("c18re.actionRequiredBadge")}
							</Text>
						</View>
					</View>

					<View style={styles.noticeBulletRow}>
						<View style={styles.errorBulletDot} />
						<Text style={styles.errorBulletText}>
							{t("c18re.errorGuidance")}
						</Text>
					</View>

					<View style={styles.noticeBulletRow}>
						<View style={styles.errorBulletDot} />
						<Text style={styles.errorBulletText}>
							{t("c18re.errorDisclaimer")}
						</Text>
					</View>
				</View>

				{/* Primary CTA */}
				<Pressable
					style={styles.primaryButton}
					onPress={handleEditRetail}
					accessibilityRole="button"
					accessibilityLabel={t("c18re.continueCta")}
					testID="c18re-continue-cta"
				>
					<Text style={styles.primaryButtonText}>{t("c18re.continueCta")}</Text>
				</Pressable>

				{/* Secondary CTA */}
				<Pressable
					style={styles.secondaryButton}
					onPress={handleBackToSelection}
					accessibilityRole="button"
					accessibilityLabel={t("c18re.backSelectionCta")}
					testID="c18re-back-selection-cta"
				>
					<Text style={styles.secondaryButtonText}>
						{t("c18re.backSelectionCta")}
					</Text>
				</Pressable>

				{/* Footer */}
				<View style={styles.footerContainer}>
					<Text style={styles.footerText}>{t("c18re.footerDemo")}</Text>
					<Text style={styles.footerSubText}>{t("c18re.footerSrs")}</Text>
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
	scrollView: {
		flex: 1,
	},
	scrollContent: {
		paddingHorizontal: 20,
		paddingTop: 12,
		paddingBottom: 40,
	},
	noticeBox: {
		backgroundColor: "#27272A",
		borderLeftWidth: 4,
		borderLeftColor: "#FFC85A",
		borderRadius: 8,
		padding: 14,
		marginHorizontal: 20,
		marginBottom: 12,
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-between",
	},
	noticeText: {
		color: colors.primaryText,
		fontFamily: fontFamily.regular,
		fontSize: 13,
		lineHeight: 18,
		flex: 1,
		marginRight: 10,
	},
	noticeDismiss: {
		paddingHorizontal: 10,
		paddingVertical: 4,
		backgroundColor: "#3F3F46",
		borderRadius: 4,
	},
	noticeDismissText: {
		color: colors.brand,
		fontFamily: fontFamily.medium,
		fontSize: 12,
	},
	stepChipContainer: {
		flexDirection: "row",
		alignItems: "center",
		alignSelf: "flex-start",
		backgroundColor: "#1C2422",
		borderRadius: 6,
		paddingHorizontal: 10,
		paddingVertical: 5,
		marginBottom: 14,
	},
	stepChipLeft: {
		color: colors.brand,
		fontFamily: fontFamily.semiBold,
		fontSize: 11,
		letterSpacing: 0.5,
	},
	stepChipRight: {
		color: colors.secondaryText,
		fontFamily: fontFamily.regular,
		fontSize: 11,
	},
	headingSection: {
		marginBottom: 20,
	},
	titleText: {
		color: colors.primaryText,
		fontFamily: fontFamily.bold,
		fontSize: 26,
		lineHeight: 32,
		marginBottom: 6,
	},
	subtitleText: {
		color: colors.secondaryText,
		fontFamily: fontFamily.regular,
		fontSize: 14,
		lineHeight: 20,
		marginBottom: 12,
	},
	customerChip: {
		flexDirection: "row",
		alignItems: "center",
		backgroundColor: "#17231E",
		borderWidth: 1,
		borderColor: "#234236",
		borderRadius: 8,
		paddingHorizontal: 12,
		paddingVertical: 7,
		alignSelf: "flex-start",
		gap: 8,
	},
	customerChipText: {
		color: colors.brand,
		fontFamily: fontFamily.semiBold,
		fontSize: 12,
		letterSpacing: 0.3,
	},
	card: {
		backgroundColor: "#161D1B",
		borderWidth: 1,
		borderColor: "#22312D",
		borderRadius: 14,
		padding: 16,
		marginBottom: 16,
	},
	cardTitle: {
		color: colors.primaryText,
		fontFamily: fontFamily.semiBold,
		fontSize: 15,
		marginBottom: 12,
	},
	rowItem: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
		paddingVertical: 10,
	},
	rowLabel: {
		color: colors.secondaryText,
		fontFamily: fontFamily.regular,
		fontSize: 13,
		flex: 1,
	},
	rowValue: {
		color: colors.primaryText,
		fontFamily: fontFamily.semiBold,
		fontSize: 13,
		textAlign: "right",
		flex: 1.2,
	},
	missingBadge: {
		backgroundColor: "#2B1414",
		borderWidth: 1,
		borderColor: "#5C2020",
		borderRadius: 6,
		paddingHorizontal: 8,
		paddingVertical: 4,
	},
	missingBadgeText: {
		color: "#EF4444",
		fontFamily: fontFamily.semiBold,
		fontSize: 12,
	},
	rowDivider: {
		height: 1,
		backgroundColor: "#1F2B27",
		marginVertical: 2,
	},
	errorCard: {
		backgroundColor: "#1D1616",
		borderWidth: 1,
		borderColor: "#4A1D1D",
		borderRadius: 14,
		padding: 16,
		marginBottom: 16,
	},
	errorHeaderRow: {
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-between",
		marginBottom: 12,
	},
	errorCardTitle: {
		color: "#EF4444",
		fontFamily: fontFamily.semiBold,
		fontSize: 15,
	},
	actionRequiredBadge: {
		flexDirection: "row",
		alignItems: "center",
		gap: 6,
		backgroundColor: "#2B1414",
		borderWidth: 1,
		borderColor: "#5C2020",
		borderRadius: 6,
		paddingHorizontal: 8,
		paddingVertical: 4,
	},
	actionRequiredBadgeText: {
		color: "#EF4444",
		fontFamily: fontFamily.medium,
		fontSize: 11,
	},
	noticeBulletRow: {
		flexDirection: "row",
		alignItems: "flex-start",
		marginTop: 8,
		gap: 8,
	},
	errorBulletDot: {
		width: 5,
		height: 5,
		borderRadius: 2.5,
		backgroundColor: "#EF4444",
		marginTop: 7,
	},
	errorBulletText: {
		flex: 1,
		color: "#D1D5DB",
		fontFamily: fontFamily.regular,
		fontSize: 13,
		lineHeight: 18,
	},
	primaryButton: {
		backgroundColor: colors.brand,
		borderRadius: 12,
		paddingVertical: 15,
		alignItems: "center",
		justifyContent: "center",
		marginTop: 8,
		marginBottom: 12,
	},
	primaryButtonText: {
		color: colors.background,
		fontFamily: fontFamily.bold,
		fontSize: 15,
	},
	secondaryButton: {
		paddingVertical: 12,
		alignItems: "center",
		justifyContent: "center",
		marginBottom: 20,
	},
	secondaryButtonText: {
		color: colors.secondaryText,
		fontFamily: fontFamily.medium,
		fontSize: 13,
	},
	footerContainer: {
		alignItems: "center",
		paddingTop: 12,
		borderTopWidth: 1,
		borderTopColor: "#1A2220",
		gap: 4,
	},
	footerText: {
		color: colors.secondaryText,
		fontFamily: fontFamily.medium,
		fontSize: 11,
		letterSpacing: 0.5,
	},
	footerSubText: {
		color: "#6B7280",
		fontFamily: fontFamily.regular,
		fontSize: 10,
	},
});
