"use strict";

// 文字列が素材IDかどうか判定する
export default function isMatId(str) {
  // 素材ID一覧
  const materialIds = [
    "b_rock",
    "b_souchi",
    "b_ester",
    "b_glucose",
    "b_iron",
    "b_achetone",
    "l_rock",
    "l_souchi",
    "l_ester",
    "l_glucose",
    "l_iron",
    "l_achetone",
    "m_manganese",
    "m_toishi",
    "m_rma",
    "m_alcohol",
    "m_rock",
    "m_souchi",
    "m_ester",
    "m_glucose",
    "m_iron",
    "m_achetone",
    "m_gel",
    "m_alloy",
    "h_manganese",
    "h_toishi",
    "h_rma",
    "h_alcohol",
    "h_rock",
    "h_souchi",
    "h_ester",
    "h_glucose",
    "h_iron",
    "h_achetone",
    "h_gel",
    "h_alloy",
    "e_d32",
    "e_nano",
    "e_fusion"
  ]

  // 出力
  return materialIds.includes(str);
}
