import { colors, fontFamily, radius, spacing } from "@haulix/design-tokens";
import { getCurrentLocale, useTranslation } from "@haulix/i18n";
import { HaulixSafeArea } from "@haulix/ui";
import { useRouter } from "expo-router";
import { useCallback, useEffect, useState } from "react";
import {
	BackHandler,
	Platform,
	Pressable,
	ScrollView,
	StyleSheet,
	Text,
	View,
} from "react-native";
import {
	C18CheckIcon,
	C20AlertTriangleIcon,
} from "../../src/components/discovery/C18BatchIcons";
import { FlowHeaderBack } from "../../src/components/navigation/FlowHeaderBack";
import {
	getC10DemoProfile,
	loadProfileEdits,
	subscribeToProfileEdits,
} from "../../src/fixtures/c10DemoProfile";
import { C20V_DEFAULT_DATA } from "../../src/fixtures/c20vMissingAccess";

function useCustomerProfile(locale: "en" | "es") {
	const [profile, setProfile] = useState(() => getC10DemoProfile(locale));
	useEffect(() => {
		loadProfileEdits().then(() => setProfile(getC10DemoProfile(locale)));
		return subscribeToProfileEdits(() => setProfile(getC10DemoProfile(locale)));
	}, [locale]);
	return profile;
}

/**
 * HAULIX Customer Mobile App — Phase 03.23
 * Screen 2: C20-V Incomplete Access Validation
 *
 * Authoritative Figma:
 *   - English: Node 382:1822 (430 × 1103 px)
 *   - Spanish: Node 980:10048 (430 × 1103 px)
 *
 * Scope: Incomplete access demonstration state.
 * Blocks quotation until safety and access details are confirmed.
 */
