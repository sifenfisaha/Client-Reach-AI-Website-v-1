import { ReactNode } from 'react';

export interface LayoutProps {
  children: ReactNode;
}

export type Theme = 'light' | 'dark';

export interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
}

export interface Testimonial {
  quote: string;
  author: string;
  role: string;
}

export interface StatItem {
  value: string;
  label: string;
  description: string;
}

export interface AgentFeature {
  title: string;
  description: string;
  features: string[];
  icon: ReactNode;
}
