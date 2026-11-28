import { radius, spacing } from "@haulix/design-tokens";
import { useRouter } from "expo-router";
import { useState } from "react";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { ActionCtaButton } from "../../src/components/ui/ActionCtaButton";
import { FlowHeader } from "../../src/components/ui/FlowHeader";
import { HaulixFormField } from "../../src/components/ui/HaulixFormField";
import { HaulixOtpInput } from "../../src/components/ui/HaulixOtpInput";
import { InfoCard } from "../../src/components/ui/InfoCard";
import { useDriverTranslation } from "../../src/i18n";
import { useDriverAuthStore } from "../../src/stores/authStore";

export default function PhoneSignInScreen() {
	const router = useRouter();
	const { t } = useDriverTranslation();
	const { setRole, loginMock } = useDriverAuthStore();

	const [phone, setPhone] = useState("+1 (602) 555-0142");
	const [code, setCode] = useState("");
	const [error, setError] = useState<string | undefined>();

	const handlePreviewDriver = () => {
		setRole("PRIMARY_DRIVER");
		loginMock(phone, "PRIMARY_DRIVER");
		router.replace("/(app)/(tabs)");
	};

	const handlePreviewHelper = () => {
		setRole("HELPER");
		loginMock(phone, "HELPER");
		router.replace("/(app)/(tabs)");
	};

	return (
		<SafeAreaView style={styles.safeArea}>
			<FlowHeader
				title={t("driver.phoneSignIn.title")}
				subtitle={t("driver.phoneSignIn.subtitle")}
				onBack={() => router.back()}
			/>

			<ScrollView
				contentContainerStyle={styles.scrollContent}
				keyboardShouldPersistTaps="handled"
				showsVerticalScrollIndicator={false}
			>
				<View style={styles.demoTagBox}>
					<Text style={styles.demoTagTitle}>
						{t("driver.phoneSignIn.demoTag")}
					</Text>
					<Text style={styles.demoTagDesc}>
						{t("driver.phoneSignIn.demoSubtitle")}
					</Text>
				</View>

				<HaulixFormField
					label="Phone Number"
					value={phone}
					onChangeText={setPhone}
					keyboardType="phone-pad"
				/>

				<View style={{ height: spacing[2] }} />

				<HaulixOtpInput
					value={code}
					onChange={(val) => {
						setCode(val);
						if (error) setError(undefined);
					}}
					error={error}
				/>

				<View style={{ height: spacing[4] }} />

				<Pressable
					onPress={() => router.push("/(auth)/code-help")}
					style={({ pressed }) => [
						styles.helpLink,
						pressed && styles.helpLinkPressed,
					]}
				>
					<Text style={styles.helpLinkText}>
						{t("driver.phoneVerification.expiredRecovery")}
					</Text>
				</Pressable>

				<View style={{ height: spacing[4] }} />

				<InfoCard
					title={t("driver.phoneSignIn.demoNavTitle")}
					body={t("driver.phoneSignIn.demoNavBody")}
					variant="highlight"
				/>

				<View style={{ height: spacing[5] }} />

				<ActionCtaButton
					label={t("driver.phoneSignIn.previewDriverCta")}
					onPress={handlePreviewDriver}
					variant="primary"
					size="large"
				/>

				<View style={{ height: spacing[3] }} />

				<ActionCtaButton
					label={t("driver.phoneSignIn.previewHelperCta")}
					onPress={handlePreviewHelper}
					variant="outline"
					size="large"
				/>

				<View style={{ height: spacing[3] }} />

				<ActionCtaButton
					label={t("driver.checkInbox.backToSignIn")}
					onPress={() => router.push("/(auth)/sign-in")}
					variant="outline"
					size="large"
				/>
			</ScrollView>
		</SafeAreaView>
	);
}

const styles = StyleSheet.create({
	safeArea: {
		flex: 1,
		backgroundColor: "#080B0B",
	},
	scrollContent: {
		paddingHorizontal: spacing[4],
		paddingBottom: spacing[8],
	},
	demoTagBox: {
		backgroundColor: "#151A19",
		borderWidth: 1,
		borderColor: "#2B3532",
		borderRadius: radius.lg,
		padding: spacing[3],
		marginBottom: spacing[4],
	},
	demoTagTitle: {
		fontFamily: "Inter_600SemiBold",
		fontSize: 14,
		color: "#BAFF42",
		marginBottom: 2,
	},
	demoTagDesc: {
		fontFamily: "Inter_400Regular",
		fontSize: 12,
		color: "#ADB8B0",
		lineHeight: 16,
	},
	helpLink: {
		alignItems: "center",
		paddingVertical: spacing[1.5],
	},
	helpLinkPressed: {
		opacity: 0.7,
	},
	helpLinkText: {
		fontFamily: "Inter_500Medium",
		fontSize: 13,
		color: "#ADB8B0",
		textDecorationLine: "underline",
	},
});
