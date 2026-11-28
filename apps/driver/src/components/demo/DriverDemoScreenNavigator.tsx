import { radius, spacing } from "@haulix/design-tokens";
import type { SupportedLocale } from "@haulix/i18n";
import { type Href, useRouter } from "expo-router";
import { useState } from "react";
import {
	Modal,
	Pressable,
	ScrollView,
	StyleSheet,
	Text,
	TextInput,
	View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useDriverTranslation } from "../../i18n";
import { useDriverAuthStore } from "../../stores/authStore";
import { useAvailabilityStore } from "../../stores/availabilityStore";
import { useActiveJobStore } from "../../stores/activeJobStore";
import { useDispatchCrewStore } from "../../stores/dispatchCrewStore";
import { useServiceProgressStore } from "../../stores/serviceProgressStore";
import {
	useDriverDocumentStore,
	type VerificationScenario,
} from "../../stores/documentStore";

import { DRIVER_DEMO_SCREENS, type DemoScreenItem } from "./driverDemoScreens";
export { DRIVER_DEMO_SCREENS, type DemoScreenItem };

export function DriverDemoScreenNavigator() {
	const [isOpen, setIsOpen] = useState(false);
	const [isMinimized, setIsMinimized] = useState(false);
	const [searchQuery, setSearchQuery] = useState("");
	const router = useRouter();
	const insets = useSafeAreaInsets();
	const { currentLocale, toggleLanguage, setLanguage } = useDriverTranslation();
	const { role, setRole, loginMock, logout, isCleanMode, setCleanMode } =
		useDriverAuthStore();
	const { setScenario, resetDocuments, driver, helper } =
		useDriverDocumentStore();
	const {
		driverStatus,
		helperStatus,
		toggleDriverStatus,
		toggleHelperStatus,
		resetAvailability,
	} = useAvailabilityStore();
	const { setScenario: setDispatchScenario, resetDispatchCrew } =
		useDispatchCrewStore();
	const [dispatchScenario, setDispatchScenarioState] =
		useState<string>("AVAILABLE");
	const {
		driverTransitStatus,
		networkStatus,
		setDriverTransitStatus,
		setNetworkStatus,
	} = useActiveJobStore();

	const handleSelectScreen = async (item: DemoScreenItem) => {
		if (item.locale !== currentLocale) {
			await setLanguage(item.locale);
		}
		if (item.role) {
			setRole(item.role);
		}
		if (item.route.startsWith("/(app)")) {
			loginMock(item.role || role);
		}
		if (item.id.startsWith("OV06")) {
			useActiveJobStore.getState().setCallModalOpen(true);
		} else if (item.id.startsWith("OV07")) {
			useActiveJobStore.getState().setLocationModalOpen(true);
		}
		setIsOpen(false);
		router.push(item.route as Href);
	};

	const handleResetDemoState = () => {
		logout();
		resetDocuments();
		resetAvailability();
		resetDispatchCrew();
		useActiveJobStore.getState().resetActiveJob();
		useServiceProgressStore.getState().resetServiceProgress();
		setRole("PRIMARY_DRIVER");
		setCleanMode(false);
		setIsOpen(false);
		router.replace("/(auth)/welcome");
	};

	const handleSetScenario = (
		scenario: VerificationScenario,
		targetRole: "PRIMARY_DRIVER" | "HELPER",
	) => {
		setScenario(scenario, targetRole);
	};

	const handleDispatchScenario = (
		sc:
			| "AVAILABLE"
			| "EXPIRED"
			| "ACCEPTED"
			| "PENDING_INVITE"
			| "ACCEPTED_INVITE"
			| "DECLINED_INVITE"
			| "CREW_INCOMPLETE"
			| "CREW_READY",
	) => {
		setDispatchScenarioState(sc);
		setDispatchScenario(sc);
	};

	const filteredScreens = DRIVER_DEMO_SCREENS.filter((screen) => {
		if (!searchQuery.trim()) return true;
		const query = searchQuery.toLowerCase();
		return (
			screen.id.toLowerCase().includes(query) ||
			screen.name.toLowerCase().includes(query) ||
			screen.figmaNode.toLowerCase().includes(query) ||
			screen.description.toLowerCase().includes(query)
		);
	});

	return (
		<>
			{/* Non-obstructive edge-docked trigger. In clean mode, render NO overlay targets. */}
			{isCleanMode ? null : (
				<View style={styles.floatingWrapper} pointerEvents="box-none">
					<Pressable
						onPress={() =>
							isMinimized ? setIsMinimized(false) : setIsOpen(true)
						}
						onLongPress={() => setIsMinimized(!isMinimized)}
						style={[
							styles.floatingDock,
							isMinimized && styles.floatingDockMinimized,
						]}
						accessibilityRole="button"
						accessibilityLabel="Open QA Navigator"
						hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
					>
						<View style={styles.qaDot} />
						{!isMinimized && <Text style={styles.qaDockText}>QA</Text>}
					</Pressable>
				</View>
			)}

			<Modal
				visible={isOpen}
				animationType="slide"
				transparent
				onRequestClose={() => setIsOpen(false)}
			>
				<View style={styles.modalOverlay}>
					<View
						style={[
							styles.modalContent,
							{ paddingBottom: Math.max(insets.bottom, 20) },
						]}
					>
						{/* Header */}
						<View style={styles.modalHeader}>
							<View>
								<Text style={styles.modalTitle}>
									Driver/Worker QA Navigator
								</Text>
								<Text style={styles.modalSubtitle}>
									Guard-Free Preview · 68-State Framework
								</Text>
							</View>

							<View style={styles.headerActions}>
								<Pressable onPress={toggleLanguage} style={styles.langToggle}>
									<Text style={styles.langToggleText}>
										{currentLocale === "en" ? "EN ➜ ES" : "ES ➜ EN"}
									</Text>
								</Pressable>

								<Pressable
									onPress={() => setIsOpen(false)}
									style={styles.closeButton}
								>
									<Text style={styles.closeButtonText}>✕</Text>
								</Pressable>
							</View>
						</View>

						{/* Quick Context Controls */}
						<View style={styles.controlsRow}>
							<Pressable
								onPress={() =>
									setRole(
										role === "PRIMARY_DRIVER" ? "HELPER" : "PRIMARY_DRIVER",
									)
								}
								style={[
									styles.controlChip,
									role === "PRIMARY_DRIVER" ? styles.chipActive : null,
								]}
							>
								<Text style={styles.controlChipText}>
									Role:{" "}
									{role === "PRIMARY_DRIVER"
										? "Driver (Vehicle)"
										: "Helper (Crew)"}
								</Text>
							</Pressable>

							<Pressable
								onPress={() => setCleanMode(!isCleanMode)}
								style={[
									styles.controlChip,
									isCleanMode ? styles.chipActive : null,
								]}
							>
								<Text style={styles.controlChipText}>
									{isCleanMode ? "Clean Mode: ON" : "Clean Mode: OFF"}
								</Text>
							</Pressable>

							<Pressable
								onPress={handleResetDemoState}
								style={styles.resetChip}
							>
								<Text style={styles.resetChipText}>↺ Reset All</Text>
							</Pressable>
						</View>

						{/* Scenario and Availability Matrix */}
						<View style={styles.scenarioMatrix}>
							{/* Driver Verification Scenarios */}
							<View style={styles.scenarioSection}>
								<Text style={styles.scenarioLabel}>
									Driver Verif ({driver.scenario}):
								</Text>
								<View style={styles.pillRow}>
									{(
										[
											"INITIAL",
											"PENDING",
											"ACTION_REQUIRED",
											"APPROVED",
										] as VerificationScenario[]
									).map((sc) => (
										<Pressable
											key={`d-${sc}`}
											onPress={() => handleSetScenario(sc, "PRIMARY_DRIVER")}
											style={[
												styles.miniPill,
												driver.scenario === sc && styles.miniPillActive,
											]}
										>
											<Text
												style={[
													styles.miniPillText,
													driver.scenario === sc && styles.miniPillTextActive,
												]}
											>
												{sc === "ACTION_REQUIRED" ? "ACTION" : sc}
											</Text>
										</Pressable>
									))}
								</View>
							</View>

							{/* Helper Verification Scenarios */}
							<View style={styles.scenarioSection}>
								<Text style={styles.scenarioLabel}>
									Helper Verif ({helper.scenario}):
								</Text>
								<View style={styles.pillRow}>
									{(
										[
											"INITIAL",
											"PENDING",
											"ACTION_REQUIRED",
											"APPROVED",
										] as VerificationScenario[]
									).map((sc) => (
										<Pressable
											key={`h-${sc}`}
											onPress={() => handleSetScenario(sc, "HELPER")}
											style={[
												styles.miniPill,
												helper.scenario === sc && styles.miniPillActive,
											]}
										>
											<Text
												style={[
													styles.miniPillText,
													helper.scenario === sc && styles.miniPillTextActive,
												]}
											>
												{sc === "ACTION_REQUIRED" ? "ACTION" : sc}
											</Text>
										</Pressable>
									))}
								</View>
							</View>

							{/* Live Availability Toggle */}
							<View style={styles.availabilityRow}>
								<Pressable
									onPress={toggleDriverStatus}
									style={[
										styles.availPill,
										driverStatus === "ONLINE"
											? styles.availOnline
											: styles.availOffline,
									]}
								>
									<Text style={styles.availText}>Driver: {driverStatus}</Text>
								</Pressable>

								<Pressable
									onPress={toggleHelperStatus}
									style={[
										styles.availPill,
										helperStatus === "ONLINE"
											? styles.availOnline
											: styles.availOffline,
									]}
								>
									<Text style={styles.availText}>Helper: {helperStatus}</Text>
								</Pressable>
							</View>

							{/* DW-F04 Dispatch & Crew Scenarios */}
							<View style={styles.scenarioSection}>
								<Text style={styles.scenarioLabel}>
									Dispatch & Crew ({dispatchScenario}):
								</Text>
								<View style={styles.pillRow}>
									{(
										[
											"AVAILABLE",
											"EXPIRED",
											"ACCEPTED",
											"PENDING_INVITE",
											"ACCEPTED_INVITE",
											"DECLINED_INVITE",
											"CREW_INCOMPLETE",
											"CREW_READY",
										] as const
									).map((sc) => (
										<Pressable
											key={`dc-${sc}`}
											onPress={() => handleDispatchScenario(sc)}
											style={[
												styles.miniPill,
												dispatchScenario === sc && styles.miniPillActive,
											]}
										>
											<Text
												style={[
													styles.miniPillText,
													dispatchScenario === sc && styles.miniPillTextActive,
												]}
											>
												{sc}
											</Text>
										</Pressable>
									))}
								</View>
							</View>

							{/* DW-F05 Active Transit & Connection Scenarios */}
							<View style={styles.scenarioSection}>
								<Text style={styles.scenarioLabel}>Transit & Connection:</Text>
								<View style={styles.pillRow}>
									<Pressable
										onPress={() =>
											setDriverTransitStatus(
												driverTransitStatus === "EN_ROUTE"
													? "ON_SITE"
													: "EN_ROUTE",
											)
										}
										style={[
											styles.miniPill,
											driverTransitStatus === "ON_SITE" &&
												styles.miniPillActive,
										]}
									>
										<Text
											style={[
												styles.miniPillText,
												driverTransitStatus === "ON_SITE" &&
													styles.miniPillTextActive,
											]}
										>
											Transit: {driverTransitStatus}
										</Text>
									</Pressable>

									<Pressable
										onPress={() =>
											setNetworkStatus(
												networkStatus === "CONNECTED"
													? "INTERRUPTED"
													: "CONNECTED",
											)
										}
										style={[
											styles.miniPill,
											networkStatus === "INTERRUPTED" && styles.miniPillActive,
										]}
									>
										<Text
											style={[
												styles.miniPillText,
												networkStatus === "INTERRUPTED" &&
													styles.miniPillTextActive,
											]}
										>
											Network: {networkStatus}
										</Text>
									</Pressable>
								</View>
							</View>

							{/* DW-F06 Extra Work Approval Scenarios */}
							<View style={styles.scenarioSection}>
								<Text style={styles.scenarioLabel}>DW-F06 Extra Work:</Text>
								<View style={styles.pillRow}>
									<Pressable
										onPress={() => {
											const activeReq = useServiceProgressStore
												.getState()
												.getActiveRequest();
											if (activeReq) {
												useServiceProgressStore
													.getState()
													.setBothApprovals(activeReq.id, false);
											}
										}}
										style={styles.miniPill}
									>
										<Text style={styles.miniPillText}>Pending</Text>
									</Pressable>

									<Pressable
										onPress={() => {
											const activeReq = useServiceProgressStore
												.getState()
												.getActiveRequest();
											if (activeReq) {
												useServiceProgressStore
													.getState()
													.setBothApprovals(activeReq.id, true);
											}
										}}
										style={styles.miniPill}
									>
										<Text style={styles.miniPillText}>Approve Both</Text>
									</Pressable>

									<Pressable
										onPress={() => {
											const activeReq = useServiceProgressStore
												.getState()
												.getActiveRequest();
											if (activeReq) {
												useServiceProgressStore
													.getState()
													.setCustomerDecision(activeReq.id, "DECLINED");
											}
										}}
										style={styles.miniPill}
									>
										<Text style={styles.miniPillText}>Decline</Text>
									</Pressable>
								</View>
							</View>
						</View>

						{/* Search Input */}
						<View style={styles.searchBox}>
							<Text style={styles.searchIcon}>🔍</Text>
							<TextInput
								value={searchQuery}
								onChangeText={setSearchQuery}
								placeholder="Search screen by ID (e.g. DW01, DW04) or title..."
								placeholderTextColor="#687771"
								style={styles.searchInput}
								autoCapitalize="none"
							/>
							{Boolean(searchQuery) && (
								<Pressable onPress={() => setSearchQuery("")}>
									<Text style={styles.clearSearch}>✕</Text>
								</Pressable>
							)}
						</View>

						{/* Screen List */}
						<ScrollView
							style={styles.screensList}
							showsVerticalScrollIndicator={false}
						>
							{filteredScreens.map((item) => (
								<Pressable
									key={item.id}
									onPress={() => handleSelectScreen(item)}
									style={({ pressed }) => [
										styles.screenRow,
										pressed && styles.screenRowPressed,
									]}
								>
									<View style={styles.rowTop}>
										<Text style={styles.screenName}>{item.name}</Text>
										<View style={styles.badge}>
											<Text style={styles.badgeText}>{item.figmaNode}</Text>
										</View>
									</View>
									<Text style={styles.screenDesc}>{item.description}</Text>
								</Pressable>
							))}
							{filteredScreens.length === 0 && (
								<View style={styles.emptyState}>
									<Text style={styles.emptyText}>
										No matching screens found
									</Text>
								</View>
							)}
						</ScrollView>
					</View>
				</View>
			</Modal>
		</>
	);
}

