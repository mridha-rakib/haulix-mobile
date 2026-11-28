import { radius, spacing } from "@haulix/design-tokens";
import { useRouter } from "expo-router";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { MailIcon } from "../../src/components/icons/DriverIcons";
import { ActionCtaButton } from "../../src/components/ui/ActionCtaButton";
import { FlowHeader } from "../../src/components/ui/FlowHeader";
import { InfoCard } from "../../src/components/ui/InfoCard";
import { useDriverTranslation } from "../../src/i18n";

export default function ResetConfirmationScreen() {
	const router = useRouter();
	const { t } = useDriverTranslation();

	return (
		<SafeAreaView style={styles.safeArea}>
			<FlowHeader
				title={t("driver.checkInbox.title")}
				subtitle={t("driver.checkInbox.subtitle")}
				onBack={() => router.push("/(auth)/sign-in")}
			/>

			<ScrollView
				contentContainerStyle={styles.scrollContent}
				showsVerticalScrollIndicator={false}
			>
				<View style={styles.iconCircleContainer}>
					<View style={styles.iconCircle}>
						<MailIcon size={36} color="#BAFF42" />
					</View>
				</View>

				<View style={styles.statusBox}>
					<Text style={styles.statusTitle}>
						{t("driver.checkInbox.statusTitle")}
					</Text>
					<Text style={styles.statusBody}>
						{t("driver.checkInbox.statusBody")}
					</Text>
				</View>

				<InfoCard
					title={t("driver.checkInbox.infoTitle")}
					body={t("driver.checkInbox.infoBody")}
					variant="highlight"
				/>

				<View style={{ height: spacing[6] }} />

				<ActionCtaButton
					label={t("driver.checkInbox.backToSignIn")}
					onPress={() => router.push("/(auth)/sign-in")}
					variant="primary"
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
	iconCircleContainer: {
		alignItems: "center",
		justifyContent: "center",
		width: "100%",
	},
	iconCircle: {
		width: 72,
		height: 72,
		borderRadius: 36,
		backgroundColor: "#1A221E",
		borderWidth: 2,
		borderColor: "#35403B",
		alignItems: "center",
		justifyContent: "center",
		marginVertical: spacing[5],
	},
	statusBox: {
		width: "100%",
		backgroundColor: "#151A19",
		borderRadius: radius.lg,
		padding: spacing[4],
		borderWidth: 1,
		borderColor: "#2B3532",
		marginBottom: spacing[4],
		alignItems: "center",
	},
	statusTitle: {
		fontFamily: "Inter_700Bold",
		fontSize: 18,
		color: "#F6F8F6",
		marginBottom: spacing[1],
		textAlign: "center",
	},
	statusBody: {
		fontFamily: "Inter_400Regular",
		fontSize: 13,
		lineHeight: 18,
		color: "#ADB8B0",
		textAlign: "center",
	},
});
