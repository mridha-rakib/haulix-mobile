import { radius, spacing } from "@haulix/design-tokens";
import { type Href, useRouter } from "expo-router";
import { useState } from "react";
import {
	KeyboardAvoidingView,
	Platform,
	Pressable,
	ScrollView,
	StyleSheet,
	Text,
	TextInput,
	View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import {
	ClipboardNoticeIcon,
	PackageCubeIcon,
	UsersIcon,
} from "../../src/components/icons/DriverIcons";
import { useDriverTranslation } from "../../src/i18n";
import { useServiceProgressStore } from "../../src/stores/serviceProgressStore";

export default function AdditionalWorkApprovalScreen() {
	const router = useRouter();
	const { t, currentLocale } = useDriverTranslation();
	const { activeJobId, getServiceProgress, createAdditionalWorkRequest } =
		useServiceProgressStore();
	const progress = getServiceProgress(activeJobId);
	const [extraScopeInput, setExtraScopeInput] = useState("");

	const isEs = currentLocale === "es";

	const handleSubmit = () => {
		const description =
			extraScopeInput.trim() ||
			(isEs
				? "Silla adicional / escaleras · ejemplo"
				: "Example additional chair / stair carry");
		createAdditionalWorkRequest({
			jobId: activeJobId,
			requestedBy: "PRIMARY_DRIVER",
			requestedScope: description,
			requestedScopeEs: isEs
				? description
				: "Silla adicional / escaleras · ejemplo",
			proposedPrice: 35.0,
		});
		router.push("/(app)/extra-work-pending" as Href);
	};

	const handleCancel = () => {
		router.push("/(app)/on-site-progress" as Href);
	};

	return (
		<SafeAreaView style={styles.safeArea} edges={["top", "left", "right"]}>
			<KeyboardAvoidingView
				style={styles.keyboardAvoid}
				behavior={Platform.OS === "ios" ? "padding" : undefined}
			>
				<ScrollView
					contentContainerStyle={styles.scrollContent}
					showsVerticalScrollIndicator={false}
				>
					{/* Header */}
					<View style={styles.header}>
						<Text style={styles.title}>
							{t("driver.additionalWorkApproval.title")}
						</Text>
						<Text style={styles.subtitle}>
							{t("driver.additionalWorkApproval.subtitle")}
						</Text>
					</View>

					{/* Card 1: Original Scope */}
					<View style={styles.card}>
						<View style={styles.cardIconWrap}>
							<PackageCubeIcon size={24} color="#BAFF42" />
						</View>
						<View style={styles.cardMetaWrap}>
							<Text style={styles.metaLabel}>
								{t("driver.additionalWorkApproval.originalScopeLabel")}
							</Text>
							<Text style={styles.metaTitle}>
								{isEs ? progress.originalScopeEs : progress.originalScope}
							</Text>
						</View>
					</View>

					{/* Card 2: Additional item / service */}
					<View style={styles.cardLarge}>
						<View style={styles.cardHeaderRow}>
							<View style={styles.cardIconWrap}>
								<ClipboardNoticeIcon size={24} color="#BAFF42" />
							</View>
							<Text style={styles.cardTitle}>
								{t("driver.additionalWorkApproval.extraItemTitle")}
							</Text>
						</View>

						<TextInput
							value={extraScopeInput}
							onChangeText={setExtraScopeInput}
							placeholder={t(
								"driver.additionalWorkApproval.extraItemPlaceholder",
							)}
							placeholderTextColor="#687873"
							multiline
							style={styles.textInput}
							accessibilityLabel={t(
								"driver.additionalWorkApproval.extraItemTitle",
							)}
						/>

						<Text style={styles.warningNotice}>
							{t("driver.additionalWorkApproval.noChargeWarning")}
						</Text>
					</View>

					{/* Card 3: Preview Admin + Customer Decision Required */}
					<View style={styles.cardLarge}>
						<View style={styles.cardHeaderRow}>
							<View style={styles.cardIconWrap}>
								<UsersIcon size={24} color="#BAFF42" />
							</View>
							<View style={styles.cardMetaWrap}>
								<Text style={styles.metaLabel}>
									{t("driver.additionalWorkApproval.previewLabel")}
								</Text>
								<Text style={styles.cardTitle}>
									{t("driver.additionalWorkApproval.previewTitle")}
								</Text>
							</View>
						</View>

						<Text style={styles.cardDesc}>
							{t("driver.additionalWorkApproval.previewDesc")}
						</Text>
					</View>

					<View style={{ height: spacing[3] }} />

					{/* Action Buttons */}
					<View style={styles.actionsContainer}>
						<Pressable
							onPress={handleSubmit}
							style={{
								backgroundColor: "#BAFF42",
								borderRadius: 16,
								paddingVertical: 14,
								alignItems: "center",
								justifyContent: "center",
							}}
							accessibilityRole="button"
							accessibilityLabel={t("driver.additionalWorkApproval.submitCta")}
						>
							<Text
								style={{
									fontFamily: "Inter_700Bold",
									fontSize: 14,
									color: "#080B0B",
									letterSpacing: 0.3,
								}}
							>
								{t("driver.additionalWorkApproval.submitCta")}
							</Text>
						</Pressable>

						<Pressable
							onPress={handleCancel}
							style={{
								backgroundColor: "#131917",
								borderRadius: 16,
								borderWidth: 1,
								borderColor: "#232C28",
								paddingVertical: 14,
								alignItems: "center",
								justifyContent: "center",
							}}
							accessibilityRole="button"
							accessibilityLabel={t("driver.additionalWorkApproval.cancelCta")}
						>
							<Text
								style={{
									fontFamily: "Inter_600SemiBold",
									fontSize: 14,
									color: "#F6F8F6",
								}}
							>
								{t("driver.additionalWorkApproval.cancelCta")}
							</Text>
						</Pressable>
					</View>
				</ScrollView>
			</KeyboardAvoidingView>
		</SafeAreaView>
	);
}

const styles = StyleSheet.create({
	safeArea: {
		flex: 1,
		backgroundColor: "#080B0B",
	},
	keyboardAvoid: {
		flex: 1,
	},
	scrollContent: {
		paddingHorizontal: spacing[4],
		paddingTop: spacing[2],
		paddingBottom: spacing[4],
	},
	header: {
		marginBottom: spacing[3],
	},
	title: {
		fontFamily: "Inter_700Bold",
		fontSize: 24,
		color: "#F6F8F6",
	},
	subtitle: {
		fontFamily: "Inter_400Regular",
		fontSize: 13,
		color: "#ADB8B0",
		marginTop: 4,
	},
	card: {
		backgroundColor: "#131917",
		borderRadius: radius.xl,
		padding: spacing[3],
		flexDirection: "row",
		alignItems: "center",
		marginBottom: spacing[2],
	},
	cardLarge: {
		backgroundColor: "#131917",
		borderRadius: radius.xl,
		padding: spacing[4],
		marginBottom: spacing[3],
	},
	cardHeaderRow: {
		flexDirection: "row",
		alignItems: "center",
		marginBottom: spacing[2],
	},
	cardIconWrap: {
		width: 32,
		alignItems: "center",
		justifyContent: "center",
		marginRight: spacing[2],
	},
	cardMetaWrap: {
		flex: 1,
	},
	metaLabel: {
		fontFamily: "Inter_400Regular",
		fontSize: 11,
		color: "#8E9E99",
	},
	metaTitle: {
		fontFamily: "Inter_600SemiBold",
		fontSize: 14,
		color: "#F6F8F6",
		marginTop: 2,
	},
	cardTitle: {
		fontFamily: "Inter_600SemiBold",
		fontSize: 15,
		color: "#F6F8F6",
	},
	textInput: {
		fontFamily: "Inter_400Regular",
		fontSize: 13,
		color: "#F6F8F6",
		minHeight: 48,
		paddingVertical: spacing[1],
		marginBottom: spacing[2],
	},
	warningNotice: {
		fontFamily: "Inter_600SemiBold",
		fontSize: 12,
		color: "#BAFF42",
		marginTop: spacing[1],
	},
	cardDesc: {
		fontFamily: "Inter_400Regular",
		fontSize: 12,
		color: "#ADB8B0",
		lineHeight: 17,
	},
	actionsContainer: {
		gap: spacing[2],
	},
});
