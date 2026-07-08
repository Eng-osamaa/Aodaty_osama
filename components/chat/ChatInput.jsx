'use client';
import React, { useState, useRef, useEffect } from 'react';
import { supabase } from '@/utils/supabase';
import { Send, Paperclip, Mic, Square, Loader2, Smile, AlertCircle } from 'lucide-react';

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5 MB

export default function ChatInput({ currentUserId = 'user_1', lang = 'ar' }) {
  const [text, setText] = useState('');
  const [loading, setLoading] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [notification, setNotification] = useState(null);
  
  const fileInputRef = useRef(null);
  const mediaRecorderRef = useRef(null);
  const audioChunksRef = useRef([]);
  const streamRef = useRef(null);

  useEffect(() => {
    return () => {
      if (streamRef.current) {
        streamRef.current.getTracks().forEach(track => track.stop());
      }
    };
  }, []);

  const showNotification = (message, type = 'error') => {
    setNotification({ message, type });
    setTimeout(() => {
      setNotification(null);
    }, 3000);
  };

  const handleSendText = async (e) => {
    if (e) e.preventDefault();
    if (!text.trim() || loading) return;
    
    setLoading(true);
    try {
      const { error } = await supabase.from('messages').insert([{ sender_id: currentUserId, content: text.trim() }]);
      if (error) throw error;
      setText('');
    } catch (error) {
      showNotification(lang === 'ar' ? 'فشل الإرسال، حاول مجدداً.' : 'Failed to send.');
    } finally {
      setLoading(false);
    }
  };

  const handleFileUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > MAX_FILE_SIZE) {
      showNotification(lang === 'ar' ? 'حجم الملف يجب أن لا يتجاوز 5 ميجابايت' : 'File size must be less than 5MB');
      return;
    }

    setLoading(true);
    try {
      const fileExt = file.name.split('.').pop();
      const fileName = `${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`;
      
      const { error: uploadError } = await supabase.storage.from('chat-attachments').upload(fileName, file);
      if (uploadError) throw uploadError;

      const { data: urlData } = supabase.storage.from('chat-attachments').getPublicUrl(fileName);
      await supabase.from('messages').insert([{ sender_id: currentUserId, file_url: urlData.publicUrl }]);
      
    } catch (error) {
      showNotification(lang === 'ar' ? 'فشل رفع الملف.' : 'Upload failed.');
    } finally {
      setLoading(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      streamRef.current = stream;
      mediaRecorderRef.current = new MediaRecorder(stream);
      audioChunksRef.current = [];

      mediaRecorderRef.current.ondataavailable = (event) => {
        if (event.data.size > 0) audioChunksRef.current.push(event.data);
      };

      mediaRecorderRef.current.onstop = async () => {
        setLoading(true);
        try {
          const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/webm' });
          const fileName = `voice-${Date.now()}.webm`;
          
          const { error: uploadError } = await supabase.storage.from('chat-audio').upload(fileName, audioBlob);
          if (uploadError) throw uploadError;

          const { data: urlData } = supabase.storage.from('chat-audio').getPublicUrl(fileName);
          await supabase.from('messages').insert([{ sender_id: currentUserId, audio_url: urlData.publicUrl }]);
        } catch (error) {
          showNotification(lang === 'ar' ? 'فشل إرسال الصوت.' : 'Failed to send audio.');
        } finally {
          setLoading(false);
        }
      };

      mediaRecorderRef.current.start();
      setIsRecording(true);
    } catch (err) {
      showNotification(lang === 'ar' ? 'الرجاء السماح باستخدام الميكروفون' : 'Please allow microphone access');
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
      if (streamRef.current) {
        streamRef.current.getTracks().forEach(track => track.stop());
      }
    }
  };

  return (
    <div className="p-4 md:p-6 bg-white/50 dark:bg-black/20 backdrop-blur-md border-t relative" style={{ borderColor: 'var(--border)' }}>
      {notification && (
        <div className="absolute -top-12 left-1/2 -translate-x-1/2 bg-red-500 text-white px-4 py-2 rounded-full shadow-lg flex items-center gap-2 text-sm font-medium animate-in fade-in slide-in-from-bottom-4 duration-300 z-50">
          <AlertCircle size={16} />
          {notification.message}
        </div>
      )}
      <div className="max-w-4xl mx-auto flex items-end gap-3">
        
        <input type="file" ref={fileInputRef} onChange={handleFileUpload} accept="image/*, application/pdf, .doc, .docx" className="hidden" />
        
        <button
          type="button"
          onClick={() => fileInputRef.current?.click()}
          disabled={loading || isRecording}
          className="p-3.5 rounded-2xl bg-white dark:bg-zinc-800 hover:bg-gray-50 dark:hover:bg-zinc-700 transition-all shadow-sm border active:scale-95 flex-shrink-0 disabled:opacity-50"
          style={{ borderColor: 'var(--border)', color: 'var(--foreground)' }}
        >
          <Paperclip size={22} />
        </button>

        <form onSubmit={handleSendText} className="flex-1 relative">
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            disabled={loading || isRecording}
            rows={1}
            placeholder={isRecording ? (lang === 'ar' ? 'جارٍ تسجيل الصوت...' : 'Recording...') : (lang === 'ar' ? 'اكتب رسالتك هنا...' : 'Type your message here...')}
            className="w-full pl-12 pr-12 py-4 rounded-2xl border focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm transition-all resize-none overflow-hidden text-base font-medium disabled:opacity-50"
            style={{ backgroundColor: 'var(--card)', borderColor: 'var(--border)', color: 'var(--foreground)' }}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                handleSendText(e);
              }
            }}
          />
          <div className="absolute left-4 top-1/2 -translate-y-1/2 opacity-40 hover:opacity-100 cursor-pointer transition-opacity">
            <Smile size={22} style={{ color: 'var(--foreground)' }} />
          </div>
        </form>

        {text.trim() ? (
          <button
            onClick={handleSendText}
            disabled={loading}
            className="p-4 rounded-2xl text-white transition-all hover:scale-105 active:scale-95 shadow-lg flex items-center justify-center flex-shrink-0 bg-gradient-to-r from-blue-600 to-indigo-600 disabled:opacity-50 disabled:hover:scale-100"
          >
            {loading ? <Loader2 size={22} className="animate-spin" /> : <Send size={22} />}
          </button>
        ) : (
          <button
            type="button"
            onClick={isRecording ? stopRecording : startRecording}
            disabled={loading}
            className={`p-4 rounded-2xl text-white transition-all hover:scale-105 active:scale-95 shadow-lg flex items-center justify-center flex-shrink-0 disabled:opacity-50 disabled:hover:scale-100 ${
              isRecording ? 'animate-pulse bg-red-500 shadow-red-500/40' : 'bg-gradient-to-r from-blue-600 to-indigo-600'
            }`}
          >
            {loading ? <Loader2 size={22} className="animate-spin" /> : (isRecording ? <Square size={22} /> : <Mic size={22} />)}
          </button>
        )}
      </div>
    </div>
  );
}
