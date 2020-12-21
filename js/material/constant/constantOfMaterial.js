"use strict:"

/**
 * materialに関する定数を定義するオブジェクト
 *
 * 他ファイルでインポートされた際、valueを変更できないようにするため、
 * Object.definePropertiesを使用すること
 */

let constantOfMaterial = {};
Object.defineProperties(constantOfMaterial, {
  "materialIds": {
    value: [ // 全ての素材ID
      "b_rock", "b_souchi", "b_ester", "b_glucose", "b_iron", "b_achetone",
      "l_rock", "l_souchi", "l_ester", "l_glucose", "l_iron", "l_achetone",
      "m_manganese", "m_toishi", "m_rma", "m_alcohol", "m_rock", "m_souchi", ,
      "m_ester", "m_glucose", "m_iron", "m_achetone", "m_gel", "m_alloy",
      "h_manganese", "h_toishi", "h_rma", "h_alcohol", "h_rock", "h_souchi",
      "h_ester", "h_glucose", "h_iron", "h_achetone", "h_gel", "h_alloy",
      "e_d32", "e_nano", "e_fusion"
    ]
  },
  "b_rock": { value: "源岩鉱" },
  "b_souchi": { value: "破損装置" },
  "b_ester": { value: "エステル原料" },
  "b_glucose": { value: "ブドウ糖" },
  "b_iron": { value: "異鉄の欠片" },
  "b_achetone": { value: "アケトン試剤" },
  "l_rock": { value: "初級源岩" },
  "l_souchi": { value: "初級装置" },
  "l_ester": { value: "初級エステル" },
  "l_glucose": { value: "初級糖源" },
  "l_iron": { value: "初級異鉄" },
  "l_achetone": { value: "初級アケトン" },
  "m_manganese": { value: "マンガン" },
  "m_toishi": { value: "砥石" },
  "m_rma": { value: "RMA70-12" },
  "m_alcohol": { value: "合成コール" },
  "m_rock": { value: "中級源岩" },
  "m_souchi": { value: "中級装置" },
  "m_ester": { value: "中級エステル" },
  "m_glucose": { value: "中級糖源" },
  "m_iron": { value: "中級異鉄" },
  "m_achetone": { value: "中級アケトン" },
  "m_gel": { value: "人工ゲル" },
  "m_alloy": { value: "熾合金" },
  "h_manganese": { value: "上級マンガン" },
  "h_toishi": { value: "上級砥石" },
  "h_rma": { value: "RMA70-24" },
  "h_alcohol": { value: "上級合成コール" },
  "h_rock": { value: "上級源岩" },
  "h_souchi": { value: "上級装置" },
  "h_ester": { value: "上級エステル" },
  "h_glucose": { value: "上級糖源" },
  "h_iron": { value: "上級異鉄" },
  "h_achetone": { value: "上級アケトン" },
  "h_gel": { value: "融合ゲル" },
  "h_alloy": { value: "合成熾合金" },
  "e_d32": { value: "D32鋼" },
  "e_nano": { value: "ナノフレーク" },
  "e_fusion": { value: "融合材" }
});
/**
 * エクスポート
 * export default const と書けない仕様のため、宣言とエクスポートは分けて記述
 */
export default constantOfMaterial;
