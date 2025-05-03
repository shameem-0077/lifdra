import { create } from 'zustand';

export const useSubscriptionStore = create((set) => ({
  subscriptionType: '',
  
  setSubscriptionType: (type) => set({ subscriptionType: type }),
  
  resetSubscription: () => set({
    subscriptionType: '',
  }),
})); 