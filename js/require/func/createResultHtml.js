"use strict";

import convertMaterialIdToLink from "../../material/func/convertMaterialIdToLink.js";
import convertMaterialIdToName from "../../material/func/convertMaterialIdToName.js";

/* require.htmlの右側 (#result) のHTMLタグを生成 */
export default function createResultHtml (matId, quantity, requireList) {
  let message =
    `<p>${convertMaterialIdToName(matId)}を ${quantity} 個作成するのに<br>
    必要な素材は以下の通りです。</p>`;
    message = message + "<p>";
    for (let matId in requireList) {
      message = message
        + `${convertMaterialIdToLink(matId, true)}x${requireList[matId]}`;
    }
    message = message + "</p>";
  return message;
}