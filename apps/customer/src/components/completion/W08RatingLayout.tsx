/**
 * HAULIX Customer Mobile App — Phase 03.64
 * Shared Layout and Components for W08 Rating Lifecycle
 * Canonical States: RATING, RATING_LOCKED, RATING_1..5
 */

import { colors } from "@haulix/design-tokens";
import { useTranslation } from "@haulix/i18n";
import { HaulixSafeArea } from "@haulix/ui";
import { useState } from "react";
import {
  Modal,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import {
  W08BookingCard,
  W08Header,
  W08PrototypeDisclaimer,
  W08StatusBadge,
} from "./W08CompletionCard";

interface StarSelectorProps {
  selectedRating: number;
  isLocked: boolean;
  onSelectRating?: (rating: number) => void;
  testID?: string;
}

function StarSelector({
  selectedRating,
  isLocked,
  onSelectRating,
  testID = "w08-star-selector",
}: StarSelectorProps) {
  const { t } = useTranslation();
  const stars = [1, 2, 3, 4, 5];

  return (
    <View style={styles.starRow} testID={testID}>
      {stars.map((star) => {
        const isSelected = star <= selectedRating && !isLocked;
        const isHighestSelected = star === selectedRating && !isLocked;

        let boxBg = "#151a19";
        let boxBorder = "#35403b";
        let starColor = "#adb7b1";

        if (isSelected) {
          boxBg = "#222827";
          boxBorder = isHighestSelected ? colors.brand : "#35403b";
          starColor = colors.brand;
        }

        const a11yKey = `w08Rating.starA11y${star}` as
          | "w08Rating.starA11y1"
          | "w08Rating.starA11y2"
          | "w08Rating.starA11y3"
          | "w08Rating.starA11y4"
          | "w08Rating.starA11y5";

        return (
          <Pressable
            key={star}
            accessibilityLabel={t(a11yKey)}
            accessibilityRole="button"
            accessibilityState={{ disabled: isLocked, selected: isSelected }}
            disabled={isLocked}
            onPress={() => onSelectRating?.(star)}
            style={[
              styles.starBox,
              {
                backgroundColor: boxBg,
                borderColor: boxBorder,
              },
            ]}
            testID={`w08-star-${star}`}
          >
            <Text style={[styles.starGlyph, { color: starColor }]}>★</Text>
          </Pressable>
        );
      })}
    </View>
  );
}

interface CommentInputProps {
  label: string;
  placeholder: string;
  value: string;
  onChangeText: (text: string) => void;
  disabled?: boolean;
}

function CommentInput({
  label,
  placeholder,
  value,
  onChangeText,
  disabled = false,
}: CommentInputProps) {
  return (
    <View style={styles.commentContainer}>
      <Text style={styles.commentLabel}>{label}</Text>
      <TextInput
        editable={!disabled}
        multiline
        numberOfLines={2}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor="#adb7b1"
        style={[styles.commentTextInput, disabled && styles.disabledInput]}
        testID="w08-rating-comment-input"
        value={value}
      />
    </View>
  );
}

interface EligibilityBoxProps {
  label: string;
  text: string;
}

function EligibilityBox({ label, text }: EligibilityBoxProps) {
  return (
    <View style={styles.eligibilityContainer}>
      <Text style={styles.eligibilityLabel}>{label}</Text>
      <Text style={styles.eligibilityText}>{text}</Text>
    </View>
  );
}

interface RatingBoundaryModalProps {
  visible: boolean;
  title: string;
  body: string;
  closeText: string;
  onClose: () => void;
}

function RatingBoundaryModal({
  visible,
  title,
  body,
  closeText,
  onClose,
}: RatingBoundaryModalProps) {
  return (
    <Modal animationType="fade" onRequestClose={onClose} transparent visible={visible}>
      <View style={styles.modalOverlay}>
        <View style={styles.modalCard} testID="w08-rating-boundary-modal">
          <Text style={styles.modalTitle}>{title}</Text>
          <Text style={styles.modalBody}>{body}</Text>
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={onClose}
            style={styles.modalCloseButton}
            testID="w08-modal-acknowledge-button"
          >
            <Text style={styles.modalCloseText}>{closeText}</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}

export interface W08RatingLayoutProps {
  headerBadge?: string;
  onBack: () => void;
  backA11y?: string;
  heroTitle: string;
  heroSubtitle: string;
  selectedRating?: number;
  isLocked?: boolean;
  onSelectRating?: (rating: number) => void;
  cardTitle: string;
  cardQuestion: string;
  commentLabel: string;
  commentPlaceholder: string;
  eligibilityLabel: string;
  eligibilityText: string;
  primaryButtonLabel: string;
  onPrimaryPress: () => void;
  secondaryButtonLabel?: string;
  onSecondaryPress?: () => void;
  tertiaryButtonLabel?: string;
  onTertiaryPress?: () => void;
  disclaimerText?: string;
  showBoundaryModal?: boolean;
  modalTitle?: string;
  modalBody?: string;
  modalCloseText?: string;
  onCloseBoundaryModal?: () => void;
  testID?: string;
}

export function W08RatingLayout({
  headerBadge,
  onBack,
  backA11y = "Back",
  heroTitle,
  heroSubtitle,
  selectedRating = 0,
  isLocked = false,
  onSelectRating,
  cardTitle,
  cardQuestion,
  commentLabel,
  commentPlaceholder,
  eligibilityLabel,
  eligibilityText,
  primaryButtonLabel,
  onPrimaryPress,
  secondaryButtonLabel,
  onSecondaryPress,
  tertiaryButtonLabel,
  onTertiaryPress,
  disclaimerText,
  showBoundaryModal = false,
  modalTitle = "Review Finalization",
  modalBody = "Review submission, failure handling, and ratings review workflows will be finalized in Phase 03.65.",
  modalCloseText = "Acknowledge",
  onCloseBoundaryModal,
  testID = "w08-rating-screen",
}: W08RatingLayoutProps) {
  const [comment, setComment] = useState("");

  return (
    <HaulixSafeArea>
      <View style={styles.container} testID={testID}>
        <W08Header backA11y={backA11y} onBack={onBack} />

        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
          style={styles.scrollView}
        >
          <View style={styles.heroSection}>
            <Text style={styles.heroTitle}>{heroTitle}</Text>
            <Text style={styles.heroSubtitle}>{heroSubtitle}</Text>
          </View>

          {headerBadge ? <W08StatusBadge label={headerBadge} /> : null}

          <W08BookingCard />

          <View style={styles.ratingCard} testID="w08-rating-card">
            <Text style={styles.ratingCardTitle}>{cardTitle}</Text>
            <Text style={styles.ratingCardQuestion}>{cardQuestion}</Text>

            <StarSelector
              isLocked={isLocked}
              onSelectRating={onSelectRating}
              selectedRating={selectedRating}
            />

            <CommentInput
              disabled={isLocked}
              label={commentLabel}
              onChangeText={setComment}
              placeholder={commentPlaceholder}
              value={comment}
            />

            <EligibilityBox label={eligibilityLabel} text={eligibilityText} />
          </View>

          <View style={styles.actionsContainer}>
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={onPrimaryPress}
              style={styles.primaryButton}
              testID="w08-primary-action-button"
            >
              <Text style={styles.primaryButtonText}>{primaryButtonLabel}</Text>
            </TouchableOpacity>

            {secondaryButtonLabel && onSecondaryPress ? (
              <TouchableOpacity
                activeOpacity={0.8}
                onPress={onSecondaryPress}
                style={styles.secondaryButton}
                testID="w08-secondary-action-button"
              >
                <Text style={styles.secondaryButtonText}>{secondaryButtonLabel}</Text>
              </TouchableOpacity>
            ) : null}

            {tertiaryButtonLabel && onTertiaryPress ? (
              <TouchableOpacity
                activeOpacity={0.8}
                onPress={onTertiaryPress}
                style={styles.tertiaryButton}
                testID="w08-tertiary-action-button"
              >
                <Text style={styles.tertiaryButtonText}>{tertiaryButtonLabel}</Text>
              </TouchableOpacity>
            ) : null}
          </View>

          <W08PrototypeDisclaimer disclaimer={disclaimerText} />
        </ScrollView>

        <RatingBoundaryModal
          body={modalBody}
          closeText={modalCloseText}
          onClose={onCloseBoundaryModal || (() => {})}
          title={modalTitle}
          visible={showBoundaryModal}
        />
      </View>
    </HaulixSafeArea>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#080b0b",
  },
  scrollView: {
    flex: 1,
    paddingHorizontal: 16,
  },
  scrollContent: {
    paddingBottom: 40,
    gap: 14,
  },
  heroSection: {
    marginTop: 4,
    gap: 4,
  },
  heroTitle: {
    fontSize: 22,
    fontWeight: "700",
    color: "#f5f9f7",
    lineHeight: 28,
  },
  heroSubtitle: {
    fontSize: 12,
    color: "#aabbb1",
    lineHeight: 16,
  },
  ratingCard: {
    backgroundColor: "#151a19",
    borderWidth: 1,
    borderColor: "#35403b",
    borderRadius: 19,
    padding: 15,
    gap: 13,
  },
  ratingCardTitle: {
    fontSize: 17,
    fontWeight: "700",
    color: "#f6f8f6",
  },
  ratingCardQuestion: {
    fontSize: 13,
    fontWeight: "600",
    color: "#f6f8f6",
  },
  starRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    height: 52,
  },
  starBox: {
    width: 60,
    height: 52,
    borderRadius: 11,
    borderWidth: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  starGlyph: {
    fontSize: 22,
    fontWeight: "700",
    lineHeight: 26,
  },
  commentContainer: {
    backgroundColor: "#222827",
    borderWidth: 1,
    borderColor: "#35403b",
    borderRadius: 12,
    padding: 11,
    gap: 6,
  },
  commentLabel: {
    fontSize: 12,
    fontWeight: "600",
    color: "#f6f8f6",
  },
  commentTextInput: {
    fontSize: 12,
    color: "#f6f8f6",
    minHeight: 40,
    textAlignVertical: "top",
    padding: 0,
  },
  disabledInput: {
    color: "#adb7b1",
  },
  eligibilityContainer: {
    gap: 3,
  },
  eligibilityLabel: {
    fontSize: 10,
    fontWeight: "600",
    color: colors.brand,
    textTransform: "uppercase",
  },
  eligibilityText: {
    fontSize: 11,
    color: "#f6f8f6",
    lineHeight: 15,
  },
  actionsContainer: {
    marginTop: 6,
    gap: 10,
  },
  primaryButton: {
    backgroundColor: colors.brand,
    height: 54,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 20,
  },
  primaryButtonText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#080b0b",
  },
  secondaryButton: {
    backgroundColor: "#151a19",
    borderWidth: 1,
    borderColor: "#35403b",
    height: 54,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 20,
  },
  secondaryButtonText: {
    fontSize: 14,
    fontWeight: "600",
    color: colors.brand,
  },
  tertiaryButton: {
    height: 36,
    justifyContent: "center",
    paddingHorizontal: 4,
  },
  tertiaryButtonText: {
    fontSize: 11,
    fontWeight: "600",
    color: colors.brand,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.75)",
    justifyContent: "center",
    alignItems: "center",
    padding: 24,
  },
  modalCard: {
    backgroundColor: "#151a19",
    borderRadius: 16,
    padding: 20,
    width: "100%",
    maxWidth: 360,
    borderWidth: 1,
    borderColor: "#35403b",
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#ffffff",
    marginBottom: 8,
  },
  modalBody: {
    fontSize: 14,
    color: "#adb7b1",
    lineHeight: 20,
    marginBottom: 20,
  },
  modalCloseButton: {
    backgroundColor: colors.brand,
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: "center",
  },
  modalCloseText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#080b0b",
  },
});
