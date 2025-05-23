import { ChevronDown } from "lucide-react";
import { useTranslation } from "react-i18next";
import { OptimizedImage } from "../common/OptimizedImage";

interface ProfileCardProps {
    onOpenModal: () => void;
    onHoverChange: (hovered: boolean) => void;
    image: string;
    isHovered: boolean;
    title: string;
    description: string;
}

export function ProfileCard(
    { onOpenModal, onHoverChange, isHovered, title, description, image }:ProfileCardProps,) 
{
    const { t } = useTranslation();    return (
        <div
            className="relative w-full max-w-sm sm:max-w-md lg:max-w-96 rounded-xl overflow-hidden cursor-pointer shadow-2xl transition-all duration-300 hover:shadow-red-500/20 mx-auto my-4 sm:my-6 lg:my-8"
            onMouseEnter={() => onHoverChange(true)}
            onMouseLeave={() => onHoverChange(false)}
            onClick={onOpenModal}
        >
            <OptimizedImage
                src={image}
                alt={title}
                responsive={true}
                aspectRatio="square"
                className="w-full h-64 sm:h-80 lg:h-96"
            />

            <div
                className={`absolute inset-0 bg-gradient-to-t from-black/90 via-black/70 to-transparent backdrop-blur-[2px] p-4 sm:p-6 flex flex-col justify-end transition-all duration-300 ${
                    isHovered
                        ? "opacity-100 translate-y-0"
                        : "opacity-0 translate-y-4"
                }`}
            >
                <h3 className="text-lg sm:text-xl lg:text-2xl font-bold mb-2 text-white/90">
                    {title}
                </h3>
                <p className="text-white/80 line-clamp-3 mb-3 sm:mb-4 text-sm leading-relaxed">
                    {description}
                </p>
                <button
                    onClick={(e) => {
                        e.stopPropagation();
                        onOpenModal();
                    }}
                    className="flex items-center gap-2 text-white/90 hover:text-red-500 transition-colors group text-sm sm:text-base"
                >
                    <span>{t("more-info.info")}</span>
                    <ChevronDown
                        className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                        size={16}
                    />
                </button>
            </div>
        </div>
    );
}
