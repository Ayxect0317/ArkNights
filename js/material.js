"use strict";

import handleMaterial from "./material/class/handleMaterial.js";
import materialTable from "./material/class/materialTable.js";

/* -----
    section上段のDOM操作
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
    section中段のDOM操作
----- */

/* "理性効率とは？" をクリックしたとき、モルダーを表示する */
// 参考: https://tech-dig.jp/js-modal/
function popupImage() {
  const popup = document.getElementById('js-popup');
  if(!popup) return;

  const blackBg = document.getElementById('js-black-bg');
  const closeBtn = document.getElementById('js-close-btn');
  const showBtn = document.getElementById('js-show-popup');

  closePopUp(blackBg);
  closePopUp(closeBtn);
  closePopUp(showBtn);
  function closePopUp(elem) {
    if(!elem) return;
    elem.addEventListener('click', function() {
      popup.classList.toggle('is-show');
    });
  }
}
popupImage();

/* -----
    section下段のDOM操作
----- */

// 素材一覧表を作成する
/*
現在は直接HTMLファイルに書き込むため実行しない
let matTable = new materialTable();
matTable.create();
*/

// タブ選択で素材の品質を変更できるようにする

// 中級素材をデフォルトのActiveに設定
document.getElementsByClassName("materialTable content3")[0].classList.add("active");
// spanタグがクリックされた時、Activeを変更
document.querySelectorAll(".tab-buttons span").forEach(span => {
  span.onclick = () => {
    // Activeを全て消去
    document.querySelectorAll(".materialTable").forEach(table => { table.classList.remove("active"); })

    // clickされたspanのクラス名をActiveに
    document.getElementsByClassName(`materialTable ${span.className}`)[0].classList.add("active");
  }
})

// 素材一覧から素材をクリックしたとき、section上部をクリックされた素材の情報へ更新する
/* 基礎素材 */
const b_materials = ["b_rock", "b_souchi", "b_ester", "b_glucose", "b_iron", "b_achetone"]
/* 初級素材 */
const l_materials = ["l_rock", "l_souchi", "l_ester", "l_glucose", "l_iron", "l_achetone"]
/* 中級素材 */
const m_materials = ["m_manganese", "m_toishi", "m_rma", "m_alcohol", "m_rock", "m_souchi",
    "m_ester", "m_glucose", "m_iron", "m_achetone", "m_gel", "m_alloy"];
/* 上級素材 */
const h_materials = ["h_manganese", "h_toishi", "h_rma", "h_alcohol", "h_rock", "h_souchi",
    "h_ester", "h_glucose", "h_iron", "h_achetone", "h_gel", "h_alloy"];
/* 高級素材 */
const e_materials = ["e_d32", "e_nano", "e_fusion"];

const all_materials = [b_materials, l_materials, m_materials, h_materials, e_materials];


// 処理内容
function changeMaterial(handleM, val) {
    handleM.id = val;
    handleM.showMaterialNameAndImg();
    handleM.showStagesToGet();
}

// 実行
for (let oneQualityMaterials of all_materials) {
    for (let matId of oneQualityMaterials) {
        document.querySelectorAll(`.${matId}`).forEach(item => {
            item.onclick = () => { changeMaterial(handleM, matId) }
        });
    }
}
