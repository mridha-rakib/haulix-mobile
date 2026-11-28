import { radius, spacing } from "@haulix/design-tokens";
import { useRouter } from "expo-router";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { ChevronRightIcon } from "../../src/components/icons/DriverIcons";
import { ActionCtaButton } from "../../src/components/ui/ActionCtaButton";
import { FlowHeader } from "../../src/components/ui/FlowHeader";
import { InfoCard } from "../../src/components/ui/InfoCard";
import { useDriverTranslation } from "../../src/i18n";

export default function HelperDocsScreen() {
	const router = useRouter();
	const { t } = useDriverTranslation();

	const handleRowPress = () => {
		router.push("/(auth)/helper-verification");
	};

	const statusRows = [
		{
			id: "govId",
			titleKey: "driver.helperDocuments.govIdTitle",
			subKey: "driver.helperDocuments.govIdSub",
		},
		{
			id: "selfie",
			titleKey: "driver.helperDocuments.selfieTitle",
			subKey: "driver.helperDocuments.selfieSub",
		},
		{
			id: "background",
			titleKey: "driver.helperDocuments.backgroundTitle",
			subKey: "driver.helperDocuments.backgroundSub",
		},
	];

	return (
		<SafeAreaView style={styles.safeArea}>
			<FlowHeader
				title={t("driver.helperDocuments.title")}
				subtitle={t("driver.helperDocuments.subtitle")}
				onBack={() => router.back()}
			/>

			<ScrollView
				contentContainerStyle={styles.scrollContent}
				showsVerticalScrollIndicator={false}
			>
				{/* Policy Box */}
				<View style={styles.policyBox}>
					<Text style={styles.policyTitle}>
						{t("driver.helperDocuments.policyTitle")}
					</Text>
					<Text style={styles.policyBody}>
						{t("driver.helperDocuments.policyBody")}
					</Text>
				</View>

				<View style={{ height: spacing[3] }} />

				{/* 3 Clickable Status Rows */}
				<View style={styles.rowsGroup}>
					{statusRows.map((row) => (
						<Pressable
							key={row.id}
							onPress={handleRowPress}
							style={({ pressed }) => [
								styles.rowCard,
								pressed && styles.rowCardPressed,
							]}
							accessibilityRole="button"
						>
							<View style={styles.rowTexts}>
								<Text style={styles.rowTitle}>{t(row.titleKey)}</Text>
								<Text style={styles.rowSub}>{t(row.subKey)}</Text>
							</View>
							<ChevronRightIcon size={20} color="#8E9E99" />
						</Pressable>
					))}
				</View>

				<View style={{ height: spacing[3] }} />

				{/* Role Boundary Notice */}
				<InfoCard
					title={t("driver.helperDocuments.roleNoticeTitle")}
					body={t("driver.helperDocuments.roleNoticeBody")}
					variant="highlight"
				/>

				<View style={{ height: spacing[5] }} />

				{/* Action CTA */}
				<ActionCtaButton
					label={t("driver.helperDocuments.reviewCta")}
					onPress={handleRowPress}
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
	policyBox: {
		backgroundColor: "#151A19",
		borderRadius: radius.xl,
		padding: spacing[4],
		borderWidth: 1,
		borderColor: "#232C28",
	},
	policyTitle: {
		fontFamily: "Inter_700Bold",
		fontSize: 15,
		color: "#BAFF42",
		marginBottom: 4,
	},
	policyBody: {
		fontFamily: "Inter_400Regular",
		fontSize: 13,
		lineHeight: 18,
		color: "#ADB8B0",
	},
	rowsGroup: {
		gap: spacing[2.5],
	},
	rowCard: {
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
	rowCardPressed: {
		backgroundColor: "#1A221F",
	},
	rowTexts: {
		flex: 1,
		marginRight: spacing[2],
	},
	rowTitle: {
		fontFamily: "Inter_600SemiBold",
		fontSize: 14,
		color: "#F6F8F6",
		marginBottom: 2,
	},
	rowSub: {
		fontFamily: "Inter_400Regular",
		fontSize: 12,
		color: "#8E9E99",
	},
});
