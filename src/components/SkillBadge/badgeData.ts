// 뱃지 설정 타입
export interface BadgeConfig {
  label: string;        // 표시 이름
  color: string;        // 배경 색상
  textColor?: string;   // 텍스트 색상 (기본: white)
  iconSlug?: string;    // Simple Icons CDN (1순위)
  deviconSlug?: string; // Devicon CDN (2순위)
  iconPath?: string;    // 로컬 SVG 경로 (3순위)
}

// 뱃지 이름 목록 (자동완성/타입용)
export type SkillBadgeName = keyof typeof SKILL_BADGES;

// 뱃지 가져오기 헬퍼
export const getBadgeConfig = (name: string): BadgeConfig | null => {
  return SKILL_BADGES[name.toLowerCase()] || null;
};


// 모든 뱃지 정의
export const SKILL_BADGES: Record<string, BadgeConfig> = {
  // ========== Frontend ==========
  'react': {
    label: 'React',
    color: '#61DAFB',
    textColor: '#000000',
    iconSlug: 'react',
  },
  'typescript': {
    label: 'TypeScript',
    color: '#3178C6',
    iconSlug: 'typescript',
  },
  'javascript': {
    label: 'JavaScript',
    color: '#F7DF1E',
    textColor: '#000000',
    iconSlug: 'javascript',
  },
  'html': {
    label: 'HTML5',
    color: '#E34F26',
    iconSlug: 'html5',
  },
  'css': {
    label: 'CSS3',
    color: '#1572B6',
    iconSlug: 'css3',
  },
  'next': {
    label: 'Next.js',
    color: '#000000',
    iconSlug: 'nextdotjs',
  },
  'vue': {
    label: 'Vue.js',
    color: '#4FC08D',
    iconSlug: 'vuedotjs',
  },
  'tailwind': {
    label: 'Tailwind CSS',
    color: '#06B6D4',
    iconSlug: 'tailwindcss',
  },
  'sass': {
    label: 'Sass',
    color: '#CC6699',
    iconSlug: 'sass',
  },
  'zustand': {
    label: 'Zustand',
    color: '#433E38',
    deviconSlug: 'zustand',
  },
  'redux': {
    label: 'Redux',
    color: '#764ABC',
    iconSlug: 'redux',
  },
  'recoil': {
    label: 'Recoil',
    color: '#3578E5',
    deviconSlug: 'recoil',
  },
  'tanstack-table': {
    label: 'TanStack Table',
    color: '#FF4154',
    iconPath: '/icons/skills/tanstack.svg',
  },
  'chart-js': {
    label: 'Chart.js',
    color: '#FF6384',
    iconSlug: 'chartdotjs',
  },

  // ========== Backend ==========
  'java': {
    label: 'Java',
    color: '#007396',
    deviconSlug: 'java',
  },
  'spring': {
    label: 'Spring',
    color: '#6DB33F',
    iconSlug: 'spring',
  },
  'spring-boot': {
    label: 'Spring Boot',
    color: '#6DB33F',
    iconSlug: 'springboot',
  },
  'spring-security': {
    label: 'Spring Security',
    color: '#6DB33F',
    iconSlug: 'springsecurity',
  },
  'jpa': {
    label: 'JPA',
    color: '#59666C',
    iconPath: '/icons/skills/jpa.svg',
  },
  'hibernate': {
    label: 'Hibernate',
    color: '#59666C',
    iconSlug: 'hibernate',
  },
  'mybatis': {
    label: 'Mybatis',
    color: '#59666C',
    iconSlug: 'mybatis',
  },
  'node': {
    label: 'Node.js',
    color: '#339933',
    iconSlug: 'nodedotjs',
  },
  'express': {
    label: 'Express',
    color: '#000000',
    iconSlug: 'express',
  },
  'python': {
    label: 'Python',
    color: '#3776AB',
    iconSlug: 'python',
  },
  'django': {
    label: 'Django',
    color: '#092E20',
    iconSlug: 'django',
  },
  'fastapi': {
    label: 'FastAPI',
    color: '#009688',
    iconSlug: 'fastapi',
  },
  'go': {
    label: 'Go',
    color: '#00ADD8',
    iconSlug: 'go',
  },
  'kotlin': {
    label: 'Kotlin',
    color: '#7F52FF',
    iconSlug: 'kotlin',
  },

  // ========== Database ==========
  'mysql': {
    label: 'MySQL',
    color: '#4479A1',
    iconSlug: 'mysql',
  },
  'mariadb': {
    label: 'MariaDB',
    color: '#003545',
    iconSlug: 'mariadb',
  },
  'postgresql': {
    label: 'PostgreSQL',
    color: '#4169E1',
    iconSlug: 'postgresql',
  },
  'mongodb': {
    label: 'MongoDB',
    color: '#47A248',
    iconSlug: 'mongodb',
  },
  'redis': {
    label: 'Redis',
    color: '#DC382D',
    iconSlug: 'redis',
  },
  'oracle': {
    label: 'Oracle',
    color: '#F80000',
    iconSlug: 'oracle',
  },
  'sqlite': {
    label: 'SQLite',
    color: '#003B57',
    iconSlug: 'sqlite',
  },

  // ========== DevOps ==========
  'docker': {
    label: 'Docker',
    color: '#2496ED',
    iconSlug: 'docker',
  },
  'kubernetes': {
    label: 'Kubernetes',
    color: '#326CE5',
    iconSlug: 'kubernetes',
  },
  'aws': {
    label: 'AWS',
    color: '#232F3E',
    iconSlug: 'amazonwebservices',
  },
  'gcp': {
    label: 'GCP',
    color: '#4285F4',
    iconSlug: 'googlecloud',
  },
  'azure': {
    label: 'Azure',
    color: '#0078D4',
    iconSlug: 'microsoftazure',
  },
  'github-actions': {
    label: 'GitHub Actions',
    color: '#2088FF',
    iconSlug: 'githubactions',
  },
  'jenkins': {
    label: 'Jenkins',
    color: '#D24939',
    iconSlug: 'jenkins',
  },
  'nginx': {
    label: 'Nginx',
    color: '#009639',
    iconSlug: 'nginx',
  },
  'linux': {
    label: 'Linux',
    color: '#FCC624',
    textColor: '#000000',
    iconSlug: 'linux',
  },
  'render': {
    label: 'Render',
    color: '#46E3B7',
    textColor: '#000000',
    iconSlug: 'render',
  },
  'vercel': {
    label: 'Vercel',
    color: '#000000',
    iconSlug: 'vercel',
  },
  'netlify': {
    label: 'Netlify',
    color: '#00C7B7',
    iconSlug: 'netlify',
  },

  // ========== Tools ==========
  'git': {
    label: 'Git',
    color: '#F05032',
    iconSlug: 'git',
  },
  'github': {
    label: 'GitHub',
    color: '#181717',
    iconSlug: 'github',
  },
  'gitlab': {
    label: 'GitLab',
    color: '#FC6D26',
    iconSlug: 'gitlab',
  },
  'vscode': {
    label: 'VS Code',
    color: '#007ACC',
    iconSlug: 'visualstudiocode',
  },
  'intellij': {
    label: 'IntelliJ IDEA',
    color: '#000000',
    iconSlug: 'intellijidea',
  },
  'postman': {
    label: 'Postman',
    color: '#FF6C37',
    iconSlug: 'postman',
  },
  'figma': {
    label: 'Figma',
    color: '#F24E1E',
    iconSlug: 'figma',
  },
  'notion': {
    label: 'Notion',
    color: '#000000',
    iconSlug: 'notion',
  },
  'slack': {
    label: 'Slack',
    color: '#4A154B',
    iconSlug: 'slack',
  },
  'jira': {
    label: 'Jira',
    color: '#0052CC',
    iconSlug: 'jira',
  },

  // ========== Testing ==========
  'jest': {
    label: 'Jest',
    color: '#C21325',
    iconSlug: 'jest',
  },
  'junit': {
    label: 'JUnit',
    color: '#25A162',
    iconSlug: 'junit5',
  },
  'cypress': {
    label: 'Cypress',
    color: '#17202C',
    iconSlug: 'cypress',
  },

  // ========== etc ==========
  'websocket': {
    label: 'WebSocket',
    color: '#010101',
    iconPath: '/icons/skills/websocket.svg',
  },
  'graphql': {
    label: 'GraphQL',
    color: '#E10098',
    iconSlug: 'graphql',
  },
  'rest-api': {
    label: 'REST API',
    color: '#009688',
    iconPath: '/icons/skills/rest-api.svg',
  },
  'swagger': {
    label: 'Swagger',
    color: '#85EA2D',
    textColor: '#000000',
    iconSlug: 'swagger',
  },
};

