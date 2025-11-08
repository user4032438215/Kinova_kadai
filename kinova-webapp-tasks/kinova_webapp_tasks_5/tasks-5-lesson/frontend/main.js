const form = document.querySelector("form");
const resultDiv = document.querySelector("#result");
const loadBtn = document.querySelector("#loadBtn");
const updateForm = document.querySelector("#updateForm");
const deleteForm = document.querySelector("#deleteForm");



//データの取得に関するaddEventListener
loadBtn.addEventListener("click", () => {
  console.log("📥 データ取得ボタンが押されました");//テストコード的な奴？

  fetch("http://localhost:3000/api/users")
    .then((res) => res.json())
    .then((data) => {
      console.log("サーバーから取得したデータ:", data);
      resultDiv.textContent = JSON.stringify(data); //取得した配列データをJSON 文字列として画面の #result に表示

      //取得したデータをテーブルとして表示するコード群
      let html = "<table border='1'>";
      html += "<tr><th>ID</th><th>名前</th><th>メッセージ</th><th>作成日時</th></tr>";

      // 取得したデータ（配列）をループ
      data.forEach((user) => {
        // 1行分のHTMLを文字列で作成
        html += `<tr>
          <td>${user.id}</td>
          <td>${user.name}</td>
          <td>${user.message}</td>
          <td>${user.created_at}</td>
          </tr>`;
      });

      // テーブルを閉じる
      html += "</table>";

      // 完成したHTMLを結果表示エリアに反映
      resultDiv.innerHTML = html;

    })
    .catch((err) => {
      console.error("取得エラー:", err);
    });


});


//データの更新に関するaddEventListener
updateForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const idValue = updateForm.querySelector("input[name='id']").value;
  const nameValue = updateForm.querySelector("input[name='name']").value;
  const messageValue = updateForm.querySelector("textarea[name='message']").value;


  const url = "http://localhost:3000/api/users";
  const targetUrl = url + "/" + idValue;

  fetch(targetUrl, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name: nameValue, message: messageValue })
  })
    .then(res => res.json())
    .then(data => {
      console.log("更新結果:", data);
      resultDiv.innerHTML =
        " 更新成功! <br> ID: " + data.id +
        " <br> 名前: " + data.name +
        " <br> メッセージ: " + data.message;
    })
    .catch(err => {
      console.error("更新エラー:", err);
      resultDiv.innerText = "エラーが発生しました: " + err;
    });

  // console.log("📝 更新フォームが送信されました");
  console.log("ID:", idValue, "名前:", nameValue, "メッセージ:", messageValue);
});


//データの送信に関するaddEventListener
form.addEventListener("submit", (event) => {
  event.preventDefault(); //「フォームのデフォルト動作（ページの再読み込み）を止めるため

  const nameValue = document.querySelector("input[name='name']").value;
  const messageValue = document.querySelector("textarea[name='message']").value;

  const url = "http://localhost:3000/api/users";

  fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name: nameValue, message: messageValue }),
  })
    .then((response) => response.json())
    .then((data) => {
      console.log("サーバーからの返事:", data);
      resultDiv.innerText =
        `DBに送信しました`;
    })
    .catch((err) => {
      console.error("通信エラー:", err);
      resultDiv.innerText = "エラーが発生しました: " + err;
    });
  console.log("headers（Content-Type: application/json）を付けました。");
  
});


//データの削除に関するaddEventListener
deleteForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const idValue = deleteForm.querySelector("input[name='id']").value;
  const url = "http://localhost:3000/api/users";
  const targetUrl = url + "/" + idValue; // IDをURLに結合

  fetch(targetUrl, {
    method: "DELETE"
  })
    .then(res => res.json())
    .then(data => {
      console.log("削除結果:", data);
      resultDiv.innerHTML = "🗑️ 削除完了: ID " + data.id;
    })
    .catch(err => {
      console.error("削除エラー:", err);
      resultDiv.innerText = "エラーが発生しました: " + err;
    });
});
