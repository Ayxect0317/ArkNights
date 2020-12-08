"use strict";

/**
 * 1. 現在の時刻を"YYYY/MM/DD HH:MM:SS" という形式で文字列を返す
 * 2. 1秒ごとに 1. の文字列を更新し、header.jsの#nowTimeに出力する
 */

/**
 * 1. 現在の時刻を"YYYY/MM/DD HH:MM:SS" という形式で文字列を返す
 * padStart() は文字列に対してのみ動作するため、number型をstring型に変換する必要あり
 */
const adjustNowDate = () => {
  const nowDate = new Date();
  const month = `${(nowDate.getMonth() + 1)}`.padStart(2, "0"); // 0-11が返り値であるため、1を足す
  const day = `${(nowDate.getDate())}`.padStart(2, "0");
  const hour = `${(nowDate.getHours())}`.padStart(2, "0");
  const minute = `${(nowDate.getMinutes())}`.padStart(2, "0");
  const second = `${(nowDate.getSeconds())}`.padStart(2, "0");

  return `${month}/${day} ${hour}:${minute}:${second}`;
}

/* 2. 1秒ごとに 1. の文字列を更新し、header.jsの#nowTimeに出力する */
export default function recalcNowTime() {
  document.getElementById("nowTime").textContent = adjustNowDate();

  // 1秒ごとに更新（メッセージを再取得）する
  refresh();
}

const refresh = () => {
  // 1000ミリ秒（1秒）後にrecalcNowTimeを1度だけ実行する
  setTimeout(recalcNowTime, 1000);
}
