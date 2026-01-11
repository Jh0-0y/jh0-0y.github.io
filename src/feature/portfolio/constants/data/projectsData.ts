// ========================================
// 🎯 Projects 데이터
// ========================================

import type { ProjectData } from '../../types';

export const projectsData: ProjectData[] = [

  // ------------------------------------
  // 1. 개인 포트폴리오 & 블로그
  // ------------------------------------
  {
    id: 'portfolio-blog',
    title: '개인 포트폴리오 & 블로그',
    period: '2025.12 - 현재',
    role: '풀스택 개발 (1인 프로젝트)',
    shortDescription: '포트폴리오와 기술 블로그를 통합한 개인 웹사이트',
    description:
      '포트폴리오와 기술 블로그를 통합한 개인 웹사이트입니다. 마크다운 기반 글 작성, 다크모드, 카테고리/태그 필터링 기능을 제공합니다.',
    techStack: ['java', 'spring-boot', 'jpa', 'mariadb', 'render','react', 'typescript', 'zustand','github-actions',],
    highlights: [
      'GitHub Pages + Render를 활용한 무료 배포 환경 구축',
      'CI/CD 파이프라인 구성으로 push 시 자동 배포',
      'CSS 변수 기반 다크모드 구현 및 FOUC 문제 해결',
    ],
    background: 
      `취업 준비를 위한 포트폴리오와 학습 내용을 정리할 블로그가 필요했습니다.
      기존 플랫폼 대신 직접 구축하여 풀스택 개발 역량을 보여주고자 했습니다.`,
    challenges: [
      {
        problem: '다크모드 전환 시 화면 깜박임(FOUC) 발생',
        solution: 'HTML head에 인라인 스크립트로 테마 사전 적용',
        result: '깜박임 없는 부드러운 테마 전환',
      },
      {
        problem: '무료로 풀스택 서비스 배포 필요',
        solution: 'Frontend는 GitHub Pages, Backend는 Render 활용',
        result: '월 비용 0원으로 서비스 운영',
      },
    ],
    results: [
      '완전 자동화된 CI/CD 파이프라인 구축',
      'Lighthouse 성능 점수 95+ 달성',
    ],
    learned: [
      '처음부터 끝까지 혼자 설계/구현하는 경험',
      'CI/CD 파이프라인 구축 능력',
      'SEO 및 웹 성능 최적화 기법',
    ],
    links: {
      github: 'https://github.com/your-username/portfolio',
      demo: 'https://your-username.github.io/portfolio',
    },
    isTeamProject: false,
  },
  // ------------------------------------
  // 2. 실시간 코딩 교육 플랫폼
  // ------------------------------------
  {
    id: 'realtime-coding-platform',
    title: '실시간 코딩 교육 플랫폼',
    period: '2024.09 - 2024.12',
    role: '백엔드 개발 (팀원 4명 중 백엔드 2명)',
    shortDescription:
      '강사와 학생이 실시간으로 코드를 공유하고 편집할 수 있는 교육 플랫폼',
    description:
      '강사와 학생이 실시간으로 코드를 공유하고 편집할 수 있는 교육 플랫폼입니다. WebSocket을 활용한 실시간 동기화와 역할 기반 권한 시스템을 구현했습니다.',
    techStack: ['spring-boot', 'websocket', 'redis', 'react', 'zustand', 'mariadb'],
    highlights: [
      '전체 코드 전송 → Delta 기반 전송으로 변경하여 네트워크 트래픽 85% 감소',
      'Redis Pub/Sub을 활용한 다중 서버 환경 실시간 동기화 구현',
      '강사/학생 역할별 편집 권한 시스템 및 Lock 메커니즘 설계',
    ],
    background: `코딩 교육 현장에서 강사가 작성하는 코드를 학생들이 실시간으로 확인하고, 
필요시 학생도 코드를 수정할 수 있는 양방향 협업 환경이 필요했습니다.
기존의 화면 공유 방식은 지연이 크고, 학생이 직접 코드를 수정해볼 수 없는 한계가 있었습니다.`,
    challenges: [
      {
        problem: '전체 코드를 매번 전송하면 네트워크 부하가 심함',
        solution: 'Diff 알고리즘을 적용하여 변경된 부분만 Delta로 전송',
        result: '네트워크 트래픽 85% 감소, 응답 시간 200ms → 50ms',
      },
      {
        problem: '다중 서버 환경에서 실시간 동기화 불가',
        solution: 'Redis Pub/Sub을 활용하여 서버 간 메시지 브로드캐스트',
        result: '수평 확장 가능한 아키텍처 구현',
      },
      {
        problem: '동시 편집 시 충돌 발생',
        solution: 'Lock 메커니즘과 역할 기반 권한 시스템 설계',
        result: '강사 우선권 보장, 학생 요청 시 편집권 위임 가능',
      },
    ],
    results: [
      '동시 접속 100명 환경에서 안정적 동작 확인',
      '평균 응답 시간 50ms 이하 달성',
      '사용자 만족도 조사 4.5/5.0',
    ],
    learned: [
      'WebSocket과 Redis를 활용한 실시간 시스템 설계 경험',
      '분산 환경에서의 동기화 문제 해결 능력',
      '팀 협업에서 API 명세 우선 설계의 중요성',
    ],
    links: {
      github: 'https://github.com/your-username/realtime-coding',
      notion: 'https://notion.so/project-docs',
    },
    isTeamProject: true,
    teamSize: 4,
  },
  // ------------------------------------
  // 3. 관리자 대시보드 시스템
  // ------------------------------------
  {
    id: 'admin-dashboard',
    title: '관리자 대시보드 시스템',
    period: '2024.06 - 2024.08',
    role: '프론트엔드 개발 (팀원 3명)',
    shortDescription: '사용자 관리, 통계, 권한 설정이 가능한 관리자 대시보드',
    description:
      '사용자 관리, 통계, 권한 설정이 가능한 관리자 대시보드입니다. 대용량 데이터 테이블과 복잡한 필터링 기능을 구현했습니다.',
    techStack: ['react', 'typescript', 'tanstack-table', 'chart-js', 'zustand'],
    highlights: [
      '가상 스크롤링 적용으로 10,000건 이상 데이터도 부드럽게 렌더링',
      '재사용 가능한 테이블 컴포넌트 설계 (정렬, 필터, 페이지네이션)',
      'Debounce 적용으로 검색 API 호출 70% 감소',
    ],
    background: `기존 관리자 페이지가 대용량 데이터 처리 시 성능 문제가 있었고,
다양한 필터링 요구사항을 유연하게 처리할 수 있는 새로운 대시보드가 필요했습니다.`,
    challenges: [
      {
        problem: '10,000건 이상 데이터 로딩 시 브라우저 멈춤',
        solution: '가상 스크롤링(react-virtual) 적용',
        result: '초기 로딩 3초 → 0.5초, 스크롤 끊김 없음',
      },
      {
        problem: '검색 시 타이핑마다 API 호출',
        solution: 'Debounce 300ms 적용',
        result: 'API 호출 70% 감소, 서버 부하 절감',
      },
    ],
    results: [
      '대용량 데이터에서도 60fps 유지',
      '재사용 가능한 테이블 컴포넌트로 개발 생산성 향상',
    ],
    learned: [
      '대용량 데이터 렌더링 최적화 기법',
      '재사용 가능한 컴포넌트 설계 패턴',
    ],
    links: {
      github: 'https://github.com/your-username/admin-dashboard',
    },
    isTeamProject: true,
    teamSize: 3,
  },
];