const styles = StyleSheet.create({
	floatingWrapper: {
		position: "absolute",
		top: 0,
		bottom: 0,
		left: 0,
		right: 0,
		zIndex: 9999,
	},
	invisibleTrigger: {
		position: "absolute",
		top: 0,
		right: 0,
		width: 44,
		height: 44,
		zIndex: 9999,
	},
	floatingDock: {
		position: "absolute",
		top: "42%",
		right: 0,
		height: 28,
		paddingHorizontal: 8,
		backgroundColor: "rgba(19, 25, 23, 0.92)",
		borderWidth: 1,
		borderColor: "#35403B",
		borderRightWidth: 0,
		borderTopLeftRadius: 14,
		borderBottomLeftRadius: 14,
		flexDirection: "row",
		alignItems: "center",
		gap: 5,
		zIndex: 9999,
	},
	floatingDockMinimized: {
		width: 10,
		paddingHorizontal: 0,
		borderColor: "#232C28",
	},
	qaDot: {
		width: 6,
		height: 6,
		borderRadius: 3,
		backgroundColor: "#BAFF42",
	},
	qaDockText: {
		fontFamily: "Inter_700Bold",
		fontSize: 10,
		color: "#BAFF42",
		letterSpacing: 0.5,
	},
	modalOverlay: {
		flex: 1,
		backgroundColor: "rgba(0,0,0,0.75)",
		justifyContent: "flex-end",
	},
	modalContent: {
		backgroundColor: "#151A19",
		borderTopLeftRadius: radius["2xl"],
		borderTopRightRadius: radius["2xl"],
		maxHeight: "85%",
		paddingTop: spacing[4],
		paddingHorizontal: spacing[4],
	},
	modalHeader: {
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-between",
		paddingBottom: spacing[3],
		borderBottomWidth: 1,
		borderBottomColor: "#222B27",
	},
	modalTitle: {
		fontFamily: "Inter_700Bold",
		fontSize: 16,
		color: "#F6F8F6",
	},
	modalSubtitle: {
		fontFamily: "Inter_400Regular",
		fontSize: 11,
		color: "#ADB8B0",
		marginTop: 2,
	},
	headerActions: {
		flexDirection: "row",
		alignItems: "center",
		gap: spacing[2],
	},
	controlsRow: {
		flexDirection: "row",
		alignItems: "center",
		gap: 8,
		marginVertical: 10,
	},
	controlChip: {
		flex: 1,
		backgroundColor: "#1E2523",
		paddingVertical: 7,
		paddingHorizontal: 10,
		borderRadius: radius.md,
		borderWidth: 1,
		borderColor: "#35403B",
		alignItems: "center",
	},
	chipActive: {
		borderColor: "#BAFF42",
	},
	controlChipText: {
		fontFamily: "Inter_600SemiBold",
		fontSize: 11,
		color: "#F6F8F6",
	},
	resetChip: {
		backgroundColor: "#2A1818",
		paddingVertical: 7,
		paddingHorizontal: 12,
		borderRadius: radius.md,
		borderWidth: 1,
		borderColor: "#5A2828",
	},
	resetChipText: {
		fontFamily: "Inter_600SemiBold",
		fontSize: 11,
		color: "#FF8080",
	},
	scenarioMatrix: {
		backgroundColor: "#151B19",
		borderRadius: radius.md,
		padding: 8,
		marginBottom: 8,
		borderWidth: 1,
		borderColor: "#2B3532",
		gap: 6,
	},
	scenarioSection: {
		gap: 4,
	},
	scenarioLabel: {
		fontFamily: "Inter_500Medium",
		fontSize: 10,
		color: "#ADB8B0",
	},
	pillRow: {
		flexDirection: "row",
		gap: 4,
	},
	miniPill: {
		flex: 1,
		backgroundColor: "#1E2523",
		paddingVertical: 4,
		borderRadius: radius.sm,
		borderWidth: 1,
		borderColor: "#35403B",
		alignItems: "center",
	},
	miniPillActive: {
		backgroundColor: "rgba(186, 255, 66, 0.15)",
		borderColor: "#BAFF42",
	},
	miniPillText: {
		fontFamily: "Inter_500Medium",
		fontSize: 9,
		color: "#ADB8B0",
	},
	miniPillTextActive: {
		color: "#BAFF42",
		fontFamily: "Inter_700Bold",
	},
	availabilityRow: {
		flexDirection: "row",
		gap: 8,
		marginTop: 2,
	},
	availPill: {
		flex: 1,
		paddingVertical: 5,
		borderRadius: radius.sm,
		borderWidth: 1,
		alignItems: "center",
	},
	availOnline: {
		backgroundColor: "rgba(186, 255, 66, 0.12)",
		borderColor: "#BAFF42",
	},
	availOffline: {
		backgroundColor: "rgba(255, 128, 128, 0.12)",
		borderColor: "#FF8080",
	},
	availText: {
		fontFamily: "Inter_600SemiBold",
		fontSize: 10,
		color: "#F6F8F6",
	},
	searchBox: {
		flexDirection: "row",
		alignItems: "center",
		backgroundColor: "#0D1110",
		borderWidth: 1,
		borderColor: "#232C28",
		borderRadius: radius.lg,
		paddingHorizontal: 10,
		marginBottom: 8,
		height: 40,
	},
	searchIcon: {
		fontSize: 12,
		marginRight: 6,
	},
	searchInput: {
		flex: 1,
		fontFamily: "Inter_400Regular",
		fontSize: 12,
		color: "#FFFFFF",
		paddingVertical: 0,
	},
	clearSearch: {
		fontSize: 12,
		color: "#ADB8B0",
		padding: 4,
	},
	langToggle: {
		backgroundColor: "#222B27",
		paddingHorizontal: 10,
		paddingVertical: 5,
		borderRadius: radius.md,
		borderWidth: 1,
		borderColor: "#BAFF42",
	},
	langToggleText: {
		fontFamily: "Inter_600SemiBold",
		fontSize: 11,
		color: "#BAFF42",
	},
	closeButton: {
		width: 32,
		height: 32,
		borderRadius: 16,
		backgroundColor: "#222B27",
		alignItems: "center",
		justifyContent: "center",
	},
	closeButtonText: {
		color: "#F6F8F6",
		fontSize: 14,
		fontFamily: "Inter_700Bold",
	},
	screensList: {
		paddingVertical: spacing[2],
	},
	screenRow: {
		backgroundColor: "#1E2523",
		borderRadius: radius.xl,
		padding: spacing[3],
		marginBottom: spacing[2.5],
		borderWidth: 1,
		borderColor: "#2B3532",
	},
	screenRowPressed: {
		borderColor: "#BAFF42",
	},
	rowTop: {
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-between",
	},
	screenName: {
		fontFamily: "Inter_600SemiBold",
		fontSize: 13,
		color: "#F6F8F6",
		flex: 1,
	},
	badge: {
		backgroundColor: "#2C3330",
		paddingHorizontal: 6,
		paddingVertical: 2,
		borderRadius: radius.sm,
		marginLeft: spacing[2],
	},
	badgeText: {
		fontFamily: "Inter_500Medium",
		fontSize: 9,
		color: "#BAFF42",
	},
	screenDesc: {
		fontFamily: "Inter_400Regular",
		fontSize: 11,
		color: "#ADB8B0",
		marginTop: 4,
		lineHeight: 15,
	},
	emptyState: {
		paddingVertical: 30,
		alignItems: "center",
	},
	emptyText: {
		fontFamily: "Inter_400Regular",
		fontSize: 13,
		color: "#687771",
	},
});
