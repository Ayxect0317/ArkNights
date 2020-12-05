"use strict";

/**
 * 素材IDからJSONのファイルパスを返す
 */
export default function convertMaterialIdToQuality(id) {
  /**
   * 素材IDの先頭文字を取得し、大文字に変換する
   * JSONファイルの頭文字は素材の品質の頭文字（大文字）であるため
   * e.g. 中級素材 (middle) => M_Material.json
   */
  const quality = id.slice(0, 1).toUpperCase();
  return `../../src/json/${quality}_Material.json`;
}
