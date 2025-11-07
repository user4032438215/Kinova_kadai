const form = document.querySelector("form");
const resultDiv = document.querySelector("#result");

form.addEventListener("submit", (event) => {
  event.preventDefault();

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