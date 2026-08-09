import type { ConceptSection } from "../types";

/** 행정학 (round 1) — 9급 빈출 개념 */
export const ROUND1_CONCEPTS: ConceptSection[] = [
  {
    id: "as-theory",
    round: 1,
    title: "행정학 이론",
    subtitle: "고전 · 인간관계 · 행태 · 신공공관리",
    icon: "📐",
    topics: [
      {
        title: "행정의 개념·패러다임",
        summary: "공익 실현을 위한 정책의 집행·관리. Wilson 정치·행정 이원론에서 거버넌스로 확장.",
        detail:
          "【전통】\n정치(결정) vs 행정(집행) 이분(윌슨). 실제로는 정책결정·집행이 연속.\n\n【패러다임 흐름】\n① 전통적 관료제·과학적 관리\n② 인간관계론·행태론\n③ 신공공관리(NPM): 시장·성과·고객\n④ 거버넌스: 정부·시장·시민 네트워크\n\n【9급 TIP】\n'행정=정치와 무관'은 고전적 이원론 표현. 현대는 상호침투를 강조.",
        memoryTip: "윌슨 이원론 → 행태 → NPM → 거버넌스. 시대별 키워드!",
        keywords: ["이원론", "NPM", "거버넌스", "공익"],
        examPoints: ["정치·행정 이원론", "NPM vs 거버넌스"],
      },
      {
        title: "베버의 관료제",
        summary: "합법적 권위 기반. 계층제·규칙·전문성·비인격성·문서주의.",
        detail:
          "【특징】\n· 계층제(명령·복종)\n· 규칙·법규에 의한 업무\n· 전문적 자격·분업\n· 비인격적 관계\n· 문서·기록 중심\n· 직업으로서의 공무\n\n【비판】\n경직성·형식주의·목표치환·레드테이프\n\n【대비】\n엽관제(정당 충성) vs 실적주의(능력)",
        memoryTip: "베버=계층·규칙·전문·비인격·문서. 비판=경직·형식주의.",
        keywords: ["관료제", "계층제", "실적주의", "엽관제"],
        examPoints: ["관료제 특징", "엽관 vs 실적"],
      },
      {
        title: "과학적 관리·인간관계·행태론",
        summary: "Taylor=효율·표준화. Mayo=인간관계. Simon=제한된 합리성.",
        detail:
          "【Taylor】\n시간·동작연구, 표준화, 성과급 → 능률\n\n【인간관계론(Mayo 등)】\n호손실험: 비공식 집단·사기·사회적 요인이 생산성에 영향\n\n【Simon】\n완전합리성 부정 → **제한된 합리성(bounded rationality)**\n만족화(satisficing) 의사결정\n\n【Lindblom】\n점증주의(incrementalism): 급진적 합리 모형 대신 소폭 조정",
        memoryTip: "Taylor=능률, Mayo=인간, Simon=제한합리·만족화, Lindblom=점증.",
        keywords: ["과학적관리", "호손실험", "제한된합리성", "점증주의"],
        examPoints: ["Simon vs 완전합리", "점증주의"],
      },
      {
        title: "신공공관리(NPM)·거버넌스",
        summary: "NPM=민간기법·성과·경쟁. 거버넌스=네트워크·협력·다원 주체.",
        detail:
          "【NPM】\n민간경영 기법 도입, 성과측정, 계약·아웃소싱, 고객 지향\n약점: 공공가치·형평 경시, 책임성 분산\n\n【거버넌스】\n정부 단독이 아닌 기업·시민사회와의 **협력·네트워크**\n참여·투명·신뢰\n\n【대비】\nNPM=효율·시장 / 거버넌스=협력·네트워크",
        memoryTip: "NPM=시장·성과, 거버넌스=네트워크·협력.",
        keywords: ["NPM", "거버넌스", "성과주의", "네트워크"],
        examPoints: ["NPM 특징·비판", "거버넌스 개념"],
      },
    ],
  },
  {
    id: "as-org",
    round: 1,
    title: "조직 · 인사",
    subtitle: "조직구조 · 동기 · 공무원제도",
    icon: "🏛️",
    topics: [
      {
        title: "조직의 원리·구조",
        summary: "계층제·통솔범위·전문화·조정. 라인과 스태프.",
        detail:
          "【고전 원리】\n계층제, 통솔의 범위, 명령통일, 분업·전문화, 조정\n\n【라인·스태프】\n라인: 지휘·집행 계통\n스태프: 조언·지원(참모)\n\n【집권·분권】\n의사결정 권한의 상향·하향 배치\n\n【매트릭스·네트워크】\n프로젝트·다원 보고, 유연 조직",
        memoryTip: "라인=지휘, 스태프=조언. 집권=위, 분권=아래.",
        keywords: ["계층제", "통솔범위", "라인", "스태프", "분권"],
        examPoints: ["라인 vs 스태프", "집권·분권"],
      },
      {
        title: "동기부여 이론",
        summary: "Maslow 욕구단계, Herzberg 2요인, McGregor X·Y.",
        detail:
          "【Maslow】\n생리→안전→사회→존경→자아실현 (상위 욕구는 하위 충족 후)\n\n【Herzberg】\n위생요인(불만 제거, 동기 X) vs 동기요인(성취·인정·책임)\n\n【McGregor】\nX이론: 인간 혐오노동 → 통제\nY이론: 자아실현·책임 → 참여·권한부여\n\n【시험】\n위생요인만으로 만족(동기)이 생긴다는 진술은 오답.",
        memoryTip: "Herzberg: 위생=불만↓, 동기=만족↑. 둘은 다름!",
        keywords: ["Maslow", "Herzberg", "X이론", "Y이론"],
        examPoints: ["위생 vs 동기요인", "X·Y이론"],
      },
      {
        title: "공무원 인사행정",
        summary: "실적주의·신분보장. 폐쇄형·개방형. 직위분류 vs 계급제.",
        detail:
          "【이념】\n실적주의(능력·자격) vs 엽관제(정당 충성)\n정치적 중립·신분보장(정당한 사유 없는 면직 제한)\n\n【충원】\n폐쇄형: 하위 입직 후 승진 중심\n개방형: 외부 전문가 충원 확대\n\n【분류】\n직위분류제: 직무 중심\n계급제: 사람·계급 중심\n\n【한국】\n공개경쟁채용·경력경쟁 등. 9급은 공개경쟁이 대표적.",
        memoryTip: "실적=능력, 엽관=정당. 폐쇄=승진, 개방=외부.",
        keywords: ["실적주의", "엽관제", "폐쇄형", "개방형", "직위분류"],
        examPoints: ["실적 vs 엽관", "폐쇄·개방형"],
      },
    ],
  },
  {
    id: "as-policy",
    round: 1,
    title: "정책 · 예산 · 결정",
    subtitle: "정책과정 · 의사결정 · 예산제도",
    icon: "📊",
    topics: [
      {
        title: "정책과정",
        summary: "의제설정 → 결정 → 집행 → 평가·환류.",
        detail:
          "【단계】\n1. 의제설정(agenda setting)\n2. 정책결정(대안 선택)\n3. 정책집행(implementation)\n4. 정책평가·환류\n\n【집행 실패 요인】\n목표 모호, 자원 부족, 일선관료 재량, 대상집단 저항, 조정 실패\n\n【평가】\n효과성·효율성·형평성·대응성",
        memoryTip: "의제→결정→집행→평가. 집행 실패=목표·자원·일선재량.",
        keywords: ["의제설정", "집행", "평가", "환류"],
        examPoints: ["정책과정 단계", "집행 실패"],
      },
      {
        title: "의사결정 모형",
        summary: "합리모형·만족화·점증주의·혼합탐사. Allison I·II·III.",
        detail:
          "【합리모형】\n목표 명확·완전정보·최적 선택 (비현실적 가정 많음)\n\n【Simon】\n제한된 합리성 → 만족화\n\n【Lindblom】\n점증주의: 현상 유지 속 소폭 변경\n\n【Etzioni】\n혼합탐사(mixed scanning): 거시+미시\n\n【Allison】\nI 합리적 행위자 / II 조직과정 / III 관료정치",
        memoryTip: "완전합리 X → Simon 만족화 · Lindblom 점증 · Allison 3모형.",
        keywords: ["합리모형", "만족화", "점증주의", "Allison"],
        examPoints: ["Allison 모형", "점증 vs 합리"],
      },
      {
        title: "예산의 기능·종류",
        summary: "품목별·성과주의·PPBS·ZBB. 예산원칙(완전성·단일성 등).",
        detail:
          "【기능】\n재정통제, 관리개선, 정책기획\n\n【편성 방식】\n· 품목별(line-item): 지출 항목 통제\n· 성과주의: 사업·성과 연계\n· PPBS: 기획·계획·예산 체계\n· ZBB(영기준): 매년 제로부터 정당화\n\n【원칙(고전)】\n완전성, 단일성, 통일성, 한정성, 공연성 등\n\n【과정】\n편성→심의·의결→집행→결산",
        memoryTip: "품목=통제, 성과=결과, ZBB=매년 제로 정당화.",
        keywords: ["품목별예산", "PPBS", "ZBB", "성과주의"],
        examPoints: ["예산유형 비교", "예산과정"],
      },
      {
        title: "리더십·의사소통",
        summary: "거래적·변혁적 리더십. 공식·비공식 의사소통.",
        detail:
          "【리더십】\n거래적: 보상·처벌 교환\n변혁적: 비전·가치·동기 고양\n상황이론: 상황 적합\n\n【의사소통】\n공식(계층) vs 비공식(그rape·네트워크)\n상향·하향·수평\n\n【갈등】\n과업갈등 vs 관계갈등 — 관리·조정 필요",
        memoryTip: "거래=교환, 변혁=비전. 공식 경로 vs 비공식 경로.",
        keywords: ["변혁적리더십", "거래적리더십", "의사소통"],
        examPoints: ["리더십 유형", "의사소통 방향"],
      },
    ],
  },
];
