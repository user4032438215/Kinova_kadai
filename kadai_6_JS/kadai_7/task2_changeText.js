//メッセージとボタンの要素を取得
const message = document.getElementById("message");
const button = document.getElementById("btn");


//ボタンがクリックされたらテキストを書き換える
button.addEventListener("click", function() {
    message.textContent = "クリックされました！";
});