import { radius, spacing } from "@haulix/design-tokens";
import { useRouter } from "expo-router";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import {
	CheckmarkIcon,
	ShieldIcon,
} from "../../src/components/icons/DriverIcons";
import { ActionCtaButton } from "../../src/components/ui/ActionCtaButton";
import { FlowHeader } from "../../src/components/ui/FlowHeader";
import { useDriverTranslation } from "../../src/i18n";
import { useDriverAuthStore } from "../../src/stores/authStore";
import { useDocumentStore } from "../../src/stores/documentStore";

interface StatusContent {
	isApproved: boolean;
	isActionRequired: boolean;
	heroTitle: string;
	heroSubtitle: string;
	pillText: string;
	noticeText: string;
}

function getStatusContent(
	status: string,
	t: (key: string) => string,
): StatusContent {
	if (status === "APPROVED") {
		return {
			isApproved: true,
			isActionRequired: false,
			heroTitle: "Verification approved",
			heroSubtitle:
				"Your documents and background check have been verified. You are eligible for dispatch.",
			pillText: "VERIFIED & ELIGIBLE",
			noticeText: "All documents active · Full job dispatch enabled",
		};
	}
	if (status === "ACTION_REQUIRED") {
		return {
			isApproved: false,
			isActionRequired: true,
			heroTitle: t("driver.verificationAction.title"),
			heroSubtitle: t("driver.verificationAction.subtitle"),
			pillText: t("driver.verificationAction.actionRequiredBadge"),
			noticeText: "Attention required · Document resubmission needed",
		};
	}
	return {
		isApproved: false,
		isActionRequired: false,
		heroTitle: t("driver.verificationStatus.heroTitle"),
		heroSubtitle: t("driver.verificationStatus.heroSub"),
		pillText: t("driver.verificationStatus.statusPill"),
		noticeText: t("driver.verificationStatus.statusNotice"),
	};
}

