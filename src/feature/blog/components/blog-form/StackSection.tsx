import { useState } from 'react';
import { STACK_GROUP_LABELS, STACK_GROUP_ORDER } from '@/api/stack/types';
import { VALIDATION_LIMITS } from '@/feature/blog/validations/post.validation';
import { StackManageModal } from './modal/StackManageModal';
import { useStacksForForm } from '@/feature/blog/hooks/stack';
import styles from './StackSection.module.css';

interface StackSectionProps {
  selectedStacks: string[];
  fieldError: string | null;
  onStackAdd: (stack: string) => void;
  onStackRemove: (stack: string) => void;
}

export const StackSection = ({
  selectedStacks,
  fieldError,
  onStackAdd,
  onStackRemove,
}: StackSectionProps) => {
  const [showStackModal, setShowStackModal] = useState(false);
  const { groupedStacks, isLoading } = useStacksForForm();

  const handleStackToggle = (stackName: string) => {
    if (selectedStacks.includes(stackName)) {
      onStackRemove(stackName);
    } else {
      onStackAdd(stackName);
    }
  };

  return (
    <>
      <div className={styles.field}>
        <div className={styles.labelRow}>
          <label className={styles.label}>
            스택 ({selectedStacks.length}/{VALIDATION_LIMITS.STACKS_MAX})
          </label>
          <button
            type="button"
            onClick={() => setShowStackModal(true)}
            className={styles.manageButton}
          >
            <svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            관리
          </button>
        </div>

        {fieldError && <span className={styles.fieldError}>{fieldError}</span>}

        {isLoading ? (
          <div className={styles.stacksLoading}>스택 로딩중...</div>
        ) : groupedStacks ? (
          <div className={styles.stackGroups}>
            {STACK_GROUP_ORDER.map((group) => {
              const stacks = groupedStacks[group];
              if (!stacks || stacks.length === 0) return null;

              return (
                <div key={group} className={styles.stackGroup}>
                  <span className={styles.stackGroupLabel}>{STACK_GROUP_LABELS[group]}</span>
                  <div className={styles.stackButtons}>
                    {stacks.map((stack) => (
                      <button
                        key={stack.id}
                        type="button"
                        onClick={() => handleStackToggle(stack.name)}
                        className={`${styles.stackButton} ${selectedStacks.includes(stack.name) ? styles.active : ''}`}
                      >
                        {stack.name}
                      </button>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        ) : null}

        {selectedStacks.length > 0 && (
          <div className={styles.selectedStacks}>
            {selectedStacks.map((stack) => (
              <span key={stack} className={styles.selectedStack}>
                {stack}
                <button type="button" onClick={() => onStackRemove(stack)} className={styles.stackRemove}>
                  ×
                </button>
              </span>
            ))}
          </div>
        )}
      </div>

      <StackManageModal
        isOpen={showStackModal}
        onClose={() => setShowStackModal(false)}
      />
    </>
  );
};