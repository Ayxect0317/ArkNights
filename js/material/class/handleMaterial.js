"use strict";

import convertMaterialIdToLink from "../func/convertMaterialIdToLink.js";
import convertMaterialIdToJsonPath from "../func/convertMaterialIdToJsonPath.js";
import convertMaterialIdToName from "../func/convertMaterialIdToName.js";
import convertRecipieToTag from "../func/convertRecipieToTag.js";

export default class handleMaterial {
  constructor(id) {
    this._id = id;
    this.jsonPath = convertMaterialIdToJsonPath(id);
  }

  get id() { return this._id };
  set id(val) {
    this._id = val
    this.jsonPath = convertMaterialIdToJsonPath(this.id); // JsonPathは素材IDに依存する
  };


  /* ----
    素材名と画像をHTMLへ出力する
  ---- */
  async showMaterialNameAndImg() {
    // JSONから素材のIDのみを抽出
    const response = await fetch(this.jsonPath);
    const data = await response.json();
    const materialList = data.materials.filter(k => k.id === this._id)[0];

    // 出力
    document.getElementById("materialName").innerHTML =
      `${convertMaterialIdToLink(materialList.id)}${convertMaterialIdToName(materialList.id)}`;
  }


  /* -----
    収集場所を出力する
  ----- */
  async showStagesToGet() {
    // JSONから必要なデータを抽出
    const response = await fetch(this.jsonPath);
    const data = await response.json();
    const materialList = data.materials.filter(k => k.id === this._id)[0];
    let stages = materialList.stageToGet;

    let message = "<p><収集場所></p>";

    /* HTMLの作成 */
    if (stages) {
      message = message + `<table class="descriptionTable">`;
      message = message + "<tr><th>Stage</th><th>消費理性</th><th>理性効率</th><th>備考</th></tr>";

      for (const stage of stages) {
        // 備考の内容
        let note = `<span class="note">`;
        if (stage.note === null) {
          note = note = note + "-"; // デフォルトメッセージ
        } else if (stage.note === "*1") {
          note = note + "理性効率は悪いが、<br>副産物のランクが上";
        } else {
          note = note + stage.note;
        }
        note = note + "</span>"

        /* ステージ、消費理性、理性効率（小数第2位まで）を表示 */
        message = message +
          `<tr>
            <td>${stage.stage}</td>
            <td>${stage.cost}</td>
            <td>${stage.efficiency.toFixed(2)}</td>
            <td>${note}</td>
          </tr>`;
      }
      message = message + "</tr>";
    } else {
      message = message +
        `<span class="note">直接ドロップするステージはありません。<br>
        [下位素材]タブより、合成素材を確認してください。</span>`;
    }

    /* 出力・フェードイン処理 */
    let target = document.getElementsByClassName("description")[0];
    this.fadeIn(target, message);
  }


  /* -----
    上位素材を表示する
  ----- */
  async showSuperiorMaterial() {
    /* JSONから必要なデータを抽出 */
    const response = await fetch(this.jsonPath);
    const data = await response.json();
    const materialList = data.materials.filter(k => k.id === this._id)[0];
    const superiorMaterials = materialList.superiorMaterial;

    /* HTMLの作成 */
    let message = "<p><上位素材>";
    if (superiorMaterials) {
      for (const superiorMaterial of superiorMaterials) {
        // 上位素材画像を表示する
        message = message + `${convertMaterialIdToLink(superiorMaterial.id)}`;

        // 上位素材名を表示する
        message = message + `${convertMaterialIdToName(superiorMaterial.id)}<br>`;

        // 必要素材を [画像]x[個数]の形式で表示
        message = message +
          `必要素材: ${convertRecipieToTag(superiorMaterial.recipie)}</$>`;
      }
    } else {
      message = message + `<br><span class="note">上位素材はありません。</span></p>`;
    }

    /* 出力・フェードイン処理 */
    let target = document.getElementsByClassName("description")[0];
    this.fadeIn(target, message);
  }


  /* -----
    下位素材を表示する
  ----- */
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
        `<br>必要素材: ${convertRecipieToTag(lowMaterialRecipie)}</p>`;
    } else {
      message = message + `<br><span class="note">下位素材はありません。</span></p>`;
    }

    /* 出力・フェードイン処理 */
    let target = document.getElementsByClassName("description")[0];
    this.fadeIn(target, message);
  }

  /* フェードイン処理のメインプログラム */
  async fadeIn(target, message) {
    // フェードインクラスの削除
    let removeFadeInClass = new Promise(resolve => {
      target.classList.remove("fade");
      resolve();
    });

    // HTMLの書き換え
    // インターバルを設けることで、アニメーションを自然にする
    let setTimeOutAndRewrite = new Promise(resolve => {
      setTimeout(() => {
        target.innerHTML = message;
        resolve();
      }, 800);
    });

    let promise = await removeFadeInClass;
    promise = await setTimeOutAndRewrite;
    // フェードインクラスの追加
    target.classList.add("fade");
  }


  /* -----
    下位素材の素材名と個数をリストで返却する
  ----- */
  async createLowMaterialList() {
    // JSONから必要なデータを抽出
    const response = await fetch(this.jsonPath);
    const data = await response.json();
    const materialList = data.materials.filter(k => k.id === this._id)[0];
    const lowMaterialRecipie = materialList.lowMaterialRecipie;

    // 連想配列の作成
    let lowMaterialList = {};
    for (let k of lowMaterialRecipie) {
      lowMaterialList[k.id] = k.quantity;
    }

    return new Promise(resolve => {
      resolve(lowMaterialList);
    });
  }
}