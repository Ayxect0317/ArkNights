"use strict";

import { convertMaterialIdToImgTag } from "./convertTag/convertMaterialIdToImgTag.js";
import { convertRecipieToTag } from "./convertTag/convertRecipieToTag.js";

class handleMaterial {
    constructor(id) {
        this._id = id;
        this.jsonPath = "../src/json/M_Material.json";
    }

    get id() { return this._id };
    set id(val) { this._id = val };

    // 素材名と画像をHTMLへ出力する
    async showMaterialNameAndImg() {
        // JSONから必要なデータを抽出
        const response = await fetch(this.jsonPath);
        const data = await response.json();
        const materialList = data.materials.filter(k => k.id === this._id)[0];

        // 出力
        document.getElementById("materialName").innerHTML =
            `${convertMaterialIdToImgTag(materialList.id)}${materialList.name}`;
    }

    // 収集場所を出力する
    async showStagesToGet() {
        // JSONから必要なデータを抽出
        const response = await fetch(this.jsonPath);
        const data = await response.json();
        const materialList = data.materials.filter(k => k.id === this._id)[0];
        let stages = materialList.stageToGet;

        // 出力
        let message = "<p><収集場所></p>";
        for (const stage of stages) {
            message = message + `<p>${stage}</p>`;
        }
        document.getElementById("description").innerHTML = message;
    }

    // 上位素材を表示する
    async showSuperiorMaterial() {
        // JSONから必要なデータを抽出
        const response = await fetch(this.jsonPath);
        const data = await response.json();
        const materialList = data.materials.filter(k => k.id === this._id)[0];
        const superiorMaterials = materialList.superiorMaterial;

        // 出力
        let message = "<p><上位素材>";
        if (superiorMaterials) {
            for (const superiorMaterial of superiorMaterials) {
                // 上位素材画像を表示する
                message = message + `${convertMaterialIdToImgTag(superiorMaterial.id)}`;

                // 上位素材名を表示する
                message = message + `${superiorMaterial.name}<br>`;

                // 必要素材を [画像]x[個数]の形式で表示
                message = message +
                    `必要素材: ${convertRecipieToTag(superiorMaterial.recipie)}</$>`;
            }
        } else {
            message = message + "<br>上位素材はありません。</br>"
        }

        document.getElementById("description").innerHTML = message;
    }

    // 下位素材を表示する
    async showLowMaterial() {
        // JSONから必要なデータを抽出
        const response = await fetch(this.jsonPath);
        const data = await response.json();
        const materialList = data.materials.filter(k => k.id === this._id)[0];
        const lowMaterialRecipie = materialList.lowMaterialRecipie;

        // 必要素材を [画像]x[個数]の形式で表示
        let message = "<p><下位素材>";
        if (lowMaterialRecipie) {
            message = message +
                `<br>必要素材: ${convertRecipieToTag(lowMaterialRecipie), 50}</p>`;
        } else {
            message = message + "<br>下位素材はありません。</br>"
        }

        document.getElementById("description").innerHTML = message;
    }
}


// html読み込み時、収集場所をデフォルトとして表示
let handleM = new handleMaterial("m_manganese");
window.addEventListener('DOMContentLoaded', handleM.showMaterialNameAndImg());
window.addEventListener('DOMContentLoaded', handleM.showStagesToGet());

// "収集場所"クリック時、収集場所を表示
document.getElementById("stageToGet").onclick = () => { handleM.showStagesToGet() }

// "上位素材"クリック時、上位素材を表示
document.getElementById("superiorMaterial").onclick = () => { handleM.showSuperiorMaterial() }

// "下位素材"クリック時、下位素材を表示
document.getElementById("lowMaterial").onclick = () => { handleM.showLowMaterial() }

// 素材の画像をクリックしたとき、クリックされた素材の情報になるようにする