"use strict";

import convertMaterialIdToLink from "./convertMaterialIdToLink.js";

/**
 * 合成に必要な素材を、それぞれHTMLタグに変換する
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