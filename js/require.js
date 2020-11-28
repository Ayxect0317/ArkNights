"use strict";

import handleMaterial from "./material/class/handleMaterial.js";
import convertMaterialIdToImgTag from "./material/func/convertMaterialIdToImgTag.js"
import convertMaterialIdToName from "./material/func/convertMaterialIdToName.js"
import option0to20 from "./require/func/option0to20.js"

/* -----
    section左上部のDOM操作
----- */
const button = document.getElementById("exec");
button.addEventListener("click", calcRequireMaterials);

function calcRequireMaterials() {
  /* 素材名 */
  // selectタグの何番目が選択されているかを取得
  const preMaterial = document.selectMaterialForm.material
  const num = preMaterial.selectedIndex;
  // selectタグの内容を取得
  const material = preMaterial.options[num].value

  /* 必要個数 */
  // 0番目からスタートするので、必要個数は1を足した値
  const quantity = document.selectMaterialForm.quantity.selectedIndex + 1;

  // 下位素材の連想配列を取得
  const handleM = new handleMaterial(material);

  // 連想配列をメッセージに変換
  // createLowMaterialListはasync関数なので、変数messageのスコープは関数内であることに注意
  handleM.createLowMaterialList().then(lowMaterialList => {
    // 収集素材と必要数を表示
    let message = `<p>${convertMaterialIdToName(material)}を ${quantity} 個作成するのに<br>
      必要な素材は以下の通りです。</p>`;

    // 必要素材を画像で表示
    message = message + "<p>";
    for (let matId in lowMaterialList) {
      message = message
        + `${convertMaterialIdToImgTag(matId)}x${lowMaterialList[matId] * quantity} `;
    }
    message = message + "</p>";

    // 出力
    document.getElementById("result").innerHTML = message;
  })

/* -----
    section左下部のDOM操作
----- */
  /* Execボタンが押された時、必要素材に合わせたフォームを表示 */
  handleM.createLowMaterialList().then(lowMaterialList => {
    let contentOfForm =　`
    <p>所持数を選択してください</p>
    <form name="possessionsForm" action="">
  `;

    /* selectタグの挿入 */
    // 素材IDの配列を取得
    let keys = Object.keys(lowMaterialList)

    // メイン処理
    for (let i=0; i<keys.length; i++) {
      let matId = Object.keys(lowMaterialList)[i]; // 素材IDの取得
      let matName = convertMaterialIdToName(matId); // 素材名に変換

      contentOfForm = contentOfForm + convertMaterialIdToName(matId)
      + `<select name=mat${i}Num>`
      + option0to20()
      + "</select><br>";
    }

    // 閉じタグの挿入
    contentOfForm = contentOfForm + "</form>";

    // DOM要素への変換
    let doc = new DOMParser().parseFromString(contentOfForm, "text/html")
    doc = doc.querySelector("form").outerHTML;

    // 出力
    document.getElementById("input2").innerHTML = doc;
  })

  // フォームを表示
  const ExtraFormSection = document.getElementById("input2");
  ExtraFormSection.classList.remove("hidden");


  /* -----
    所持数更新後の処理
  -----*/
  /* EventListenerの設定 */
  let select0 = document.possessionsForm.mat0Num;
  let select1 = document.possessionsForm.mat1Num;
  let select2 = document.possessionsForm.mat2Num;

  // 上級源岩は合成に必要な素材が1種類なので、
  // select1, select2がundefinedになる可能性があることに注意
  select0.addEventListener("change", changePossessions);
  if (select1) {select1.addEventListener("change", changePossessions);}
  if (select2) {select2.addEventListener("change", changePossessions);}

  /* 関数定義 */
  function changePossessions() {
    select0 = document.possessionsForm.mat0Num;
    select1 = document.possessionsForm.mat1Num;
    select2 = document.possessionsForm.mat2Num;
    console.log(`${select0}, ${select1}, ${select2}`)
  }
}
