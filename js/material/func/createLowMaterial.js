"use strict";

import convertRecipieToTag from "./convertRecipieToTag.js";

/**
 * 与えられたオブジェクトをもとに、下位素材のHTMLを作成する
 */
export default function createLowMaterial(lowMaterialRecipieObject) {
  // HTMLの中身を作成
  const content =  lowMaterialRecipieObject
    ? `必要素材: ${convertRecipieToTag(lowMaterialRecipieObject)}`
    : `<span class="note">下位素材はありません。</span>`;

  return `<p>
      <下位素材><br>
      ${content}
    </p>`;
}
