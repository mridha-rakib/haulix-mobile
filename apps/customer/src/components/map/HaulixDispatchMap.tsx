import { colors, fontFamily } from "@haulix/design-tokens";
import { useTranslation } from "@haulix/i18n";
import { useCallback, useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
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
  C32LocationPinIcon,
  C32VanIcon,
  C32ZoomInIcon,
  C32ZoomOutIcon,
} from "../dispatch/C32Icons";

export type MapMode = "searching" | "matched" | "en_route";

interface HaulixDispatchMapProps {
  mode: MapMode;
  height?: number;
  etaMinutes?: number;
  pickupLabel?: string;
  onRecenter?: () => void;
  testID?: string;
}

export function HaulixDispatchMap({
  mode,
  height = 340,
  etaMinutes = 11,
  pickupLabel,
  onRecenter,
  testID = "haulix-dispatch-map",
}: HaulixDispatchMapProps) {
  const { t } = useTranslation();
  const effectivePickupLabel = pickupLabel ?? t("c32Map.pickupLabelDefault");
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

  // Scaled coordinates based on nominal 380 x 300 viewport
  // Pickup coordinates: (275, 230)
  // Driver matched coordinates: (75, 120)
  // Driver en-route coordinates: (185, 120)
  const pickupX = 275;
  const pickupY = 225;
  const driverMatchedX = 75;
  const driverMatchedY = 120;
  const driverEnRouteX = 180;
  const driverEnRouteY = 120;

  const vbWidth = 380 / zoomLevel;
  const vbHeight = 300 / zoomLevel;
  const vbX = (380 - vbWidth) / 2;
  const vbY = (300 - vbHeight) / 2;

  return (
    <View style={[styles.container, { height }]} testID={testID}>
      <Svg
        width="100%"
        height="100%"
        viewBox={`${vbX} ${vbY} ${vbWidth} ${vbHeight}`}
        preserveAspectRatio="xMidYMid slice"
        style={styles.svgCanvas}
      >
        <Defs>
          {/* Radial gradient for search radar pulses */}
          <RadialGradient id="radarPulseGrad" cx="50%" cy="50%" r="50%">
            <Stop offset="0%" stopColor="#BAFF42" stopOpacity={0.4} />
            <Stop offset="50%" stopColor="#BAFF42" stopOpacity={0.15} />
            <Stop offset="100%" stopColor="#BAFF42" stopOpacity={0} />
          </RadialGradient>

          {/* Linear gradient for route glow */}
          <LinearGradient id="routeGlow" x1="0%" y1="0%" x2="100%" y2="100%">
            <Stop offset="0%" stopColor="#38BDF8" stopOpacity={0.3} />
            <Stop offset="60%" stopColor="#BAFF42" stopOpacity={0.4} />
            <Stop offset="100%" stopColor="#BAFF42" stopOpacity={0.15} />
          </LinearGradient>
        </Defs>

        {/* ============================================================ */}
        {/* LAYER 1: BASE CANVAS & CITY BLOCKS                         */}
        {/* ============================================================ */}
        <Rect x="0" y="0" width="380" height="300" fill="#080B0B" />

        {/* Urban city blocks grid */}
        <Rect x="15" y="15" width="45" height="40" rx="4" fill="#131917" stroke="#1C2421" />
        <Rect x="70" y="15" width="55" height="40" rx="4" fill="#131917" stroke="#1C2421" />
        <Rect x="135" y="15" width="60" height="40" rx="4" fill="#131917" stroke="#1C2421" />
        <Rect x="205" y="15" width="70" height="40" rx="4" fill="#131917" stroke="#1C2421" />
        <Rect x="285" y="15" width="80" height="40" rx="4" fill="#131917" stroke="#1C2421" />

        <Rect x="15" y="65" width="45" height="45" rx="4" fill="#131917" stroke="#1C2421" />
        <Rect x="70" y="65" width="55" height="45" rx="4" fill="#131917" stroke="#1C2421" />
        {/* Park / Urban Preserve area */}
        <Rect x="135" y="65" width="60" height="45" rx="4" fill="#0F221B" stroke="#19382C" />
        <Rect x="205" y="65" width="70" height="45" rx="4" fill="#131917" stroke="#1C2421" />
        <Rect x="285" y="65" width="80" height="45" rx="4" fill="#131917" stroke="#1C2421" />

        <Rect x="15" y="140" width="45" height="55" rx="4" fill="#131917" stroke="#1C2421" />
        <Rect x="70" y="140" width="55" height="55" rx="4" fill="#131917" stroke="#1C2421" />
        <Rect x="135" y="140" width="60" height="55" rx="4" fill="#131917" stroke="#1C2421" />
        <Rect x="205" y="140" width="70" height="55" rx="4" fill="#131917" stroke="#1C2421" />
        <Rect x="285" y="140" width="80" height="55" rx="4" fill="#131917" stroke="#1C2421" />

        <Rect x="15" y="205" width="45" height="40" rx="4" fill="#131917" stroke="#1C2421" />
        <Rect x="70" y="205" width="55" height="40" rx="4" fill="#131917" stroke="#1C2421" />
        <Rect x="135" y="205" width="60" height="40" rx="4" fill="#131917" stroke="#1C2421" />
        <Rect x="205" y="205" width="50" height="40" rx="4" fill="#131917" stroke="#1C2421" />
        <Rect x="265" y="205" width="100" height="40" rx="4" fill="#131917" stroke="#1C2421" />

        {/* Water canal corridor (Salt River canal) */}
        <Path
          d="M0 270 Q90 262 180 274 T380 266"
          stroke="#0A1815"
          strokeWidth="18"
          fill="none"
          strokeLinecap="round"
        />
        <Path
          d="M0 270 Q90 262 180 274 T380 266"
          stroke="#112923"
          strokeWidth="10"
          fill="none"
          strokeLinecap="round"
        />

        {/* ============================================================ */}
        {/* LAYER 2: STREET NETWORK & HIGHWAY GEOMETRY                  */}
        {/* ============================================================ */}
        {/* Local grid streets */}
        <Path d="M65 0v300 M130 0v300 M200 0v300 M280 0v300" stroke="#1C2622" strokeWidth="2.5" />
        <Path d="M0 60h380 M0 115h380 M0 170h380 M0 225h380" stroke="#1C2622" strokeWidth="2.5" />

        {/* Primary Arterials (McDowell Rd, Thomas Rd, Central Ave, 7th St) */}
        <Path d="M0 120h380" stroke="#2B3C35" strokeWidth="5" strokeLinecap="round" />
        <Path d="M0 225h380" stroke="#2B3C35" strokeWidth="5" strokeLinecap="round" />
        <Path d="M200 0v300" stroke="#2B3C35" strokeWidth="5" strokeLinecap="round" />
        <Path d="M280 0v300" stroke="#2B3C35" strokeWidth="5" strokeLinecap="round" />

        {/* Highway Corridor: I-10 Papago Freeway (diagonal curved expressway) */}
        <Path
          d="M0 45 C110 40, 220 50, 380 35"
          stroke="#384D44"
          strokeWidth="8"
          fill="none"
          strokeLinecap="round"
        />
        <Path
          d="M0 45 C110 40, 220 50, 380 35"
          stroke="#202D28"
          strokeWidth="3.5"
          fill="none"
          strokeLinecap="round"
        />

        {/* ============================================================ */}
        {/* LAYER 3: ROAD-FOLLOWING ROUTE POLYLINE                      */}
        {/* ============================================================ */}
        {/* Route geometry: From driver position along Thomas Rd (y=120) -> turn south on 7th St (x=280) -> pickup at (275, 225) */}
        {mode === "matched" && (
          <G testID="map-route-matched">
            {/* Dashed preliminary route */}
            <Path
              d={`M ${driverMatchedX} ${driverMatchedY} L 280 ${driverMatchedY} L 280 ${pickupY} L ${pickupX} ${pickupY}`}
              stroke="rgba(56, 189, 248, 0.35)"
              strokeWidth="7"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <Path
              d={`M ${driverMatchedX} ${driverMatchedY} L 280 ${driverMatchedY} L 280 ${pickupY} L ${pickupX} ${pickupY}`}
              stroke="#38BDF8"
              strokeWidth="3.5"
              strokeDasharray="6,4"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </G>
        )}

        {mode === "en_route" && (
          <G testID="map-route-en-route">
            {/* High-visibility glowing neon lime route polyline following the road network */}
            <Path
              d={`M ${driverEnRouteX} ${driverEnRouteY} L 280 ${driverEnRouteY} L 280 ${pickupY} L ${pickupX} ${pickupY}`}
              stroke="rgba(186, 255, 66, 0.25)"
              strokeWidth="11"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <Path
              d={`M ${driverEnRouteX} ${driverEnRouteY} L 280 ${driverEnRouteY} L 280 ${pickupY} L ${pickupX} ${pickupY}`}
              stroke="#BAFF42"
              strokeWidth="4.5"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </G>
        )}

        {/* ============================================================ */}
        {/* LAYER 4: RADAR PULSE WAVES (SEARCHING MODE)                 */}
        {/* ============================================================ */}
        {mode === "searching" && (
          <G testID="map-radar-searching">
            {/* Concentric expanding pulses centered on pickup location */}
            <Circle cx={pickupX} cy={pickupY} r={80} fill="url(#radarPulseGrad)" />
            <Circle
              cx={pickupX}
              cy={pickupY}
              r={55}
              stroke="#BAFF42"
              strokeWidth="1.5"
              strokeDasharray="4,3"
              opacity={0.5}
            />
            <Circle
              cx={pickupX}
              cy={pickupY}
              r={32}
              stroke="#BAFF42"
              strokeWidth="2"
              opacity={0.75}
            />
            <Circle
              cx={pickupX}
              cy={pickupY}
              r={12}
              fill="rgba(186, 255, 66, 0.3)"
              stroke="#BAFF42"
              strokeWidth="2"
            />
          </G>
        )}

        {/* ============================================================ */}
        {/* LAYER 5: MARKERS & VEHICLE POSITION                         */}
        {/* ============================================================ */}
        {/* Pickup Pin Marker */}
        <G transform={`translate(${pickupX - 12}, ${pickupY - 26})`} testID="map-pickup-marker">
          <C32LocationPinIcon size={24} color="#BAFF42" />
        </G>

        {/* Matched Driver Vehicle Marker */}
        {mode === "matched" && (
          <G
            transform={`translate(${driverMatchedX - 14}, ${driverMatchedY - 14})`}
            testID="map-driver-marker-matched"
          >
            {/* Pulse glow under matched driver */}
            <Circle cx={14} cy={14} r={18} fill="rgba(56, 189, 248, 0.2)" />
            <Circle cx={14} cy={14} r={14} fill="#131917" stroke="#38BDF8" strokeWidth={2} />
            <G transform="translate(2, 2)">
              <C32VanIcon size={24} color="#38BDF8" />
            </G>
          </G>
        )}

        {/* En-Route Driver Vehicle Marker */}
        {mode === "en_route" && (
          <G
            transform={`translate(${driverEnRouteX - 16}, ${driverEnRouteY - 16})`}
            testID="map-driver-marker-en-route"
          >
            {/* Glowing brand pulse under moving en route driver */}
            <Circle cx={16} cy={16} r={22} fill="rgba(186, 255, 66, 0.25)" />
            <Circle cx={16} cy={16} r={16} fill="#0B0F0E" stroke="#BAFF42" strokeWidth={2.5} />
            <G transform="translate(4, 4)">
              <C32VanIcon size={24} color="#BAFF42" />
            </G>
          </G>
        )}
      </Svg>

      {/* ============================================================ */}
      {/* FLOATING MAP UI: ETA BADGE, ZOOM CONTROLS, RECENTER BUTTON   */}
      {/* ============================================================ */}

      {/* Top Floating Status Capsule */}
      <View style={styles.topStatusContainer} pointerEvents="box-none">
        {mode === "searching" && (
          <View style={styles.searchingBadge} testID="map-searching-badge">
            <View style={styles.pulsingGreenDot} />
            <Text style={styles.searchingBadgeText}>{t("c32Map.searchingBadge")}</Text>
          </View>
        )}

        {mode === "matched" && (
          <View style={styles.matchedBadge} testID="map-matched-badge">
            <View style={styles.blueDot} />
            <Text style={styles.matchedBadgeText}>{t("c32Map.matchedBadge")}</Text>
          </View>
        )}

        {mode === "en_route" && (
          <View style={styles.etaBadge} testID="map-eta-badge">
            <View style={styles.limeDot} />
            <Text style={styles.etaBadgeText}>
              {t("c32Map.crewEnRouteBadge", {
                minutes: etaMinutes,
                location: effectivePickupLabel,
              })}
            </Text>
          </View>
        )}
      </View>

      {/* Recentered Toast Notice */}
      {recenteredNotice && (
        <View style={styles.recenterToast} testID="map-recenter-toast">
          <Text style={styles.recenterToastText}>{t("c32Map.recenterNotice")}</Text>
        </View>
      )}

      {/* Floating Map Action Controls (Right Rail) */}
      <View style={styles.controlsContainer}>
        {/* Zoom Control Pill */}
        <View style={styles.zoomPill} testID="map-zoom-controls">
          <Pressable
            onPress={handleZoomIn}
            hitSlop={6}
            accessibilityRole="button"
            accessibilityLabel={t("c32Map.zoomInA11y")}
            style={styles.zoomButton}
            testID="map-zoom-in-btn"
          >
            <C32ZoomInIcon size={16} color="#BAFF42" />
          </Pressable>
          <View style={styles.zoomDivider} />
          <Pressable
            onPress={handleZoomOut}
            hitSlop={6}
            accessibilityRole="button"
            accessibilityLabel={t("c32Map.zoomOutA11y")}
            style={styles.zoomButton}
            testID="map-zoom-out-btn"
          >
            <C32ZoomOutIcon size={16} color="#ADB7B1" />
          </Pressable>
        </View>

        {/* Recenter Button */}
        <Pressable
          onPress={handleRecenter}
          hitSlop={8}
          accessibilityRole="button"
          accessibilityLabel={t("c32Map.recenterA11y")}
          style={styles.recenterButton}
          testID="map-recenter-btn"
        >
          <C32CrosshairTargetIcon size={18} color="#BAFF42" />
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    backgroundColor: "#080B0B",
    position: "relative",
    overflow: "hidden",
  },
  svgCanvas: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  topStatusContainer: {
    position: "absolute",
    top: 14,
    left: 16,
    right: 16,
    alignItems: "center",
    zIndex: 10,
  },
  searchingBadge: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(11, 15, 14, 0.92)",
    borderColor: "rgba(186, 255, 66, 0.4)",
    borderWidth: 1,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    gap: 8,
  },
  searchingBadgeText: {
    fontFamily: fontFamily.bold,
    fontSize: 11,
    color: colors.brand,
    letterSpacing: 0.5,
  },
  pulsingGreenDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: colors.brand,
  },
  matchedBadge: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(11, 15, 14, 0.92)",
    borderColor: "rgba(56, 189, 248, 0.4)",
    borderWidth: 1,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    gap: 8,
  },
  matchedBadgeText: {
    fontFamily: fontFamily.bold,
    fontSize: 11,
    color: "#38BDF8",
    letterSpacing: 0.5,
  },
  blueDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#38BDF8",
  },
  etaBadge: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(11, 15, 14, 0.94)",
    borderColor: "#26332E",
    borderWidth: 1,
    paddingHorizontal: 14,
    paddingVertical: 7,
    borderRadius: 20,
    gap: 8,
  },
  etaBadgeText: {
    fontFamily: fontFamily.bold,
    fontSize: 12,
    color: colors.brand,
    letterSpacing: 0.5,
  },
  limeDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: colors.brand,
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
  },
  recenterToastText: {
    fontFamily: fontFamily.medium,
    fontSize: 11,
    color: colors.primaryText,
  },
  controlsContainer: {
    position: "absolute",
    right: 14,
    bottom: 20,
    alignItems: "center",
    gap: 10,
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
    width: 38,
    height: 36,
    alignItems: "center",
    justifyContent: "center",
  },
  zoomDivider: {
    height: 1,
    backgroundColor: "#26332E",
  },
  recenterButton: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: "rgba(22, 29, 26, 0.92)",
    borderColor: "#26332E",
    borderWidth: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
