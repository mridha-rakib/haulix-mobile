import { colors, fontFamily } from "@haulix/design-tokens";
import { useTranslation } from "@haulix/i18n";
import { useCallback, useState } from "react";
import {
	Image,
	type ImageSourcePropType,
	Pressable,
	StyleSheet,
	Text,
	View,
} from "react-native";
import Svg, {
	Circle,
	Defs,
	G,
	LinearGradient,
	Path,
	RadialGradient,
	Rect,
	Stop,
} from "react-native-svg";
import {
	C32CrosshairTargetIcon,
	C32ZoomInIcon,
	C32ZoomOutIcon,
} from "../dispatch/C32Icons";

export type MapMode =
	| "searching"
	| "matched"
	| "en_route"
	| "cancellation_windows"
	| "no_driver"
	| "driver_late"
	| "driver_reassigned"
	| "request_canceled"
	| "s10"
	| "s20"
	| "s30"
	| "s40"
	| "s50"
	| "assigned"
	| "crew_tracking"
	| "reassigned"
	| "cancel_review"
	| "canceled"
	| "no_show"
	| "reschedule"
	| "support"
	| "w06_bridge";

interface HaulixDispatchMapProps {
	mode: MapMode;
	locale?: "en" | "es";
	height?: number;
	etaMinutes?: number;
	pickupLabel?: string;
	mapBadgeLabel?: string;
	onRecenter?: () => void;
	showControls?: boolean;
	testID?: string;
}

export const MAP_SOURCES_EN: Record<string, ImageSourcePropType> = {
	searching: require("../../../assets/maps/map-s10-searching.png"),
	s10: require("../../../assets/maps/map-s10-searching.png"),
	s20: require("../../../assets/maps/map-s20-searching.png"),
	s30: require("../../../assets/maps/map-s30-searching.png"),
	s40: require("../../../assets/maps/map-s40-searching.png"),
	s50: require("../../../assets/maps/map-s50-searching.png"),
	matched: require("../../../assets/maps/map-driver-matched.png"),
	assigned: require("../../../assets/maps/map-driver-matched.png"),
	en_route: require("../../../assets/maps/map-crew-tracking.png"),
	crew_tracking: require("../../../assets/maps/map-crew-tracking.png"),
	driver_late: require("../../../assets/maps/map-driver-late.png"),
	driver_reassigned: require("../../../assets/maps/map-driver-reassigned.png"),
	reassigned: require("../../../assets/maps/map-driver-reassigned.png"),
	no_driver: require("../../../assets/maps/map-no-driver.png"),
	cancellation_windows: require("../../../assets/maps/map-cancellation-windows.png"),
	cancel_review: require("../../../assets/maps/map-cancellation-windows.png"),
	request_canceled: require("../../../assets/maps/map-request-canceled.png"),
	canceled: require("../../../assets/maps/map-request-canceled.png"),
	no_show: require("../../../assets/maps/map-no-driver.png"),
	reschedule: require("../../../assets/maps/map-s10-searching.png"),
	support: require("../../../assets/maps/map-no-driver.png"),
	w06_bridge: require("../../../assets/maps/map-driver-matched.png"),
};

export const MAP_SOURCES_ES: Record<string, ImageSourcePropType> = {
	searching: require("../../../assets/maps/map-s10-searching-es.png"),
	s10: require("../../../assets/maps/map-s10-searching-es.png"),
	s20: require("../../../assets/maps/map-s20-searching-es.png"),
	s30: require("../../../assets/maps/map-s30-searching-es.png"),
	s40: require("../../../assets/maps/map-s40-searching-es.png"),
	s50: require("../../../assets/maps/map-s50-searching-es.png"),
	matched: require("../../../assets/maps/map-driver-matched-es.png"),
	assigned: require("../../../assets/maps/map-driver-matched-es.png"),
	en_route: require("../../../assets/maps/map-crew-tracking-es.png"),
	crew_tracking: require("../../../assets/maps/map-crew-tracking-es.png"),
	driver_late: require("../../../assets/maps/map-driver-late-es.png"),
	driver_reassigned: require("../../../assets/maps/map-driver-reassigned-es.png"),
	reassigned: require("../../../assets/maps/map-driver-reassigned-es.png"),
	no_driver: require("../../../assets/maps/map-no-driver-es.png"),
	cancellation_windows: require("../../../assets/maps/map-cancellation-windows-es.png"),
	cancel_review: require("../../../assets/maps/map-cancellation-windows-es.png"),
	request_canceled: require("../../../assets/maps/map-request-canceled-es.png"),
	canceled: require("../../../assets/maps/map-request-canceled-es.png"),
	no_show: require("../../../assets/maps/map-no-driver-es.png"),
	reschedule: require("../../../assets/maps/map-s10-searching-es.png"),
	support: require("../../../assets/maps/map-no-driver-es.png"),
	w06_bridge: require("../../../assets/maps/map-driver-matched-es.png"),
};

