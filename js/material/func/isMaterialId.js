"use strict";

/**
 * 与えられた文字列が、素材IDであるか判定する
 */

import constM from "../constant/constantOfMaterial.js"

export default function isMatId(str) {
  const materialIds = constM.materialIds;
  return materialIds.includes(str);
}
