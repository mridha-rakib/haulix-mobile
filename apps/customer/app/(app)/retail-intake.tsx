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
	C18CheckIcon,
	C18HazardShieldIcon,
	C18RetailIcon,
} from "../../src/components/discovery/C18BatchIcons";
import { FlowHeaderBack } from "../../src/components/navigation/FlowHeaderBack";
import {
	getC10DemoProfile,
	loadProfileEdits,
	subscribeToProfileEdits,
} from "../../src/fixtures/c10DemoProfile";
import {
	C18R_DEFAULT_DATA,
	C18R_DEMO_CONSTANTS,
} from "../../src/fixtures/c18rRetailIntake";

function useCustomerProfile(locale: "en" | "es") {
	const [profile, setProfile] = useState(() => getC10DemoProfile(locale));
	useEffect(() => {
		loadProfileEdits().then(() => setProfile(getC10DemoProfile(locale)));
		return subscribeToProfileEdits(() => setProfile(getC10DemoProfile(locale)));
	}, [locale]);
	return profile;
}

export default function RetailIntakeScreen() {
	const { t, i18n } = useTranslation();
	const router = useRouter();
	const currentLocale = (i18n?.language?.startsWith("es") ? "es" : "en") as
		| "en"
		| "es";
	const isEs = currentLocale === "es";

	const profile = useCustomerProfile(currentLocale);
	const bookingId = C18R_DEMO_CONSTANTS.defaultBookingId;

	const [noticeMessage, setNoticeMessage] = useState<string | null>(null);

	const handleBack = useCallback(() => {
		if (router.canGoBack()) {
			router.back();
		} else {
			router.replace({
				pathname: "/pickup-address",
				params: { service: "store-pickup" },
			});
		}
	}, [router]);

	useEffect(() => {
		const sub = BackHandler.addEventListener("hardwareBackPress", () => {
			handleBack();
			return true;
		});
		return () => sub.remove();
	}, [handleBack]);

	const handleReviewCta = useCallback(() => {
		router.push("/retail-collection-readiness");
	}, [router]);

	const handleMissingOrderCta = useCallback(() => {
		router.push("/retail-order-missing");
	}, [router]);

	const data = C18R_DEFAULT_DATA;

	return (
		<HaulixSafeArea edges={["top", "left", "right"]} style={styles.safeArea}>
			<FlowHeaderBack
				testID="c18r-header-back"
				onBack={handleBack}
				backA11y={t("c18r.backA11y")}
			/>

			{noticeMessage && (
				<View style={styles.noticeBox} testID="c18r-notice-banner">
					<Text style={styles.noticeText}>{noticeMessage}</Text>
					<Pressable
						onPress={() => setNoticeMessage(null)}
						style={styles.noticeDismiss}
						accessibilityRole="button"
						accessibilityLabel={t("c18r.noticeDismiss")}
						testID="c18r-notice-dismiss"
					>
						<Text style={styles.noticeDismissText}>
							{t("c18r.noticeDismiss")}
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
							? C18R_DEMO_CONSTANTS.stepIndicatorEs
							: C18R_DEMO_CONSTANTS.stepIndicator}
					</Text>
					<Text style={styles.stepChipRight}>
						{isEs ? C18R_DEMO_CONSTANTS.stepSubEs : C18R_DEMO_CONSTANTS.stepSub}
					</Text>
				</View>

				{/* Heading */}
				<View style={styles.headingSection}>
					<Text style={styles.titleText}>{t("c18r.title")}</Text>
					<Text style={styles.subtitleText}>{t("c18r.subtitle")}</Text>

					{/* Dynamic Customer Chip */}
					<View style={styles.customerChip} testID="c18r-customer-chip">
						<C18CheckIcon size={17} color={colors.brand} />
						<Text style={styles.customerChipText}>
							{profile.name.toUpperCase()} · {bookingId}
						</Text>
					</View>
				</View>

				{/* Retail Order Details Card */}
				<View style={styles.card}>
					<View style={styles.cardHeaderRow}>
						<C18RetailIcon size={18} color={colors.brand} />
						<Text style={styles.cardTitle}>{t("c18r.retailerCardTitle")}</Text>
					</View>

					<View style={styles.rowItem}>
						<Text style={styles.rowLabel}>{t("c18r.labelStore")}</Text>
						<Text style={styles.rowValue}>{data.retailerName}</Text>
					</View>

					<View style={styles.rowDivider} />

					<View style={styles.rowItem}>
						<Text style={styles.rowLabel}>{t("c18r.labelStoreAddress")}</Text>
						<Text style={styles.rowValue}>{data.storeAddress}</Text>
					</View>

					<View style={styles.rowDivider} />

					<View style={styles.rowItem}>
						<Text style={styles.rowLabel}>{t("c18r.labelOrderNumber")}</Text>
						<Text style={styles.rowValue}>{data.orderNumber}</Text>
					</View>

					<View style={styles.rowDivider} />

					<View style={styles.rowItem}>
						<Text style={styles.rowLabel}>
							{t("c18r.labelAuthorizedCollector")}
						</Text>
						<Text style={styles.rowValue}>
							{isEs ? data.pickupContactEs : data.pickupContact}
						</Text>
					</View>

					<View style={styles.rowDivider} />

					<View style={styles.rowItem}>
						<Text style={styles.rowLabel}>{t("c18r.labelStatus")}</Text>
						<Text style={styles.rowValue}>
							{isEs ? data.orderStatusEs : data.orderStatus}
						</Text>
					</View>
				</View>

				{/* Delivery & Items Card */}
				<View style={styles.card}>
					<Text style={styles.cardTitle}>{t("c18r.deliveryCardTitle")}</Text>

					<View style={styles.rowItem}>
						<Text style={styles.rowLabel}>{t("c18r.labelDropoff")}</Text>
						<Text style={styles.rowValue}>{data.deliveryAddress}</Text>
					</View>

					<View style={styles.rowDivider} />

					<View style={styles.rowItem}>
						<Text style={styles.rowLabel}>{t("c18r.labelExpectedItems")}</Text>
						<Text style={styles.rowValue}>
							{isEs ? data.expectedItemsEs : data.expectedItems}
						</Text>
					</View>

					<View style={styles.rowDivider} />

					<View style={styles.rowItem}>
						<Text style={styles.rowLabel}>{t("c18r.labelEstimatedLoad")}</Text>
						<Text style={styles.rowValue}>
							{isEs ? data.estimatedLoadEs : data.estimatedLoad}
						</Text>
					</View>

					<View style={styles.rowDivider} />

					<View style={styles.rowItem}>
						<Text style={styles.rowLabel}>{t("c18r.labelNotes")}</Text>
						<Text style={styles.rowValue}>
							{isEs ? data.collectionNotesEs : data.collectionNotes}
						</Text>
					</View>
				</View>

				{/* Direct Retailer Integration Disclaimer */}
				<View style={styles.card}>
					<View style={styles.hazardHeaderRow}>
						<View style={styles.hazardTitleRow}>
							<C18HazardShieldIcon size={18} color="#FFC85A" />
							<Text style={styles.hazardTitle}>{t("c18r.apiCardTitle")}</Text>
						</View>
						<View style={styles.reviewBadge}>
							<Text style={styles.reviewBadgeText}>
								{t("c18r.reviewBadge")}
							</Text>
						</View>
					</View>

					<Text style={styles.hazardNoticeText}>
						{isEs ? data.apiNoticeEs : data.apiNotice}
					</Text>
				</View>

				{/* Primary CTA */}
				<Pressable
					style={styles.primaryButton}
					onPress={handleReviewCta}
					accessibilityRole="button"
					accessibilityLabel={t("c18r.continueCta")}
					testID="c18r-continue-cta"
				>
					<Text style={styles.primaryButtonText}>{t("c18r.continueCta")}</Text>
				</Pressable>

				{/* Secondary CTA */}
				<Pressable
					style={styles.secondaryButton}
					onPress={handleMissingOrderCta}
					accessibilityRole="button"
					accessibilityLabel={t("c18r.missingOrderCta")}
					testID="c18r-missing-order-cta"
				>
					<Text style={styles.secondaryButtonText}>
						{t("c18r.missingOrderCta")}
					</Text>
				</Pressable>

				{/* Footer */}
				<View style={styles.footerContainer}>
					<Text style={styles.footerText}>{t("c18r.footerDemo")}</Text>
					<Text style={styles.footerSubText}>{t("c18r.footerSrs")}</Text>
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
	cardHeaderRow: {
		flexDirection: "row",
		alignItems: "center",
		gap: 10,
		marginBottom: 14,
	},
	cardTitle: {
		color: colors.primaryText,
		fontFamily: fontFamily.semiBold,
		fontSize: 15,
	},
	rowItem: {
		paddingVertical: 4,
	},
	rowLabel: {
		color: colors.secondaryText,
		fontFamily: fontFamily.regular,
		fontSize: 12,
		marginBottom: 2,
	},
	rowValue: {
		color: colors.primaryText,
		fontFamily: fontFamily.medium,
		fontSize: 14,
		lineHeight: 20,
	},
	rowDivider: {
		height: 1,
		backgroundColor: "#22312D",
		marginVertical: 10,
	},
	hazardHeaderRow: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
		marginBottom: 10,
	},
	hazardTitleRow: {
		flexDirection: "row",
		alignItems: "center",
		gap: 8,
	},
	hazardTitle: {
		color: colors.primaryText,
		fontFamily: fontFamily.semiBold,
		fontSize: 14,
	},
	reviewBadge: {
		backgroundColor: "#3A2A14",
		paddingHorizontal: 8,
		paddingVertical: 3,
		borderRadius: 4,
	},
	reviewBadgeText: {
		color: "#FFC85A",
		fontFamily: fontFamily.medium,
		fontSize: 11,
	},
	hazardNoticeText: {
		color: colors.secondaryText,
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
		marginBottom: 12,
	},
	primaryButtonText: {
		color: "#0F1614",
		fontFamily: fontFamily.bold,
		fontSize: 15,
	},
	secondaryButton: {
		paddingVertical: 12,
		alignItems: "center",
		justifyContent: "center",
		marginBottom: 24,
	},
	secondaryButtonText: {
		color: colors.brand,
		fontFamily: fontFamily.medium,
		fontSize: 14,
	},
	footerContainer: {
		alignItems: "center",
		paddingTop: 8,
	},
	footerText: {
		color: "#71717A",
		fontFamily: fontFamily.regular,
		fontSize: 11,
		textAlign: "center",
		marginBottom: 2,
	},
	footerSubText: {
		color: "#52525B",
		fontFamily: fontFamily.regular,
		fontSize: 10,
		textAlign: "center",
	},
});
