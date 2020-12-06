"use strict";

import convertMaterialIdToLink from "../func/convertMaterialIdToLink.js";
import convertMaterialIdToName from "../func/convertMaterialIdToName.js";
import convertRecipieToTag from "../func/convertRecipieToTag.js";


/**
 * 与えられたオブジェクトをもとに、上位素材のHTMLを作成する
 */
export default function createSuperiorMaterial(superiorMaterialsObject) {
  let message = "<p><上位素材>";

  if (superiorMaterialsObject) {
    for (const superiorMaterialObject of superiorMaterialsObject) {
      // 上位素材の画像と素材名を表示する
      message = message
        + `${convertMaterialIdToLink(superiorMaterialObject.id)}`
        + `${convertMaterialIdToName(superiorMaterialObject.id)}<br>`;

      // 必要素材を [画像]x[個数]の形式で表示
      message = message +
        `必要素材: ${convertRecipieToTag(superiorMaterialObject.recipie)}`;
    }
  } else {
    message = message + `<br><span class="note">上位素材はありません。</span></p>`;
  }
  return message;
}
