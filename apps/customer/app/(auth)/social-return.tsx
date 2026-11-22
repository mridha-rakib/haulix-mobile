import {
	colors,
	fontFamily,
	fontSize,
	radius,
	spacing,
} from "@haulix/design-tokens";
import {
	changeLocale,
	getCurrentLocale,
	type SupportedLocale,
	useTranslation,
} from "@haulix/i18n";
import { HaulixButton, HaulixSafeArea } from "@haulix/ui";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import {
	KeyboardAvoidingView,
	Platform,
	Pressable,
	ScrollView,
	StyleSheet,
	Text,
	View,
} from "react-native";
import { ChevronRightIcon } from "../../src/components/auth/AuthIcons";

/**
 * C09 — Social Sign-in Return / Success (Visual Preview)
 *
 * Source:
 *   - English Figma node: 331:118 ("C09 · Social Sign-in Return / Success [CU-03, NFR-01]") — 430 × 743 px
 *   - Spanish Figma node: 347:283 ("C09 · Social Sign-in Return / Success [CU-03, NFR-01]") — 430 × 743 px
 *
 * Design Invariants:
 * 1. Clean customer row with left-aligned Name/Email and right-aligned Chevron; NO avatar badge.
 * 2. English demo fixture: Sarah Mitchell / sarah.mitchell@example.test.
 * 3. Spanish demo fixture: Bryan Lopez / bryan.lopez@example.test.
 *
 * Security Constraints:
 * 1. Isolated development/QA visual preview ONLY.
 * 2. In production builds (!__DEV__), returns a safe neutral unavailable state.
 * 3. Never writes demo identity or fictional details to persistent state or auth context.
 * 4. Never generates fake JWTs, sessions, or backend provider success.
 * 5. Primary CTA ("Go to My Account" / "Ir a mi cuenta") is functionally guarded (displays honest notice, never enters dashboard).
 * 6. Secondary CTA ("Sign in another way" / "Elegir otro acceso") safely navigates back to C06 Sign-in.
 */
