/**
 * HAULIX Customer Mobile App — Phase 03.48
 * W05 Canonical 5-Node Dispatch Progress Tracker
 *
 * Matching Figma frames:
 * - 844:5066 (ACCEPT_PENDING EN), 844:7216 (ACCEPT_PENDING ES)
 * - 844:5284 (DRIVER_DETAILS EN), 844:7434 (DRIVER_DETAILS ES)
 * - 844:5403 (HELPER_PENDING EN), 844:7553 (HELPER_PENDING ES)
 * - 844:5641 (RESTART EN), 844:7791 (RESTART ES)
 */

import { colors, fontFamily } from "@haulix/design-tokens";
import { useTranslation } from "@haulix/i18n";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import Svg, { Path } from "react-native-svg";

export type W05ProgressStep =
	| "booked"
	| "dispatch"
	| "driver"
	| "arrival"
	| "service";

interface W05ProgressTrackerProps {
	activeStep: W05ProgressStep;
	testID?: string;
}

export function W05ProgressTracker({
	activeStep,
	testID = "w05-progress-tracker",
}: W05ProgressTrackerProps) {
	const { i18n } = useTranslation();
	const isEs = i18n?.language?.startsWith("es");

	const steps: { key: W05ProgressStep; label: string }[] = [
		{ key: "booked", label: isEs ? "Reservado" : "Booked" },
		{ key: "dispatch", label: isEs ? "Despacho" : "Dispatch" },
		{ key: "driver", label: isEs ? "Conductor" : "Driver" },
		{ key: "arrival", label: isEs ? "Llegada" : "Arrival" },
		{ key: "service", label: isEs ? "Servicio" : "Service" },
	];

	const stepOrder: Record<W05ProgressStep, number> = {
		booked: 0,
		dispatch: 1,
		driver: 2,
		arrival: 3,
		service: 4,
	};

	const activeIndex = stepOrder[activeStep];
	// Progress track fill width percentage
	const progressWidths = ["0%", "25%", "50%", "75%", "100%"];
	const trackWidth = progressWidths[activeIndex] || "25%";

	return (
		<View style={styles.container} testID={testID}>
			{/* Background Track */}
			<View style={styles.baseTrack} />
			{/* Completed Track Fill */}
			<View style={[styles.activeTrack, { width: trackWidth }]} />

			{/* Nodes */}
			<View style={styles.nodesRow}>
				{steps.map((s, index) => {
					const isCompleted = index < activeIndex;
					const isActive = index === activeIndex;

					return (
						<View key={s.key} style={styles.nodeItem}>
							{isCompleted ? (
								<View style={styles.completedDot}>
									<Svg width={10} height={10} viewBox="0 0 12 12" fill="none">
										<Path
											d="M2.5 6L5 8.5L9.5 3.5"
											stroke="#080B0B"
											strokeWidth={2}
											strokeLinecap="round"
											strokeLinejoin="round"
										/>
									</Svg>
								</View>
							) : isActive ? (
								<View style={styles.activeDotOuter}>
									<View style={styles.activeDotInner} />
								</View>
							) : (
								<View style={styles.pendingDot} />
							)}

							<Text
								style={[
									styles.nodeLabel,
									isActive
										? styles.nodeLabelActive
										: isCompleted
											? styles.nodeLabelCompleted
											: styles.nodeLabelPending,
								]}
								numberOfLines={1}
							>
								{s.label}
							</Text>
						</View>
					);
				})}
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		width: "100%",
		marginVertical: 12,
		position: "relative",
	},
	baseTrack: {
		position: "absolute",
		top: 8,
		left: 20,
		right: 20,
		height: 2,
		backgroundColor: "rgba(148, 166, 156, 0.35)",
		zIndex: 1,
	},
	activeTrack: {
		position: "absolute",
		top: 8,
		left: 20,
		height: 2,
		backgroundColor: colors.brand,
		zIndex: 2,
	},
	nodesRow: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "flex-start",
		zIndex: 3,
	},
	nodeItem: {
		alignItems: "center",
		width: 58,
	},
	completedDot: {
		width: 17,
		height: 17,
		borderRadius: 8.5,
		backgroundColor: colors.brand,
		alignItems: "center",
		justifyContent: "center",
	},
	activeDotOuter: {
		width: 17,
		height: 17,
		borderRadius: 8.5,
		backgroundColor: "#080B0B",
		borderWidth: 2,
		borderColor: colors.brand,
		alignItems: "center",
		justifyContent: "center",
	},
	activeDotInner: {
		width: 7,
		height: 7,
		borderRadius: 3.5,
		backgroundColor: colors.brand,
	},
	pendingDot: {
		width: 17,
		height: 17,
		borderRadius: 8.5,
		backgroundColor: "#161D1A",
		borderWidth: 1,
		borderColor: "rgba(148, 166, 156, 0.45)",
	},
	nodeLabel: {
		fontSize: 10,
		fontFamily: fontFamily.medium,
		marginTop: 5,
		textAlign: "center",
	},
	nodeLabelActive: {
		color: colors.brand,
		fontFamily: fontFamily.bold,
	},
	nodeLabelCompleted: {
		color: "#C7D4CD",
	},
	nodeLabelPending: {
		color: "#7E8E86",
	},
});
