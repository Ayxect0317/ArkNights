"use strict";

import { convertMaterialIdToImgTag } from "./convertTag/convertMaterialIdToImgTag.js";
import { convertRecipieToTag } from "./convertTag/convertRecipieToTag.js";

class handleMaterial {
    constructor(jsonPath) {
        this.jsonPath = jsonPath;
    }

    // 素材名と画像をHTMLへ出力する
    async showMaterialNameAndImg() {
        const response = await fetch(this.jsonPath);
        const data = await response.json();
        const materialList = data["materials"][4];
        document.getElementById("materialName").innerHTML =
            `${convertMaterialIdToImgTag(materialList["id"])}${materialList["name"]}`;
    }

    // 収集場所を出力する
    async showStagesToGet() {
        let message = "";
        const response = await fetch(this.jsonPath);
        const data = await response.json();
        const materialList = data["materials"][4];
        let stages = materialList["stageToGet"]
        for (const stage of stages) {
            message = message + `<p>${stage}</p>`;
        }
        document.getElementById("description").innerHTML = message;
    }

    // 上位素材を表示する
    async showSuperiorMaterial() {
        let message = "";

        const response = await fetch(this.jsonPath);
        const data = await response.json();
        const superiorMaterials = data["materials"][4]["superiorMaterial"];

        if (superiorMaterials) {
            for (const superiorMaterial of superiorMaterials) {
                // 上位素材画像を表示する
                message = message + `<p>${convertMaterialIdToImgTag(superiorMaterial["id"], 80)}`;

                // 上位素材名を表示する
                message = message + `${superiorMaterial["name"]}<br>`;

                // 必要素材を [画像]x[個数]の形式で表示
                message = message +
                    `必要素材: ${convertRecipieToTag(superiorMaterial["recipie"])}</$>`;
            }
        } else {
            message = "<p>上位素材はありません。</p>"
        }

        document.getElementById("description").innerHTML = message;
    }

    // 下位素材を表示する
    async showLowMaterial() {
        let message = "";

        const response = await fetch(this.jsonPath);
        const data = await response.json();
        const lowMaterialRecipie = data["materials"][4]["lowMaterialRecipie"];

        // 必要素材を [画像]x[個数]の形式で表示
        if (lowMaterialRecipie) {
            message = message +
                `必要素材: ${convertRecipieToTag(lowMaterialRecipie)}</p>`;
        } else {
            message = "<p>下位素材はありません。</p>"
        }

        document.getElementById("description").innerHTML = message;
    }
}

// html読み込み時、収集場所をデフォルトとして表示
let handleM = new handleMaterial("../src/json/M_Material.json");
window.addEventListener('DOMContentLoaded', handleM.showMaterialNameAndImg());
window.addEventListener('DOMContentLoaded', handleM.showStagesToGet());

// "収集場所"クリック時、収集場所を表示
document.getElementById("stageToGet").onclick = () => { handleM.showStagesToGet() }

// "上位素材"クリック時、上位素材を表示
document.getElementById("superiorMaterial").onclick = () => { handleM.showSuperiorMaterial() }

// "下位素材"クリック時、下位素材を表示
document.getElementById("lowMaterial").onclick = () => { handleM.showLowMaterial() }
