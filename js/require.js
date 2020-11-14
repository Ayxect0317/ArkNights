"use strict";

import handleMaterial from "./material/class/handleMaterial.js";
import convertMaterialIdToImgTag from "./material/func/convertMaterialIdToImgTag.js"

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

  /* 下位素材の連想配列を取得する */
  const handleM = new handleMaterial(material);
  let message = "";

  // 連想配列をメッセージに変換
  // createLowMaterialListはasync関数なので、変数messageのスコープは関数内であることに注意
  handleM.createLowMaterialList().then(lowMaterialList => {
    for (let matId in lowMaterialList) {
      message = message +
        `${convertMaterialIdToImgTag(matId)}x${lowMaterialList[matId] * quantity} `;
    }
    // 出力
    document.getElementById("result").innerHTML = message;
  })

}

/* -----
    section左下部のDOM操作
----- */

/* -----
    section右部のDOM操作
----- */
