import { create } from 'zustand';

export const useTidioStore = create((set) => ({
  tidioSettings: { isOpened: false },
  
  setTidioSettings: (settings) => set({ tidioSettings: settings }),
  updateTidioSettings: (isOpened) => set({ 
    tidioSettings: { isOpened } 
  }),
  
  resetTidio: () => set({
    tidioSettings: { isOpened: false },
  }),
})); 