import { create } from 'zustand';

type ModalType = 'profile' | 'hobbies' | 'goals';

interface ModalState {
  activeModal: ModalType | null;
  hoverStates: Record<ModalType, boolean>;
  
  //* Actions
  openModal: (modalType: ModalType) => void;
  closeModal: () => void;
  setHover: (modalType: ModalType, isHovered: boolean) => void;
  
  //* Getters
  isModalOpen: (modalType: ModalType) => boolean;
  isHovered: (modalType: ModalType) => boolean;
}

export const useModalStore = create<ModalState>((set, get) => ({
  activeModal: null,
  hoverStates: {
    profile: false,
    hobbies: false,
    goals: false
  },
    openModal: (modalType) => set({ activeModal: modalType }),
  
  closeModal: () => set({ activeModal: null }),
  
  setHover: (modalType, isHovered) => 
    set((state) => ({
      hoverStates: {
        ...state.hoverStates,
        [modalType]: isHovered
      }
    })),
    isModalOpen: (modalType) => get().activeModal === modalType,
  
  isHovered: (modalType) => get().hoverStates[modalType]
}));
