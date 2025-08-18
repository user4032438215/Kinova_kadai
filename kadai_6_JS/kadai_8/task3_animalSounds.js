// 動物と鳴き声のオブジェクト。厳密には配列ではないらしい（連想配列）
const animals = {
    "犬": "わんわん",
    "猫": "にゃーん",
    "鳥": "ぴよぴよ",
    "カエル": "げろげろ",
};
//犬がキーでわんわんがそのキーに対応するデータ　
//キーが引き出しとすると値はその中身。。。っていうふうにたとえてもらった。

//HTMLの要素を取得　変数名と取得する要素名は同じでもいいらしい
const buttonArea = document.getElementById("buttonArea");
const result = document.getElementById("result");

//ボタンを繰り返し処理で作成する関数
Object.keys(animals).forEach(animal => {
    const btn = document.createElement("button"); // document.createElement=ボタン要素？を作成
    btn.textContent = animal; // ボタンのテキストを設定
    btn.className = "animalBtn"; // ボタンにクラス名を設定
    btn.setAttribute("data-animal", animal); // data-animal属性を設定、機械が読める情報としてこっそりメモを追加するイメージ.
    // ↑があることによってHTMLの<button>に"data-animal"属性が追加される。別になくてもいいハズだけど、あると便利らし。。
    buttonArea.appendChild(btn); // btnをbuttonAreaの子要素として追加、<id=buttonArea>がボタンを置くための机であると定義するために必要

});

//ボタンをまとめて取得してイベント設定
document.querySelectorAll(".animalBtn").forEach(button => {
    button.addEventListener("click", () => {
        const animal = button.getAttribute("data-animal"); // クリックされたボタンのdata-animal属性を取得 getAttribute=属性の値を取得するためのメソッド
        result.textContent = animals[animal]; // 対応するオブジェクトの値、鳴き声をresultに表示
    });
});