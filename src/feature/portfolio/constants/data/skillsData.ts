// ========================================
// 🎯 Skills 데이터
// ========================================

import type { SkillGroup } from '../../types';

export const skillsData: SkillGroup[] = [
  {
    category: 'language',
    label: 'Language',
    items: ['java', 'javascript', 'typescript', 'html', 'css'],
  },
  {
    category: 'frontend',
    label: 'Frontend',
    items: [
      'react',
      'react-query',
      'zustand',
    ],
  },
  {
    category: 'backend',
    label: 'Backend',
    items: [
      'spring',
      'spring-boot',
      'jpa',
      'mybatis',
    ],
  },
  {
    category: 'database',
    label: 'Database',
    items: [
      'mariadb', 
      'postgresql', 
      'redis',
    ],
  },
  {
    category: 'devops',
    label: 'DevOps / Infra',
    items: ['docker', 'github-actions', 'render', 'aws', 'nginx'],
  },
  {
    category: 'tools',
    label: 'Tools & Collaboration',
    items: ['git', 'github', 'intellij', 'vscode', 'postman', 'figma', 'notion'],
  },
];