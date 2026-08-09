import type { OxQuestion } from "./types";
import { enrichAll } from "./ox-meta";

/** 기출 유형=빈출 OX 재구성(원문 복제 아님). 행정법 기간·요건은 현행법 기준. */
export const OX_QUESTIONS: OxQuestion[] = [
  // ── 행정학 이론 ──
  { id: "at-p1", category: "admin-theory", source: "past", round: 1, year: 2025, text: "윌슨의 정치·행정 이원론은 정치와 행정의 완전한 분리를 현대에도 절대 명제로 본다.", answer: false, explanation: "고전적 이원론 주장. 현대 행정학은 정치·행정의 상호침투를 인정한다." },
  { id: "at-p2", category: "admin-theory", source: "past", round: 1, year: 2025, text: "베버의 관료제는 계층제·규칙·전문성·비인격성을 특징으로 한다.", answer: true, explanation: "합법적 권위에 기반한 관료제 이념형." },
  { id: "at-p3", category: "admin-theory", source: "past", round: 1, year: 2024, text: "사이먼(Simon)은 완전합리성에 기초한 최적 의사결정을 주장했다.", answer: false, explanation: "제한된 합리성·만족화(satisficing)를 주장." },
  { id: "at-p4", category: "admin-theory", source: "past", round: 1, year: 2024, text: "린드블롬의 점증주의는 급진적 전면 개편보다 소폭 조정을 강조한다.", answer: true, explanation: "incrementalism." },
  { id: "at-p5", category: "admin-theory", source: "past", round: 1, year: 2023, text: "신공공관리(NPM)는 민간경영 기법·성과·경쟁을 중시한다.", answer: true, explanation: "시장·고객·성과 지향." },
  { id: "at-p6", category: "admin-theory", source: "past", round: 1, year: 2023, text: "거버넌스는 정부 단독 통치만을 의미하며 민간·시민 참여와 무관하다.", answer: false, explanation: "네트워크·협력·다원 주체가 핵심." },
  { id: "at-x1", category: "admin-theory", source: "predict", round: 1, text: "엽관제는 정당 충성·정치적 임명을 중시하는 인사이념이다.", answer: true, explanation: "실적주의(능력)와 대비." },
  { id: "at-x2", category: "admin-theory", source: "predict", round: 1, text: "테일러의 과학적 관리는 호손실험에 기초한 인간관계론이다.", answer: false, explanation: "과학적 관리=능률·표준화. 호손=인간관계론." },

  // ── 조직·인사 ──
  { id: "ao-p1", category: "admin-org", source: "past", round: 1, year: 2025, text: "라인 조직은 조언·지원을, 스태프는 지휘·집행을 담당한다.", answer: false, explanation: "라인=지휘·집행, 스태프=조언·지원." },
  { id: "ao-p2", category: "admin-org", source: "past", round: 1, year: 2024, text: "허즈버그 이론에서 위생요인은 불만을 줄이지만 동기부여와는 구분된다.", answer: true, explanation: "위생=불만 제거, 동기요인=성취·인정 등." },
  { id: "ao-p3", category: "admin-org", source: "past", round: 1, year: 2024, text: "맥그리거 X이론은 인간을 자기실현·책임 지향적으로 본다.", answer: false, explanation: "X=혐오노동·통제, Y=자아실현·참여." },
  { id: "ao-p4", category: "admin-org", source: "past", round: 1, year: 2023, text: "폐쇄형 충원은 하위직 입직 후 승진을 중시하는 경향이 있다.", answer: true, explanation: "개방형은 외부 전문가 충원 확대." },
  { id: "ao-p5", category: "admin-org", source: "past", round: 1, year: 2023, text: "실적주의는 정당에 대한 충성을 공무원 임명의 제1기준으로 한다.", answer: false, explanation: "실적=능력·자격. 정당 충성은 엽관제." },
  { id: "ao-x1", category: "admin-org", source: "predict", round: 1, text: "통솔의 범위가 넓어질수록 한 상관의 직접 감독 부하 수는 줄어든다.", answer: false, explanation: "통솔범위↑ = 직접 감독 대상↑." },

  // ── 정책·예산 ──
  { id: "ap-p1", category: "admin-policy", source: "past", round: 1, year: 2025, text: "정책과정은 일반적으로 의제설정·결정·집행·평가의 흐름을 갖는다.", answer: true, explanation: "환류를 포함한 순환 과정으로 이해." },
  { id: "ap-p2", category: "admin-policy", source: "past", round: 1, year: 2024, text: "앨리슨 모형 I은 조직과정 모형이다.", answer: false, explanation: "I=합리적 행위자, II=조직과정, III=관료정치." },
  { id: "ap-p3", category: "admin-policy", source: "past", round: 1, year: 2024, text: "영기준예산(ZBB)은 전년도 예산을 그대로 답습하는 것을 원칙으로 한다.", answer: false, explanation: "매년 제로에서 사업을 정당화." },
  { id: "ap-p4", category: "admin-policy", source: "past", round: 1, year: 2023, text: "품목별 예산은 지출 항목 통제에 초점을 둔다.", answer: true, explanation: "line-item budgeting." },
  { id: "ap-p5", category: "admin-policy", source: "past", round: 1, year: 2023, text: "정책집행 실패는 목표 모호성·자원 부족·일선 재량 등과 관련될 수 있다.", answer: true, explanation: "집행론의 전형적 실패 요인." },
  { id: "ap-x1", category: "admin-policy", source: "predict", round: 1, text: "변혁적 리더십은 보상·처벌 교환에만 의존한다.", answer: false, explanation: "거래적=교환, 변혁적=비전·가치·동기." },

  // ── 행정행위 ──
  { id: "la-p1", category: "law-act", source: "past", round: 2, year: 2025, text: "법률의 우위는 행정이 법률에 위반할 수 없다는 원칙이다.", answer: true, explanation: "법률유보(근거 필요)와 구별." },
  { id: "la-p2", category: "law-act", source: "past", round: 2, year: 2025, text: "법률유보는 법률우위와 동일한 의미이다.", answer: false, explanation: "우위=위반 금지, 유보=법률 근거 필요." },
  { id: "la-p3", category: "law-act", source: "past", round: 2, year: 2024, text: "기속행위는 행정청에게 선택의 여지가 없는 행위이다.", answer: true, explanation: "재량행위와 대비. 재량은 일탈·남용 심사." },
  { id: "la-p4", category: "law-act", source: "past", round: 2, year: 2024, text: "행정행위의 하자가 중대하고 명백하면 무효가 될 수 있다.", answer: true, explanation: "중대·명백 하자 → 무효. 그 외 위법은 취소사유." },
  { id: "la-p5", category: "law-act", source: "past", round: 2, year: 2023, text: "직권취소는 성립 후 사정변경만을 이유로 한다.", answer: false, explanation: "직권취소=성립 시 하자. 사정변경은 철회." },
  { id: "la-p6", category: "law-act", source: "past", round: 2, year: 2023, text: "수익적 행정처분을 직권취소할 때에는 공익과 당사자 신뢰를 비교형량해야 한다.", answer: true, explanation: "판례상 비례·신뢰보호. 부정 취득은 신뢰 주장 곤란." },
  { id: "la-p7", category: "law-act", source: "past", round: 2, year: 2022, text: "행정지도는 강제력을 갖는 권력적 명령이다.", answer: false, explanation: "비권력적 권고·조언. 강제·불이익 암시 제한." },
  { id: "la-p8", category: "law-act", source: "past", round: 2, year: 2022, text: "행정절차법상 처분에는 원칙적으로 사전통지·의견제출 기회가 부여된다.", answer: true, explanation: "긴급 등 예외 있음. 이유제시·청문도 중요." },
  { id: "la-x1", category: "law-act", source: "predict", round: 2, text: "철회는 행정행위 성립 당시의 위법을 이유로 소급하여 효력을 없앤다.", answer: false, explanation: "철회=사후 사정·공익, 장래효. 소급 실효의 전형은 취소." },
  { id: "la-x2", category: "law-act", source: "predict", round: 2, text: "비례원칙은 적합·필요·상당(협의의 비례)을 포함한다.", answer: true, explanation: "과잉금지원칙의 핵심." },

  // ── 쟁송·배상 ──
  { id: "lr-p1", category: "law-remedy", source: "past", round: 2, year: 2025, text: "취소소송은 처분이 있음을 안 날부터 90일, 처분이 있은 날부터 1년 이내에 제기해야 한다.", answer: true, explanation: "행정소송법 제20조. 두 기간을 모두 충족해야 함." },
  { id: "lr-p2", category: "law-remedy", source: "past", round: 2, year: 2025, text: "취소소송은 처분이 있음을 안 날부터 90일만 지키면 1년이 지나도 제소할 수 있다.", answer: false, explanation: "안날 90일과 있은날 1년 — 어느 하나라도 지나면 불가." },
  { id: "lr-p3", category: "law-remedy", source: "past", round: 2, year: 2024, text: "무효등확인소송에는 원칙적으로 취소소송과 같은 제소기간 제한이 없다.", answer: true, explanation: "행정소송법상 제소기간 제한은 취소소송이 중심." },
  { id: "lr-p4", category: "law-remedy", source: "past", round: 2, year: 2024, text: "취소소송을 제기하면 당연히 처분의 집행이 정지된다.", answer: false, explanation: "집행부정지원칙. 집행정지는 별도 신청." },
  { id: "lr-p5", category: "law-remedy", source: "past", round: 2, year: 2023, text: "행정심판 전치는 모든 처분에 대해 필요적이다.", answer: false, explanation: "원칙은 임의적. 개별 법률이 필요적 전치를 정할 수 있음." },
  { id: "lr-p6", category: "law-remedy", source: "past", round: 2, year: 2023, text: "국가배상은 공무원의 직무상 위법·고의·과실로 인한 손해를 대상으로 한다.", answer: true, explanation: "국가배상법. 적법한 공용침해의 특별희생은 손실보상." },
  { id: "lr-p7", category: "law-remedy", source: "past", round: 2, year: 2022, text: "손실보상은 위법한 직무행위로 인한 손해배상을 말한다.", answer: false, explanation: "보상=적법한 공용침해의 특별희생. 위법·과실 손해는 배상." },
  { id: "lr-p8", category: "law-remedy", source: "past", round: 2, year: 2022, text: "행정심판을 거친 경우 취소소송 제소기간은 재결서 정본을 송달받은 날부터 기산할 수 있다.", answer: true, explanation: "행정소송법 제20조 제1항 단서." },
  { id: "lr-x1", category: "law-remedy", source: "predict", round: 2, text: "기관소송·민중소송은 법률이 정한 경우에 제기할 수 있다.", answer: true, explanation: "법률이 원고·대상을 열어준 경우." },
  { id: "lr-x2", category: "law-remedy", source: "predict", round: 2, text: "가해 공무원에게 고의 또는 중과실이 있으면 국가가 구상권을 행사할 수 있다.", answer: true, explanation: "국가배상법상 구상." },
];

export function filterQuestions(opts: {
  category?: string;
  source?: string;
  round?: 1 | 2;
}) {
  const filtered = OX_QUESTIONS.filter((q) => {
    if (opts.category && opts.category !== "all" && q.category !== opts.category) return false;
    if (opts.source && opts.source !== "all" && q.source !== opts.source) return false;
    if (opts.round && q.round !== opts.round) return false;
    return true;
  });
  return enrichAll(filtered);
}
