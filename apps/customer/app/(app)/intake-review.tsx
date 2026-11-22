import { colors } from "@haulix/design-tokens";
import { getCurrentLocale, useTranslation } from "@haulix/i18n";
import { HaulixSafeArea } from "@haulix/ui";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useCallback, useEffect, useMemo, useState } from "react";
import {
  Image,
  type ImageSourcePropType,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import {
  C18AlertTriangleIcon,
  C18CheckIcon,
  C18ChevronRightIcon,
  C18JunkIcon,
} from "../../src/components/discovery/C18BatchIcons";
import { FlowHeaderBack } from "../../src/components/navigation/FlowHeaderBack";
import {
  getC10DemoProfile,
  loadProfileEdits,
  subscribeToProfileEdits,
} from "../../src/fixtures/c10DemoProfile";
import {
  type C19DeclaredItem,
  getDraftInventory,
  subscribeToDraftInventory,
} from "../../src/fixtures/c19ItemInventory";
import {
  type C21MediaAttachment,
  getIntakeDraftState,
  saveIntakeDraft,
  subscribeToIntakeDraft,
} from "../../src/fixtures/c21IntakeReview";

const SOFA_IMG: ImageSourcePropType = require("../../assets/images/intake/c18j-sofa.png");
const MATTRESS_IMG: ImageSourcePropType = require("../../assets/images/intake/c18j-mattresses.png");
const TABLE_IMG: ImageSourcePropType = require("../../assets/images/intake/c18j-table.png");
const BOXES_IMG: ImageSourcePropType = require("../../assets/images/intake/c19p-boxes.png");

const IMAGE_MAP: Record<string, ImageSourcePropType> = {
  sofa: SOFA_IMG,
  mattresses: MATTRESS_IMG,
  table: TABLE_IMG,
  boxes: BOXES_IMG,
};

function useCustomerProfile(locale: "en" | "es") {
  const [profile, setProfile] = useState(() => getC10DemoProfile(locale));
  useEffect(() => {
    loadProfileEdits().then(() => setProfile(getC10DemoProfile(locale)));
    return subscribeToProfileEdits(() => setProfile(getC10DemoProfile(locale)));
  }, [locale]);
  return { profile };
}

export default function IntakeReviewScreen() {
  const { t } = useTranslation();
  const currentLocale = getCurrentLocale() as "en" | "es";
  const router = useRouter();
  const params = useLocalSearchParams<{
    pickupAddress?: string;
    dropoffAddress?: string;
    selectedServiceId?: string;
  }>();

  const isEs = currentLocale === "es";
  const { profile } = useCustomerProfile(currentLocale);
  const [inventory, setInventory] = useState(getDraftInventory());
  const [draftState, setDraftState] = useState(getIntakeDraftState());

  useEffect(() => {
    const unsubInv = subscribeToDraftInventory((inv) => setInventory(inv));
    const unsubDraft = subscribeToIntakeDraft((ds) => setDraftState(ds));
    return () => {
      unsubInv();
      unsubDraft();
    };
  }, []);

  const bookingId = draftState.activeBookingId || "HX-DEMO-1027";
  const customerName = profile?.name || (isEs ? "Bryan Lopez" : "Sarah Mitchell");
  const contactInfo = `${customerName} · +1 602-555-0142`;
  const pickupAddress =
    params.pickupAddress ||
    (isEs ? "1234 E Example Lane, Phoenix, AZ 85014" : "1234 E Example Lane, Phoenix, AZ 85014");

  const isDraftComplete = useMemo(() => {
    return (
      !draftState.hasUnknownWeightOrAccess &&
      !draftState.hasRestrictedItem &&
      draftState.bothSafetyAcknowledged &&
      inventory.items.length > 0
    );
  }, [
    draftState.hasUnknownWeightOrAccess,
    draftState.hasRestrictedItem,
    draftState.bothSafetyAcknowledged,
    inventory.items.length,
  ]);

  const handleConfirmIntake = useCallback(() => {
    if (!isDraftComplete) {
      router.push("/intake-review-blocked");
      return;
    }
    saveIntakeDraft();
    router.push("/intake-draft-saved");
  }, [isDraftComplete, router]);

  const handleEditItems = useCallback(() => {
    router.push("/item-inventory");
  }, [router]);

  const handleEditAccess = useCallback(() => {
    router.push("/access-details");
  }, [router]);

  const handleChangePickup = useCallback(() => {
    router.push("/pickup-address");
  }, [router]);

  const handleCorrectionExample = useCallback(() => {
    router.push("/intake-review-blocked");
  }, [router]);

  const handleBack = useCallback(() => {
    if (router.canGoBack()) {
      router.back();
    } else {
      router.push("/access-details");
    }
  }, [router]);

  return (
    <HaulixSafeArea>
      <View style={styles.container}>
        <FlowHeaderBack onBack={handleBack} backA11y={t("c21.backA11y")} testID="c21-header-back" />

        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
          testID="c21-scroll-container"
        >
          {/* Header Title Section */}
          <View style={styles.headerSection}>
            <Text style={styles.mainTitle}>{t("c21.title")}</Text>
            <Text style={styles.subtitle}>{t("c21.subtitle", { name: customerName })}</Text>
          </View>

          {/* A. Selected Booking Card */}
          <View style={styles.card} testID="c21-selected-booking-card">
            <View style={styles.cardHeaderRow}>
              <Text style={styles.cardTitle}>{t("c21.sectionSelectedTitle")}</Text>
              <View style={styles.serviceBadge}>
                <C18JunkIcon size={14} color={colors.brand} />
                <Text style={styles.serviceBadgeText}>JUNK</Text>
              </View>
            </View>

            <View style={styles.selectedBookingInner}>
              <Text style={styles.bookingIdTitle}>
                {bookingId} · {isEs ? "Retiro de objetos" : "Junk Removal"}
              </Text>
              <Text style={styles.bookingCustomerMeta}>
                {t("c21.selectedCustomerPrefix")}
                {customerName}
              </Text>
              <Text style={styles.bookingStatusMeta}>{t("c21.selectedStatus")}</Text>
            </View>
          </View>

          {/* B. Pickup and Contact Card */}
          <View style={styles.card} testID="c21-pickup-contact-card">
            <Text style={styles.cardTitle}>{t("c21.sectionPickupTitle")}</Text>

            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>{t("c21.labelAddress")}</Text>
              <Text style={styles.infoValue}>{pickupAddress}</Text>
            </View>
            <View style={styles.divider} />

            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>{t("c21.labelContact")}</Text>
              <Text style={styles.infoValue}>{contactInfo}</Text>
            </View>
            <View style={styles.divider} />

            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>{t("c21.labelPickupAccess")}</Text>
              <Text style={styles.infoValue}>{t("c21.defaultPickupAccess")}</Text>
            </View>
            <View style={styles.divider} />

            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>{t("c21.labelDropoff")}</Text>
              <Text style={styles.infoValue}>{t("c21.defaultDropoff")}</Text>
            </View>
          </View>

          {/* C. Customer-confirmed Item Summary Card (3 Original Photos) */}
          <View style={styles.card} testID="c21-item-summary-card">
            <Text style={styles.cardTitle}>{t("c21.sectionItemsTitle")}</Text>

            {inventory.items.map((item: C19DeclaredItem, idx: number) => {
              const itemTitle = isEs ? item.nameEs : item.name;
              const itemMeta = isEs
                ? `${item.countDimensionsEs} · ${item.weightEs}`
                : `${item.countDimensions} · ${item.weight}`;
              const imgSource = IMAGE_MAP[item.imageKey] || SOFA_IMG;

              return (
                <View key={item.id}>
                  {idx > 0 && <View style={styles.divider} />}
                  <View style={styles.itemSummaryRow} testID={`c21-item-${item.id}`}>
                    <Image
                      source={imgSource}
                      style={styles.itemThumb}
                      resizeMode="cover"
                      accessibilityLabel={itemTitle}
                      testID={`c21-thumb-${item.id}`}
                    />
                    <View style={styles.itemSummaryDetails}>
                      <Text style={styles.itemSummaryTitle}>{itemTitle}</Text>
                      <Text style={styles.itemSummaryMeta}>{itemMeta}</Text>
                    </View>
                  </View>
                </View>
              );
            })}
          </View>

          {/* D. Evidence Attached Card (4 Original Photos) */}
          <View style={styles.card} testID="c21-evidence-attached-card">
            <Text style={styles.cardTitle}>{t("c21.sectionEvidenceTitle")}</Text>

            {draftState.mediaAttachments.map((media: C21MediaAttachment, idx: number) => {
              const mediaTitle = t(`c21.${media.nameKey}`);
              const isAttached = media.status === "attached";
              const imgSource = IMAGE_MAP[media.imageKey] || BOXES_IMG;

              return (
                <View key={media.id}>
                  {idx > 0 && <View style={styles.divider} />}
                  <View style={styles.evidenceRow} testID={`c21-evidence-${media.id}`}>
                    <Image
                      source={imgSource}
                      style={styles.evidenceThumb}
                      resizeMode="cover"
                      accessibilityLabel={mediaTitle}
                      testID={`c21-evidence-thumb-${media.id}`}
                    />
                    <View style={styles.evidenceDetails}>
                      <Text style={styles.evidenceTitle}>{mediaTitle}</Text>
                      <View style={styles.evidenceTagRow}>
                        {isAttached ? (
                          <>
                            <C18CheckIcon size={13} color={colors.brand} />
                            <Text style={styles.evidenceTagAttached}>
                              {t("c21.mediaAttachedTag")}
                            </Text>
                          </>
                        ) : (
                          <>
                            <C18AlertTriangleIcon size={13} color="#F36D6D" />
                            <Text style={styles.evidenceTagFailed}>{t("c21.mediaFailedTag")}</Text>
                          </>
                        )}
                      </View>
                    </View>
                  </View>
                </View>
              );
            })}
          </View>

          {/* E. Safety & Scope Card */}
          <View style={styles.card} testID="c21-safety-scope-card">
            <Text style={styles.cardTitle}>{t("c21.sectionSafetyTitle")}</Text>
            <View style={styles.bulletRow}>
              <View style={styles.bulletDot} />
              <Text style={styles.bulletText}>{t("c21.safetyBullet1")}</Text>
            </View>
            <View style={styles.bulletRow}>
              <View style={styles.bulletDot} />
              <Text style={styles.bulletText}>{t("c21.safetyBullet2")}</Text>
            </View>
            <View style={styles.bulletRow}>
              <View style={styles.bulletDot} />
              <Text style={styles.bulletText}>{t("c21.safetyBullet3")}</Text>
            </View>
            <View style={styles.bulletRow}>
              <View style={styles.bulletDot} />
              <Text style={styles.bulletText}>{t("c21.safetyBullet4")}</Text>
            </View>
          </View>

          {/* F. Ready for AI-assisted Review Card */}
          <View style={styles.card} testID="c21-ai-ready-card">
            <View style={styles.cardHeaderRow}>
              <Text style={styles.cardTitle}>{t("c21.sectionReadyTitle")}</Text>
              <View
                style={[styles.readyStatusBadge, !isDraftComplete && styles.readyStatusBadgeAction]}
              >
                <Text
                  style={[styles.readyStatusText, !isDraftComplete && styles.readyStatusTextAction]}
                >
                  {isDraftComplete ? t("c21.readyBadgeCompleted") : t("c21.readyBadgeAction")}
                </Text>
              </View>
            </View>
            <Text style={styles.readyMessage}>{t("c21.readyMessage")}</Text>
            <Text style={styles.readyNotice}>{t("c21.readyNotice")}</Text>
          </View>

          {/* Action CTAs Section */}
          <View style={styles.actionsSection}>
            <Pressable
              style={styles.primaryButton}
              onPress={handleConfirmIntake}
              accessibilityRole="button"
              accessibilityLabel={t("c21.primaryCta")}
              testID="c21-primary-cta"
            >
              <Text style={styles.primaryButtonText}>{t("c21.primaryCta")}</Text>
            </Pressable>

            {/* Additional helper routes */}
            <Pressable
              style={styles.secondaryLinkRow}
              onPress={handleEditItems}
              testID="c21-edit-items-cta"
            >
              <Text style={styles.secondaryLinkText}>{t("c21.editItemsCta")}</Text>
              <C18ChevronRightIcon size={14} color="#818C87" />
            </Pressable>

            <Pressable
              style={styles.secondaryLinkRow}
              onPress={handleEditAccess}
              testID="c21-edit-access-cta"
            >
              <Text style={styles.secondaryLinkText}>{t("c21.editAccessCta")}</Text>
              <C18ChevronRightIcon size={14} color="#818C87" />
            </Pressable>

            <Pressable
              style={styles.secondaryLinkRow}
              onPress={handleChangePickup}
              testID="c21-change-pickup-cta"
            >
              <Text style={styles.secondaryLinkText}>{t("c21.changePickupCta")}</Text>
              <C18ChevronRightIcon size={14} color="#818C87" />
            </Pressable>

            <Pressable
              style={styles.secondaryLinkRow}
              onPress={handleCorrectionExample}
              testID="c21-correction-example-cta"
            >
              <Text style={styles.secondaryLinkText}>{t("c21.correctionCta")}</Text>
              <C18ChevronRightIcon size={14} color="#818C87" />
            </Pressable>
          </View>

          {/* Footer Section */}
          <View style={styles.footerSection}>
            <Text style={styles.footerDemo}>{t("c21.footerDemo")}</Text>
            <Text style={styles.footerSrs}>{t("c21.footerSrs")}</Text>
          </View>
        </ScrollView>
      </View>
    </HaulixSafeArea>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0B0E0D",
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 40,
  },
  headerSection: {
    marginBottom: 20,
  },
  mainTitle: {
    fontSize: 24,
    fontWeight: "700",
    color: "#F5F7F6",
    letterSpacing: -0.5,
    marginBottom: 6,
  },
  subtitle: {
    fontSize: 14,
    color: "#C2C9C6",
    lineHeight: 20,
  },
  card: {
    backgroundColor: "#151A19",
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#242C2A",
    padding: 18,
    marginBottom: 16,
  },
  cardHeaderRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  cardTitle: {
    fontSize: 15,
    fontWeight: "600",
    color: "#F5F7F6",
    marginBottom: 12,
  },
  serviceBadge: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    backgroundColor: "rgba(186, 255, 66, 0.12)",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  serviceBadgeText: {
    fontSize: 10,
    fontWeight: "700",
    color: colors.brand,
    letterSpacing: 0.5,
  },
  selectedBookingInner: {
    backgroundColor: "#1A2220",
    borderRadius: 12,
    padding: 14,
    borderWidth: 1,
    borderColor: "#2B3633",
  },
  bookingIdTitle: {
    fontSize: 15,
    fontWeight: "700",
    color: "#F5F7F6",
    marginBottom: 4,
  },
  bookingCustomerMeta: {
    fontSize: 13,
    color: "#C2C9C6",
    marginBottom: 2,
  },
  bookingStatusMeta: {
    fontSize: 12,
    color: "#818C87",
  },
  infoRow: {
    paddingVertical: 4,
  },
  infoLabel: {
    fontSize: 12,
    color: "#818C87",
    marginBottom: 2,
  },
  infoValue: {
    fontSize: 14,
    color: "#F5F7F6",
    fontWeight: "500",
  },
  divider: {
    height: 1,
    backgroundColor: "#242C2A",
    marginVertical: 10,
  },
  itemSummaryRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  itemThumb: {
    width: 86,
    height: 68,
    borderRadius: 8,
    backgroundColor: "#1A2220",
    marginRight: 14,
  },
  itemSummaryDetails: {
    flex: 1,
  },
  itemSummaryTitle: {
    fontSize: 14,
    fontWeight: "600",
    color: "#F5F7F6",
    marginBottom: 4,
  },
  itemSummaryMeta: {
    fontSize: 12,
    color: "#C2C9C6",
    lineHeight: 16,
  },
  evidenceRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  evidenceThumb: {
    width: 110,
    height: 81,
    borderRadius: 8,
    backgroundColor: "#1A2220",
    marginRight: 14,
  },
  evidenceDetails: {
    flex: 1,
  },
  evidenceTitle: {
    fontSize: 14,
    fontWeight: "600",
    color: "#F5F7F6",
    marginBottom: 6,
  },
  evidenceTagRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
  },
  evidenceTagAttached: {
    fontSize: 11,
    color: colors.brand,
    fontWeight: "500",
  },
  evidenceTagFailed: {
    fontSize: 11,
    color: "#F36D6D",
    fontWeight: "500",
  },
  bulletRow: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginBottom: 8,
  },
  bulletDot: {
    width: 5,
    height: 5,
    borderRadius: 2.5,
    backgroundColor: colors.brand,
    marginTop: 7,
    marginRight: 10,
  },
  bulletText: {
    flex: 1,
    fontSize: 13,
    color: "#C2C9C6",
    lineHeight: 18,
  },
  readyStatusBadge: {
    backgroundColor: "rgba(186, 255, 66, 0.15)",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  readyStatusBadgeAction: {
    backgroundColor: "rgba(243, 109, 109, 0.15)",
  },
  readyStatusText: {
    fontSize: 11,
    fontWeight: "700",
    color: colors.brand,
  },
  readyStatusTextAction: {
    color: "#F36D6D",
  },
  readyMessage: {
    fontSize: 13,
    color: "#F5F7F6",
    lineHeight: 18,
    marginBottom: 6,
  },
  readyNotice: {
    fontSize: 12,
    color: "#818C87",
    lineHeight: 16,
  },
  actionsSection: {
    marginTop: 10,
    marginBottom: 20,
  },
  primaryButton: {
    backgroundColor: colors.brand,
    paddingVertical: 16,
    borderRadius: 14,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 16,
  },
  primaryButtonText: {
    fontSize: 15,
    fontWeight: "700",
    color: "#0B0E0D",
    letterSpacing: -0.2,
  },
  secondaryLinkRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#151A19",
    borderWidth: 1,
    borderColor: "#242C2A",
    borderRadius: 12,
    paddingVertical: 14,
    paddingHorizontal: 16,
    marginBottom: 10,
  },
  secondaryLinkText: {
    fontSize: 13,
    fontWeight: "500",
    color: "#C2C9C6",
  },
  footerSection: {
    alignItems: "center",
    marginTop: 10,
  },
  footerDemo: {
    fontSize: 11,
    color: "#818C87",
    fontWeight: "500",
    textAlign: "center",
    marginBottom: 4,
  },
  footerSrs: {
    fontSize: 10,
    color: "#5A6661",
    textAlign: "center",
  },
});
