import { radius, spacing } from "@haulix/design-tokens";
import { type Href, useRouter } from "expo-router";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { ChevronRightIcon } from "../../src/components/icons/DriverIcons";
import { DriverBottomNav } from "../../src/components/navigation/DriverBottomNav";
import { FlowHeader } from "../../src/components/ui/FlowHeader";
import { useDriverTranslation } from "../../src/i18n";
import { useDispatchCrewStore } from "../../src/stores/dispatchCrewStore";

export default function ChooseHelperScreen() {
	const router = useRouter();
	const { t, currentLocale } = useDriverTranslation();
	const {
		helpers,
		selectedHelperId,
		selectHelper,
		getSelectedJob,
		sendHelperInvitation,
	} = useDispatchCrewStore();

	const isEs = currentLocale === "es";
	const job = getSelectedJob();

	const handleSelectHelperRow = (helperId: string) => {
		selectHelper(helperId);
	};

	const handleReviewInvitation = () => {
		const helperId = selectedHelperId || "helper-a";
		sendHelperInvitation(job.id, helperId);
		router.push("/(app)/invitation-pending" as Href);
	};

	const handleBackToJob = () => {
		router.back();
	};

	return (
		<SafeAreaView style={styles.safeArea} edges={["top", "left", "right"]}>
			<FlowHeader
				title={t("driver.chooseHelper.title")}
				subtitle={t("driver.chooseHelper.subtitle")}
				onBack={() => router.back()}
			/>

			<ScrollView
				contentContainerStyle={styles.scrollContent}
				showsVerticalScrollIndicator={false}
			>
				{/* Helper Cards List (Figma 1301:920) */}
				<View style={styles.helperList}>
					{helpers.map((h) => {
						const name = isEs ? h.nameEs : h.nameEn;
						const isSelected = selectedHelperId === h.id;

						return (
							<Pressable
								key={h.id}
								onPress={() => handleSelectHelperRow(h.id)}
								style={({ pressed }) => [
									styles.helperRowCard,
									isSelected && styles.helperRowCardSelected,
									pressed && styles.cardPressed,
								]}
								accessibilityRole="button"
								accessibilityLabel={`${name}, ${t("driver.chooseHelper.eligibleStatus")}`}
							>
								<View style={styles.helperTextGroup}>
									<Text style={styles.helperName}>{name}</Text>
									<Text style={styles.helperStatus}>
										{t("driver.chooseHelper.eligibleStatus")}
									</Text>
								</View>
								<ChevronRightIcon
									size={20}
									color={isSelected ? "#BAFF42" : "#8E9E99"}
								/>
							</Pressable>
						);
					})}
				</View>

				{/* Notice Card: Independent Acceptance (Figma 1301:920) */}
				<View style={styles.noticeCard}>
					<Text style={styles.noticeTitle}>
						{t("driver.chooseHelper.independentTitle")}
					</Text>
					<Text style={styles.noticeDesc}>
						{t("driver.chooseHelper.independentDesc")}
					</Text>
				</View>

				<View style={{ height: spacing[6] }} />

				{/* Primary CTA */}
				<Pressable
					onPress={handleReviewInvitation}
					style={({ pressed }) => [
						styles.primaryBtn,
						pressed && styles.btnPressed,
					]}
					accessibilityRole="button"
					accessibilityLabel={t("driver.chooseHelper.reviewInviteCta")}
				>
					<Text style={styles.primaryBtnText}>
						{t("driver.chooseHelper.reviewInviteCta")}
					</Text>
				</Pressable>

				{/* Secondary CTA */}
				<Pressable
					onPress={handleBackToJob}
					style={({ pressed }) => [
						styles.secondaryBtn,
						pressed && styles.btnPressed,
					]}
					accessibilityRole="button"
					accessibilityLabel={t("driver.chooseHelper.backToJobCta")}
				>
					<Text style={styles.secondaryBtnText}>
						{t("driver.chooseHelper.backToJobCta")}
					</Text>
				</Pressable>
			</ScrollView>

			{/* Master 5-Tab Navigation Bar */}
			<DriverBottomNav />
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
		paddingBottom: spacing[6],
	},
	helperList: {
		gap: spacing[3],
		marginBottom: spacing[4],
	},
	helperRowCard: {
		backgroundColor: "#151A19",
		borderRadius: radius.xl,
		padding: spacing[4],
		borderWidth: 1,
		borderColor: "#232C28",
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-between",
	},
	helperRowCardSelected: {
		borderColor: "#BAFF42",
		backgroundColor: "#18211E",
	},
	cardPressed: {
		opacity: 0.85,
		transform: [{ scale: 0.99 }],
	},
	helperTextGroup: {
		flex: 1,
	},
	helperName: {
		fontFamily: "Inter_700Bold",
		fontSize: 16,
		color: "#F6F8F6",
		marginBottom: 4,
	},
	helperStatus: {
		fontFamily: "Inter_400Regular",
		fontSize: 12,
		color: "#8E9E99",
	},
	noticeCard: {
		backgroundColor: "#151A19",
		borderRadius: radius.xl,
		padding: spacing[4],
		borderWidth: 1,
		borderColor: "#232C28",
		marginBottom: spacing[4],
	},
	noticeTitle: {
		fontFamily: "Inter_700Bold",
		fontSize: 15,
		color: "#F6F8F6",
		marginBottom: 4,
	},
	noticeDesc: {
		fontFamily: "Inter_400Regular",
		fontSize: 13,
		color: "#ADB8B0",
		lineHeight: 18,
	},
	primaryBtn: {
		backgroundColor: "#BAFF42",
		borderRadius: radius.full,
		paddingVertical: spacing[3],
		alignItems: "center",
		justifyContent: "center",
		marginBottom: spacing[3],
	},
	primaryBtnText: {
		fontFamily: "Inter_700Bold",
		fontSize: 15,
		color: "#080B0B",
	},
	secondaryBtn: {
		backgroundColor: "transparent",
		borderRadius: radius.full,
		paddingVertical: spacing[3],
		alignItems: "center",
		justifyContent: "center",
		borderWidth: 1,
		borderColor: "#BAFF42",
	},
	secondaryBtnText: {
		fontFamily: "Inter_700Bold",
		fontSize: 14,
		color: "#BAFF42",
	},
	btnPressed: {
		opacity: 0.85,
		transform: [{ scale: 0.99 }],
	},
});
