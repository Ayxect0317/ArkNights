"use strict";

import { getImgPath } from "./getImgPath.js";

class handleMaterial {
    constructor(jsonPath) {
        this.jsonPath = jsonPath;
    }

        // 素材名と画像をHTMLへ出力する
        async showMaterialNameAndImg() {
            const response = await fetch(this.jsonPath);
            const data = await response.json();
            const materialList = data["materials"][0];
            document.getElementById("materialName").innerHTML =
                `${getImgPath(materialList["id"])}${materialList["name"]}`;
        }

        // 収集場所を出力する
        async showStagesToGet() {
            let message = "";
            const response = await fetch(this.jsonPath);
            const data = await response.json();
            const materialList = data["materials"][0];
            let stages = materialList["stageToGet"]
            for (const stage of stages) {
                message = message + `<p>${stage}</p>`;
            }
            document.getElementById("description").innerHTML = message;
        }

        // 上位素材を表示する
        showSuperiorMaterial() {
            let message = "";
            let materials = this.materialList["superiorMaterial"]

            if (materials) {
                for (const material of materials) {
                    message = message + `<p>${material}</p>`;
                }
            } else {
                message = "<p>上位素材はありません。</p>"
            }

            document.getElementById("description").innerHTML = message;
        }

        // 下位素材を表示する
        showLowMaterial() {
            let message = "";
            let materials = this.materialList["lowMaterial"]

            if (materials) {
                for (const material of materials) {
                    message = message + `<p>${material}</p>`;
                }
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
document.getElementById("stageToGet").onclick = () => { showStagesToGet() }

// "上位素材"クリック時、上位素材を表示
document.getElementById("superiorMaterial").onclick = () => { showSuperiorMaterial() }

// "下位素材"クリック時、下位素材を表示
document.getElementById("lowMaterial").onclick = () => { showLowMaterial(materialList) }
