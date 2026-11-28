import { create } from "zustand";
import type { WorkerRole } from "./walletStore";

export type NotificationType = "offer" | "invite" | "verification" | "payout" | "safety" | "system";

export interface NotificationItem {
  id: string;
  role: WorkerRole;
  type: NotificationType;
  title: string;
  body: string;
  timestamp: string;
  isRead: boolean;
  deepLinkHref: string;
}

export interface NotificationPreferences {
  pushOffers: boolean;
  pushMessages: boolean;
  pushPayouts: boolean;
  smsAlerts: boolean;
  emailSummaries: boolean;
  soundHaptics: boolean;
}

interface NotificationState {
  notifications: NotificationItem[];
  preferences: NotificationPreferences;
  getNotificationsForRole: (role: WorkerRole) => NotificationItem[];
  getUnreadCount: (role: WorkerRole) => number;
  markAsRead: (id: string) => void;
  markAllAsRead: (role: WorkerRole) => void;
  updatePreferences: (partial: Partial<NotificationPreferences>) => void;
  resetNotificationStore: () => void;
}

const initialNotifications: NotificationItem[] = [
  {
    id: "notif-d-01",
    role: "driver",
    type: "payout",
    title: "Instant Payout Succeeded",
    body: "$1,280.00 was deposited to Visa ending in 9012.",
    timestamp: "10 mins ago",
    isRead: false,
    deepLinkHref: "/(app)/payout-history",
  },
  {
    id: "notif-d-02",
    role: "driver",
    type: "offer",
    title: "New Delivery Offer Available",
    body: "Heavy Furniture Transport · $145.00 · Scottsdale to Tempe.",
    timestamp: "1 hour ago",
    isRead: false,
    deepLinkHref: "/(app)/offer-detail",
  },
  {
    id: "notif-d-03",
    role: "driver",
    type: "verification",
    title: "Vehicle Registration Validated",
    body: "Ford F-250 annual commercial verification approved.",
    timestamp: "Yesterday",
    isRead: true,
    deepLinkHref: "/(app)/vehicle-upload",
  },
  {
    id: "notif-d-04",
    role: "driver",
    type: "system",
    title: "5-Star Review Received",
    body: "Customer rated your service on Job HX-AZ-DEMO-0042.",
    timestamp: "2 days ago",
    isRead: true,
    deepLinkHref: "/(app)/earnings-detail",
  },
  {
    id: "notif-h-01",
    role: "helper",
    type: "invite",
    title: "Crew Invitation from Alex Miller",
    body: "Two-Person Living Room Set Move · $65.00 share.",
    timestamp: "20 mins ago",
    isRead: false,
    deepLinkHref: "/(app)/helper-crew-invite",
  },
  {
    id: "notif-h-02",
    role: "helper",
    type: "payout",
    title: "Direct Deposit Processed",
    body: "$340.00 sent to Wells Fargo ending in 8832.",
    timestamp: "Yesterday",
    isRead: false,
    deepLinkHref: "/(app)/payout-history",
  },
  {
    id: "notif-h-03",
    role: "helper",
    type: "system",
    title: "Shift Completed",
    body: "Good job on completing your shift with primary driver Alex.",
    timestamp: "3 days ago",
    isRead: true,
    deepLinkHref: "/(app)/my-jobs",
  },
];

const initialPreferences: NotificationPreferences = {
  pushOffers: true,
  pushMessages: true,
  pushPayouts: true,
  smsAlerts: true,
  emailSummaries: false,
  soundHaptics: true,
};

export const useNotificationStore = create<NotificationState>((set, get) => ({
  notifications: [...initialNotifications],
  preferences: { ...initialPreferences },

  getNotificationsForRole: (role: WorkerRole) => {
    return get().notifications.filter((n) => n.role === role);
  },

  getUnreadCount: (role: WorkerRole) => {
    return get().notifications.filter((n) => n.role === role && !n.isRead).length;
  },

  markAsRead: (id: string) => {
    set((state) => ({
      notifications: state.notifications.map((n) => (n.id === id ? { ...n, isRead: true } : n)),
    }));
  },

  markAllAsRead: (role: WorkerRole) => {
    set((state) => ({
      notifications: state.notifications.map((n) => (n.role === role ? { ...n, isRead: true } : n)),
    }));
  },

  updatePreferences: (partial: Partial<NotificationPreferences>) => {
    set((state) => ({
      preferences: { ...state.preferences, ...partial },
    }));
  },

  resetNotificationStore: () => {
    set({
      notifications: [...initialNotifications],
      preferences: { ...initialPreferences },
    });
  },
}));
