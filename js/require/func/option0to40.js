"use strict";

/**
 * 0から40までのoptionタグを生成する
 */
export default function option0to40 () {
  let message = "";
  for (let i=0; i<=40; i++) {
    message = message +
      `<option value="${i}">${i}</option>\n`
  }

  return message;
}