"use client";

import { useEffect, useMemo, useState } from "react";
import { filterQuestions } from "@/lib/questions";
import { clearOxProgress, loadOxProgress, saveOxAnswer } from "@/lib/storage";
import { CATEGORY_LABELS, ROUND_LABELS, SOURCE_LABELS, type OxCategory, type OxSource } from "@/lib/types";
import { BookOpen, Check, HelpCircle, Lightbulb, RotateCcw, Scale, X, XCircle } from "lucide-react";

export function OxQuizPanel() {
  const [category, setCategory] = useState<OxCategory | "all">("all");
  const [source, setSource] = useState<OxSource | "all">("all");
  const [round, setRound] = useState<1 | 2 | "all">("all");
  const [idx, setIdx] = useState(0);
  const [picked, setPicked] = useState<boolean | null>(null);
  const [showHint, setShowHint] = useState(false);
  const [progress, setProgress] = useState(loadOxProgress);

  const questions = useMemo(
    () =>
      filterQuestions({
        category: category === "all" ? undefined : category,
        source: source === "all" ? undefined : source,
        round: round === "all" ? undefined : round,
      }),
    [category, source, round]
  );

  useEffect(() => {
    if (questions.length > 0 && idx >= questions.length) setIdx(0);
  }, [questions.length, idx]);

  const q = questions[idx];
  const answered = q ? progress[q.id] : undefined;
  const showResult = picked !== null || !!answered;
  const chosen = picked ?? answered?.chosen ?? null;

  useEffect(() => {
    setPicked(null);
    setShowHint(false);
  }, [q?.id]);

  const stats = useMemo(() => {
    const ids = new Set(questions.map((x) => x.id));
    const done = Object.entries(progress).filter(([id]) => ids.has(id));
    const correct = done.filter(([, v]) => v.correct).length;
    return { total: questions.length, done: done.length, correct };
  }, [questions, progress]);

  const pick = (choice: boolean) => {
    if (!q || showResult) return;
    setPicked(choice);
    saveOxAnswer(q.id, choice, choice === q.answer);
    setProgress(loadOxProgress());
    setShowHint(false);
  };

  const next = () => {
    setPicked(null);
    setShowHint(false);
    setIdx((i) => (i + 1) % Math.max(questions.length, 1));
  };

  const reset = () => {
    clearOxProgress();
    setProgress({});
    setPicked(null);
    setShowHint(false);
    setIdx(0);
  };

  const progressPct = stats.total ? Math.round((stats.done / stats.total) * 100) : 0;

  if (questions.length === 0) {
    return (
      <div className="glass p-8 text-center text-re-muted">
        선택한 조건에 맞는 문제가 없습니다.
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="glass p-4 sm:p-5">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <h2 className="text-lg font-bold">OX 퀴즈</h2>
          <button type="button" onClick={reset} className="btn-ghost text-xs">
            <RotateCcw className="h-3.5 w-3.5" />
            기록 초기화
          </button>
        </div>
        <div className="mt-3 h-2 overflow-hidden rounded-full bg-re-border">
          <div
            className="h-full rounded-full bg-re-accent transition-all"
            style={{ width: `${progressPct}%` }}
          />
        </div>
        <div className="mt-3 flex flex-wrap gap-x-4 gap-y-1 text-sm">
          <span>
            진행 <strong>{stats.done}</strong> / {stats.total}
          </span>
          <span className="text-re-success">
            정답 <strong>{stats.correct}</strong>
          </span>
          {stats.done > 0 && (
            <span>
              정답률 <strong>{Math.round((stats.correct / stats.done) * 100)}%</strong>
            </span>
          )}
        </div>
      </div>

      <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-none">
        {(["all", 1, 2] as const).map((r) => (
          <button
            key={String(r)}
            type="button"
            onClick={() => {
              setRound(r);
              setIdx(0);
              setPicked(null);
              setShowHint(false);
            }}
            className={`chip ${round === r ? "chip-on" : ""}`}
          >
            {r === "all" ? "전체" : ROUND_LABELS[r]}
          </button>
        ))}
      </div>

      <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-none">
        <button
          type="button"
          onClick={() => {
            setCategory("all");
            setIdx(0);
            setPicked(null);
          }}
          className={`chip ${category === "all" ? "chip-on" : ""}`}
        >
          전체 단원
        </button>
        {(Object.keys(CATEGORY_LABELS) as OxCategory[]).map((c) => (
          <button
            key={c}
            type="button"
            onClick={() => {
              setCategory(c);
              setIdx(0);
              setPicked(null);
            }}
            className={`chip ${category === c ? "chip-on" : ""}`}
          >
            {CATEGORY_LABELS[c]}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-3 gap-2">
        {(["all", "past", "predict"] as const).map((s) => (
          <button
            key={s}
            type="button"
            onClick={() => {
              setSource(s);
              setIdx(0);
              setPicked(null);
            }}
            className={`chip justify-center ${source === s ? "chip-on" : ""}`}
          >
            {s === "all" ? "전체" : SOURCE_LABELS[s]}
          </button>
        ))}
      </div>

      {q && (
        <div className="glass p-5 sm:p-6">
          <div className="mb-4 flex flex-wrap gap-2 text-xs">
            <span className="chip chip-on">{CATEGORY_LABELS[q.category]}</span>
            <span className="chip">{SOURCE_LABELS[q.source]}</span>
            <span className="chip">{ROUND_LABELS[q.round]}</span>
            {q.year && <span className="chip">{q.year}년 유형</span>}
            <span className="chip ml-auto font-mono">
              {idx + 1} / {questions.length}
            </span>
          </div>

          <p className="text-base font-medium leading-[1.7] sm:text-lg">{q.text}</p>

          {!showResult && q.hint && (
            <div className="mt-4">
              <button
                type="button"
                onClick={() => setShowHint(!showHint)}
                className="flex items-center gap-2 text-sm text-re-accent hover:underline"
              >
                <HelpCircle className="h-4 w-4" />
                {showHint ? "힌트 숨기기" : "힌트 보기"}
              </button>
              {showHint && (
                <div className="memory-box mt-2">
                  <p className="flex items-center gap-1.5 text-xs font-bold text-re-accent">
                    <Lightbulb className="h-3.5 w-3.5" /> 힌트
                  </p>
                  <p className="mt-1 text-sm">{q.hint}</p>
                </div>
              )}
            </div>
          )}

          <div className="mt-6 grid grid-cols-2 gap-3">
            <button
              type="button"
              onClick={() => pick(true)}
              disabled={showResult}
              className={`flex items-center justify-center gap-2 rounded-2xl border-2 py-4 text-lg font-bold transition active:scale-[0.98] ${
                showResult && q.answer === true
                  ? "border-re-success bg-re-success/15 text-re-success"
                  : showResult && chosen === true && !q.answer
                    ? "border-re-danger bg-re-danger/10 text-re-danger"
                    : "border-re-border hover:border-re-success hover:bg-re-success/5"
              }`}
            >
              <Check className="h-6 w-6" /> O
            </button>
            <button
              type="button"
              onClick={() => pick(false)}
              disabled={showResult}
              className={`flex items-center justify-center gap-2 rounded-2xl border-2 py-4 text-lg font-bold transition active:scale-[0.98] ${
                showResult && q.answer === false
                  ? "border-re-success bg-re-success/15 text-re-success"
                  : showResult && chosen === false && q.answer
                    ? "border-re-danger bg-re-danger/10 text-re-danger"
                    : "border-re-border hover:border-re-danger hover:bg-re-danger/5"
              }`}
            >
              <X className="h-6 w-6" /> X
            </button>
          </div>

          {showResult && (
            <div className="mt-5 space-y-3">
              <div
                className={`rounded-xl p-4 ${
                  chosen === q.answer
                    ? "border border-re-success/40 bg-re-success/10"
                    : "border border-re-danger/40 bg-re-danger/10"
                }`}
              >
                <p className="flex items-center gap-2 font-semibold">
                  {chosen === q.answer ? (
                    <>
                      <Check className="h-5 w-5 text-re-success" /> 정답입니다!
                    </>
                  ) : (
                    <>
                      <XCircle className="h-5 w-5 text-re-danger" />
                      오답 — 정답은 <strong className="ml-1">{q.answer ? "O" : "X"}</strong>
                    </>
                  )}
                </p>
                <p className="mt-3 text-sm font-medium leading-relaxed text-re-text">{q.explanation}</p>
              </div>

              {q.detail && (
                <div className="rounded-xl border border-re-border bg-re-card p-4">
                  <p className="mb-2 flex items-center gap-1.5 text-xs font-bold text-re-accent">
                    <BookOpen className="h-3.5 w-3.5" /> 상세 부연 설명
                  </p>
                  <p className="whitespace-pre-line text-sm leading-[1.75] text-re-muted">{q.detail}</p>
                </div>
              )}

              {q.relatedLaw && (
                <div className="flex items-start gap-2 rounded-xl bg-re-accent/5 px-3 py-2 text-xs text-re-muted">
                  <Scale className="mt-0.5 h-4 w-4 shrink-0 text-re-accent" />
                  <span>관련 범위: {q.relatedLaw}</span>
                </div>
              )}

              <button type="button" onClick={next} className="btn-primary w-full">
                다음 문제
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
