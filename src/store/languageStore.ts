import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import i18n from '../translator/config';

interface LanguageState {
  currentLanguage: string;
  isInitialized: boolean;
  changeLanguage: (language: string) => void;
  toggleLanguage: () => void;
  initializeLanguage: () => void;
}

export const useLanguageStore = create<LanguageState>()(
  persist(
    (set, get) => ({
      currentLanguage: 'es',
      isInitialized: false,
      
      changeLanguage: (language: string) => {
        i18n.changeLanguage(language);
        set({ currentLanguage: language });
      },
      
      toggleLanguage: () => {
        const current = get().currentLanguage;
        const newLanguage = current === 'en' ? 'es' : 'en';
        get().changeLanguage(newLanguage);
      },
      
      initializeLanguage: () => {
        if (!get().isInitialized) {
          const savedLanguage = get().currentLanguage;
          i18n.changeLanguage(savedLanguage);
          set({ isInitialized: true });
        }
      }
    }),
    {
      name: 'language-storage',
      partialize: (state) => ({ currentLanguage: state.currentLanguage })
    }
  )
);
