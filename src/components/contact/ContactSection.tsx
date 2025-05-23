import { Github, Linkedin, Mail } from "lucide-react";
import { toast, Toaster } from "react-hot-toast";
import { useTranslation } from "react-i18next";
import { useContactStore, useAppStore } from "../../store";
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
  
  // App store
  const setCurrentSection = useAppStore((state) => state.setCurrentSection);
  
  useEffect(() => {
    setCurrentSection('contact');
  }, [setCurrentSection]);  const commonInputClass =
    "w-full px-4 sm:px-5 py-3 sm:py-4 bg-black/50 rounded-xl border border-gray-800 focus:border-red-500 focus:ring-2 focus:ring-red-500/20 outline-none transition-all duration-200 text-sm sm:text-base placeholder-gray-400 min-h-[44px] touch-manipulation";

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = event.target;
    updateField(name as keyof typeof formData, value);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!canSubmit()) {
      toast.error(t("contact-section.send-error"));
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
      const errorMessage = error instanceof Error ? error.message : "Error desconocido";
      toast.error(errorMessage);
      console.error("Error al enviar el email", error);
    }
  };
  return (
    <div className="min-h-screen bg-black text-white px-4 sm:px-6 lg:px-8 py-6 sm:py-8 flex flex-col items-center justify-center">
      <h1
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
      <div className="w-full max-w-4xl mx-auto bg-zinc-900/50 rounded-xl p-4 sm:p-6 lg:p-8 shadow-xl">        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
          <div className="space-y-4 sm:space-y-6 lg:space-y-8 order-2 lg:order-1">
            <h2 className="text-xl sm:text-2xl font-semibold mb-3 sm:mb-4">
              {t("contact-section.social-media")}
            </h2>
            {contactMethods.map(({ Icon, href, label }) => (
              <div key={label} className="flex items-center gap-3 sm:gap-4">
                <Icon className="text-red-500 flex-shrink-0" size={20} />
                <a
                  href={href}
                  target={href.startsWith("http") ? "_blank" : undefined}
                  rel={href.startsWith("http")
                    ? "noopener noreferrer"
                    : undefined}
                  className="hover:text-red-500 transition-colors text-sm sm:text-base break-all"
                >
                  {label}
                </a>
              </div>
            ))}
          </div>

          <form className="space-y-4 order-1 lg:order-2" onSubmit={handleSubmit}>
            {[
              { id: "name", type: "text", label: t("contact-section.name") },
            ].map(({ id, type, label }) => (
              <div key={id}>
                <label
                  htmlFor={id}
                  className="block text-sm font-medium text-gray-400 mb-1"
                >
                  {label}
                </label>
                <input
                  type={type}
                  name="name"
                  id={id}
                  className={commonInputClass}
                  required
                  minLength={10}
                  value={formData.name}
                  onChange={handleInputChange}
                  disabled={isSubmitting}
                />
              </div>
            ))}

            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-400 mb-1"
              >
                {t("contact-section.email")}
              </label>
              <input
                type="email"
                name="email"
                id="email"
                className={commonInputClass}
                value={formData.email}
                onChange={handleInputChange}
                disabled={isSubmitting}
                required
              />
            </div>
            <div>
              <label
                htmlFor="message"
                className="block text-sm font-medium text-gray-400 mb-1"
              >
                {t("contact-section.message")}
                {" "}
              </label>
              <textarea
                id="message"
                name="message"
                rows={4}
                className={`${commonInputClass} resize-none`}
                value={formData.message}
                onChange={handleInputChange}
                disabled={isSubmitting}
                required
              />
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
              }}            />
            
            <ResponsiveButton
              type="submit"
              disabled={!canSubmit()}
              isLoading={isSubmitting}
              loadingText="Enviando..."
              variant="primary"
              size="lg"
              className="w-full"
            >
              {t("contact-section.send")}
            </ResponsiveButton>
          </form>
        </div>
      </div>
    </div>
  );
}
