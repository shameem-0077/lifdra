import { create } from 'zustand';

export const useUIStore = create((set) => ({
  menu_type: '',
  active_menu: '',
  respSideMenuClass: '',
  respSearch: false,
  
  setMenuType: (type) => set({ menu_type: type }),
  setActiveMenu: (menu) => set({ active_menu: menu }),
  setRespSideMenuClass: (className) => set({ respSideMenuClass: className }),
  setRespSearch: (status) => set({ respSearch: status }),
  
  toggleProfile: () => set((state) => ({ 
    menu_type: state.menu_type === 'profile' ? '' : 'profile' 
  })),
  toggleRespMenu: () => set((state) => ({ 
    respSideMenuClass: state.respSideMenuClass === 'active' ? '' : 'active' 
  })),
  toggleRespSearch: (value) => set({ respSearch: value }),
  
  resetUI: () => set({
    menu_type: '',
    active_menu: '',
    respSideMenuClass: '',
    respSearch: false,
  }),
})); 