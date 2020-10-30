"use strict";

// 素材IDから素材の品質を取得する
export default function convertMaterialIdToQuality(id) {
  let quality;
  switch (id.slice(0, 1)) {
    case "e":
      quality = "highEnd";
      break;
    case "h":
      quality = "high";
      break;
    case "m":
      quality = "middle";
      break;
    case "l":
      quality = "low";
      break;
    case "b":
      quality = "basic";
      break;
  }

  return quality;
}
