import {
	colors,
	fontFamily,
	fontSize,
	radius,
	spacing,
} from "@haulix/design-tokens";
import { getCurrentLocale, useTranslation } from "@haulix/i18n";
import { HaulixSafeArea } from "@haulix/ui";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import {
	BackHandler,
	Pressable,
	ScrollView,
	StyleSheet,
	Text,
	View,
} from "react-native";
import {
	AccountShieldIcon,
	HeaderBackIcon,
	HeaderBellIcon,
	VerifiedStatusIcon,
} from "../../src/components/account/C10Icons";
import { CustomerBottomNav } from "../../src/components/navigation/CustomerBottomNav";
import {
	c10DemoProfile,
	c10DemoProfileEs,
	getC10DemoProfile,
	loadProfileEdits,
	subscribeToProfileEdits,
} from "../../src/fixtures/c10DemoProfile";

/**
 * C10-S — Profile Updated / Success (English Default)
 *
 * Source:
 *   - Figma node: 333:171 ("C10-S · Profile Updated / Success [CU-04]")
 *   - Frame: 430 × 936 px
 *
 * Requirements & Invariants:
 * 1. English-only success state after local demo profile update from C10-E.
 * 2. Uses strictly local mock state; never claims server authentication or remote API save.
 * 3. Dynamic display of saved name, email, and phone (not hardcoded static values).
 * 4. Honest phone verification state: If phone changed without verification, display
 *    "Phone · verification pending" instead of "Verified phone".
 * 5. Primary CTA "Back to My Account" navigates to C10 Account Overview with updated profile.
 * 6. Secondary CTA "Saved Addresses" shows an honest notice since C11 is not yet built.
 * 7. Authentic sculpted bottom navigation with Account active.
 */
