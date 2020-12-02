"use strict";

import recalcNowTime from "../js/util/showNowTime.js";

// header.htmlを読み込み、headerタグに出力
async function createHeader() {
  const response = await fetch("../html/header.html");
  const doc = new DOMParser().parseFromString(await response.text(), 'text/html');
  // docはHTMLObjectなので、文字列に変換
  document.querySelector("header").innerHTML = doc.querySelector("body").innerHTML;

  // header.jsのDOM構造の読み込みが完了した後動作させる
  // 単に recalcNowTime() と書くと、header.htmlのDOM構造が読み込まれる前に実行されてしまう
  window.addEventListener("DOMContentLoaded", recalcNowTime());

  return new Promise(resolve => {
    resolve("ok");
  })
}

function toggleNav() {
  const hamburgerMenu = document.querySelectorAll(".hamburgerMenu");
  hamburgerMenu.forEach(target => {
    target.addEventListener("click", () => {
      document.getElementsByClassName("hamburger")[0].classList.toggle("open");
    });
  })
}

async function exec() {
  let promise = await createHeader();
  toggleNav();
}

exec();