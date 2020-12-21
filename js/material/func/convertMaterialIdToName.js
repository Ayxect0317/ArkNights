"use strict";

/**
 * 素材IDを素材名に変換する
 */
import constM from "../constant/constantOfMaterial.js"

export default function convertMaterialIdToName(materialId) {
  return constM[materialId];
}
