
"use client";

import React, { createContext, useState, useContext, ReactNode } from 'react';

// This file is kept for potential future use but is not currently active.
// The application has been switched to a single-language version (French).
// To re-enable multi-language support, this context would need to be
// re-integrated into the application layout and components.

type Language = 'en' | 'fr';

interface LanguageContextType {
  language: Language;
  setLanguage: (language: Language) => void;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguage] = useState<Language>('fr'); // Default to French

  return (
    <LanguageContext.Provider value={{ language, setLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
