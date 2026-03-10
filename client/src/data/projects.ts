// src/data/projects.ts
export interface ProjectItem {
  type: 'image' | 'video';
  image: string[];
  title: string;
  subtitle: string;
  description: string;
  technologies: string[];
  tags: string[];
  liveLink?: string;
  githubLink?: string;
}

export const projectsData: ProjectItem[] = [
  {
    type: 'image',
    image: ['images/RANsomCheck_1.png', 'images/RANsomCheck_2.png', 'images/RANsomCheck_3.png'],
    title: 'RANsomCheck',
    subtitle: '基於深度學習的勒索病毒偵測平台',
    description: '開發基於 Transformer 的勒索病毒偵測模型 。透過動態分析 API 序列擷取行為特徵，準確率達 0.9994。並整合 React 與 Flask 打造即時網頁安全性分析平台 。',
    technologies: [
      'PyTorch',
      'Transformer',
      'React',
      'Flask',
      'TypeScript',
    ],
    tags: ['IEA/AIE 2025', '國科會大專生計畫', '專題競賽佳作', '勒索病毒偵測', '深度學習', '自然語言處理', '多人協作'],
    liveLink: 'https://link.springer.com/chapter/10.1007/978-981-96-8892-0_10',
    githubLink: 'https://github.com/Shuan0402/RANsomCheck-Backend'
  },
  {
    type: 'image',
    image: [
      'images/reddit_1.png',
      'images/reddit_2.png',
      'images/reddit_3.png',
      'images/reddit_4.png',
      'images/reddit_5.png',
      'images/reddit_6.png'
    ],
    title: 'Reddit Sentiment Analysis',
    subtitle: '基於 BERT 與 Bi-LSTM 的社群情感分析',
    description: '結合 Reddit API 與深度學習模型，針對不同 Subreddit 的大量評論進行情感傾向分析。系統整合 BERT 模型達成 95% 以上的辨識準確率，並透過 Observable 提供互動式數據視覺化，揭示社群網路中的情緒動態與分佈。',
    technologies: ['BERT', 'Bi-LSTM', 'Python', 'NLTK', 'Observable', 'Weights & Biases'],
    tags: ['自然語言處理', '情感分析', '數據視覺化', '多人協作'],
    liveLink: 'https://kiri487.github.io/2024-Spring-NLP-Reddit-Sentiment-Analysis/',
    githubLink: 'https://github.com/Kiri487/2024-Spring-NLP-Reddit-Sentiment-Analysis'
  },
  {
    type: 'video',
    image: ['videos/fb_scam_hunter.mp4'], 
    title: 'FB Scam Hunter',
    subtitle: '臉書詐騙廣告即時標記工具',
    description: 'FB Scam Hunter 是一款用於辨識臉書詐騙廣告的瀏覽器擴充元件。它能自動擷取 Facebook 廣告內容 ，透過後端 XGBoost 模型進行語意分析與風險判定，並在網頁上即時以紅框標註疑似詐騙的貼文。',
    technologies: ['FastAPI', 'XGBoost Classifier', 'Python', 'NLP', 'Chrome Extension V3','Feature Engineering'],
    tags: ['資訊安全', 'AIS3 Hackathon', '機器學習', '防詐工具', '多人協作'],
    liveLink: 'https://www.youtube.com/watch?v=PMrFTh-90as',
    githubLink: 'https://github.com/Shuan0402/FB_ScamHunter_backend'
  },
  {
    type: 'video',
    image: ['videos/SelfMap.mp4'],
    title: 'SelfMap',
    subtitle: '打造你專屬的旅行地圖',
    description: 'SelfMap 是一個個人化的地理資訊標記平台，旨在讓使用者記錄私房景點、撰寫遊記，並能與旅伴共同協作專屬的地圖。透過直觀的介面，將每一次旅行的足跡與想法轉化為珍貴的回憶地圖。',
    technologies: ['React', 'Firebase', 'MUI', 'Vite', 'ChatGPT 5.1'],
    tags: ['前端開發', '旅遊科技', '地圖協作', 'Vibe Coding', '獨立開發'],
    liveLink: 'https://shuan0402.github.io/selfMap/',
    githubLink: 'https://github.com/shuan0402/selfMap'
  },
  {
    type: 'image',
    image: ['images/elecookie_1.png', 'images/elecookie_2.png', 'images/elecookie_3.png', 'images/elecookie_4.png', 'images/elecookie_5.png', 'images/elecookie_6.png'],
    title: 'Elecookie',
    subtitle: '多角色餅乾電商平台',
    description: '基於 React 與 ASP.NET Core 開發的餅乾購物網站。支援會員、員工及管理員等多重身份權限，具備完整的購物車、訂單追蹤、店家商品管理及追蹤功能。',
    technologies: ['React.js', 'ASP.NET Core', 'PostgreSQL', 'Entity Framework Core'],
    tags: ['電商開發', '全端開發', '資料庫設計', '權限管理', '多人協作'],
    githubLink: 'https://github.com/Zch720/NTUT_112_1_DatabaseProject_backend'
  },
  {
    type: 'video',
    image: ['videos/boxbob.mp4'],
    title: 'BoxBob',
    subtitle: '2D 益智推箱子遊戲',
    description: '於物件導向程式設計課程開發的 2D 益智遊戲。利用課程提供之 C++/MFC 遊戲引擎框架，實作 16 個地圖關卡讀取、角色移動與碰撞偵測演算法、遊戲狀態機切換以及音效觸發邏輯。',
    technologies: ['C++', 'MFC', 'Win32 API', 'GDI+'],
    tags: ['遊戲開發', '物件導向', '益智遊戲', '多人協作'],
    liveLink: 'https://youtu.be/WznII5vH8jw',
    githubLink: 'https://github.com/Kiri487/2022-Spring-OOPL'
  },
  {
    type: 'video',
    image: ['videos/onchained.mp4'],
    title: 'OnChainED',
    subtitle: '區塊鏈學習認證平台',
    description: '專為教育機構設計的去中心化證書系統，結合 W3C VC 標準與 IPFS 永久存證技術。學生能自主管理具國際認可的數位證明，並支援雇主透過 QR Code 進行無須中心化伺服器的即時驗證。',
    technologies: ['React', 'MetaMask', 'DID/VC', 'SpruceID', 'IPFS/Arweave', 'Ethereum/Polygon'],
    tags: ['Web3', '區塊鏈', '去中心化身份', '教育科技', '多人協作'],
    githubLink: 'https://github.com/Shuan0402/OnChainED'
  },
  {
    type: 'video',
    image: ['videos/click-clack.mp4'],
    title: 'ClickClack',
    subtitle: 'AI 智慧打字練習平台',
    description: 'ClickClack 是一個結合生成式 AI 與文件分析技術的打字訓練網頁。使用者能透過 AI 創意寫手生成專屬文章，或上傳 PDF/PPTX 進行重點提取與擴充練習。',
    technologies: ['React 18', 'Zustand', 'Tailwind CSS', 'Node.js/Python API', 'Vite', 'LLM'],
    tags: ['前端開發', 'AI 應用', '效能工具', 'EdTech', '獨立開發'],
    liveLink: 'https://shuan0402.github.io/click-clack/',
    githubLink: 'https://github.com/shuan0402/click-clack/'
  },
  {
    type: 'image',
    image: ['images/article_reader.png'],
    title: 'ArticleReader',
    subtitle: '智慧朗讀助手 (WIP)',
    description: '結合 Flutter 跨平台開發與 Python Selenium 自動化技術。系統能精準解析網頁文章段落、自動導航至下一章節，並透過後端 API 提供精確到段落的書籤恢復功能。',
    technologies: ['Flutter', 'Python', 'Selenium', 'FastAPI', 'TTS'],
    tags: ['跨平台應用', '自動化技術', '混合架構', '軟體工程', '獨立開發'],
    githubLink: 'https://github.com/Shuan0402/ArticleReader'
  },
  {
    type: 'image',
    image: ["images/note_generator_1.png", "images/note_generator_2.png"],
    title: 'note_generator',
    subtitle: '個人化筆跡合成文本平台 (WIP)',
    description: '這是一款結合圖像處理與文本分析的桌面應用程式。使用者可以上傳自己的真實手寫字跡，系統會自動分析 .txt 文本並將其轉化為具有自然隨機感的手寫筆記圖片。支援多樣本字跡採集、隨機位移模擬。',
    technologies: ["Python 3.10", "Tkinter", "Pillow (PIL)", "WSLg", "Pathlib"],
    tags: ["圖像合成", "自動化工具", "桌面應用程式開發", "手寫筆記模擬", '多人協作'],
    githubLink: 'https://github.com/Shuan0402/Note_generator'
  },
  {
    type: 'image',
    image: ['images/random_food_1.png', 'images/random_food_2.png', 'images/random_food_3.png'],
    title: 'Ntut_RandomFood',
    subtitle: '北科大校園美食隨機抽選系統 (WIP)',
    description: '專為北科大學生設計的午餐決策工具。整合校園周邊餐廳清單，具備流暢的側邊選單動畫與隨機結果產生邏輯，並採用深綠色系專業設計。',
    technologies: ['JavaScript (ES6)', 'HTML5', 'CSS3 Animations'],
    tags: ['工具軟體', '原生網頁', '校園應用', '前端開發', '多人協作'],
    liveLink: 'https://shuan0402.github.io/Ntut_RandomFood/',
    githubLink: 'https://github.com/Shuan0402/Ntut_RandomFood'
  },
];