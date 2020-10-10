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
----- */

// 素材一覧表を作成する
let matTable = new materialTable();
matTable.create();

// 素材一覧から素材のtdタグをクリックしたとき、section上部がクリックされた素材の情報になるようにする