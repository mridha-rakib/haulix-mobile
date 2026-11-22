import { spacing } from "@haulix/design-tokens";
import { HaulixSafeArea, HaulixText } from "@haulix/ui";
import { StyleSheet, View } from "react-native";

/**
 * Driver home — protected area placeholder.
 * Role-specific UI (Primary Driver vs Helper) will be rendered here
 * based on server-authoritative role data in Phase 02.
 */
export default function DriverHomeScreen() {
  return (
    <HaulixSafeArea>
      <View style={styles.container}>
        <HaulixText variant="brand" size="lg" weight="semiBold">
          Driver Dashboard
        </HaulixText>
        <HaulixText variant="secondary" size="sm" style={styles.note}>
          Protected area — role-based UI from server in Phase 02
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
