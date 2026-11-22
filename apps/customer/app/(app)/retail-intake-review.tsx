import { colors } from "@haulix/design-tokens";
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
import { C18CheckIcon } from "../../src/components/discovery/C18BatchIcons";
import { FlowHeaderBack } from "../../src/components/navigation/FlowHeaderBack";

export default function RetailIntakeReviewScreen() {
	const { t } = useTranslation();
	const router = useRouter();

	const [noticeMessage, setNoticeMessage] = useState<string | null>(null);

	const handleBack = useCallback(() => {
		if (router.canGoBack()) {
			router.back();
		} else {
			router.push("/retail-collection-readiness");
		}
	}, [router]);

	useEffect(() => {
		const sub = BackHandler.addEventListener("hardwareBackPress", () => {
			handleBack();
			return true;
		});
		return () => sub.remove();
	}, [handleBack]);

	const handleConfirmIntake = useCallback(() => {
		router.push("/retail-ai-handoff");
	}, [router]);

	const handleEditRetailOrder = useCallback(() => {
		router.push("/retail-collection-readiness");
	}, [router]);

	return (
		<HaulixSafeArea>
			<View style={styles.container}>
				<FlowHeaderBack
					onBack={handleBack}
					backA11y={t("c21retail.backA11y")}
					testID="c21retail-header-back"
				/>

				<ScrollView
					style={styles.scrollView}
					contentContainerStyle={styles.scrollContent}
					showsVerticalScrollIndicator={false}
					testID="c21retail-scroll-container"
				>
					{/* Upcoming Notice Banner */}
					{noticeMessage && (
						<View style={styles.noticeBanner} testID="c21retail-notice-banner">
							<Text style={styles.noticeText}>{noticeMessage}</Text>
							<Pressable
								onPress={() => setNoticeMessage(null)}
								accessibilityRole="button"
								accessibilityLabel={t("c21retail.noticeDismiss")}
								testID="c21retail-notice-dismiss"
							>
								<Text style={styles.noticeDismissText}>
									{t("c21retail.noticeDismiss")}
								</Text>
							</Pressable>
						</View>
					)}

					{/* Step Indicator */}
					<View style={styles.stepChipContainer} testID="c21retail-step-chip">
						<Text style={styles.stepChipLeft}>
							{t("c21retail.stepIndicator")}
						</Text>
						<Text style={styles.stepChipRight}>{t("c21retail.stepSub")}</Text>
					</View>

					{/* Screen Heading */}
					<View style={styles.headerSection}>
						<Text style={styles.mainTitle}>{t("c21retail.title")}</Text>
						<Text style={styles.subtitle}>{t("c21retail.subtitle")}</Text>
					</View>

					{/* Context Badge */}
					<View style={styles.contextBadge} testID="c21retail-context-badge">
						<View style={styles.contextIconWrap}>
							<C18CheckIcon size={17} color={colors.brand} />
						</View>
						<Text style={styles.contextBadgeText}>
							{t("c21retail.contextBadge")}
						</Text>
					</View>

					{/* Section 1: Intake Data to Confirm */}
					<View style={styles.card} testID="c21retail-confirm-card">
						<Text style={styles.cardTitle}>
							{t("c21retail.sectionConfirmTitle")}
						</Text>
						<Text style={styles.cardBodyText}>
							{t("c21retail.confirmLine1")}
						</Text>
						<Text style={styles.cardBodyText}>
							{t("c21retail.confirmLine2")}
						</Text>
						<Text style={styles.cardBodyText}>
							{t("c21retail.confirmLine3")}
						</Text>
						<Text style={styles.cardBodyText}>
							{t("c21retail.confirmLine4")}
						</Text>
					</View>

					{/* Section 2: Scope and Policy Checks */}
					<View style={styles.card} testID="c21retail-policy-card">
						<Text style={styles.cardTitle}>
							{t("c21retail.sectionPolicyTitle")}
						</Text>

						<View style={styles.reviewBadgeRow}>
							<C18CheckIcon size={16} color={colors.secondaryText} />
							<Text style={styles.reviewBadgeText}>
								{t("c21retail.reviewBadge")}
							</Text>
						</View>

						<Text style={styles.cardBodyText}>
							{t("c21retail.policyLine1")}
						</Text>
						<Text style={styles.cardBodyText}>
							{t("c21retail.policyLine2")}
						</Text>
						<Text style={styles.cardBodyText}>
							{t("c21retail.policyLine3")}
						</Text>
					</View>

					{/* Actions */}
					<View style={styles.actionContainer}>
						<Pressable
							style={({ pressed }) => [
								styles.primaryButton,
								pressed && styles.primaryButtonPressed,
							]}
							onPress={handleConfirmIntake}
							accessibilityRole="button"
							accessibilityLabel={t("c21retail.primaryCta")}
							testID="c21retail-primary-cta"
						>
							<Text style={styles.primaryButtonText}>
								{t("c21retail.primaryCta")}
							</Text>
						</Pressable>

						<Pressable
							style={({ pressed }) => [
								styles.secondaryButton,
								pressed && styles.secondaryButtonPressed,
							]}
							onPress={handleEditRetailOrder}
							accessibilityRole="button"
							accessibilityLabel={t("c21retail.secondaryCta")}
							testID="c21retail-secondary-cta"
						>
							<Text style={styles.secondaryButtonText}>
								{t("c21retail.secondaryCta")}
							</Text>
						</Pressable>
					</View>

					{/* Footer Notes */}
					<View style={styles.footerContainer}>
						<Text style={styles.footerText}>{t("c21retail.footerDemo")}</Text>
						<Text style={styles.footerText}>{t("c21retail.footerSrs")}</Text>
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
	noticeBanner: {
		backgroundColor: "#1f2a18",
		borderWidth: 1,
		borderColor: colors.brand,
		borderRadius: 12,
		padding: 12,
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-between",
	},
	noticeText: {
		fontFamily: "Inter-Medium",
		fontSize: 12,
		color: colors.brand,
		flex: 1,
		lineHeight: 16,
	},
	noticeDismissText: {
		fontFamily: "Inter-SemiBold",
		fontSize: 12,
		color: colors.primaryText,
		marginLeft: 12,
		textDecorationLine: "underline",
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
	cardBodyText: {
		fontFamily: "Inter-Regular",
		fontSize: 12,
		color: colors.secondaryText,
		lineHeight: 18,
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
