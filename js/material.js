"use strict";

// html読み込み時の処理
function initJson(url) {
    fetch(url)
        .then(response => response.json())
        .then(function(data){
            showMaterialNameAndImg(data);
            showStagesToGet(data);
        })
}

// 素材名と画像をHTMLへ出力する
function showMaterialNameAndImg(jsonData) {
    document.getElementById("materialName").innerHTML =
        `<img src="../src/image/material/middle/${jsonData["materials"][0]["img"]}" height="100">` +
        `${jsonData["materials"][0]["name"]}`;
}

// 収集場所を出力する
function showStagesToGet(jsonData) {
    let message= "";
    let stages = jsonData["materials"][0]["stageToGet"]
    for(const stage of stages){
        message = message + `<p>${stage}</p>`;
    }
    document.getElementById("description").innerHTML = message;
}

// html読み込み時、収集場所をデフォルトとして表示
window.addEventListener('DOMContentLoaded', initJson("../src/json/M_Material.json"));
