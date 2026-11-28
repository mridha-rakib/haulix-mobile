import { radius, spacing } from "@haulix/design-tokens";
import { useRouter } from "expo-router";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import {
	CheckmarkIcon,
	DocumentIcon,
	DriverTruckIcon,
	ShieldIcon,
	UserIcon,
} from "../../src/components/icons/DriverIcons";
import { ActionCtaButton } from "../../src/components/ui/ActionCtaButton";
import { FlowHeader } from "../../src/components/ui/FlowHeader";
import { InfoCard } from "../../src/components/ui/InfoCard";
import { useDriverTranslation } from "../../src/i18n";
import { useDriverAuthStore } from "../../src/stores/authStore";

export default function DriverVerificationScreen() {
	const router = useRouter();
	const { t } = useDriverTranslation();
	const { setRole } = useDriverAuthStore();

	const handleUploadDocs = () => {
		router.push("/(auth)/driver-documents");
	};

	const handleHelperInstead = () => {
		setRole("HELPER");
		router.push("/(auth)/helper-verification");
	};

	const checklistItems = [
		{
			id: "govId",
			title: t("driver.driverVerification.itemGovId"),
			icon: <UserIcon size={20} color="#BAFF42" />,
		},
		{
			id: "license",
			title: t("driver.driverVerification.itemLicense"),
			icon: <DocumentIcon size={20} color="#BAFF42" />,
		},
		{
			id: "vehicle",
			title: t("driver.driverVerification.itemVehicle"),
			icon: <DriverTruckIcon size={20} color="#BAFF42" />,
		},
		{
			id: "background",
			title: t("driver.driverVerification.itemBackground"),
			icon: <ShieldIcon size={20} color="#BAFF42" />,
		},
	];

	return (
		<SafeAreaView style={styles.safeArea}>
			<FlowHeader
				title={t("driver.driverVerification.title")}
				subtitle={t("driver.driverVerification.subtitle")}
				onBack={() => router.back()}
			/>

			<ScrollView
				contentContainerStyle={styles.scrollContent}
				showsVerticalScrollIndicator={false}
			>
				{/* Action Required Badge */}
				<View style={styles.badgeContainer}>
					<View style={styles.actionBadge}>
						<Text style={styles.actionBadgeText}>
							{t("driver.driverVerification.actionRequiredBadge")}
						</Text>
					</View>
				</View>

				{/* 4 Checklist Cards */}
				<View style={styles.checklistGroup}>
					{checklistItems.map((item) => (
						<View key={item.id} style={styles.checklistCard}>
							<View style={styles.cardLeft}>
								<View style={styles.iconBox}>{item.icon}</View>
								<Text style={styles.cardTitle}>{item.title}</Text>
							</View>
							<CheckmarkIcon size={16} color="#BAFF42" />
						</View>
					))}
				</View>

				<View style={{ height: spacing[3] }} />

				{/* Policy Notice Card */}
				<InfoCard
					title=""
					body={t("driver.driverVerification.policyNotice")}
					variant="neutral"
				/>

				<View style={{ height: spacing[5] }} />

				{/* Action CTAs */}
				<ActionCtaButton
					label={t("driver.driverVerification.uploadCta")}
					onPress={handleUploadDocs}
					variant="primary"
					size="large"
				/>

				<View style={{ height: spacing[3] }} />

				<ActionCtaButton
					label={t("driver.driverVerification.helperInsteadCta")}
					onPress={handleHelperInstead}
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
	badgeContainer: {
		marginBottom: spacing[3],
	},
	actionBadge: {
		alignSelf: "flex-start",
		backgroundColor: "#202724",
		paddingHorizontal: spacing[3],
		paddingVertical: spacing[1.5],
		borderRadius: radius.md,
		borderWidth: 1,
		borderColor: "#2E3A34",
	},
	actionBadgeText: {
		fontFamily: "Inter_700Bold",
		fontSize: 10,
		letterSpacing: 0.8,
		color: "#F6F8F6",
		textTransform: "uppercase",
	},
	checklistGroup: {
		gap: spacing[2.5],
	},
	checklistCard: {
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-between",
		backgroundColor: "#151A19",
		borderRadius: radius.xl,
		paddingHorizontal: spacing[4],
		paddingVertical: spacing[3],
		borderWidth: 1,
		borderColor: "#232C28",
	},
	cardLeft: {
		flexDirection: "row",
		alignItems: "center",
		gap: spacing[3],
		flex: 1,
	},
	iconBox: {
		width: 36,
		height: 36,
		borderRadius: radius.md,
		backgroundColor: "#1A221F",
		alignItems: "center",
		justifyContent: "center",
	},
	cardTitle: {
		fontFamily: "Inter_600SemiBold",
		fontSize: 14,
		color: "#F6F8F6",
		flex: 1,
	},
});
