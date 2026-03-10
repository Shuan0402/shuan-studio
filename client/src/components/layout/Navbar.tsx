interface NavbarProps {
  tabs: string[];
  activeTab: string;
  onTabClick: (tab: string) => void;
}

export const Navbar = ({ tabs, activeTab, onTabClick }: NavbarProps) => (
  <nav className="relative bg-stone-50/80 backdrop-blur-md flex-none z-50">
    <div className="flex justify-center items-center py-5">
      <ul className="flex space-x-12 text-[13px] text-stone-500 font-bold tracking-[0.15em] uppercase">
        {tabs.map((tab) => (
          <li key={tab} className="relative">
            <button
              onClick={() => onTabClick(tab)}
              className={`transition-colors cursor-pointer ${
                activeTab === tab ? 'text-blue-600' : 'text-stone-400 hover:text-stone-900'
              }`}
            >
              {tab}
            </button>
            {activeTab === tab && (
              <div className="absolute left-0 right-0 bottom-[-21px] h-[4px] bg-blue-600 z-10" />
            )}
          </li>
        ))}
      </ul>
    </div>
  </nav>
);