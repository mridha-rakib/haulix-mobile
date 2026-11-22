import { spacing } from "@haulix/design-tokens";
import { HaulixButton, HaulixSafeArea, HaulixText } from "@haulix/ui";
import { Link } from "expo-router";
import { StyleSheet, View } from "react-native";

/**
 * Driver welcome screen — navigation infrastructure placeholder.
 * Full Figma implementation belongs to Phase 02.
 *
 * IMPORTANT: Driver role (Primary Driver vs Helper) is determined exclusively
 * by backend eligibility data. No local role switching is implemented here.
 *
 * Figma reference: Q946h4YBGgyLsjnPtdyQNe
 */
export default function DriverWelcomeScreen() {
	return (
		<HaulixSafeArea>
			<View style={styles.container}>
				<HaulixText
					variant="brand"
					size="3xl"
					weight="bold"
					style={styles.logo}
				>
					HAULIX
				</HaulixText>
				<HaulixText variant="secondary" size="base" style={styles.subtitle}>
					Driver & Helper Platform
				</HaulixText>

				<View style={styles.actions}>
					<HaulixButton label="Get Started" fullWidth onPress={() => {}} />
					<HaulixButton
						label="Sign In"
						variant="ghost"
						fullWidth
						onPress={() => {}}
					/>
					{__DEV__ && (
						<Link href="/styling-preview" asChild>
							<HaulixButton
								label="Dev: Styling Preview"
								variant="secondary"
								fullWidth
							/>
						</Link>
					)}
				</View>

				<HaulixText variant="secondary" size="xs" style={styles.note}>
					Infrastructure scaffold — Figma screens in Phase 02
				</HaulixText>
			</View>
		</HaulixSafeArea>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		paddingHorizontal: spacing[6],
		paddingTop: spacing[16],
		paddingBottom: spacing[8],
	},
	logo: {
		letterSpacing: -1,
		marginBottom: spacing[2],
	},
	subtitle: {
		marginBottom: spacing[12],
	},
	actions: {
		gap: spacing[3],
		marginTop: "auto",
	},
	note: {
		textAlign: "center",
		marginTop: spacing[4],
		opacity: 0.4,
	},
});
