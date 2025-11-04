const form = document.querySelector("form");
const resultDiv = document.querySelector("#result"); //３JavaScriptで結果を反映する

form.addEventListener("submit", (event) => {
  event.preventDefault(); // ← ここで既定の送信→リロードを止める(こいつのおがけでリロードなしで送信可能になる非同期通信の肝)
  console.log("送信を止めました。ここからJSで値を扱えます");

  const nameValue = document.querySelector("input[name='name']").value;
  const messageValue = document.querySelector("textarea[name='message']").value;

  // console.log("名前:", nameValue);
  // console.log("メッセージ:", messageValue);

  // 送信先URL（次の章で /api/echo に本文を送る予定）
  const url = "http://localhost:3000/api/echo";

  // fetch=サーバーにリクエストを送るための関数.JSフルスタック化の肝
  fetch(url, {
    method: "POST", //このリクエストはデータを送信（POST）するるためのものであると明示。ほかにはGET,PUT DELETなど
    headers: { "Content-Type": "application/json" }, //ヘッダーを付けて、JSONだと明示
    body: JSON.stringify({ name: nameValue, message: messageValue }) //JSONはJS由来だけどJS専門じゃない。ほかの言語でも読み書きできる共通フォーマットとして設計されているため。ゆえにJSオブジェクトをJSON形式に変換する必要がある。
  })

    //Promis(約束) ネットワーク通信は時間がかかるため、
    // あらかじめ将来的な結果
    // （pending（保留中）：結果待ちの状態、
    // fulfilled（成功）：結果が届いた状態 → then(…) に進む
    // rejected（失敗）：エラーが起きた状態 → catch(…) に進む）
    // に応じて処理を予約しておく
    .then((response) => response.json()) //レスポンス本文をJSONに変換
    .then((data) => {
      console.log("サーバーからの返事:", data);
      resultDiv.innerText = `名前: ${data.echo.name}\nメッセージ: ${data.echo.message}`; //３JavaScriptで結果を反映する
    }) //JSONデータを受け取って使う
    .catch((err) => {
      console.error("通信エラー:", err);
      resultDiv.innerText = "エラーが発生しました: " + err; //３JavaScriptで結果を反映する
    }); //エラーの場合の処理を追加




  console.log("headers（Content-Type: application/json）を付けました。");
});

