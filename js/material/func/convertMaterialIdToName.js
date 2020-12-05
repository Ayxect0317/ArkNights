"use strict";

/**
 * 素材IDを素材名に変換する
 */
export default function convertMaterialIdToName(materialId) {
  const nameObject = {
    "b_rock": "源岩鉱",
    "b_souchi": "破損装置",
    "b_ester": "エステル原料",
    "b_glucose": "ブドウ糖",
    "b_iron": "異鉄の欠片",
    "b_achetone": "アケトン試剤",
    "l_rock": "初級源岩",
    "l_souchi": "初級装置",
    "l_ester": "初級エステル",
    "l_glucose": "初級糖源",
    "l_iron": "初級異鉄",
    "l_achetone": "初級アケトン",
    "m_manganese": "マンガン",
    "m_toishi": "砥石",
    "m_rma": "RMA70-12",
    "m_alcohol": "合成コール",
    "m_rock": "中級源岩",
    "m_souchi": "中級装置",
    "m_ester": "中級エステル",
    "m_glucose": "中級糖源",
    "m_iron": "中級異鉄",
    "m_achetone": "中級アケトン",
    "m_gel": "人工ゲル",
    "m_alloy": "熾合金",
    "h_manganese": "上級マンガン",
    "h_toishi": "上級砥石",
    "h_rma": "RMA70-24",
    "h_alcohol": "上級合成コール",
    "h_rock": "上級源岩",
    "h_souchi": "上級装置",
    "h_ester": "上級エステル",
    "h_glucose": "上級糖源",
    "h_iron": "上級異鉄",
    "h_achetone": "上級アケトン",
    "h_gel": "融合ゲル",
    "h_alloy": "合成熾合金",
    "e_d32": "D32鋼",
    "e_nano": "ナノフレーク",
    "e_fusion": "融合材"
  }

  // 出力
  return nameObject[materialId];
}
