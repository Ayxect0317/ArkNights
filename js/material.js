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

// 上位素材を表示する
function showSuperiorMaterial(jsonData) {
    let message= "";
    let materials = jsonData["materials"][0]["superiorMaterial"]

    if (materials) {
        for (const material of materials) {
            message = message + `<p>${material}</p>`;
        }
    } else {
        message = "<p>上位素材はありません。</p>"
    }

    document.getElementById("description").innerHTML = message;
}

// 下位素材を表示する
function showLowMaterial(jsonData) {
    let message= "";
    let materials = jsonData["materials"][0]["lowMaterial"]

    if (materials) {
        for (const material of materials) {
            message = message + `<p>${material}</p>`;
        }
    } else {
        message = "<p>下位素材はありません。</p>"
    }

    document.getElementById("description").innerHTML = message;
}

// html読み込み時、収集場所をデフォルトとして表示
window.addEventListener('DOMContentLoaded', initJson("../src/json/M_Material.json"));

// "収集場所"クリック時、収集場所を表示
document.getElementById("stageToGet").onclick = function() {
    fetch("../src/json/M_Material.json")
        .then(response => response.json())
        .then(data => showStagesToGet(data))
}

// "上位素材"クリック時、上位素材を表示
document.getElementById("superiorMaterial").onclick = function() {
    fetch("../src/json/M_Material.json")
        .then(response => response.json())
        .then(data => showSuperiorMaterial(data))
}

// "下位素材"クリック時、下位素材を表示
document.getElementById("lowMaterial").onclick = function() {
    fetch("../src/json/M_Material.json")
        .then(response => response.json())
        .then(data => showLowMaterial(data))
}