export default function AccessValidationScreen() {
	const { t } = useTranslation();
	const router = useRouter();
	const currentLocale = getCurrentLocale() as "en" | "es";
	const profile = useCustomerProfile(currentLocale);
	const bookingId = "HX-DEMO-1027";
	const [noticeMessage, setNoticeMessage] = useState<string | null>(null);

	const handleBack = useCallback(() => {
		if (router.canGoBack()) {
			router.back();
		} else {
			router.replace("/access-details");
		}
	}, [router]);

	useEffect(() => {
		if (Platform.OS === "android") {
			const sub = BackHandler.addEventListener("hardwareBackPress", () => {
				handleBack();
				return true;
			});
			return () => sub.remove();
		}
	}, [handleBack]);

	const handleEditAccess = useCallback(() => {
		setNoticeMessage(t("c20v.noticeCorrectionUnavailable"));
		setTimeout(() => {
			handleBack();
		}, 1200);
	}, [handleBack, t]);

	const handleReturnToItems = useCallback(() => {
		router.push("/item-inventory");
	}, [router]);

	const rows = C20V_DEFAULT_DATA.rows;

	return (
		<HaulixSafeArea edges={["top", "left", "right"]} style={styles.safeArea}>
			<FlowHeaderBack
				testID="c20v-header-back"
				onBack={handleBack}
				backA11y={t("c20v.backA11y")}
			/>

			{noticeMessage && (
				<View style={styles.noticeBox} testID="c20v-notice-banner">
					<Text style={styles.noticeText}>{noticeMessage}</Text>
					<Pressable
						onPress={() => setNoticeMessage(null)}
						style={styles.noticeDismiss}
						accessibilityRole="button"
						accessibilityLabel={t("c20v.noticeDismiss")}
						testID="c20v-notice-dismiss"
					>
						<Text style={styles.noticeDismissText}>
							{t("c20v.noticeDismiss")}
						</Text>
					</Pressable>
				</View>
			)}

			<ScrollView
				style={styles.scrollView}
				contentContainerStyle={styles.scrollContent}
				showsVerticalScrollIndicator={false}
				testID="c20v-scroll-container"
			>
				{/* Step Indicator */}
				<View style={styles.stepBadge} testID="c20v-step-indicator">
					<Text style={styles.stepBadgeBrand}>{t("c20v.stepIndicator")}</Text>
					<Text style={styles.stepBadgeSub}>{t("c20v.stepSub")}</Text>
				</View>

				{/* Screen Heading */}
				<View style={styles.headingSection} testID="c20v-heading-section">
					<Text style={styles.screenTitle}>{t("c20v.title")}</Text>
					<Text style={styles.screenSubtitle}>{t("c20v.subtitle")}</Text>
				</View>

				{/* Customer Booking Context Chip */}
				<View
					style={styles.customerContextRow}
					testID="c20v-customer-context-chip"
				>
					<C18CheckIcon size={17} color={colors.brand} />
					<Text style={styles.customerContextText}>
						{`${profile.name.toUpperCase()} · ${bookingId}`}
					</Text>
				</View>

				{/* Section: Missing information */}
				<View style={styles.sectionCard} testID="c20v-missing-info-card">
					<Text style={styles.sectionTitle}>
						{t("c20v.sectionMissingTitle")}
					</Text>

					<View style={styles.detailRowsList}>
						{rows.map((row) => (
							<View
								key={row.id}
								style={styles.detailRow}
								testID={`c20v-row-${row.id}`}
							>
								<Text style={styles.detailLabel}>
									{currentLocale === "es" ? row.labelEs : row.label}
								</Text>
								<Text style={styles.detailValue}>
									{currentLocale === "es" ? row.valueEs : row.value}
								</Text>
							</View>
						))}
					</View>
				</View>

				{/* Section: Safety details required */}
				<View style={styles.sectionCard} testID="c20v-warning-card">
					<Text style={styles.sectionTitle}>
						{t("c20v.sectionWarningTitle")}
					</Text>

					<View style={styles.badgeRow}>
						<C20AlertTriangleIcon size={18} color="#F36D6D" />
						<Text style={styles.badgeText}>{t("c20v.warningBadge")}</Text>
					</View>

					<Text style={styles.guidanceText}>{t("c20v.warningGuidance1")}</Text>
					<Text style={styles.guidanceCritical}>
						{t("c20v.warningGuidance2")}
					</Text>
				</View>

				{/* Actions */}
				<View style={styles.actionsSection} testID="c20v-actions-section">
					<Pressable
						style={styles.primaryButton}
						onPress={handleEditAccess}
						accessibilityRole="button"
						accessibilityLabel={t("c20v.editAccessCta")}
						testID="c20v-edit-access-button"
					>
						<Text style={styles.primaryButtonText}>
							{t("c20v.editAccessCta")}
						</Text>
					</Pressable>

					<Pressable
						style={styles.secondaryButton}
						onPress={handleReturnToItems}
						accessibilityRole="button"
						accessibilityLabel={t("c20v.returnToItemsCta")}
						testID="c20v-return-items-button"
					>
						<Text style={styles.secondaryButtonText}>
							{t("c20v.returnToItemsCta")}
						</Text>
					</Pressable>
				</View>

				{/* Footer Disclaimers */}
				<View style={styles.footerSection} testID="c20v-footer-section">
					<Text style={styles.footerNotice}>{t("c20v.footerDemo")}</Text>
					<Text style={styles.footerNotice}>{t("c20v.footerSrs")}</Text>
				</View>
			</ScrollView>
		</HaulixSafeArea>
	);
}

