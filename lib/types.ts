export type TabId = "home" | "round1" | "round2" | "ox";

export type OxCategory =
  | "admin-theory"
  | "admin-org"
  | "admin-policy"
  | "law-act"
  | "law-remedy";

export type OxSource = "past" | "predict";

export interface ExamSchedule {
  examDate: string;
  registrationStart: string;
  registrationEnd: string;
  localExamDate: string;
  resultDate: string;
  label: string;
}

export interface CustomDday {
  label: string;
  date: string;
}

export interface OxQuestion {
  id: string;
  category: OxCategory;
  source: OxSource;
  /** 1=행정학, 2=행정법 */
  round: 1 | 2;
  text: string;
  answer: boolean;
  explanation: string;
  hint?: string;
  detail?: string;
  relatedLaw?: string;
  year?: number;
}

export interface ConceptTopic {
  title: string;
  summary: string;
  detail: string;
  memoryTip: string;
  keywords: string[];
  examPoints: string[];
}

export interface ConceptSection {
  id: string;
  round: 1 | 2;
  title: string;
  subtitle: string;
  icon: string;
  topics: ConceptTopic[];
}

export interface OxProgress {
  [questionId: string]: { chosen: boolean; correct: boolean; at: string };
}

export const CATEGORY_LABELS: Record<OxCategory, string> = {
  "admin-theory": "행정학 · 이론",
  "admin-org": "행정학 · 조직·인사",
  "admin-policy": "행정학 · 정책·예산",
  "law-act": "행정법 · 행정행위",
  "law-remedy": "행정법 · 쟁송·배상",
};

export const SOURCE_LABELS: Record<OxSource, string> = {
  past: "기출 유형",
  predict: "예상 OX",
};

export const ROUND_LABELS: Record<1 | 2, string> = {
  1: "행정학",
  2: "행정법",
};
