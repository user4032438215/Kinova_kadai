//Expressというフレームワークでサーバーを準備
const express = require("express");
const app = express();
const cors = require("cors"); //cors ミドルウェアを追加 ＋ npm install cors を管理者権限で実行、パッケージをインストール

// const path = require("path"); //←？実務上よく使うっぽいけど今後っ登場しないからCO
const { Pool } = require("pg");  // PostgreSQL用ライブラリを読み込む

//DB情報を持ったPoolを作成
const pool = new Pool({
  user: "postgres",       // PostgreSQLのユーザー名
  host: "localhost",      // サーバーの場所（ローカルなら localhost）
  database: "lesson_5_sample",   // データベース名
  password: "AAhiCyHh", // インストール時に設定したパスワード。 .envファイルに分けてrequire("dotenv").config(); で読み込む。じゃないと多分やばい
  port: 5432              // デフォルトのポート番号
});

const PORT = 3000;



app.use(express.json());//ミドルウェア
app.use(cors()); // ← これで全オリジンからのアクセスを許可
// node index.js というコマンドでサーバーを起動。『Ctrl+C』でサーバーを停止
app.listen(PORT, () => console.log("✅ 起動: http://localhost:" + PORT));


//JSでDBに干渉できるようになった。やべーやつ。メソッドの引数にそのままSQL文を書くだけで実行できる。
pool.query("SELECT NOW()") //NOW(); = 今の日時を返す関数（PostgreSQLに組み込まれている）
  .then((result) => {
    console.log(result.rows[0]); //SELECT NOW()って命令によるオブジェクトの一部つまり.rows[0]だけ帰ってくる。
    // console.log(result); //SELECT NOW()って命令によるオブジェクト全部が返ってくる。
  })
  .catch((err) => {
    console.error("DB接続エラー:", err);
  });


//②Create（新規データ追加）
app.post("/api/users", (req, res) => {
  const { name, message } = req.body; //分割代入 const name = req.body.name; と const message = req.body.message; を同時に記述する方法

  // const sql =
  //   `INSERT INTO users (name, message) 
  //    VALUES ('${name}', '${message}')`; //↓がSQLインジェクション対策してあるバージョン
  const sql =
    "INSERT INTO users (name, message) VALUES ($1, $2)";

  // pool.query(sql) //↓がSQLインジェクション対策してあるバージョン
  pool.query(sql, [name, message])
    .then(() => {
      res.json({ ok: true, message: "保存できました！" });
    })
    .catch((err) => {
      res.status(500).json({ ok: false, error: "DBエラーが発生しました" });
      //500番台のエラーコード。サーバーの内部処理でエラーが発生した場合に返す
      // 例：データベース接続に失敗した
      // 例：サーバー側のプログラムが例外を投げた
    });
});