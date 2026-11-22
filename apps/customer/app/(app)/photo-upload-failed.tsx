/**
 * C19-P-F Photo Upload Failure
 *
 * Authoritative Figma: Node 382:1590 (EN) & Node 980:9752 (ES)
 * Flow Context: W02 Service Discovery & Intake / C19-P-F
 */

import { colors, fontFamily } from "@haulix/design-tokens";
import { useTranslation } from "@haulix/i18n";
import { HaulixSafeArea } from "@haulix/ui";
import { useRouter } from "expo-router";
import { useCallback, useEffect, useState } from "react";
import {
	BackHandler,
	Image,
	type ImageSourcePropType,
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
import { C19PF_SAVED_PHOTOS } from "../../src/fixtures/c19pfFailure";

const PHOTO_IMAGES: Record<string, ImageSourcePropType> = {
	sofa: require("../../assets/images/intake/c18j-sofa.png"),
	mattresses: require("../../assets/images/intake/c18j-mattresses.png"),
	table: require("../../assets/images/intake/c18j-table.png"),
};

function useCustomerProfile(locale: "en" | "es") {
	const [profile, setProfile] = useState(() => getC10DemoProfile(locale));
	useEffect(() => {
		loadProfileEdits().then(() => setProfile(getC10DemoProfile(locale)));
		return subscribeToProfileEdits(() => setProfile(getC10DemoProfile(locale)));
	}, [locale]);
	return profile;
}

export default function PhotoUploadFailedScreen() {
	const { t, i18n } = useTranslation();
	const router = useRouter();
	const currentLocale = (i18n?.language?.startsWith("es") ? "es" : "en") as
		| "en"
		| "es";

	const profile = useCustomerProfile(currentLocale);
	const bookingId = "HX-DEMO-1027";

	const [noticeMessage, setNoticeMessage] = useState<string | null>(null);

	const handleBack = useCallback(() => {
		if (router.canGoBack()) {
			router.back();
		} else {
			router.replace({ pathname: "/item-photos" });
		}
	}, [router]);

	useEffect(() => {
		const sub = BackHandler.addEventListener("hardwareBackPress", () => {
			handleBack();
			return true;
		});
		return () => sub.remove();
	}, [handleBack]);

	const handleRetryUpload = useCallback(() => {
		setNoticeMessage(t("c19pf.noticeRetry"));
	}, [t]);

	const handleContinueWithSaved = useCallback(() => {
		router.push("/access-details");
	}, [router]);

	return (
		<HaulixSafeArea edges={["top", "left", "right"]} style={styles.safeArea}>
			<FlowHeaderBack
				testID="c19pf-header-back"
				onBack={handleBack}
				backA11y={t("c19pf.backA11y")}
			/>

			{noticeMessage && (
				<View style={styles.noticeBox} testID="c19pf-notice-banner">
					<Text style={styles.noticeText}>{noticeMessage}</Text>
					<Pressable
						onPress={() => setNoticeMessage(null)}
						style={styles.noticeDismiss}
						accessibilityRole="button"
						accessibilityLabel={t("c19pf.noticeDismiss")}
						testID="c19pf-notice-dismiss"
					>
						<Text style={styles.noticeDismissText}>
							{t("c19pf.noticeDismiss")}
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
					<Text style={styles.stepChipLeft}>{t("c19pf.stepIndicator")}</Text>
					<Text style={styles.stepChipRight}>{t("c19pf.stepSub")}</Text>
				</View>

				{/* Heading */}
				<View style={styles.headingSection}>
					<Text style={styles.titleText}>{t("c19pf.title")}</Text>
					<Text style={styles.subtitleText}>{t("c19pf.subtitle")}</Text>

					{/* Dynamic Customer Chip */}
					<View style={styles.customerChip} testID="c19pf-customer-chip">
						<C18CheckIcon size={17} color={colors.brand} />
						<Text style={styles.customerChipText}>
							{profile.name.toUpperCase()} · {bookingId}
						</Text>
					</View>
				</View>

				{/* Network Interrupted Card */}
				<View style={styles.sectionCard} testID="c19pf-network-card">
					<Text style={styles.sectionTitle}>
						{t("c19pf.networkSectionTitle")}
					</Text>

					<View style={styles.alertBadgeRow}>
						<C18AlertTriangleIcon size={16} color={colors.error} />
						<Text style={styles.alertBadgeText}>
							{t("c19pf.actionRequiredBadge")}
						</Text>
					</View>

					<Text style={styles.bodyTextHighlight}>
						{t("c19pf.errorNotice1")}
					</Text>
					<Text style={styles.bodyTextHighlight}>
						{t("c19pf.errorNotice2")}
					</Text>
				</View>

				{/* Saved Photos Card */}
				<View style={styles.sectionCard} testID="c19pf-saved-photos-card">
					<Text style={styles.sectionTitle}>
						{t("c19pf.savedPhotosSectionTitle")}
					</Text>
					<View style={styles.photoList}>
						{C19PF_SAVED_PHOTOS.map((item) => (
							<View key={item.id} style={styles.photoRow} testID={item.testID}>
								<Image
									source={PHOTO_IMAGES[item.imageKey]}
									style={styles.photoThumbnail}
									resizeMode="cover"
									accessible={true}
									accessibilityLabel={t(`c19pf.${item.titleKey}`)}
								/>
								<View style={styles.photoTextCol}>
									<Text style={styles.photoTitle}>
										{t(`c19pf.${item.titleKey}`)}
									</Text>
									<Text style={styles.photoSub}>
										{t(`c19pf.${item.subtitleKey}`)}
									</Text>
								</View>
							</View>
						))}
					</View>
				</View>

				{/* Action Buttons */}
				<View style={styles.actionsSection}>
					<Pressable
						style={({ pressed }) => [
							styles.primaryButton,
							pressed && styles.primaryButtonPressed,
						]}
						onPress={handleRetryUpload}
						accessibilityRole="button"
						accessibilityLabel={t("c19pf.retryCta")}
						testID="c19pf-retry-button"
					>
						<Text style={styles.primaryButtonText}>{t("c19pf.retryCta")}</Text>
					</Pressable>

					<Pressable
						style={({ pressed }) => [
							styles.secondaryButton,
							pressed && styles.secondaryButtonPressed,
						]}
						onPress={handleContinueWithSaved}
						accessibilityRole="button"
						accessibilityLabel={t("c19pf.continueWithSavedCta")}
						testID="c19pf-continue-saved-button"
					>
						<Text style={styles.secondaryButtonText}>
							{t("c19pf.continueWithSavedCta")}
						</Text>
					</Pressable>
				</View>

				{/* Footer */}
				<View style={styles.footerSection}>
					<Text style={styles.footerText}>{t("c19pf.footerDemo")}</Text>
					<Text style={styles.footerText}>{t("c19pf.footerSrs")}</Text>
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
	noticeBox: {
		marginHorizontal: 22,
		marginTop: 8,
		padding: 12,
		borderRadius: 10,
		backgroundColor: "rgba(186, 255, 66, 0.12)",
		borderWidth: 1,
		borderColor: colors.brand,
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-between",
	},
	noticeText: {
		fontFamily: fontFamily.regular,
		fontSize: 12,
		color: colors.primaryText,
		flex: 1,
		marginRight: 8,
	},
	noticeDismiss: {
		paddingVertical: 4,
		paddingHorizontal: 8,
		borderRadius: 6,
		backgroundColor: colors.brand,
	},
	noticeDismissText: {
		fontFamily: fontFamily.semiBold,
		fontSize: 11,
		color: colors.background,
	},
	scrollView: {
		flex: 1,
	},
	scrollContent: {
		paddingHorizontal: 22,
		paddingTop: 16,
		paddingBottom: 36,
		gap: 17,
	},
	stepChipContainer: {
		height: 33,
		backgroundColor: colors.surface,
		borderRadius: 9,
		paddingHorizontal: 12,
		flexDirection: "row",
		alignItems: "center",
	},
	stepChipLeft: {
		fontFamily: fontFamily.semiBold,
		fontSize: 10,
		color: colors.brand,
	},
	stepChipRight: {
		fontFamily: fontFamily.medium,
		fontSize: 10,
		color: colors.secondaryText,
	},
	headingSection: {
		gap: 9,
	},
	titleText: {
		fontFamily: fontFamily.bold,
		fontSize: 25,
		color: colors.primaryText,
		letterSpacing: -0.3,
	},
	subtitleText: {
		fontFamily: fontFamily.regular,
		fontSize: 12,
		color: colors.secondaryText,
		lineHeight: 17,
	},
	customerChip: {
		height: 39,
		backgroundColor: "#1A2510",
		borderRadius: 9,
		paddingLeft: 12,
		paddingRight: 14,
		flexDirection: "row",
		alignItems: "center",
		gap: 7,
		marginTop: 4,
		alignSelf: "flex-start",
	},
	customerChipText: {
		fontFamily: fontFamily.semiBold,
		fontSize: 11,
		color: colors.brand,
		letterSpacing: 0.2,
	},
	sectionCard: {
		backgroundColor: colors.surface,
		borderRadius: 17,
		paddingHorizontal: 16,
		paddingVertical: 17,
		gap: 13,
	},
	sectionTitle: {
		fontFamily: fontFamily.semiBold,
		fontSize: 16,
		color: colors.primaryText,
	},
	alertBadgeRow: {
		height: 32,
		backgroundColor: colors.elevated,
		borderRadius: 8,
		paddingLeft: 10,
		paddingRight: 12,
		flexDirection: "row",
		alignItems: "center",
		gap: 8,
		alignSelf: "flex-start",
	},
	alertBadgeText: {
		fontFamily: fontFamily.semiBold,
		fontSize: 11,
		color: colors.secondaryText,
	},
	bodyTextHighlight: {
		fontFamily: fontFamily.regular,
		fontSize: 12,
		color: colors.primaryText,
		lineHeight: 18,
	},
	photoList: {
		gap: 11,
	},
	photoRow: {
		height: 103,
		backgroundColor: colors.elevated,
		borderRadius: 11,
		paddingHorizontal: 10,
		flexDirection: "row",
		alignItems: "center",
		gap: 11,
	},
	photoThumbnail: {
		width: 110,
		height: 81,
		borderRadius: 9,
	},
	photoTextCol: {
		flex: 1,
		gap: 6,
	},
	photoTitle: {
		fontFamily: fontFamily.semiBold,
		fontSize: 13,
		color: colors.primaryText,
	},
	photoSub: {
		fontFamily: fontFamily.regular,
		fontSize: 11,
		color: colors.secondaryText,
	},
	actionsSection: {
		gap: 11,
		marginTop: 6,
	},
	primaryButton: {
		height: 52,
		backgroundColor: colors.brand,
		borderRadius: 12,
		alignItems: "center",
		justifyContent: "center",
		paddingHorizontal: 20,
	},
	primaryButtonPressed: {
		opacity: 0.85,
	},
	primaryButtonText: {
		fontFamily: fontFamily.semiBold,
		fontSize: 14,
		color: colors.background,
	},
	secondaryButton: {
		height: 56,
		backgroundColor: colors.surface,
		borderRadius: 12,
		borderWidth: 1,
		borderColor: "#35403B",
		alignItems: "center",
		justifyContent: "center",
		paddingHorizontal: 20,
	},
	secondaryButtonPressed: {
		backgroundColor: colors.elevated,
	},
	secondaryButtonText: {
		fontFamily: fontFamily.semiBold,
		fontSize: 13,
		color: colors.brand,
	},
	footerSection: {
		marginTop: 8,
		gap: 8,
	},
	footerText: {
		fontFamily: fontFamily.regular,
		fontSize: 10,
		color: "#788580",
		lineHeight: 14,
	},
});
