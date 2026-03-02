// src/components/Home.tsx
import { forwardRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faPhone } from '@fortawesome/free-solid-svg-icons';
import { faGithub, faLinkedin } from '@fortawesome/free-brands-svg-icons';

const Home = forwardRef<HTMLElement, {}>((_, ref) => {
  return (
        <section 
            id="Home" 
            ref={ref} 
            className="min-h-full w-full flex items-center justify-center relative px-10"
        >
            <div className="flex flex-col md:flex-row items-center justify-between gap-12 lg:gap-20 w-full max-w-7xl">
                {/* 左側：大頭貼卡片區 */}
                <div className="flex flex-col items-center flex-none w-1/3 min-w-[300px]">
                    <div className="relative group">
                        <div className="w-64 h-64 rounded-full border-[0px] border-stone-800 flex items-center justify-center overflow-hidden bg-white shadow-2xl">
                            <img 
                                src="Shuan.jpg" 
                                alt="Profile" 
                                className="absolute w-full h-full object-cover rounded-full transition-opacity"
                            />
                        </div>
                    </div>
                    
                    <div className="mt-8 text-center">
                        <h1 className="text-3xl font-black text-stone-800 tracking-tight">
                            何穎宣 <span className="text-stone-400 font-light text-2xl ml-2">(Ho Ying-Xuan)</span>
                        </h1>
                    </div>
                </div>

                {/* 右側：文字介紹與標籤區 */}
                <div className="flex-1 space-y-6 text-left">
                    <div className="space-y-2">
                        <h2 className="text-stone-800 text-5xl font-black tracking-tighter">About Me</h2>
                        <p className="text-blue-600 text-2xl font-extrabold tracking-tight">
                            Software Engineer Intern Candidate
                        </p>
                    
                        <div className="max-w-2xl text-stone-500 leading-relaxed font-medium text-lg">
                            大學畢業於 <span className="text-stone-900 font-bold">國立台北科技大學 電資學士班 資訊工程組</span>。<br />
                            目前就讀於 <span className="text-stone-900 font-bold">國立清華大學 資訊安全研究所</span>。 <br />
                            致力於 AI 應用與軟體開發。
                        </div>
                    </div>

                    {/* 聯絡圖標 */}
                    <div className="flex space-x-4 text-2xl text-stone-700">
                        <div className="relative group/mail">
                        <a href="mailto:shuan114164510@gapp.nthu.edu.tw" className="hover:text-blue-600 transition-colors">
                            <FontAwesomeIcon icon={faEnvelope} />
                        </a>
                        <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-3 opacity-0 group-hover/mail:opacity-100 transition-opacity pointer-events-none whitespace-nowrap bg-stone-800 text-white text-[11px] py-1 px-3 rounded shadow-lg">
                            shuan114164510@gapp.nthu.edu.tw
                        </div>
                        </div>

                        <div className="relative group/phone">
                        <a href="tel:+886905068174" className="hover:text-blue-600 transition-colors">
                            <FontAwesomeIcon icon={faPhone} />
                        </a>
                        <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-3 opacity-0 group-hover/phone:opacity-100 transition-opacity pointer-events-none whitespace-nowrap bg-stone-800 text-white text-[11px] py-1 px-3 rounded shadow-lg">
                            0905068174
                        </div>
                        </div>

                        <a href="https://github.com/Shuan0402" className="hover:text-blue-600 transition-colors"><FontAwesomeIcon icon={faGithub} /></a>
                        <a href="#https://www.linkedin.com/in/穎宣-何-4a2844356/" className="hover:text-blue-600 transition-colors"><FontAwesomeIcon icon={faLinkedin} /></a>
                    </div>

                    {/* Skills 標籤 */}
                    <div className="w-full pt-4">
                        <div className="flex flex-wrap gap-3">
                            {[
                                'Python', 'C++', 'JavaScript', 'React/Vue', 
                                'Node.js/Flask', '自動化測試 (CI/CD)', 
                                'AI/LLM 應用', '軟體品質管理', 'Git 版本控制'
                            ].map((skill, index) => (
                                <span 
                                key={index} 
                                className="px-6 py-2.5 bg-white border border-stone-200 text-stone-600 text-[13px] font-bold rounded-full shadow-sm hover:border-blue-300 hover:text-blue-600 transition-all"
                                >
                                {skill}
                                </span>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
  );
});

Home.displayName = 'Home';
export default Home;