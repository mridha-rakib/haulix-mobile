import { colors, fontFamily } from "@haulix/design-tokens";
import { StyleSheet, Text, View } from "react-native";

export interface FlowHeaderStartProps {
  testID?: string;
}

/**
 * Shared Flow Header · Start (Figma Node 429:290 / Context=Start)
 * Centered HAULIX brand wordmark with "We Haul It All." tagline,
 * without a back navigation button (used at flow entry screens like C22).
 */
export function FlowHeaderStart({ testID = "flow-header-start" }: FlowHeaderStartProps) {
  return (
    <View style={styles.flowHeaderContainer} testID={testID}>
      <View style={styles.headerCenter}>
        <View style={styles.wordmarkRow}>
          <Text style={styles.wordmarkHaul}>HAUL</Text>
          <Text style={styles.wordmarkIx}>IX</Text>
          <Text style={styles.registeredMark}>®</Text>
        </View>
        <Text style={styles.taglineText}>We Haul It All.</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  flowHeaderContainer: {
    height: 60,
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 22,
    backgroundColor: colors.background,
  },
  headerCenter: {
    alignItems: "center",
    justifyContent: "center",
  },
  wordmarkRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  wordmarkHaul: {
    fontFamily: fontFamily.bold,
    fontSize: 26,
    color: colors.primaryText,
    letterSpacing: 0.5,
  },
  wordmarkIx: {
    fontFamily: fontFamily.bold,
    fontSize: 26,
    color: colors.brand,
    letterSpacing: 0.5,
  },
  registeredMark: {
    fontFamily: fontFamily.bold,
    fontSize: 10,
    color: colors.brand,
    marginLeft: 2,
    marginTop: -10,
  },
  taglineText: {
    fontFamily: fontFamily.medium,
    fontSize: 10,
    color: colors.secondaryText,
    marginTop: 2,
  },
});
