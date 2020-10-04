"use strict";

import { getImgPath } from "./getImgPath.js";

// 合成レシピをHTMLタグに変換する
// 形式は "[画像]x[個数]"
export function convertRecipieToTag(recipieList) {
    console.log(recipieList);
    let message = "";
    for (let requireMaterial of recipieList) {
        message = message + `${getImgPath(requireMaterial["id"], 75)}x${requireMaterial["quantity"]}  `;
    }
    return message;
}