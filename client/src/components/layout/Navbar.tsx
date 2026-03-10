import React, { useState } from 'react';
import { Menu, X } from 'lucide-react'; // 建議安裝 lucide-react，或改用 SVG

interface NavbarProps {
  tabs: string[];
  activeTab: string;
  onTabClick: (tab: string) => void;
}

export const Navbar = ({ tabs, activeTab, onTabClick }: NavbarProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleTabClick = (tab: string) => {
    onTabClick(tab);
    setIsOpen(false); // 點擊後自動關閉手機版選單
  };

  return (
    <nav className="relative bg-stone-100 border-b border-stone-200 z-50">
      <div className="px-6 py-4 flex justify-between items-center">
        {/* 手機版：Logo 或名稱 */}
        <span className="font-bold text-stone-800 md:hidden">SHUAN</span>

        {/* 電腦版選單 (md 以上顯示) */}
        <div className="hidden md:flex flex-1 justify-around">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => onTabClick(tab)}
              className={`relative px-4 py-2 text-sm font-medium transition-colors duration-300
                ${activeTab === tab ? 'text-blue-600' : 'text-stone-400 hover:text-stone-600'}`}
            >
              {tab}
              {activeTab === tab && (
                <div className="absolute bottom-0 left-0 w-full h-0.5 bg-blue-600 transition-all duration-300" />
              )}
            </button>
          ))}
        </div>

        {/* 手機版：漢堡按鈕 (md 以下顯示) */}
        <button 
          className="md:hidden text-stone-600"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* 手機版：下拉選單選單 */}
      <div className={`
        md:hidden overflow-hidden transition-all duration-300 ease-in-out bg-stone-50
        ${isOpen ? 'max-h-64 border-b border-stone-200' : 'max-h-0'}
      `}>
        <div className="flex flex-col p-4 space-y-2">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => handleTabClick(tab)}
              className={`text-left px-4 py-3 rounded-xl transition-colors
                ${activeTab === tab ? 'bg-blue-100 text-blue-600' : 'text-stone-500 hover:bg-stone-200'}`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>
    </nav>
  );
};