import {
	colors,
	fontFamily,
	fontSize,
	radius,
	spacing,
} from "@haulix/design-tokens";
import { useTranslation } from "@haulix/i18n";
import { HaulixButton, HaulixSafeArea } from "@haulix/ui";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useState } from "react";
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
import { OtpInput } from "../../src/components/auth/OtpInput";

/**
 * C08 — Phone Verification / OTP (English Default)
 *
 * Source:
 *   - Figma node: 331:75 ("C08 · Phone Verification / Default [CU-02, NFR-01]")
 *   - Reference Artboard: 430 × 788 px
 *
 * Requirements:
 * 1. HAULIX wordmark and WE HAUL IT ALL. tagline.
 * 2. Heading "Verify your number." and description "Enter the one-time code sent to the registered demo number."
 * 3. Single-dot Phoenix availability chip "● PHOENIX, ARIZONA • HAULIX CUSTOMER"
 * 4. Dark card with reference number +1 602-555-0142 (Figma demo fixture).
 * 5. Six OTP slots, each 50×58px in 430px design, 8px gaps, first slot outlined lime at rest.
 * 6. Helper: "Code expires after the verification window. Never share this code."
 * 7. "Did not receive a code?" row, hint "Resend available after cooldown", right lime chevron.
 * 8. Primary CTA "Verify & Continue" and secondary "Change phone number".
 * 9. Visible safety annotation "DEMO ONLY • No real authentication or messaging".
 * 10. Honest no-backend state: no fake SMS, no fake account verification, no fake session.
 */