export default function VerificationStatusScreen() {
	const router = useRouter();
	const { t } = useDriverTranslation();
	const { role, setRole, loginMock } = useDriverAuthStore();
	const { getRoleStatus } = useDocumentStore();

	const isDriver = role === "PRIMARY_DRIVER";
	const currentStatus = getRoleStatus(role);
	const {
		isApproved,
		isActionRequired,
		heroTitle,
		heroSubtitle,
		pillText,
		noticeText,
	} = getStatusContent(currentStatus, t as (key: string) => string);

	const handleDriverHome = () => {
		setRole("PRIMARY_DRIVER");
		loginMock("driver.demo@haulix.com", "PRIMARY_DRIVER");
		router.replace("/(app)/(tabs)");
	};

	const handleHelperHome = () => {
		setRole("HELPER");
		loginMock("helper.demo@haulix.com", "HELPER");
		router.replace("/(app)/(tabs)");
	};

	const handleCheckDetails = () => {
		router.push("/(auth)/verification-action");
	};

	return (
		<SafeAreaView style={styles.safeArea}>
			<FlowHeader
				title={t("driver.verificationStatus.title")}
				subtitle={t("driver.verificationStatus.subtitle")}
				onBack={() => router.back()}
			/>

			<ScrollView
				contentContainerStyle={styles.scrollContent}
				showsVerticalScrollIndicator={false}
			>
				{/* Status Hero Container */}
				<View style={styles.heroBox}>
					<View
						style={[
							styles.shieldWrap,
							isApproved && styles.shieldWrapApproved,
							isActionRequired && styles.shieldWrapAction,
						]}
					>
						{isApproved ? (
							<CheckmarkIcon size={36} color="#BAFF42" />
						) : (
							<ShieldIcon
								size={36}
								color={isActionRequired ? "#FF6B6B" : "#BAFF42"}
							/>
						)}
					</View>
					<Text style={styles.heroHeadline}>{heroTitle}</Text>
					<Text style={styles.heroSubtitle}>{heroSubtitle}</Text>
				</View>

				<View style={{ height: spacing[5] }} />

				{/* Status Details Card */}
				<View style={styles.statusBox}>
					<View
						style={[
							styles.statusPill,
							isApproved && styles.statusPillApproved,
							isActionRequired && styles.statusPillAction,
						]}
					>
						<Text
							style={[
								styles.statusPillText,
								isActionRequired && styles.statusPillTextAction,
							]}
						>
							{pillText}
						</Text>
					</View>
					<Text style={styles.statusNoticeText}>{noticeText}</Text>
				</View>

				<View style={{ height: spacing[4] }} />

				{/* Secondary Role Home Link */}
				<Pressable
					onPress={isDriver ? handleHelperHome : handleDriverHome}
					style={({ pressed }) => [
						styles.linkWrap,
						pressed && styles.linkPressed,
					]}
				>
					<Text style={styles.linkText}>
						{isDriver
							? t("driver.verificationStatus.helperHomeLink")
							: "View sample Driver home ›"}
					</Text>
				</Pressable>

				<View style={{ height: spacing[6] }} />

				{/* Action CTAs */}
				<ActionCtaButton
					label={
						isDriver
							? t("driver.verificationStatus.sampleDriverHomeCta")
							: "View sample Helper home"
					}
					onPress={isDriver ? handleDriverHome : handleHelperHome}
					variant="primary"
					size="large"
				/>

				<View style={{ height: spacing[3] }} />

				<ActionCtaButton
					label={t("driver.verificationStatus.checkDetailsCta")}
					onPress={handleCheckDetails}
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
	heroBox: {
		alignItems: "center",
		paddingTop: spacing[4],
		paddingHorizontal: spacing[2],
	},
	shieldWrap: {
		width: 80,
		height: 80,
		borderRadius: 40,
		backgroundColor: "#151A19",
		borderWidth: 1,
		borderColor: "#232C28",
		alignItems: "center",
		justifyContent: "center",
		marginBottom: spacing[4],
	},
	shieldWrapApproved: {
		borderColor: "#BAFF42",
		backgroundColor: "#162312",
	},
	shieldWrapAction: {
		borderColor: "#FF6B6B",
		backgroundColor: "#261515",
	},
	heroHeadline: {
		fontFamily: "Inter_700Bold",
		fontSize: 24,
		color: "#F6F8F6",
		textAlign: "center",
		marginBottom: spacing[2],
	},
	heroSubtitle: {
		fontFamily: "Inter_400Regular",
		fontSize: 14,
		lineHeight: 20,
		color: "#ADB8B0",
		textAlign: "center",
		paddingHorizontal: spacing[2],
	},
	statusBox: {
		backgroundColor: "#151A19",
		borderRadius: radius.xl,
		padding: spacing[4],
		borderWidth: 1,
		borderColor: "#232C28",
		alignItems: "flex-start",
	},
	statusPill: {
		backgroundColor: "#1E2523",
		paddingHorizontal: spacing[3],
		paddingVertical: spacing[1],
		borderRadius: radius.full,
		borderWidth: 1,
		borderColor: "#35403B",
		marginBottom: spacing[2.5],
	},
	statusPillApproved: {
		backgroundColor: "#162312",
		borderColor: "#BAFF42",
	},
	statusPillAction: {
		backgroundColor: "#2B1616",
		borderColor: "#FF6B6B",
	},
	statusPillText: {
		fontFamily: "Inter_700Bold",
		fontSize: 11,
		color: "#BAFF42",
		letterSpacing: 0.5,
	},
	statusPillTextAction: {
		color: "#FF6B6B",
	},
	statusNoticeText: {
		fontFamily: "Inter_400Regular",
		fontSize: 13,
		color: "#8E9E99",
	},
	linkWrap: {
		alignSelf: "flex-start",
		paddingVertical: spacing[1],
	},
	linkPressed: {
		opacity: 0.7,
	},
	linkText: {
		fontFamily: "Inter_600SemiBold",
		fontSize: 14,
		color: "#BAFF42",
	},
});
