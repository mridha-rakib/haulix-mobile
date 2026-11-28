import { radius, spacing } from "@haulix/design-tokens";
import { type Href, useRouter } from "expo-router";
import {
	Modal,
	Pressable,
	StyleSheet,
	Text,
	TouchableWithoutFeedback,
	View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useDriverTranslation } from "../../i18n";
import { useDriverAuthStore } from "../../stores/authStore";
import { useAvailabilityStore } from "../../stores/availabilityStore";

interface AvailabilityOverlayProps {
	visible: boolean;
	onClose: () => void;
	onConfigureSettings?: () => void;
}

export function AvailabilityOverlay({
	visible,
	onClose,
	onConfigureSettings,
}: AvailabilityOverlayProps) {
	const router = useRouter();
	const insets = useSafeAreaInsets();
	const { t, currentLocale } = useDriverTranslation();
	const { role } = useDriverAuthStore();
	const { getRolePreferences } = useAvailabilityStore();

	const preferences = getRolePreferences(role);

	const handleOpenSettings = () => {
		onClose();
		if (onConfigureSettings) {
			onConfigureSettings();
		} else {
			router.push("/(app)/availability-settings" as Href);
		}
	};

	const isEs = currentLocale === "es";
	const hoursPrefix = isEs ? "Horario" : "Hours";
	const radiusPrefix = isEs ? "Radio de servicio" : "Service radius";
	const milesSuffix = isEs ? "millas" : "miles";
	const shiftPrefix = isEs ? "Turno preferido" : "Preferred shift";
	const shiftVal = isEs
		? preferences.preferredShift === "Flexible"
			? "Flexible"
			: "Turno diurno"
		: preferences.preferredShift;

	return (
		<Modal
			visible={visible}
			transparent
			animationType="slide"
			onRequestClose={onClose}
		>
			<TouchableWithoutFeedback onPress={onClose}>
				<View style={styles.backdrop}>
					<TouchableWithoutFeedback onPress={(e) => e.stopPropagation()}>
						<View
							style={[
								styles.sheetContainer,
								{ paddingBottom: Math.max(insets.bottom, spacing[5]) },
							]}
						>
							{/* Drag Handle Indicator */}
							<View style={styles.dragHandle} />

							{/* Title & Subtitle */}
							<Text style={styles.title}>
								{t("driver.availabilityOverlay.title")}
							</Text>
							<Text style={styles.subtitle}>
								{t("driver.availabilityOverlay.subtitle")}
							</Text>

							{/* Preferences Summary Card (Figma OV05) */}
							<View style={styles.summaryCard}>
								<Text style={styles.summaryRow}>
									{`${hoursPrefix} · ${preferences.startHour} – ${preferences.endHour}`}
								</Text>
								<Text style={styles.summaryRow}>
									{`${radiusPrefix} · ${preferences.serviceRadiusMiles} ${milesSuffix}`}
								</Text>
								<Text
									style={styles.summaryRow}
								>{`${shiftPrefix} · ${shiftVal}`}</Text>
							</View>

							{/* Disclaimer */}
							<Text style={styles.disclaimer}>
								{t("driver.availabilityOverlay.disclaimer")}
							</Text>

							{/* Close / Action CTA */}
							<Pressable
								onPress={handleOpenSettings}
								accessibilityRole="button"
								accessibilityLabel="Configure availability settings"
							>
								<View style={styles.primaryCta}>
									<Text style={styles.primaryCtaText}>
										{t("driver.availabilityOverlay.closeCta")}
									</Text>
								</View>
							</Pressable>
						</View>
					</TouchableWithoutFeedback>
				</View>
			</TouchableWithoutFeedback>
		</Modal>
	);
}

const styles = StyleSheet.create({
	backdrop: {
		flex: 1,
		backgroundColor: "rgba(0, 0, 0, 0.7)",
		justifyContent: "flex-end",
	},
	sheetContainer: {
		backgroundColor: "#0E1312",
		borderTopLeftRadius: 24,
		borderTopRightRadius: 24,
		borderWidth: 1,
		borderColor: "#232C28",
		paddingHorizontal: spacing[4],
		paddingTop: spacing[3],
	},
	dragHandle: {
		width: 36,
		height: 4,
		borderRadius: 2,
		backgroundColor: "#35403B",
		alignSelf: "center",
		marginBottom: spacing[3],
	},
	title: {
		fontFamily: "Inter_700Bold",
		fontSize: 20,
		color: "#F6F8F6",
		marginBottom: spacing[1],
	},
	subtitle: {
		fontFamily: "Inter_400Regular",
		fontSize: 13,
		color: "#ADB8B0",
		marginBottom: spacing[4],
	},
	summaryCard: {
		backgroundColor: "#151A19",
		borderRadius: radius.xl,
		padding: spacing[4],
		borderWidth: 1,
		borderColor: "#28332E",
		gap: spacing[2.5],
		marginBottom: spacing[3],
	},
	summaryRow: {
		fontFamily: "Inter_600SemiBold",
		fontSize: 14,
		color: "#F6F8F6",
	},
	disclaimer: {
		fontFamily: "Inter_400Regular",
		fontSize: 12,
		lineHeight: 17,
		color: "#ADB8B0",
		marginBottom: spacing[5],
	},
	primaryCta: {
		backgroundColor: "#BAFF42",
		borderRadius: radius.full,
		paddingVertical: spacing[3],
		alignItems: "center",
		justifyContent: "center",
	},
	primaryCtaText: {
		fontFamily: "Inter_700Bold",
		fontSize: 15,
		color: "#080B0B",
	},
});
