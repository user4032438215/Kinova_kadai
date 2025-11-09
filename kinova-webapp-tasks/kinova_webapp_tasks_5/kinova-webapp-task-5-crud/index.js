require("dotenv").config(); //.envファイルを読み込む

const express = require("express");
const app = express(); // Expressフレームワークを読み込んでアプリケーションを作成

const cors = require("cors"); // CORSを許可するためのライブラリを読み込む

const { Pool } = require("pg"); // PostgreSQL用ライブラリを読み込む

//パスワードとかが見えると気持ち悪いので.envファイル+.gitignoreで管理
// const pool = new Pool({
//   user: "postgres",
//   host: "localhost",
//   database: "kinova_sample",   // ※データベース講座で作成した DB 名
//   password: "****",
//   port: 5432
// });

const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
});

const PORT = 3000;


// ミドルウェアの設定
app.use(express.json());
app.use(cors());

// node index.js というコマンドでサーバーを起動。『Ctrl+C』でサーバーを停止
app.listen(PORT, () => console.log("✅ 起動: http://localhost:" + PORT + "/api/books")); // サーバー起動チェック

// DB 接続チェック
pool.query("SELECT NOW()")
  .then((result) => {
    console.log(result.rows[0]);
  })
  .catch((err) => {
    console.error("DB接続エラー:", err);
  });


//Create（新規データ追加）
app.post("/api/books", (req, res) => {
  const { title, author, price } = req.body; //分割代入

  //サーバー側でのチェック
  if (!title || !author || price == null) {
    return res.status(400).json({ ok: false, error: "全ての項目を入力してください" });
  }

  //  const sql = "INSERT INTO books (title, author, price) VALUES ($1, $2, $3)";
  const sql = "INSERT INTO books (title, author, price) VALUES ($1, $2, $3) RETURNING *";

  pool.query(sql, [title, author, price])
    // .then((result) => {
    //   res.json({ ok: true, books: result.rows[0] }); //課題要件を満たしているか？
    // })
    .then((result) => {
      res.json({ book: { title, author, price } }); //課題要件を満たしているか？
    })

    .catch((err) => {
      console.error("DBエラー:", err);
      res.status(500).json({ ok: false, error: "DBエラーが発生しました" });
    });
});

//Read（データの取得）
app.get("/api/books", (req, res) => {

  const sql = "SELECT * FROM books"

  pool.query(sql)
    .then((result) => {
      res.json({ ok: true, books: result.rows }); //課題要件を満たしているか？
    })
    .catch((err) => {
      console.error("DBエラー:", err);
      res.status(500).json({ ok: false, error: "DBエラーが発生しました" });
    });
});