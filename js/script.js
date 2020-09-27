import {getMessage} from "./calcTimeToBeHeld.js";

// メッセージ内容を calcTimeToBeHeld.js から取得する
function recalc() {
    let message;

    // 先鋒・補助
    message = getMessage([3, 4, 6, 0]) // 水/木/土/日
    document.getElementById("senpou").textContent = message;

    // 狙撃/術師
    message = getMessage([1, 2, 5, 6]) // 月/火/金/土
    document.getElementById("sogeki").textContent = message;

    // 前衛・特殊
    message = getMessage([2, 3, 6, 0]) // 火/水/土/日
    document.getElementById("zennei").textContent = message;

    // 重装・医療
    message = getMessage([1, 4, 5, 0]) // 月/木/金/日
    document.getElementById("juusou").textContent = message;

    // 防御突破
    message = getMessage([1, 4, 6, 0]) // 月/木/土/日
    document.getElementById("bougyo").textContent = message;

    // 空軍迎撃
    message = getMessage([2, 3, 5, 0]) // 火/水/金/日
    document.getElementById("kuugun").textContent = message;

    // 貨物輸送
    message = getMessage([2, 4, 6, 0]) // 火/木/土/日
    document.getElementById("kamotsu").textContent = message;

    // 資源確保
    message = getMessage([1, 3, 5, 6]) // 月/水/金/土
    document.getElementById("shigen").textContent = message;

    // 1秒ごとに更新（メッセージを再取得）する
    refresh();
}

function refresh() {
    // 1000ミリ秒（1秒）後にrecalcを1度だけ実行する
    setTimeout(recalc, 1000);
}

recalc();