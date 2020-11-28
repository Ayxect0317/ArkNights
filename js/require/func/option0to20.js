"use strict";

/* 0～20のoptionタグを生成 */
export default function option0to20 () {
  let message = "";
  for (let i=0; i<=20; i++) {
    message = message +
      `<option value="${i}">${i}</option>\n`
  }

  return message;
}