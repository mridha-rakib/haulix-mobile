import { colors } from "@haulix/design-tokens";
import { getCurrentLocale, useTranslation } from "@haulix/i18n";
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
import { C18CheckIcon } from "../../src/components/discovery/C18BatchIcons";
import { FlowHeaderBack } from "../../src/components/navigation/FlowHeaderBack";
import {
	getC10DemoProfile,
	loadProfileEdits,
	subscribeToProfileEdits,
} from "../../src/fixtures/c10DemoProfile";
import { C20_RETAIL_DEFAULT_DATA } from "../../src/fixtures/c25ServiceReviews";

function useCustomerProfile(locale: "en" | "es") {
	const [profile, setProfile] = useState(() => getC10DemoProfile(locale));
	useEffect(() => {
		loadProfileEdits().then(() => setProfile(getC10DemoProfile(locale)));
		return subscribeToProfileEdits(() => setProfile(getC10DemoProfile(locale)));
	}, [locale]);
	return { profile };
}

export default function RetailCollectionReadinessScreen() {
	const { t } = useTranslation();
	const currentLocale = getCurrentLocale() as "en" | "es";
	const router = useRouter();
	const isEs = currentLocale === "es";
	const { profile } = useCustomerProfile(currentLocale);

	const customerName =
		profile?.name ||
		(isEs
			? C20_RETAIL_DEFAULT_DATA.customerNameEs
			: C20_RETAIL_DEFAULT_DATA.customerNameEn);

	const handleBack = useCallback(() => {
		if (router.canGoBack()) {
			router.back();
		} else {
			router.push("/retail-intake");
		}
	}, [router]);

	useEffect(() => {
		const sub = BackHandler.addEventListener("hardwareBackPress", () => {
			handleBack();
			return true;
		});
		return () => sub.remove();
	}, [handleBack]);

	const handleReviewIntake = useCallback(() => {
		router.push("/retail-intake-review");
	}, [router]);

	const handleMissingOrder = useCallback(() => {
		router.push("/retail-order-missing");
	}, [router]);

	return (
		<HaulixSafeArea>
			<View style={styles.container}>
				<FlowHeaderBack
					onBack={handleBack}
					backA11y={t("c20retail.backA11y")}
					testID="c20retail-header-back"
				/>

				<ScrollView
					style={styles.scrollView}
					contentContainerStyle={styles.scrollContent}
					showsVerticalScrollIndicator={false}
					testID="c20retail-scroll-container"
				>
					{/* Step Indicator */}
					<View style={styles.stepChipContainer} testID="c20retail-step-chip">
						<Text style={styles.stepChipLeft}>
							{t("c20retail.stepIndicator")}
						</Text>
						<Text style={styles.stepChipRight}>{t("c20retail.stepSub")}</Text>
					</View>

					{/* Screen Heading */}
					<View style={styles.headerSection}>
						<Text style={styles.mainTitle}>{t("c20retail.title")}</Text>
						<Text style={styles.subtitle}>{t("c20retail.subtitle")}</Text>
					</View>

					{/* Context Badge */}
					<View style={styles.contextBadge} testID="c20retail-context-badge">
						<View style={styles.contextIconWrap}>
							<C18CheckIcon size={17} color={colors.brand} />
						</View>
						<Text style={styles.contextBadgeText}>
							{t("c20retail.contextBadge")}
						</Text>
					</View>

					{/* Section 1: Store Pickup Confirmation */}
					<View style={styles.card} testID="c20retail-pickup-card">
						<Text style={styles.cardTitle}>
							{t("c20retail.sectionPickupTitle")}
						</Text>

						<View style={styles.detailRow}>
							<Text style={styles.detailLabel}>
								{t("c20retail.labelCustomer")}
							</Text>
							<Text style={styles.detailValue}>{customerName}</Text>
						</View>

						<View style={styles.detailRow}>
							<Text style={styles.detailLabel}>
								{t("c20retail.labelRetailer")}
							</Text>
							<Text style={styles.detailValue}>
								{t("c20retail.valueRetailer")}
							</Text>
						</View>

						<View style={styles.detailRow}>
							<Text style={styles.detailLabel}>
								{t("c20retail.labelStoreLocation")}
							</Text>
							<Text style={styles.detailValue}>
								{t("c20retail.valueStoreLocation")}
							</Text>
						</View>

						<View style={styles.detailRow}>
							<Text style={styles.detailLabel}>
								{t("c20retail.labelOrderNumber")}
							</Text>
							<Text style={styles.detailValue}>
								{t("c20retail.valueOrderNumber")}
							</Text>
						</View>

						<View style={styles.detailRow}>
							<Text style={styles.detailLabel}>
								{t("c20retail.labelPickupContact")}
							</Text>
							<Text style={styles.detailValue}>
								{t("c20retail.valuePickupContact")}
							</Text>
						</View>

						<View style={styles.detailRow}>
							<Text style={styles.detailLabel}>
								{t("c20retail.labelRetailerReadiness")}
							</Text>
							<Text style={styles.detailValue}>
								{t("c20retail.valueRetailerReadiness")}
							</Text>
						</View>
					</View>

					{/* Section 2: Delivery */}
					<View style={styles.card} testID="c20retail-delivery-card">
						<Text style={styles.cardTitle}>
							{t("c20retail.sectionDeliveryTitle")}
						</Text>

						<View style={styles.detailRow}>
							<Text style={styles.detailLabel}>
								{t("c20retail.labelDropoff")}
							</Text>
							<Text style={styles.detailValue}>
								{t("c20retail.valueDropoff")}
							</Text>
						</View>

						<View style={styles.detailRow}>
							<Text style={styles.detailLabel}>
								{t("c20retail.labelExpectedItems")}
							</Text>
							<Text style={styles.detailValue}>
								{t("c20retail.valueExpectedItems")}
							</Text>
						</View>

						<View style={styles.detailRow}>
							<Text style={styles.detailLabel}>
								{t("c20retail.labelEstimatedLoad")}
							</Text>
							<Text style={styles.detailValue}>
								{t("c20retail.valueEstimatedLoad")}
							</Text>
						</View>

						<View style={styles.detailRow}>
							<Text style={styles.detailLabel}>
								{t("c20retail.labelCollectionNotes")}
							</Text>
							<Text style={styles.detailValue}>
								{t("c20retail.valueCollectionNotes")}
							</Text>
						</View>
					</View>

					{/* Section 3: Manual Collection Exception Review */}
					<View style={styles.card} testID="c20retail-exception-card">
						<Text style={styles.cardTitle}>
							{t("c20retail.sectionExceptionTitle")}
						</Text>

						<View style={styles.reviewBadgeRow}>
							<C18CheckIcon size={16} color={colors.secondaryText} />
							<Text style={styles.reviewBadgeText}>
								{t("c20retail.reviewBadge")}
							</Text>
						</View>

						<Text style={styles.bulletText}>
							{t("c20retail.exceptionLine1")}
						</Text>
						<Text style={styles.bulletText}>
							{t("c20retail.exceptionLine2")}
						</Text>
					</View>

					{/* Actions */}
					<View style={styles.actionContainer}>
						<Pressable
							style={({ pressed }) => [
								styles.primaryButton,
								pressed && styles.primaryButtonPressed,
							]}
							onPress={handleReviewIntake}
							accessibilityRole="button"
							accessibilityLabel={t("c20retail.primaryCta")}
							testID="c20retail-primary-cta"
						>
							<Text style={styles.primaryButtonText}>
								{t("c20retail.primaryCta")}
							</Text>
						</Pressable>

						<Pressable
							style={({ pressed }) => [
								styles.secondaryButton,
								pressed && styles.secondaryButtonPressed,
							]}
							onPress={handleMissingOrder}
							accessibilityRole="button"
							accessibilityLabel={t("c20retail.secondaryCta")}
							testID="c20retail-secondary-cta"
						>
							<Text style={styles.secondaryButtonText}>
								{t("c20retail.secondaryCta")}
							</Text>
						</Pressable>
					</View>

					{/* Footer Notes */}
					<View style={styles.footerContainer}>
						<Text style={styles.footerText}>{t("c20retail.footerDemo")}</Text>
						<Text style={styles.footerText}>{t("c20retail.footerSrs")}</Text>
					</View>
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
	scrollView: {
		flex: 1,
	},
	scrollContent: {
		paddingHorizontal: 22,
		paddingTop: 10,
		paddingBottom: 40,
		gap: 16,
	},
	stepChipContainer: {
		flexDirection: "row",
		alignItems: "center",
		backgroundColor: colors.surface,
		paddingHorizontal: 12,
		height: 33,
		borderRadius: 9,
		gap: 7,
	},
	stepChipLeft: {
		fontFamily: "Inter-SemiBold",
		fontSize: 10,
		fontWeight: "600",
		color: colors.brand,
	},
	stepChipRight: {
		fontFamily: "Inter-Medium",
		fontSize: 10,
		fontWeight: "500",
		color: colors.secondaryText,
	},
	headerSection: {
		gap: 9,
	},
	mainTitle: {
		fontFamily: "Inter-Bold",
		fontSize: 25,
		fontWeight: "700",
		color: colors.primaryText,
		lineHeight: 30,
	},
	subtitle: {
		fontFamily: "Inter-Regular",
		fontSize: 12,
		color: colors.secondaryText,
		lineHeight: 16,
	},
	contextBadge: {
		flexDirection: "row",
		alignItems: "center",
		backgroundColor: "#1a2510",
		paddingHorizontal: 12,
		height: 39,
		borderRadius: 9,
		gap: 8,
	},
	contextIconWrap: {
		width: 17,
		height: 17,
		justifyContent: "center",
		alignItems: "center",
	},
	contextBadgeText: {
		fontFamily: "Inter-SemiBold",
		fontSize: 11,
		fontWeight: "600",
		color: colors.brand,
	},
	card: {
		backgroundColor: colors.surface,
		borderRadius: 17,
		padding: 16,
		gap: 12,
	},
	cardTitle: {
		fontFamily: "Inter-SemiBold",
		fontSize: 16,
		fontWeight: "600",
		color: colors.primaryText,
	},
	detailRow: {
		backgroundColor: colors.elevated,
		borderRadius: 10,
		paddingHorizontal: 12,
		paddingVertical: 10,
		gap: 4,
	},
	detailLabel: {
		fontFamily: "Inter-Medium",
		fontSize: 11,
		fontWeight: "500",
		color: colors.secondaryText,
	},
	detailValue: {
		fontFamily: "Inter-SemiBold",
		fontSize: 12,
		fontWeight: "600",
		color: colors.primaryText,
	},
	reviewBadgeRow: {
		flexDirection: "row",
		alignItems: "center",
		alignSelf: "flex-start",
		backgroundColor: colors.elevated,
		paddingHorizontal: 10,
		height: 32,
		borderRadius: 8,
		gap: 8,
	},
	reviewBadgeText: {
		fontFamily: "Inter-SemiBold",
		fontSize: 11,
		fontWeight: "600",
		color: colors.secondaryText,
	},
	bulletText: {
		fontFamily: "Inter-Regular",
		fontSize: 12,
		color: colors.secondaryText,
		lineHeight: 18,
	},
	actionContainer: {
		gap: 11,
		marginTop: 4,
	},
	primaryButton: {
		backgroundColor: colors.brand,
		height: 52,
		borderRadius: 12,
		justifyContent: "center",
		alignItems: "center",
		paddingHorizontal: 20,
	},
	primaryButtonPressed: {
		opacity: 0.85,
	},
	primaryButtonText: {
		fontFamily: "Inter-SemiBold",
		fontSize: 14,
		fontWeight: "600",
		color: colors.background,
	},
	secondaryButton: {
		backgroundColor: colors.surface,
		borderWidth: 1,
		borderColor: "#35403b",
		height: 52,
		borderRadius: 12,
		justifyContent: "center",
		alignItems: "center",
		paddingHorizontal: 20,
	},
	secondaryButtonPressed: {
		backgroundColor: colors.elevated,
	},
	secondaryButtonText: {
		fontFamily: "Inter-SemiBold",
		fontSize: 13,
		fontWeight: "600",
		color: colors.brand,
	},
	footerContainer: {
		gap: 6,
		marginTop: 4,
	},
	footerText: {
		fontFamily: "Inter-Regular",
		fontSize: 10,
		color: "#788580",
		lineHeight: 14,
	},
});
