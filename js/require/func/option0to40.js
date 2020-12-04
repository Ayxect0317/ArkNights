"use strict";

/* 0～40のoptionタグを生成 */
export default function option0to40 () {
  let message = "";
  for (let i=0; i<=40; i++) {
    message = message +
      `<option value="${i}">${i}</option>\n`
  }

  return message;
}