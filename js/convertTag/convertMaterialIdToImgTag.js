"use strict";

// 素材IDから画像パスを取得する
export function convertMaterialIdToImgTag(id, ...setHeight) {
    // imgタグの基本構造を設定
    let firstPath = "<img src='../src/image/material/";
    let height = Number.isInteger(setHeight[0]) ? setHeight : 100; //第2引数が整数として設定されていれば、heightを設定値に
    let lastPath = `.png' height='${height}'>`;

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

    return `${firstPath}${quality}/${id}${lastPath}`;
}
