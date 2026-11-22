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

export default function AIReviewHandoffScreen() {
	const { t } = useTranslation();
	const router = useRouter();

	const [noticeMessage, setNoticeMessage] = useState<string | null>(null);

	const handleBack = useCallback(() => {
		if (router.canGoBack()) {
			router.back();
		} else {
			router.push("/intake-draft-saved");
		}
	}, [router]);

	useEffect(() => {
		const sub = BackHandler.addEventListener("hardwareBackPress", () => {
			handleBack();
			return true;
		});
		return () => sub.remove();
	}, [handleBack]);

	const handleBeginAIReview = useCallback(() => {
		router.push("/ai-recognition");
	}, [router]);

	const handleEditItems = useCallback(() => {
		router.push("/item-inventory");
	}, [router]);

	return (
		<HaulixSafeArea>
			<View style={styles.container}>
				<FlowHeaderBack
					onBack={handleBack}
					backA11y={t("w03handoff.backA11y")}
					testID="w03handoff-header-back"
				/>

				<ScrollView
					style={styles.scrollView}
					contentContainerStyle={styles.scrollContent}
					showsVerticalScrollIndicator={false}
					testID="w03handoff-scroll-container"
				>
					{/* Upcoming Notice Banner */}
					{noticeMessage && (
						<View style={styles.noticeBanner} testID="w03handoff-notice-banner">
							<Text style={styles.noticeText}>{noticeMessage}</Text>
							<Pressable
								onPress={() => setNoticeMessage(null)}
								accessibilityRole="button"
								accessibilityLabel={t("w03handoff.noticeDismiss")}
								testID="w03handoff-notice-dismiss"
							>
								<Text style={styles.noticeDismissText}>
									{t("w03handoff.noticeDismiss")}
								</Text>
							</Pressable>
						</View>
					)}

					{/* Step Indicator */}
					<View style={styles.stepChipContainer} testID="w03handoff-step-chip">
						<Text style={styles.stepChipLeft}>
							{t("w03handoff.stepIndicator")}
						</Text>
						<Text style={styles.stepChipRight}>{t("w03handoff.stepSub")}</Text>
					</View>

					{/* Screen Heading */}
					<View style={styles.headerSection}>
						<Text style={styles.mainTitle}>{t("w03handoff.title")}</Text>
						<Text style={styles.subtitle}>{t("w03handoff.subtitle")}</Text>
					</View>

					{/* Context Badge */}
					<View style={styles.contextBadge} testID="w03handoff-context-badge">
						<View style={styles.contextIconWrap}>
							<C18CheckIcon size={17} color={colors.brand} />
						</View>
						<Text style={styles.contextBadgeText}>
							{t("w03handoff.contextBadge")}
						</Text>
					</View>

					{/* Section 1: Input payload for W03 */}
					<View style={styles.card} testID="w03handoff-payload-card">
						<Text style={styles.cardTitle}>
							{t("w03handoff.sectionPayloadTitle")}
						</Text>
						<Text style={styles.cardBodyText}>
							{t("w03handoff.payloadLine1")}
						</Text>
						<Text style={styles.cardBodyText}>
							{t("w03handoff.payloadLine2")}
						</Text>
						<Text style={styles.cardBodyText}>
							{t("w03handoff.payloadLine3")}
						</Text>
						<Text style={styles.cardBodyText}>
							{t("w03handoff.payloadLine4")}
						</Text>
					</View>

					{/* Section 2: Handoff anchor — not a priced quote */}
					<View style={styles.card} testID="w03handoff-anchor-card">
						<Text style={styles.cardTitle}>
							{t("w03handoff.sectionAnchorTitle")}
						</Text>

						<View style={styles.reviewBadgeRow}>
							<C18CheckIcon size={16} color={colors.secondaryText} />
							<Text style={styles.reviewBadgeText}>
								{t("w03handoff.reviewBadge")}
							</Text>
						</View>

						<Text style={styles.cardBodyText}>
							{t("w03handoff.anchorGuidance")}
						</Text>
						<Text style={styles.cardBodyText}>
							{t("w03handoff.anchorLine1")}
						</Text>
						<Text style={styles.cardBodyText}>
							{t("w03handoff.anchorLine2")}
						</Text>
					</View>

					{/* Actions */}
					<View style={styles.actionContainer}>
						<Pressable
							style={({ pressed }) => [
								styles.primaryButton,
								pressed && styles.primaryButtonPressed,
							]}
							onPress={handleBeginAIReview}
							accessibilityRole="button"
							accessibilityLabel={t("w03handoff.primaryCta")}
							testID="w03handoff-primary-cta"
						>
							<Text style={styles.primaryButtonText}>
								{t("w03handoff.primaryCta")}
							</Text>
						</Pressable>

						<Pressable
							style={({ pressed }) => [
								styles.secondaryButton,
								pressed && styles.secondaryButtonPressed,
							]}
							onPress={handleEditItems}
							accessibilityRole="button"
							accessibilityLabel={t("w03handoff.secondaryCta")}
							testID="w03handoff-secondary-cta"
						>
							<Text style={styles.secondaryButtonText}>
								{t("w03handoff.secondaryCta")}
							</Text>
						</Pressable>
					</View>

					{/* Footer Notes */}
					<View style={styles.footerContainer}>
						<Text style={styles.footerText}>{t("w03handoff.footerDemo")}</Text>
						<Text style={styles.footerText}>{t("w03handoff.footerSrs")}</Text>
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
