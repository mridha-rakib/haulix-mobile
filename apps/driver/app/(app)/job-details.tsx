import { radius, spacing } from "@haulix/design-tokens";
import { type Href, useRouter } from "expo-router";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import {
	BoxIcon,
	CalendarIcon,
	HelperUsersIcon,
	MapPinIcon,
	SofaIcon,
	TruckIcon,
	WalletIcon,
} from "../../src/components/icons/DriverIcons";
import { FlowHeader } from "../../src/components/ui/FlowHeader";
import { useDriverTranslation } from "../../src/i18n";
import { useDispatchCrewStore } from "../../src/stores/dispatchCrewStore";

export default function JobDetailsScreen() {
	const router = useRouter();
	const { t, currentLocale } = useDriverTranslation();
	const { getSelectedJob, acceptJobOffer, declineJobOffer } =
		useDispatchCrewStore();

	const isEs = currentLocale === "es";
	const job = getSelectedJob();

	const title = isEs ? job.titleEs : job.titleEn;
	const location = isEs ? job.locationEs : job.locationEn;
	const route = isEs ? job.pickupRouteEs : job.pickupRouteEn;
	const items = isEs ? job.serviceItemsEs : job.serviceItemsEn;
	const schedule = isEs ? job.scheduleEs : job.scheduleEn;

	const handleAccept = () => {
		const success = acceptJobOffer(job.id);
		if (success) {
			router.push("/(app)/invite-helper" as Href);
		} else {
			router.push("/(app)/offer-unavailable" as Href);
		}
	};

	const handleDecline = () => {
		declineJobOffer(job.id);
		router.back();
	};

	return (
		<SafeAreaView style={styles.safeArea}>
			<FlowHeader
				title={t("driver.jobDetails.title")}
				subtitle={t("driver.jobDetails.subtitle")}
				onBack={() => router.back()}
			/>

			<ScrollView
				contentContainerStyle={styles.scrollContent}
				showsVerticalScrollIndicator={false}
			>
				{/* New Offer Badge (Figma 1086:162) */}
				<View style={styles.badgeWrapper}>
					<View style={styles.badgePill}>
						<Text style={styles.badgeText}>
							{t("driver.jobDetails.badgeNewOffer")}
						</Text>
					</View>
				</View>

				{/* Stack of Cards (Figma 1086:162) */}
				<View style={styles.cardStack}>
					{/* Card 1: Service */}
					<View style={styles.detailCard}>
						<View style={styles.iconBox}>
							<SofaIcon size={20} color="#BAFF42" />
						</View>
						<View style={styles.cardContent}>
							<Text style={styles.cardLabel}>
								{t("driver.jobDetails.labelService")}
							</Text>
							<Text style={styles.cardValue}>{title}</Text>
						</View>
					</View>

					{/* Card 2: Job ID / Location */}
					<View style={styles.detailCard}>
						<View style={styles.iconBox}>
							<MapPinIcon size={20} color="#BAFF42" />
						</View>
						<View style={styles.cardContent}>
							<Text style={styles.cardLabel}>
								{t("driver.jobDetails.labelJobId")}
							</Text>
							<Text style={styles.cardValue}>{`${job.id} · ${location}`}</Text>
						</View>
					</View>

					{/* Card 3: Pickup / Route */}
					<View style={styles.detailCard}>
						<View style={styles.iconBox}>
							<TruckIcon size={20} color="#BAFF42" />
						</View>
						<View style={styles.cardContent}>
							<Text style={styles.cardLabel}>
								{t("driver.jobDetails.labelRoute")}
							</Text>
							<Text style={styles.cardValue}>{route}</Text>
						</View>
					</View>

					{/* Card 4: Service Items */}
					<View style={styles.detailCard}>
						<View style={styles.iconBox}>
							<BoxIcon size={20} color="#BAFF42" />
						</View>
						<View style={styles.cardContent}>
							<Text style={styles.cardLabel}>
								{t("driver.jobDetails.labelServiceItems")}
							</Text>
							<Text style={styles.cardValue}>{items}</Text>
						</View>
					</View>

					{/* Card 5: Schedule */}
					<View style={styles.detailCard}>
						<View style={styles.iconBox}>
							<CalendarIcon size={20} color="#BAFF42" />
						</View>
						<View style={styles.cardContent}>
							<Text style={styles.cardLabel}>
								{t("driver.jobDetails.labelSchedule")}
							</Text>
							<Text style={styles.cardValue}>{schedule}</Text>
						</View>
					</View>

					{/* Card 6: Expected Worker Earnings */}
					<View style={styles.detailCard}>
						<View style={styles.iconBox}>
							<WalletIcon size={20} color="#BAFF42" />
						</View>
						<View style={styles.cardContent}>
							<Text style={styles.cardLabel}>
								{t("driver.jobDetails.labelExpectedEarnings")}
							</Text>
							<Text style={styles.cardValueLime}>
								{t("driver.jobDetails.earningsSub")}
							</Text>
						</View>
					</View>

					{/* Card 7: Crew Readiness Notice */}
					<View style={styles.crewCard}>
						<View style={styles.crewLeftIcon}>
							<HelperUsersIcon size={24} color="#BAFF42" />
						</View>
						<View style={styles.crewTextGroup}>
							<Text style={styles.crewTitle}>
								{t("driver.jobDetails.crewReadinessTitle")}
							</Text>
							<Text style={styles.crewSub}>
								{t("driver.jobDetails.crewReadinessSub")}
							</Text>
						</View>
					</View>
				</View>

				<View style={{ height: spacing[4] }} />

				{/* Action Buttons (Figma 1086:162) */}
				<Pressable
					onPress={handleAccept}
					style={({ pressed }) => [
						styles.primaryBtn,
						pressed && styles.btnPressed,
					]}
					accessibilityRole="button"
					accessibilityLabel={t("driver.jobDetails.acceptCta")}
				>
					<Text style={styles.primaryBtnText}>
						{t("driver.jobDetails.acceptCta")}
					</Text>
				</Pressable>

				<Pressable
					onPress={handleDecline}
					style={({ pressed }) => [
						styles.secondaryBtn,
						pressed && styles.btnPressed,
					]}
					accessibilityRole="button"
					accessibilityLabel={t("driver.jobDetails.declineCta")}
				>
					<Text style={styles.secondaryBtnText}>
						{t("driver.jobDetails.declineCta")}
					</Text>
				</Pressable>
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
	badgeWrapper: {
		marginBottom: spacing[3],
		flexDirection: "row",
	},
	badgePill: {
		backgroundColor: "#BAFF42",
		paddingHorizontal: spacing[3],
		paddingVertical: 5,
		borderRadius: radius.full,
	},
	badgeText: {
		fontFamily: "Inter_700Bold",
		fontSize: 11,
		color: "#080B0B",
		letterSpacing: 0.5,
	},
	cardStack: {
		gap: spacing[2.5],
	},
	detailCard: {
		backgroundColor: "#151A19",
		borderRadius: radius.xl,
		padding: spacing[3],
		borderWidth: 1,
		borderColor: "#232C28",
		flexDirection: "row",
		alignItems: "center",
		gap: spacing[3],
	},
	iconBox: {
		width: 42,
		height: 42,
		borderRadius: radius.lg,
		backgroundColor: "#1E2523",
		alignItems: "center",
		justifyContent: "center",
	},
	cardContent: {
		flex: 1,
	},
	cardLabel: {
		fontFamily: "Inter_400Regular",
		fontSize: 12,
		color: "#8E9E99",
		marginBottom: 2,
	},
	cardValue: {
		fontFamily: "Inter_600SemiBold",
		fontSize: 14,
		color: "#F6F8F6",
	},
	cardValueLime: {
		fontFamily: "Inter_600SemiBold",
		fontSize: 13,
		color: "#BAFF42",
	},
	crewCard: {
		backgroundColor: "#151A19",
		borderRadius: radius.xl,
		padding: spacing[4],
		borderWidth: 1,
		borderColor: "#232C28",
		flexDirection: "row",
		alignItems: "flex-start",
		gap: spacing[3],
	},
	crewLeftIcon: {
		marginTop: 2,
	},
	crewTextGroup: {
		flex: 1,
	},
	crewTitle: {
		fontFamily: "Inter_700Bold",
		fontSize: 15,
		color: "#F6F8F6",
		marginBottom: 4,
	},
	crewSub: {
		fontFamily: "Inter_400Regular",
		fontSize: 12,
		color: "#ADB8B0",
		lineHeight: 17,
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
