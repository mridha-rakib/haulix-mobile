import { spacing } from "@haulix/design-tokens";
import { HaulixSafeArea, HaulixText } from "@haulix/ui";
import { StyleSheet, View } from "react-native";

/**
 * Home screen — protected area placeholder.
 * Full implementation in Phase 02 (Figma → React Native).
 */
export default function HomeScreen() {
  return (
    <HaulixSafeArea>
      <View style={styles.container}>
        <HaulixText variant="brand" size="lg" weight="semiBold">
          Home
        </HaulixText>
        <HaulixText variant="secondary" size="sm" style={styles.note}>
          Protected area — full UI in Phase 02
        </HaulixText>
      </View>
    </HaulixSafeArea>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: spacing[6],
  },
  note: {
    marginTop: spacing[2],
  },
});
