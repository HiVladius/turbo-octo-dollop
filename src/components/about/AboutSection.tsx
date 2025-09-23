import { useEffect } from "react";
import { ProfileCard } from "./ProfileCard";
import { ModalProfile } from "./ModalProfile";
import { ResponsiveContainer } from "../common/ResponsiveContainer";
import { ResponsiveGrid } from "../common/ResponsiveGrid";
import image from "../../assets/cartoon-me.jpg";
import hobbie from "../../assets/hobbie.jpg";
import goals from "../../assets/colisión.jpeg";
import { useTranslation } from "react-i18next";
import { useAppStore, useModalStore } from "../../store";

export function AboutSection() {
  const { t } = useTranslation();

  const setCurrentSection = useAppStore((state) => state.setCurrentSection);
  const { openModal, closeModal, setHover, isModalOpen, isHovered } =
    useModalStore();

  useEffect(() => {
    setCurrentSection("about");
  }, [setCurrentSection]);

  const handleCloseModal = () => {
    closeModal();
  };

  return (
    <div className="about-section min-h-screen bg-black text-white">
      <ResponsiveContainer className="flex flex-col min-h-screen bg-black text-white py-8 gap-4 sm:gap-6 lg:gap-8 items-center justify-center text-center">
        <div className="flex-1 w-full">
          <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-bold mb-8 sm:mb-10 lg:mb-12 animate-fade-in text-center mt-4 sm:mt-6 lg:mt-9 bg-gradient-to-r from-red-500 via-pink-500 to-yellow-400
bg-clip-text text-transparent">
            {t("about-section.sobre_mi")}
          </h1>
          <ResponsiveGrid
            cols={{ base: 1, lg: 3 }}
            gap="xl"
            className="mx-auto justify-items-center gap-y-12 sm:gap-y-16 lg:gap-y-20"
          >
            <div className="flex justify-center animate-fade-in mb-8 sm:mb-10 lg:mb-12">
              <ProfileCard
                onOpenModal={() => openModal("profile")}
                onHoverChange={(hovered) => setHover("profile", hovered)}
                image={image}
                isHovered={isHovered("profile")}
                title={t("about-section.resumen_profesional")}
                description={t("about-section.res-1")}
                imageContext="profile"
              />
              <ModalProfile
                isOpen={isModalOpen("profile")}
                image={image}
                onClose={handleCloseModal}
                title={t("about-section.resumen_profesional")}
                firstLine={t("about-section.res-2")}
                secondLine={t("about-section.res-2.1")}
                thirdLine={t("about-section.res-2.2")}
              />
            </div>
            <div className="flex justify-center mb-8 sm:mb-10 lg:mb-12">
              <ProfileCard
                onOpenModal={() => openModal("hobbies")}
                onHoverChange={(hovered) => setHover("hobbies", hovered)}
                image={hobbie}
                isHovered={isHovered("hobbies")}
                title={t("hobbies-section.my hobbies")}
                description={t("hobbies-section.hobbies")}
                imageContext="decorative"
              />
              <ModalProfile
                isOpen={isModalOpen("hobbies")}
                onClose={handleCloseModal}
                title={t("hobbies-section.my hobbies")}
                image={hobbie}
                secondLine={
                  <>
                    <h3 className="text-lg font-semibold mb-2">
                      {t("hobbies-section.hobbies-1")}
                    </h3>
                    <div className="space-y-3">
                      <div>
                        <p className="font-semibold">
                          {t("hobbies-section.hobbies-1.1")}
                        </p>
                        <p className="text-sm">
                          {t("hobbies-section.hobbies-1.2")}
                        </p>
                      </div>
                      
                      <div>
                        <p className="font-semibold">
                          {t("hobbies-section.hobbies-2")}
                        </p>
                        <p className="text-sm">
                          {t("hobbies-section.hobbies-2.1")}
                        </p>
                      </div>
                    </div>
                  </>
                }
                thirdLine={
                  <>
                    <h3 className="text-lg font-semibold mb-2">
                      {t("hobbies-section.hobbies-4")}
                    </h3>
                    <div className="space-y-2">
                      <p>
                        <span className="font-semibold">{t("hobbies-section.hobbies-4.1")}</span>{" "}
                        {t("hobbies-section.hobbies-4.2")}
                      </p>
                    </div>
                  </>
                }
              />
            </div>
            <div className="flex justify-center mb-8 sm:mb-10 lg:mb-12">
              <ProfileCard
                onOpenModal={() => openModal("goals")}
                onHoverChange={(hovered) => setHover("goals", hovered)}
                image={goals}
                isHovered={isHovered("goals")}
                title={t("goals-section.my goals")}
                description={t("goals-section.goals")}
                imageContext="decorative"
              />
              <ModalProfile
                isOpen={isModalOpen("goals")}
                onClose={handleCloseModal}
                title={t("goals-section.my goals")}
                image={goals}
                secondLine={
                  <>
                    <h3 className="text-lg font-semibold mb-2">
                      {t("goals-section.goals-1")}
                    </h3>
                    <div className="space-y-2">
                      <p>
                        <span className="font-semibold">{t("goals-section.goals-1.1")}</span>{" "}
                        {t("goals-section.goals-1.2")}
                      </p>
                    </div>
                  </>
                }
              />
            </div>
          </ResponsiveGrid>
        </div>
      </ResponsiveContainer>
    </div>
  );
}
