// TODO「もっと見る / 閉じる」ボタン


//ろーずさんサンプルコード
// function addButtonOperation() {
//   if(btn.textContent == "もっと見る"){
//     btn.textContent = "閉じる";
//   } else {  
//     btn.textContent = "もっと見る";
//   }
// }

// function toggleBioEvents(){
//   const bioButton = document.getElementById("toggleBioBtn");
//   console.log(bioButton);

//   bioButton.addEventListener("click", addButtonOperation)
// }

// --------------------------------

let BIO_CONTENT = "映画やアート、漫画、読書を浅く広く楽しむアウトドアマンです。好きな映画監督：ノーラン、フィンチャー、スコセッシ好きな漫画家：松本大洋、浦沢直樹、新井英樹など好きなアーティスト：シーレ、ワイエス、リヒターなど"


function toggleBioEvents(){
  const bioButton = document.getElementById("toggleBioBtn");
  const bioContent = document.getElementById("bio");

  console.log(bioButton);
  console.log(bioContent);


  bioButton.addEventListener("click", () => {
    if(bioButton.textContent == "もっと見る"){
        bioButton.textContent = "閉じる";
        bioContent.textContent = BIO_CONTENT;

      } else {  
        bioButton.textContent = "もっと見る";
        bioContent.textContent = "簡単な自己紹介：映画アート漫画読書好きアウトドアマン";
      }
  })
}

toggleBioEvents();