export default function ProfileUpdatedScreen() {
	const { t } = useTranslation();
	const router = useRouter();

	const currentLocale = (getCurrentLocale() as "en" | "es") || "en";
	const [profile, setProfile] = useState(() =>
		getC10DemoProfile(currentLocale),
	);
	const [noticeMessage, setNoticeMessage] = useState<string | null>(null);

	useEffect(() => {
		loadProfileEdits(currentLocale).then(() => {
			setProfile(getC10DemoProfile(currentLocale));
		});
		const unsubscribe = subscribeToProfileEdits(() => {
			setProfile(getC10DemoProfile(currentLocale));
		});
		return unsubscribe;
	}, [currentLocale]);

	// Hardware back button handler for Android: Return to Account Overview cleanly
	useEffect(() => {
		const onBackPress = () => {
			router.replace("/(app)/account");
			return true;
		};
		const subscription = BackHandler.addEventListener(
			"hardwareBackPress",
			onBackPress,
		);
		return () => subscription.remove();
	}, [router]);

	const handleBackToAccount = () => {
		router.replace("/(app)/account");
	};

	const handleSavedAddresses = () => {
		setNoticeMessage(t("profileUpdated.savedAddressesNotice"));
	};

	const baseFixture =
		currentLocale === "es" ? c10DemoProfileEs : c10DemoProfile;
	const savedName = profile.name || baseFixture.name;
	const savedEmail = profile.email || baseFixture.email;
	const savedPhone = profile.phone || baseFixture.phone;
	const isPhoneVerified = profile.isPhoneVerified ?? true;

	const chipLabel = `${savedName.trim().toUpperCase()}  ·  ${t("profileUpdated.accountChipSuffix")}`;
	const statusStripText = `${t("profileUpdated.changesSavedPrefix")} ${savedName}`;
	const phoneLabel = isPhoneVerified
		? t("profileUpdated.verifiedPhoneLabel")
		: t("profileUpdated.pendingPhoneLabel");

	return (
		<HaulixSafeArea edges={["top", "left", "right"]}>
			<View style={styles.rootContainer} testID="c10s-profile-updated-screen">
				<ScrollView
					style={styles.scroll}
					contentContainerStyle={styles.scrollContent}
					showsVerticalScrollIndicator={false}
					testID="c10s-scroll-content"
				>
					{/* 1. Header (Figma node 333:175) */}
					<View style={styles.headerRow}>
						{/* Back Button Circle */}
						<Pressable
							style={styles.headerCircleButton}
							onPress={handleBackToAccount}
							accessibilityRole="button"
							accessibilityLabel={t("common.back")}
							hitSlop={8}
							testID="c10s-header-back"
						>
							<HeaderBackIcon size={21} />
						</Pressable>

						{/* Wordmark Center */}
						<View style={styles.wordmarkContainer}>
							<Text style={styles.wordmarkHaul}>HAUL</Text>
							<Text style={styles.wordmarkIx}>IX</Text>
						</View>

						{/* Notification Bell Circle with Unread Dot */}
						<Pressable
							style={styles.headerCircleButton}
							onPress={() =>
								setNoticeMessage(t("account.notificationNoticeMessage"))
							}
							accessibilityRole="button"
							accessibilityLabel="Notifications"
							hitSlop={8}
							testID="c10s-header-bell"
						>
							<HeaderBellIcon size={22} />
							<View style={styles.notificationDot} />
						</Pressable>
					</View>

					{/* Interactive Notice Banner (for Saved Addresses / Bell notices) */}
					{noticeMessage && (
						<View style={styles.noticeBox} testID="c10s-notice-banner">
							<Text style={styles.noticeText}>{noticeMessage}</Text>
							<Pressable
								onPress={() => setNoticeMessage(null)}
								accessibilityRole="button"
								accessibilityLabel={t("account.dismissNotice")}
								hitSlop={8}
							>
								<Text style={styles.noticeDismiss}>
									{t("account.dismissNotice")}
								</Text>
							</Pressable>
						</View>
					)}

					{/* 2. Page Intro (Figma node 333:181) */}
					<View style={styles.introSection}>
						<Text style={styles.introTitle}>{t("profileUpdated.title")}</Text>
						<Text style={styles.introSubtitle}>
							{t("profileUpdated.subtitle")}
						</Text>
					</View>

					{/* 3. Account Status Chip (Figma node 333:184) */}
					<View style={styles.statusChip} testID="c10s-status-chip">
						<AccountShieldIcon size={21} color={colors.brand} />
						<Text style={styles.statusChipText}>{chipLabel}</Text>
					</View>

					{/* 4. Saved Profile Card (Figma node 333:188) */}
					<View style={styles.card} testID="c10s-saved-profile-card">
						{/* Card Heading */}
						<Text style={styles.cardHeading}>
							{t("profileUpdated.cardTitle")}
						</Text>

						{/* Saved Status Strip (Figma node 333:190) */}
						<View
							style={styles.savedStatusStrip}
							testID="c10s-saved-status-strip"
						>
							<VerifiedStatusIcon size={24} color="#48D796" />
							<Text
								style={styles.savedStatusText}
								numberOfLines={1}
								testID="c10s-status-strip-text"
							>
								{statusStripText}
							</Text>
						</View>

						{/* Email Row (Figma node 333:194) */}
						<View style={styles.cardRow} testID="c10s-email-row">
							<Text style={styles.fieldLabel}>
								{t("profileUpdated.emailLabel")}
							</Text>
							<Text style={styles.fieldValue} testID="c10s-saved-email">
								{savedEmail}
							</Text>
						</View>

						{/* Phone Row (Figma node 333:198) */}
						<View style={styles.cardRow} testID="c10s-phone-row">
							<Text style={styles.fieldLabel} testID="c10s-phone-label">
								{phoneLabel}
							</Text>
							<Text style={styles.fieldValue} testID="c10s-saved-phone">
								{savedPhone}
							</Text>
						</View>

						{/* Card Note (Figma node 333:202) */}
						<Text style={styles.cardNote}>{t("profileUpdated.note")}</Text>
					</View>

					{/* 5. CTAs (Figma nodes 333:203 & 333:206) */}
					<View style={styles.actionsContainer}>
						{/* Primary CTA: Back to My Account */}
						<Pressable
							onPress={handleBackToAccount}
							accessibilityRole="button"
							accessibilityLabel={t("profileUpdated.backToAccount")}
							testID="c10s-back-to-account-btn"
						>
							{({ pressed }) => (
								<View
									style={[
										styles.primaryButton,
										pressed && styles.primaryButtonPressed,
									]}
								>
									<Text style={styles.primaryButtonText}>
										{t("profileUpdated.backToAccount")}
									</Text>
								</View>
							)}
						</Pressable>

						{/* Secondary CTA: Saved Addresses */}
						<Pressable
							onPress={handleSavedAddresses}
							accessibilityRole="button"
							accessibilityLabel={t("profileUpdated.savedAddresses")}
							testID="c10s-saved-addresses-btn"
						>
							{({ pressed }) => (
								<View
									style={[
										styles.secondaryButton,
										pressed && styles.secondaryButtonPressed,
									]}
								>
									<Text style={styles.secondaryButtonText}>
										{t("profileUpdated.savedAddresses")}
									</Text>
								</View>
							)}
						</Pressable>
					</View>
				</ScrollView>

				{/* 6. Sculpted Bottom Navigation (Figma instance 965:9628) */}
				<CustomerBottomNav
					activeTab="account"
					onShowNotice={(msg) => setNoticeMessage(msg)}
				/>
			</View>
		</HaulixSafeArea>
	);
}

