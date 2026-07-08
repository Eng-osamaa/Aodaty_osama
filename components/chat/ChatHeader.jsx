'use client';
import React, { useState } from 'react';
import { Phone, Video, X, MoreVertical } from 'lucide-react';

export default function ChatHeader({ lang = 'ar' }) {
  const [activeCall, setActiveCall] = useState(null);

  return (
    <>
      <div className="px-6 py-4 flex justify-between items-center border-b bg-white/50 dark:bg-black/20 backdrop-blur-md" style={{ borderColor: 'var(--border)' }}>
        <div className="flex items-center gap-4">
          <div className="relative">
            <div className="w-12 h-12 rounded-full flex items-center justify-center font-bold text-xl text-white shadow-lg bg-gradient-to-tr from-blue-600 to-indigo-400">
              أ
            </div>
            <span className="absolute bottom-0 right-0 w-3.5 h-3.5 rounded-full border-2 border-white dark:border-zinc-900 bg-green-500"></span>
          </div>
          <div>
            <h3 className="font-extrabold text-lg tracking-tight" style={{ color: 'var(--foreground)' }}>
              {lang === 'ar' ? 'أحمد (الدعم المتميز)' : 'Ahmed (Premium Support)'}
            </h3>
            <p className="text-xs font-medium opacity-70 flex items-center gap-1" style={{ color: 'var(--foreground)' }}>
              {lang === 'ar' ? 'متصل ومستعد للمساعدة' : 'Online and ready to help'}
            </p>
          </div>
        </div>

        <div className="flex gap-3">
          <button onClick={() => setActiveCall('audio')} className="p-2.5 rounded-full hover:bg-black/5 dark:hover:bg-white/10 transition-all hover:scale-110 active:scale-95">
            <Phone size={22} style={{ color: 'var(--primary)' }} />
          </button>
          <button onClick={() => setActiveCall('video')} className="p-2.5 rounded-full hover:bg-black/5 dark:hover:bg-white/10 transition-all hover:scale-110 active:scale-95">
            <Video size={24} style={{ color: 'var(--primary)' }} />
          </button>
          <button className="p-2.5 rounded-full hover:bg-black/5 dark:hover:bg-white/10 transition-all hover:scale-110 active:scale-95 opacity-50 hover:opacity-100">
            <MoreVertical size={22} style={{ color: 'var(--foreground)' }} />
          </button>
        </div>
      </div>

      {activeCall && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 backdrop-blur-xl bg-black/40 transition-all duration-300">
          <div className="bg-white dark:bg-zinc-900 p-8 rounded-[2rem] w-full max-w-sm text-center shadow-[0_20px_50px_rgba(0,0,0,0.3)] flex flex-col items-center gap-6 border border-white/10" style={{ animation: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite' }}>
            <div className="relative">
              <div className="absolute inset-0 rounded-full animate-ping opacity-20" style={{ backgroundColor: 'var(--primary)' }}></div>
              <div className="w-24 h-24 rounded-full flex items-center justify-center text-white font-bold text-3xl shadow-2xl relative z-10 bg-gradient-to-br from-blue-500 to-indigo-600">
                {activeCall === 'video' ? <Video size={40} /> : <Phone size={40} />}
              </div>
            </div>
            <div>
              <h4 className="text-2xl font-black mb-1" style={{ color: 'var(--foreground)' }}>
                {lang === 'ar' ? (activeCall === 'video' ? 'مكالمة فيديو...' : 'اتصال صوتي...') : (activeCall === 'video' ? 'Video Calling...' : 'Audio Calling...')}
              </h4>
              <p className="text-sm opacity-60" style={{ color: 'var(--foreground)' }}>
                {lang === 'ar' ? 'يتم الاتصال بالدعم الفني' : 'Connecting to support'}
              </p>
            </div>
            <button
              onClick={() => setActiveCall(null)}
              className="mt-4 bg-red-500 hover:bg-red-600 text-white p-4 rounded-full flex items-center justify-center transition-all hover:scale-110 active:scale-95 shadow-[0_10px_20px_rgba(239,68,68,0.3)]"
            >
              <X size={28} />
            </button>
          </div>
        </div>
      )}
    </>
  );
}
