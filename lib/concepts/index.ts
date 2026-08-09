import type { ConceptSection } from "../types";
import { ROUND1_CONCEPTS } from "./round1";
import { ROUND2_CONCEPTS } from "./round2";

export const CONCEPTS: ConceptSection[] = [...ROUND1_CONCEPTS, ...ROUND2_CONCEPTS];

export function conceptsByRound(round: 1 | 2): ConceptSection[] {
  return CONCEPTS.filter((c) => c.round === round);
}
