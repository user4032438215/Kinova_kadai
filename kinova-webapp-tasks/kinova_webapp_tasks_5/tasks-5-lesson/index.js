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
  password: "19990120", // インストール時に設定したパスワード。 .envファイルに分けてrequire("dotenv").config(); で読み込む。じゃないと多分やばい
  port: 5432              // デフォルトのポート番号
});

const PORT = 3000;
app.use(express.json());//ミドルウェア
app.use(cors()); // ← これで全オリジンからのアクセスを許可
// node index.js というコマンドでサーバーを起動。『Ctrl+C』でサーバーを停止
app.listen(PORT, () => console.log("✅ 起動: http://localhost:" + PORT + "/api/users"));


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
  const sql = "INSERT INTO users (name, message) VALUES ($1, $2)";

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

//③Read（データの取得）
app.get("/api/users", (req, res) => {
  //  res.send("ここでユーザー一覧を返す予定です");
  const sql = "SELECT * FROM users" //JSの中でSQL文を書く際、末尾に";"は基本不要

  pool.query(sql)
    .then(result => {
      res.json(result.rows);
    })
    .catch((err) => {
      console.error("DBエラー:", err);
      res.status(500).json({ ok: false, error: "DBエラーが発生しました" });
    });
});

//④Update（データ更新）
app.put("/api/users/:id", (req, res) => {
  const id = req.params.id;
  const { name, message } = req.body;
  console.log("更新対象のID:", id);

  //DB更新のためのSQL
  // const sql = "UPDATE users SET name = '" + name + "', message = '" + message + "' WHERE id = " + id;
  const sql = "UPDATE users SET name = $1, message = $2 WHERE id = $3 RETURNING *"; //SQLインジェクション対策var.
  const values = [name, message, id];

  //poolを使ってDBを更新する
  pool.query(sql, values)
    .then(() => {
      res.json({
        ok: true, id, name, message
      });
      // res.send("ID " + id + " を更新します");
    })


    //↑の  該当するIDが見つからなかった場合の分岐処理を追加したvar.
    // .then((result) => {
    //     if (result.rows.length === 0) {
    //       // 該当するIDが見つからなかった場合
    //       res.status(404).json({ ok: false, error: "指定されたIDが見つかりません" });
    //     } else {
    //       // 更新成功
    //       const updatedUser = result.rows[0];
    //       res.json({ 
    //         ok: true, 
    //         id: updatedUser.id, 
    //         name: updatedUser.name, 
    //         message: updatedUser.message 
    //       });
    //     }
    //   })

    .catch((err) => {
      console.error("更新エラー:", err);
      res.status(500).json({ ok: false, error: "更新に失敗しました" });
    });
});

//⑤Delete（データ削除）
app.delete("/api/users/:id", (req, res) => {
  const id = req.params.id;
  const sql = "DELETE FROM users WHERE id = $1";

  pool.query(sql, [id])
    .then(() => {
      res.json({ ok: true, id });
    })
    .catch(err => {
      console.error("削除エラー:", err);
      res.status(500).json({ ok: false, error: "削除に失敗しました" });
    });
});