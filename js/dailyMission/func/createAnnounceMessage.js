"use strict";

/**
 * それぞれの曜日任務が開催中か判断し、
 *    開催中ならば "Cullently Holding!" という文字列を返す
 *    そうでなければ "開催までの時間" を "HH:MM:SS" という形式で文字列を返す
 */

/* 現在開催中か判定する */
const isHeld = holdingDays => {
  const nowTime = new Date()
  const nowDay = nowTime.getDay();
  const nowHour = nowTime.getHours();

  // 開催日の4時以降である場合 true を返す
  return (holdingDays.includes(nowDay) && nowHour >= 4 ? true : false);
}

/**
 * 次回開催日が何日後か計算する
 *
 * 配列の要素ごとに (開催曜日 - 現在曜日 + 7) % 7 を計算し、最小値を取ることで求めることができる
 * e.g. 開催日が[0, 1, 4, 6], 現在曜日が 2 の場合、[5, 6, 2, 3]となるので、直近は2日後
 */
const calcUntilNextEventDay = (holdin, nowDay) => {
  const array = holdin.map(x => (x - nowDay + 7) % 7);
  return Math.min.apply({}, array);
}

/**
 * 次回開催日を計算し、オブジェクト形式で返す
 *
 * オブジェクトについて
 *    hour, min, secという名称のkeyを設定する
 *    valueは00-59までの文字列
 *    valueが00-09までの場合、先頭に0を挿入し、必ず2桁の文字列とすること
 */
const calcNextEventDate = nowDays => {
  /* 開催日までの日数を計算する */
  const now = new Date();
  const untilNextEventDay = calcUntilNextEventDay(nowDays, now.getDay());

  /* 変数 due を次回開催日の午前4時に設定する */
  const due = new Date();
  due.setDate(due.getDate() + untilNextEventDay);
  due.setHours(4);
  due.setMinutes(0);
  due.setSeconds(0);

  /* 開催日までの時間を計算する */
  const rest = due.getTime() - now.getTime(); // 単位はミリ秒

  /* ミリ秒から時刻へ変換する */
  const sec = Math.floor(rest / 1000) % 60;
  const min = Math.floor(rest / 1000 / 60) % 60;
  const hour = Math.floor(rest / 1000 / 60 / 60) % 24;
  const day = Math.floor(rest / 1000 / 60 / 60 / 24);

/**
 * sec, min, hourを0埋めして、オブジェクトとして返却する
 * padStart() は文字列に対してのみ動作するため、number型をstring型に変換する必要あり
 */
  return {
    sec: `${sec}`.padStart(2, "0"),
    min: `${min}`.padStart(2, "0"),
    hour: `${hour + day * 24}`.padStart(2, "0")
  }
}

/* daylyMission.js に文字列を返却する */
export default function getMessage(days) {
  let message;

  if (isHeld(days)) {
    message = "<span class='time'>Currently Holding!</span>";
  } else {
    const counter = calcNextEventDate(days);
    message = `Last <span class='time'>${counter.hour}:${counter.min}:${counter.sec}</span>`;
  }
  return message;
}