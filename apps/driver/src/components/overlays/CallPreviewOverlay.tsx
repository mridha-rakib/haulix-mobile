import { radius, spacing } from "@haulix/design-tokens";
import { Modal, Pressable, StyleSheet, Text, View } from "react-native";
import { useDriverTranslation } from "../../i18n";
import { useActiveJobStore } from "../../stores/activeJobStore";

export interface CallPreviewOverlayProps {
	visible?: boolean;
	onClose?: () => void;
}

export function CallPreviewOverlay({
	visible,
	onClose,
}: CallPreviewOverlayProps = {}) {
	const { t } = useDriverTranslation();
	const { isCallModalOpen, setCallModalOpen } = useActiveJobStore();

	const isVisible = visible !== undefined ? visible : isCallModalOpen;
	const handleClose = onClose || (() => setCallModalOpen(false));

	return (
		<Modal
			visible={isVisible}
			transparent
			animationType="fade"
			onRequestClose={handleClose}
		>
			<Pressable style={styles.backdrop} onPress={handleClose}>
				<Pressable style={styles.card} onPress={(e) => e.stopPropagation()}>
					<Text style={styles.title}>{t("driver.callOverlay.title")}</Text>
					<Text style={styles.subtitle}>
						{t("driver.callOverlay.subtitle")}
					</Text>

					<View style={styles.descBox}>
						<Text style={styles.descText}>
							{t("driver.callOverlay.description")}
						</Text>
					</View>

					<Pressable
						onPress={handleClose}
						style={({ pressed }) => [
							styles.closeBtn,
							pressed && styles.btnPressed,
						]}
						accessibilityRole="button"
						accessibilityLabel={t("driver.callOverlay.closeCta")}
					>
						<Text style={styles.closeBtnText}>
							{t("driver.callOverlay.closeCta")}
						</Text>
					</Pressable>
				</Pressable>
			</Pressable>
		</Modal>
	);
}

const styles = StyleSheet.create({
	backdrop: {
		flex: 1,
		backgroundColor: "rgba(0, 0, 0, 0.72)",
		justifyContent: "center",
		alignItems: "center",
		paddingHorizontal: spacing[4],
	},
	card: {
		width: "100%",
		maxWidth: 400,
		backgroundColor: "#131917",
		borderRadius: radius["2xl"],
		padding: spacing[5],
		borderWidth: 1,
		borderColor: "#232C28",
	},
	title: {
		fontFamily: "Inter_700Bold",
		fontSize: 20,
		color: "#F6F8F6",
	},
	subtitle: {
		fontFamily: "Inter_600SemiBold",
		fontSize: 13,
		color: "#BAFF42",
		marginTop: 4,
		marginBottom: spacing[4],
	},
	descBox: {
		backgroundColor: "#1C2421",
		borderRadius: radius.xl,
		padding: spacing[4],
		borderWidth: 1,
		borderColor: "#2B3632",
		marginBottom: spacing[5],
	},
	descText: {
		fontFamily: "Inter_400Regular",
		fontSize: 13,
		lineHeight: 19,
		color: "#D0DCD5",
	},
	closeBtn: {
		backgroundColor: "#BAFF42",
		borderRadius: radius.xl,
		paddingVertical: 14,
		alignItems: "center",
		justifyContent: "center",
	},
	btnPressed: {
		opacity: 0.88,
	},
	closeBtnText: {
		fontFamily: "Inter_700Bold",
		fontSize: 15,
		color: "#080B0B",
	},
});