const styles = StyleSheet.create({
	safeArea: {
		flex: 1,
		backgroundColor: "#080B0B",
	},
	scrollView: {
		flex: 1,
	},
	scrollContent: {
		paddingHorizontal: 22,
		paddingTop: 16,
		paddingBottom: 40,
	},
	noticeBox: {
		marginHorizontal: 22,
		marginTop: 8,
		paddingHorizontal: 16,
		paddingVertical: 12,
		borderRadius: radius.md,
		backgroundColor: "#1A2510",
		borderWidth: 1,
		borderColor: colors.brand,
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-between",
	},
	noticeText: {
		fontFamily: fontFamily.medium,
		fontSize: 12,
		color: colors.brand,
		flex: 1,
		marginRight: 8,
	},
	noticeDismiss: {
		paddingVertical: 4,
		paddingHorizontal: 8,
	},
	noticeDismissText: {
		fontFamily: fontFamily.semiBold,
		fontSize: 12,
		color: "#ADB7B1",
	},
	stepBadge: {
		flexDirection: "row",
		alignItems: "center",
		height: 33,
		paddingHorizontal: 12,
		backgroundColor: colors.surface,
		borderRadius: 9,
		alignSelf: "flex-start",
		marginBottom: spacing[3],
	},
	stepBadgeBrand: {
		fontFamily: fontFamily.semiBold,
		fontSize: 10,
		color: colors.brand,
	},
	stepBadgeSub: {
		fontFamily: fontFamily.medium,
		fontSize: 10,
		color: "#ADB7B1",
	},
	headingSection: {
		marginBottom: spacing[3],
	},
	screenTitle: {
		fontFamily: fontFamily.bold,
		fontSize: 25,
		lineHeight: 31,
		color: "#F6F8F6",
		marginBottom: 6,
	},
	screenSubtitle: {
		fontFamily: fontFamily.regular,
		fontSize: 12,
		lineHeight: 17,
		color: "#ADB7B1",
	},
	customerContextRow: {
		flexDirection: "row",
		alignItems: "center",
		gap: 8,
		height: 39,
		paddingHorizontal: 12,
		backgroundColor: "#1A2510",
		borderRadius: 9,
		marginBottom: spacing[4],
	},
	customerContextText: {
		fontFamily: fontFamily.semiBold,
		fontSize: 11,
		color: colors.brand,
	},
	sectionCard: {
		backgroundColor: colors.surface,
		borderRadius: 17,
		paddingHorizontal: 16,
		paddingVertical: 17,
		marginBottom: spacing[4],
	},
	sectionTitle: {
		fontFamily: fontFamily.semiBold,
		fontSize: 16,
		color: "#F6F8F6",
		marginBottom: 13,
	},
	detailRowsList: {
		gap: 10,
	},
	detailRow: {
		backgroundColor: "#222827",
		borderRadius: 10,
		paddingVertical: 10,
		paddingHorizontal: 12,
	},
	detailLabel: {
		fontFamily: fontFamily.medium,
		fontSize: 11,
		color: "#ADB7B1",
		marginBottom: 4,
	},
	detailValue: {
		fontFamily: fontFamily.semiBold,
		fontSize: 12,
		color: "#F6F8F6",
	},
	badgeRow: {
		flexDirection: "row",
		alignItems: "center",
		gap: 8,
		height: 32,
		paddingHorizontal: 10,
		backgroundColor: "#222827",
		borderRadius: 8,
		alignSelf: "flex-start",
		marginBottom: 12,
	},
	badgeText: {
		fontFamily: fontFamily.semiBold,
		fontSize: 11,
		color: "#ADB7B1",
	},
	guidanceText: {
		fontFamily: fontFamily.regular,
		fontSize: 12,
		lineHeight: 18,
		color: "#F6F8F6",
		marginBottom: 8,
	},
	guidanceCritical: {
		fontFamily: fontFamily.regular,
		fontSize: 12,
		lineHeight: 18,
		color: "#F6F8F6",
	},
	actionsSection: {
		gap: 11,
		marginTop: spacing[2],
		marginBottom: spacing[4],
	},
	primaryButton: {
		height: 52,
		borderRadius: 12,
		backgroundColor: colors.brand,
		alignItems: "center",
		justifyContent: "center",
		paddingHorizontal: 20,
	},
	primaryButtonText: {
		fontFamily: fontFamily.semiBold,
		fontSize: 14,
		color: "#080B0B",
	},
	secondaryButton: {
		height: 56,
		borderRadius: 12,
		backgroundColor: colors.surface,
		borderWidth: 1,
		borderColor: "#35403B",
		alignItems: "center",
		justifyContent: "center",
	},
	secondaryButtonText: {
		fontFamily: fontFamily.semiBold,
		fontSize: 13,
		color: colors.brand,
	},
	footerSection: {
		gap: 10,
		marginTop: spacing[1],
	},
	footerNotice: {
		fontFamily: fontFamily.regular,
		fontSize: 10,
		color: "#788580",
		lineHeight: 14,
	},
});
