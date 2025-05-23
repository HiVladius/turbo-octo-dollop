import { create } from 'zustand';
import { persist } from 'zustand/middleware';

type Theme = 'dark' | 'light';
type Section = 'home' | 'about' | 'projects' | 'contact';

interface UserPreferences {
  theme: Theme;
  animationsEnabled: boolean;
  autoLanguageDetection: boolean;
  emailNotifications: boolean;
}

interface AppState {
  // Loading states
  isLoading: boolean;
  isInitialized: boolean;
  
  // Navigation
  currentSection: Section;
  previousSection: Section | null;
  
  // User data
  user: {
    hasVisited: boolean;
    visitCount: number;
    lastVisit: number | null;
    preferences: UserPreferences;
  };
  
  // UI state
  modals: {
    isProfileModalOpen: boolean;
    isHobbiesModalOpen: boolean;
    isGoalsModalOpen: boolean;
    activeModalId: string | null;
  };
  
  // Actions
  setLoading: (loading: boolean) => void;
  setInitialized: (initialized: boolean) => void;
  setCurrentSection: (section: Section) => void;
  incrementVisitCount: () => void;
  setUserPreference: <K extends keyof UserPreferences>(key: K, value: UserPreferences[K]) => void;
  openModal: (modalId: string) => void;
  closeModal: (modalId?: string) => void;
  closeAllModals: () => void;
  
  // Computed
  getTimeUntilNextSubmission: () => number;
  isFirstVisit: () => boolean;
  shouldShowWelcome: () => boolean;
}

const defaultPreferences: UserPreferences = {
  theme: 'dark',
  animationsEnabled: true,
  autoLanguageDetection: true,
  emailNotifications: true
};

export const useAppStore = create<AppState>()(
  persist(
    (set, get) => ({
      // Initial state
      isLoading: true,
      isInitialized: false,
      currentSection: 'home',
      previousSection: null,
      
      user: {
        hasVisited: false,
        visitCount: 0,
        lastVisit: null,
        preferences: defaultPreferences
      },
      
      modals: {
        isProfileModalOpen: false,
        isHobbiesModalOpen: false,
        isGoalsModalOpen: false,
        activeModalId: null
      },
      
      // Actions
      setLoading: (loading) => set({ isLoading: loading }),
      
      setInitialized: (initialized) => set({ isInitialized: initialized }),
      
      setCurrentSection: (section) => 
        set((state) => ({
          previousSection: state.currentSection,
          currentSection: section
        })),
      
      incrementVisitCount: () =>
        set((state) => ({
          user: {
            ...state.user,
            hasVisited: true,
            visitCount: state.user.visitCount + 1,
            lastVisit: Date.now()
          }
        })),
      
      setUserPreference: (key, value) =>
        set((state) => ({
          user: {
            ...state.user,
            preferences: {
              ...state.user.preferences,
              [key]: value
            }
          }
        })),
      
      openModal: (modalId) =>
        set((state) => ({
          modals: {
            ...state.modals,
            activeModalId: modalId,
            [`is${modalId.charAt(0).toUpperCase() + modalId.slice(1)}ModalOpen` as keyof typeof state.modals]: true
          }
        })),
      
      closeModal: (modalId) =>
        set((state) => {
          if (modalId) {
            return {
              modals: {
                ...state.modals,
                [`is${modalId.charAt(0).toUpperCase() + modalId.slice(1)}ModalOpen` as keyof typeof state.modals]: false,
                activeModalId: state.modals.activeModalId === modalId ? null : state.modals.activeModalId
              }
            };
          } else {
            return {
              modals: {
                isProfileModalOpen: false,
                isHobbiesModalOpen: false,
                isGoalsModalOpen: false,
                activeModalId: null
              }
            };
          }
        }),
      
      closeAllModals: () =>
        set({
          modals: {
            isProfileModalOpen: false,
            isHobbiesModalOpen: false,
            isGoalsModalOpen: false,
            activeModalId: null
          }
        }),
      
      // Computed functions
      getTimeUntilNextSubmission: () => {
        // Esta función se podría conectar con el contactStore
        return 0;
      },
      
      isFirstVisit: () => {
        const { user } = get();
        return !user.hasVisited;
      },
      
      shouldShowWelcome: () => {
        const { user } = get();
        return user.visitCount <= 3; // Mostrar bienvenida en las primeras 3 visitas
      }
    }),
    {
      name: 'app-storage',
      partialize: (state) => ({
        user: state.user,
        currentSection: state.currentSection
      })
    }
  )
);
