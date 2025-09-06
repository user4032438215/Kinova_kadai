// TODO「もっと見る / 閉じる」ボタン
//1. データの状態を定義（キー（INACTIBE）と価（｛ symbol: ｝）のペアを持つオブジェクト。しかも値は入れ子になってる）
const BIO_STATES = {
  INACTIVE: { symbol: "もっと見る", className: '' },
  ACTIVE: { symbol: "閉じる", className: 'active' }
};

//2. 状態を管理する関数 重複してるからとりあえずCO
// function toggleBioState(btn) {
//   //状態管理関数
//   const isActive = btn.dataset.state === 'active'; //今の状態が active かどうか を判定
//   const newState = isActive ? BIO_STATES.INACTIVE : BIO_STATES.ACTIVE; //三項演算子（条件 ? 真の値 : 偽の値）を使って、状態を切り替えてる。- isActive が true なら INACTIVE に、false なら ACTIVE に

//   //UI更新3つの操作
//   btn.textContent = newState.symbol; //値シンボルを更新
//   btn.classList.toggle('active', isActive); //クラスをトグルする
//   btn.dataset.state = isActive ? 'inactive' : 'active'; //三項演算子で状態を更新して次のクリックに備える
// }

//3. クリックされたときに関数を実行
document.addEventListener('DOMContentLoaded', () => {
  const btn = document.getElementById('toggleBioBtn');
  btn.addEventListener('click', () => toggleBioState(btn));
});


// TODO 短い文/長い分のトグル
// // 1. 要素を取得
// const btn = document.getElementById('toggleBioBtn');
// const bio = document.getElementById('bio');

// //データの状態を定義するためにオブジェクトを使用
// const BIO_CONTENT = {
//   SHORT: "映画アート漫画読書好きアウトドアマンです",
//   FULL: `
//     映画やアート、漫画、読書を浅く広く楽しむアウトドアマンです。<br>
//     好きな映画監督：好きな映画監督: クリストファー・ノーラン、デヴィッド・フィンチャー、マーティン・スコセッシ<br>
//     好きなアーティスト: エゴン・シーレ、ニコラ・ド・スタール、アンドリュー・ワイエス、ゲルハルト・リヒター<br>
//     好きな漫画家：松本大洋、山本英夫、桜井画門、浦沢直樹、新井英樹、沙村広明、テラカツ<br>
//     好きな作家: 特別好きな作家はなく図書館をウロウロして興味がひかれる本を雑多に借りて、読んだり読まなかったりする。
//   `
// };

// // 2. 取得した要素を利用して関数を定義
// function toggleBioContent(btn, bio) {
//   const isExpanded = btn.dataset.state === 'active'; // 今の状態が ”長文が表示されているか” 判定
//   const newState = isExpanded ? 'inactive' : 'active'; // 三項演算子で状態を切り替え

//   // UI更新
//   bio.innerHTML = isExpanded ? BIO_CONTENT.SHORT : BIO_CONTENT.FULL;
//   btn.textContent = isExpanded ? "もっと見る" : "閉じる"; //上記に機能が重複しているソースコードがあるからいったんCOして無効化
//   btn.classList.toggle('active', !isExpanded);
//   btn.dataset.state = newState;
// }


// // 3. 定義した関数を実行する条件を定義 全然理解できてないAIが出したやつをとりあえずコピペしてる#202509070446
// document.addEventListener('DOMContentLoaded', () => {
//   const btn = document.getElementById('toggleBioBtn');
//   const bio = document.getElementById('bio');

//   // 初期状態の設定
//   bio.innerHTML = BIO_CONTENT.SHORT;
//   btn.dataset.state = 'inactive';

//   // イベント登録
//   btn.addEventListener('click', () => toggleBioContent(btn, bio));
// });


// 1. 要素とデータをまとめて定義
const btn = document.getElementById('toggleBioBtn');
const bio = document.getElementById('bio');
const STATE = {
  inactive: {
    symbol: 'もっと見る',
    content: '映画アート漫画読書好きアウトドアマンです'
  },
  active: {
    symbol: '閉じる',
    content: `
      映画やアート、漫画、読書を浅く広く楽しむアウトドアマンです。<br>
      好きな映画監督：ノーラン、フィンチャー、スコセッシ<br>
      好きな漫画家：松本大洋、浦沢直樹、新井英樹など<br>
      好きなアーティスト：シーレ、ワイエス、リヒターなど
    `
  }
};

// 2. 単一のトグル関数
function toggleBio(btn, bio) {
  // 次の状態を決定
  const next = btn.dataset.state === 'active' ? 'inactive' : 'active';

  // 状態を更新（これを真実の情報源にする）
  btn.dataset.state = next;

  // UIをレンダリング
  bio.innerHTML   = STATE[next].content;
  btn.textContent = STATE[next].symbol;
  btn.classList.toggle('active', next === 'active');
}

// 3. イベント登録
document.addEventListener('DOMContentLoaded', () => {
  // 初期レンダリング
  btn.dataset.state = 'inactive';
  bio.innerHTML     = STATE.inactive.content;
  btn.textContent   = STATE.inactive.symbol;

  btn.addEventListener('click', () => toggleBio(btn, bio));
});