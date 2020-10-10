"use strict";

// フォーマットを2桁の整数にする（0で埋める）
export default function zeroPadding(num) {
  return ("00" + num).slice(-2);
}