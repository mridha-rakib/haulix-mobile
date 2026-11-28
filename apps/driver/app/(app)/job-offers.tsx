import { radius, spacing } from "@haulix/design-tokens";
import { type Href, useRouter } from "expo-router";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { MapPinIcon, TruckIcon } from "../../src/components/icons/DriverIcons";
import { DriverBottomNav } from "../../src/components/navigation/DriverBottomNav";
import { useDriverTranslation } from "../../src/i18n";
import {
	type MockJobOffer,
	useDispatchCrewStore,
} from "../../src/stores/dispatchCrewStore";

export function JobOffersContent() {
	const router = useRouter();
	const { t, currentLocale } = useDriverTranslation();
	const {
		offers,
		offersFilter,
		setOffersFilter,
		setSelectedJobId,
		expireJobOffer,
	} = useDispatchCrewStore();

	const isEs = currentLocale === "es";

	const handleSelectOffer = (offer: MockJobOffer) => {
		setSelectedJobId(offer.id);
		if (offersFilter === "expired" || offer.status === "EXPIRED") {
			router.push("/(app)/offer-unavailable" as Href);
		} else {
			router.push("/(app)/job-details" as Href);
		}
	};

	const handleFilterPress = (
		filter: "available" | "invitations" | "expired",
	) => {
		setOffersFilter(filter);
		if (filter === "invitations") {
			router.push("/(app)/helper-invitations" as Href);
		} else if (filter === "expired") {
			expireJobOffer("HX-AZ-DEMO-0042");
		}
	};

	const displayOffers =
		offersFilter === "expired"
			? offers.map((o) => ({ ...o, status: "EXPIRED" as const }))
			: offers;

	return (
		<View style={styles.flexContainer}>
			<ScrollView
				contentContainerStyle={styles.scrollContent}
				showsVerticalScrollIndicator={false}
			>
				{/* Screen Header */}
				<View style={styles.header}>
					<Text style={styles.title}>{t("driver.jobOffers.title")}</Text>
					<Text style={styles.subtitle}>{t("driver.jobOffers.subtitle")}</Text>
				</View>

				{/* 3-Segment Filter Bar (Figma 1086:81) */}
				<View style={styles.filterContainer}>
					<Pressable
						onPress={() => handleFilterPress("available")}
						style={[
							styles.filterTab,
							offersFilter === "available" && styles.filterTabActive,
						]}
						accessibilityRole="tab"
						accessibilityState={{ selected: offersFilter === "available" }}
					>
						<Text
							style={[
								styles.filterText,
								offersFilter === "available" && styles.filterTextActive,
							]}
						>
							{t("driver.jobOffers.tabAvailable")}
						</Text>
					</Pressable>

					<Pressable
						onPress={() => handleFilterPress("invitations")}
						style={[
							styles.filterTab,
							offersFilter === "invitations" && styles.filterTabActive,
						]}
						accessibilityRole="tab"
						accessibilityState={{ selected: offersFilter === "invitations" }}
					>
						<Text
							style={[
								styles.filterText,
								offersFilter === "invitations" && styles.filterTextActive,
							]}
						>
							{t("driver.jobOffers.tabInvitations")}
						</Text>
					</Pressable>

					<Pressable
						onPress={() => handleFilterPress("expired")}
						style={[
							styles.filterTab,
							offersFilter === "expired" && styles.filterTabActive,
						]}
						accessibilityRole="tab"
						accessibilityState={{ selected: offersFilter === "expired" }}
					>
						<Text
							style={[
								styles.filterText,
								offersFilter === "expired" && styles.filterTextActive,
							]}
						>
							{t("driver.jobOffers.tabExpired")}
						</Text>
					</Pressable>
				</View>

				{/* Job Offer Cards (Figma 1086:81) */}
				<View style={styles.cardsList}>
					{displayOffers.map((offer) => {
						const title = isEs ? offer.titleEs : offer.titleEn;
						const location = isEs ? offer.locationEs : offer.locationEn;
						const note = isEs ? offer.noteEs : offer.noteEn;

						return (
							<Pressable
								key={offer.id}
								onPress={() => handleSelectOffer(offer)}
								style={({ pressed }) => [
									styles.offerCard,
									pressed && styles.cardPressed,
								]}
								accessibilityRole="button"
								accessibilityLabel={`${title}, ${location}`}
							>
								<View style={styles.cardTopRow}>
									<View style={styles.cardHeaderLeft}>
										<View style={styles.iconBox}>
											<TruckIcon size={20} color="#BAFF42" />
										</View>
										<View style={styles.titleGroup}>
											<Text style={styles.cardTitle}>{title}</Text>
											<Text style={styles.cardSubtitle}>{offer.id}</Text>
										</View>
									</View>

									<View style={styles.badgePill}>
										<Text style={styles.badgeText}>
											{t("driver.jobOffers.badgeNew")}
										</Text>
									</View>
								</View>

								{/* Location row */}
								<View style={styles.locationRow}>
									<MapPinIcon size={16} color="#BAFF42" />
									<Text style={styles.locationText}>{location}</Text>
								</View>

								{/* Footer estimate note */}
								<Text style={styles.footerNote}>{note}</Text>
							</Pressable>
						);
					})}
				</View>

				{/* Bottom Disclaimer */}
				<Text style={styles.disclaimer}>
					{t("driver.jobOffers.disclaimer")}
				</Text>
			</ScrollView>
		</View>
	);
}

