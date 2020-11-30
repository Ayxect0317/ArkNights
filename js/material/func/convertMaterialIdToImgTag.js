"use strict";

import convertMaterialIdToQuality from "./convertMaterialIdToQuality.js"
import convertMaterialIdToName from "./convertMaterialIdToName.js";

// 素材IDを画像パスへ変換する
// 第2引数が整数として設定されていれば、heightを第2引数に
export default function convertMaterialIdToImgTag(id, ...heights) {
  // imgタグの基本構造を設定
  const defaultHeight = 75;
  let firstPath = `<img src="../src/image/material/`;
  let height = Number.isInteger(heights[0]) ? heights[0] : defaultHeight;
  let lastPath = `.png" class="${id}" height="${height}" alt=${convertMaterialIdToName(id)}>`;

  // 素材IDから素材の品質を取得する
  const quality = convertMaterialIdToQuality(id);

  return `${firstPath}${quality}/${id}${lastPath}`;
}
