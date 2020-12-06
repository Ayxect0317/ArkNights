"use strict";

/**
 * 与えられたオブジェクトをもとに、収集場所のHTMLを作成する
 *
 * 理性効率は小数第2位まで表示（満たない場合は0埋めする）
 */
export default function createStageToGet(stagesObject) {
  let message = "<p><収集場所></p>";
  if (stagesObject) {
    message = message
      + `<table class="descriptionTable">
        <tr>
          <th>Stage</th>
          <th>消費理性</th>
          <th>理性効率</th>
          <th>備考</th>
        </tr>
      `;

    for (const stageObject of stagesObject) {
      // 備考の作成
      const note = createNoteOfStageToGet(stageObject.note);

      /* ステージ、消費理性、理性効率（小数第2位まで）を表示 */
      message = message
        + `<tr>
          <td>${stageObject.stage}</td>
          <td>${stageObject.cost}</td>
          <td>${stageObject.efficiency.toFixed(2)}</td>
          <td>${note}</td>
        </tr>`;
    }
    message = message + "</tr>";
  } else {
    message = message +
      `<span class="note">直接ドロップするステージはありません。<br>
      [下位素材]タブより、合成素材を確認してください。</span>
      `;
  }
  return message;
}


/**
 * 与えられたパラメータをもとに、収集場所のテーブル内の備考を作成する
 */
function createNoteOfStageToGet(param) {
  let note;
  if (param === null) {
    note = "-"; // デフォルトメッセージ
  } else if (param === "*1") {
    note = "理性効率は悪いが、<br>副産物のランクが上";
  } else {
    note = param; // 入力されたパラメータをそのまま出力する
  }

  return `<span class="note">${note}</span>`;
}