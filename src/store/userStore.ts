import { create } from "zustand";
import { persist, PersistOptions } from "zustand/middleware";


type LoginData = {
  accessToken?: string | null;
  refreshToken?: string | null;
  userId?: number | null;
  phoneNumber?: string;
  webCode?: string;
  name?: string;
  designation?: string;
  whatsappNumber?: string;
  email?: string;
  is_verified?: boolean;
  pk?: string;
  photo?: string;
  gender?: string;
  dob?: string;
  about?: string;
  
};

type LanguageData = {
  name: string;
  slug: string;
}

type ExamData = {
  admissionCode?: string;
  examId?: string;
  subject?: string;
  timeRemaining?: number;
  status?: "not_started" | "in_progress" | "completed";
  ongoing_question?: string;
  is_exam_completed?: boolean;
  is_time_out?: boolean;
  current_question_number?: number;
  start_timestamp?: string;
  end_timestamp?: string;
  time_allotted?: number;
} | null;

type UserState = {

  loginData: LoginData;
  setLoginData: (data: Partial<LoginData>) => void;
  logout: () => void;

  examData: ExamData;
  setExamData: (data: Partial<ExamData>) => void;
  clearExamData: () => void;

  LanguageData: LanguageData;
  setLanguageData: (data: LanguageData) => void;
  clearLanguageData: () => void;
};

// Type-safe Zustand store with persist middleware
const useUserStore = create(
  persist(
    (set, get) => ({

      loginData: {
        pk: '',
        userId: null,
        accessToken: null,
        refreshToken: null,
        phoneNumber: '',
        webCode: '',
        name: '',
        designation: '',
        whatsappNumber: '',
        email: '',
        is_verified: false, 
        photo: '',
        gender: '',
        dob: '',
        about: '',       
      },
      setLoginData: (data) =>
        set((state) => ({
          loginData: { ...state.loginData, ...data },
        })),
      logout: () =>
        set({
          loginData: {
            accessToken: null,
            refreshToken: null,
            userId: null,
            phoneNumber: '',
            webCode: '',
            name: '',
            designation: '',
            whatsappNumber: '',
            email: '',
          },
        }),

      examData: {
        admissionCode: '',
        examId: '',
        subject: '',
        timeRemaining: 0,
        status: "not_started" as "not_started",
        ongoing_question: '',
        is_exam_completed: false,
        is_time_out: false,
        current_question_number: 1,
        start_timestamp: '',
        end_timestamp: '',
        time_allotted: 100,
      },
      setExamData: (data) =>
        set((state) => ({
          examData: { ...state.examData, ...data },
        })),
      clearExamData: () => set({ examData: null }),

      LanguageData: {
        name: "English",
        slug: "english"
      },
      setLanguageData: (data) =>
        set((state) => ({
          LanguageData: { ...state.LanguageData, ...data }, // Merge current state with updated data
        })),
      clearLanguageData: () => set({ LanguageData: { name: '', slug: '' } }),

    }),
    {
      name: "user-storage",
      getStorage: () => localStorage, // Make sure localStorage is being used
    } as PersistOptions<UserState>
  )
);

export default useUserStore;
