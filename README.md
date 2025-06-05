# 📚 讀書進度追蹤系統 ｜Study Progress Tracker

這是一個用於記錄每日讀書時間的網頁系統，幫助使用者追蹤學習進度、檢視目標達成情況。  
我使用 Node.js + Express 開發後端，並使用 MySQL 儲存資料，專案也成功部署至 AWS EC2、RDS，並透過 Nginx 實現 HTTPS 反向代理。

🔗 線上作品連結：https://epic37.top/  
🧠 GitHub 原始碼：https://github.com/Eric9237/learningProject.git  

---

## 🔧 使用技術

- **前端**：HTML、CSS、JavaScript、EJS
- **後端**：Node.js、Express
- **資料庫**：MySQL（使用 AWS RDS）
- **部署**：AWS EC2 + Nginx（HTTPS）
- **版本控制**：Git + GitHub

---

## 📦 功能介紹（CRUD 完整支援）

| 功能        | 說明                                    |
|-------------|-----------------------------------------|
|  美化介面 | 使用Chart.js 用圖表的方式 顯示你最近的讀書時間與讀書內容分布|
|  新增紀錄 | 使用者可以填寫每日讀書的日期、內容、時間並提交         |
|  查詢紀錄 | 可以搜索關鍵字或日期來查詢特定的讀書紀錄         |
|  編輯紀錄 | 可以修改某天的日期、內容、時間       |
|  刪除紀錄 | 使用者可刪除任一筆記錄                  |
| 表單驗證 | 透過 Joi 驗證輸入資料的正確性            |
|  增加互動體驗 | 使用 Bootstrap + SweetAlert 增加互動體驗 |


---

## 🚀 專案架構

本專案採用模組化結構設計，後端功能、畫面模板、靜態資源分層清楚，方便日後維護與擴充。


```plaintext
learningProject/
├── app.js                  # Express 主伺服器入口
├── sql.js                  # MySQL 連線與查詢函式
├── routes/                 # 功能模組路由
│   ├── index.js            # 首頁與登入
│   ├── sideBar.js          # 側邊欄管理
│   ├── readingProgress.js  # 讀書進度功能
│   ├── target.js           # 學習目標功能
│   ├── problem.js          # 問題紀錄功能
│   └── idea.js             # 新想法功能
├── views/                  # EJS 前端模板
│   ├── index.ejs           # 登入頁
│   ├── main.ejs            # 首頁主畫面
│   ├── lobby.ejs           # 過渡畫面（若使用）
│   ├── 01target.ejs        # 目標管理畫面
│   ├── 02reading_progress.ejs # 讀書進度畫面
│   ├── 03problem.ejs       # 問題紀錄畫面
│   ├── 04newIdea.ejs       # 新想法畫面
│   └── error.ejs           # 錯誤處理畫面
├── public/                 # 靜態資源資料夾
│   ├── images/
│   ├── javascripts/
│   └── stylesheets/
└── middleware/             # 中介層（登入驗證、錯誤處理）
```

---
## 🛠 使用方式 (本地)

###  複製此專案
``` git clone https://github.com/Eric9237/learningProject.git ```

###  進入專案資料夾
``` cd learningProject ```

### 安裝所需套件
``` npm install ```

###  啟動伺服器（預設為 http://localhost:3000/）
``` node bin/www ```
 
📌 請確保你的電腦已安裝 Node.js、npm、以及本地的 MySQL。
若資料庫尚未建立，請參考 sql.js 或自行初始化資料表結構。

## 上線部署流程（EC2 + PM2）

###  在 EC2 上安裝 Node.js 
``` sudo yum install -y nodejs ```

###  在 EC2 上安裝  git
``` sudo yum install git -y ```

###  在 EC2 上安裝  PM2
``` sudo npm install -g pm2 ```

###  複製此專案
``` git clone https://github.com/Eric9237/learningProject.git ```

###  進到資料夾
``` cd learningProject ```

###  啟動伺服器
``` pm2 start bin/www ```

###  儲存目前狀態（避免重開機後消失）
``` pm2 save ```

###  設定開機自動啟動
``` pm2 startup ```











