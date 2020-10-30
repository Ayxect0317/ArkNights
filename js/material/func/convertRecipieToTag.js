"use strict";

import convertMaterialIdToImgTag from "./convertMaterialIdToImgTag.js";

// 合成レシピをHTMLタグに変換する
// 形式は "[画像]x[個数]"
export default function convertRecipieToTag(recipieList) {
    let message = "";
    for (let requireMaterial of recipieList) {
        message = message + `${convertMaterialIdToImgTag(requireMaterial["id"])}x${requireMaterial["quantity"]}  `;
    }
    return message;
}