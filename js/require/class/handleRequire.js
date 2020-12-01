"use strict";

import handleMaterial from "../../material/class/handleMaterial.js";
import convertMaterialIdToLink from "../../material/func/convertMaterialIdToLink.js";
import convertMaterialIdToJsonPath from "../../material/func/convertMaterialIdToJsonPath.js";
import convertMaterialIdToName from "../../material/func/convertMaterialIdToName.js";
import convertRecipieToTag from "../../material/func/convertRecipieToTag.js";
import option0to20 from "../../require/func/option0to20.js"

export default class handleRequire {
  constructor(id, quantity) {
    this._id = id;
    this._quantity = quantity;
  }

  /* ----
    resultをHTMLへ出力する (section左上部のDOM操作)
  ---- */
  async createResultHtml() {
    // 下位素材の連想配列を取得
    const handleM = new handleMaterial(this._id);
    const lowMaterialList = await handleM.createLowMaterialList();

    // 収集素材と必要数を表示
    let message = `<p>${convertMaterialIdToName(this._id)}を ${this._quantity} 個作成するのに<br>
        必要な素材は以下の通りです。</p>`;

    // 必要素材を画像で表示
    message = message + "<p>";
    for (let matId in lowMaterialList) {
      message = message
        + `${convertMaterialIdToLink(matId, true)}x${lowMaterialList[matId] * this._quantity} `;
    }
    message = message + "</p>";

    // 出力
    document.getElementById("result").innerHTML = message;
  }


  /* -----
    Execボタンが押された時、必要素材に合わせたフォームを表示 (section左下部のDOM操作)
  ----- */
  async createInput2Html() {
    // 下位素材に対して、 {ID: 必要数} 形式で連想配列を取得
    const handleM = new handleMaterial(this._id);
    const lowMaterialList = await handleM.createLowMaterialList();
    handleM.createLowMaterialList().then(lowMaterialList => {
      let contentOfForm = `
        <p>所持数を選択してください<br>（開発中のため動作いたしません）</p>
        <form id="input2Form" name="possessionsForm" action="">
      `;

      /* selectタグの挿入 */
      // 素材IDの配列を取得
      let keys = Object.keys(lowMaterialList)

      // メイン処理
      for (let i = 0; i < keys.length; i++) {
        let matId = Object.keys(lowMaterialList)[i]; // 素材IDの取得
        let matName = convertMaterialIdToName(matId); // 素材名に変換

        contentOfForm = contentOfForm + convertMaterialIdToName(matId)
          + `<select name="mat${i}Num">`
          + option0to20()
          + "</select><br>";
      }

      // 閉じタグの挿入
      contentOfForm = contentOfForm + "</form>";

      // 出力
      document.getElementById("input2").innerHTML = contentOfForm;
    })

    // フォームを表示
    document.getElementById("input2").classList.remove("hidden");
  }
}