const form = document.querySelector("form");
console.log(form); // 取得できているか確認

form.addEventListener("submit", (event) => {
  event.preventDefault(); // ← ここで既定の送信→リロードを止める

  const titleValue = document.querySelector("input[name='title']").value;
  const authorValue = document.querySelector("input[name='author']").value;
  const priceValue = Number(document.querySelector("input[name='price']").value);

  console.log(titleValue);
  console.log(authorValue);
  console.log(priceValue);

  //課題3：入力されたデータをサーバーに送る
  const url = "http://localhost:3000/api/books";

  fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      "title": titleValue,
      "author": authorValue,
      "price": priceValue
    })
  })

    //課題4：サーバーから返ってきた結果を受け取る
    .then((response) => response.json()) //レスポンス本文を response.json() で JSON に変換し受け取る
    .then((data) => { console.log("サーバーからの返事:", data); }) //その内容をコンソールに表示する
    .catch((err) => { console.error("通信エラー:", err); }); //エラーが起きたときもコンソールに表示する
});

