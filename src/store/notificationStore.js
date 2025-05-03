import { create } from 'zustand';

export const useNotificationStore = create((set) => ({
  notifications: [],
  notifications_count: 0,
  
  setNotifications: (notifications, count) => set({ 
    notifications,
    notifications_count: count || notifications.length 
  }),
  setNotificationsCount: (count) => set({ notifications_count: count }),
  
  addNotification: (notification) => set((state) => ({
    notifications: [notification, ...state.notifications],
    notifications_count: state.notifications_count + 1,
  })),
  
  markAsRead: (notificationId) => set((state) => ({
    notifications: state.notifications.map(notification =>
      notification.id === notificationId
        ? { ...notification, read: true }
        : notification
    ),
  })),
  
  resetNotifications: () => set({
    notifications: [],
    notifications_count: 0,
  }),
})); 