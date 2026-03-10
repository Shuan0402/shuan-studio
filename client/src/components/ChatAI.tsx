import { forwardRef } from 'react';

interface SectionProps {
  id: string;
}

const ChatAI = forwardRef<HTMLElement, SectionProps>((props, ref) => {
  return (
    <section 
      id={props.id} 
      ref={ref} 
      // 1. 確保 Section 佔滿父層 100% 高度
      className="w-full h-full px-10 flex flex-col items-center py-10 overflow-hidden"
    >
      {/* 標題區保持 flex-none，這很正確 */}
      <div className="w-full max-w-7xl mb-12 flex-none text-left">
        <h2 className="text-stone-400 text-xs tracking-[0.5em] uppercase font-black">
          CHAT AI
        </h2>
      </div>

      {/* 2. 修改主容器：去掉 h-[550px]，改用 flex-1 讓它自動填滿剩餘空間 */}
      <div className="relative w-full max-w-7xl flex-1 rounded-[32px] overflow-hidden bg-white/70 backdrop-blur-sm border border-stone-200 shadow-sm flex flex-col min-h-0">
        
        {/* 中間內容區：這部分已經是 flex-1，會自動隨著父容器拉長 */}
        <div className="flex-1 p-12 flex flex-col items-center justify-center text-center">
          <div className="max-w-md space-y-6">
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

        <div className="p-10 bg-stone-50/30 border-t border-stone-100 flex-none">
          <div className="max-w-3xl mx-auto">
            <div className="relative group">
              <input 
                disabled
                type="text" 
                placeholder="Ask me anything..."
                className="w-full bg-white border border-stone-200 rounded-2xl px-7 py-5 pr-16 text-stone-400 shadow-sm focus:outline-none cursor-not-allowed font-medium italic"
              />
              <div className="absolute right-4 top-1/2 -translate-y-1/2">
                <div className="p-2 text-stone-200">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" />
                  </svg>
                </div>
              </div>
            </div>
            <p className="text-[9px] text-stone-400 text-center mt-4 font-bold uppercase tracking-[0.2em] opacity-50">
              Training Mode Enabled • v0.1-alpha
            </p>
          </div>
        </div>
      </div>
    </section>
  );
});

ChatAI.displayName = 'ChatAI';
export default ChatAI;