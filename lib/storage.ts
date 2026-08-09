import type { CustomDday, OxProgress } from "./types";

const KEY = "g9-exam";

function get<T>(k: string, fallback: T): T {
  if (typeof window === "undefined") return fallback;
  try {
    const raw = localStorage.getItem(`${KEY}:${k}`);
    return raw ? (JSON.parse(raw) as T) : fallback;
  } catch {
    return fallback;
  }
}

function set<T>(k: string, v: T) {
  localStorage.setItem(`${KEY}:${k}`, JSON.stringify(v));
}

export function loadCustomDdays(): CustomDday[] {
  return get<CustomDday[]>("ddays", []);
}

export function saveCustomDdays(list: CustomDday[]) {
  set("ddays", list);
}

export function clearExamScheduleOverride() {
  if (typeof window === "undefined") return;
  try {
    localStorage.removeItem(`${KEY}:schedule`);
  } catch {
    /* ignore */
  }
}

export function loadOxProgress(): OxProgress {
  return get<OxProgress>("ox-progress", {});
}

export function saveOxAnswer(questionId: string, chosen: boolean, correct: boolean) {
  const p = loadOxProgress();
  p[questionId] = { chosen, correct, at: new Date().toISOString() };
  set("ox-progress", p);
}

export function clearOxProgress() {
  set("ox-progress", {});
}
