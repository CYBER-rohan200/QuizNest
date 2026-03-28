import React from 'react';
import { useLanguage, type Language } from '../context/LanguageContext';

export const LanguageSwitcher: React.FC = () => {
  const { language, setLanguage } = useLanguage();

  return (
    <div className="relative inline-flex items-center">
      <select
        value={language}
        onChange={(e) => setLanguage(e.target.value as Language)}
        className="appearance-none bg-black/80 text-emerald-100 border border-emerald-500/50 rounded-xl pl-3 pr-8 py-1.5 text-sm font-medium outline-none focus:ring-2 focus:ring-emerald-400/50 focus:border-emerald-400 transition-all duration-300 shadow-[0_0_15px_rgba(16,185,129,0.2)] hover:shadow-[0_0_20px_rgba(16,185,129,0.3)] hover:border-emerald-400 hover:bg-emerald-500/10 cursor-pointer backdrop-blur-sm"
      >
        <option value="en" className="bg-[#02040a] text-emerald-100">Eng (English)</option>
        <option value="hi" className="bg-[#02040a] text-emerald-100">हिंदी (Hindi)</option>
        <option value="te" className="bg-[#02040a] text-emerald-100">తెలుగు (Telugu)</option>
      </select>
      <div className="pointer-events-none absolute right-2.5 flex items-center text-emerald-400 drop-shadow-[0_0_8px_rgba(52,211,153,0.8)]">
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" />
        </svg>
      </div>
    </div>
  );
};
