"use strict";

import convertMaterialIdToImgTag from "./convertMaterialIdToImgTag.js"

// 素材IDをaタグへ変換する
// aタグの中身はimgタグ
// クエリパラメータに素材IDを追加する
export default function convertMaterialIdToLink(id, newTab=false, ...height) {
  // imgタグをconvertMaterialIdToImgTagで作成
  const imgUrl = convertMaterialIdToImgTag(id, ...height);

  // aタグの基本構造を設定
  let firstPath = `<a href="./material.html?`;
  if (newTab) {
    // 新しいタブを開くとき
    // relの内容はセキュリティ対策
    firstPath = `<a target="_blank" rel="noopener noreferrer" href="./material.html?`
  }
  let lastPath = "</a>";

  // 素材IDをパラメータに変換する
  const query = `matId=${id}">`;

  // 出力
  return `${firstPath}${query}${imgUrl}${lastPath}`;
}
