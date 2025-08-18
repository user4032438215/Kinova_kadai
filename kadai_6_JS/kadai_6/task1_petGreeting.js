const yourPet = document.getElementById('petName');
const btn = document.getElementById('btn');
const result = document.getElementById('result'); //入力されたpetName,btn,result要素を取得

function praisePet(name){
    return name + "はとてもかわいいです！";
} //関数名は praisePet とし、引数にペットの名前（文字列）を渡す。

btn.addEventListener("click", function () { //btnがクリックされたら関数（引数はyourPetって記述してたけど匿名関数のほうがいいって言われた)を実行
    const pet = yourPet.value; //入力されたテキストをpetに代入
    result.textContent = praisePet(pet); //result要素に関数の実行結果を表示
});