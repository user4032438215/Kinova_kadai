const buttons = document.querySelectorAll('.seasonBtn'); // クラス名が'seasonBtn'の要素をすべて取得
// buttons.forEach(function(btn){
//      console.log(btn.textContent);
// });

const result = document.getElementById('result'); // result要素を取得
// buttons.forEach(function (btn) { // 各ボタンに対して処理を行う
//      btn.addEventListener("click", function() {
//                result.textContent = "クリックされました！"; // result要素のテキストを更新
//           });
// });

buttons.forEach(function(btn){ // 各ボタンに対して処理を行う
     btn.addEventListener("click", function(){ // ボタンがクリックされたときの処理
          const seasons = btn.textContent; // クリックされたボタンのテキストを取得
          result.textContent = seasons + "が選ばれました！"; // result要素のテキストを更新
     });
});