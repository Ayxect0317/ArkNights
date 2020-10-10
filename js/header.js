"use strict";

import { recalcNowTime } from "../js/util/showNowTime.js";

// header.htmlを読み込み、headerタグに出力
async function createHeader() {
  const response = await fetch("../html/header.html");
  const doc = new DOMParser().parseFromString(await response.text(), 'text/html');
  // docはHTMLObjectなので、outerHTMLで文字列に変換
  const header = doc.querySelector("nav").outerHTML;
  document.querySelector("header").innerHTML = header;

  // header.jsのDOM構造の読み込みが完了した後動作させる
  // 単に recalcNowTime() と書くと、header.htmlのDOM構造読み込みより先に実行されてしまう
  window.addEventListener("DOMContentLoaded", recalcNowTime());
}

createHeader();