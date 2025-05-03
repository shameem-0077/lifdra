import { create } from 'zustand';

const useStore = create((set) => ({
  // User related state
  user_data: null,
  user_profile: null,
  is_verified: false,
  
  // UI state
  menu_type: '',
  active_menu: '',
  respSideMenuClass: '',
  respSearch: false,
  
  // Notifications
  notifications: [],
  notifications_count: 0,
  
  // Actions
  setUserData: (data) => set({ user_data: data }),
  setUserProfile: (profile) => set({ user_profile: profile }),
  setIsVerified: (status) => set({ is_verified: status }),
  
  // UI actions
  setMenuType: (type) => set({ menu_type: type }),
  setActiveMenu: (menu) => set({ active_menu: menu }),
  setRespSideMenuClass: (className) => set({ respSideMenuClass: className }),
  setRespSearch: (status) => set({ respSearch: status }),
  
  // Notification actions
  setNotifications: (notifications) => set({ notifications }),
  setNotificationsCount: (count) => set({ notifications_count: count }),
  
  // Toggle actions
  toggleProfile: () => set((state) => ({ 
    menu_type: state.menu_type === 'profile' ? '' : 'profile' 
  })),
  toggleRespMenu: () => set((state) => ({ 
    respSideMenuClass: state.respSideMenuClass === 'active' ? '' : 'active' 
  })),
  toggleRespSearch: (value) => set({ respSearch: value }),
  
  // Reset state
  resetState: () => set({
    user_data: null,
    user_profile: null,
    is_verified: false,
    menu_type: '',
    active_menu: '',
    respSideMenuClass: '',
    respSearch: false,
    notifications: [],
    notifications_count: 0,
  }),
}));

export default useStore; 