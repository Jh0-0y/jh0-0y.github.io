import { useState, useCallback } from 'react';
import { useToast } from '@/shared/toast/useToast';
import { fileApi } from '@/api/file/services/file.api';
import type { FileUploadResponse } from '@/api/file/types';

export interface UseContentFilesReturn {
  // 상태
  uploadedFiles: FileUploadResponse[];
  isUploading: boolean;
  uploadError: string | null;
  
  // 액션
  uploadFile: (file: File) => Promise<FileUploadResponse | null>;
  removeFile: (fileId: number) => void;
  clearFiles: () => void;
  
  // 유틸
  getFileUrl: (fileId: number) => string | null;
}

const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB
const ALLOWED_TYPES = [
  'image/jpeg',
  'image/png',
  'image/webp',
  'image/gif',
  'video/mp4',
  'video/webm',
  'application/pdf',
];

export const useContentFiles = (): UseContentFilesReturn => {
  const toast = useToast();
  
  const [uploadedFiles, setUploadedFiles] = useState<FileUploadResponse[]>([]);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);

  // 파일 업로드
  const uploadFile = useCallback(
    async (file: File): Promise<FileUploadResponse | null> => {
      // 파일 타입 검증
      if (!ALLOWED_TYPES.includes(file.type)) {
        const errorMsg = '지원하지 않는 파일 형식입니다';
        toast.error(errorMsg);
        setUploadError(errorMsg);
        return null;
      }

      // 파일 크기 검증
      if (file.size > MAX_FILE_SIZE) {
        const errorMsg = '파일 크기는 10MB 이하만 가능합니다';
        toast.error(errorMsg);
        setUploadError(errorMsg);
        return null;
      }

      setIsUploading(true);
      setUploadError(null);

      try {
        const response = await fileApi.uploadFile(file);
        
        if (response.success) {
          const uploadedFile = response.data;
          setUploadedFiles((prev) => [...prev, uploadedFile]);
          toast.success('파일이 업로드되었습니다');
          return uploadedFile;
        }
        
        return null;
      } catch (err) {
        const errorMsg = err instanceof Error ? err.message : '파일 업로드에 실패했습니다';
        setUploadError(errorMsg);
        toast.error(errorMsg);
        return null;
      } finally {
        setIsUploading(false);
      }
    },
    [toast]
  );

  // 파일 제거
  const removeFile = useCallback((fileId: number) => {
    setUploadedFiles((prev) => prev.filter((file) => file.id !== fileId));
  }, []);

  // 모든 파일 초기화
  const clearFiles = useCallback(() => {
    setUploadedFiles([]);
    setUploadError(null);
  }, []);

  // 파일 URL 조회
  const getFileUrl = useCallback(
    (fileId: number): string | null => {
      const file = uploadedFiles.find((f) => f.id === fileId);
      return file ? file.url : null;
    },
    [uploadedFiles]
  );

  return {
    uploadedFiles,
    isUploading,
    uploadError,
    uploadFile,
    removeFile,
    clearFiles,
    getFileUrl,
  };
};