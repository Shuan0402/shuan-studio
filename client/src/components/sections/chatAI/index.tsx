import { forwardRef } from 'react';
import ChatMessages from './ChatMessages';
import ChatInput from './ChatInput';
import { useChat } from './hooks/useChat';

interface SectionProps {
  id: string;
}

const ChatAI = forwardRef<HTMLElement, SectionProps>((props, ref) => {
  const { input, setInput, messages, isLoading, handleSend } = useChat();

  return (
    <section 
      id={props.id} 
      ref={ref} 
      className="w-full h-full px-4 md:px-10 flex flex-col items-center py-6 md:py-10 overflow-hidden"
    >
      {/* 標題區塊 */}
      <div className="w-full max-w-7xl mb-6 md:mb-12 flex-none text-left">
        <h2 className="text-stone-400 text-xs tracking-[0.5em] uppercase font-black text-center md:text-left">
          CHAT AI
        </h2>
      </div>

      {/* 對話主容器 */}
      <div className="relative w-full max-w-7xl flex-1 rounded-[24px] md:rounded-[32px] overflow-hidden bg-white/70 backdrop-blur-sm border border-stone-200 shadow-sm flex flex-col min-h-0">
        <ChatMessages messages={messages} isLoading={isLoading} />
        
        <ChatInput 
          input={input} 
          setInput={setInput} 
          onSend={handleSend} 
          isLoading={isLoading} 
        />
      </div>
    </section>
  );
});

ChatAI.displayName = 'ChatAI';
export default ChatAI;