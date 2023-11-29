# web-02-h1008h1008
web-02-h1008h1008 created by GitHub Classroom
# web-02-h1008h1008
web-02-h1008h1008 created by GitHub Classroom
電商網站
## 安裝
### 取得專案
使用 git clone 命令來複製專案到你的本地機器上：
```bash
git@github.com:ooschool/web-02-h1008h1008.git
```

```bash
cd /web-02-h1008h1008
```


### 安裝套件
在專案目錄中執行以下命令以安裝所需的套件：
```bash
npm install
```


### 運行專案
執行以下命令以啟動專案：      
```bash
node app.js
```


### 開啟專案
在瀏覽器中打開以下 URL 以查看你的專案：
http://localhost:8000/


## 資料夾說明

- views - 畫面放置處
  - layouts main.handlebars檔案放置處
  - static - 靜態資源放置處
...

## 本機資料庫連線指南

這個文件將指導你如何在本地環境中連接到資料庫，使用 Sequelize 和提供的配置資訊。

### 步驟 1: 安裝 Sequelize
確保你的本機環境已經安裝了 Node.js 和 npm。然後，在你的專案目錄中執行以下命令安裝 Sequelize 和 MySQL 驅動程式：
```bash
npm install sequelize mysql2
```

### 步驟 2: 初始化項目
建立資料庫：如果 'web02' 資料庫不存在，你可以在資料庫伺服器上建立一個新的資料庫。
(使用mysql)
```sql
CREATE DATABASE web02;
```
### 步骤 3:創建table
使用以下命令來創建table：
```bash
npx sequelize db:migrate
```

### 步驟 4: 創建種子資料
使用以下命令來創建種子資料：
```bash
npx sequelize db:seed:all
```
## 本機寄信教學
(<https://israynotarray.com/nodejs/20230722/1626712457/>)
### 步驟 1:按照教學拿到CLIENT_ID , CLIENT_SECRET 
### 步驟 2: 填入環境變數
參考.env.example填入變數
### 步驟 3: 運行後到http://localhost:3000/auth/login設定

