"use strict";

import handleRequire from "./require/class/handleRequire.js";
import convertMaterialIdToImgTag from "./material/func/convertMaterialIdToImgTag.js"
import convertMaterialIdToName from "./material/func/convertMaterialIdToName.js"

/* -----
    section左上部のDOM操作
----- */
const calcRequireMaterials = () => {
  /* 素材ID */
  // selectタグの何番目が選択されているかを取得
  const preMaterial = document.selectMaterialForm.material
  const num = preMaterial.selectedIndex;
  // selectタグの内容を取得
  const matId = preMaterial.options[num].value

  /* 必要個数 */
  // 0番目からスタートするので、必要個数は1を足した値
  const quantity = document.selectMaterialForm.quantity.selectedIndex + 1;

  /* メイン処理 */
  const handleR = new handleRequire(matId, quantity);
  handleR.createResultHtml();

  /* -----
      section左下部のDOM操作
  ----- */
  handleR.createInput2Html();


  /* -----
    所持数更新後の処理（開発中）
    innerHTMLで生成したFormに対してDOM操作ができない
  // EventListenerの設定
  console.log(document.getElementById("input2Form"));
  let input2Form = document.getElementById("input2Form");
  let select0 = input2Form.mat0Num;
  let select1 = input2Form.mat1Num;
  let select2 = input2Form.mat2Num;
  console.log(select0);
  console.log(select1);
  console.log(select2);
  // 上級源岩は合成に必要な素材が1種類なので、
  // select1, select2がundefinedになる可能性があることに注意
  select0.addEventListener("change", changePossessions);
  if (select1) {select1.addEventListener("change", changePossessions);}
  if (select2) {select2.addEventListener("change", changePossessions);}

  // 関数定義
  function changePossessions() {
    select0 = document.possessionsForm.mat0Num;
    select1 = document.possessionsForm.mat1Num;
    select2 = document.possessionsForm.mat2Num;
    console.log(`${select0}, ${select1}, ${select2}`)
  }
  -----*/
}

const button = document.getElementById("exec");
button.addEventListener("click", calcRequireMaterials);
