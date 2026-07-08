'use client';
import React, { useState, useEffect } from 'react';
import ChatHeader from '@/components/chat/ChatHeader';
import ChatMessages from '@/components/chat/ChatMessages';
import ChatInput from '@/components/chat/ChatInput';
import { Moon, Sun, Languages } from 'lucide-react';

export default function ChatPage() {
  const [lang, setLang] = useState<'ar' | 'en'>('ar');
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const isRTL = lang === 'ar';

  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  }, [theme]);

  const toggleTheme = () => setTheme(prev => prev === 'light' ? 'dark' : 'light');

  return (
    <div dir={isRTL ? 'rtl' : 'ltr'} className="min-h-screen flex flex-col items-center justify-center p-2 md:p-6 transition-colors duration-300" style={{ backgroundColor: 'var(--background)' }}>
      
      {/* شريط الإعدادات: تغيير اللغة والوضع الليلي */}
      <div className="mb-6 flex gap-3 bg-card p-2 rounded-xl border shadow-sm backdrop-blur-sm" style={{ borderColor: 'var(--border)', backgroundColor: 'var(--card)' }}>
        
        <button
          onClick={() => setLang(lang === 'ar' ? 'en' : 'ar')}
          className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-bold transition-all hover:opacity-80 active:scale-95"
          style={{ backgroundColor: 'var(--primary)', color: 'var(--primary-foreground)' }}
        >
          <Languages size={18} />
          {lang === 'ar' ? 'English' : 'عربي'}
        </button>

        <button
          onClick={toggleTheme}
          className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-bold transition-all hover:opacity-80 active:scale-95"
          style={{ backgroundColor: 'var(--secondary)', color: 'var(--secondary-foreground)' }}
        >
          {theme === 'light' ? <Moon size={18} /> : <Sun size={18} />}
          {theme === 'light' ? (lang === 'ar' ? 'الوضع الليلي' : 'Dark Mode') : (lang === 'ar' ? 'الوضع النهاري' : 'Light Mode')}
        </button>

      </div>

      {/* بوكس المحادثة الرئيسي */}
      <div className="w-full max-w-4xl h-[85vh] border rounded-2xl shadow-2xl flex flex-col overflow-hidden transition-all duration-300" style={{ borderColor: 'var(--border)', backgroundColor: 'var(--card)' }}>
        <ChatHeader lang={lang} />
        <ChatMessages currentUserId="user_1" />
        <ChatInput currentUserId="user_1" lang={lang} />
      </div>

    </div>
  );
}
