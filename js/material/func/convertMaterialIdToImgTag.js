"use strict";

import convertMaterialIdToQuality from "./convertMaterialIdToQuality.js"
import convertMaterialIdToName from "./convertMaterialIdToName.js";

/**
 * 素材IDを画像パスへ変換する
 * 画像は ../src/image/material/（素材の品質）/ 以下に格納されている
 *
 * 第2引数が設定されているときは、第2引数を画像のhightとして設定する
 */
export default function convertMaterialIdToImgTag(materialId, height=null) {
  /* imgタグの基本構造を設定 */
  const defaultHeight = 75;
  const firstPath = `<img src="../src/image/material/`;
  height = Number.isInteger(height) ? height : defaultHeight;
  const lastPath =
    `.png" class="${materialId}" height="${height}" alt=${convertMaterialIdToName(materialId)}>`;

  /* 素材IDから素材の品質を取得する */
  const quality = convertMaterialIdToQuality(materialId);

  return `${firstPath}${quality}/${materialId}${lastPath}`;
}
