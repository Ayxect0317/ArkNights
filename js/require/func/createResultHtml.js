"use strict";

import convertMaterialIdToLink from "../../material/func/convertMaterialIdToLink.js";
import convertMaterialIdToName from "../../material/func/convertMaterialIdToName.js";

/**
 * require.htmlの右側 (#result) のHTMLタグを生成する
 */
export default function createResultHtml (materialId, quantity, requireObject) {
  let message =
    `<p>${convertMaterialIdToName(materialId)}を ${quantity} 個作成するのに<br>
    必要な素材は以下の通りです。</p>`;

  message = message + "<p>";
  for (let materialId in requireObject) {
    // 素材画像をクリックしたとき新しいタブを開きたいので、
    // convertMaterialIdToLinkの第2引数はtrue
    message = message
      + `${convertMaterialIdToLink(materialId, true)}x${requireObject[materialId]}`;
  }
  message = message + "</p>";

  return message;
}