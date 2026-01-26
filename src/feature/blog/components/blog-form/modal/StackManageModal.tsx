import { useState } from 'react';
import { STACK_GROUP_LABELS, STACK_GROUP_ORDER, type StackGroup, type StackResponse } from '@/api/stack/types';
import { useStackManage } from '@/feature/blog/hooks/stack';
import { useToast } from '@/shared/toast/useToast';
import styles from './StackManageModal.module.css';

interface StackManageModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const StackManageModal = ({ isOpen, onClose }: StackManageModalProps) => {
  const toast = useToast();
  const {
    groupedStacks,
    createStack,
    deleteStack,
    isCreating,
    isDeleting,
    deletingId,
  } = useStackManage();

  const [newStackName, setNewStackName] = useState('');
  const [newStackGroup, setNewStackGroup] = useState<StackGroup>('LANGUAGE');

  if (!isOpen) return null;

  const handleAddStack = async () => {
    const trimmed = newStackName.trim();
    if (!trimmed) {
      toast.error('스택 이름을 입력해주세요');
      return;
    }

    try {
      await createStack(trimmed, newStackGroup);
      toast.success(`${trimmed} 스택이 추가되었습니다`);
      setNewStackName('');
    } catch {
      toast.error('스택 추가에 실패했습니다');
    }
  };

  const handleDeleteStack = async (stack: StackResponse) => {
    if (!confirm(`"${stack.name}" 스택을 삭제하시겠습니까?`)) return;

    try {
      await deleteStack(stack.id);
      toast.success(`${stack.name} 스택이 삭제되었습니다`);
    } catch {
      toast.error('스택 삭제에 실패했습니다');
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleAddStack();
    }
  };

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <div className={styles.header}>
          <h2 className={styles.title}>스택 관리</h2>
          <button type="button" onClick={onClose} className={styles.closeButton}>
            <svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className={styles.addSection}>
          <h3 className={styles.sectionTitle}>새 스택 추가</h3>
          <div className={styles.addForm}>
            <select
              value={newStackGroup}
              onChange={(e) => setNewStackGroup(e.target.value as StackGroup)}
              className={styles.groupSelect}
            >
              {STACK_GROUP_ORDER.map((group) => (
                <option key={group} value={group}>
                  {STACK_GROUP_LABELS[group]}
                </option>
              ))}
            </select>
            <input
              type="text"
              value={newStackName}
              onChange={(e) => setNewStackName(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="스택 이름"
              className={styles.nameInput}
            />
            <button
              type="button"
              onClick={handleAddStack}
              disabled={isCreating || !newStackName.trim()}
              className={styles.addButton}
            >
              {isCreating ? '추가 중...' : '추가'}
            </button>
          </div>
        </div>

        <div className={styles.listSection}>
          <h3 className={styles.sectionTitle}>등록된 스택</h3>
          <div className={styles.stackList}>
            {groupedStacks &&
              STACK_GROUP_ORDER.map((group) => {
                const stacks = groupedStacks[group];
                if (!stacks || stacks.length === 0) return null;

                return (
                  <div key={group} className={styles.stackGroup}>
                    <div className={styles.groupLabel}>{STACK_GROUP_LABELS[group]}</div>
                    <div className={styles.stackItems}>
                      {stacks.map((stack) => (
                        <div key={stack.id} className={styles.stackItem}>
                          <span className={styles.stackName}>{stack.name}</span>
                          <button
                            type="button"
                            onClick={() => handleDeleteStack(stack)}
                            disabled={isDeleting && deletingId === stack.id}
                            className={styles.deleteButton}
                          >
                            {isDeleting && deletingId === stack.id ? (
                              '...'
                            ) : (
                              <svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
                              </svg>
                            )}
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })}
          </div>
        </div>
      </div>
    </div>
  );
};