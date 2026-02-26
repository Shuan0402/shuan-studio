import { forwardRef, useState } from 'react';

const Experience = forwardRef<HTMLElement, {}>((_, ref) => {
  const [activeCategory, setActiveCategory] = useState("工作經驗");

  const experienceData = [
    {
      category: "工作經驗",
      items: [
        { title: "清大 軟體工程 助教", period: "2026.02 - now", desc: "協助指導大學部軟工相關知識。" },
        { title: "教育科技展 資安女婕思 工讀生", period: "2025.11", desc: "資安展場支援。" },
        { title: "QNAP 自動化測試實習生", period: "2025.01 - 2025.06", desc: "開發自動化測試腳本。" },
        { title: "北科 計網中心 電腦教室業務", period: "2023.01 - 2025.01", desc: "行政與設備維護。" },
        { title: "HITCON 奧義智慧科技 工讀生", period: "2022", desc: "資安桌遊推廣。" },
        { title: "明光義塾 一對一補習班 數理科輔導講師", period: "2022.07 - 2023.01", desc: "教學與學員狀況追蹤。" },
      ]
    },
    {
      category: "學術研究",
      items: [
        { title: "國科會計畫 研究助理", period: "2025.09 - 2026.01", desc: "軟體安全在軟體工程教育中之應用與實踐。" },
        { title: "IEA/AIE 2025 國際會議論文", period: "2025", desc: "RANsomCheck: A CNN-Transformer Model for Malware Detection Based on API Call Sequences。" },
        { title: "國科會 大專生研究計畫", period: "2025", desc: "計畫編號：113-2813-C-027-054-E。" },
        { title: "北科 資工系專題競賽 佳作", period: "2025", desc: "基於 API 呼叫序列的深度學習模型用於勒索病毒偵測。" },
      ]
    },
    {
      category: "競賽證照",
      items: [
        { title: "AIS3 Hackathon 入圍決賽", period: "2026", desc: "FB Scam Hunter 臉書詐騙廣告即時標記工具。" },
        { title: "picoCTF 2025", period: "2025", desc: "global rank: 9.24%。" },
        { title: "Hackfinity Battle 2025", period: "2025", desc: "global rank: 10.96%。" },
        { title: "資安女婕思 資安闖天關 優勝", period: "2025", desc: "全國資安攻防競賽獲獎。" },
        { title: "CPE 程式能力檢定 (4題)", period: "2023", desc: "PR 91 (Top 9.4%)。" },
      ]
    },
    {
      category: "社團活動",
      items: [
        { title: "ais3 暑期資安課程", period: "2023", desc: "精進資安領域知識。" },
        { title: "北科 電資學士班班學會 會長", period: "2022.09 - 2023.09", desc: "領導學會並籌辦大型活動。" },
        { title: "北科 程式研究社 社員", period: "2022.09 - 2024.09", desc: "學習程式開發並進行技術交流。" },
        { title: "GDSC NTUT 成員", period: "2022.09 - 2023.09", desc: "技術交流與籌辦活動。" },
        { title: "SITCON 學生計算機年會 工作人員", period: "2022", desc: "協助展場布置。" },
        { title: "北科 學 share 社 Python 講師", period: "2021.09 - 2022.01", desc: "社團教學與推廣。" },
      ]
    }
  ];

  return (
    <section 
      id="Experience" 
      ref={ref} 
      className="w-full py-10 px-10 flex flex-col items-center" 
    >
      {/* 標題區 */}
      <div className="w-full max-w-7xl mb-12 flex-none">
        <h2 className="text-stone-400 text-xs tracking-[0.5em] uppercase font-black">
          Experience
        </h2>
      </div>

      {/* 內容大框框 */}
      <div className="w-full max-w-7xl bg-white/70 backdrop-blur-sm border border-stone-200 rounded-[32px] p-8 md:p-12 shadow-sm">
        <div className="flex flex-col md:flex-row gap-0">
          
          {/* 左側：固定導航 */}
          <div className="md:w-56 flex-none relative border-r border-stone-200 pr-8">
            <div className="sticky top-10 space-y-4">
              {experienceData.map((group) => (
                <button
                  key={group.category}
                  onClick={() => setActiveCategory(group.category)}
                  className={`block w-full text-left px-5 py-3 rounded-xl transition-all duration-300 font-bold text-sm ${
                    activeCategory === group.category 
                    ? 'bg-stone-800 text-white shadow-md' 
                    : 'text-stone-400 hover:text-stone-600'
                  }`}
                >
                  {group.category}
                </button>
              ))}
            </div>
          </div>

          {/* 右側：項目列表 */}
          <div className="flex-1 md:pl-12 mt-8 md:mt-0 flex flex-col">
            {experienceData.map((group) => (
              activeCategory === group.category && (
                <div 
                  key={group.category}
                  className="animate-fadeIn max-h-[550px] overflow-y-auto pr-4 custom-scrollbar"
                  style={{
                    maskImage: 'linear-gradient(to bottom, transparent, black 30px, black calc(100% - 30px), transparent)',
                    WebkitMaskImage: 'linear-gradient(to bottom, transparent, black 30px, black calc(100% - 30px), transparent)'
                  }}
                >
                  <div className="grid gap-6 py-8">
                    {group.items.map((item, idx) => (
                      <div 
                        key={idx} 
                        className="group bg-white/60 border border-stone-100 px-8 py-6 rounded-2xl hover:shadow-sm transition-all"
                      >
                        <div className="flex justify-between items-baseline mb-4">
                          <h4 className="text-stone-800 font-black text-lg group-hover:text-blue-600 transition-colors">
                            {item.title}
                          </h4>
                          <span className="text-stone-400 font-mono text-[11px] uppercase shrink-0 ml-4">
                            {item.period}
                          </span>
                        </div>
                        <p className="text-stone-500 text-sm leading-relaxed font-medium">
                          {item.desc}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )
            ))}
          </div>
          
        </div>
      </div>
    </section>
  );
});

Experience.displayName = 'Experience';
export default Experience;