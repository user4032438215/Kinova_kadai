課題5の後半で、なんかよくわからんがエラーが出て、行き詰った。
---
index.html:53 Live reload enabled.
main.js:11 fdafdfdas
main.js:12 ffdsafdadasfdafdssdfd
main.js:13 121324232154235
index.html:1 Access to fetch at 'http://localhost:3000/api/books' from origin 'http://127.0.0.1:5500' has been blocked by CORS policy: Response to preflight request doesn't pass access control check: No 'Access-Control-Allow-Origin' header is present on the requested resource.Understand this error
main.js:18  POST http://localhost:3000/api/books net::ERR_FAILED
(anonymous) @ main.js:18Understand this error
main.js:31 通信エラー: TypeError: Failed to fetch
    at HTMLFormElement.<anonymous> (main.js:18:3)
--- 

どうやらCORSエラーというものらしい。
別のターミナルで
`npm install cors`
というコマンドを実行してcorsパッケージをインストール。
その後index.jsに
```js
const cors = require("cors");
app.use(cors());
```
という記述を追加したらエラーが解消された。
この一連の対処方法はちょっとわからな過ぎたので全部AIに丸投げした。