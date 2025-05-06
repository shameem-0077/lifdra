import { create } from 'zustand';

const useSupportEngineerStore = create((set) => ({
  isPremiumAssistOpen: false,
  activePaChatSession: null,
  activePaChatSessionId: null,

  setSupportEngineer: (action) => {
    switch (action.type) {
      case 'OPEN_PREMIUM_ASSIST':
        set({ isPremiumAssistOpen: true });
        break;
      case 'CLOSE_PREMIUM_ASSIST':
        set({ isPremiumAssistOpen: false });
        break;
      case 'UPDATE_ACTIVE_PA_CHAT_SESSION':
        set({ activePaChatSession: action.active_pa_chat_session });
        break;
      case 'UPDATE_ACTIVE_PA_CHAT_SESSION_ID':
        set({ activePaChatSessionId: action.active_pa_chat_session_id });
        break;
      case 'RESET_SUPPORT_ENGINEER':
        set({
          isPremiumAssistOpen: false,
          activePaChatSession: null,
          activePaChatSessionId: null,
        });
        break;
      default:
        break;
    }
  },
}));

export { useSupportEngineerStore }; 