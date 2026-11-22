import { colors, fontFamily } from "@haulix/design-tokens";
import { useTranslation } from "@haulix/i18n";
import { Pressable, StyleSheet, Text, View } from "react-native";
import Svg, { Path } from "react-native-svg";

export interface FlowHeaderBackProps {
	onBack: () => void;
	backA11y?: string;
	testID?: string;
	tagline?: string;
}

/**
 * Shared Flow Header · Back (Figma Node 436:2024 / Context=Back)
 * Nominal 42×42px back button with 39×39px circle, 23×23px white arrow,
 * centered HAULIX brand wordmark with "We Haul It All." tagline,
 * and ≥48dp effective touch target via hitSlop.
 * Positioned as a pinned header to guarantee continuous visibility.
 */
export function FlowHeaderBack({
	onBack,
	backA11y = "Back",
	testID = "flow-header-back",
	tagline,
}: FlowHeaderBackProps) {
	const { i18n } = useTranslation();
	const isEs = i18n?.language?.startsWith("es");
	const displayTagline =
		tagline ?? (isEs ? "Lo Recogemos Todo." : "We Haul It All.");

	return (
		<View style={styles.flowHeaderContainer}>
			<Pressable
				testID={testID}
				style={styles.backCircleButton}
				onPress={onBack}
				accessibilityRole="button"
				accessibilityLabel={backA11y}
				hitSlop={{ top: 12, bottom: 12, left: 12, right: 12 }}
			>
				<Svg width={23} height={23} viewBox="0 0 23 23" fill="none">
					<Path
						d="M13.4166 4.79102L6.70831 11.4993L13.4166 18.2077"
						stroke="#F6F8F6"
						strokeWidth={2}
						strokeLinecap="round"
						strokeLinejoin="round"
					/>
				</Svg>
			</Pressable>

			<View style={styles.headerCenter}>
				<View style={styles.wordmarkRow}>
					<Text style={styles.wordmarkHaul}>HAUL</Text>
					<Text style={styles.wordmarkIx}>IX</Text>
					<Text style={styles.registeredMark}>®</Text>
				</View>
				<Text style={styles.taglineText}>{displayTagline}</Text>
			</View>

			{/* Symmetric spacer balancing back button for true center alignment */}
			<View style={styles.headerSpacer} pointerEvents="none" />
		</View>
	);
}

const styles = StyleSheet.create({
	flowHeaderContainer: {
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-between",
		paddingHorizontal: 22,
		paddingTop: 8,
		paddingBottom: 12,
		height: 56,
		backgroundColor: colors.background,
		zIndex: 20,
		elevation: 4,
	},
	backCircleButton: {
		width: 42,
		height: 42,
		borderRadius: 21,
		backgroundColor: "#151A19",
		borderWidth: 1,
		borderColor: "#222B27",
		alignItems: "center",
		justifyContent: "center",
	},
	headerCenter: {
		alignItems: "center",
		justifyContent: "center",
	},
	headerSpacer: {
		width: 42,
		height: 42,
	},
	wordmarkRow: {
		flexDirection: "row",
		alignItems: "baseline",
		gap: 1,
	},
	wordmarkHaul: {
		fontFamily: fontFamily.bold,
		fontSize: 22,
		color: "#F6F8F6",
		letterSpacing: -0.5,
	},
	wordmarkIx: {
		fontFamily: fontFamily.bold,
		fontSize: 22,
		color: colors.brand,
		letterSpacing: -0.5,
	},
	registeredMark: {
		fontFamily: fontFamily.semiBold,
		fontSize: 9,
		color: colors.brand,
		marginLeft: 2,
		transform: [{ translateY: -6 }],
	},
	taglineText: {
		fontFamily: fontFamily.regular,
		fontSize: 11,
		color: "#8E9B95",
		marginTop: 1,
	},
});
