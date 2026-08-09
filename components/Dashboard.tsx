"use client";

import { useEffect, useMemo, useState } from "react";
import type { CustomDday, TabId } from "@/lib/types";
import {
  EXAM_INFO,
  daysUntil,
  formatDateKo,
  getActiveSchedule,
  periodStatus,
  type OfficialExamSchedule,
} from "@/lib/exam-schedule";
import { clearExamScheduleOverride, loadCustomDdays, saveCustomDdays } from "@/lib/storage";
import { ConceptPanel } from "./ConceptPanel";
import { OxQuizPanel } from "./OxQuizPanel";
import { ThemeToggle } from "./ThemeToggle";
import {
  BookOpen,
  Calendar,
  ClipboardList,
  GraduationCap,
  Home,
  Plus,
  Scale,
  Trash2,
} from "lucide-react";

const TABS: { id: TabId; label: string; icon: typeof Home }[] = [
  { id: "home", label: "D-day", icon: Home },
  { id: "round1", label: "행정학", icon: BookOpen },
  { id: "round2", label: "행정법", icon: Scale },
  { id: "ox", label: "OX 퀴즈", icon: ClipboardList },
];

export function Dashboard() {
  const [tab, setTab] = useState<TabId>("home");
  const [schedule, setSchedule] = useState<OfficialExamSchedule>(() => getActiveSchedule());
  const [customDdays, setCustomDdays] = useState<CustomDday[]>([]);
  const [newDdayLabel, setNewDdayLabel] = useState("");
  const [newDdayDate, setNewDdayDate] = useState("");

  useEffect(() => {
    clearExamScheduleOverride();
    setSchedule(getActiveSchedule());
    setCustomDdays(loadCustomDdays());
  }, []);

  const examDday = useMemo(() => daysUntil(schedule.examDate), [schedule.examDate]);
  const localDday = useMemo(() => daysUntil(schedule.localExamDate), [schedule.localExamDate]);
  const regStatus = periodStatus(schedule.registrationStart, schedule.registrationEnd);

  const addCustomDday = () => {
    if (!newDdayLabel.trim() || !newDdayDate) return;
    const next = [...customDdays, { label: newDdayLabel.trim(), date: newDdayDate }];
    setCustomDdays(next);
    saveCustomDdays(next);
    setNewDdayLabel("");
    setNewDdayDate("");
  };

  const removeCustomDday = (i: number) => {
    const next = customDdays.filter((_, idx) => idx !== i);
    setCustomDdays(next);
    saveCustomDdays(next);
  };

  return (
    <div className="relative z-10 mx-auto min-h-dvh max-w-3xl px-4 pb-28 pt-6 sm:px-6">
      <header className="mb-6 flex items-start justify-between gap-3">
        <div>
          <p className="text-xs font-semibold uppercase tracking-widest text-re-accent">영재의 · Maker</p>
          <h1 className="mt-1 text-2xl font-bold sm:text-3xl">영재의 9급 행정학·행정법</h1>
          <p className="mt-1 text-sm text-re-muted">{schedule.label}</p>
        </div>
        <ThemeToggle />
      </header>

      {tab === "home" && (
        <div className="space-y-4">
          <div className="glass overflow-hidden p-6 text-center">
            <p className="text-sm text-re-muted">국가직 필기까지</p>
            <p className="mt-2 font-mono text-6xl font-black tabular-nums text-re-accent sm:text-7xl">
              D-{examDday > 0 ? examDday : examDday === 0 ? "DAY" : `+${Math.abs(examDday)}`}
            </p>
            <p className="mt-3 text-lg font-semibold">{formatDateKo(schedule.examDate)}</p>
            <p className="mt-1 text-sm text-re-muted">일정 수정 불가 · 연도 자동 전환</p>
            {!schedule.confirmed && (
              <p className="mt-2 text-xs text-amber-600 dark:text-amber-400">
                잠정 일정입니다. 인사혁신처·국가공무원채용시스템(gosi.kr) 공고를 확인하세요.
              </p>
            )}
          </div>

          <div className="grid gap-3 sm:grid-cols-2">
            <div className="glass p-4">
              <div className="mb-2 flex items-center gap-2 text-sm font-semibold">
                <Calendar className="h-4 w-4 text-re-accent" />
                국가직 원서접수
              </div>
              <p className="text-xs text-re-muted">
                {formatDateKo(schedule.registrationStart)} ~ {formatDateKo(schedule.registrationEnd).split(" ")[0]}
              </p>
              <span
                className={`mt-2 inline-block rounded-full px-2.5 py-0.5 text-xs font-medium ${
                  regStatus === "open"
                    ? "bg-re-success/15 text-re-success"
                    : regStatus === "before"
                      ? "bg-re-accent/15 text-re-accent"
                      : "bg-re-muted/20 text-re-muted"
                }`}
              >
                {regStatus === "open" ? "접수 중" : regStatus === "before" ? "접수 예정" : "접수 마감"}
              </span>
            </div>
            <div className="glass p-4">
              <div className="mb-2 flex items-center gap-2 text-sm font-semibold">
                <GraduationCap className="h-4 w-4 text-re-accent2" />
                지방직 필기 (참고)
              </div>
              <p className="text-xs text-re-muted">{formatDateKo(schedule.localExamDate)}</p>
              <p className="mt-2 font-mono text-sm font-bold text-re-gold">
                {localDday >= 0 ? `D-${localDday}` : `D+${Math.abs(localDday)}`}
              </p>
            </div>
          </div>

          <div className="glass p-4 text-sm">
            <h3 className="mb-2 font-semibold">시험·합격 안내</h3>
            <ul className="space-y-1.5 text-re-muted">
              <li>· 시험시간 {EXAM_INFO.duration}</li>
              <li>· 2026까지: {EXAM_INFO.items2026}</li>
              <li>· 2027부터: {EXAM_INFO.items2027}</li>
              <li>· 합격: {EXAM_INFO.pass}</li>
              <li>· 행정직 예: {EXAM_INFO.subjectsAdmin}</li>
              <li>· 접수: gongmuwon.gosi.kr / gosi.kr</li>
            </ul>
          </div>

          <div className="glass p-4">
            <div className="mb-3 flex items-center justify-between">
              <h3 className="text-sm font-semibold">나만의 D-day</h3>
              <span className="text-xs text-re-muted">최종발표 {formatDateKo(schedule.resultDate)}</span>
            </div>
            {customDdays.length === 0 ? (
              <p className="text-sm text-re-muted">모의고사·암기 마감일을 추가해 보세요.</p>
            ) : (
              <ul className="space-y-2">
                {customDdays.map((d, i) => {
                  const dd = daysUntil(d.date);
                  return (
                    <li key={i} className="flex items-center justify-between rounded-xl bg-re-card px-3 py-2">
                      <div>
                        <p className="text-sm font-medium">{d.label}</p>
                        <p className="text-xs text-re-muted">{formatDateKo(d.date)}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-sm font-bold text-re-gold">
                          {dd >= 0 ? `D-${dd}` : `D+${Math.abs(dd)}`}
                        </span>
                        <button type="button" onClick={() => removeCustomDday(i)} className="text-re-muted hover:text-re-danger">
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </li>
                  );
                })}
              </ul>
            )}
            <div className="mt-3 flex flex-wrap gap-2">
              <input
                type="text"
                value={newDdayLabel}
                onChange={(e) => setNewDdayLabel(e.target.value)}
                placeholder="예: 행정법 모의"
                className="min-w-0 flex-1 rounded-xl border border-re-border bg-re-bg px-3 py-2 text-sm outline-none focus:border-re-accent"
              />
              <input
                type="date"
                value={newDdayDate}
                onChange={(e) => setNewDdayDate(e.target.value)}
                className="rounded-xl border border-re-border bg-re-bg px-3 py-2 text-sm"
              />
              <button type="button" onClick={addCustomDday} className="btn-primary">
                <Plus className="h-4 w-4" />
                추가
              </button>
            </div>
          </div>

          <div className="rounded-xl border border-amber-500/30 bg-amber-500/5 p-4 text-xs leading-relaxed text-re-muted">
            <p className="font-semibold text-re-text">학습용 안내 (중요)</p>
            <p className="mt-1.5">
              본 앱은 9급 행정학·행정법 학습 보조 자료이며 법률 자문이 아닙니다.
              법령·판례·시험 과목은 개정될 수 있으니 국가법령정보센터·인사혁신처·공고문을 확인하세요.
            </p>
          </div>
        </div>
      )}

      {tab === "round1" && <ConceptPanel round={1} />}
      {tab === "round2" && <ConceptPanel round={2} />}
      {tab === "ox" && <OxQuizPanel />}

      {(tab === "round1" || tab === "round2" || tab === "ox") && (
        <p className="mt-6 text-center text-[11px] leading-relaxed text-re-muted">
          학습용 · 법령은 개정될 수 있음 · 법률 자문 아님
        </p>
      )}

      <nav className="fixed bottom-0 left-0 right-0 z-30 border-t border-re-border bg-re-panel/95 backdrop-blur-lg">
        <div className="mx-auto flex max-w-3xl">
          {TABS.map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              type="button"
              onClick={() => setTab(id)}
              className={`flex flex-1 flex-col items-center gap-1 py-3 text-[10px] font-medium transition sm:text-xs ${
                tab === id ? "text-re-accent" : "text-re-muted"
              }`}
            >
              <Icon className={`h-5 w-5 ${tab === id ? "scale-110" : ""}`} />
              {label}
            </button>
          ))}
        </div>
      </nav>
    </div>
  );
}
