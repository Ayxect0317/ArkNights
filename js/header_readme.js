"use strict";

/**
 * ReadMe専用のヘッダー作成プログラム
 * readme.htmlとそれ以外のHTMLファイルは階層が異なるため
 */
import recalcNowTime from "./util/showNowTime.js";

// header.htmlを読み込み、headerタグに出力
const createHeader = async() => {
  const response = await fetch("../html//header_readme.html");
  const doc = new DOMParser().parseFromString(await response.text(), 'text/html');
  // docはHTMLObjectなので、文字列に変換
  document.querySelector("header").innerHTML = doc.querySelector("body").innerHTML;

  // header.jsのDOM構造の読み込みが完了した後に動作させる
  // 単に recalcNowTime() と書くと、header.htmlのDOM構造が読み込まれる前に実行されてしまう
  window.addEventListener("DOMContentLoaded", recalcNowTime());

  return new Promise(resolve => { resolve(); })
}

const toggleNav = () => {
  const hamburgerIcon = document.querySelectorAll(".hamburgerIcon");
  const hamburger = document.getElementsByClassName("hamburger")[0];
  const blackBg = document.getElementsByClassName("blackBg")[0];

  // ハンバーガーメニューをクリックしたとき、ナビゲーションがトグルする
  hamburgerIcon.forEach(target => {
    target.addEventListener("click", () => {
      hamburger.classList.toggle("opened__hamburger");
      blackBg.classList.toggle("opened__hlackBg");
    });
  });

  // 黒い背景をクリックしたとき、ナビゲーションが消える
  blackBg.addEventListener("click", () => {
    hamburger.classList.remove("opened__hamburger");
    blackBg.classList.remove("opened__hlackBg");
  });
}

const exec = async() => {
  const promise = await createHeader();
  toggleNav();
}

exec();