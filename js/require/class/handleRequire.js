"use strict";

import handleMaterial from "../../material/class/handleMaterial.js";
import convertMaterialIdToLink from "../../material/func/convertMaterialIdToLink.js";
import convertMaterialIdToJsonPath from "../../material/func/convertMaterialIdToJsonPath.js";
import convertMaterialIdToName from "../../material/func/convertMaterialIdToName.js";
import convertRecipieToTag from "../../material/func/convertRecipieToTag.js";
import option0to40 from "../func/option0to40.js";
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
   * resultをHTMLへ出力する
   * => section左上部のDOM操作
   */
  async createResult() {
    /* 下位素材のオブジェクトを取得 */
    const handleM = new handleMaterial(this._materialId);
    const lowmaterialObject = await handleM.createLowmaterialObject();

    /* HTML作成と素材要求数をメンバ変数に記録 */
    const requireArr = []; // それぞれの素材要求数を一時的に格納する配列
    const requireObject = {}; // HTMLを作成するために、素材名と必要数をセットで管理するオブジェクト

    for (let matId in lowmaterialObject) {
      let require = lowmaterialObject[matId] * this._quantity;
      requireArr.push(require);
      requireObject[matId] = require;
    }

    // それぞれの素材の要求数をメンバ変数に代入
    [this._requireMatNum0, this._requireMatNum1, this._requireMatNum2] = requireArr;

    // 出力
    document.getElementById("result").innerHTML =
      createResultHtml(this._materialId, this._quantity, requireObject);
    return new Promise(resolve => { resolve() });
  }


  /**
   * Execボタンが押された時、必要素材に合わせたフォームを表示
   * => section左下部のDOM操作
   */
  async createInput2Html() {
    /* 下位素材のオブジェクトを取得 */
    const handleM = new handleMaterial(this._materialId);
    const lowmaterialObject = await handleM.createLowmaterialObject();

    handleM.createLowmaterialObject().then(lowmaterialObject => {
      let contentOfForm = `
        <p>所持数を選択してください。</p>
        <form name="possessionsForm" action="">
      `;

      /* selectタグの挿入 */
      // 下位素材のオブジェクトを取得
      const keys = Object.keys(lowmaterialObject)

      // メイン処理
      for (let i=0; i<keys.length; i++) {
        const matId = Object.keys(lowmaterialObject)[i]; // 素材IDの取得
        const matName = convertMaterialIdToName(matId); // 素材名に変換

        contentOfForm = contentOfForm + convertMaterialIdToName(matId)
          + `<select name="mat${i}Num">`
          + option0to40()
          + "</select><br>";
      }
      contentOfForm = contentOfForm + "</form>";

      // 出力
      document.getElementById("input2").innerHTML = contentOfForm;
    })

    /* フォームを表示 */
    document.getElementById("input2").classList.remove("hidden");

    // タイムアウトを設けることで、挿入したフォームをDOM操作できるようにする
    return new Promise(resolve => {setTimeout(resolve, 500) });
  }

  /**
   * 素材所持数が変更された時の処理
   * => possessionsFormのいずれかの値がchangeされた時の処理
   */
  async changePossessions(select0, select1, select2) {
    /**
     * ユーザーが選択した値をもとに、それぞれの素材が何個必要なのかを求める
     * 必要数は0未満にならないことに注意
     */
    const nowRequireNum0 = this._requireMatNum0 - select0 > 0 ? this._requireMatNum0 - select0 : 0;
    const nowRequireNum1 = this._requireMatNum1 - select1 > 0 ? this._requireMatNum1 - select1 : 0;
    const nowRequireNum2 = this._requireMatNum2 - select2 > 0 ? this._requireMatNum2 - select2 : 0;
    const nowRequireArr = [nowRequireNum0, nowRequireNum1, nowRequireNum2];

    /* 下位素材のオブジェクトを取得 */
    const handleM = new handleMaterial(this._materialId);
    const lowmaterialObject = await handleM.createLowmaterialObject();
    const nowrequireObject = {}; // HTMLを作成するために、素材名と必要数をセットで管理するオブジェクト

    /* HTML作成に必要なデータの生成 */
    const keys = Object.keys(lowmaterialObject)
    for (let i=0; i<keys.length; i++) {
      nowrequireObject[keys[i]] = nowRequireArr[i];
    }

    /* 出力 */
    document.getElementById("result").innerHTML =
      createResultHtml(this._materialId, this._quantity, nowrequireObject);
  }
}