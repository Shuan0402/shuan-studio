import React from 'react';

interface ChatInputProps {
  input: string;
  setInput: (val: string) => void;
  onSend: () => void;
  isLoading: boolean;
}

const ChatInput: React.FC<ChatInputProps> = ({ input, setInput, onSend, isLoading }) => {
  return (
    <div className="p-10 bg-stone-50/30 border-t border-stone-100 flex-none">
      <div className="max-w-3xl mx-auto">
        <div className="relative group">
          <input 
            type="text" 
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => { if (e.key === 'Enter') onSend(); }}
            placeholder={isLoading ? "Shuan is thinking..." : "Ask me anything..."}
            className={`w-full bg-white border border-stone-200 rounded-2xl px-7 py-5 pr-16 text-stone-800 shadow-sm focus:outline-none focus:ring-2 focus:ring-stone-200 transition-all font-medium ${
              isLoading ? 'cursor-wait opacity-50' : 'cursor-text'
            }`}
            disabled={isLoading}
          />
          <button 
            onClick={onSend}
            disabled={isLoading || !input.trim()}
            className="absolute right-4 top-1/2 -translate-y-1/2 p-2 text-stone-300 hover:text-stone-800 disabled:opacity-30 transition-colors"
          >
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" />
            </svg>
          </button>
        </div>
        <p className="text-[9px] text-stone-400 text-center mt-4 font-bold uppercase tracking-[0.2em] opacity-50">
          Training Mode Enabled • v0.1-alpha
        </p>
      </div>
    </div>
  );
};

export default ChatInput;