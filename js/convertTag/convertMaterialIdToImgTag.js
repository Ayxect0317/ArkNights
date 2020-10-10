"use strict";

import convertMaterialIdToQuality from "../util/convertMaterialIdToQuality.js"

// 素材IDから画像パスを取得する
// 第2引数が整数として設定されていれば、heightを第2引数に
export default function convertMaterialIdToImgTag(id, ...setHeight) {
    // imgタグの基本構造を設定
    const defaultHeight = 75
    let firstPath = "<img src='../src/image/material/";
    let height = Number.isInteger(setHeight[0]) ? setHeight : defaultHeight;
    let lastPath = `.png' class='${id}' height='${height}'>`;

    // 素材IDから素材の品質を取得する
    const quality = convertMaterialIdToQuality(id);

    return `${firstPath}${quality}/${id}${lastPath}`;
}
