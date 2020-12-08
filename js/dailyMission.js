"use strict";

import createAnnounceMessage from "./dailyMission/func/createAnnounceMessage.js";

const recalc = () => {
  const showMessage = () => {
    /**
     * 曜日ごとにどのデイリーミッションが開催されるか、オブジェクトで定義する
     * Date関数の仕様に合わせ、0: Mon, 1: Tue, ... 6: Sunと記述
     */
    const eventObject = {
      "senpou": [3, 4, 6, 0], // 先鋒/補助 - 水/木/土/日
      "sogeki": [1, 2, 5, 6], // 狙撃/術師 - 月/火/金/土
      "zennei": [2, 3, 6, 0], // 前衛/特殊 - 火/水/土/日
      "juusou": [1, 4, 5, 0], // 重装/医療 - 月/木/金/日
      "bougyo": [1, 4, 6, 0], // 防御突破  - 月/木/土/日
      "kuugun": [2, 3, 5, 0], // 空軍迎撃  - 火/水/金/日
      "kamotsu": [2, 4, 6, 0], // 貨物輸送 - 火/木/土/日
      "shigen": [1, 3, 5, 6]  // 資源確保  - 月/水/金/土
    }

    /* 各デイリーミッション毎にメッセージを表示する */
    let message;
    for (let key in eventObject) {
      document.getElementById(key).innerHTML = createAnnounceMessage(eventObject[key]);
    }
  }
  showMessage();

  /* HTMLを再取得・更新する */
  refresh();
}

/* 1秒後にrecalcを実行し、HTMLを再取得・更新する */
const refresh = () => {
  setTimeout(recalc, 1000);
}

recalc();