import { radius, spacing } from "@haulix/design-tokens";
import { useRouter } from "expo-router";
import { useState } from "react";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import {
	CheckmarkIcon,
	DocumentIcon,
	DriverTruckIcon,
	ShieldIcon,
} from "../../src/components/icons/DriverIcons";
import { ActionCtaButton } from "../../src/components/ui/ActionCtaButton";
import { FlowHeader } from "../../src/components/ui/FlowHeader";
import { useDriverTranslation } from "../../src/i18n";
import { useDocumentStore } from "../../src/stores/documentStore";

export default function DriverDocumentsScreen() {
	const router = useRouter();
	const { t } = useDriverTranslation();
	const { uploadDocumentMock, submitForReview } = useDocumentStore();

	const [uploadedMap, setUploadedMap] = useState<Record<string, boolean>>({
		license: false,
		registration: false,
		insurance: false,
	});

	const handleSimulateUpload = (
		key?: "license" | "registration" | "insurance",
	) => {
		if (key) {
			setUploadedMap((prev) => ({ ...prev, [key]: !prev[key] }));
			uploadDocumentMock(
				key === "license"
					? "DRIVER_LICENSE"
					: key === "registration"
						? "VEHICLE_REGISTRATION"
						: "INSURANCE_CERTIFICATE",
			);
		} else {
			// Toggle all
			const nextVal =
				!uploadedMap.license ||
				!uploadedMap.registration ||
				!uploadedMap.insurance;
			setUploadedMap({
				license: nextVal,
				registration: nextVal,
				insurance: nextVal,
			});
			if (nextVal) {
				uploadDocumentMock("DRIVER_LICENSE");
				uploadDocumentMock("VEHICLE_REGISTRATION");
				uploadDocumentMock("INSURANCE_CERTIFICATE");
			}
		}
	};

	const handleSubmit = () => {
		// Provide preconfigured mock fixtures if needed so testers can complete flow
		uploadDocumentMock(
			"DRIVER_LICENSE",
			"driver_license_demo.jpg",
			"PRIMARY_DRIVER",
		);
		uploadDocumentMock(
			"VEHICLE_REGISTRATION",
			"vehicle_reg_demo.jpg",
			"PRIMARY_DRIVER",
		);
		uploadDocumentMock(
			"INSURANCE_CERTIFICATE",
			"insurance_cert_demo.pdf",
			"PRIMARY_DRIVER",
		);
		submitForReview("PRIMARY_DRIVER");
		router.push("/(auth)/verification-status");
	};

	return (
		<SafeAreaView style={styles.safeArea}>
			<FlowHeader
				title={t("driver.driverDocuments.title")}
				subtitle={t("driver.driverDocuments.subtitle")}
				onBack={() => router.back()}
			/>

			<ScrollView
				contentContainerStyle={styles.scrollContent}
				showsVerticalScrollIndicator={false}
			>
				{/* Document Category Cards */}
				<View style={styles.docCardsGroup}>
					<Pressable
						onPress={() => handleSimulateUpload("license")}
						style={styles.docCard}
						accessibilityRole="button"
					>
						<View style={styles.cardLeft}>
							<View style={styles.iconBox}>
								<DocumentIcon size={20} color="#BAFF42" />
							</View>
							<View style={styles.cardTexts}>
								<Text style={styles.cardTitle}>
									{t("driver.driverDocuments.licenseTitle")}
								</Text>
								<Text style={styles.cardSub}>
									{t("driver.driverDocuments.licenseSub")}
								</Text>
							</View>
						</View>
						{uploadedMap.license && (
							<View style={styles.checkCircle}>
								<CheckmarkIcon size={12} color="#080B0B" />
							</View>
						)}
					</Pressable>

					<Pressable
						onPress={() => handleSimulateUpload("registration")}
						style={styles.docCard}
						accessibilityRole="button"
					>
						<View style={styles.cardLeft}>
							<View style={styles.iconBox}>
								<DriverTruckIcon size={20} color="#BAFF42" />
							</View>
							<View style={styles.cardTexts}>
								<Text style={styles.cardTitle}>
									{t("driver.driverDocuments.registrationTitle")}
								</Text>
								<Text style={styles.cardSub}>
									{t("driver.driverDocuments.registrationSub")}
								</Text>
							</View>
						</View>
						{uploadedMap.registration && (
							<View style={styles.checkCircle}>
								<CheckmarkIcon size={12} color="#080B0B" />
							</View>
						)}
					</Pressable>

					<Pressable
						onPress={() => handleSimulateUpload("insurance")}
						style={styles.docCard}
						accessibilityRole="button"
					>
						<View style={styles.cardLeft}>
							<View style={styles.iconBox}>
								<ShieldIcon size={20} color="#BAFF42" />
							</View>
							<View style={styles.cardTexts}>
								<Text style={styles.cardTitle}>
									{t("driver.driverDocuments.insuranceTitle")}
								</Text>
								<Text style={styles.cardSub}>
									{t("driver.driverDocuments.insuranceSub")}
								</Text>
							</View>
						</View>
						{uploadedMap.insurance && (
							<View style={styles.checkCircle}>
								<CheckmarkIcon size={12} color="#080B0B" />
							</View>
						)}
					</Pressable>
				</View>

				<View style={{ height: spacing[4] }} />

				{/* Upload Selector Tile (Figma 1085:254) */}
				<Pressable
					onPress={() => handleSimulateUpload()}
					style={({ pressed }) => [
						styles.uploadTile,
						pressed && styles.uploadTilePressed,
					]}
					accessibilityRole="button"
				>
					<View style={styles.uploadIconWrap}>
						<DocumentIcon size={28} color="#BAFF42" />
					</View>
					<Text style={styles.uploadTitle}>
						{t("driver.driverDocuments.uploadTileTitle")}
					</Text>
					<Text style={styles.uploadSub}>
						{t("driver.driverDocuments.uploadTileSub")}
					</Text>
				</Pressable>

				<View style={{ height: spacing[6] }} />

				{/* Action CTAs */}
				<ActionCtaButton
					label={t("driver.driverDocuments.submitCta")}
					onPress={handleSubmit}
					variant="primary"
					size="large"
				/>

				<View style={{ height: spacing[3] }} />

				<ActionCtaButton
					label={t("driver.driverDocuments.backChecklistCta")}
					onPress={() => router.push("/(auth)/driver-verification")}
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
	docCardsGroup: {
		gap: spacing[2.5],
	},
	docCard: {
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
	checkCircle: {
		width: 22,
		height: 22,
		borderRadius: 11,
		backgroundColor: "#BAFF42",
		alignItems: "center",
		justifyContent: "center",
	},
	uploadTile: {
		backgroundColor: "#111614",
		borderRadius: radius["2xl"],
		paddingVertical: spacing[7],
		paddingHorizontal: spacing[4],
		alignItems: "center",
		justifyContent: "center",
		borderWidth: 1.5,
		borderColor: "#BAFF42",
	},
	uploadTilePressed: {
		opacity: 0.8,
	},
	uploadIconWrap: {
		marginBottom: spacing[2],
	},
	uploadTitle: {
		fontFamily: "Inter_700Bold",
		fontSize: 15,
		color: "#F6F8F6",
		marginBottom: 4,
		textAlign: "center",
	},
	uploadSub: {
		fontFamily: "Inter_400Regular",
		fontSize: 12,
		color: "#8E9E99",
		textAlign: "center",
	},
});