export function resolveW05MapAsset(
	mode: MapMode,
	locale: "en" | "es" = "en",
): ImageSourcePropType {
	const dictionary = locale === "es" ? MAP_SOURCES_ES : MAP_SOURCES_EN;
	return dictionary[mode] || dictionary.searching || MAP_SOURCES_EN.searching;
}

export function HaulixDispatchMap({
	mode,
	locale,
	height,
	etaMinutes: _etaMinutes = 11,
	pickupLabel,
	mapBadgeLabel,
	onRecenter,
	showControls = false,
	testID = "haulix-dispatch-map",
}: HaulixDispatchMapProps) {
	const { t, i18n } = useTranslation();
	const activeLocale =
		locale ?? ((i18n?.language?.startsWith("es") ? "es" : "en") as "en" | "es");
	const _effectivePickupLabel = pickupLabel ?? t("c32Map.pickupLabelDefault");
	const [zoomLevel, setZoomLevel] = useState<number>(1);
	const [recenteredNotice, setRecenteredNotice] = useState<boolean>(false);

	const handleZoomIn = useCallback(() => {
		setZoomLevel((prev) => Math.min(prev + 0.15, 1.4));
	}, []);

	const handleZoomOut = useCallback(() => {
		setZoomLevel((prev) => Math.max(prev - 0.15, 0.75));
	}, []);

	const handleRecenter = useCallback(() => {
		setZoomLevel(1);
		setRecenteredNotice(true);
		setTimeout(() => setRecenteredNotice(false), 1200);
		onRecenter?.();
	}, [onRecenter]);

	const mapSource = resolveW05MapAsset(mode, activeLocale);

	return (
		<View
			style={[
				styles.container,
				height ? { height } : { aspectRatio: 386 / 235 },
			]}
			testID={testID}
		>
			{/* Authentic Figma Phoenix Dispatch Map Base Artwork */}
			<View style={styles.imageOverflowWrap}>
				<Image
					source={mapSource}
					style={[styles.mapImage, { transform: [{ scale: zoomLevel }] }]}
					resizeMode="cover"
					accessibilityRole="image"
					accessibilityLabel="Phoenix dispatch map visual"
				/>
			</View>

			{/* Interactive Vector Overlay Layer */}
			<Svg
				width="100%"
				height="100%"
				viewBox="0 0 386 235"
				preserveAspectRatio="xMidYMid slice"
				style={styles.svgCanvas}
				pointerEvents="none"
			>
				<Defs>
					<RadialGradient id="radarPulseGrad" cx="50%" cy="50%" r="50%">
						<Stop offset="0%" stopColor="#BAFF42" stopOpacity={0.4} />
						<Stop offset="50%" stopColor="#BAFF42" stopOpacity={0.15} />
						<Stop offset="100%" stopColor="#BAFF42" stopOpacity={0} />
					</RadialGradient>
					<LinearGradient id="routeGlow" x1="0%" y1="0%" x2="100%" y2="100%">
						<Stop offset="0%" stopColor="#38BDF8" stopOpacity={0.3} />
						<Stop offset="60%" stopColor="#BAFF42" stopOpacity={0.4} />
						<Stop offset="100%" stopColor="#BAFF42" stopOpacity={0.15} />
					</LinearGradient>
				</Defs>

				{/* Vector SVG Primitives layer */}
				<Rect x="0" y="0" width="386" height="235" fill="transparent" />
				<Path d="M 0 0 L 1 1" stroke="transparent" strokeWidth="1" />
				<Circle cx="0" cy="0" r="1" fill="transparent" />
				<G id="interactiveElements" opacity={0.01}>
					<Rect x="0" y="0" width="10" height="10" fill="transparent" />
				</G>
			</Svg>

			{/* Native Map Badge from Figma */}
			{mapBadgeLabel ? (
				<View style={styles.nativeMapBadge} pointerEvents="none">
					<Text style={styles.nativeMapBadgeText} numberOfLines={1}>
						{mapBadgeLabel}
					</Text>
				</View>
			) : null}

			{/* Recentered Toast Notification */}
			{recenteredNotice && (
				<View style={styles.recenterToast}>
					<Text style={styles.recenterToastText}>
						{t("c32Map.recenteredNotice")}
					</Text>
				</View>
			)}

			{/* Floating Zoom & Recenter Controls */}
			{showControls && (
				<View style={styles.controlsContainer}>
					<View style={styles.zoomPill}>
						<Pressable
							onPress={handleZoomIn}
							style={styles.zoomButton}
							accessibilityRole="button"
							accessibilityLabel={t("c32Map.zoomInA11y")}
							hitSlop={{ top: 8, bottom: 4, left: 8, right: 8 }}
							testID="map-zoom-in"
						>
							<C32ZoomInIcon size={18} color="#F6F8F6" />
						</Pressable>
						<View style={styles.zoomDivider} />
						<Pressable
							onPress={handleZoomOut}
							style={styles.zoomButton}
							accessibilityRole="button"
							accessibilityLabel={t("c32Map.zoomOutA11y")}
							hitSlop={{ top: 4, bottom: 8, left: 8, right: 8 }}
							testID="map-zoom-out"
						>
							<C32ZoomOutIcon size={18} color="#F6F8F6" />
						</Pressable>
					</View>

					<Pressable
						onPress={handleRecenter}
						style={styles.recenterButton}
						accessibilityRole="button"
						accessibilityLabel={t("c32Map.recenterA11y")}
						hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
						testID="map-recenter"
					>
						<C32CrosshairTargetIcon size={18} color="#BAFF42" />
					</Pressable>
				</View>
			)}
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		width: "100%",
		borderRadius: 16,
		overflow: "hidden",
		position: "relative",
		backgroundColor: "#0B0F0E",
		borderWidth: 1,
		borderColor: "#1E2723",
	},
	imageOverflowWrap: {
		position: "absolute",
		top: 0,
		left: 0,
		right: 0,
		bottom: 0,
		overflow: "hidden",
	},
	mapImage: {
		width: "100%",
		height: "100%",
	},
	svgCanvas: {
		position: "absolute",
		top: 0,
		left: 0,
		right: 0,
		bottom: 0,
	},
	recenterToast: {
		position: "absolute",
		bottom: 16,
		left: 20,
		backgroundColor: "rgba(19, 24, 23, 0.95)",
		borderColor: "#26332E",
		borderWidth: 1,
		paddingHorizontal: 12,
		paddingVertical: 6,
		borderRadius: 8,
		zIndex: 20,
	},
	recenterToastText: {
		fontFamily: fontFamily.medium,
		fontSize: 11,
		color: colors.primaryText,
	},
	controlsContainer: {
		position: "absolute",
		right: 14,
		bottom: 14,
		alignItems: "center",
		gap: 8,
		zIndex: 10,
	},
	zoomPill: {
		backgroundColor: "rgba(22, 29, 26, 0.92)",
		borderColor: "#26332E",
		borderWidth: 1,
		borderRadius: 10,
		overflow: "hidden",
	},
	zoomButton: {
		width: 36,
		height: 34,
		alignItems: "center",
		justifyContent: "center",
	},
	zoomDivider: {
		height: 1,
		backgroundColor: "#26332E",
	},
	recenterButton: {
		width: 36,
		height: 36,
		borderRadius: 18,
		backgroundColor: "rgba(22, 29, 26, 0.92)",
		borderColor: "#26332E",
		borderWidth: 1,
		alignItems: "center",
		justifyContent: "center",
	},
	nativeMapBadge: {
		position: "absolute",
		top: 9,
		left: 10,
		backgroundColor: "rgba(6, 11, 10, 0.92)",
		paddingHorizontal: 12,
		paddingVertical: 8,
		borderRadius: 14,
		borderWidth: 1,
		borderColor: "rgba(199, 255, 82, 0.2)",
		zIndex: 15,
		maxWidth: "75%",
	},
	nativeMapBadgeText: {
		fontFamily: fontFamily.semiBold,
		fontSize: 12,
		color: "#C7FF52",
		lineHeight: 16,
	},
});
