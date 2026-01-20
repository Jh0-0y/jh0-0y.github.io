import { useState } from 'react';
import { CODE_LANGUAGES } from '../constants/codeLanguages';
import styles from './CodeBlockLanguageSelector.module.css';

interface CodeBlockLanguageSelectorProps {
  onSelect: (language: string) => void;
  onClose: () => void;
}

const CodeBlockLanguageSelector = ({
  onSelect,
  onClose,
}: CodeBlockLanguageSelectorProps) => {
  const [search, setSearch] = useState('');

  const filteredLanguages = CODE_LANGUAGES.filter((lang) =>
    lang.label.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <h3 className={styles.title}>언어 선택</h3>
        <input
          type="text"
          placeholder="언어 검색..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className={styles.searchInput}
          autoFocus
        />
        <div className={styles.languageList}>
          {filteredLanguages.map((lang) => (
            <button
              key={lang.value}
              onClick={() => onSelect(lang.value)}
              className={styles.languageButton}
            >
              {lang.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CodeBlockLanguageSelector;