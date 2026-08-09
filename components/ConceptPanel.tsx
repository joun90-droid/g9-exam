"use client";

import { useState } from "react";
import { conceptsByRound } from "@/lib/concepts";
import type { ConceptTopic } from "@/lib/types";
import { BookMarked, ChevronDown, ChevronUp, Lightbulb, Target } from "lucide-react";

function TopicCard({ topic, index }: { topic: ConceptTopic; index: number }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="overflow-hidden rounded-xl border border-re-border bg-re-card">
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="flex w-full items-start gap-3 p-4 text-left transition hover:bg-re-accent/5"
      >
        <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-re-accent/15 text-xs font-bold text-re-accent">
          {index + 1}
        </span>
        <div className="min-w-0 flex-1">
          <p className="font-semibold text-re-text">{topic.title}</p>
          <p className="mt-1 text-sm leading-relaxed text-re-muted">{topic.summary}</p>
          {!open && (
            <p className="mt-2 text-xs font-medium text-re-accent">탭하여 상세·암기 포인트 보기 →</p>
          )}
        </div>
        {open ? (
          <ChevronUp className="mt-1 h-5 w-5 shrink-0 text-re-muted" />
        ) : (
          <ChevronDown className="mt-1 h-5 w-5 shrink-0 text-re-muted" />
        )}
      </button>

      {open && (
        <div className="space-y-3 border-t border-re-border px-4 pb-4 pt-3">
          <div className="prose-detail whitespace-pre-line">{topic.detail}</div>

          <div className="memory-box">
            <p className="mb-1 flex items-center gap-1.5 text-xs font-bold text-re-accent">
              <Lightbulb className="h-3.5 w-3.5" /> 암기 한 줄
            </p>
            <p className="font-medium text-re-text">{topic.memoryTip}</p>
          </div>

          <div className="exam-box">
            <p className="mb-2 flex items-center gap-1.5 text-xs font-bold text-re-gold">
              <Target className="h-3.5 w-3.5" /> 시험 출제 포인트
            </p>
            <ul className="list-inside list-disc space-y-1 text-sm text-re-muted">
              {topic.examPoints.map((p) => (
                <li key={p}>{p}</li>
              ))}
            </ul>
          </div>

          <div className="flex flex-wrap gap-1.5">
            {topic.keywords.map((kw) => (
              <span key={kw} className="rounded-md bg-re-accent/10 px-2 py-0.5 text-xs font-medium text-re-accent">
                #{kw}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export function ConceptPanel({ round }: { round: 1 | 2 }) {
  const sections = conceptsByRound(round);
  const [openId, setOpenId] = useState(sections[0]?.id ?? "");
  const totalTopics = sections.reduce((s, sec) => s + sec.topics.length, 0);

  return (
    <div className="space-y-4">
      <div className="glass p-4 sm:p-5">
        <div className="flex items-start gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-re-accent/15">
            <BookMarked className="h-5 w-5 text-re-accent" />
          </div>
          <div>
            <h2 className="text-lg font-bold">{round === 1 ? "행정학" : "행정법"} 개념 정리</h2>
            <p className="mt-1 text-sm text-re-muted">
              {round === 1
                ? "이론 · 조직·인사 · 정책·예산 — 9급 빈출"
                : "기초원칙 · 행정행위·절차 · 쟁송·배상 — 현행법 요지"}
            </p>
            <p className="mt-2 text-xs text-re-accent">{sections.length}과목 · {totalTopics}개 주제</p>
          </div>
        </div>
        <p className="mt-3 rounded-lg bg-re-card px-3 py-2 text-xs leading-relaxed text-re-muted">
          각 카드를 눌러 <strong className="text-re-text">상세 설명 · 암기 한 줄 · 출제 포인트</strong>를 확인하세요.
        </p>
      </div>

      {sections.map((sec) => {
        const open = openId === sec.id;
        return (
          <div key={sec.id} className="glass overflow-hidden">
            <button
              type="button"
              onClick={() => setOpenId(open ? "" : sec.id)}
              className="flex w-full items-center gap-3 p-4 text-left"
            >
              <span className="text-2xl">{sec.icon}</span>
              <div className="min-w-0 flex-1">
                <p className="font-semibold">{sec.title}</p>
                <p className="text-xs text-re-muted">{sec.subtitle}</p>
                <p className="mt-0.5 text-xs text-re-accent">{sec.topics.length}개 주제</p>
              </div>
              {open ? <ChevronUp className="h-5 w-5 text-re-muted" /> : <ChevronDown className="h-5 w-5 text-re-muted" />}
            </button>
            {open && (
              <div className="space-y-3 border-t border-re-border px-3 pb-4 pt-3 sm:px-4">
                {sec.topics.map((t, i) => (
                  <TopicCard key={t.title} topic={t} index={i} />
                ))}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
