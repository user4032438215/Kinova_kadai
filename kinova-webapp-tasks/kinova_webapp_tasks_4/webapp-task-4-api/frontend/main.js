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

});