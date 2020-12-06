"use strict";

/**
 * 素材IDをJSONのファイルパスに変換する
 * JSONファイルは../../src/json/ 以下に格納されている
 *
 * JSONファイル名は *_Material.json
 * (*は素材の品質の頭文字（大文字: e.g. 中級素材 (middle) => M_Material.json
 */
export default function convertMaterialIdToQuality(materialId) {
  // 素材IDの先頭文字を取得し、大文字に変換する
  const quality = materialId.slice(0, 1).toUpperCase();

  return `../../src/json/${quality}_Material.json`;
}
