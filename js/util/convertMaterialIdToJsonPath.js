"use strict";

// 素材IDからJSONのファイルパスを返す
export default function convertMaterialIdToQuality(id) {
  const firstPath = "../../src/json/";
  const lastPath = "_Material.json";
  let quality = id.slice(0, 1).toUpperCase();

  return firstPath + quality + lastPath;
}
