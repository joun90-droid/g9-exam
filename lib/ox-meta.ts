import type { OxCategory, OxQuestion } from "./types";
import { CATEGORY_LABELS } from "./types";

const LAW: Record<OxCategory, string> = {
  "admin-theory": "행정학 · 행정이론 · 패러다임",
  "admin-org": "행정학 · 조직론 · 인사행정",
  "admin-policy": "행정학 · 정책학 · 재무행정",
  "law-act": "행정법 · 행정작용법 · 행정절차법",
  "law-remedy": "행정소송법 · 행정심판법 · 국가배상법",
};

const META: Partial<Record<string, { hint: string; detail: string }>> = {
  "at-p3": {
    hint: "Simon — 완전합리? 제한합리?",
    detail: "제한된 합리성·만족화. '최적·완전정보'는 고전 합리모형의 가정.",
  },
  "ao-p1": {
    hint: "라인 vs 스태프.",
    detail: "라인=지휘·집행 계통, 스태프=조언·지원(참모).",
  },
  "ap-p2": {
    hint: "Allison I·II·III.",
    detail: "I 합리적 행위자 / II 조직과정 / III 관료정치.",
  },
  "la-p2": {
    hint: "우위 vs 유보.",
    detail: "우위=법률 위반 불가. 유보=법률 근거 필요(특히 침익).",
  },
  "la-p5": {
    hint: "취소 vs 철회.",
    detail: "취소=성립 시 하자(소급). 철회=사후 사정(장래).",
  },
  "lr-p1": {
    hint: "제소기간 — 90일과 1년.",
    detail: "안 날부터 90일 + 있은 날부터 1년. 둘 다 충족해야 함.",
  },
  "lr-p4": {
    hint: "소 제기 = 집행정지?",
    detail: "집행부정지원칙. 집행정지는 별도 신청이 필요.",
  },
  "lr-p7": {
    hint: "배상 vs 보상.",
    detail: "배상=위법·과실 손해. 보상=적법 공용침해의 특별희생.",
  },
};

function defaultHint(q: OxQuestion) {
  return `「${CATEGORY_LABELS[q.category]}」에서 "${q.text.slice(0, 18)}…" 핵심을 떠올려 보세요.`;
}

function defaultDetail(q: OxQuestion) {
  return `${q.explanation}\n\n【연관 학습】 ${LAW[q.category]} 개념 탭을 다시 확인하세요.\n\n【시험 TIP】 '항상'·'반드시'·'모든' 극단 표현을 의심하세요.`;
}

export function enrichQuestion(q: OxQuestion): OxQuestion {
  const m = META[q.id];
  return {
    ...q,
    hint: m?.hint ?? defaultHint(q),
    detail: m?.detail ?? defaultDetail(q),
    relatedLaw: q.relatedLaw ?? LAW[q.category],
  };
}

export function enrichAll(questions: OxQuestion[]) {
  return questions.map(enrichQuestion);
}
