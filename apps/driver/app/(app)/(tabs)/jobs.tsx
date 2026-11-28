import { StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useDriverAuthStore } from "../../../src/stores/authStore";
import { HelperInvitationsContent } from "../helper-invitations";
import { JobOffersContent } from "../job-offers";

export default function JobsTabScreen() {
	const { role } = useDriverAuthStore();
	const isHelper = role === "HELPER";

	return (
		<SafeAreaView style={styles.safeArea} edges={["top", "left", "right"]}>
			<View style={styles.container}>
				{isHelper ? <HelperInvitationsContent /> : <JobOffersContent />}
			</View>
		</SafeAreaView>
	);
}

const styles = StyleSheet.create({
	safeArea: {
		flex: 1,
		backgroundColor: "#080B0B",
	},
	container: {
		flex: 1,
	},
});
