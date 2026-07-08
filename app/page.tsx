'use client';
import React, { useState, useEffect, useRef, useCallback } from 'react';
import { supabase } from '@/utils/supabase';
import {
  MessageCircle, X, Send, Paperclip, Mic, Square, Loader2, CheckCheck, FileText,
  Moon, Sun, Globe, Headphones, Sparkles
} from 'lucide-react';

export default function ChatWidgetPage() {
  /* ─── الحالة العامة ─── */
  const [lang, setLang] = useState<'ar' | 'en'>('ar');
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const [isOpen, setIsOpen] = useState(false);
  const [unread, setUnread] = useState(0);

  const isRTL = lang === 'ar';

  /* ─── حالة الشات ─── */
  const [messages, setMessages] = useState<any[]>([]);
  const [text, setText] = useState('');
  const [loading, setLoading] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const currentUserId = 'user_1';

  /* ─── المراجع ─── */
  const endRef = useRef<HTMLDivElement>(null);
  const fileRef = useRef<HTMLInputElement>(null);
  const recRef = useRef<MediaRecorder | null>(null);
  const chunksRef = useRef<Blob[]>([]);
  const streamRef = useRef<MediaStream | null>(null);

  /* ══════════════════════
     تبديل الثيم
     ══════════════════════ */
  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark');
  }, [theme]);

  const scrollDown = useCallback(() => {
    setTimeout(() => endRef.current?.scrollIntoView({ behavior: 'smooth' }), 80);
  }, []);

  useEffect(() => { scrollDown(); }, [messages, scrollDown]);

  /* ══════════════════════
     جلب الرسائل 
     ══════════════════════ */
  useEffect(() => {
    if (!isOpen) return;
    let alive = true;
    
    const load = async () => {
      try {
        const { data, error } = await supabase.from('messages').select('*').order('created_at', { ascending: false }).limit(50);
        if (data && alive) { setMessages(data.reverse()); scrollDown(); }
      } catch (err) { console.error(err); }
    };
    load();

    try {
      const ch = supabase.channel('widget').on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'messages' }, (p) => {
        if (!alive) return;
        setMessages(prev => prev.some(m => m.id === p.new.id) ? prev : [...prev, p.new]);
        if (!isOpen) setUnread(u => u + 1);
      }).subscribe();
      return () => { alive = false; supabase.removeChannel(ch); };
    } catch (err) {}
  }, [isOpen, scrollDown]);

  /* ══════════════════════
     تنظيف الميكروفون
     ══════════════════════ */
  useEffect(() => {
    return () => { streamRef.current?.getTracks().forEach(t => t.stop()); };
  }, []);

  /* ══════════════════════
     إرسال الرسائل
     ══════════════════════ */
  const sendText = async () => {
    if (!text.trim() || loading) return;
    const msg = text.trim();
    setText('');
    setLoading(true);
    try { await supabase.from('messages').insert([{ sender_id: currentUserId, content: msg }]); } catch (err) { setText(msg); }
    setLoading(false);
  };

  const uploadFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.size > 5 * 1024 * 1024) { alert(isRTL ? 'الحد الأقصى 5MB' : 'Max 5MB'); return; }
    setLoading(true);
    try {
      const ext = file.name.split('.').pop();
      const name = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}.${ext}`;
      await supabase.storage.from('chat-attachments').upload(name, file);
      const { data: url } = supabase.storage.from('chat-attachments').getPublicUrl(name);
      await supabase.from('messages').insert([{ sender_id: currentUserId, file_url: url.publicUrl }]);
    } catch (err) {}
    setLoading(false);
    e.target.value = '';
  };

  const startRec = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      streamRef.current = stream;
      const rec = new MediaRecorder(stream);
      recRef.current = rec;
      chunksRef.current = [];
      rec.ondataavailable = (ev) => { if (ev.data.size > 0) chunksRef.current.push(ev.data); };
      rec.onstop = async () => {
        setLoading(true);
        try {
          const blob = new Blob(chunksRef.current, { type: 'audio/webm' });
          const name = `voice-${Date.now()}.webm`;
          await supabase.storage.from('chat-audio').upload(name, blob);
          const { data: url } = supabase.storage.from('chat-audio').getPublicUrl(name);
          await supabase.from('messages').insert([{ sender_id: currentUserId, audio_url: url.publicUrl }]);
        } catch (err) {}
        setLoading(false);
      };
      rec.start();
      setIsRecording(true);
    } catch { alert(isRTL ? 'فعّل صلاحية الميكروفون' : 'Allow microphone'); }
  };

  const stopRec = () => {
    recRef.current?.stop();
    setIsRecording(false);
    streamRef.current?.getTracks().forEach(t => t.stop());
    streamRef.current = null;
  };

  return (
    <div dir={isRTL ? 'rtl' : 'ltr'} className="min-h-screen font-sans transition-colors duration-500 flex flex-col relative" style={{ background: 'var(--background)' }}>
      
      {/* ═══════════════════════════════════════
          واجهة الموقع (الصفحة الأساسية)
          ═══════════════════════════════════════ */}
      
      {/* ── الشريط العلوي (Navbar) ── */}
      <nav className="px-6 py-5 border-b flex items-center justify-between z-10 relative backdrop-blur-md bg-white/50 dark:bg-black/20" style={{ borderColor: 'var(--border)' }}>
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl flex items-center justify-center shadow-lg" style={{ background: 'var(--primary)' }}>
            <Sparkles size={20} style={{ color: 'var(--primary-foreground)' }} />
          </div>
          <span className="text-2xl font-black tracking-tight" style={{ color: 'var(--foreground)' }}>
            {isRTL ? 'نخلة' : 'Nakhla'}
          </span>
        </div>
        
        <div className="hidden sm:flex items-center gap-8 font-semibold text-sm" style={{ color: 'var(--muted-foreground)' }}>
          <a href="#" className="hover:text-black dark:hover:text-white transition">{isRTL ? 'الرئيسية' : 'Home'}</a>
          <a href="#" className="hover:text-black dark:hover:text-white transition">{isRTL ? 'الخدمات' : 'Services'}</a>
          <a href="#" className="hover:text-black dark:hover:text-white transition">{isRTL ? 'كيف نعمل' : 'How it works'}</a>
        </div>
        
        <div className="flex items-center gap-3">
          {/* ── زر تغيير اللغة والمظهر في الصفحة الرئيسية ── */}
          <div className="flex items-center gap-1 bg-black/5 dark:bg-white/5 rounded-xl p-1">
            <button onClick={() => setLang(l => l === 'ar' ? 'en' : 'ar')} className="px-3 py-1.5 rounded-lg hover:bg-black/10 dark:hover:bg-white/10 transition active:scale-95 text-xs font-bold flex items-center gap-1" style={{ color: 'var(--foreground)' }}>
              <Globe size={14} />
              {isRTL ? 'EN' : 'عربي'}
            </button>
            <button onClick={() => setTheme(t => t === 'light' ? 'dark' : 'light')} className="p-1.5 rounded-lg hover:bg-black/10 dark:hover:bg-white/10 transition active:scale-95" style={{ color: 'var(--foreground)' }}>
              {theme === 'light' ? <Moon size={15} /> : <Sun size={15} />}
            </button>
          </div>

          <button className="hidden sm:block px-5 py-2.5 rounded-xl font-bold text-sm shadow-md transition-all hover:scale-105 active:scale-95"
                  style={{ background: 'var(--foreground)', color: 'var(--background)' }}>
            {isRTL ? 'تسجيل الدخول' : 'Sign In'}
          </button>
        </div>
      </nav>

      {/* ── القسم الرئيسي (Hero Section) ── */}
      <main className="flex-1 flex flex-col items-center justify-center px-6 py-20 text-center relative z-10">
        <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-30">
          <div className="absolute -top-[20%] -right-[10%] w-[500px] h-[500px] rounded-full blur-[120px]" style={{ background: 'var(--primary)' }} />
          <div className="absolute bottom-[10%] -left-[10%] w-[400px] h-[400px] rounded-full blur-[100px]" style={{ background: 'var(--primary)' }} />
        </div>

        <span className="px-4 py-1.5 rounded-full text-xs font-bold mb-6 border bg-white/40 dark:bg-black/40 backdrop-blur-md" 
              style={{ color: 'var(--primary)', borderColor: 'var(--primary)' }}>
          {isRTL ? '✨ النظام الذكي لإدارة العهد' : '✨ Smart Asset Management System'}
        </span>
        
        <h1 className="text-4xl md:text-6xl font-black max-w-3xl leading-tight mb-6" style={{ color: 'var(--foreground)' }}>
          {isRTL ? 'تحكم بعهدتك وممتلكاتك' : 'Control Your Assets'} <br />
          <span style={{ color: 'var(--primary)' }}>{isRTL ? 'بكل سهولة وأمان' : 'Easily & Securely'}</span>
        </h1>
        
        <p className="text-lg md:text-xl max-w-2xl mb-10 leading-relaxed font-medium" style={{ color: 'var(--muted-foreground)' }}>
          {isRTL 
            ? 'منصة "نخلة" تمنحك تحكماً كاملاً في الأجهزة والمعدات، مع نظام متطور ودعم فني متاح على مدار الساعة للإجابة على استفساراتك.' 
            : 'The "Nakhla" platform gives you full control over your equipment, with an advanced system and 24/7 technical support.'}
        </p>
        
        <div className="flex items-center gap-4">
          <button className="px-8 py-4 rounded-2xl font-bold text-lg shadow-xl transition-all hover:scale-105 active:scale-95"
                  style={{ background: 'var(--primary)', color: 'var(--primary-foreground)' }}>
            {isRTL ? 'ابدأ تجربتك الآن' : 'Start Your Journey'}
          </button>
          <button className="px-8 py-4 rounded-2xl font-bold text-lg border-2 transition-all hover:bg-black/5 dark:hover:bg-white/5 active:scale-95"
                  style={{ borderColor: 'var(--border)', color: 'var(--foreground)' }}>
            {isRTL ? 'تعرف على المزيد' : 'Learn More'}
          </button>
        </div>
      </main>

      {/* ═══════════════════════════════════════
          نافذة الشات (Widget)
          ═══════════════════════════════════════ */}
      
      {/* ── زر فتح الشات العائم ── */}
      {!isOpen && (
        <button
          onClick={() => { setIsOpen(true); setUnread(0); }}
          className="fixed bottom-6 right-6 sm:bottom-8 sm:right-8 z-[9999] w-16 h-16 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 active:scale-95 shadow-2xl"
          style={{ background: 'var(--primary)', color: 'var(--primary-foreground)', boxShadow: '0 8px 30px color-mix(in oklch, var(--primary), transparent 50%)' }}
        >
          <MessageCircle size={30} strokeWidth={2.5} />
          {unread > 0 && (
            <span className="absolute -top-1 -right-1 w-6 h-6 rounded-full bg-red-500 text-white text-[12px] font-black flex items-center justify-center animate-bounce shadow-md border-2 border-white">
              {unread > 9 ? '9+' : unread}
            </span>
          )}
        </button>
      )}

      {/* ── نافذة الشات العائمة المتميزة ── */}
      {isOpen && (
        <div className="fixed bottom-0 right-0 sm:bottom-6 sm:right-6 z-[10000] w-full sm:w-[400px] h-[100dvh] sm:h-[650px] max-h-[100dvh] flex flex-col sm:rounded-[2rem] overflow-hidden shadow-[0_30px_80px_rgba(0,0,0,0.15)] border-0 sm:border transition-all duration-300 animate-in slide-in-from-bottom-10 zoom-in-95"
             style={{ borderColor: 'var(--border)', background: 'var(--card)' }}>
          
          {/* ── هيدر الشات (نظيف وبدون أزرار لغة) ── */}
          <div className="shrink-0 px-5 py-4 flex items-center justify-between z-10" style={{ background: 'var(--primary)', color: 'var(--primary-foreground)' }}>
            <div className="flex items-center gap-3 min-w-0">
              <div className="relative shrink-0">
                <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center shadow-inner">
                  <Headphones size={22} className="opacity-90" />
                </div>
                <span className="absolute bottom-0.5 rtl:right-0.5 ltr:left-0.5 w-3.5 h-3.5 rounded-full border-[2.5px] bg-emerald-400" style={{ borderColor: 'var(--primary)' }} />
              </div>
              <div className="min-w-0">
                <h3 className="font-extrabold text-base tracking-tight flex items-center gap-1.5">
                  {isRTL ? 'الدعم المباشر' : 'Live Support'}
                  <Sparkles size={14} className="opacity-70" />
                </h3>
                <p className="text-xs opacity-80 mt-0.5 font-medium">{isRTL ? 'متاح للرد على استفساراتك' : 'Ready to help you'}</p>
              </div>
            </div>
            
            <div className="flex items-center gap-1 shrink-0 bg-black/10 rounded-full p-1 backdrop-blur-md">
              <button onClick={() => setIsOpen(false)} className="p-2 rounded-full hover:bg-white/20 transition active:scale-95" title={isRTL ? 'إغلاق' : 'Close'}>
                <X size={18} strokeWidth={2.5} />
              </button>
            </div>
          </div>

          {/* ── منطقة الرسائل ── */}
          <div className="flex-1 overflow-y-auto px-5 py-6 space-y-4" style={{ background: 'var(--background)' }}>
            {messages.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full gap-4 opacity-40" style={{ color: 'var(--foreground)' }}>
                <div className="w-20 h-20 rounded-full border-2 border-dashed flex items-center justify-center mb-2" style={{ borderColor: 'var(--foreground)' }}>
                  <MessageCircle size={32} strokeWidth={1.5} />
                </div>
                <p className="text-sm font-bold tracking-wide">{isRTL ? 'كيف يمكننا مساعدتك اليوم؟' : 'How can we help you today?'}</p>
              </div>
            ) : (
              messages.map((msg: any) => {
                const me = msg.sender_id === currentUserId;
                return (
                  <div key={msg.id} className={`flex ${me ? 'justify-end' : 'justify-start'} animate-in slide-in-from-bottom-2 fade-in duration-300`}>
                    <div className="max-w-[85%] space-y-1">
                      <div
                        className={`px-4 py-3 text-[14px] leading-relaxed shadow-sm ${
                          me
                            ? 'rounded-2xl rounded-br-sm font-semibold'
                            : 'rounded-2xl rounded-bl-sm border font-medium'
                        }`}
                        style={me ? { background: 'var(--primary)', color: 'var(--primary-foreground)' } : { background: 'var(--card)', borderColor: 'var(--border)', color: 'var(--foreground)' }}
                      >
                        {msg.content && <p className="whitespace-pre-wrap">{msg.content}</p>}
                        {msg.file_url && (
                          msg.file_url.match(/\.(jpeg|jpg|gif|png|webp)$/i)
                            ? <img src={msg.file_url} alt="Attachment" loading="lazy" className="rounded-xl mt-2 max-h-48 w-full object-cover shadow-sm" />
                            : <a href={msg.file_url} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 mt-2 text-xs underline opacity-90 p-2 rounded-lg bg-black/5"><FileText size={15} />{isRTL ? 'تحميل المرفق' : 'Download File'}</a>
                        )}
                        {msg.audio_url && (
                          <div className="mt-2" dir="ltr"><audio controls preload="none" className="w-full h-10 rounded-full"><source src={msg.audio_url} /></audio></div>
                        )}
                      </div>
                      <div className={`text-[10px] px-1.5 font-bold opacity-40 flex items-center gap-1 ${me ? 'justify-end' : ''}`} style={{ color: 'var(--foreground)' }}>
                        {new Date(msg.created_at || Date.now()).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        {me && <CheckCheck size={13} style={{ color: 'var(--primary)' }} />}
                      </div>
                    </div>
                  </div>
                );
              })
            )}
            <div ref={endRef} />
          </div>

          {/* ── منطقة الإدخال ── */}
          <div className="shrink-0 px-4 py-3.5 border-t shadow-[0_-10px_30px_rgba(0,0,0,0.02)] z-10" style={{ borderColor: 'var(--border)', background: 'var(--card)' }}>
            <div className="flex items-end gap-2 relative">
              <input type="file" ref={fileRef} onChange={uploadFile} className="hidden" accept="image/*,application/pdf,.doc,.docx" />

              <button
                onClick={() => fileRef.current?.click()}
                disabled={loading || isRecording}
                className="p-3 rounded-2xl transition-all hover:bg-black/5 dark:hover:bg-white/5 active:scale-95 disabled:opacity-30 shrink-0 mb-0.5"
                style={{ color: 'var(--muted-foreground)' }}
                title={isRTL ? 'إرفاق ملف' : 'Attach File'}
              >
                <Paperclip size={20} />
              </button>

              <div className="flex-1 relative">
                <textarea
                  value={text}
                  onChange={e => setText(e.target.value)}
                  disabled={loading || isRecording}
                  placeholder={isRecording ? (isRTL ? '🎙️ جاري التسجيل...' : '🎙️ Recording...') : (isRTL ? 'اكتب رسالتك هنا...' : 'Type your message...')}
                  className="w-full px-4 py-3 rounded-2xl border text-sm font-medium transition-all focus:outline-none focus:ring-2 focus:ring-offset-1 resize-none max-h-32 min-h-[48px] shadow-sm leading-relaxed"
                  style={{ background: 'var(--background)', borderColor: 'var(--border)', color: 'var(--foreground)', outlineColor: 'var(--primary)' }}
                  rows={1}
                  onKeyDown={e => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); sendText(); } }}
                  onInput={(e) => {
                    const target = e.target as HTMLTextAreaElement;
                    target.style.height = '48px';
                    target.style.height = `${Math.min(target.scrollHeight, 120)}px`;
                  }}
                />
              </div>

              {text.trim() ? (
               <button
                  onClick={sendText}
                  disabled={loading}
                  className="p-3 rounded-2xl transition-all hover:scale-105 active:scale-90 disabled:opacity-40 shrink-0 shadow-md mb-0.5"
                  style={{ background: 'var(--primary)', color: 'var(--primary-foreground)' }}
                >
                  {loading ? <Loader2 size={20} className="animate-spin" /> : <Send size={20} className={isRTL ? 'rotate-180' : ''} />}
                </button>
              ) : (
                <button
                  onClick={isRecording ? stopRec : startRec}
                  disabled={loading}
                  className={`p-3 rounded-2xl transition-all hover:scale-105 active:scale-90 disabled:opacity-40 shrink-0 shadow-md mb-0.5 ${isRecording ? 'animate-pulse' : ''}`}
                  style={{ background: isRecording ? 'var(--destructive)' : 'var(--primary)', color: 'var(--primary-foreground)' }}
                >
                  {loading ? <Loader2 size={20} className="animate-spin" /> : isRecording ? <Square size={20} /> : <Mic size={20} />}
                </button>
              )}
            </div>
          </div>

        </div>
      )}
    </div>
  );
}
