import { DRIVER_DEMO_SCREENS } from "../components/demo/driverDemoScreens";
import { driverEn } from "../i18n/driverEn";
import { driverEs } from "../i18n/driverEs";
import { useNotificationStore } from "../stores/notificationStore";
import { useSupportStore } from "../stores/supportStore";
import { useWorkerProfileStore } from "../stores/workerProfileStore";

describe("DW-F09 Profile, History, Safety & Support", () => {
  beforeEach(() => {
    useWorkerProfileStore.getState().resetProfileStore();
    useNotificationStore.getState().resetNotificationStore();
    useSupportStore.getState().resetSupportStore();
  });

  describe("1. Worker Profile Store & Isolation", () => {
    test("driver profile initializes with Alex Miller, Ford F-250 and Sarah Miller emergency contact", () => {
      const store = useWorkerProfileStore.getState();
      const driver = store.getProfileForRole("driver");

      expect(driver.name).toBe("Alex Miller");
      expect(driver.rating).toBe(4.95);
      expect(driver.completedJobs).toBe(142);
      expect(driver.email).toBe("alex.miller@example.com");
      expect(driver.phone).toBe("+1 (602) 555-0142");
      expect((driver as any).vehicle).toBe("2022 Ford F-250 Super Duty");
      expect((driver as any).licensePlate).toBe("AZ 7K4-992");
      expect(driver.emergencyContact.name).toBe("Sarah Miller");
      expect(driver.emergencyContact.relationship).toBe("Spouse");
    });

    test("helper profile initializes with Marcus Reed and David Reed emergency contact", () => {
      const store = useWorkerProfileStore.getState();
      const helper = store.getProfileForRole("helper");

      expect(helper.name).toBe("Marcus Reed");
      expect(helper.rating).toBe(4.92);
      expect(helper.completedJobs).toBe(78);
      expect(helper.email).toBe("marcus.r@example.com");
      expect(helper.emergencyContact.name).toBe("David Reed");
      expect(helper.emergencyContact.relationship).toBe("Brother");
      expect((helper as any).vehicle).toBeUndefined();
    });

    test("profile updates remain segregated between driver and helper", () => {
      useWorkerProfileStore.getState().updateDriverProfile({ phone: "+1 (602) 555-9999" });
      expect(useWorkerProfileStore.getState().driverProfile.phone).toBe("+1 (602) 555-9999");
      expect(useWorkerProfileStore.getState().helperProfile.phone).toBe("+1 (602) 555-0199");

      useWorkerProfileStore.getState().updateAvatar("helper", "https://example.com/new-avatar.jpg");
      expect(useWorkerProfileStore.getState().helperProfile.avatarUrl).toBe(
        "https://example.com/new-avatar.jpg"
      );
      expect(useWorkerProfileStore.getState().driverProfile.avatarUrl).not.toBe(
        "https://example.com/new-avatar.jpg"
      );
    });
  });

  describe("2. Notification Store & Activity Feeds", () => {
    test("notifications are segregated by worker role", () => {
      const store = useNotificationStore.getState();
      const driverNotifs = store.getNotificationsForRole("driver");
      const helperNotifs = store.getNotificationsForRole("helper");

      expect(driverNotifs.length).toBeGreaterThan(0);
      expect(helperNotifs.length).toBeGreaterThan(0);

      for (const n of driverNotifs) {
        expect(n.role).toBe("driver");
      }
      for (const n of helperNotifs) {
        expect(n.role).toBe("helper");
      }
    });

    test("read state transitions correctly and unread counts update", () => {
      const store = useNotificationStore.getState();
      const initialDriverUnread = store.getUnreadCount("driver");
      expect(initialDriverUnread).toBeGreaterThan(0);

      const firstDriver = store.getNotificationsForRole("driver")[0];
      store.markAsRead(firstDriver.id);

      const afterOneRead = store.getUnreadCount("driver");
      expect(afterOneRead).toBe(initialDriverUnread - 1);

      store.markAllAsRead("driver");
      expect(store.getUnreadCount("driver")).toBe(0);
      // Helper unread count should remain untouched
      expect(store.getUnreadCount("helper")).toBeGreaterThan(0);
    });

    test("preference toggles update accurately", () => {
      const initialPrefs = useNotificationStore.getState().preferences;
      expect(initialPrefs.pushOffers).toBe(true);

      useNotificationStore
        .getState()
        .updatePreferences({ pushOffers: false, emailSummaries: true });
      expect(useNotificationStore.getState().preferences.pushOffers).toBe(false);
      expect(useNotificationStore.getState().preferences.emailSummaries).toBe(true);
    });
  });

  describe("3. Support Store & Ticket Submissions", () => {
    test("submitting a support ticket generates valid ticket number and records details", () => {
      const store = useSupportStore.getState();

      const ticket = store.submitTicket(
        "driver",
        "job",
        "Elevator broken at dropoff address; need customer contact assistance.",
        "HX-AZ-DEMO-0042"
      );

      expect(ticket.ticketId).toMatch(/^TKT-2026-\d{4}$/);
      expect(ticket.workerRole).toBe("driver");
      expect(ticket.category).toBe("job");
      expect(ticket.jobId).toBe("HX-AZ-DEMO-0042");
      expect(ticket.status).toBe("received");

      const last = store.getLastTicket();
      expect(last?.ticketId).toBe(ticket.ticketId);
    });
  });

  describe("4. Bilingual Translation Dictionaries Completeness (DW-F09)", () => {
    const requiredSections = [
      "profile",
      "helperProfile",
      "myJobs",
      "helpSupport",
      "notifications",
      "languageSecurity",
      "personalInfo",
      "helperPersonalInfo",
      "photoContact",
      "changePassword",
      "notificationSettings",
      "contactSupport",
      "requestReceived",
      "photoOverlay",
      "securityOverlay",
      "emergencyOverlay",
    ] as const;

    test.each(requiredSections)(
      "section '%s' contains matching non-empty keys in En and Es",
      (section) => {
        const enDict = (driverEn.driver as any)[section] || {};
        const esDict = (driverEs.driver as any)[section] || {};

        const enKeys = Object.keys(enDict);
        const esKeys = Object.keys(esDict);

        expect(enKeys.length).toBeGreaterThan(0);
        expect(esKeys.length).toBeGreaterThan(0);

        for (const key of enKeys) {
          expect(esKeys).toContain(key);
          expect(enDict[key]).toBeTruthy();
          expect(esDict[key]).toBeTruthy();
        }
      }
    );
  });

  describe("5. Demo Screens Registration Completeness", () => {
    const requiredScreenIds = [
      "DW27-EN",
      "DW27-ES",
      "DW28-EN",
      "DW28-ES",
      "DW29-EN",
      "DW29-ES",
      "DW30-EN",
      "DW30-ES",
      "DW32-EN",
      "DW32-ES",
      "DW36-EN",
      "DW36-ES",
      "DW37-EN",
      "DW37-ES",
      "DW41-EN",
      "DW41-ES",
      "DW42-EN",
      "DW42-ES",
      "DW45-EN",
      "DW45-ES",
      "DW46-EN",
      "DW46-ES",
      "DW55-EN",
      "DW55-ES",
      "DW57-EN",
      "DW57-ES",
      "OV01-EN",
      "OV01-ES",
      "OV03-EN",
      "OV03-ES",
      "OV04-EN",
      "OV04-ES",
    ];

    test.each(requiredScreenIds)("screen '%s' is registered in DRIVER_DEMO_SCREENS", (id) => {
      const found = DRIVER_DEMO_SCREENS.find((s) => s.id === id);
      expect(found).toBeDefined();
      expect(found?.route).toBeTruthy();
      expect(found?.figmaNode).toBeTruthy();
    });
  });
});
