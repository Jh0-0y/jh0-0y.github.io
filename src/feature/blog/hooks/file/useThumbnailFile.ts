import { useState, useCallback } from 'react';
import { useToast } from '@/shared/toast/useToast';

export interface UseThumbnailFileReturn {
  // 상태
  thumbnailFile: File | undefined;
  thumbnailPreviewUrl: string | null;
  removeThumbnail: boolean;
  
  // 액션
  setThumbnailFile: (file: File | undefined) => void;
  setRemoveThumbnail: (remove: boolean) => void;
  clearThumbnail: () => void;
}

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
const ALLOWED_TYPES = ['image/jpeg', 'image/png', 'image/webp', 'image/gif'];

export const useThumbnailFile = (): UseThumbnailFileReturn => {
  const toast = useToast();
  
  const [thumbnailFile, setThumbnailFileState] = useState<File | undefined>();
  const [thumbnailPreviewUrl, setThumbnailPreviewUrl] = useState<string | null>(null);
  const [removeThumbnail, setRemoveThumbnailState] = useState(false);

  // 썸네일 파일 설정
  const setThumbnailFile = useCallback(
    (file: File | undefined) => {
      if (!file) {
        setThumbnailFileState(undefined);
        setThumbnailPreviewUrl(null);
        return;
      }

      // 파일 타입 검증
      if (!ALLOWED_TYPES.includes(file.type)) {
        toast.error('이미지 파일만 업로드 가능합니다 (JPEG, PNG, WebP, GIF)');
        return;
      }

      // 파일 크기 검증
      if (file.size > MAX_FILE_SIZE) {
        toast.error('파일 크기는 5MB 이하만 가능합니다');
        return;
      }

      setThumbnailFileState(file);
      setRemoveThumbnailState(false);

      // 미리보기 URL 생성
      const reader = new FileReader();
      reader.onloadend = () => {
        setThumbnailPreviewUrl(reader.result as string);
      };
      reader.readAsDataURL(file);
    },
    [toast]
  );

  // 썸네일 제거 플래그 설정
  const setRemoveThumbnail = useCallback((remove: boolean) => {
    setRemoveThumbnailState(remove);
    if (remove) {
      setThumbnailFileState(undefined);
      setThumbnailPreviewUrl(null);
    }
  }, []);

  // 썸네일 초기화
  const clearThumbnail = useCallback(() => {
    setThumbnailFileState(undefined);
    setThumbnailPreviewUrl(null);
    setRemoveThumbnailState(false);
  }, []);

  return {
    thumbnailFile,
    thumbnailPreviewUrl,
    removeThumbnail,
    setThumbnailFile,
    setRemoveThumbnail,
    clearThumbnail
  };
};