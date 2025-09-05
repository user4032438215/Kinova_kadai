/* ステップ2：JavaScriptでボタンを取得しよう */
// const menu = document.getElementsByClassName("menu");←不要
const recommendBtn = document.getElementById("recommendBtn");

// 配列を取得
const menuItems = document.querySelectorAll(".menu li"); // ←menu classのliを全て取得

const faboriteButtons = document.querySelectorAll(".favorite");
// /* /* ボタンがクリックされたときの処理を設定しよう */
// recommendBtn.addEventListener("click", function() {
//     // console.log("クリックされた");
//     /* ステップ4：メニューの内容を書き換えよう */

//     menus.forEach(funcrtion(){
//         menu.textContent = ;
//     })

// }); */

// おすすめメニュー配列を定義
const recommendMenus = [
  "🍛 ほっこりカレーライス",
  "🍮 自家製プリン",
  "🥤 季節のスムージー"
];



// // おすすめボタンがクリックされたときにメニューを書き換える
// recommendBtn.addEventListener("click", function() {
//     const recommendMenuNames = Object.keys(recommendMenus);
//     menus.forEach((menu, idx) => {
//         if (recommendMenuNames[idx]) {
//             menu.textContent = recommendMenuNames[idx];
//         }
//     });
// });


// ↑より良いコード
/* recommendBtn.addEventListener("click", function() {
  menuItems.forEach((li, idx) => {
    if (recommendMenus[idx]) {
      li.textContent = recommendMenus[idx];
    }
  });
});
 */

// ↑処理と関数を分けて書いた例
// 関数を定義
function updateMenu(menuItems, newNames) {
  menuItems.forEach((li, idx) => {
    if (newNames[idx]) {
      li.textContent = newNames[idx];
    }
  });
}
/*  */

// ボタンがクリックされたときに関数を呼び出す
recommendBtn.addEventListener("click", function () {
  updateMenu(menuItems, recommendMenus);
});

// <li>テキストがクリックされたら説明を表示する。

// // ☕ ブレンドコーヒー： こだわりの豆を使った香り高いブレンドコーヒーです。
// 🍰 手作りチーズケーキ： 甘さ控えめでコーヒーと相性抜群の手作りチーズケーキ。
// 🥪 こだわりのサンドイッチ： 旬の野菜と自家製パンのサンドイッチ。
// 🍛 ほっこりカレーライス： スパイス香るまろやかカレー。ランチにぴったり！
// 🍮 自家製プリン： とろける食感が人気の自家製プリン。
// 🥤 季節のスムージー： 季節のフルーツを使ったさっぱりスムージー。
const menuDescription = document.getElementById("menuDescription");


menuItems.forEach((menuItems) => {
  menuItems.addEventListener("click", () => {
    const name = menuItems.textContent;
    let message = "";

    if (name === "☕ ブレンドコーヒー") {
      message = "こだわりの豆を使った香り高いブレンドコーヒーです。";
    } else if (name === "🍰 手作りチーズケーキ") {
      message = "甘さ控えめでコーヒーと相性抜群の手作りチーズケーキ。";
    } else if (name === "🥪 こだわりのサンドイッチ") {
      message = "旬の野菜と自家製パンのサンドイッチ。";
    } else if (name === "🍛 ほっこりカレーライス") {
      message = "スパイス香るまろやかカレー。ランチにぴったり！";
    } else if (name === "🍮 自家製プリン") {
      message = "とろける食感が人気の自家製プリン。";
    } else if (name === "🥤 季節のスムージー") {
      message = "季節のフルーツを使ったさっぱりスムージー。";
    }

    menuDescription.textContent = message;
  });
})

// <button>♡</button>がクリックされたら♡を♥に交互に変換
// function attachFavoriteEvent() {
//   const favButtons = document.querySelectorAll(".favorite");
//   favButtons.forEach(btn => {
//     btn.addEventListener("click", function () {
//       if (btn.textContent === "♡") {
//         btn.textContent = "♥";
//         btn.classList.add("active");
//       } else {
//         btn.textContent = "♡";
//         btn.classList.remove("active");
//       }
//     });
//   });
// };


// データの状態と定義を分離
const HEART_STATES = {
  INACTIVE: { symbol: "♡", className: '' },
  ACTIVE: { symbol: "♥", className: 'active' }
};

//状態を管理する関数
function toggleHeartState(btn) {
  // const isActive = btn.dateset.state === 'active';
  const isActive = btn.dataset.state === 'active';
  const newState = isActive ? HEART_STATES.INACTIVE : HEART_STATES.ACTIVE;

  // UIの更新は一か所でまとめて行う
  btn.textContent = newState.symbol;
  btn.classList.toggle('active', isActive);
  btn.dataset.state = isActive ? 'inactive' : 'active';
}

//イベント付与関数
function attachFavoriteEvent() {
  const favButtons = document.querySelectorAll(".favorite");

  favButtons.forEach(btn => {
    // 初期状態を設定
    btn.dataset.state = 'inactive';

    btn.addEventListener("click", () => toggleHeartState(btn));
  });
}

// ダークモード切り替え
const toggleDarkModeBtn = document.getElementById("toggleDarkMode");
toggleDarkModeBtn.addEventListener("click", () => {
  if (document.body.classList.contains("dark-mode")) {
    document.body.classList.remove("dark-mode");
  } else {
    document.body.classList.add("dark-mode");
  }
});

// ページ読み込み時にイベントをアタッチ
attachFavoriteEvent();