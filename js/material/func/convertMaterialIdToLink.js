"use strict";

import convertMaterialIdToImgTag from "./convertMaterialIdToImgTag.js"

/**
 * 素材IDをaタグへ変換する
 * aタグの中にimgタグを挿入する
 * href属性で、クエリパラメータに素材IDを設定する
 */
export default function convertMaterialIdToLink(materialId, newTab=false, height=null) {
  /* imgタグをconvertMaterialIdToImgTagで作成 */
  const imgUrl = convertMaterialIdToImgTag(materialId, height=null);

  /* aタグの基本構造を設定 */
  const href = `href="./material.html?`;
  const attributes = (newTab) ?
    // 新しいタブを開くとき
    // relにキーワードを設定し、セキュリティ対策を施す
    `target="_blank" rel="noopener noreferrer" ${href}` :

    // 新しいタブを開かないとき（デフォルト）
    `${href}`;

  // 出力
  return `<a ${attributes}matId=${materialId}">${imgUrl}</a>`;
}
