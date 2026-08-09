import type { ExamSchedule } from "./types";

export type OfficialExamSchedule = ExamSchedule & {
  year: number;
  confirmed: boolean;
};

/**
 * 확정 공고만 기재.
 * 2026 국가직 9급: 필기 4.4 / 최종 6.19 (2026-08 기준 종료)
 * 2027은 미공고 → 잠정 패턴 사용
 */
export const CONFIRMED_SCHEDULES: OfficialExamSchedule[] = [
  {
    year: 2026,
    confirmed: true,
    label: "2026년 국가직 9급 (종료)",
    examDate: "2026-04-04",
    registrationStart: "2026-02-02",
    registrationEnd: "2026-02-06",
    localExamDate: "2026-06-20",
    resultDate: "2026-06-19",
  },
];

/** 4월 첫 토요일 (국가직 9급 통상 패턴) */
function firstSaturdayOfApril(year: number): string {
  const d = new Date(year, 3, 1);
  while (d.getDay() !== 6) d.setDate(d.getDate() + 1);
  return toYmd(d);
}

/** 6월 셋째 토요일 (지방직 9급 통상 패턴) */
function thirdSaturdayOfJune(year: number): string {
  const d = new Date(year, 5, 1);
  let count = 0;
  while (count < 3) {
    if (d.getDay() === 6) count += 1;
    if (count < 3) d.setDate(d.getDate() + 1);
  }
  return toYmd(d);
}

function februaryFirstWeekMonFri(year: number): { start: string; end: string } {
  const d = new Date(year, 1, 1);
  while (d.getDay() !== 1) d.setDate(d.getDate() + 1);
  const start = toYmd(d);
  const endD = new Date(d);
  endD.setDate(endD.getDate() + 4);
  return { start, end: toYmd(endD) };
}

function provisionalFinal(examDate: string): string {
  const d = new Date(examDate + "T00:00:00");
  d.setDate(d.getDate() + 75);
  while (d.getDay() !== 5) d.setDate(d.getDate() + 1);
  return toYmd(d);
}

function toYmd(d: Date): string {
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
}

function buildProvisional(year: number): OfficialExamSchedule {
  const examDate = firstSaturdayOfApril(year);
  const reg = februaryFirstWeekMonFri(year);
  return {
    year,
    confirmed: false,
    label: `${year}년 국가직 9급 (잠정)`,
    examDate,
    registrationStart: reg.start,
    registrationEnd: reg.end,
    localExamDate: thirdSaturdayOfJune(year),
    resultDate: provisionalFinal(examDate),
  };
}

function endOfDay(dateStr: string): Date {
  return new Date(dateStr + "T23:59:59");
}

/** 최종합격발표 지나면 다음 연도 국가직으로 자동 전환 */
export function getActiveSchedule(now = new Date()): OfficialExamSchedule {
  const y = now.getFullYear();
  const candidates: OfficialExamSchedule[] = [];
  for (let year = y - 1; year <= y + 2; year++) {
    const confirmed = CONFIRMED_SCHEDULES.find((s) => s.year === year);
    candidates.push(confirmed ?? buildProvisional(year));
  }
  candidates.sort((a, b) => a.examDate.localeCompare(b.examDate));
  const upcoming = candidates.find((s) => now <= endOfDay(s.resultDate));
  if (upcoming) return upcoming;
  return buildProvisional(y + 1);
}

export const EXAM_INFO = {
  duration: "110분",
  items2026: "과목당 20문항 · 총 100문항",
  items2027: "과목당 25문항 · 총 100문항 (한능검 3급↑로 한국사 대체)",
  pass: "매 과목 40점 이상 · 전 과목 평균 60점 이상",
  subjectsAdmin: "국어 · 영어 · (한국사/한능검) · 행정학 · 행정법",
};

export function daysUntil(dateStr: string): number {
  const target = new Date(dateStr + "T00:00:00");
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return Math.ceil((target.getTime() - today.getTime()) / 86400000);
}

export function formatDateKo(dateStr: string): string {
  const d = new Date(dateStr + "T00:00:00");
  const days = ["일", "월", "화", "수", "목", "금", "토"];
  return `${d.getFullYear()}.${String(d.getMonth() + 1).padStart(2, "0")}.${String(d.getDate()).padStart(2, "0")} (${days[d.getDay()]})`;
}

export function periodStatus(start: string, end: string): "before" | "open" | "closed" {
  const now = new Date();
  now.setHours(0, 0, 0, 0);
  const s = new Date(start + "T00:00:00");
  const e = new Date(end + "T23:59:59");
  if (now < s) return "before";
  if (now > e) return "closed";
  return "open";
}
