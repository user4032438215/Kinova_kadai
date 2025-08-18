// ここにJavaScriptを書いて、ボタンをクリックすると鳴き声を表示するようにしよう
const buttons = document.querySelectorAll(".animalBtn"); // クラス名が'animalBtn'の要素をすべて取得
const result = document.getElementById("result"); // result要素を取得

buttons.forEach(function(btn) {
    btn.addEventListener("click", function () {
        const animal = btn.textContent; // クリックされたボタンのテキストを取得
        let sound = ""; // 鳴き声を格納する変数

        if (animal === "犬") {
            sound = "ワンワン";
        } else if (animal === "猫") {
            sound = "にゃーん";
        } else if (animal === "鳥") {
            sound = "ピヨピヨ";
        } else if (animal === "牛") {
            sound = "モーモー";
        } else if (animal === "カエル") {
            sound = "ケロケロ";
        }

        result.textContent = sound; // result要素のテキストを更新
    });
});