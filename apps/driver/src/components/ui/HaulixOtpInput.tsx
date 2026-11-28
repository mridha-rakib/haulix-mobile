import { radius, spacing } from "@haulix/design-tokens";
import type React from "react";
import { useEffect, useRef, useState } from "react";
import { Pressable, StyleSheet, Text, TextInput, View } from "react-native";

type TextInputInstance = React.ComponentRef<typeof TextInput>;

export interface HaulixOtpInputProps {
  value: string;
  onChange: (otp: string) => void;
  length?: number;
  autoFocus?: boolean;
  error?: string;
}

const OTP_SLOTS = ["slot_1", "slot_2", "slot_3", "slot_4", "slot_5", "slot_6"];

export function HaulixOtpInput({
  value,
  onChange,
  length = 6,
  autoFocus = true,
  error,
}: HaulixOtpInputProps) {
  const hiddenInputRef = useRef<TextInputInstance>(null);
  const [isFocused, setIsFocused] = useState(false);

  useEffect(() => {
    if (autoFocus) {
      const timer = setTimeout(() => {
        hiddenInputRef.current?.focus();
      }, 200);
      return () => clearTimeout(timer);
    }
  }, [autoFocus]);

  const digits = value.split("");

  const handleContainerPress = () => {
    hiddenInputRef.current?.focus();
  };

  return (
    <View style={styles.outerContainer}>
      <Pressable onPress={handleContainerPress} style={styles.container}>
        <TextInput
          ref={hiddenInputRef}
          value={value}
          onChangeText={(text) => {
            const sanitized = text.replace(/[^0-9]/g, "").slice(0, length);
            onChange(sanitized);
          }}
          keyboardType="number-pad"
          maxLength={length}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          style={styles.hiddenInput}
          caretHidden
        />

        <View style={styles.boxesRow}>
          {Array.from({ length }).map((_, index) => {
            const digit = digits[index] || "";
            const isCurrent =
              isFocused &&
              (index === digits.length || (index === length - 1 && digits.length === length));

            const slotKey = OTP_SLOTS[index] ?? `slot_${index + 1}`;
            return (
              <View
                key={slotKey}
                style={[
                  styles.box,
                  digit ? styles.boxFilled : null,
                  isCurrent ? styles.boxActive : null,
                  error ? styles.boxError : null,
                ]}
              >
                <Text style={styles.digitText}>{digit}</Text>
              </View>
            );
          })}
        </View>
      </Pressable>

      {error ? <Text style={styles.errorText}>{error}</Text> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  outerContainer: {
    width: "100%",
  },
  container: {
    position: "relative",
    width: "100%",
  },
  hiddenInput: {
    position: "absolute",
    width: "100%",
    height: "100%",
    opacity: 0,
    zIndex: 1,
  },
  boxesRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: spacing[2],
  },
  box: {
    flex: 1,
    height: 56,
    borderRadius: radius.lg,
    backgroundColor: "#151A19",
    borderWidth: 1.5,
    borderColor: "#2B3532",
    alignItems: "center",
    justifyContent: "center",
  },
  boxFilled: {
    borderColor: "#415049",
    backgroundColor: "#1C2421",
  },
  boxActive: {
    borderColor: "#BAFF42",
    backgroundColor: "#202A26",
  },
  boxError: {
    borderColor: "#FF6B6B",
  },
  digitText: {
    fontFamily: "Inter_700Bold",
    fontSize: 22,
    color: "#F6F8F6",
  },
  errorText: {
    fontFamily: "Inter_400Regular",
    fontSize: 12,
    color: "#FF6B6B",
    marginTop: spacing[2],
    textAlign: "center",
  },
});
