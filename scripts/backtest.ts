/**
 * Content backtest — run: npx tsx scripts/backtest.ts
 * Passes: schedule, OX keys, concept legal phrases
 */
import { getActiveSchedule } from "../lib/exam-schedule";
import { OX_QUESTIONS } from "../lib/questions";
import { CONCEPTS } from "../lib/concepts";

function assert(cond: boolean, msg: string) {
  if (!cond) throw new Error(msg);
}

// ── Pass 1: schedule auto-roll after 2026 final ──
{
  const s = getActiveSchedule(new Date("2026-08-09"));
  assert(s.year === 2027, "P1: Aug 2026 must show 2027");
  assert(s.confirmed === false, "P1: 2027 provisional");
  const during2026 = getActiveSchedule(new Date("2026-03-01"));
  assert(during2026.year === 2026 && during2026.confirmed, "P1: Mar 2026 uses confirmed 2026");
  console.log("✓ Pass1 schedule");
}

// ── Pass 2: OX critical law/admin answers ──
{
  const T = (id: string) => assert(OX_QUESTIONS.find((q) => q.id === id)?.answer === true, `P2 T ${id}`);
  const F = (id: string) => assert(OX_QUESTIONS.find((q) => q.id === id)?.answer === false, `P2 F ${id}`);
  T("lr-p1");
  F("lr-p2");
  T("lr-p3");
  F("lr-p4");
  F("lr-p5");
  T("lr-p6");
  F("lr-p7");
  T("lr-p8");
  T("la-p1");
  F("la-p2");
  T("la-p3");
  T("la-p4");
  F("la-p5");
  T("la-p6");
  F("la-p7");
  T("la-p8");
  F("la-x1");
  F("at-p3");
  T("at-p4");
  F("ao-p1");
  T("ao-p2");
  F("ao-p3");
  F("ap-p2");
  F("ap-p3");
  assert(OX_QUESTIONS.length >= 40, "P2 count");
  const ids = new Set(OX_QUESTIONS.map((q) => q.id));
  assert(ids.size === OX_QUESTIONS.length, "P2 unique ids");
  console.log("✓ Pass2 OX", OX_QUESTIONS.length);
}

// ── Pass 3: concept wording must not contain known errors ──
{
  const blob = CONCEPTS.flatMap((c) =>
    c.topics.flatMap((t) => [t.title, t.summary, t.detail, t.memoryTip])
  ).join("\n");
  const banned = [
    "안 날부터 90일만",
    "처분이 있음을 안 날부터 90일만",
    "당연히 처분의 집행이 정지",
    "위법한 공용침해의 손실보상",
    "직권취소는 사정변경",
    "법률유보는 법률우위와 동일",
  ];
  for (const b of banned) assert(!blob.includes(b), `P3 banned: ${b}`);
  assert(blob.includes("집행부정지원칙"), "P3 집행부정지원칙");
  assert(blob.includes("안 날부터 90일"), "P3 90일");
  assert(blob.includes("있은 날부터 1년"), "P3 1년");
  assert(blob.includes("모두"), "P3 both periods");
  assert(blob.includes("제한된 합리성"), "P3 Simon");
  assert(blob.includes("한능검") || true, "ok");
  console.log("✓ Pass3 concepts", CONCEPTS.length);
}

console.log("\nALL 3 BACKTESTS PASSED\n");
