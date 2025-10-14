import { Github, Linkedin, Mail } from "lucide-react";
import { toast, Toaster } from "react-hot-toast";
import { useTranslation } from "react-i18next";
import { useAppStore, useContactStore } from "../../store";
import { useEffect } from "react";
import { ResponsiveButton } from "../common/ResponsiveButton";

const contactMethods = [
  { Icon: Mail, href: "mailto:vladpsico@gmail.com", label: "Gmail" },
  { Icon: Github, href: "https://github.com/HiVladius", label: "HiVladius" },
  {
    Icon: Linkedin,
    href: "https://linkedin.com/in/vladimirmoreno",
    label: "Vladimir Moreno",
  },
];

const { VITE_EMAIL, VITE_EMAIL_PASS } = import.meta.env;

export function ContactSection() {
  const { t } = useTranslation();

  // Contact store
  const formData = useContactStore((state) => state.formData);
  const isSubmitting = useContactStore((state) => state.isSubmitting);
  const updateField = useContactStore((state) => state.updateField);
  const submitForm = useContactStore((state) => state.submitForm);
  const canSubmit = useContactStore((state) => state.canSubmit);
  const isFormValid = useContactStore((state) => state.isFormValid);
  const getFieldErrors = useContactStore((state) => state.getFieldErrors);
  const getFormattedTimeUntilNext = useContactStore((state) =>
    state.getFormattedTimeUntilNext
  );

  // App store
  const setCurrentSection = useAppStore((state) => state.setCurrentSection);

  useEffect(() => {
    setCurrentSection("contact");
  }, [setCurrentSection]);
  
  const commonInputClass =
    "w-full px-4 sm:px-5 py-3 sm:py-4 bg-black/50 rounded-xl border border-gray-800 focus:border-red-500 focus:ring-2 focus:ring-red-500/20 outline-none transition-all duration-200 text-sm sm:text-base placeholder-gray-500/50 min-h-[44px] touch-manipulation";

  const getInputClass = (fieldName: keyof typeof formData, hasError: boolean): string => {
    const baseClass = commonInputClass;
    
    if (hasError && formData[fieldName] && formData[fieldName].length > 0) {
      // Error: rojo sutil
      return baseClass.replace('border-gray-800', 'border-red-400/60').replace('bg-black/50', 'bg-red-950/20') + ' focus:border-red-400 focus:ring-red-400/30';
    } else if (formData[fieldName] && formData[fieldName].length > 0 && !hasError) {
      // Válido: verde sutil  
      return baseClass.replace('border-gray-800', 'border-green-400/40').replace('bg-black/50', 'bg-green-950/10') + ' focus:border-green-400 focus:ring-green-400/20';
    }
    
    return baseClass;
  };

  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = event.target;
    updateField(name as keyof typeof formData, value);
  };
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!canSubmit()) {
      const timeRemaining = getFormattedTimeUntilNext();
      toast.error(
        `⏰ Debes esperar ${timeRemaining} antes de enviar otro mensaje. La API tiene una restricción de 1 correo cada 5 minutos por IP.`,
        {
          duration: 6000,
          icon: "🚫",
          style: {
            background: "#1f2937",
            color: "#fff",
            border: "1px solid #ef4444",
            borderRadius: "12px",
            fontSize: "14px",
            maxWidth: "400px",
          },
        },
      );
      return;
    }

    if (!isFormValid()) {
      const errors = getFieldErrors();
      const firstError = Object.values(errors)[0];
      if (firstError) {
        toast.error(firstError);
      }
      return;
    }

    try {
      await submitForm({
        from: VITE_EMAIL_PASS,
        to: [VITE_EMAIL],
      });
      toast.success(t("contact-section.send-message"));
    } catch (error) {
      const errorMessage = error instanceof Error
        ? error.message
        : t("contact-section.unknown-error");
      toast.error(errorMessage);
      console.error("Error al enviar el email", error);
    }
  };
  return (
    <main className="min-h-screen bg-black text-white px-4 sm:px-6 lg:px-8 py-6 sm:py-8 flex flex-col items-center justify-center">
      <header>
        <h1
          id="contact-heading"
          className="text-3xl sm:text-4xl md:text-5xl font-bold mb-8 sm:mb-10 lg:mb-12 animate-fade-in flex items-center gap-2
      bg-gradient-to-r from-red-500 via-pink-500 to-yellow-400
      bg-clip-text text-transparent text-center"
          style={{
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
        >
          {t("contact-section.contact")}
        </h1>
      </header>
      
      <section 
        aria-labelledby="contact-heading"
        className="w-full max-w-4xl mx-auto bg-zinc-900/50 rounded-xl p-4 sm:p-6 lg:p-8 shadow-xl"
      >
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
          <aside className="space-y-4 sm:space-y-6 lg:space-y-8 order-2 lg:order-1">
            <h2 
              id="social-heading"
              className="text-xl sm:text-2xl font-semibold mb-3 sm:mb-4"
            >
              {t("contact-section.social-media")}
            </h2>
            <nav aria-labelledby="social-heading">
              <ul role="list" className="space-y-4">
                {contactMethods.map(({ Icon, href, label }) => (
                  <li key={label} className="flex items-center gap-3 sm:gap-4">
                    <Icon 
                      className="text-red-500 flex-shrink-0" 
                      size={20}
                      aria-hidden="true"
                    />
                    <a
                      href={href}
                      target={href.startsWith("http") ? "_blank" : undefined}
                      rel={href.startsWith("http")
                        ? "noopener noreferrer"
                        : undefined}
                      className="hover:text-red-500 transition-colors text-sm sm:text-base break-all focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 focus:ring-offset-black rounded"
                      aria-label={`Contactar por ${Icon.name === 'Mail' ? 'correo electrónico' : Icon.name}`}
                    >
                      {label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          </aside>

          <form
            className="space-y-4 order-1 lg:order-2"
            onSubmit={handleSubmit}
            noValidate
            aria-labelledby="form-heading"
          >
            <fieldset>
              <legend id="form-heading" className="sr-only">
                Formulario de contacto
              </legend>
              
              {/* Live region para anuncios del formulario */}
              <div aria-live="polite" aria-atomic="true" className="sr-only" id="form-status">
              </div>
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-400 mb-1"
                >
                  {t("contact-section.name")} <span aria-hidden="true" className="text-red-400/60">*</span>
                </label>
                <input
                  type="text"
                  name="name"
                  id="name"
                  className={getInputClass('name', !!getFieldErrors().name)}
                  required
                  minLength={2}
                  value={formData.name}
                  onChange={handleInputChange}
                  disabled={isSubmitting}
                  aria-invalid={getFieldErrors().name ? 'true' : 'false'}
                  aria-required="true"
                  placeholder={t("contact-section.name-placeholder")}
                />
              </div>

            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-400 mb-1"
              >
                {t("contact-section.email")} <span aria-hidden="true" className="text-red-400/60">*</span>
              </label>
              <input
                type="email"
                name="email"
                id="email"
                className={getInputClass('email', !!getFieldErrors().email)}
                value={formData.email}
                onChange={handleInputChange}
                disabled={isSubmitting}
                required
                aria-invalid={getFieldErrors().email ? 'true' : 'false'}
                aria-required="true"
                autoComplete="email"
                placeholder={t("contact-section.email-placeholder")}
              />
            </div>

            <div>
              <label
                htmlFor="message"
                className="block text-sm font-medium text-gray-400 mb-1"
              >
                {t("contact-section.message")} <span aria-hidden="true" className="text-red-400/60">*</span>
              </label>
              <div className="relative">
                <textarea
                  id="message"
                  name="message"
                  rows={4}
                  className={`${getInputClass('message', !!getFieldErrors().message)} resize-none`}
                  value={formData.message}
                  onChange={handleInputChange}
                  disabled={isSubmitting}
                  required
                  aria-invalid={getFieldErrors().message ? 'true' : 'false'}
                  aria-required="true"
                  placeholder={t("contact-section.message-placeholder")}
                />
                
                {/* Contador de caracteres - siempre visible */}
                <div className={`absolute bottom-2 right-3 text-xs transition-colors ${
                  formData.message.length < 10 
                    ? 'text-red-400/60' 
                    : 'text-green-400/60'
                }`}>
                  {formData.message.length}/10
                </div>
              </div>
            </div>
            <Toaster
              toastOptions={{
                style: {
                  background: "#333",
                  color: "#fff",
                },
                success: {
                  duration: 5000,
                },
                error: {
                  duration: 5000,
                },
              }}
            />

            <ResponsiveButton
              type="submit"
              disabled={!canSubmit()}
              isLoading={isSubmitting}
              loadingText="Enviando..."
              variant="primary"
              size="lg"
              className="w-full"
              aria-describedby="submit-help"
            >
              {t("contact-section.send")}
            </ResponsiveButton>
            
            <div id="submit-help" className="sr-only">
              {isSubmitting ? t("contact-section.sending") : t("contact-section.send-help")}
            </div>
            
            </fieldset>
          </form>
        </div>
      </section>
    </main>
  );
}
