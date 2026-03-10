import React, { useEffect, useRef } from 'react';
import type { Message } from './hooks/useChat';

interface ChatMessagesProps {
  messages: Message[];
  isLoading: boolean;
}

const ChatMessages: React.FC<ChatMessagesProps> = ({ messages, isLoading }) => {
  const scrollRef = useRef<HTMLDivElement>(null);

  // 自動捲動到底部
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isLoading]);

  if (messages.length === 0) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center text-center">
        <div className="max-w-md space-y-6 opacity-50">
          <div className="w-20 h-20 bg-stone-50 rounded-[2.5rem] flex items-center justify-center mx-auto mb-6 border border-stone-100 shadow-inner">
            <svg className="w-10 h-10 text-stone-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
            </svg>
          </div>
          <h4 className="text-stone-700 font-black text-2xl tracking-tight">Digital Soul System</h4>
          <p className="text-stone-400 text-sm leading-relaxed font-medium">
            正在整理 RAG 資料庫，未來將能即時回答我的經歷、技能與專案細節。
          </p>
        </div>
      </div>
    );
  }

  return (
    <div ref={scrollRef} className="flex-1 p-8 overflow-y-auto w-full space-y-4">
      <div className="max-w-3xl mx-auto w-full space-y-6 py-4">
        {messages.map((msg, i) => (
          <div 
            key={i} 
            className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'} animate-in fade-in slide-in-from-bottom-2 duration-300`}
          >
            <div className={`max-w-[80%] px-6 py-4 rounded-[24px] text-sm leading-relaxed shadow-sm ${
              msg.role === 'user' 
              ? 'bg-stone-800 text-white rounded-tr-none' 
              : 'bg-white text-stone-700 border border-stone-100 rounded-tl-none'
            }`}>
              {msg.content}
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex justify-start">
            <div className="bg-stone-100 text-stone-400 px-6 py-3 rounded-full text-xs animate-pulse">
              Shuan is thinking...
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ChatMessages;