export default function VerifyPhoneScreen() {
	const { t } = useTranslation();
	const router = useRouter();
	const params = useLocalSearchParams<{ phone?: string }>();

	// Use passed phone parameter or fallback to exact Figma fixture +1 602-555-0142
	const phoneNumber = params.phone || t("verifyPhone.defaultPhone");

	const [otp, setOtp] = useState("");
	const [errorKey, setErrorKey] = useState<string | null>(null);
	const [noticeKey, setNoticeKey] = useState<string | null>(null);

	const handleOtpChange = (code: string) => {
		setOtp(code);
		if (errorKey && code.length > 0) {
			setErrorKey(null);
		}
	};

	const handleVerify = () => {
		setNoticeKey(null);
		setErrorKey(null);
		// Frontend demo continuation: Navigate directly to C10 Account Overview
		router.push("/(app)/account");
	};

	const handleResendPress = () => {
		setErrorKey(null);
		// Honest no-backend behavior: Never claim SMS was sent or simulate timer
		setNoticeKey("verifyPhone.resendUnavailableNotice");
	};

	const handleChangePhoneNumber = () => {
		// Navigate back to the pre-existing phone entry screen (C07 Create Account)
		if (router.canGoBack()) {
			router.back();
		} else {
			router.replace("/(auth)/create-account");
		}
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
				>
					{/* 1. Brand Wordmark & Tagline */}
					<View style={styles.brandHeader}>
						<View style={styles.wordmarkRow}>
							<Text style={styles.wordmarkHaul}>HAUL</Text>
							<Text style={styles.wordmarkIx}>IX</Text>
						</View>
						<Text style={styles.tagline}>{t("brand.tagline")}</Text>
					</View>

					{/* 2. Heading & Description */}
					<View style={styles.headingSection}>
						<Text style={styles.title}>{t("verifyPhone.title")}</Text>
						<Text style={styles.subtitle}>{t("verifyPhone.subtitle")}</Text>
					</View>

					{/* 3. Single-dot Arizona Availability Chip */}
					<View style={styles.availabilityChip}>
						<View style={styles.availabilityDot} />
						<Text style={styles.availabilityText}>
							{t("verifyPhone.availability")}
						</Text>
					</View>

					{/* Dismissible Notice Banner (Truthful No-Backend State) */}
					{noticeKey && (
						<View style={styles.noticeBox} testID="verify-notice-banner">
							<Text style={styles.noticeText}>{t(noticeKey)}</Text>
							<Pressable
								onPress={() => setNoticeKey(null)}
								accessibilityRole="button"
								accessibilityLabel={t("verifyPhone.dismissNotice")}
								hitSlop={8}
							>
								<Text style={styles.noticeDismiss}>
									{t("verifyPhone.dismissNotice")}
								</Text>
							</Pressable>
						</View>
					)}

					{/* 4. OTP Verification Card */}
					<View style={styles.card} testID="otp-verification-card">
						{/* Registered Phone Fixture */}
						<Text style={styles.cardNumber}>{phoneNumber}</Text>

						{/* 6-Digit OTP Input */}
						<OtpInput
							value={otp}
							onChange={handleOtpChange}
							hasError={!!errorKey}
							accessibilityLabel={t("verifyPhone.otpInputAccessibilityLabel")}
							accessibilityHint={t("verifyPhone.otpInputAccessibilityHint")}
							testID="c08-otp-input"
						/>

						{/* Local Validation Error */}
						{errorKey && (
							<Text style={styles.inlineErrorText} testID="otp-inline-error">
								{t(errorKey)}
							</Text>
						)}

						{/* Security Expiry / Never Share Helper */}
						<Text style={styles.helperText}>
							{t("verifyPhone.codeExpires")}
						</Text>

						{/* Resend / Info Row */}
						<Pressable
							onPress={handleResendPress}
							accessibilityRole="button"
							accessibilityLabel={`${t("verifyPhone.resendTitle")} ${t("verifyPhone.resendSubtitle")}`}
							testID="c08-resend-row"
						>
							{({ pressed }) => (
								<View
									style={[styles.resendRow, pressed && styles.resendRowPressed]}
								>
									<View style={styles.resendTextContainer}>
										<Text style={styles.resendTitle}>
											{t("verifyPhone.resendTitle")}
										</Text>
										<Text style={styles.resendSubtitle}>
											{t("verifyPhone.resendSubtitle")}
										</Text>
									</View>
									<ChevronRightIcon size={16} color={colors.brand} />
								</View>
							)}
						</Pressable>
					</View>

					{/* 5. Actions Group (58px wrappers, 54px inner, 11px gap) */}
					<View style={styles.actionsGroup}>
						{/* Primary CTA: Verify & Continue */}
						<HaulixButton
							label={t("verifyPhone.verifyButton")}
							variant="primary"
							fullWidth
							onPress={handleVerify}
							testID="c08-verify-button"
						/>

						{/* Secondary CTA: Change phone number */}
						<Pressable
							onPress={handleChangePhoneNumber}
							accessibilityRole="button"
							accessibilityLabel={t("verifyPhone.changeNumberButton")}
							testID="c08-change-number-button"
						>
							{({ pressed }) => (
								<View
									style={[
										styles.secondaryButton,
										pressed && styles.secondaryButtonPressed,
									]}
								>
									<Text style={styles.secondaryButtonText}>
										{t("verifyPhone.changeNumberButton")}
									</Text>
								</View>
							)}
						</Pressable>
					</View>

					{/* 6. Safety / Demo Notice */}
					<Text style={styles.demoNoticeText}>
						{t("verifyPhone.demoNotice")}
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

	// Notice Banner
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

	// 4. OTP Verification Card (Figma 386 × 236 at x=22, y=349)
	card: {
		backgroundColor: colors.surface, // #151A19
		borderWidth: 1,
		borderColor: colors.elevated, // #222827
		borderRadius: radius["2xl"], // 20px
		paddingHorizontal: 16,
		paddingVertical: 18,
		marginBottom: spacing[4],
	},
	cardNumber: {
		fontFamily: fontFamily.semiBold,
		fontSize: 17,
		lineHeight: 22,
		color: colors.primaryText,
		marginBottom: spacing[4],
	},
	inlineErrorText: {
		fontFamily: fontFamily.regular,
		fontSize: 12,
		color: colors.error,
		marginTop: 8,
		textAlign: "center",
	},
	helperText: {
		fontFamily: fontFamily.regular,
		fontSize: 12,
		lineHeight: 16,
		color: colors.secondaryText,
		marginTop: spacing[3],
		marginBottom: spacing[4],
	},
	resendRow: {
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-between",
		paddingVertical: spacing[2],
		borderTopWidth: 1,
		borderTopColor: "rgba(34, 40, 39, 0.6)",
		paddingTop: spacing[3],
	},
	resendRowPressed: {
		opacity: 0.7,
	},
	resendTextContainer: {
		flex: 1,
		marginRight: spacing[2],
	},
	resendTitle: {
		fontFamily: fontFamily.semiBold,
		fontSize: 14,
		lineHeight: 18,
		color: colors.primaryText,
		marginBottom: 2,
	},
	resendSubtitle: {
		fontFamily: fontFamily.regular,
		fontSize: 11,
		lineHeight: 14,
		color: colors.secondaryText,
	},

	// 5. Actions Group (Two 58px CTA regions with 11px gap)
	actionsGroup: {
		gap: 11,
		marginBottom: spacing[4],
	},
	primaryButton: {
		backgroundColor: colors.brand, // #BAFF42
		borderRadius: radius.lg, // 14px
		height: 54,
		alignItems: "center",
		justifyContent: "center",
	},
	primaryButtonPressed: {
		opacity: 0.85,
	},
	primaryButtonText: {
		fontFamily: fontFamily.semiBold,
		fontSize: fontSize.base, // 16
		color: colors.background, // #080B0B
	},
	secondaryButton: {
		width: "100%",
		backgroundColor: colors.surface, // #151A19
		borderWidth: 1,
		borderColor: "#2B3533",
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
		color: colors.brand, // #BAFF42
	},

	// 6. Safety / Demo Notice
	demoNoticeText: {
		fontFamily: fontFamily.regular,
		fontSize: 11,
		lineHeight: 14,
		color: "#7B8780",
		marginBottom: spacing[4],
	},
});
