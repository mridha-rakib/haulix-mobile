import { radius, spacing } from "@haulix/design-tokens";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useDriverTranslation } from "../../../src/i18n";

export default function EarningsScreen() {
	const { t } = useDriverTranslation();

	return (
		<SafeAreaView style={styles.safeArea}>
			<View style={styles.header}>
				<Text style={styles.headerTitle}>{t("driver.tabs.earnings")}</Text>
				<Text style={styles.headerSub}>Payouts & Direct Deposit Summary</Text>
			</View>

			<ScrollView
				contentContainerStyle={styles.scrollContent}
				showsVerticalScrollIndicator={false}
			>
				{/* Total Available Balance Card */}
				<View style={styles.balanceCard}>
					<Text style={styles.balanceLabel}>AVAILABLE FOR TRANSFER</Text>
					<Text style={styles.balanceAmount}>$428.50</Text>
					<Text style={styles.balanceSub}>
						Cleared balance ready for instant payout
					</Text>

					<Pressable style={styles.transferBtn}>
						<Text style={styles.transferBtnText}>
							Instant Cash Out ($428.50)
						</Text>
					</Pressable>
				</View>

				{/* Weekly Stats Grid */}
				<View style={styles.statsRow}>
					<View style={styles.statBox}>
						<Text style={styles.statLabel}>THIS WEEK</Text>
						<Text style={styles.statVal}>$1,248.50</Text>
					</View>
					<View style={styles.statBox}>
						<Text style={styles.statLabel}>COMPLETED</Text>
						<Text style={styles.statVal}>18 jobs</Text>
					</View>
					<View style={styles.statBox}>
						<Text style={styles.statLabel}>TIPS INCLUDED</Text>
						<Text style={styles.statVal}>$160.00</Text>
					</View>
				</View>

				{/* Recent Transactions List */}
				<Text style={styles.sectionTitle}>Recent Completed Jobs</Text>

				<View style={styles.txRow}>
					<View>
						<Text style={styles.txTitle}>
							26ft Box Truck Move · Paradise Valley
						</Text>
						<Text style={styles.txDate}>
							Today, 2:15 PM · Base $280 + $40 Tip
						</Text>
					</View>
					<Text style={styles.txAmount}>+$320.00</Text>
				</View>

				<View style={styles.txRow}>
					<View>
						<Text style={styles.txTitle}>Cargo Van Delivery · Scottsdale</Text>
						<Text style={styles.txDate}>Yesterday, 5:40 PM</Text>
					</View>
					<Text style={styles.txAmount}>+$145.00</Text>
				</View>

				<View style={styles.txRow}>
					<View>
						<Text style={styles.txTitle}>Heavy Lift Assistance (2 hrs)</Text>
						<Text style={styles.txDate}>Nov 23, 2026</Text>
					</View>
					<Text style={styles.txAmount}>+$90.00</Text>
				</View>
			</ScrollView>
		</SafeAreaView>
	);
}

const styles = StyleSheet.create({
	safeArea: {
		flex: 1,
		backgroundColor: "#080B0B",
	},
	header: {
		paddingHorizontal: spacing[4],
		paddingTop: spacing[2],
		paddingBottom: spacing[3],
	},
	headerTitle: {
		fontFamily: "Inter_700Bold",
		fontSize: 22,
		color: "#F6F8F6",
	},
	headerSub: {
		fontFamily: "Inter_400Regular",
		fontSize: 12,
		color: "#ADB8B0",
		marginTop: 2,
	},
	scrollContent: {
		paddingHorizontal: spacing[4],
		paddingBottom: spacing[8],
	},
	balanceCard: {
		backgroundColor: "#151A19",
		borderRadius: radius.xl,
		padding: spacing[4],
		borderWidth: 1,
		borderColor: "#2B3532",
		marginBottom: spacing[4],
	},
	balanceLabel: {
		fontFamily: "Inter_600SemiBold",
		fontSize: 10,
		color: "#8E9E99",
		letterSpacing: 0.5,
	},
	balanceAmount: {
		fontFamily: "Inter_700Bold",
		fontSize: 32,
		color: "#BAFF42",
		marginVertical: spacing[1],
	},
	balanceSub: {
		fontFamily: "Inter_400Regular",
		fontSize: 12,
		color: "#ADB8B0",
		marginBottom: spacing[4],
	},
	transferBtn: {
		backgroundColor: "#BAFF42",
		borderRadius: radius.lg,
		paddingVertical: spacing[3],
		alignItems: "center",
	},
	transferBtnText: {
		fontFamily: "Inter_700Bold",
		fontSize: 13,
		color: "#080B0B",
	},
	statsRow: {
		flexDirection: "row",
		gap: spacing[2],
		marginBottom: spacing[5],
	},
	statBox: {
		flex: 1,
		backgroundColor: "#151A19",
		borderRadius: radius.lg,
		padding: spacing[3],
		borderWidth: 1,
		borderColor: "#2B3532",
	},
	statLabel: {
		fontFamily: "Inter_600SemiBold",
		fontSize: 9,
		color: "#8E9E99",
		letterSpacing: 0.5,
	},
	statVal: {
		fontFamily: "Inter_700Bold",
		fontSize: 15,
		color: "#F6F8F6",
		marginTop: 2,
	},
	sectionTitle: {
		fontFamily: "Inter_700Bold",
		fontSize: 16,
		color: "#F6F8F6",
		marginBottom: spacing[3],
	},
	txRow: {
		backgroundColor: "#151A19",
		borderRadius: radius.lg,
		padding: spacing[3],
		borderWidth: 1,
		borderColor: "#2B3532",
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-between",
		marginBottom: spacing[2.5],
	},
	txTitle: {
		fontFamily: "Inter_600SemiBold",
		fontSize: 13,
		color: "#F6F8F6",
	},
	txDate: {
		fontFamily: "Inter_400Regular",
		fontSize: 11,
		color: "#8E9E99",
		marginTop: 2,
	},
	txAmount: {
		fontFamily: "Inter_700Bold",
		fontSize: 15,
		color: "#BAFF42",
	},
});
