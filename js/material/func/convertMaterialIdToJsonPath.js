"use strict";

// 素材IDからJSONのファイルパスを返す
export default function convertMaterialIdToQuality(id) {
  // JSONファイルの頭文字は素材の品質の頭文字（大文字）
  // e.g. 中級素材 (middle) => M_Material.json
  const quality = id.slice(0, 1).toUpperCase();
  return `../../src/json/${quality}_Material.json`;
}
