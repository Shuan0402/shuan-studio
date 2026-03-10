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
      className="w-full h-full px-10 flex flex-col items-center py-10 overflow-hidden"
    >
      <div className="w-full max-w-7xl mb-12 flex-none text-left">
        <h2 className="text-stone-400 text-xs tracking-[0.5em] uppercase font-black">CHAT AI</h2>
      </div>

      <div className="relative w-full max-w-7xl flex-1 rounded-[32px] overflow-hidden bg-white/70 backdrop-blur-sm border border-stone-200 shadow-sm flex flex-col min-h-0">
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