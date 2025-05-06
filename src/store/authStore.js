import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const useAuthStore = create(
  persist(
    (set, get) => ({
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
      
      // Getters
      get isAuthenticated() {
        const { user_data, is_verified } = get();
        return Boolean(user_data?.access_token && is_verified);
      },
      
      // Actions
      setUserData: (data) => set((state) => ({ 
        user_data: {
          ...state.user_data,
          ...data,
          is_verified: true
        },
        is_verified: true
      })),
      
      setUserProfile: (profile) => set((state) => ({ 
        user_profile: {
          ...state.user_profile,
          ...profile
        }
      })),
      
      setIsVerified: (status) => set({ is_verified: status }),
      
      updateUserData: (data) => set((state) => ({ 
        user_data: { 
          ...state.user_data, 
          ...data,
          is_verified: true
        },
        is_verified: true
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
      name: 'auth-storage',
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