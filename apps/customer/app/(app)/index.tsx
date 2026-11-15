import { colors, fontFamily, radius, spacing } from "@haulix/design-tokens";
import { useTranslation } from "@haulix/i18n";
import { HaulixSafeArea } from "@haulix/ui";
import { useRouter } from "expo-router";
import { useState } from "react";
import {
  Dimensions,
  Image,
  Keyboard,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import Svg, { Defs, LinearGradient, Rect, Stop } from "react-native-svg";
import { HeaderBellIcon } from "../../src/components/account/C10Icons";
import {
  HeaderLocationChevronIcon,
  HeaderLocationPinIcon,
  type IconProps,
  SavedHomeIcon,
  SearchIcon,
  ServiceApplianceIcon,
  ServiceAssemblyAddonIcon,
  ServiceCardChevronRight,
  ServiceFurnitureIcon,
  ServiceGarageIcon,
  ServiceJunkIcon,
  ServiceMattressIcon,
  ServiceMovingIcon,
  ServiceStoreIcon,
} from "../../src/components/home/C01Icons";
import { CustomerBottomNav } from "../../src/components/navigation/CustomerBottomNav";
import {
  C01_RECENT_JOB_DEMO,
  C01_SAVED_ADDRESS_DEMO,
  C01_SERVICE_CATEGORIES,
  type ServiceCategoryItem,
  type ServiceIconName,
} from "../../src/fixtures/c01HomeServices";

const SERVICE_ICONS: Record<ServiceIconName, React.FC<IconProps>> = {
  junk: ServiceJunkIcon,
  moving: ServiceMovingIcon,
  furniture: ServiceFurnitureIcon,
  appliance: ServiceApplianceIcon,
  mattress: ServiceMattressIcon,
  garage: ServiceGarageIcon,
  store: ServiceStoreIcon,
  assembly: ServiceAssemblyAddonIcon,
};

const heroTruckImage = require("../../assets/c01/original-images/c01_hero_truck_original.png");
const recentJobImage = require("../../assets/c01/original-images/c01_recent_job_original.png");

interface HeaderProps {
  onNotifications: () => void;
  onLocation: () => void;
  tagline: string;
  location: string;
}

function HomeHeader({ onNotifications, onLocation, tagline, location }: HeaderProps) {
  return (
    <View style={styles.headerContainer}>
      <View style={styles.headerTopRow}>
        <View style={styles.headerLeftSpacer} />
        <View style={styles.brandContainer}>
          <View style={styles.wordmarkRow}>
            <Text style={styles.wordmarkHaul}>HAUL</Text>
            <Text style={styles.wordmarkIx}>IX</Text>
            <Text style={styles.registeredMark}>®</Text>
          </View>
          <Text style={styles.taglineText}>{tagline}</Text>
        </View>
        <Pressable
          style={styles.headerCircleButton}
          onPress={onNotifications}
          accessibilityRole="button"
          accessibilityLabel="Notifications"
          hitSlop={8}
          testID="c01-header-bell"
        >
          <HeaderBellIcon size={20} color={colors.primaryText} />
          <View style={styles.notificationDot} />
        </Pressable>
      </View>
      <View style={styles.locationRow}>
        <Pressable
          style={styles.locationSelector}
          onPress={onLocation}
          accessibilityRole="button"
          accessibilityLabel={location}
          hitSlop={6}
          testID="c01-location-selector"
        >
          <HeaderLocationPinIcon width={16} height={20} />
          <Text style={styles.locationText}>{location}</Text>
          <HeaderLocationChevronIcon size={13} color="#DDECE3" />
        </Pressable>
      </View>
    </View>
  );
}

interface HeroProps {
  titleWhite: string;
  titleLime: string;
  subtitle: string;
}

function HeroBanner({ titleWhite, titleLime, subtitle }: HeroProps) {
  return (
    <View style={styles.heroCard} testID="c01-hero-card">
      <Image
        source={heroTruckImage}
        style={styles.heroImage}
        resizeMode="cover"
        accessible={true}
        accessibilityLabel="HAULIX Truck Hero Banner"
      />
      <Svg width="100%" height="100%" style={StyleSheet.absoluteFill} pointerEvents="none">
        <Defs>
          <LinearGradient id="heroGradient" x1="0" y1="0" x2="1" y2="0">
            <Stop offset="0" stopColor="#080B0B" stopOpacity="0.94" />
            <Stop offset="0.55" stopColor="#080B0B" stopOpacity="0.75" />
            <Stop offset="1" stopColor="#080B0B" stopOpacity="0.15" />
          </LinearGradient>
        </Defs>
        <Rect width="100%" height="100%" fill="url(#heroGradient)" />
      </Svg>
      <View style={styles.heroTextContainer}>
        <Text style={styles.heroTitleWhite}>{titleWhite}</Text>
        <Text style={styles.heroTitleLime}>{titleLime}</Text>
        <Text style={styles.heroSubtitle}>{subtitle}</Text>
      </View>
    </View>
  );
}

interface SearchBarOverlayProps {
  value: string;
  onChangeText: (text: string) => void;
  onClear: () => void;
  placeholder: string;
  clearLabel: string;
}

function SearchBarOverlay({
  value,
  onChangeText,
  onClear,
  placeholder,
  clearLabel,
}: SearchBarOverlayProps) {
  return (
    <View style={styles.searchContainer} testID="c01-search-bar">
      <View style={styles.searchBar}>
        <SearchIcon size={20} color="#080B0B" style={styles.searchIcon} />
        <TextInput
          style={styles.searchInput}
          placeholder={placeholder}
          placeholderTextColor="#6D7D73"
          value={value}
          onChangeText={onChangeText}
          autoCapitalize="none"
          autoCorrect={false}
          returnKeyType="search"
          onSubmitEditing={() => Keyboard.dismiss()}
          testID="c01-search-input"
        />
        {value.length > 0 ? (
          <Pressable
            onPress={onClear}
            hitSlop={8}
            accessibilityRole="button"
            accessibilityLabel={clearLabel}
            testID="c01-search-clear"
          >
            <View style={styles.clearButtonCircle}>
              <Text style={styles.clearButtonText}>✕</Text>
            </View>
          </Pressable>
        ) : (
          <View style={styles.searchChevron}>
            <ServiceCardChevronRight width={7} height={12} color="#080B0B" />
          </View>
        )}
      </View>
    </View>
  );
}

interface ServicesGridProps {
  services: ServiceCategoryItem[];
  cardWidth: number;
  onSelectService: (service: ServiceCategoryItem) => void;
  onClearSearch: () => void;
  emptyText: string;
  clearLabel: string;
}

function ServicesGrid({
  services,
  cardWidth,
  onSelectService,
  onClearSearch,
  emptyText,
  clearLabel,
}: ServicesGridProps) {
  const { t } = useTranslation();

  if (services.length === 0) {
    return (
      <View style={styles.servicesSection}>
        <View style={styles.emptySearchContainer} testID="c01-search-empty-state">
          <Text style={styles.emptySearchText}>{emptyText}</Text>
          <Pressable
            style={styles.emptyClearButton}
            onPress={onClearSearch}
            accessibilityRole="button"
          >
            <Text style={styles.emptyClearButtonText}>{clearLabel}</Text>
          </Pressable>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.servicesSection}>
      <View style={styles.servicesGrid}>
        {services.map((service) => {
          const Icon = SERVICE_ICONS[service.iconName];
          const label = t(service.i18nKey) || service.name;
          const isDisabled = service.isDisabled;

          return (
            <Pressable
              key={service.id}
              style={[
                styles.serviceCard,
                { width: cardWidth },
                isDisabled && styles.serviceCardDisabled,
              ]}
              onPress={() => onSelectService(service)}
              accessibilityRole="button"
              accessibilityLabel={label}
              accessibilityState={{ disabled: isDisabled }}
              testID={`c01-service-card-${service.id}`}
            >
              <View style={styles.serviceCardTop}>
                <Icon size={24} color={isDisabled ? "#6D7D73" : colors.brand} />
                <ServiceCardChevronRight
                  width={5}
                  height={9}
                  color={isDisabled ? "#28342E" : "#35403B"}
                />
              </View>
              <Text
                style={[styles.serviceCardTitle, isDisabled && styles.serviceCardTitleDisabled]}
                numberOfLines={2}
              >
                {label}
              </Text>
            </Pressable>
          );
        })}
      </View>
    </View>
  );
}

interface RecentJobsCardProps {
  onPress: () => void;
  title: string;
  addressLine1: string;
  addressLine2: string;
  status: string;
  date: string;
}

function RecentJobsCard({
  onPress,
  title,
  addressLine1,
  addressLine2,
  status,
  date,
}: RecentJobsCardProps) {
  return (
    <Pressable
      style={styles.recentJobCard}
      onPress={onPress}
      accessibilityRole="button"
      accessibilityLabel={`${title}, ${addressLine1}`}
      testID="c01-recent-job-card"
    >
      <Image
        source={recentJobImage}
        style={styles.recentJobThumbnail}
        resizeMode="cover"
        accessible={true}
        accessibilityLabel="Recent Job Photo"
      />
      <View style={styles.recentJobDetails}>
        <Text style={styles.recentJobTitle}>{title}</Text>
        <Text style={styles.recentJobAddress}>{addressLine1}</Text>
        <Text style={styles.recentJobAddress}>{addressLine2}</Text>
      </View>
      <View style={styles.recentJobMeta}>
        <View style={styles.completedBadge}>
          <Text style={styles.completedBadgeText}>{status}</Text>
        </View>
        <Text style={styles.recentJobDate}>{date}</Text>
      </View>
    </Pressable>
  );
}

interface SavedAddressCardProps {
  onPress: () => void;
  label: string;
  address: string;
}

function SavedAddressCard({ onPress, label, address }: SavedAddressCardProps) {
  return (
    <Pressable
      style={styles.savedAddressCard}
      onPress={onPress}
      accessibilityRole="button"
      accessibilityLabel={`${label}, ${address}`}
      testID="c01-saved-address-card"
    >
      <View style={styles.savedHomeIconBox}>
        <SavedHomeIcon size={22} color="#F6F8F6" />
      </View>
      <View style={styles.savedAddressDetails}>
        <Text style={styles.savedHomeLabel}>{label}</Text>
        <Text style={styles.savedHomeAddress} numberOfLines={1}>
          {address}
        </Text>
      </View>
      <View style={styles.savedAddressChevron}>
        <ServiceCardChevronRight width={7} height={12} color="#ADB7B1" />
      </View>
    </Pressable>
  );
}

function NoticeBanner({
  message,
  onDismiss,
  dismissLabel,
}: {
  message: string;
  onDismiss: () => void;
  dismissLabel: string;
}) {
  return (
    <View style={styles.noticeBox} testID="c01-notice-banner">
      <Text style={styles.noticeText}>{message}</Text>
      <Pressable
        onPress={onDismiss}
        hitSlop={8}
        accessibilityRole="button"
        accessibilityLabel={dismissLabel}
      >
        <Text style={styles.noticeDismiss}>{dismissLabel}</Text>
      </Pressable>
    </View>
  );
}

function SectionHeader({
  title,
  onSeeAll,
  seeAllLabel,
  testID,
}: {
  title: string;
  onSeeAll: () => void;
  seeAllLabel: string;
  testID: string;
}) {
  return (
    <View style={styles.sectionHeaderRow}>
      <Text style={styles.sectionTitle}>{title}</Text>
      <Pressable
        onPress={onSeeAll}
        accessibilityRole="button"
        accessibilityLabel={seeAllLabel}
        hitSlop={8}
        testID={testID}
      >
        <Text style={styles.seeAllText}>{seeAllLabel}</Text>
      </Pressable>
    </View>
  );
}

function BookServiceCTA({ onBook, label }: { onBook: () => void; label: string }) {
  return (
    <View style={styles.ctaContainer}>
      <Pressable
        style={styles.primaryButton}
        onPress={onBook}
        accessibilityRole="button"
        accessibilityLabel={label}
        testID="c01-book-service-btn"
      >
        <Text style={styles.primaryButtonText}>{label}</Text>
      </Pressable>
    </View>
  );
}

const normalizeSearch = (str: string) =>
  str
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase();

const matchService = (service: ServiceCategoryItem, query: string, localized: string) => {
  if (!query) return true;
  const cleanQuery = normalizeSearch(query);
  return (
    normalizeSearch(service.name).includes(cleanQuery) ||
    normalizeSearch(localized).includes(cleanQuery)
  );
};

const getServiceNotice = (service: ServiceCategoryItem, t: (k: string) => string): string => {
  const serviceName = t(service.i18nKey) || service.name;
  if (service.isDisabled) {
    return (
      t("home.noticeAssembly") ||
      t("home.assemblyAddonNotice") ||
      "Assembly Add-on is an optional paid extra and cannot be booked as a standalone service."
    );
  }
  const suffix =
    t("home.noticeBooking") ||
    t("home.bookServiceNotice") ||
    "Service Discovery & Booking (C15) is scheduled for an upcoming phase.";
  return `${serviceName}: ${suffix}`;
};

function HomeRecentJobsSection({
  onNotice,
  t,
}: {
  onNotice: (k: string, f: string) => void;
  t: (k: string) => string;
}) {
  const noticeText = t("home.noticeJobs") || "My Jobs (W07) is scheduled for an upcoming phase.";
  const completedLabel = t("home.completed")
    ? `✓ ${t("home.completed")}`
    : t("home.recentJobSampleStatus") || C01_RECENT_JOB_DEMO.status;

  return (
    <>
      <SectionHeader
        title={t("home.recentJobs") || t("home.recentJobsTitle") || "Recent Jobs"}
        onSeeAll={() => onNotice("home.noticeJobs", noticeText)}
        seeAllLabel={t("home.seeAll") || "See All ›"}
        testID="c01-recent-jobs-see-all"
      />
      <RecentJobsCard
        onPress={() => onNotice("home.noticeJobs", noticeText)}
        title={
          t("home.jobJunkRemoval") || t("home.serviceJunkRemoval") || C01_RECENT_JOB_DEMO.title
        }
        addressLine1={t("home.recentJobSampleAddress1") || C01_RECENT_JOB_DEMO.addressLine1}
        addressLine2={t("home.recentJobSampleAddress2") || C01_RECENT_JOB_DEMO.addressLine2}
        status={completedLabel}
        date={t("home.recentJobDate") || C01_RECENT_JOB_DEMO.date}
      />
    </>
  );
}

function HomeSavedAddressesSection({
  onNotice,
  t,
}: {
  onNotice: (k: string, f: string) => void;
  t: (k: string) => string;
}) {
  const noticeText =
    t("home.noticeAddresses") || "Saved Addresses (C11) is scheduled for an upcoming phase.";
  return (
    <>
      <SectionHeader
        title={t("home.savedAddresses") || t("home.savedAddressesTitle") || "Saved Addresses"}
        onSeeAll={() => onNotice("home.noticeAddresses", noticeText)}
        seeAllLabel={t("home.seeAll") || "See All ›"}
        testID="c01-saved-addresses-see-all"
      />
      <SavedAddressCard
        onPress={() => onNotice("home.noticeAddresses", noticeText)}
        label={
          t("home.savedAddressType") || t("home.savedHomeTitle") || C01_SAVED_ADDRESS_DEMO.label
        }
        address={t("home.savedHomeAddress") || C01_SAVED_ADDRESS_DEMO.address}
      />
    </>
  );
}

export default function HomeScreen() {
  const { t } = useTranslation();
  const router = useRouter();
  const screenWidth = Dimensions.get("window").width;

  const [searchQuery, setSearchQuery] = useState("");
  const [noticeMessage, setNoticeMessage] = useState<string | null>(null);

  const query = searchQuery.trim().toLowerCase();
  const filteredServices = C01_SERVICE_CATEGORIES.filter((service) => {
    const loc = t(service.i18nKey);
    return matchService(service, query, loc);
  });

  const notify = (key: string, fallback: string) => {
    setNoticeMessage(t(key) || fallback);
  };

  const cardWidth = Math.floor((screenWidth - 64) / 4);

  return (
    <HaulixSafeArea edges={["top", "left", "right"]}>
      <View style={styles.rootContainer} testID="c01-home-screen">
        <ScrollView
          style={styles.scroll}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          {/* 1. Global Home Header (Figma 563:3383) */}
          <HomeHeader
            onNotifications={() =>
              notify(
                "home.noticeNotifications",
                "Notifications (C13) is scheduled for an upcoming phase."
              )
            }
            onLocation={() =>
              notify("home.noticeLocation", "Only the Phoenix, Arizona demo service area is shown.")
            }
            tagline={t("home.brandTagline") || "We Haul It All."}
            location={t("home.location") || "Phoenix, Arizona"}
          />

          {/* Notice Banner (Transparent frontend disclosure) */}
          {noticeMessage && (
            <NoticeBanner
              message={noticeMessage}
              onDismiss={() => setNoticeMessage(null)}
              dismissLabel={t("common.dismiss") || "Dismiss"}
            />
          )}

          {/* 2. Hero Card (Figma 439:3531) */}
          <HeroBanner
            titleWhite={t("home.heroTitleOne") || t("home.heroTitleWhite") || "Get It Gone."}
            titleLime={t("home.heroTitleTwo") || t("home.heroTitleLime") || "The Easy Way."}
            subtitle={
              t("home.heroSubtitle") ||
              "On-demand hauling, junk removal,\nmoving and more — right at\nyour fingertips."
            }
          />

          {/* 3. Search Bar Overlay (Figma 439:3539 — 26px overlap) */}
          <SearchBarOverlay
            value={searchQuery}
            onChangeText={setSearchQuery}
            onClear={() => setSearchQuery("")}
            placeholder={t("home.searchPlaceholder") || "What do you need help with?"}
            clearLabel={t("home.searchClear") || "Clear search"}
          />

          {/* 4. 8 Service Cards Grid (Figma 439:3548 / 439:3585) */}
          <ServicesGrid
            services={filteredServices}
            cardWidth={cardWidth}
            onSelectService={(svc) => {
              if (svc.isDisabled) {
                setNoticeMessage(getServiceNotice(svc, t));
                return;
              }
              router.push({
                pathname: "/service-discovery",
                params: { service: svc.id },
              });
            }}
            onClearSearch={() => setSearchQuery("")}
            emptyText={
              t("home.searchNoResults") ||
              t("home.searchEmpty") ||
              `No services match "${searchQuery}".`
            }
            clearLabel={t("home.searchClear") || "Clear search"}
          />

          {/* 5. Primary Book a Service CTA (Figma 439:3617) */}
          <BookServiceCTA
            onBook={() => {
              router.push("/service-discovery");
            }}
            label={
              t("home.bookService") ||
              (t("home.bookAService") ? `${t("home.bookAService")} ›` : "Book a Service ›")
            }
          />

          {/* 6. Recent Jobs Section (Figma 439:3618) */}
          <HomeRecentJobsSection onNotice={notify} t={t} />

          {/* 7. Saved Addresses Section (Figma 439:3628) */}
          <HomeSavedAddressesSection onNotice={notify} t={t} />
        </ScrollView>

        {/* 8. Shared Sculpted Curved Bottom Navigation (Figma 965:9537) */}
        <CustomerBottomNav activeTab="home" onShowNotice={(msg) => setNoticeMessage(msg)} />
      </View>
    </HaulixSafeArea>
  );
}

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    backgroundColor: colors.background, // #080B0B
  },
  scroll: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 140, // Ensure content clears 80px + safeBottom curved navbar
  },

  // 1. Header (Figma 563:3383)
  headerContainer: {
    paddingHorizontal: 20,
    paddingTop: 8,
    paddingBottom: 16,
  },
  headerTopRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  headerLeftSpacer: {
    width: 42,
  },
  brandContainer: {
    alignItems: "center",
    justifyContent: "center",
  },
  wordmarkRow: {
    flexDirection: "row",
    alignItems: "baseline",
    justifyContent: "center",
  },
  wordmarkHaul: {
    fontFamily: fontFamily.bold,
    fontSize: 24,
    color: colors.primaryText, // #F6F8F6
    letterSpacing: 1.2,
  },
  wordmarkIx: {
    fontFamily: fontFamily.bold,
    fontSize: 24,
    color: colors.brand, // #BAFF42
    letterSpacing: 1.2,
  },
  registeredMark: {
    fontFamily: fontFamily.medium,
    fontSize: 10,
    color: colors.brand,
    marginLeft: 2,
    position: "relative",
    top: -10,
  },
  taglineText: {
    fontFamily: fontFamily.medium,
    fontSize: 12,
    color: colors.secondaryText, // #ADB7B1
    letterSpacing: 0.6,
    marginTop: 2,
  },
  headerCircleButton: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: colors.surface, // #151A19
    borderWidth: 1,
    borderColor: colors.elevated, // #222827
    alignItems: "center",
    justifyContent: "center",
  },
  notificationDot: {
    position: "absolute",
    top: 9,
    right: 10,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: colors.brand, // #BAFF42
  },

  // Location Selector Pill
  locationRow: {
    marginTop: 14,
    alignItems: "flex-start",
  },
  locationSelector: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.surface, // #151A19
    borderWidth: 1,
    borderColor: "#28342E",
    borderRadius: 24,
    paddingVertical: 10,
    paddingHorizontal: 14,
    gap: 8,
  },
  locationText: {
    fontFamily: fontFamily.medium,
    fontSize: 14,
    color: colors.primaryText,
  },

  // Notice Banner
  noticeBox: {
    backgroundColor: "#1C2422",
    borderWidth: 1,
    borderColor: colors.brand,
    borderRadius: radius.lg,
    padding: spacing[3],
    marginHorizontal: 20,
    marginBottom: 16,
  },
  noticeText: {
    fontFamily: fontFamily.regular,
    fontSize: 12,
    lineHeight: 18,
    color: colors.primaryText,
    marginBottom: spacing[1],
  },
  noticeDismiss: {
    fontFamily: fontFamily.semiBold,
    fontSize: 12,
    color: colors.brand,
    alignSelf: "flex-end",
  },

  // 2. Hero Card (Figma 439:3531)
  heroCard: {
    marginHorizontal: 20,
    height: 233,
    borderRadius: 20,
    overflow: "hidden",
    backgroundColor: "#111715",
    borderWidth: 1,
    borderColor: "#28342E",
    position: "relative",
  },
  heroImage: {
    width: "100%",
    height: "100%",
    position: "absolute",
  },
  heroTextContainer: {
    position: "absolute",
    top: 24,
    left: 20,
    right: 40,
  },
  heroTitleWhite: {
    fontFamily: fontFamily.bold,
    fontSize: 24,
    lineHeight: 28,
    color: colors.primaryText, // #F6F8F6
  },
  heroTitleLime: {
    fontFamily: fontFamily.bold,
    fontSize: 24,
    lineHeight: 28,
    color: colors.brand, // #BAFF42
    marginBottom: 10,
  },
  heroSubtitle: {
    fontFamily: fontFamily.regular,
    fontSize: 12,
    lineHeight: 17,
    color: colors.secondaryText, // #ADB7B1
  },

  // 3. Search Bar Overlay (Figma 439:3539)
  searchContainer: {
    marginHorizontal: 20,
    marginTop: -26, // 26px overlap over bottom of hero card
    zIndex: 10,
  },
  searchBar: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    borderRadius: 28,
    height: 54,
    paddingHorizontal: 18,
    shadowColor: "#000000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.35,
    shadowRadius: 8,
    elevation: 8,
  },
  searchIcon: {
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    fontFamily: fontFamily.regular,
    fontSize: 14,
    color: "#080B0B",
    paddingVertical: 0,
    height: "100%",
  },
  clearButtonCircle: {
    width: 22,
    height: 22,
    borderRadius: 11,
    backgroundColor: "#E4E4E7",
    alignItems: "center",
    justifyContent: "center",
  },
  clearButtonText: {
    fontSize: 12,
    color: "#71717A",
    fontWeight: "bold",
    lineHeight: 14,
  },
  searchChevron: {
    paddingLeft: 6,
  },

  // 4. Services Grid (Figma 439:3548 / 439:3585)
  servicesSection: {
    marginHorizontal: 20,
    marginTop: 26,
  },
  servicesGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
    justifyContent: "flex-start",
  },
  serviceCard: {
    backgroundColor: colors.surface, // #151A19
    borderWidth: 1,
    borderColor: "#28342E",
    borderRadius: 14,
    paddingHorizontal: 8,
    paddingVertical: 10,
    height: 98,
    justifyContent: "space-between",
  },
  serviceCardDisabled: {
    opacity: 0.58,
    borderColor: "#1E2724",
    backgroundColor: "#111615",
  },
  serviceCardTop: {
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "space-between",
  },
  serviceCardTitle: {
    fontFamily: fontFamily.semiBold,
    fontSize: 11,
    lineHeight: 14,
    color: colors.primaryText,
  },
  serviceCardTitleDisabled: {
    color: colors.secondaryText,
  },

  // Empty Search State
  emptySearchContainer: {
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: "#28342E",
    borderRadius: 14,
    padding: 16,
    alignItems: "center",
  },
  emptySearchText: {
    fontFamily: fontFamily.regular,
    fontSize: 13,
    lineHeight: 18,
    color: colors.secondaryText,
    textAlign: "center",
    marginBottom: 10,
  },
  emptyClearButton: {
    backgroundColor: "#222827",
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: 12,
  },
  emptyClearButtonText: {
    fontFamily: fontFamily.semiBold,
    fontSize: 12,
    color: colors.brand,
  },

  // 5. Primary Book a Service CTA (Figma 439:3617)
  ctaContainer: {
    marginHorizontal: 20,
    marginTop: 22,
  },
  primaryButton: {
    backgroundColor: colors.brand, // #BAFF42
    height: 58,
    borderRadius: 14,
    alignItems: "center",
    justifyContent: "center",
  },
  primaryButtonText: {
    fontFamily: fontFamily.bold,
    fontSize: 16,
    color: "#080B0B",
    letterSpacing: 0.5,
  },

  // Section Headers
  sectionHeaderRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginHorizontal: 20,
    marginTop: 28,
    marginBottom: 12,
  },
  sectionTitle: {
    fontFamily: fontFamily.bold,
    fontSize: 18,
    color: colors.primaryText, // #F6F8F6
  },
  seeAllText: {
    fontFamily: fontFamily.semiBold,
    fontSize: 13,
    color: colors.brand, // #BAFF42
  },

  // 6. Recent Job Card (Figma 439:3620)
  recentJobCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.surface, // #151A19
    borderWidth: 1,
    borderColor: "#28342E",
    borderRadius: 16,
    padding: 12,
    marginHorizontal: 20,
  },
  recentJobThumbnail: {
    width: 96,
    height: 74,
    borderRadius: 10,
    backgroundColor: "#222827",
  },
  recentJobDetails: {
    flex: 1,
    marginLeft: 12,
    justifyContent: "center",
  },
  recentJobTitle: {
    fontFamily: fontFamily.semiBold,
    fontSize: 15,
    color: colors.primaryText,
    marginBottom: 4,
  },
  recentJobAddress: {
    fontFamily: fontFamily.regular,
    fontSize: 12,
    lineHeight: 16,
    color: colors.secondaryText,
  },
  recentJobMeta: {
    alignItems: "flex-end",
    justifyContent: "space-between",
    height: 70,
  },
  completedBadge: {
    backgroundColor: "#10241A",
    borderWidth: 1,
    borderColor: "#1F4A2C",
    borderRadius: 8,
    paddingVertical: 3,
    paddingHorizontal: 8,
  },
  completedBadgeText: {
    fontFamily: fontFamily.medium,
    fontSize: 10,
    color: "#48D796", // Mint
  },
  recentJobDate: {
    fontFamily: fontFamily.regular,
    fontSize: 11,
    color: "#6D7D73",
  },

  // 7. Saved Address Card (Figma 439:3630)
  savedAddressCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.surface, // #151A19
    borderWidth: 1,
    borderColor: "#28342E",
    borderRadius: 16,
    paddingHorizontal: 14,
    paddingVertical: 14,
    marginHorizontal: 20,
  },
  savedHomeIconBox: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: colors.elevated, // #222827
    alignItems: "center",
    justifyContent: "center",
  },
  savedAddressDetails: {
    flex: 1,
    marginLeft: 14,
  },
  savedHomeLabel: {
    fontFamily: fontFamily.semiBold,
    fontSize: 14,
    color: colors.primaryText,
    marginBottom: 2,
  },
  savedHomeAddress: {
    fontFamily: fontFamily.regular,
    fontSize: 12,
    color: colors.secondaryText,
  },
  savedAddressChevron: {
    paddingLeft: 8,
  },
});
