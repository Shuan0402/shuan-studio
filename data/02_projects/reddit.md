# 專案：Reddit Sentiment Analysis - 社群輿情情感分析系統
## 核心價值 (Core Value)
本專案為自然語言處理 (NLP) 課程的最終專案，旨在透過深度學習技術分析社群媒體 Reddit 上的大眾情緒。
- 目標使用者：對社群輿情感興趣的研究者、開發者，或希望了解特定版塊 (Subreddit) 討論氛圍的分析師。
- 主要目的：自動化抓取 Reddit 評論，並利用多種 NLP 模型進行情感分類（如正向、負向、中立）。
- 功能願景：建構一個從資料抓取、預處理到模型預測與結果視覺化的完整流水線，作為學術研究與情緒分析的參考工具。

## 技術架構 (Technologies)
本專案結合了傳統深度學習模型與當代 Transformer 架構，並具備完整的開發環境配置：
- 深度學習框架：採用 PyTorch 2.3.1 進行模型訓練與推理。
- NLP 模型：
    - BERT：使用 transformers 庫載入預訓練 BERT 模型，進行高精度的語境情感識別。
    - Bi-LSTM：實作雙向長短期記憶網路，作為深度學習基底模型的對照。
- 數據處理與抓取：
    - PRAW (Python Reddit API Wrapper)：用於自動化抓取特定 Subreddit 的即時評論。
    - NLTK：執行文本預處理，包含斷詞 (Tokenization) 與詞幹提取 (Lemmatization)。
    - Pandas/Numpy：進行大規模數據清洗與數值運算。
- 硬體環境：基於 Linux (Ubuntu 16.04) 環境，利用 RTX 3060 (12GB) 與 CUDA 10.0 進行 GPU 加速運算。
- 實驗追蹤與評估：利用 Weights & Biases (wandb) 紀錄訓練過程，並使用 scikit-learn 計算評估指標。

## 開發動機 (Development Motivation)
- 學術實踐與驗證：作為 NLP 課程結業作品，旨在實踐課堂所學的模型架構與文本處理技術。
- 社群數據洞察：Reddit 擁有海量的非結構化文本，透過情感分析能有效量化社群對特定議題的觀點與反應。
- 模型效能對比：探索傳統 RNN 架構 (LSTM) 與注意力機制架構 (BERT) 在處理網路俚語與複雜情緒時的表現差異。

## 遇到的挑戰與解決方案 (Challenges & Solutions)
### 挑戰 1：非結構化文本的雜訊處理
- 問題：Reddit 評論包含大量特殊符號、縮寫與雜亂格式，直接輸入模型會降低準確度。
- 解決方案：開發 dataProcess.py 腳本，透過 NLTK 進行標準化處理，包含轉為小寫、移除雜訊，並進行詞形還原，確保輸入特徵的一致性。

### 挑戰 2：海量數據的預測效率
- 問題：對大量評論進行 BERT 推理時極度消耗運算資源。
- 解決方案：實作 test_BERT.py 批次處理機制，搭配 GPU 加速，並將預測結果序列化儲存，最後由 getResult.py 統一進行統計分析，實現預測與分析解耦。

### 挑戰 3：跨模型的實驗數據一致性
- 問題：不同模型間的訓練過程難以量化對比。
- 解決方案：整合 wandb API，將訓練損失 (Loss) 與準確率 (Accuracy) 即時上傳至雲端實驗室，確保實驗過程可追蹤且具備可重複性。

## 專案亮點 (Project Highlights)
- 完整的 Pipeline 流水線：從 getComment.py 抓取資料、dataProcess.py 預處理，到模型訓練與結果產出，流程極為嚴謹且具備模組化特性。
- 雙模型架構支援：同時提供 model_BERT.py 與 model_LSTM.py，方便使用者根據運算資源與精度需求選擇合適的模型。
- 預測統計自動化：getResult.py 能自動統計預測目錄下的所有文件，計算情緒標籤的平均分佈與發生率，快速產出分析報告。
- 實作可視化 Demo：提供 GitHub Pages 靜態網頁展示專案成果，增強了學術專案的可讀性與互動性。