export default function JobOffersScreen() {
	return (
		<SafeAreaView style={styles.safeArea} edges={["top", "left", "right"]}>
			<JobOffersContent />
			<DriverBottomNav />
		</SafeAreaView>
	);
}

const styles = StyleSheet.create({
	safeArea: {
		flex: 1,
		backgroundColor: "#080B0B",
	},
	flexContainer: {
		flex: 1,
	},
	scrollContent: {
		paddingHorizontal: spacing[4],
		paddingTop: spacing[2],
		paddingBottom: spacing[6],
	},
	header: {
		marginBottom: spacing[4],
	},
	title: {
		fontFamily: "Inter_700Bold",
		fontSize: 28,
		color: "#F6F8F6",
		marginBottom: spacing[1],
	},
	subtitle: {
		fontFamily: "Inter_400Regular",
		fontSize: 14,
		color: "#ADB8B0",
	},
	filterContainer: {
		flexDirection: "row",
		backgroundColor: "#151A19",
		borderRadius: radius.xl,
		padding: 4,
		borderWidth: 1,
		borderColor: "#232C28",
		marginBottom: spacing[4],
	},
	filterTab: {
		flex: 1,
		paddingVertical: spacing[2.5],
		borderRadius: radius.lg,
		alignItems: "center",
		justifyContent: "center",
	},
	filterTabActive: {
		backgroundColor: "#BAFF42",
	},
	filterText: {
		fontFamily: "Inter_600SemiBold",
		fontSize: 13,
		color: "#8E9E99",
	},
	filterTextActive: {
		color: "#080B0B",
		fontFamily: "Inter_700Bold",
	},
	cardsList: {
		gap: spacing[3],
	},
	offerCard: {
		backgroundColor: "#151A19",
		borderRadius: radius.xl,
		padding: spacing[4],
		borderWidth: 1,
		borderColor: "#232C28",
	},
	cardPressed: {
		opacity: 0.85,
		transform: [{ scale: 0.99 }],
	},
	cardTopRow: {
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-between",
		marginBottom: spacing[3],
	},
	cardHeaderLeft: {
		flexDirection: "row",
		alignItems: "center",
		gap: spacing[3],
		flex: 1,
	},
	iconBox: {
		width: 44,
		height: 44,
		borderRadius: radius.lg,
		backgroundColor: "#1E2523",
		alignItems: "center",
		justifyContent: "center",
	},
	titleGroup: {
		flex: 1,
	},
	cardTitle: {
		fontFamily: "Inter_700Bold",
		fontSize: 17,
		color: "#F6F8F6",
		marginBottom: 2,
	},
	cardSubtitle: {
		fontFamily: "Inter_500Medium",
		fontSize: 12,
		color: "#8E9E99",
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
	locationRow: {
		flexDirection: "row",
		alignItems: "center",
		gap: spacing[2],
		marginBottom: spacing[3],
	},
	locationText: {
		fontFamily: "Inter_500Medium",
		fontSize: 14,
		color: "#F6F8F6",
	},
	footerNote: {
		fontFamily: "Inter_500Medium",
		fontSize: 12,
		color: "#BAFF42",
	},
	disclaimer: {
		fontFamily: "Inter_400Regular",
		fontSize: 12,
		color: "#8E9E99",
		marginTop: spacing[4],
		lineHeight: 18,
	},
});
