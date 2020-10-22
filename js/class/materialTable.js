"use strict";

import convertMaterialIdToImgTag from "../convertTag/convertMaterialIdToImgTag.js"

/*----
  素材一覧表に関するクラス
-----*/

export default class materialTable {
  async create() {
    // JSONから必要なデータを抽出
    const response = await fetch("../../src/json/E_Material.json");
    const data = await response.json();

    // 表の作成
    let htmlConstruction = ""
    for (let i=0; i<data.materials.length; i++) {
      const divideNum = 6; // trタグを挿入する間隔

      // trタグを挿入
      if (i % divideNum === 0) {
        htmlConstruction = htmlConstruction + "<tr>";
      }

      // 素材ごとに画像・名前をtdタグへ表示
      let material = data.materials[i];
      htmlConstruction = htmlConstruction +
        `<td class="${material.id}">${convertMaterialIdToImgTag(material.id, 50)}${material.name}</td>`;
    }

    htmlConstruction = htmlConstruction + "</tr>"; // 末尾のtrタグを挿入
    console.log(htmlConstruction);
    // 今は直接HTMLン位書き込むため実行しない
    //document.getElementById("materialTable").innerHTML = htmlConstruction;
  }
}