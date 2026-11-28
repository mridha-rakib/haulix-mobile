import { create } from "zustand";
import type { WorkerRole } from "./walletStore";

export type NotificationType = "offer" | "invite" | "verification" | "payout" | "safety" | "system";

export interface NotificationItem {
  id: string;
  role: WorkerRole;
  type: NotificationType;
  title: string;
  body: string;
  titleEn: string;
  titleEs: string;
  bodyEn: string;
  bodyEs: string;
  timestamp: string;
  timestampEn: string;
  timestampEs: string;
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
  driverPreferences: NotificationPreferences;
  helperPreferences: NotificationPreferences;
  getNotificationsForRole: (role: WorkerRole) => NotificationItem[];
  getPreferencesForRole: (role: WorkerRole) => NotificationPreferences;
  getUnreadCount: (role: WorkerRole) => number;
  markAsRead: (id: string) => void;
  markAllAsRead: (role: WorkerRole) => void;
  updatePreferences: (partial: Partial<NotificationPreferences>) => void;
  updatePreferencesForRole: (role: WorkerRole, partial: Partial<NotificationPreferences>) => void;
  addNotification: (item: Omit<NotificationItem, "id" | "isRead">) => NotificationItem;
  resetNotificationStore: () => void;
}

const initialNotifications: NotificationItem[] = [
  {
    id: "notif-d-01",
    role: "driver",
    type: "payout",
    title: "Instant Payout Succeeded",
    titleEn: "Instant Payout Succeeded",
    titleEs: "Pago instantáneo exitoso",
    body: "$1,280.00 was deposited to Visa ending in 9012.",
    bodyEn: "$1,280.00 was deposited to Visa ending in 9012.",
    bodyEs: "Se depositaron $1,280.00 a la tarjeta Visa que termina en 9012.",
    timestamp: "10 mins ago",
    timestampEn: "10 mins ago",
    timestampEs: "Hace 10 min",
    isRead: false,
    deepLinkHref: "/(app)/payout-history",
  },
  {
    id: "notif-d-02",
    role: "driver",
    type: "offer",
    title: "New Delivery Offer Available",
    titleEn: "New Delivery Offer Available",
    titleEs: "Nueva oferta de entrega disponible",
    body: "Heavy Furniture Transport · $145.00 · Scottsdale to Tempe.",
    bodyEn: "Heavy Furniture Transport · $145.00 · Scottsdale to Tempe.",
    bodyEs: "Transporte de muebles pesados · $145.00 · Scottsdale a Tempe.",
    timestamp: "1 hour ago",
    timestampEn: "1 hour ago",
    timestampEs: "Hace 1 hora",
    isRead: false,
    deepLinkHref: "/(app)/job-offers",
  },
  {
    id: "notif-d-03",
    role: "driver",
    type: "verification",
    title: "Vehicle Registration Validated",
    titleEn: "Vehicle Registration Validated",
    titleEs: "Registro de vehículo validado",
    body: "Ford F-250 annual commercial verification approved.",
    bodyEn: "Ford F-250 annual commercial verification approved.",
    bodyEs: "Verificación comercial anual de Ford F-250 aprobada.",
    timestamp: "Yesterday",
    timestampEn: "Yesterday",
    timestampEs: "Ayer",
    isRead: true,
    deepLinkHref: "/(app)/vehicle-docs",
  },
  {
    id: "notif-d-04",
    role: "driver",
    type: "system",
    title: "5-Star Review Received",
    titleEn: "5-Star Review Received",
    titleEs: "Reseña de 5 estrellas recibida",
    body: "Customer rated your service on Job HX-AZ-DEMO-0042.",
    bodyEn: "Customer rated your service on Job HX-AZ-DEMO-0042.",
    bodyEs: "El cliente calificó su servicio en el trabajo HX-AZ-DEMO-0042.",
    timestamp: "2 days ago",
    timestampEn: "2 days ago",
    timestampEs: "Hace 2 días",
    isRead: true,
    deepLinkHref: "/(app)/earnings-detail",
  },
  {
    id: "notif-h-01",
    role: "helper",
    type: "invite",
    title: "Crew Invitation from Alex Miller",
    titleEn: "Crew Invitation from Alex Miller",
    titleEs: "Invitación de cuadrilla de Alex Miller",
    body: "Two-Person Living Room Set Move · $65.00 share.",
    bodyEn: "Two-Person Living Room Set Move · $65.00 share.",
    bodyEs: "Mudanza de sala para dos personas · Porción de $65.00.",
    timestamp: "20 mins ago",
    timestampEn: "20 mins ago",
    timestampEs: "Hace 20 min",
    isRead: false,
    deepLinkHref: "/(app)/review-invitation",
  },
  {
    id: "notif-h-02",
    role: "helper",
    type: "payout",
    title: "Direct Deposit Processed",
    titleEn: "Direct Deposit Processed",
    titleEs: "Depósito directo procesado",
    body: "$340.00 sent to Wells Fargo ending in 8832.",
    bodyEn: "$340.00 sent to Wells Fargo ending in 8832.",
    bodyEs: "Se enviaron $340.00 a Wells Fargo que termina en 8832.",
    timestamp: "Yesterday",
    timestampEn: "Yesterday",
    timestampEs: "Ayer",
    isRead: false,
    deepLinkHref: "/(app)/payout-history",
  },
  {
    id: "notif-h-03",
    role: "helper",
    type: "system",
    title: "Shift Completed",
    titleEn: "Shift Completed",
    titleEs: "Turno completado",
    body: "Good job on completing your shift with primary driver Alex.",
    bodyEn: "Good job on completing your shift with primary driver Alex.",
    bodyEs: "Buen trabajo completando su turno con el conductor principal Alex.",
    timestamp: "3 days ago",
    timestampEn: "3 days ago",
    timestampEs: "Hace 3 días",
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
  driverPreferences: { ...initialPreferences },
  helperPreferences: { ...initialPreferences },

  getNotificationsForRole: (role: WorkerRole) => {
    return get().notifications.filter((n) => n.role === role);
  },

  getPreferencesForRole: (role: WorkerRole) => {
    return role === "driver" ? get().driverPreferences : get().helperPreferences;
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
      driverPreferences: { ...state.driverPreferences, ...partial },
    }));
  },

  updatePreferencesForRole: (role: WorkerRole, partial: Partial<NotificationPreferences>) => {
    set((state) => ({
      preferences: { ...state.preferences, ...partial },
      driverPreferences:
        role === "driver" ? { ...state.driverPreferences, ...partial } : state.driverPreferences,
      helperPreferences:
        role === "helper" ? { ...state.helperPreferences, ...partial } : state.helperPreferences,
    }));
  },

  addNotification: (item: Omit<NotificationItem, "id" | "isRead">) => {
    const existing = get().notifications.find(
      (n) => n.role === item.role && n.type === item.type && n.titleEn === item.titleEn
    );
    if (existing) {
      return existing;
    }

    const newItem: NotificationItem = {
      ...item,
      id: `notif-${item.role[0]}-${Date.now()}-${Math.floor(100 + Math.random() * 900)}`,
      isRead: false,
    };

    set((state) => ({
      notifications: [newItem, ...state.notifications],
    }));

    return newItem;
  },

  resetNotificationStore: () => {
    set({
      notifications: [...initialNotifications],
      preferences: { ...initialPreferences },
      driverPreferences: { ...initialPreferences },
      helperPreferences: { ...initialPreferences },
    });
  },
}));
