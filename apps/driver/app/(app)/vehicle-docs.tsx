import { radius, spacing } from "@haulix/design-tokens";
import { useRouter } from "expo-router";
import type React from "react";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import {
	DocumentIcon,
	DriverTruckIcon,
	ShieldIcon,
	UserIcon,
} from "../../src/components/icons/DriverIcons";
import { ActionCtaButton } from "../../src/components/ui/ActionCtaButton";
import { FlowHeader } from "../../src/components/ui/FlowHeader";
import { InfoCard } from "../../src/components/ui/InfoCard";
import { useDriverTranslation } from "../../src/i18n";

interface DocItem {
	id: string;
	titleKey: string;
	subKey: string;
	pillKey: string;
	pillVariant: "verified" | "pending" | "needs_update" | "completed";
	icon: React.ReactNode;
}

export default function VehicleDocsScreen() {
	const router = useRouter();
	const { t } = useDriverTranslation();

	const docItems: DocItem[] = [
		{
			id: "license",
			titleKey: "driver.documentsVehicle.licenseTitle",
			subKey: "driver.documentsVehicle.licenseSub",
			pillKey: "driver.documentsVehicle.verifiedPill",
			pillVariant: "verified",
			icon: <DocumentIcon size={20} color="#BAFF42" />,
		},
		{
			id: "govId",
			titleKey: "driver.documentsVehicle.govIdTitle",
			subKey: "driver.documentsVehicle.govIdSub",
			pillKey: "driver.documentsVehicle.verifiedPill",
			pillVariant: "verified",
			icon: <UserIcon size={20} color="#BAFF42" />,
		},
		{
			id: "insurance",
			titleKey: "driver.documentsVehicle.insuranceTitle",
			subKey: "driver.documentsVehicle.insuranceSub",
			pillKey: "driver.documentsVehicle.pendingPill",
			pillVariant: "pending",
			icon: <ShieldIcon size={20} color="#BAFF42" />,
		},
		{
			id: "registration",
			titleKey: "driver.documentsVehicle.registrationTitle",
			subKey: "driver.documentsVehicle.registrationSub",
			pillKey: "driver.documentsVehicle.needsUpdatePill",
			pillVariant: "needs_update",
			icon: <DocumentIcon size={20} color="#BAFF42" />,
		},
		{
			id: "vehicle",
			titleKey: "driver.documentsVehicle.vehicleDetailsTitle",
			subKey: "driver.documentsVehicle.vehicleDetailsSub",
			pillKey: "driver.documentsVehicle.completedPill",
			pillVariant: "completed",
			icon: <DriverTruckIcon size={20} color="#BAFF42" />,
		},
	];

	const getPillStyle = (variant: DocItem["pillVariant"]) => {
		switch (variant) {
			case "pending":
				return {
					bg: "#2A2114",
					border: "#47341B",
					text: "#FFA500",
				};
			case "needs_update":
				return {
					bg: "#2A1818",
					border: "#472424",
					text: "#FF6B6B",
				};
			default:
				return {
					bg: "#1A251E",
					border: "#283A2F",
					text: "#BAFF42",
				};
		}
	};

	return (
		<SafeAreaView style={styles.safeArea}>
			<FlowHeader
				title={t("driver.documentsVehicle.title")}
				subtitle={t("driver.documentsVehicle.subtitle")}
				onBack={() => router.back()}
			/>

			<ScrollView
				contentContainerStyle={styles.scrollContent}
				showsVerticalScrollIndicator={false}
			>
				{/* 5 Status Cards */}
				<View style={styles.cardsGroup}>
					{docItems.map((item) => {
						const pillStyle = getPillStyle(item.pillVariant);
						return (
							<Pressable
								key={item.id}
								onPress={() => router.push("/(auth)/driver-documents")}
								style={styles.card}
								accessibilityRole="button"
							>
								<View style={styles.cardLeft}>
									<View style={styles.iconBox}>{item.icon}</View>
									<View style={styles.cardTexts}>
										<Text style={styles.cardTitle}>{t(item.titleKey)}</Text>
										<Text style={styles.cardSub}>{t(item.subKey)}</Text>
									</View>
								</View>
								<View
									style={[
										styles.pill,
										{
											backgroundColor: pillStyle.bg,
											borderColor: pillStyle.border,
										},
									]}
								>
									<Text style={[styles.pillText, { color: pillStyle.text }]}>
										{t(item.pillKey)}
									</Text>
								</View>
							</Pressable>
						);
					})}
				</View>

				<View style={{ height: spacing[4] }} />

				{/* Action CTA */}
				<ActionCtaButton
					label={t("driver.documentsVehicle.uploadUpdateCta")}
					onPress={() => router.push("/(auth)/driver-documents")}
					variant="outline"
					size="large"
				/>

				<View style={{ height: spacing[3] }} />

				{/* Footer Info Notice */}
				<InfoCard
					title={t("driver.documentsVehicle.stayEligibleTitle")}
					body={t("driver.documentsVehicle.stayEligibleBody")}
					icon={<ShieldIcon size={20} color="#BAFF42" />}
					variant="neutral"
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
	cardsGroup: {
		gap: spacing[2.5],
	},
	card: {
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
	cardTexts: {
		flex: 1,
	},
	cardTitle: {
		fontFamily: "Inter_600SemiBold",
		fontSize: 14,
		color: "#F6F8F6",
		marginBottom: 2,
	},
	cardSub: {
		fontFamily: "Inter_400Regular",
		fontSize: 12,
		color: "#ADB8B0",
	},
	pill: {
		paddingHorizontal: spacing[2.5],
		paddingVertical: spacing[1],
		borderRadius: radius.md,
		borderWidth: 1,
	},
	pillText: {
		fontFamily: "Inter_600SemiBold",
		fontSize: 11,
	},
});
