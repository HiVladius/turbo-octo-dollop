// Global types for the application
import React, { JSX } from "react";

export interface GitHubRepo {
  id: number;
  name: string;
  description: string;
  html_url: string;
  stargazers_count: number;
  forks_count: number;
  language: string | null;
  updated_at: string | null;
  topics: string[];
  image_url?: string | null;
}

export interface ContactFormData {
  name: string;
  email: string;
  message: string;
}

export interface UserPreferences {
  theme: 'dark' | 'light';
  animationsEnabled: boolean;
  autoLanguageDetection: boolean;
  emailNotifications: boolean;
}

export type Section = 'home' | 'about' | 'projects' | 'contact';
export type Theme = 'dark' | 'light';
export type ModalType = 'profile' | 'hobbies' | 'goals';
export type Language = 'es' | 'en';

// Email related types
export interface MailData {
  from: string;
  to: [string];
  subject: string;
  html: string;
}

export interface SendMailResponse {
  success: boolean;
  message: string;
}

// Navigation related types
export interface ProfileOption {
  id: string;
  title: string;
  icon: JSX.Element;
}

// Component props types
export interface ProfileCardProps {
  onOpenModal: () => void;
  onHoverChange: (hovered: boolean) => void;
  image: string;
  isHovered: boolean;
  title: string;
  description: string;
}

export interface ModalProfileProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  firstLine?: React.ReactNode;
  secondLine?: React.ReactNode;
  thirdLine?: React.ReactNode;
  image: string;
}

export interface OptimizedImageProps {
  src: string;
  alt: string;
  className?: string;
  width: number;
  height: number;
}
