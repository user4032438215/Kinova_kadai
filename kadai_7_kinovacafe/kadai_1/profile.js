// TODO「もっと見る / 閉じる」ボタン
//1. データの状態を定義（キー（INACTIBE）と価（｛ Symbol: ｝）のペアを持つオブジェクト。しかも値は入れ子になってる）
const BIO_STATES = {
    INACTIVE: { symbol: "もっと見る", className: '' },
    ACTIVE: { symbol: "閉じる", className: 'active' }
};

//2. 状態を管理する関数
function toggleBioState(btn) {
    //状態管理関数
    const isActive = btn.dataset.state === 'active'; //今の状態が active かどうか」を判定
    const newState = isActive ? BIO_STATES.INACTIVE : BIO_STATES.ACTIVE; //三項演算子（条件 ? 真の値 : 偽の値）を使って、状態を切り替えてる。- isActive が true なら INACTIVE に、false なら ACTIVE に

    //UI更新3つの操作
    btn.textContent = newState.symbol; //値シンボルを更新
    btn.classList.toggle('active', isActive); //クラスをトグルする
    btn.dataset.state = isActive ? 'inactive' : 'active'; //三項演算子で状態を更新して次のクリックに備える
}

//3. クリックされたときに関数を実行
document.addEventListener('DOMContentLoaded', () => {
  const btn = document.getElementById('toggleBioBtn');
  btn.addEventListener('click', () => toggleBioState(btn));
});