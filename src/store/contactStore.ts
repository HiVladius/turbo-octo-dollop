import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { sendMail, MailData, SendMailResponse } from '../helpers/sendmail';


const to = import.meta.env.VITE_EMAIL_TO?.toString()
const from = import.meta.env.VITE_EMAIL_FROM?.toString() 

interface ContactFormData {
  name: string;
  email: string;
  message: string;
}

interface ContactState {
  formData: ContactFormData;
  isSubmitting: boolean;
  lastSubmissionTime: number | null;
  submitCount: number;
  
  // Actions
  updateField: (field: keyof ContactFormData, value: string) => void;
  updateFormData: (data: Partial<ContactFormData>) => void;
  resetForm: () => void;
  setSubmitting: (isSubmitting: boolean) => void;
  canSubmit: () => boolean;
  submitForm: (additionalData?: { from: string; to: [string] }) => Promise<SendMailResponse>;
  
  // Validation
  isFormValid: () => boolean;
  getFieldErrors: () => Partial<Record<keyof ContactFormData, string>>;
  
  // Cooldown helpers
  getTimeUntilNextSubmission: () => number;
  getFormattedTimeUntilNext: () => string;
}

const SUBMISSION_COOLDOWN = 5 * 60 * 1000; // 5 minutos en milisegundos

export const useContactStore = create<ContactState>()(
  persist(
    (set, get) => ({
      formData: {
        name: '',
        email: '',
        message: ''
      },
      isSubmitting: false,
      lastSubmissionTime: null,
      submitCount: 0,
      
      updateField: (field, value) => 
        set((state) => ({
          formData: { ...state.formData, [field]: value }
        })),
      
      updateFormData: (data) =>
        set((state) => ({
          formData: { ...state.formData, ...data }
        })),
      
      resetForm: () => 
        set({ 
          formData: { name: '', email: '', message: '' }
        }),
      
      setSubmitting: (isSubmitting) => set({ isSubmitting }),
      
      canSubmit: () => {
        const { lastSubmissionTime, isSubmitting } = get();
        if (isSubmitting) return false;
        if (!lastSubmissionTime) return true;
        return Date.now() - lastSubmissionTime > SUBMISSION_COOLDOWN;
      },
      
      submitForm: async () => {
        const state = get();
          if (!state.canSubmit()) {
          throw new Error('Debes esperar 5 minutos entre envíos');
        }
        
        if (!state.isFormValid()) {
          throw new Error('Por favor, completa todos los campos correctamente');
        }
        
        set({ isSubmitting: true });
        
        try {
          const mailData: MailData = {
            from:  from,
            to: to,
            subject: `Nuevo mensaje de ${state.formData.name}`,
            html: `
              <h2>Nuevo mensaje desde el portafolio</h2>
              <p><strong>Nombre:</strong> ${state.formData.name}</p>
              <p><strong>Email:</strong> ${state.formData.email}</p>
              <p><strong>Mensaje:</strong></p>
              <p>${state.formData.message.replace(/\n/g, '<br>')}</p>
            `
          };
          
          const response = await sendMail(mailData);
          
          set({ 
            lastSubmissionTime: Date.now(),
            submitCount: state.submitCount + 1
          });
          
          get().resetForm();
          
          return response;
        } finally {
          set({ isSubmitting: false });
        }
      },
      
      isFormValid: () => {
        const { formData } = get();
        return !!(
          formData.name.trim().length >= 2 &&
          formData.email.trim().includes('@') &&
          formData.message.trim().length >= 10
        );
      },
      
      getFieldErrors: () => {
        const { formData } = get();
        const errors: Partial<Record<keyof ContactFormData, string>> = {};
        
        if (formData.name.trim().length < 2) {
          errors.name = 'El nombre debe tener al menos 2 caracteres';
        }
        
        if (!formData.email.trim().includes('@')) {
          errors.email = 'Por favor, introduce un email válido';
        }
        
        if (formData.message.trim().length < 10) {
          errors.message = 'El mensaje debe tener al menos 10 caracteres';        }
        
        return errors;
      },
      
      getTimeUntilNextSubmission: () => {
        const { lastSubmissionTime } = get();
        if (!lastSubmissionTime) return 0;
        const timeElapsed = Date.now() - lastSubmissionTime;
        const timeRemaining = SUBMISSION_COOLDOWN - timeElapsed;
        return Math.max(0, timeRemaining);
      },
      
      getFormattedTimeUntilNext: () => {
        const timeRemaining = get().getTimeUntilNextSubmission();
        if (timeRemaining <= 0) return '';
        
        const minutes = Math.floor(timeRemaining / (60 * 1000));
        const seconds = Math.floor((timeRemaining % (60 * 1000)) / 1000);
        
        if (minutes > 0) {
          return `${minutes}m ${seconds}s`;
        }
        return `${seconds}s`;
      }
    }),
    {
      name: 'contact-storage',
      partialize: (state) => ({ 
        lastSubmissionTime: state.lastSubmissionTime,
        submitCount: state.submitCount 
      })
    }
  )
);
