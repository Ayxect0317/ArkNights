"use strict";

import handleMaterial from "./material/class/handleMaterial.js";
import isMaterialId from "./material/func/isMaterialId.js";
import constM from "./material/constant/constantOfMaterial.js"

/**
 * section上段のDOM操作
 */
/* URLのリクエストから素材IDを取得 */
const defaultMaterialId = "m_manganese";
// 7文字目以降を取得 (?matid=の部分は必要ないため)
const request = window.location.search.substring(7, window.location.search.length) ?? defaultMaterialId;
// URLのパラメータが素材IDの一覧に存在するならば、素材IDをデフォルト値から変更
const materialId = isMaterialId(request) ? request : defaultMaterialId;

// html読み込み時、収集場所をデフォルトとして表示
let handleM = new handleMaterial(materialId);
window.addEventListener("DOMContentLoaded", handleM.showMaterialNameAndImg());
window.addEventListener("DOMContentLoaded", handleM.showStagesToGet());

// "収集場所"クリック時、収集場所を表示
document.getElementById("stageToGet").onclick = () => { handleM.showStagesToGet() }

// "上位素材"クリック時、上位素材を表示
document.getElementById("superiorMaterial").onclick = () => { handleM.showSuperiorMaterial() }

// "下位素材"クリック時、下位素材を表示
document.getElementById("lowMaterial").onclick = () => { handleM.showLowMaterial() }


/**
 * section中段のDOM操作
 */

/* "理性効率とは？" をクリックしたとき、モーダルを表示する */
// 参考: https://tech-dig.jp/js-modal/
const popupImage = () => {
  const popup = document.getElementById('js-popup');
  if (!popup) return;

  const blackBg = document.getElementById('js-black-bg');
  const closeBtn = document.getElementById('js-close-btn');
  const showBtn = document.getElementById('js-show-popup');

  const closePopUp = elem => {
    if (!elem) return;
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
 * section下段のDOM操作
 *
 * 1. タブ選択で素材の品質を変更できるようにする
 *    デフォルトのActiveは中級素材
 *
 * 2. 素材一覧テーブルから素材をクリックしたとき、内容を更新する
 */
/* 1. タブ選択で素材の品質を変更できるようにする */
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


/**
 * 2. 素材一覧テーブルから素材をクリックしたとき、内容をクリックされた素材に更新する
 * デフォルトで開くページは "収集場所"
 *
 * a. 全ての素材テーブルの項目に対して、クリック時のイベントを設定する
 *
 * b. handleMのidを更新し、 "収集場所" に遷移する
 */
/* a. 全ての素材テーブルの項目に対して、クリック時のイベントを設定する */
for (let MaterialId of constM["materialIds"]) {
  document.querySelectorAll(`.${MaterialId}`).forEach(item => {
    item.onclick = () => { changeMaterial(handleM, MaterialId) }
  });
}

/* b. handleMのidを更新し、 "収集場所" に遷移する */
const changeMaterial = (handleM, val) => {
  handleM.id = val;
  handleM.showMaterialNameAndImg(); // 素材名の書き換え
  handleM.showStagesToGet(); // デフォルトの表示内容を "収集場所" に
}
