"use strict";

import handleMaterial from "./class/handleMaterial.js";
import materialTable from "./class/materialTable.js";

/* -----
    section上部のDOM操作
----- */

// html読み込み時、収集場所をデフォルトとして表示
let handleM = new handleMaterial("m_manganese");
window.addEventListener("DOMContentLoaded", handleM.showMaterialNameAndImg());
window.addEventListener("DOMContentLoaded", handleM.showStagesToGet());

// "収集場所"クリック時、収集場所を表示
document.getElementById("stageToGet").onclick = () => { handleM.showStagesToGet() }

// "上位素材"クリック時、上位素材を表示
document.getElementById("superiorMaterial").onclick = () => { handleM.showSuperiorMaterial() }

// "下位素材"クリック時、下位素材を表示
document.getElementById("lowMaterial").onclick = () => { handleM.showLowMaterial() }


/* -----
    section下部のDOM操作
    現在は直接HTMLファイルに書き込むため実行しない
// 素材一覧表を作成する
let matTable = new materialTable();
matTable.create();
----- */


// 素材一覧から素材をクリックしたとき、section上部をクリックされた素材の情報へ更新する

/* 中級素材 */
const m_materials = ["m_manganese", "m_toishi", "m_rma", "m_alcohol", "m_rock", "m_souchi",
"m_ester", "m_glucose", "m_iron", "m_achetone", "m_gel", "m_alloy"];

// 処理内容
function changeMaterial(handleM, val) {
    handleM.id = val;
    handleM.showMaterialNameAndImg();
    handleM.showStagesToGet();
}

// 実行
for (let matId of m_materials) {
    document.querySelectorAll(`.${matId}`).forEach(item => {
        item.onclick = () => { changeMaterial(handleM, matId) }
    });
}
