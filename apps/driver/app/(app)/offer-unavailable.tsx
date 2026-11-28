import { radius, spacing } from "@haulix/design-tokens";
import { type Href, useRouter } from "expo-router";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { ClockTimerIcon } from "../../src/components/icons/DriverIcons";
import { FlowHeader } from "../../src/components/ui/FlowHeader";
import { useDriverTranslation } from "../../src/i18n";
import { useDispatchCrewStore } from "../../src/stores/dispatchCrewStore";

export default function OfferUnavailableScreen() {
	const router = useRouter();
	const { t } = useDriverTranslation();
	const { setOffersFilter } = useDispatchCrewStore();

	const handleBackToOffers = () => {
		setOffersFilter("available");
		router.replace("/(app)/job-offers" as Href);
	};

	const handleViewOtherJobs = () => {
		setOffersFilter("available");
		router.replace("/(app)/(tabs)/jobs" as Href);
	};

	return (
		<SafeAreaView style={styles.safeArea}>
			<FlowHeader
				title={t("driver.offerUnavailable.title")}
				subtitle={t("driver.offerUnavailable.subtitle")}
				onBack={() => router.back()}
			/>

			<View style={styles.container}>
				{/* Center Graphic Container (Figma 1086:205) */}
				<View style={styles.centerSection}>
					<View style={styles.graphicBox}>
						<ClockTimerIcon size={52} color="#FFA500" />
					</View>

					<Text style={styles.mainTitle}>
						{t("driver.offerUnavailable.mainTitle")}
					</Text>
					<Text style={styles.descText}>
						{t("driver.offerUnavailable.desc")}
					</Text>
					<Text style={styles.subText}>{t("driver.offerUnavailable.sub")}</Text>
				</View>

				{/* Bottom Actions */}
				<View style={styles.bottomActions}>
					<Pressable
						onPress={handleBackToOffers}
						style={({ pressed }) => [
							styles.primaryBtn,
							pressed && styles.btnPressed,
						]}
						accessibilityRole="button"
						accessibilityLabel={t("driver.offerUnavailable.backCta")}
					>
						<Text style={styles.primaryBtnText}>
							{t("driver.offerUnavailable.backCta")}
						</Text>
					</Pressable>

					<Pressable
						onPress={handleViewOtherJobs}
						style={({ pressed }) => [
							styles.secondaryBtn,
							pressed && styles.btnPressed,
						]}
						accessibilityRole="button"
						accessibilityLabel={t("driver.offerUnavailable.otherJobsCta")}
					>
						<Text style={styles.secondaryBtnText}>
							{t("driver.offerUnavailable.otherJobsCta")}
						</Text>
					</Pressable>
				</View>
			</View>
		</SafeAreaView>
	);
}

const styles = StyleSheet.create({
	safeArea: {
		flex: 1,
		backgroundColor: "#080B0B",
	},
	container: {
		flex: 1,
		paddingHorizontal: spacing[4],
		justifyContent: "space-between",
		paddingBottom: spacing[8],
	},
	centerSection: {
		alignItems: "center",
		marginTop: spacing[8],
	},
	graphicBox: {
		width: 130,
		height: 130,
		borderRadius: radius["2xl"],
		backgroundColor: "#151A19",
		borderWidth: 1,
		borderColor: "#232C28",
		alignItems: "center",
		justifyContent: "center",
		marginBottom: spacing[6],
	},
	mainTitle: {
		fontFamily: "Inter_700Bold",
		fontSize: 22,
		color: "#F6F8F6",
		textAlign: "center",
		marginBottom: spacing[3],
	},
	descText: {
		fontFamily: "Inter_400Regular",
		fontSize: 14,
		color: "#ADB8B0",
		textAlign: "center",
		lineHeight: 20,
		marginBottom: spacing[4],
		paddingHorizontal: spacing[2],
	},
	subText: {
		fontFamily: "Inter_400Regular",
		fontSize: 12,
		color: "#8E9E99",
		textAlign: "center",
	},
	bottomActions: {
		gap: spacing[3],
	},
	primaryBtn: {
		backgroundColor: "#BAFF42",
		borderRadius: radius.full,
		paddingVertical: spacing[3],
		alignItems: "center",
		justifyContent: "center",
	},
	primaryBtnText: {
		fontFamily: "Inter_700Bold",
		fontSize: 15,
		color: "#080B0B",
	},
	secondaryBtn: {
		backgroundColor: "#151A19",
		borderRadius: radius.full,
		paddingVertical: spacing[3],
		alignItems: "center",
		justifyContent: "center",
		borderWidth: 1,
		borderColor: "#232C28",
	},
	secondaryBtnText: {
		fontFamily: "Inter_600SemiBold",
		fontSize: 14,
		color: "#F6F8F6",
	},
	btnPressed: {
		opacity: 0.85,
		transform: [{ scale: 0.99 }],
	},
});
