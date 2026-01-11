// ========================================
// Archiving 관련 타입 정의
// ========================================

export type ArchivingType = 'github' | 'blog' | 'linkedin' | 'notion' | 'email';

export interface ArchivingItem {
  type: ArchivingType;
  title: string;
  url: string;
  description: string;
  highlights?: string[]; // 주요 내용 (선택)
}
