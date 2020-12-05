"use strict";

import handleMaterial from "./material/class/handleMaterial.js";
import materialTable from "./material/class/materialTable.js";
import isMaterialId from "./material/func/isMaterialId.js";

/**
    section上段のDOM操作
 */
/* URLのリクエストから素材IDを取得 */
const defaultMatId = "m_manganese";
// 7文字目以降を取得 (?matid=の部分は必要ないため)
const request = window.location.search.substring(7,window.location.search.length) ?? defaultMatId;
// URLのパラメータが素材IDの一覧に存在するならば、素材IDをデフォルト値から変更
const matId = isMaterialId(request) ? request : defaultMatId;

// html読み込み時、収集場所をデフォルトとして表示
let handleM = new handleMaterial(matId);
window.addEventListener("DOMContentLoaded", handleM.showMaterialNameAndImg());
window.addEventListener("DOMContentLoaded", handleM.showStagesToGet());

// "収集場所"クリック時、収集場所を表示
document.getElementById("stageToGet").onclick = () => { handleM.showStagesToGet() }

// "上位素材"クリック時、上位素材を表示
document.getElementById("superiorMaterial").onclick = () => { handleM.showSuperiorMaterial() }

// "下位素材"クリック時、下位素材を表示
document.getElementById("lowMaterial").onclick = () => { handleM.showLowMaterial() }


/**
    section中段のDOM操作
 */

/* "理性効率とは？" をクリックしたとき、モルダーを表示する */
// 参考: https://tech-dig.jp/js-modal/
const popupImage = () => {
  const popup = document.getElementById('js-popup');
  if(!popup) return;

  const blackBg = document.getElementById('js-black-bg');
  const closeBtn = document.getElementById('js-close-btn');
  const showBtn = document.getElementById('js-show-popup');

  const closePopUp = elem => {
    if(!elem) return;
    elem.addEventListener('click', () => {
      popup.classList.toggle('is-show');
    });
  }
  closePopUp(blackBg);
  closePopUp(closeBtn);
  closePopUp(showBtn);
}
popupImage();

/**
    section下段のDOM操作
 */

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

// 素材一覧テーブルから素材をクリックしたとき、内容を更新する
// 基礎素材
const b_materials = ["b_rock", "b_souchi", "b_ester", "b_glucose", "b_iron", "b_achetone"]
// 初級素材
const l_materials = ["l_rock", "l_souchi", "l_ester", "l_glucose", "l_iron", "l_achetone"]
// 中級素材
const m_materials = ["m_manganese", "m_toishi", "m_rma", "m_alcohol", "m_rock", "m_souchi",
    "m_ester", "m_glucose", "m_iron", "m_achetone", "m_gel", "m_alloy"];
// 上級素材
const h_materials = ["h_manganese", "h_toishi", "h_rma", "h_alcohol", "h_rock", "h_souchi",
    "h_ester", "h_glucose", "h_iron", "h_achetone", "h_gel", "h_alloy"];
// 高級素材
const e_materials = ["e_d32", "e_nano", "e_fusion"];

const all_materials = [b_materials, l_materials, m_materials, h_materials, e_materials];


/*メインプログラム */
const changeMaterial = (handleM, val) => {
    handleM.id = val;
    handleM.showMaterialNameAndImg(); // 素材名の書き換え
    handleM.showStagesToGet(); // デフォルトの表示内容を "収集場所" に
}

for (let oneQualityMaterials of all_materials) {
    for (let matId of oneQualityMaterials) {
        document.querySelectorAll(`.${matId}`).forEach(item => {
            item.onclick = () => { changeMaterial(handleM, matId) }
        });
    }
}
