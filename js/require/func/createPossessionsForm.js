"use strict";

import convertMaterialIdToName from "../../material/func/convertMaterialIdToName.js";
import option0to40 from "./option0to40.js";

/**
 * require.htmlの左下セクション (#input2) のHTMLタグを生成する
 */
export default function createPossessionsForm (lowmaterialObject) {
  let message = `
    <p>所持数を選択してください。</p>
    <form name="possessionsForm" action="">
  `;

  const keys = Object.keys(lowmaterialObject)
  for (let i = 0; i < keys.length; i++) {
    const materialId = Object.keys(lowmaterialObject)[i]; // 素材IDの取得
    const materialName = convertMaterialIdToName(materialId); // 素材名に変換

    message = message
      + `${materialName}<select name="mat${i}Num">`
      + option0to40()
      + "</select><br>";
  }
  message = message + "</form>";
  return message;
}