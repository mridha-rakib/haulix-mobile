/**
 * C19-P-R Replace Item Photo
 *
 * Authoritative Figma: Node 382:1546 (EN) & Node 980:9692 (ES)
 * Flow Context: W02 Service Discovery & Intake / C19-P-R
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
import { C18CheckIcon } from "../../src/components/discovery/C18BatchIcons";
import { FlowHeaderBack } from "../../src/components/navigation/FlowHeaderBack";
import {
	getC10DemoProfile,
	loadProfileEdits,
	subscribeToProfileEdits,
} from "../../src/fixtures/c10DemoProfile";
import { C19PR_SELECTED_ITEM } from "../../src/fixtures/c19prMedia";

const PHOTO_IMAGES: Record<string, ImageSourcePropType> = {
	sofa: require("../../assets/images/intake/c18j-sofa.png"),
};

function useCustomerProfile(locale: "en" | "es") {
	const [profile, setProfile] = useState(() => getC10DemoProfile(locale));
	useEffect(() => {
		loadProfileEdits().then(() => setProfile(getC10DemoProfile(locale)));
		return subscribeToProfileEdits(() => setProfile(getC10DemoProfile(locale)));
	}, [locale]);
	return profile;
}

export default function ReplaceItemPhotoScreen() {
	const { t, i18n } = useTranslation();
	const router = useRouter();
	const currentLocale = (i18n?.language?.startsWith("es") ? "es" : "en") as
		| "en"
		| "es";

	const profile = useCustomerProfile(currentLocale);
	const bookingId = "HX-DEMO-1027";
	const customerFirstName = profile.name.split(" ")[0] ?? profile.name;

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

	const handleConfirmReplacement = useCallback(() => {
		setNoticeMessage(t("c19pr.noticeConfirmation"));
	}, [t]);

	const handleKeepExisting = useCallback(() => {
		router.replace({ pathname: "/item-photos" });
	}, [router]);

	return (
		<HaulixSafeArea edges={["top", "left", "right"]} style={styles.safeArea}>
			<FlowHeaderBack
				testID="c19pr-header-back"
				onBack={handleBack}
				backA11y={t("c19pr.backA11y")}
			/>

			{noticeMessage && (
				<View style={styles.noticeBox} testID="c19pr-notice-banner">
					<Text style={styles.noticeText}>{noticeMessage}</Text>
					<Pressable
						onPress={() => setNoticeMessage(null)}
						style={styles.noticeDismiss}
						accessibilityRole="button"
						accessibilityLabel={t("c19pr.noticeDismiss")}
						testID="c19pr-notice-dismiss"
					>
						<Text style={styles.noticeDismissText}>
							{t("c19pr.noticeDismiss")}
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
					<Text style={styles.stepChipLeft}>{t("c19pr.stepIndicator")}</Text>
					<Text style={styles.stepChipRight}>{t("c19pr.stepSub")}</Text>
				</View>

				{/* Heading */}
				<View style={styles.headingSection}>
					<Text style={styles.titleText}>{t("c19pr.title")}</Text>
					<Text style={styles.subtitleText}>{t("c19pr.subtitle")}</Text>

					{/* Dynamic Customer Chip */}
					<View style={styles.customerChip} testID="c19pr-customer-chip">
						<C18CheckIcon size={17} color={colors.brand} />
						<Text style={styles.customerChipText}>
							{profile.name.toUpperCase()} · {bookingId}
						</Text>
					</View>
				</View>

				{/* Selected Media Card */}
				<View style={styles.sectionCard} testID="c19pr-selected-media-card">
					<Text style={styles.sectionTitle}>
						{t("c19pr.selectedMediaSectionTitle")}
					</Text>
					<View style={styles.photoRow} testID={C19PR_SELECTED_ITEM.testID}>
						<Image
							source={PHOTO_IMAGES[C19PR_SELECTED_ITEM.imageKey]}
							style={styles.photoThumbnail}
							resizeMode="cover"
							accessible={true}
							accessibilityLabel={t("c19pr.photoTitle")}
						/>
						<View style={styles.photoTextCol}>
							<Text style={styles.photoTitle}>{t("c19pr.photoTitle")}</Text>
							<Text style={styles.photoSub}>{t("c19pr.photoSub")}</Text>
						</View>
					</View>
				</View>

				{/* Replacement Awaiting Selection Card */}
				<View style={styles.sectionCard} testID="c19pr-awaiting-card">
					<Text style={styles.sectionTitle}>
						{t("c19pr.awaitingSectionTitle")}
					</Text>

					<View style={styles.badgeRow}>
						<C18CheckIcon size={16} color={colors.secondaryText} />
						<Text style={styles.badgeText}>
							{t("c19pr.reviewRequiredBadge")}
						</Text>
					</View>

					<Text style={styles.bodyText}>{t("c19pr.guidance1")}</Text>
					<Text style={styles.bodyText}>
						{t("c19pr.guidance2", { customerFirstName })}
					</Text>
				</View>

				{/* Action Buttons */}
				<View style={styles.actionsSection}>
					<Pressable
						style={({ pressed }) => [
							styles.primaryButton,
							pressed && styles.primaryButtonPressed,
						]}
						onPress={handleConfirmReplacement}
						accessibilityRole="button"
						accessibilityLabel={t("c19pr.confirmCta")}
						testID="c19pr-confirm-button"
					>
						<Text style={styles.primaryButtonText}>
							{t("c19pr.confirmCta")}
						</Text>
					</Pressable>

					<Pressable
						style={({ pressed }) => [
							styles.secondaryButton,
							pressed && styles.secondaryButtonPressed,
						]}
						onPress={handleKeepExisting}
						accessibilityRole="button"
						accessibilityLabel={t("c19pr.keepExistingCta")}
						testID="c19pr-keep-existing-button"
					>
						<Text style={styles.secondaryButtonText}>
							{t("c19pr.keepExistingCta")}
						</Text>
					</Pressable>
				</View>

				{/* Footer */}
				<View style={styles.footerSection}>
					<Text style={styles.footerText}>{t("c19pr.footerDemo")}</Text>
					<Text style={styles.footerText}>{t("c19pr.footerSrs")}</Text>
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
	badgeRow: {
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
	badgeText: {
		fontFamily: fontFamily.semiBold,
		fontSize: 11,
		color: colors.secondaryText,
	},
	bodyText: {
		fontFamily: fontFamily.regular,
		fontSize: 12,
		color: colors.secondaryText,
		lineHeight: 18,
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
