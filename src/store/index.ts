// Central store exports
export { useLanguageStore } from './languageStore';
export { useContactStore } from './contactStore';
export { useGitHubStore } from './githubStore';
export { useAppStore } from './appStore';
export { useModalStore } from './modalStore';

// Types exports
export type { MailData, SendMailResponse } from '../helpers/sendmail';

// Store initialization hook
import { useEffect } from 'react';
import { useLanguageStore } from './languageStore';
import { useAppStore } from './appStore';
import { useGitHubStore } from './githubStore';

export const useStoreInitialization = () => {
  const initializeLanguage = useLanguageStore((state) => state.initializeLanguage);
  const incrementVisitCount = useAppStore((state) => state.incrementVisitCount);
  const setInitialized = useAppStore((state) => state.setInitialized);
  const fetchRepos = useGitHubStore((state) => state.fetchRepos);
  const isGitHubInitialized = useGitHubStore((state) => state.isInitialized);

  useEffect(() => {
    const initializeStores = async () => {
      try {
        // Initialize language
        initializeLanguage();
        
        // Track visit
        incrementVisitCount();
        
        // Initialize GitHub repos if not already done
        if (!isGitHubInitialized) {
          await fetchRepos(1, true);
        }
        
        // Mark app as initialized
        setInitialized(true);
      } catch (error) {
        console.error('Error initializing stores:', error);
      }
    };

    initializeStores();
  }, [initializeLanguage, incrementVisitCount, setInitialized, fetchRepos, isGitHubInitialized]);
};
