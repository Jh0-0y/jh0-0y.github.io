// ========================================
// 🎯 Achievements 데이터 (프로젝트 상세용)
// ========================================

import type { AchievementData } from '../../types';

export const achievementsData: AchievementData[] = [
  // ========================================
  // 성능 개선 (Performance)
  // ========================================
  {
    id: 'ach-1',
    category: 'performance',
    title: '실시간 동기화 성능 최적화',
    description:
      '전체 코드 전송 방식에서 Delta 기반 전송으로 아키텍처를 리팩토링했습니다. 클라이언트에서 변경 사항만 추출하여 서버로 전송하고, 서버는 이를 다른 클라이언트에게 효율적으로 브로드캐스트합니다.',
    metrics: '네트워크 트래픽 85% 감소 | 응답 시간 200ms → 50ms',
    projectRef: 'realtime-coding-platform',
  },
  {
    id: 'ach-2',
    category: 'performance',
    title: '검색 API 호출 최적화',
    description:
      '관리자 대시보드의 검색 기능에 Debounce를 적용하여 불필요한 API 호출을 줄이고, React Query의 캐싱을 활용하여 반복 요청을 최소화했습니다.',
    metrics: 'API 호출 70% 감소 | 서버 부하 절감',
    projectRef: 'admin-dashboard',
  },
  {
    id: 'ach-3',
    category: 'performance',
    title: 'Lighthouse 성능 점수 95+ 달성',
    description:
      '포트폴리오 사이트의 이미지 최적화, 코드 스플리팅, CSS 최적화를 통해 웹 성능을 개선했습니다. Core Web Vitals 지표를 모두 양호 수준으로 달성했습니다.',
    metrics: 'Performance 95+ | Accessibility 100 | Best Practices 95+',
    projectRef: 'portfolio-blog',
  },

  // ========================================
  // 아키텍처 설계 (Architecture)
  // ========================================
  {
    id: 'ach-4',
    category: 'performance',
    title: '분산 환경 실시간 동기화 아키텍처',
    description:
      'Redis Pub/Sub을 활용하여 다중 서버 환경에서도 WebSocket 메시지가 모든 클라이언트에게 전달되는 아키텍처를 설계했습니다. 서버 수평 확장 시에도 실시간 동기화가 유지됩니다.',
    metrics: '수평 확장 가능한 아키텍처 | 동시 접속 100명 안정 동작',
    projectRef: 'realtime-coding-platform',
  },
  {
    id: 'ach-5',
    category: 'performance',
    title: '역할 기반 권한 시스템 설계',
    description:
      '강사/학생 역할에 따른 편집 권한 시스템과 Lock 메커니즘을 설계했습니다. 동시 편집 충돌을 방지하고, 명시적인 편집권 위임으로 협업 환경을 안정화했습니다.',
    metrics: '동시 편집 충돌 0건 | 편집권 위임 기능 구현',
    projectRef: 'realtime-coding-platform',
  },

  // ========================================
  // 개발 생산성 (Collaboration)
  // ========================================
  {
    id: 'ach-6',
    category: 'collaboration',
    title: '재사용 가능한 컴포넌트 라이브러리 구축',
    description:
      '관리자 대시보드에서 반복되는 테이블, 필터, 페이지네이션 패턴을 공통 컴포넌트로 추상화했습니다. 새로운 관리 페이지 추가 시 컴포넌트를 조합하여 빠르게 개발할 수 있습니다.',
    metrics: '새 페이지 개발 시간 50% 단축 | 코드 중복 제거',
    projectRef: 'admin-dashboard',
  },
  {
    id: 'ach-7',
    category: 'collaboration',
    title: 'CI/CD 파이프라인 자동화',
    description:
      'GitHub Actions를 활용하여 push 시 자동으로 빌드, 테스트, 배포가 실행되는 파이프라인을 구축했습니다. Frontend는 GitHub Pages, Backend는 Render로 자동 배포됩니다.',
    metrics: '배포 시간 수동 30분 → 자동 5분 | 휴먼 에러 방지',
    projectRef: 'portfolio-blog',
  },
  {
    id: 'ach-8',
    category: 'collaboration',
    title: '타입 안전한 API 통신 구조 확립',
    description:
      'TypeScript 인터페이스로 API 요청/응답 타입을 정의하고, Axios 인터셉터와 React Query를 조합하여 타입 안전한 API 통신 구조를 확립했습니다.',
    metrics: '런타임 타입 에러 대폭 감소 | 컴파일 타임 오류 검출',
    projectRef: 'admin-dashboard',
  },

  // ========================================
  // 기술 성장 (Growth)
  // ========================================
  {
    id: 'ach-9',
    category: 'growth',
    title: 'WebSocket & STOMP 프로토콜 학습 및 적용',
    description:
      '실시간 기능 요구사항을 충족하기 위해 WebSocket과 STOMP 프로토콜을 학습하고, Spring Boot 기반 WebSocket 서버를 설계/구현했습니다. 연결 관리, 세션 핸들링, 에러 처리까지 전체 라이프사이클을 다룹니다.',
    projectRef: 'realtime-coding-platform',
  },
  {
    id: 'ach-10',
    category: 'growth',
    title: 'Redis Pub/Sub 분산 시스템 경험',
    description:
      'Redis를 단순 캐시가 아닌 메시지 브로커로 활용하여 분산 환경에서의 실시간 동기화 문제를 해결했습니다. Pub/Sub 패턴과 채널 관리에 대한 실무 경험을 쌓았습니다.',
    projectRef: 'realtime-coding-platform',
  },
  {
    id: 'ach-11',
    category: 'growth',
    title: 'React + TypeScript 풀스택 개발 역량',
    description:
      'Spring Boot 백엔드와 React/TypeScript 프론트엔드를 모두 개발하며 풀스택 개발 역량을 키웠습니다. API 설계부터 UI 구현까지 전체 흐름을 이해하고 개발할 수 있습니다.',
    projectRef: 'portfolio-blog',
  },
  {
    id: 'ach-12',
    category: 'growth',
    title: 'DevOps 기초 역량 확보',
    description:
      'GitHub Actions, Docker, Render를 활용한 CI/CD 파이프라인 구축 경험을 통해 DevOps의 기본 개념과 실무 적용 방법을 익혔습니다.',
    projectRef: 'portfolio-blog',
  },
];