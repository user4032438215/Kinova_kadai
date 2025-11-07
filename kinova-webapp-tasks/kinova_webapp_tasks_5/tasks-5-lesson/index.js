const express = require("express");
const path = require("path");
// const { Pool } = require("pg"); // PostgreSQL用ライブラリを読み込む

//DB情報を持ったPoolを作成
const pool = new Pool({
  user: "postgres",       // PostgreSQLのユーザー名
  host: "localhost",      // サーバーの場所（ローカルなら localhost）
  database: "lesson_5_sample",   // データベース名
  password: "YOUR_PASSWORD", // インストール時に設定したパスワード
  port: 5432              // デフォルトのポート番号
});

const app = express();
const PORT = 3000;

app.use(express.json());

pool.query("SELECT NOW()")
  .then((result) => {
    console.log(result.rows[0]);
  })
  .catch((err) => {
    console.error("DB接続エラー:", err);
  });