const styles = StyleSheet.create({
	rootContainer: {
		flex: 1,
		backgroundColor: colors.background, // #080B0B
	},
	scroll: {
		flex: 1,
	},
	scrollContent: {
		paddingHorizontal: 22,
		paddingTop: 12,
		paddingBottom: 138, // Ample clearance for the sculpted bottom navigation
	},

	// 1. Header (Figma 333:175)
	headerRow: {
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-between",
		marginBottom: spacing[4],
		height: 48,
	},
	headerCircleButton: {
		width: 44,
		height: 44,
		borderRadius: 22,
		backgroundColor: colors.surface, // #151A19
		borderWidth: 1,
		borderColor: colors.elevated, // #222827
		alignItems: "center",
		justifyContent: "center",
	},
	wordmarkContainer: {
		flexDirection: "row",
		alignItems: "center",
	},
	wordmarkHaul: {
		fontFamily: fontFamily.bold,
		fontSize: 24,
		letterSpacing: 1,
		color: colors.primaryText, // #F6F8F6
	},
	wordmarkIx: {
		fontFamily: fontFamily.bold,
		fontSize: 24,
		letterSpacing: 1,
		color: colors.brand, // #BAFF42
	},
	notificationDot: {
		position: "absolute",
		top: 10,
		right: 11,
		width: 8,
		height: 8,
		borderRadius: 4,
		backgroundColor: colors.brand, // #BAFF42
	},

	// Notice banner
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

	// 2. Page Intro (Figma 333:181)
	introSection: {
		marginBottom: spacing[4],
	},
	introTitle: {
		fontFamily: fontFamily.bold,
		fontSize: 28,
		lineHeight: 34,
		color: colors.primaryText, // #F6F8F6
		marginBottom: 4,
	},
	introSubtitle: {
		fontFamily: fontFamily.regular,
		fontSize: 13,
		lineHeight: 18,
		color: colors.secondaryText, // #ADB7B1
	},

	// 3. Account Status Chip (Figma 333:184)
	statusChip: {
		flexDirection: "row",
		alignItems: "center",
		backgroundColor: "#101913",
		borderWidth: 1,
		borderColor: "#1F3826",
		borderRadius: 12,
		paddingHorizontal: 14,
		height: 43,
		marginBottom: spacing[4],
		gap: 10,
	},
	statusChipText: {
		fontFamily: fontFamily.semiBold,
		fontSize: 11,
		letterSpacing: 0.8,
		color: colors.brand, // #BAFF42
	},

	// 4. Saved Profile Card (Figma 333:188)
	card: {
		backgroundColor: colors.surface, // #151A19
		borderWidth: 1,
		borderColor: colors.elevated, // #222827
		borderRadius: 18,
		padding: 20,
		marginBottom: spacing[5],
	},
	cardHeading: {
		fontFamily: fontFamily.semiBold,
		fontSize: 17,
		lineHeight: 22,
		color: colors.primaryText,
		marginBottom: 14,
	},
	savedStatusStrip: {
		flexDirection: "row",
		alignItems: "center",
		backgroundColor: colors.elevated, // #222827
		borderRadius: 12,
		height: 48,
		paddingHorizontal: 14,
		gap: 10,
		marginBottom: 16,
	},
	savedStatusText: {
		flex: 1,
		fontFamily: fontFamily.medium,
		fontSize: 13,
		color: colors.primaryText,
	},
	cardRow: {
		marginBottom: 14,
	},
	fieldLabel: {
		fontFamily: fontFamily.medium,
		fontSize: 11,
		color: colors.secondaryText, // #ADB7B1
		marginBottom: 4,
	},
	fieldValue: {
		fontFamily: fontFamily.semiBold,
		fontSize: 15,
		lineHeight: 20,
		color: colors.primaryText, // #F6F8F6
	},
	cardNote: {
		fontFamily: fontFamily.regular,
		fontSize: 11,
		lineHeight: 16,
		color: "#6D7D73",
		marginTop: 4,
	},

	// 5. Actions CTAs
	actionsContainer: {
		gap: 12,
		marginBottom: spacing[4],
	},
	primaryButton: {
		width: "100%",
		height: 54,
		backgroundColor: colors.brand, // #BAFF42
		borderRadius: 12,
		alignItems: "center",
		justifyContent: "center",
	},
	primaryButtonPressed: {
		opacity: 0.88,
	},
	primaryButtonText: {
		fontFamily: fontFamily.bold,
		fontSize: 16,
		color: "#080B0B",
	},
	secondaryButton: {
		width: "100%",
		height: 54,
		backgroundColor: colors.surface, // #151A19
		borderWidth: 1,
		borderColor: "#35403B",
		borderRadius: 12,
		alignItems: "center",
		justifyContent: "center",
	},
	secondaryButtonPressed: {
		backgroundColor: colors.elevated,
		borderColor: colors.brand,
	},
	secondaryButtonText: {
		fontFamily: fontFamily.semiBold,
		fontSize: 16,
		color: colors.brand, // #BAFF42
	},
});
