import { colors, fontFamily } from "@haulix/design-tokens";
import { useTranslation } from "@haulix/i18n";
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
import { C18CheckIcon } from "../../src/components/discovery/C18BatchIcons";
import { FlowHeaderBack } from "../../src/components/navigation/FlowHeaderBack";
import {
	getC10DemoProfile,
	loadProfileEdits,
	subscribeToProfileEdits,
} from "../../src/fixtures/c10DemoProfile";
import { W03_F_DEFAULT_DATA } from "../../src/fixtures/c28AiHandoffs";

function useCustomerProfile(locale: "en" | "es") {
	const [profile, setProfile] = useState(() => getC10DemoProfile(locale));
	useEffect(() => {
		loadProfileEdits().then(() => setProfile(getC10DemoProfile(locale)));
		return subscribeToProfileEdits(() => setProfile(getC10DemoProfile(locale)));
	}, [locale]);
	return profile;
}

export default function FurnitureAIHandoffScreen() {
	const { t, i18n } = useTranslation();
	const router = useRouter();
	const params = useLocalSearchParams<{ previewLocale?: string }>();

	const currentLocale = (params.previewLocale ??
		(i18n?.language?.startsWith("es") ? "es" : "en")) as "en" | "es";
	const profile = useCustomerProfile(currentLocale);

	const customerName =
		currentLocale === "es" ? "Bryan Lopez Mendoza" : profile.name;
	const bookingId = W03_F_DEFAULT_DATA.bookingId;

	const [noticeMessage, setNoticeMessage] = useState<string | null>(null);

	const handleBack = useCallback(() => {
		if (router.canGoBack()) {
			router.back();
		} else {
			router.push("/furniture-intake-review");
		}
	}, [router]);

	useEffect(() => {
		const sub = BackHandler.addEventListener("hardwareBackPress", () => {
			handleBack();
			return true;
		});
		return () => sub.remove();
	}, [handleBack]);

	const handleStartReview = useCallback(() => {
		setNoticeMessage(t("w03fHandoff.noticeUpcomingC22"));
	}, [t]);

	const handleEditItems = useCallback(() => {
		router.push("/bulky-item-intake");
	}, [router]);

	return (
		<HaulixSafeArea>
			<View style={styles.container}>
				<FlowHeaderBack
					onBack={handleBack}
					backA11y={t("w03fHandoff.backA11y")}
					testID="w03f-header-back"
				/>

				<ScrollView
					style={styles.scrollView}
					contentContainerStyle={styles.scrollContent}
					showsVerticalScrollIndicator={false}
					testID="w03f-scroll-container"
				>
					{/* Upcoming Notice Banner */}
					{noticeMessage && (
						<View style={styles.noticeBanner} testID="w03f-notice-banner">
							<Text style={styles.noticeText}>{noticeMessage}</Text>
							<Pressable
								onPress={() => setNoticeMessage(null)}
								style={styles.noticeDismissButton}
								testID="w03f-notice-dismiss"
								accessibilityRole="button"
								accessibilityLabel={t("w03fHandoff.noticeDismiss")}
							>
								<Text style={styles.noticeDismissText}>
									{t("w03fHandoff.noticeDismiss")}
								</Text>
							</Pressable>
						</View>
					)}

					{/* Flow Step Marker */}
					<View style={styles.flowMarkerCard} testID="w03f-flow-marker">
						<Text style={styles.flowMarkerActive}>
							{t("w03fHandoff.stepIndicator")}
						</Text>
						<Text style={styles.flowMarkerSub}>{t("w03fHandoff.stepSub")}</Text>
					</View>

					{/* Screen Heading */}
					<View style={styles.headingSection}>
						<Text style={styles.screenTitle} testID="w03f-title">
							{t("w03fHandoff.title")}
						</Text>
						<Text style={styles.screenSubtitle} testID="w03f-subtitle">
							{t("w03fHandoff.subtitle")}
						</Text>
					</View>

					{/* Customer Context Badge */}
					<View style={styles.contextBadge} testID="w03f-context-badge">
						<View style={styles.contextBadgeIcon}>
							<C18CheckIcon width={17} height={17} color={colors.brand} />
						</View>
						<Text style={styles.contextBadgeText}>
							{`${customerName.toUpperCase()} · ${bookingId}`}
						</Text>
					</View>

					{/* Section: Payload for W03 */}
					<View style={styles.card} testID="w03f-payload-card">
						<Text style={styles.cardHeading}>
							{t("w03fHandoff.sectionPayloadTitle")}
						</Text>
						<Text style={styles.payloadText}>
							{`${bookingId} · ${customerName} · Furniture Pickup`}
						</Text>
						<Text style={styles.payloadText}>
							{currentLocale === "es"
								? W03_F_DEFAULT_DATA.payloadLine2Es
								: W03_F_DEFAULT_DATA.payloadLine2En}
						</Text>
						<Text style={styles.payloadText}>
							{currentLocale === "es"
								? W03_F_DEFAULT_DATA.payloadLine3Es
								: W03_F_DEFAULT_DATA.payloadLine3En}
						</Text>
						<Text style={styles.payloadText}>
							{currentLocale === "es"
								? W03_F_DEFAULT_DATA.payloadLine4Es
								: W03_F_DEFAULT_DATA.payloadLine4En}
						</Text>
					</View>

					{/* Section: Unresolved quote conditions */}
					<View style={styles.card} testID="w03f-anchor-card">
						<Text style={styles.cardHeading}>
							{t("w03fHandoff.sectionAnchorTitle")}
						</Text>
						<View
							style={styles.reviewBadgeContainer}
							testID="w03f-review-badge"
						>
							<C18CheckIcon
								width={16}
								height={16}
								color={colors.secondaryText}
							/>
							<Text style={styles.reviewBadgeText}>
								{t("w03fHandoff.reviewBadge")}
							</Text>
						</View>
						<Text style={styles.anchorText}>
							{currentLocale === "es"
								? W03_F_DEFAULT_DATA.guidanceLine1Es
								: W03_F_DEFAULT_DATA.guidanceLine1En}
						</Text>
						<Text style={styles.anchorText}>
							{currentLocale === "es"
								? W03_F_DEFAULT_DATA.guidanceLine2Es
								: W03_F_DEFAULT_DATA.guidanceLine2En}
						</Text>
						<Text style={styles.anchorText}>
							{currentLocale === "es"
								? W03_F_DEFAULT_DATA.guidanceLine3Es
								: W03_F_DEFAULT_DATA.guidanceLine3En}
						</Text>
					</View>

					{/* Action CTAs */}
					<View style={styles.actionGroup}>
						<Pressable
							onPress={handleStartReview}
							style={styles.primaryButton}
							testID="w03f-primary-cta"
							accessibilityRole="button"
							accessibilityLabel={t("w03fHandoff.primaryCta")}
						>
							<Text style={styles.primaryButtonText}>
								{t("w03fHandoff.primaryCta")}
							</Text>
						</Pressable>

						<Pressable
							onPress={handleEditItems}
							style={styles.secondaryButton}
							testID="w03f-secondary-cta"
							accessibilityRole="button"
							accessibilityLabel={t("w03fHandoff.secondaryCta")}
						>
							<Text style={styles.secondaryButtonText}>
								{t("w03fHandoff.secondaryCta")}
							</Text>
						</Pressable>
					</View>

					{/* Footer Demo Info */}
					<View style={styles.footerSection} testID="w03f-footer">
						<Text style={styles.footerText}>{t("w03fHandoff.footerDemo")}</Text>
						<Text style={styles.footerSubText}>
							{t("w03fHandoff.footerSrs")}
						</Text>
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
		paddingTop: 16,
		paddingBottom: 40,
	},
	noticeBanner: {
		backgroundColor: colors.surface,
		borderColor: colors.brand,
		borderWidth: 1,
		borderRadius: 12,
		padding: 14,
		marginBottom: 16,
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-between",
	},
	noticeText: {
		flex: 1,
		fontFamily: fontFamily.medium,
		fontSize: 13,
		color: colors.primaryText,
		lineHeight: 18,
		marginRight: 10,
	},
	noticeDismissButton: {
		paddingHorizontal: 12,
		paddingVertical: 6,
		backgroundColor: colors.brand,
		borderRadius: 8,
	},
	noticeDismissText: {
		fontFamily: fontFamily.semiBold,
		fontSize: 12,
		color: colors.background,
	},
	flowMarkerCard: {
		backgroundColor: colors.surface,
		height: 34,
		borderRadius: 9,
		flexDirection: "row",
		alignItems: "center",
		paddingHorizontal: 12,
		marginBottom: 16,
	},
	flowMarkerActive: {
		fontFamily: fontFamily.semiBold,
		fontSize: 10,
		color: colors.brand,
	},
	flowMarkerSub: {
		fontFamily: fontFamily.regular,
		fontSize: 10,
		color: "#788580",
	},
	headingSection: {
		marginBottom: 16,
	},
	screenTitle: {
		fontFamily: fontFamily.bold,
		fontSize: 25,
		color: colors.primaryText,
		lineHeight: 30,
		marginBottom: 6,
	},
	screenSubtitle: {
		fontFamily: fontFamily.regular,
		fontSize: 12,
		color: colors.secondaryText,
		lineHeight: 17,
	},
	contextBadge: {
		backgroundColor: "#1A2510",
		borderRadius: 9,
		paddingHorizontal: 12,
		paddingVertical: 9,
		flexDirection: "row",
		alignItems: "center",
		marginBottom: 16,
	},
	contextBadgeIcon: {
		marginRight: 7,
	},
	contextBadgeText: {
		fontFamily: fontFamily.semiBold,
		fontSize: 11,
		color: colors.brand,
		letterSpacing: 0.3,
	},
	card: {
		backgroundColor: colors.surface,
		borderRadius: 17,
		padding: 16,
		marginBottom: 16,
		borderWidth: 1,
		borderColor: "#35403B",
	},
	cardHeading: {
		fontFamily: fontFamily.semiBold,
		fontSize: 16,
		color: colors.primaryText,
		marginBottom: 12,
	},
	payloadText: {
		fontFamily: fontFamily.regular,
		fontSize: 12,
		color: colors.secondaryText,
		lineHeight: 18,
		marginBottom: 8,
	},
	reviewBadgeContainer: {
		backgroundColor: colors.elevated,
		borderRadius: 8,
		paddingHorizontal: 10,
		paddingVertical: 6,
		flexDirection: "row",
		alignItems: "center",
		alignSelf: "flex-start",
		marginBottom: 12,
	},
	reviewBadgeText: {
		fontFamily: fontFamily.semiBold,
		fontSize: 11,
		color: colors.secondaryText,
		marginLeft: 6,
	},
	anchorText: {
		fontFamily: fontFamily.regular,
		fontSize: 12,
		color: colors.secondaryText,
		lineHeight: 18,
		marginBottom: 8,
	},
	actionGroup: {
		gap: 11,
		marginTop: 8,
		marginBottom: 20,
	},
	primaryButton: {
		backgroundColor: colors.brand,
		height: 52,
		borderRadius: 12,
		alignItems: "center",
		justifyContent: "center",
		paddingHorizontal: 20,
	},
	primaryButtonText: {
		fontFamily: fontFamily.semiBold,
		fontSize: 14,
		color: colors.background,
	},
	secondaryButton: {
		backgroundColor: colors.surface,
		borderColor: "#35403B",
		borderWidth: 1,
		height: 52,
		borderRadius: 12,
		alignItems: "center",
		justifyContent: "center",
		paddingHorizontal: 20,
	},
	secondaryButtonText: {
		fontFamily: fontFamily.semiBold,
		fontSize: 13,
		color: colors.brand,
	},
	footerSection: {
		alignItems: "flex-start",
		gap: 4,
	},
	footerText: {
		fontFamily: fontFamily.regular,
		fontSize: 10,
		color: "#788580",
	},
	footerSubText: {
		fontFamily: fontFamily.regular,
		fontSize: 10,
		color: "#788580",
	},
});
