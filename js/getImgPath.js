"use strict";

// 素材IDから画像パスを取得する
export function getImgPath(id) {
    let firstPath = "<img src='../src/image/material/";
    let lastPath = ".png' height='100'>";
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
