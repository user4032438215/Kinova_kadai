//Node.js
const express = require("express"); //１require("express") は「express というライブラリ(再利用できる部品集)を読み込む」という意味

const app = express(); //２「サーバーの操作窓口」となる。例）app.get(...) や app.post(...) 

const PORT = 3000; //3サーバー起動の準備としてポート番号を変数として定義

//４app.listen() メソッド。サーバーが起動したタイミングでこのメソッドが実行される。第一引数にポート番号、第二引数に関数を渡す。
app.listen(PORT, () => console.log("✅ 起動: http://localhost:" + PORT));

//５ パス操作用の標準モジュールを読み込む
const path = require("path");

//５ブラウザからの GET リクエストに応答する
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "frontend", "index.html"));
});

//６ほかのパスにも返事を用意する
app.get("/about", (req, res) => res.send("このアプリの説明ページ"));
app.get("/help", (req, res) => res.send("お困りのときはこのページを参照してください"));
//６JSONで返すパスを追加
app.get("/api/info", (req, res) => res.json({ app: "sample-app", version: 1, ok: true }));


// バグ→静的ファイルを配信する設定
app.use(express.static(path.join(__dirname, "frontend")));

//７JSON本文を req.body へ
app.use(express.json());

//８追加：POST /api/echo に固定のJSONで応答
// app.post("/api/echo", (req, res) => res.json({ ok: true, endpoint: "/api/echo" })); //古くなったのでCO

//９新：受け取った本文をそのまま返す
app.post("/api/echo", (req, res) => {
  const data = req.body;

  //１０ 必須チェックとエラー応答
  if (!data) {
    return res.status(400).json({ ok: false, error: "message は必須です" });
  }

  res.json({
    ok: true, echo: data });
});
