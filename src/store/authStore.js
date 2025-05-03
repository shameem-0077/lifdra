import { create } from 'zustand';

export const useAuthStore = create((set) => ({
  user_data: null,
  user_profile: null,
  is_verified: false,
  
  setUserData: (data) => set({ user_data: data }),
  setUserProfile: (profile) => set({ user_profile: profile }),
  setIsVerified: (status) => set({ is_verified: status }),
  updateUserData: (data) => set((state) => ({ 
    user_data: { ...state.user_data, ...data } 
  })),
  
  resetAuth: () => set({
    user_data: null,
    user_profile: null,
    is_verified: false,
  }),
})); 