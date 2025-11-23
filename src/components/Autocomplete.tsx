import { useState, useRef, useEffect } from 'react';
import type { KeyboardEvent } from 'react';

export interface AutocompleteOption<T = string> {
  value: T;
  label: string;
}

export interface AutocompleteProps<T = string> {
  options: AutocompleteOption<T>[];
  placeholder?: string;
  onSelect?: (option: AutocompleteOption<T> | null) => void;
  disabled?: boolean;
  className?: string;
  getOptionKey?: (option: AutocompleteOption<T>) => string | number;
}

export const Autocomplete = <T = string,>({
  options,
  placeholder = 'Search...',
  onSelect,
  disabled = false,
  className = '',
  getOptionKey,
}: AutocompleteProps<T>) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [highlightedIndex, setHighlightedIndex] = useState(-1);
  const [selectedOption, setSelectedOption] = useState<AutocompleteOption<T> | null>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Generate unique key for each option
  const getKey = (option: AutocompleteOption<T>): string | number => {
    if (getOptionKey) {
      return getOptionKey(option);
    }
    // Default: try to use value if it's string or number, otherwise use label
    if (typeof option.value === 'string' || typeof option.value === 'number') {
      return option.value;
    }
    return option.label;
  };

  // Filtrar opciones basadas en el término de búsqueda
  const filteredOptions = options.filter((option) =>
    option.label.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Cerrar dropdown al hacer clic fuera
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Resetear índice resaltado cuando cambian las opciones filtradas
  useEffect(() => {
    setHighlightedIndex(-1);
  }, [searchTerm]);

  const handleInputChange = (value: string) => {
    setSearchTerm(value);
    setIsOpen(true);
    if (!value) {
      setSelectedOption(null);
      onSelect?.(null);
    }
  };

  const handleOptionSelect = (option: AutocompleteOption<T>) => {
    setSelectedOption(option);
    setSearchTerm(option.label);
    setIsOpen(false);
    onSelect?.(option);
    inputRef.current?.blur();
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (!isOpen && (e.key === 'ArrowDown' || e.key === 'ArrowUp')) {
      setIsOpen(true);
      return;
    }

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        setHighlightedIndex((prev) =>
          prev < filteredOptions.length - 1 ? prev + 1 : prev
        );
        break;
      case 'ArrowUp':
        e.preventDefault();
        setHighlightedIndex((prev) => (prev > 0 ? prev - 1 : -1));
        break;
      case 'Enter':
        e.preventDefault();
        if (highlightedIndex >= 0 && filteredOptions[highlightedIndex]) {
          handleOptionSelect(filteredOptions[highlightedIndex]);
        }
        break;
      case 'Escape':
        setIsOpen(false);
        inputRef.current?.blur();
        break;
      default:
        break;
    }
  };

  const handleInputFocus = () => {
    if (!disabled) {
      setIsOpen(true);
    }
  };

  const handleClear = () => {
    setSearchTerm('');
    setSelectedOption(null);
    setIsOpen(false);
    onSelect?.(null);
    inputRef.current?.focus();
  };

  return (
    <div className={`autocomplete-wrapper ${className}`} ref={wrapperRef}>
      <div className="autocomplete-input-wrapper">
        <input
          ref={inputRef}
          type="text"
          className="autocomplete-input"
          placeholder={placeholder}
          value={searchTerm}
          onChange={(e) => handleInputChange(e.target.value)}
          onFocus={handleInputFocus}
          onKeyDown={handleKeyDown}
          disabled={disabled}
          autoComplete="off"
        />
        {searchTerm && (
          <button
            type="button"
            className="autocomplete-clear"
            onClick={handleClear}
            aria-label="Clear"
          >
            ✕
          </button>
        )}
        <span className={`autocomplete-arrow ${isOpen ? 'open' : ''}`}>▼</span>
      </div>

      {isOpen && !disabled && (
        <ul className="autocomplete-dropdown">
          {filteredOptions.length > 0 ? (
            filteredOptions.map((option, index) => (
              <li
                key={getKey(option)}
                className={`autocomplete-option ${
                  index === highlightedIndex ? 'highlighted' : ''
                } ${selectedOption?.value === option.value ? 'selected' : ''}`}
                onClick={() => handleOptionSelect(option)}
                onMouseEnter={() => setHighlightedIndex(index)}
              >
                {option.label}
              </li>
            ))
          ) : (
            <li className="autocomplete-no-options">No results found</li>
          )}
        </ul>
      )}
    </div>
  );
};
