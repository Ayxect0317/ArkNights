"use strict";

import handleMaterial from "../../material/class/handleMaterial.js";
import convertMaterialIdToLink from "../../material/func/convertMaterialIdToLink.js";
import createPossessionsForm from "../func/createPossessionsForm.js";
import createResultHtml from "../func/createResultHtml.js";

export default class handleRequire {
  constructor(materialId, quantity) {
    this._materialId = materialId;
    this._quantity = quantity;
    this._requireMatNum0 = 0; // 0番目の下位素材の要求数
    this._requireMatNum1 = 0; // 1番目の下位素材の要求数
    this._requireMatNum2 = 0; // 2番目の下位素材の要求数
  }

  /**
   * resultをHTML (#result) へ出力する
   */
  async showResult() {
    /* 下位素材のオブジェクトを取得 */
    const handleM = new handleMaterial(this._materialId);
    const lowmaterialObject = await handleM.createLowmaterialObject();

    /* HTML作成と素材要求数をメンバ変数に記録 */
    const requireTempArray = []; // それぞれの素材要求数を一時的に格納する配列
    const requireObject = {}; // HTMLを作成するために、素材名と必要数をセットで管理するオブジェクト

    for (let matId in lowmaterialObject) {
      let require = lowmaterialObject[matId] * this._quantity;
      requireTempArray.push(require);
      requireObject[matId] = require;
    }

    // それぞれの素材の要求数をメンバ変数に代入
    [this._requireMatNum0, this._requireMatNum1, this._requireMatNum2] = requireTempArray;

    /* 出力 */
    document.getElementById("result").innerHTML =
      createResultHtml(this._materialId, this._quantity, requireObject);
    return new Promise(resolve => { resolve() });
  }


  /**
   * Execボタンが押された時、ユーザーに現在の下位素材の所持数を
   * 入力させるフォーム (possessionsForm) を表示
   *
   * 要求する素材 (materialId) が変化するとき、
   *  select name => 変化しない
   *  ユーザーから見える素材名（select田宮の前の文字列）=> 変化する（要求する素材ん居合わせる）
   *
   * ページ読み込み時、フォームが挿入される個所 (#input2) は
   * cssで隠してあるので、hiddenクラスを取り払うこと
   */
  async showPossessionsForm() {
    /* 下位素材のオブジェクトを取得 */
    const handleM = new handleMaterial(this._materialId);
    const lowmaterialObject = await handleM.createLowmaterialObject();

    /* 出力と表示 */
    document.getElementById("input2").innerHTML = createPossessionsForm(lowmaterialObject);
    document.getElementById("input2").classList.remove("hidden");

    // タイムアウトを設けることで、挿入したフォームをDOM操作できるようにする
    return new Promise(resolve => { setTimeout(resolve, 500) });
  }


  /**
   * 素材所持数が変更された時の処理
   * => possessionsFormのいずれかの値がchangeされた時の処理
   */
  async changePossessions(select0, select1, select2) {
    /**
     * ユーザーが選択した値（素材の所持数）をもとに、それぞれの素材があと何個必要なのかを求め、表示する
     * 必要数は0未満にならないことに注意
     */
    const nowRequireNum0 = this._requireMatNum0 - select0 > 0 ? this._requireMatNum0 - select0 : 0;
    const nowRequireNum1 = this._requireMatNum1 - select1 > 0 ? this._requireMatNum1 - select1 : 0;
    const nowRequireNum2 = this._requireMatNum2 - select2 > 0 ? this._requireMatNum2 - select2 : 0;
    const nowrequireTempArray = [nowRequireNum0, nowRequireNum1, nowRequireNum2];

    /* 下位素材のオブジェクトを取得 */
    const handleM = new handleMaterial(this._materialId);
    const lowmaterialObject = await handleM.createLowmaterialObject();
    const nowrequireObject = {}; // HTMLを作成するために、素材名と必要数をセットで管理するオブジェクト

    /* HTML作成に必要なデータの生成 */
    const keys = Object.keys(lowmaterialObject)
    for (let i = 0; i < keys.length; i++) {
      nowrequireObject[keys[i]] = nowrequireTempArray[i];
    }

    /* 出力 */
    document.getElementById("result").innerHTML =
      createResultHtml(this._materialId, this._quantity, nowrequireObject);
  }
}