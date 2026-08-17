export type AssetKey =
  | "money"
  | "knowledge"
  | "audience"
  | "business"
  | "connections"
  | "operations"
  | "idea";

export interface AssetDef {
  icon: string;
  label: string;
}

export interface Opportunity {
  id: number;
  emoji: string;
  author: string;
  handle: string;
  g: string; // gradient
  city: string;
  domain: string;
  model: string;
  oppType: string;
  seeking: string;
  title: string;
  desc: string;
  has: AssetKey[];
  needs: AssetKey[];
  score: number;
  likes: number;
  saved: boolean;
  liked: boolean;
  time: string;
  verified: boolean;
  verifiedMethod: string;
  viewing: number;
  interested: number;
  chatting: boolean;
  chatWith: string;
  reasons: string[];
}

export interface Activity {
  id: number;
  icon: string;
  text: string;
  color: string;
  time: string;
}

export interface ChatMessage {
  id: number;
  from: "me" | "them";
  text: string;
  t: string;
}

export interface UserTypeDef {
  id: string;
  icon: string;
  label: string;
  desc: string;
}

export interface OnboardingData {
  name: string;
  userType: string;
  hasAssets: AssetKey[];
  seekingTypes: string[];
}

export interface Profile {
  name: string;
  userType: string;
  city: string;
  bio: string;
  verified: boolean;
  verifiedMethod: string;
  hasAssets: AssetKey[];
  seekingTypes: string[];
  domains: string[];
  goalTitle: string;
  journeyPct: number;
  journeyDone: string[];
  journeyLeft: string[];
}

export interface GoalDef {
  id: string;
  icon: string;
  label: string;
}

export interface GoalAnswers {
  budget: string;
  stage: string;
  missing: string;
  timeline: string;
  area: string;
}

export interface Blueprint {
  title: string;
  summary: string;
  needs: { icon: string; label: string; desc: string }[];
  timeline: string;
  first_step: string;
}

export interface SuccessStory {
  id: number;
  emoji: string;
  a: string;
  domain: string;
  result: string;
  days: number;
  value: string;
  city: string;
}

export interface OpportunityAnalysis {
  summary: string;
  pros: string[];
  risks: string[];
  opener: string;
}
