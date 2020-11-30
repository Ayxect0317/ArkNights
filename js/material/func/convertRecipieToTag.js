"use strict";

import convertMaterialIdToLink from "./convertMaterialIdToLink.js";

// 合成レシピをHTMLタグに変換する
// 形式は "[画像]x[個数]"
export default function convertRecipieToTag(recipieList) {
    let message = "";
    for (let requireMaterial of recipieList) {
        message = message + `${convertMaterialIdToLink(requireMaterial["id"])}x${requireMaterial["quantity"]}  `;
    }
    return message;
}