import { radius, spacing } from "@haulix/design-tokens";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { CheckmarkIcon, DriverTruckIcon, HelperUsersIcon } from "../icons/DriverIcons";

interface RoleCardProps {
  driverRole: "PRIMARY_DRIVER" | "HELPER";
  title: string;
  tag: string;
  description: string;
  chips: string[];
  isSelected: boolean;
  onSelect: () => void;
}

export function RoleCard({
  driverRole,
  title,
  tag,
  description,
  chips,
  isSelected,
  onSelect,
}: RoleCardProps) {
  const isDriver = driverRole === "PRIMARY_DRIVER";

  return (
    <Pressable
      onPress={onSelect}
      style={[styles.card, isSelected ? styles.cardSelected : styles.cardUnselected]}
      accessibilityRole="radio"
      accessibilityState={{ selected: isSelected }}
    >
      {/* Top Header Row with Icon, Tag and Radio Indicator */}
      <View style={styles.headerRow}>
        <View style={styles.roleIconWrap}>
          {isDriver ? (
            <DriverTruckIcon size={26} color="#BAFF42" />
          ) : (
            <HelperUsersIcon size={26} color="#BAFF42" />
          )}
        </View>

        <View style={styles.tagWrap}>
          <Text style={styles.tagText}>{tag}</Text>
        </View>

        <View style={[styles.radioCircle, isSelected && styles.radioCircleSelected]}>
          {isSelected && <CheckmarkIcon size={12} color="#080B0B" />}
        </View>
      </View>

      {/* Role Title */}
      <Text style={styles.title}>{title}</Text>

      {/* Description */}
      <Text style={styles.description}>{description}</Text>

      {/* Feature Chips */}
      <View style={styles.chipsRow}>
        {chips.map((chip) => (
          <View key={chip} style={styles.chip}>
            <Text style={styles.chipText}>{chip}</Text>
          </View>
        ))}
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: radius["2xl"],
    padding: spacing[4],
    marginBottom: spacing[3],
  },
  cardSelected: {
    backgroundColor: "#222827",
    borderWidth: 2,
    borderColor: "#BAFF42",
  },
  cardUnselected: {
    backgroundColor: "#151A19",
    borderWidth: 1,
    borderColor: "#35403B",
  },
  headerRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: spacing[3],
  },
  roleIconWrap: {
    width: 44,
    height: 44,
    borderRadius: radius.md,
    backgroundColor: "#1E2523",
    alignItems: "center",
    justifyContent: "center",
  },
  tagWrap: {
    backgroundColor: "#1A221E",
    paddingHorizontal: spacing[2],
    paddingVertical: 2,
    borderRadius: radius.sm,
    borderWidth: 1,
    borderColor: "#2B3532",
  },
  tagText: {
    fontFamily: "Inter_600SemiBold",
    fontSize: 9,
    color: "#BAFF42",
    letterSpacing: 0.5,
  },
  radioCircle: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 1.5,
    borderColor: "#687771",
    alignItems: "center",
    justifyContent: "center",
  },
  radioCircleSelected: {
    backgroundColor: "#BAFF42",
    borderColor: "#BAFF42",
  },
  title: {
    fontFamily: "Inter_700Bold",
    fontSize: 18,
    color: "#F6F8F6",
    marginBottom: spacing[1],
  },
  description: {
    fontFamily: "Inter_400Regular",
    fontSize: 13,
    lineHeight: 18,
    color: "#ADB8B0",
    marginBottom: spacing[3],
  },
  chipsRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: spacing[2],
  },
  chip: {
    backgroundColor: "#1E2523",
    paddingHorizontal: spacing[2.5],
    paddingVertical: spacing[1],
    borderRadius: radius.md,
    borderWidth: 1,
    borderColor: "#2B3532",
  },
  chipText: {
    fontFamily: "Inter_500Medium",
    fontSize: 11,
    color: "#F6F8F6",
  },
});
