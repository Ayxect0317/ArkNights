'use strict';

/* ----
    それぞれの曜日任務が開催中か判断し、
    開催中ならば "開催中" 、そうでなければ "開催までの時間" をメッセージとして返す
---- */

// 現在開催中か判定する
function isHeld(days) {
    const time = new Date()
    const day = time.getDay();
    const hour = time.getHours();

    // 開催日の4時以降である場合 true を返す
    return (days.includes(day) && hour >= 4 ? true : false);
}

// 次回開催日が何日後か計算する
// 配列の要素ごとに (開催曜日 - 現在曜日 + 7) & 7 を計算し、最小値を取ることで計算できる
// e.g. 開催日が[0, 1, 4, 6], 現在曜日が 2 の場合、[5, 6, 2, 3]となるので、直近は2日後
function calcUntilNextEventDay(days, nowDay) {
    const array = days.map(x => (x - nowDay + 7) % 7 );
    return Math.min.apply({}, array);
}

// 次回開催日を計算する
function calcNextEventDate(days) {
    // 開催日までの日数を計算する
    const now = new Date();
    const untilNextEventDay = calcUntilNextEventDay(days, now.getDay());

    // 変数 due を次回開催日の午前4時に設定する
    const due = new Date();
    due.setDate(due.getDate() + untilNextEventDay);
    due.setHours(4);
    due.setMinutes(0);
    due.setSeconds(0);

     // 開催日までの時間を計算する
    const rest = due.getTime() - now.getTime(); // 単位はミリ秒

    // ミリ秒から時刻へ変換する
    const sec = Math.floor(rest / 1000) % 60;
    const min = Math.floor(rest / 1000 / 60) % 60;
    const hour = Math.floor(rest / 1000 / 60 / 60) % 24;
    const day = Math.floor(rest / 1000 / 60 / 60 / 24);

    // フォーマットを2桁の整数にする（0で埋める）
    function zeroPadding(num) {
        return ("00" + num).slice(-2);
    }

    let count = {
        sec: zeroPadding(sec),
        min: zeroPadding(min),
        hour: zeroPadding(hour)
    }
    return count;
}

// script.js にメッセージを返却する
export function getMessage(days) {
    let message;

    if (isHeld(days)){
        message = "開催中";
    } else {
        const counter = calcNextEventDate(days);
        message = `開催まで　${counter.hour}時間${counter.min}分${counter.sec}秒`;
    }
    return message;
}