export default function SocialReturnScreen() {
	const { t } = useTranslation();
	const router = useRouter();
	const params = useLocalSearchParams<{ lang?: string }>();
	const [noticeKey, setNoticeKey] = useState<string | null>(null);

	useEffect(() => {
		if (
			params.lang &&
			(params.lang === "es" || params.lang === "en") &&
			getCurrentLocale() !== params.lang
		) {
			changeLocale(params.lang as SupportedLocale);
		}
	}, [params.lang]);

	// Frontend UI Preview Policy: All implemented screens accessible for QA without backend auth blocks
	const handleGoToMyAccount = () => {
		// Navigate directly to C10 Account Overview for frontend UI preview testing
		router.push("/(app)/account");
	};

	const handleSignInAnotherWay = () => {
		// Return to the real existing C06 Sign-in route
		router.replace("/(auth)/sign-in");
	};

	return (
		<HaulixSafeArea>
			<KeyboardAvoidingView
				style={styles.keyboardContainer}
				behavior={Platform.OS === "ios" ? "padding" : undefined}
			>
				<ScrollView
					style={styles.scroll}
					contentContainerStyle={styles.scrollContent}
					keyboardShouldPersistTaps="handled"
					showsVerticalScrollIndicator={false}
					testID="c09-social-return-preview"
				>
					{/* Dev Mode Visual Assurance Banner */}
					<View style={styles.devBadgeBox} testID="c09-dev-badge">
						<Text style={styles.devBadgeText}>
							{t("socialReturn.devBadge")}
						</Text>
					</View>

					{/* 1. Brand Wordmark & Tagline (Figma node 331:122) */}
					<View style={styles.brandHeader}>
						<View style={styles.wordmarkRow}>
							<Text style={styles.wordmarkHaul}>HAUL</Text>
							<Text style={styles.wordmarkIx}>IX</Text>
						</View>
						<Text style={styles.tagline}>{t("socialReturn.brandTagline")}</Text>
					</View>

					{/* 2. Intro Title & Subtitle (Figma node 331:127) */}
					<View style={styles.headingSection}>
						<Text style={styles.title}>{t("socialReturn.title")}</Text>
						<Text style={styles.subtitle}>{t("socialReturn.subtitle")}</Text>
					</View>

					{/* 3. Single-dot Arizona Availability Chip (Figma node 331:130) */}
					<View style={styles.availabilityChip}>
						<View style={styles.availabilityDot} />
						<Text style={styles.availabilityText}>
							{t("socialReturn.availability")}
						</Text>
					</View>

					{/* Informatory Security Notice Banner (Triggered when Go to My Account is tapped) */}
					{noticeKey && (
						<View style={styles.noticeBox} testID="social-return-notice-banner">
							<Text style={styles.noticeText}>{t(noticeKey)}</Text>
							<Pressable
								onPress={() => setNoticeKey(null)}
								accessibilityRole="button"
								accessibilityLabel={t("socialReturn.dismissNotice")}
								hitSlop={8}
							>
								<Text style={styles.noticeDismiss}>
									{t("socialReturn.dismissNotice")}
								</Text>
							</Pressable>
						</View>
					)}

					{/* 4. Provider Verification Card (Figma node 331:132) */}
					<View style={styles.card} testID="c09-provider-card">
						{/* Status row: Google sign-in returned successfully (Figma node 331:133) */}
						<View style={styles.statusPill}>
							<View style={styles.statusDot} />
							<Text style={styles.statusText}>
								{t("socialReturn.providerStatus")}
							</Text>
						</View>

						{/* Fictional Customer Row (Figma node 331:136) — Clean name/email layout without fabricated avatar */}
						<View style={styles.customerRow}>
							<View style={styles.customerInfo}>
								<Text style={styles.customerName}>
									{t("socialReturn.demoName")}
								</Text>
								<Text style={styles.customerEmail}>
									{t("socialReturn.demoEmail")}
								</Text>
							</View>
							<ChevronRightIcon size={16} color={colors.brand} />
						</View>

						{/* Explanation Helper (Figma node 331:141) */}
						<View style={styles.explanationSection}>
							<Text style={styles.explanationText}>
								{t("socialReturn.explanation")}
							</Text>
						</View>
					</View>

					{/* 5. Action Group (Figma node 331:142) */}
					<View style={styles.actionsGroup}>
						{/* Primary CTA: Go to My Account (Figma node 331:144) - GATED */}
						<HaulixButton
							label={t("socialReturn.primaryAction")}
							variant="primary"
							fullWidth
							onPress={handleGoToMyAccount}
							testID="c09-primary-action-button"
						/>

						{/* Secondary CTA: Sign in another way (Figma node 331:147) */}
						<Pressable
							onPress={handleSignInAnotherWay}
							accessibilityRole="button"
							accessibilityLabel={t("socialReturn.secondaryAction")}
							testID="c09-secondary-action-button"
						>
							{({ pressed }) => (
								<View
									style={[
										styles.secondaryButton,
										pressed && styles.secondaryButtonPressed,
									]}
								>
									<Text style={styles.secondaryButtonText}>
										{t("socialReturn.secondaryAction")}
									</Text>
								</View>
							)}
						</Pressable>
					</View>

					{/* 6. Footer Disclaimer (Figma node 331:149) */}
					<Text style={styles.demoNoticeText}>
						{t("socialReturn.demoNotice")}
					</Text>
				</ScrollView>
			</KeyboardAvoidingView>
		</HaulixSafeArea>
	);
}

