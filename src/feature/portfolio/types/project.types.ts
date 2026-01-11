// ========================================
// Project 관련 타입 정의
// ========================================

export interface ProjectData {
  id: string;
  title: string;
  period: string;
  role: string;
  shortDescription: string;
  description: string;
  techStack: string[];
  highlights: string[];
  background?: string;
  challenges?: ChallengeItem[];
  results?: string[];
  learned?: string[];
  thumbnailUrl?: string;
  images?: string[];
  links: ProjectLinks;
  isTeamProject: boolean;
  teamSize?: number;
}

export interface ChallengeItem {
  problem: string;
  solution: string;
  result?: string;
}

export interface ProjectLinks {
  github?: string;
  demo?: string;
  notion?: string;
}
