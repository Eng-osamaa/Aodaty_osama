'use client';
import React, { useEffect, useState, useRef, useCallback } from 'react';
import { supabase } from '@/utils/supabase';
import { FileText, CheckCheck } from 'lucide-react';

const MessageItem = React.memo(({ msg, isMe }) => {
  const [isVisible, setIsVisible] = useState(false);
  
  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <div className={`flex w-full transition-all duration-500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'} ${isMe ? 'justify-end' : 'justify-start'}`}>
      <div className={`flex flex-col ${isMe ? 'items-end' : 'items-start'} max-w-[85%] md:max-w-[70%]`}>
        <div
          className={`relative p-4 shadow-md ${
            isMe 
              ? 'rounded-[1.5rem] rounded-br-sm text-white bg-gradient-to-br from-blue-600 to-indigo-600' 
              : 'rounded-[1.5rem] rounded-bl-sm bg-white dark:bg-zinc-800'
          }`}
          style={{
            color: isMe ? '#fff' : 'var(--foreground)',
            border: isMe ? 'none' : '1px solid var(--border)'
          }}
        >
          {msg.content && <p className="text-[15px] leading-relaxed whitespace-pre-wrap font-medium">{msg.content}</p>}
          
          {msg.file_url && (
            <div className="mt-2">
              {msg.file_url.match(/\.(jpeg|jpg|gif|png|webp)$/i) ? (
                <img src={msg.file_url} alt="attachment" loading="lazy" className="rounded-xl max-h-60 object-cover w-full shadow-sm hover:scale-[1.02] transition-transform cursor-pointer" />
              ) : (
                <a href={msg.file_url} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 p-3 rounded-xl bg-black/10 hover:bg-black/20 text-sm font-bold transition-colors">
                  <FileText size={20} /> <span>{isMe ? 'View File' : 'فتح المرفق'}</span>
                </a>
              )}
            </div>
          )}

          {msg.audio_url && (
            <div className="mt-3 bg-black/10 p-2 rounded-xl backdrop-blur-md" dir="ltr">
              <audio controls preload="none" className="w-56 h-10">
                <source src={msg.audio_url} />
              </audio>
            </div>
          )}
        </div>
        
        <div className={`flex items-center gap-1 mt-1.5 px-2 opacity-60 text-[11px] font-bold ${isMe ? 'justify-end' : 'justify-start'}`} style={{ color: 'var(--foreground)' }}>
          <span>{new Date(msg.created_at || Date.now()).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
          {isMe && <CheckCheck size={14} className="text-blue-500" />}
        </div>
      </div>
    </div>
  );
});
MessageItem.displayName = 'MessageItem';

export default function ChatMessages({ currentUserId = 'user_1', lang = 'ar' }) {
  const [messages, setMessages] = useState([]);
  const messagesEndRef = useRef(null);

  const scrollToBottom = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, []);

  useEffect(() => {
    let isMounted = true;

    const fetchMessages = async () => {
      const { data, error } = await supabase
        .from('messages')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(50);
        
      if (!error && data && isMounted) {
        setMessages(data.reverse());
        setTimeout(scrollToBottom, 100);
      }
    };

    fetchMessages();

    const channel = supabase
      .channel('chat-room')
      .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'messages' }, (payload) => {
        if (isMounted) {
          setMessages((prev) => {
            if (prev.some(msg => msg.id === payload.new.id)) return prev;
            return [...prev, payload.new];
          });
          setTimeout(scrollToBottom, 100);
        }
      })
      .subscribe();

    return () => {
      isMounted = false;
      supabase.removeChannel(channel);
    };
  }, [scrollToBottom]);

  return (
    <div className="flex-1 overflow-y-auto p-4 md:p-6 space-y-6 scroll-smooth bg-transparent custom-scrollbar">
      {messages.length === 0 ? (
        <div className="flex flex-col h-full items-center justify-center opacity-40 text-center animate-pulse" style={{ color: 'var(--foreground)' }}>
          <div className="w-20 h-20 rounded-full bg-black/5 dark:bg-white/5 flex items-center justify-center mb-4">
            <CheckCheck size={40} />
          </div>
          <p className="text-lg font-bold">{lang === 'ar' ? 'ابدأ المحادثة الآن...' : 'Start the conversation...'}</p>
        </div>
      ) : (
        messages.map((msg) => (
          <MessageItem key={msg.id} msg={msg} isMe={msg.sender_id === currentUserId} />
        ))
      )}
      <div ref={messagesEndRef} />
    </div>
  );
}
