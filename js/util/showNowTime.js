"use strict";

import { zeroPadding } from "../util/zeroPadding.js";

// 現在の時刻を文字列として返す
function calcNowDate() {
    const nowDate = new Date();
    const month = zeroPadding(nowDate.getMonth() + 1); // 0-11が返り値であるため、1を足す
    const day = zeroPadding(nowDate.getDate());
    const hour = zeroPadding(nowDate.getHours());
    const minute = zeroPadding(nowDate.getMinutes());
    const second = zeroPadding(nowDate.getSeconds());

    return `${month}/${day} ${hour}:${minute}:${second}`;

}

// メッセージ内容を calcTimeToBeHeld.js から取得する
export function recalcNowTime() {
    document.getElementById("nowTime").textContent = calcNowDate();

    // 1秒ごとに更新（メッセージを再取得）する
    refresh();
}

function refresh() {
    // 1000ミリ秒（1秒）後にrecalcNowTimeを1度だけ実行する
    setTimeout(recalcNowTime, 1000);
}
