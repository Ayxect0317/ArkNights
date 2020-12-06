"use strict";

import convertMaterialIdToLink from "../func/convertMaterialIdToLink.js";
import convertMaterialIdToJsonPath from "../func/convertMaterialIdToJsonPath.js";
import convertMaterialIdToName from "../func/convertMaterialIdToName.js";
import convertRecipieToTag from "../func/convertRecipieToTag.js";
import createStageToGet from "../func/createStageToGet.js";
import createSuperiorMaterial from "../func/createSuperiorMaterial.js";
import createLowMaterial from "../func/createLowMaterial.js";

export default class handleMaterial {
  constructor(materialId) {
    this._materialId = materialId;
    this.jsonPath = convertMaterialIdToJsonPath(materialId);
  }

  get id() { return this._materialId };
  set id(val) {
    this._materialId = val
    this.jsonPath = convertMaterialIdToJsonPath(this.id); // JsonPathは素材IDに依存する
  };


  /**
   * 画像と素材名を並べてHTMLへ出力する
   */
  async showMaterialNameAndImg() {
    // JSONファイルから素材IDを抽出
    const response = await fetch(this.jsonPath);
    const data = await response.json();
    const materialObject = data.materials.filter(k => k.id === this._materialId)[0];

    // 出力
    document.getElementById("materialName").innerHTML =
      `${convertMaterialIdToLink(materialObject.id)}${convertMaterialIdToName(materialObject.id)}`;
  }


  /**
   * 収集場所を出力する
   */
  async showStagesToGet() {
    // JSONから必要なデータを抽出
    const response = await fetch(this.jsonPath);
    const data = await response.json();
    const materialObject = data.materials.filter(k => k.id === this._materialId)[0];
    const stagesObject = materialObject.stageToGet;

    /* HTMLの作成と出力・フェードイン処理 */
    const target = document.getElementsByClassName("description")[0];
    this.fadeIn(target, createStageToGet(stagesObject));
  }


  /**
   * 上位素材を表示する
   */
  async showSuperiorMaterial() {
    /* JSONから必要なデータを抽出 */
    const response = await fetch(this.jsonPath);
    const data = await response.json();
    const materialObject = data.materials.filter(k => k.id === this._materialId)[0];
    const superiorMaterialsObject = materialObject.superiorMaterial;

    /* HTMLの作成と出力・フェードイン処理 */
    let target = document.getElementsByClassName("description")[0];
    this.fadeIn(target, createSuperiorMaterial(superiorMaterialsObject));
  }


  /**
   * 下位素材を表示する
   */
  async showLowMaterial() {
    // JSONから必要なデータを抽出
    const response = await fetch(this.jsonPath);
    const data = await response.json();
    const materialObject = data.materials.filter(k => k.id === this._materialId)[0];
    const lowMaterialRecipieObject = materialObject.lowMaterialRecipie;

    /* 出力・フェードイン処理 */
    const target = document.getElementsByClassName("description")[0];
    this.fadeIn(target, createLowMaterial(lowMaterialRecipieObject));
  }


  /**
   * フェードイン処理のメインプログラム
   */
  async fadeIn(target, message) {
    // フェードインクラスの削除
    const removeFadeInAttr = new Promise(resolve => {
      target.classList.remove("fade");
      resolve();
    });

    // HTMLの書き換え
    // インターバルを設けることで、アニメーションを自然にする
    const setTimeOutAndRewrite = new Promise(resolve => {
      setTimeout(() => {
        target.innerHTML = message;
        resolve();
      }, 800);
    });

    await removeFadeInAttr;
    await setTimeOutAndRewrite;
    // フェードインクラスの追加
    target.classList.add("fade");
  }


  /**
   * 下位素材の素材名と個数をオブジェクトで返却する
   */
  async createLowmaterialObject() {
    // JSONから必要なデータを抽出
    const response = await fetch(this.jsonPath);
    const data = await response.json();
    const materialObject = data.materials.filter(k => k.id === this._materialId)[0];
    const lowMaterialRecipie = materialObject.lowMaterialRecipie;

    // 連想配列の作成
    let lowmaterialObject = {};
    for (let k of lowMaterialRecipie) {
      lowmaterialObject[k.id] = k.quantity;
    }

    return new Promise(resolve => {
      resolve(lowmaterialObject);
    });
  }
}