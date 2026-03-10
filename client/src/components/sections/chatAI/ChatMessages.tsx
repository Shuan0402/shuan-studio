import React, { useEffect, useRef } from 'react';
import ReactMarkdown from 'react-markdown'; // 引入 Markdown 渲染組件
import type { Message } from './hooks/useChat';

interface ChatMessagesProps {
  messages: Message[];
  isLoading: boolean;
}

const ChatMessages: React.FC<ChatMessagesProps> = ({ messages, isLoading }) => {
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTo({
        top: scrollRef.current.scrollHeight,
        behavior: 'smooth'
      });
    }
  }, [messages, isLoading]);

  if (messages.length === 0) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center text-center p-6">
        <div className="max-w-md space-y-4 md:space-y-6 opacity-50">
          <div className="w-16 h-16 md:w-20 md:h-20 bg-stone-50 rounded-[2rem] md:rounded-[2.5rem] flex items-center justify-center mx-auto mb-4 md:mb-6 border border-stone-100 shadow-inner">
            <svg className="w-8 h-8 md:w-10 md:h-10 text-stone-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
            </svg>
          </div>
          <h4 className="text-stone-700 font-black text-xl md:text-2xl tracking-tight">Digital Soul System</h4>
          <p className="text-stone-400 text-xs md:text-sm leading-relaxed font-medium px-4">
            正在整理 RAG 資料庫，未來將能即時回答我的經歷、技能與專案細節。
          </p>
        </div>
      </div>
    );
  }

  return (
    <div 
      ref={scrollRef} 
      className="flex-1 p-4 md:p-8 overflow-y-auto w-full space-y-4 scroll-smooth custom-scrollbar"
    >
      <div className="max-w-3xl mx-auto w-full space-y-4 md:space-y-6 py-2 md:py-4">
        {messages.map((msg, i) => (
          <div 
            key={i} 
            className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'} animate-in fade-in slide-in-from-bottom-2 duration-300`}
          >
            <div className={`max-w-[85%] md:max-w-[80%] px-4 md:px-6 py-3 md:py-4 rounded-[20px] md:rounded-[24px] text-xs md:text-sm leading-relaxed shadow-sm 
                break-words whitespace-pre-wrap 
                ${
                    msg.role === 'user' 
                    ? 'bg-stone-800 text-white rounded-tr-none' 
                    : 'bg-white text-stone-700 border border-stone-100 rounded-tl-none'
                }`}
                >
                <div className={`prose prose-sm max-w-none ${msg.role === 'user' ? 'prose-invert text-white' : 'text-stone-700'}`}>
                    <ReactMarkdown>
                    {msg.content}
                    </ReactMarkdown>
                </div>
            </div>
          </div>
        ))}
        
        {isLoading && (
          <div className="flex justify-start">
            <div className="bg-stone-100 text-stone-400 px-5 py-2 md:px-6 md:py-3 rounded-full text-[10px] md:text-xs animate-pulse">
              Shuan is thinking...
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ChatMessages;