import React from 'react';

interface CardProps {
  title: string;
  description: string;
  icon?: React.ReactNode;
  className?: string;
  children?: React.ReactNode;
}

export const Card: React.FC<CardProps> = ({ title, description, icon, className = "", children }) => {
  return (
    <div className={`p-6 bg-white dark:bg-dark-card border border-gray-100 dark:border-dark-border rounded-2xl shadow-sm hover:shadow-md transition-shadow duration-300 ${className}`}>
      {icon && (
        <div className="w-12 h-12 rounded-xl bg-brand-50 dark:bg-brand-900/30 text-brand-500 flex items-center justify-center mb-4">
          {icon}
        </div>
      )}
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2 tracking-tight">
        {title}
      </h3>
      <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed mb-4">
        {description}
      </p>
      {children}
    </div>
  );
};
