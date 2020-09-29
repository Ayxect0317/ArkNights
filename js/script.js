import {getMessage} from "./calcTimeToBeHeld.js";

// メッセージ内容を calcTimeToBeHeld.js から取得する
function recalc() {
    function showMessage (dist) {
        let message;
        for(let key in dist) {
            message = getMessage(dist[key]);
            document.getElementById(key).innerHTML = message;
        }
    }

    const event_dist = {
        "senpou":  [3, 4, 6, 0], // 先鋒/補助 - 水/木/土/日
        "sogeki":  [1, 2, 5, 6], // 狙撃/術師 - 月/火/金/土
        "zennei":  [2, 3, 6, 0], // 前衛/特殊 - 火/水/土/日
        "juusou":  [1, 4, 5, 0], // 重装/医療 - 月/木/金/日
        "bougyo":  [1, 4, 6, 0], // 防御突破  - 月/木/土/日
        "kuugun":  [2, 3, 5, 0], // 空軍迎撃  - 火/水/金/日
        "kamotsu": [2, 4, 6, 0], // 貨物輸送  - 水/木/土/日
        "shigen":  [1, 3, 5, 6]  // 資源確保  - 月/水/金/土
    }
    showMessage(event_dist);

    // 1秒ごとに更新（メッセージを再取得）する
    refresh();
}

function refresh() {
    // 1000ミリ秒（1秒）後にrecalcを1度だけ実行する
    setTimeout(recalc, 1000);
}

recalc();