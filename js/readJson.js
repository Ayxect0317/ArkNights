// JSONファイルの読み込み
function readJSON(url){
  fetch(url)
  .then(response => response.json())
  .then(data => handleJsonData(data));
}

function handleJsonData(jsonData){
  document.getElementById("materialName").innerHTML =
    `<img src="../src/image/material/middle/${jsonData["materials"][0]["img"]}" height="100">` +
    `${jsonData["materials"][0]["name"]}`;
}

readJSON("../src/json/M_Material.json");