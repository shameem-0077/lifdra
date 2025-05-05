import { create } from 'zustand';

export const useSchoolScientistStore = create((set) => ({
    school_scientist_data: null,
    
    setSchoolScientistData: (data) => set({ school_scientist_data: data }),
    
    updateSchoolScientistData: (data) => set((state) => ({ 
        school_scientist_data: { ...state.school_scientist_data, ...data } 
    })),
    
    resetSchoolScientistData: () => set({
        school_scientist_data: null,
    }),
})); 