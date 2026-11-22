/**
 * C20 Access & Labor Details
 *
 * Authoritative Figma: Node 382:1680 (EN) & Node 980:9874 (ES)
 * Flow Context: W02 Service Discovery & Intake / C20
 */

import { colors, fontFamily } from "@haulix/design-tokens";
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
import {
	C18CheckIcon,
	C18ChevronRightIcon,
	C20PinIcon,
} from "../../src/components/discovery/C18BatchIcons";
import { FlowHeaderBack } from "../../src/components/navigation/FlowHeaderBack";
import {
	getC10DemoProfile,
	loadProfileEdits,
	subscribeToProfileEdits,
} from "../../src/fixtures/c10DemoProfile";
import { C20_PICKUP_ACCESS_ROWS } from "../../src/fixtures/c20AccessDetails";

function useCustomerProfile(locale: "en" | "es") {
	const [profile, setProfile] = useState(() => getC10DemoProfile(locale));
	useEffect(() => {
		loadProfileEdits().then(() => setProfile(getC10DemoProfile(locale)));
		return subscribeToProfileEdits(() => setProfile(getC10DemoProfile(locale)));
	}, [locale]);
	return profile;
}

export default function AccessDetailsScreen() {
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

	const handleContinueToRestrictions = useCallback(() => {
		router.push("/service-restrictions");
	}, [router]);

	const handleExtraAccessHelp = useCallback(() => {
		router.push("/extra-access-help");
	}, [router]);

	const handleEditQuantities = useCallback(() => {
		router.push("/item-inventory");
	}, [router]);

	return (
		<HaulixSafeArea edges={["top", "left", "right"]} style={styles.safeArea}>
			<FlowHeaderBack
				testID="c20-header-back"
				onBack={handleBack}
				backA11y={t("c20.backA11y")}
			/>

			{noticeMessage && (
				<View style={styles.noticeBox} testID="c20-notice-banner">
					<Text style={styles.noticeText}>{noticeMessage}</Text>
					<Pressable
						onPress={() => setNoticeMessage(null)}
						style={styles.noticeDismiss}
						accessibilityRole="button"
						accessibilityLabel={t("c20.noticeDismiss")}
						testID="c20-notice-dismiss"
					>
						<Text style={styles.noticeDismissText}>
							{t("c20.noticeDismiss")}
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
					<Text style={styles.stepChipLeft}>{t("c20.stepIndicator")}</Text>
					<Text style={styles.stepChipRight}>{t("c20.stepSub")}</Text>
				</View>

				{/* Heading */}
				<View style={styles.headingSection}>
					<Text style={styles.titleText}>{t("c20.title")}</Text>
					<Text style={styles.subtitleText}>{t("c20.subtitle")}</Text>

					{/* Dynamic Customer Chip */}
					<View style={styles.customerChip} testID="c20-customer-chip">
						<C18CheckIcon size={17} color={colors.brand} />
						<Text style={styles.customerChipText}>
							{profile.name.toUpperCase()} · {bookingId}
						</Text>
					</View>
				</View>

				{/* Section A: Pickup Access */}
				<View style={styles.sectionCard} testID="c20-pickup-access-card">
					<Text style={styles.sectionTitle}>
						{t("c20.pickupAccessSectionTitle", { name: profile.name })}
					</Text>

					<View style={styles.detailRowsList}>
						{C20_PICKUP_ACCESS_ROWS.map((row) => (
							<View key={row.id} style={styles.detailRow} testID={row.testID}>
								<Text style={styles.detailLabel}>
									{t(`c20.${row.labelKey}`)}
								</Text>
								<Text style={styles.detailValue}>
									{t(`c20.${row.valueKey}`)}
								</Text>
							</View>
						))}
					</View>
				</View>

				{/* Section B: Additional Help */}
				<View style={styles.sectionCard} testID="c20-additional-help-card">
					<Text style={styles.sectionTitle}>
						{t("c20.additionalHelpSectionTitle")}
					</Text>

					<Pressable
						style={styles.helpOptionRow}
						testID="c20-help-disassembly"
						onPress={handleExtraAccessHelp}
						accessibilityRole="button"
						accessibilityLabel={t("c20.disassemblyTitle")}
					>
						<C18CheckIcon size={21} color={colors.brand} />
						<View style={styles.helpOptionTextCol}>
							<Text style={styles.helpOptionTitle}>
								{t("c20.disassemblyTitle")}
							</Text>
							<Text style={styles.helpOptionSub}>
								{t("c20.disassemblySub")}
							</Text>
						</View>
						<C18ChevronRightIcon size={17} color="#788580" />
					</Pressable>

					<Pressable
						style={styles.helpOptionRow}
						testID="c20-help-packing"
						onPress={handleExtraAccessHelp}
						accessibilityRole="button"
						accessibilityLabel={t("c20.packingTitle")}
					>
						<C20PinIcon size={21} color={colors.secondaryText} />
						<View style={styles.helpOptionTextCol}>
							<Text style={styles.helpOptionTitle}>
								{t("c20.packingTitle")}
							</Text>
							<Text style={styles.helpOptionSub}>{t("c20.packingSub")}</Text>
						</View>
						<C18ChevronRightIcon size={17} color="#788580" />
					</Pressable>
				</View>

				{/* Section C: Crew Eligibility */}
				<View style={styles.sectionCard} testID="c20-crew-eligibility-card">
					<Text style={styles.sectionTitle}>
						{t("c20.crewEligibilitySectionTitle")}
					</Text>

					<View style={styles.badgeRow}>
						<C18CheckIcon size={16} color={colors.secondaryText} />
						<Text style={styles.badgeText}>{t("c20.reviewRequiredBadge")}</Text>
					</View>

					<Text style={styles.bodyText}>{t("c20.crewGuidance1")}</Text>
					<Text style={styles.bodyText}>{t("c20.crewGuidance2")}</Text>
				</View>

				{/* Action Buttons */}
				<View style={styles.actionsSection}>
					<Pressable
						style={({ pressed }) => [
							styles.primaryButton,
							pressed && styles.primaryButtonPressed,
						]}
						onPress={handleContinueToRestrictions}
						accessibilityRole="button"
						accessibilityLabel={t("c20.continueCta")}
						testID="c20-continue-button"
					>
						<Text style={styles.primaryButtonText}>{t("c20.continueCta")}</Text>
					</Pressable>

					<Pressable
						style={({ pressed }) => [
							styles.secondaryButton,
							pressed && styles.secondaryButtonPressed,
						]}
						onPress={handleEditQuantities}
						accessibilityRole="button"
						accessibilityLabel={t("c20.editQuantitiesCta")}
						testID="c20-edit-quantities-button"
					>
						<Text style={styles.secondaryButtonText}>
							{t("c20.editQuantitiesCta")}
						</Text>
					</Pressable>
				</View>

				{/* Footer */}
				<View style={styles.footerSection}>
					<Text style={styles.footerText}>{t("c20.footerDemo")}</Text>
					<Text style={styles.footerText}>{t("c20.footerSrs")}</Text>
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
	detailRowsList: {
		gap: 8,
	},
	detailRow: {
		height: 64,
		backgroundColor: colors.elevated,
		borderRadius: 10,
		paddingTop: 10,
		paddingBottom: 8,
		paddingLeft: 12,
		paddingRight: 13,
		justifyContent: "center",
		gap: 6,
	},
	detailLabel: {
		fontFamily: fontFamily.medium,
		fontSize: 11,
		color: colors.secondaryText,
	},
	detailValue: {
		fontFamily: fontFamily.semiBold,
		fontSize: 12,
		color: colors.primaryText,
	},
	helpOptionRow: {
		height: 78,
		backgroundColor: colors.elevated,
		borderRadius: 11,
		paddingTop: 8,
		paddingBottom: 7,
		paddingLeft: 12,
		paddingRight: 13,
		flexDirection: "row",
		alignItems: "center",
		gap: 9,
	},
	helpOptionTextCol: {
		flex: 1,
		gap: 5,
	},
	helpOptionTitle: {
		fontFamily: fontFamily.semiBold,
		fontSize: 13,
		color: colors.primaryText,
	},
	helpOptionSub: {
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