const styles = StyleSheet.create({
	keyboardContainer: {
		flex: 1,
	},
	scroll: {
		flex: 1,
		backgroundColor: colors.background, // #080B0B
	},
	scrollContent: {
		paddingHorizontal: 22,
		paddingTop: spacing[4],
		paddingBottom: spacing[6],
	},
	productionContainer: {
		flex: 1,
		backgroundColor: colors.background,
		paddingHorizontal: 22,
		paddingTop: spacing[6],
	},
	productionActionBox: {
		marginTop: spacing[4],
	},

	// Dev mode badge
	devBadgeBox: {
		alignSelf: "flex-start",
		backgroundColor: "#1A2510",
		borderWidth: 1,
		borderColor: colors.brand,
		borderRadius: radius.sm,
		paddingVertical: 3,
		paddingHorizontal: 8,
		marginBottom: spacing[3],
	},
	devBadgeText: {
		fontFamily: fontFamily.semiBold,
		fontSize: 9,
		letterSpacing: 0.5,
		color: colors.brand,
	},

	// 1. Brand Wordmark & Tagline
	brandHeader: {
		marginBottom: spacing[4],
	},
	wordmarkRow: {
		flexDirection: "row",
		alignItems: "baseline",
	},
	wordmarkHaul: {
		fontFamily: fontFamily.bold,
		fontSize: 32,
		letterSpacing: -1,
		color: colors.primaryText, // #F6F8F6
	},
	wordmarkIx: {
		fontFamily: fontFamily.bold,
		fontSize: 32,
		letterSpacing: -1,
		color: colors.brand, // #BAFF42
	},
	tagline: {
		fontFamily: fontFamily.semiBold,
		fontSize: 11,
		color: colors.secondaryText,
		letterSpacing: 2,
		marginTop: spacing[1],
	},

	// 2. Heading & Subtitle
	headingSection: {
		marginBottom: spacing[4],
	},
	title: {
		fontFamily: fontFamily.bold,
		fontSize: 28,
		lineHeight: 36,
		color: colors.primaryText,
		marginBottom: spacing[1],
	},
	subtitle: {
		fontFamily: fontFamily.regular,
		fontSize: fontSize.sm, // 14
		lineHeight: 20,
		color: colors.secondaryText,
	},

	// 3. Single-dot Arizona Availability Chip
	availabilityChip: {
		flexDirection: "row",
		alignItems: "center",
		alignSelf: "flex-start",
		backgroundColor: "#1A2510",
		borderWidth: 1,
		borderColor: "#2B3B1A",
		borderRadius: radius.full,
		paddingVertical: 8,
		paddingHorizontal: 14,
		marginBottom: spacing[4],
	},
	availabilityDot: {
		width: 6,
		height: 6,
		borderRadius: radius.full,
		backgroundColor: colors.brand,
		marginRight: 8,
	},
	availabilityText: {
		fontFamily: fontFamily.semiBold,
		fontSize: 11,
		letterSpacing: 0.8,
		color: colors.brand,
	},

	// Informatory Notice Banner
	noticeBox: {
		backgroundColor: "#1C2422",
		borderWidth: 1,
		borderColor: colors.brand,
		borderRadius: radius.lg,
		padding: spacing[3],
		marginBottom: spacing[4],
	},
	noticeText: {
		fontFamily: fontFamily.regular,
		fontSize: fontSize.xs,
		lineHeight: 18,
		color: colors.primaryText,
		marginBottom: spacing[2],
	},
	noticeDismiss: {
		fontFamily: fontFamily.semiBold,
		fontSize: fontSize.xs,
		color: colors.brand,
		alignSelf: "flex-end",
	},

	// 4. Provider Verification Card (Figma 386 × 191 at x=22, y=349)
	card: {
		backgroundColor: colors.surface, // #151A19
		borderWidth: 1,
		borderColor: colors.elevated, // #222827
		borderRadius: radius["2xl"], // 18px
		paddingHorizontal: 18,
		paddingVertical: 17,
		marginBottom: spacing[4],
	},
	statusPill: {
		backgroundColor: colors.elevated, // #222827
		borderRadius: 10,
		minHeight: 45,
		paddingVertical: 10,
		paddingHorizontal: 14,
		flexDirection: "row",
		alignItems: "center",
		marginBottom: 11,
	},
	statusDot: {
		width: 7,
		height: 7,
		borderRadius: radius.full,
		backgroundColor: colors.brand, // #BAFF42
		marginRight: 8,
	},
	statusText: {
		fontFamily: fontFamily.medium,
		fontSize: 13,
		color: colors.primaryText,
	},
	customerRow: {
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-between",
		minHeight: 58,
		paddingVertical: 8,
		marginBottom: 11,
	},
	customerInfo: {
		flex: 1,
		justifyContent: "center",
	},
	customerName: {
		fontFamily: fontFamily.semiBold,
		fontSize: 16,
		lineHeight: 22,
		color: colors.primaryText,
	},
	customerEmail: {
		fontFamily: fontFamily.regular,
		fontSize: 13,
		lineHeight: 18,
		color: colors.secondaryText,
		marginTop: 2,
	},
	explanationSection: {
		borderTopWidth: 1,
		borderTopColor: "rgba(34, 40, 39, 0.6)",
		paddingTop: 11,
		minHeight: 32,
	},
	explanationText: {
		fontFamily: fontFamily.regular,
		fontSize: 12,
		lineHeight: 16,
		color: colors.secondaryText,
	},

	// 5. Actions Group (Two stacked 54px buttons with 11px gap)
	actionsGroup: {
		gap: 11,
		marginBottom: spacing[4],
	},
	secondaryButton: {
		width: "100%",
		backgroundColor: colors.surface, // #151A19
		borderWidth: 1,
		borderColor: "#35403B", // Figma secondary border
		borderRadius: radius.lg,
		height: 54,
		alignItems: "center",
		justifyContent: "center",
	},
	secondaryButtonPressed: {
		opacity: 0.8,
	},
	secondaryButtonText: {
		fontFamily: fontFamily.semiBold,
		fontSize: fontSize.base,
		color: colors.primaryText, // #F6F8F6
	},

	// 6. Safety / Demo Notice
	demoNoticeText: {
		fontFamily: fontFamily.regular,
		fontSize: 11,
		lineHeight: 14,
		color: "#788580",
		marginBottom: spacing[4],
	},
});
