"use strict";

import convertMaterialIdToLink from "./convertMaterialIdToLink.js";

/**
 * 合成レシピ内の下位素材それぞれに対して、HTMLタグに変換する
 * 変換形式は "[画像]x[個数]"
 */
export default function convertRecipieToTag(recipieObject) {
    let message = "";
    for (let requireMaterial of recipieObject) {
        message = message
        + `${convertMaterialIdToLink(requireMaterial["id"])}x${requireMaterial["quantity"]}`;
    }
    return message;
}