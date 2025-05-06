import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const useAuthStore = create(
  persist(
    (set) => ({
      user_data: null,
      user_profile: null,
      is_verified: false,
      signup_data: {
        name: '',
        country: 'IN',
        phone: '',
        password: null
      },
      nextPath: '',
      
      setUserData: (data) => set({ user_data: data }),
      setUserProfile: (profile) => set({ user_profile: profile }),
      setIsVerified: (status) => set({ is_verified: status }),
      updateUserData: (data) => set((state) => ({ 
        user_data: { ...state.user_data, ...data } 
      })),
      updateSignupData: (data) => set((state) => ({
        signup_data: { ...state.signup_data, ...data }
      })),
      setNextPath: (path) => set({ nextPath: path }),
      
      resetAuth: () => set({
        user_data: null,
        user_profile: null,
        is_verified: false,
        signup_data: {
          name: '',
          country: 'IN',
          phone: '',
          password: null
        },
        nextPath: ''
      }),
    }),
    {
      name: 'auth-storage', // unique name for localStorage key
      partialize: (state) => ({
        user_data: state.user_data,
        user_profile: state.user_profile,
        is_verified: state.is_verified,
        signup_data: state.signup_data,
        nextPath: state.nextPath,
      }),
    }
  )
); 