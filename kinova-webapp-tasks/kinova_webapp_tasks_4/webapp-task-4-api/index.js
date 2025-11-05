//② Expressを読み込んで準備する
const express = require("express");
const cors = require("cors"); //cors ミドルウェアを追加
const app = express();

//課題 5.2 app.post(path, handler)でPOSTリクエストされた時の処理を登録
//ミドルウェアでJSONをオブジェクトに変換してreq.bodyに代入（ルートより先に記述しないとreq.bodyが空になる）
app.use(cors()); // ← これで全オリジンからのアクセスを許可
app.use(express.json());


app.post("/api/books", (req, res) => {
  console.log(req.body); //オブジェクトがちゃんと入っているか確認
  const { title, author, price } = req.body;

  console.log("課題 5の3:", title, author, price);


  res.json({
    "status": "success",
    "message": "本の登録が完了しました",
    book: { title, author, price }
  });
});


//ポート番号を変数として定義し、サーバーの起動の準備をする
const PORT = 3000;

//app.listen() というメソッドを使って「このポートで待ち受けを開始する」
app.listen(PORT, () => console.log("✅ 起動: http://localhost:" + PORT));


//node index.jsコマンドでサーバーを起動
//『Ctrl + C』でサーバーを停止
//サーバーが起動しているか確認する方法
//方法①：ブラウザでアクセスしてみる
//方法②：ターミナルでポート使用状況を確認（Windows）: netstat -ano | findstr :3000
//方法③：タスクマネージャーで「node.exe」が動いているか確認


