"use strict";

import handleRequire from "./require/class/handleRequire.js";
import convertMaterialIdToImgTag from "./material/func/convertMaterialIdToImgTag.js"
import convertMaterialIdToName from "./material/func/convertMaterialIdToName.js"

/**
    section左上部のDOM操作
 */
const calcRequireMaterials =  async () => {
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
  await handleR.createResult();

  /**
      section左下部のDOM操作
   */
  await handleR.createInput2Html();


  /**
    所持数更新後の処理（開発中）
    innerHTMLで生成したFormに対してDOM操作ができない
  -----*/
  /* メインプログラム */
  const changePossessions = () => {
    const input2Form = document.possessionsForm;
    const select0 = input2Form.mat0Num.selectedIndex;
    const select1 = input2Form.mat1Num ? input2Form.mat1Num.selectedIndex : 0;
    const select2 = input2Form.mat2Num ? input2Form.mat2Num.selectedIndex : 0;
    handleR.changePossessions(select0, select1, select2);
  }

  /* EventListenerの設定 */
  // 上級源岩は合成に必要な素材が1種類なので、
  // select1, select2がundefinedになる可能性があることに注意
  const input2Form = document.possessionsForm;
  const select0 = input2Form.mat0Num;
  const select1 = input2Form.mat1Num;
  const select2 = input2Form.mat2Num;
  select0.addEventListener("change", changePossessions);
  if (select1) { select1.addEventListener("change", changePossessions) };
  if (select2) { select2.addEventListener("change", changePossessions) };
}

/* Execボタン */
const button = document.getElementById("exec");
button.addEventListener("click", calcRequireMaterials);
