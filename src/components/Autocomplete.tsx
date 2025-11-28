import { useState, useRef, useEffect, CSSProperties, ReactNode } from 'react';
import type { KeyboardEvent, ChangeEvent } from 'react';
import './Autocomplete.css';

export interface AutocompleteOption<T = string> {
  value: T;
  label: string;
}

export interface AutocompleteStyles {
  wrapper?: CSSProperties;
  inputWrapper?: CSSProperties;
  input?: CSSProperties;
  inputFocus?: CSSProperties;
  inputDisabled?: CSSProperties;
  clearButton?: CSSProperties;
  clearButtonHover?: CSSProperties;
  arrow?: CSSProperties;
  arrowOpen?: CSSProperties;
  dropdown?: CSSProperties;
  option?: CSSProperties;
  optionHighlighted?: CSSProperties;
  optionSelected?: CSSProperties;
  optionHighlightedSelected?: CSSProperties;
  noOptions?: CSSProperties;
}

export interface AutocompleteInputProps {
  ref: React.RefObject<HTMLInputElement>;
  type: string;
  style: CSSProperties;
  placeholder: string;
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  onFocus: () => void;
  onBlur: () => void;
  onKeyDown: (e: KeyboardEvent<HTMLInputElement>) => void;
  disabled: boolean;
  autoComplete: string;
}

export interface AutocompleteProps<T = string> {
  options: AutocompleteOption<T>[];
  placeholder?: string;
  onSelect?: (option: AutocompleteOption<T> | null) => void;
  disabled?: boolean;
  getOptionKey?: (option: AutocompleteOption<T>) => string | number;
  customStyles?: AutocompleteStyles;
  noResultsText?: string;
  value?: AutocompleteOption<T> | null;
  renderInput?: (props: AutocompleteInputProps) => ReactNode;
}



export const Autocomplete = <T = string,>({
  options,
  placeholder = 'Search...',
  onSelect,
  disabled = false,
  getOptionKey,
  customStyles = {},
  noResultsText = 'No results found',
  value,
  renderInput,
}: AutocompleteProps<T>) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [highlightedIndex, setHighlightedIndex] = useState(-1);
  const [selectedOption, setSelectedOption] = useState<AutocompleteOption<T> | null>(null);

  // Use controlled value if provided
  const currentValue = value !== undefined ? value : selectedOption;
  const currentSearchTerm = currentValue?.label || searchTerm;
  const [isFocused, setIsFocused] = useState(false);
  const [isClearHovered, setIsClearHovered] = useState(false);
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
      setIsFocused(true);
    }
  };

  const handleInputBlur = () => {
    setIsFocused(false);
  };

  const handleClear = () => {
    setSearchTerm('');
    setSelectedOption(null);
    setIsOpen(false);
    onSelect?.(null);
    inputRef.current?.focus();
  };

  // Merge default styles with custom styles
  const mergedStyles = {
    wrapper: { ...styles.wrapper, ...customStyles.wrapper },
    inputWrapper: { ...styles.inputWrapper, ...customStyles.inputWrapper },
    input: { ...styles.input, ...customStyles.input },
    inputFocus: { ...styles.inputFocus, ...customStyles.inputFocus },
    inputDisabled: { ...styles.inputDisabled, ...customStyles.inputDisabled },
    clearButton: { ...styles.clearButton, ...customStyles.clearButton },
    clearButtonHover: { ...styles.clearButtonHover, ...customStyles.clearButtonHover },
    arrow: { ...styles.arrow, ...customStyles.arrow },
    arrowOpen: { ...styles.arrowOpen, ...customStyles.arrowOpen },
    dropdown: { ...styles.dropdown, ...customStyles.dropdown },
    option: { ...styles.option, ...customStyles.option },
    optionHighlighted: { ...styles.optionHighlighted, ...customStyles.optionHighlighted },
    optionSelected: { ...styles.optionSelected, ...customStyles.optionSelected },
    optionHighlightedSelected: { ...styles.optionHighlightedSelected, ...customStyles.optionHighlightedSelected },
    noOptions: { ...styles.noOptions, ...customStyles.noOptions },
  };

  const getInputStyle = () => {
    const baseStyle = { ...mergedStyles.input };
    if (isFocused) {
      Object.assign(baseStyle, mergedStyles.inputFocus);
    }
    if (disabled) {
      Object.assign(baseStyle, mergedStyles.inputDisabled);
    }
    return baseStyle;
  };

  const getOptionStyle = (index: number, option: AutocompleteOption<T>) => {
    const baseStyle = { ...mergedStyles.option };
    const isHighlighted = index === highlightedIndex;
    const isSelected = currentValue?.value === option.value;
    const isLastItem = index === filteredOptions.length - 1;
    
    if (isHighlighted && isSelected) {
      Object.assign(baseStyle, mergedStyles.optionHighlightedSelected);
    } else if (isSelected) {
      Object.assign(baseStyle, mergedStyles.optionSelected);
    } else if (isHighlighted) {
      Object.assign(baseStyle, mergedStyles.optionHighlighted);
    }
    
    // Remove borderBottom for last item
    if (isLastItem) {
      baseStyle.borderBottom = 'none';
    }
    
    return baseStyle;
  };

  return (
    <div style={mergedStyles.wrapper} ref={wrapperRef}>
      <div style={mergedStyles.inputWrapper}>
        {renderInput ? (
          renderInput({
            ref: inputRef,
            type: 'text',
            style: getInputStyle(),
            placeholder,
            value: currentSearchTerm,
            onChange: (e) => handleInputChange(e.target.value),
            onFocus: handleInputFocus,
            onBlur: handleInputBlur,
            onKeyDown: handleKeyDown,
            disabled,
            autoComplete: 'off',
          })
        ) : (
          <input
            ref={inputRef}
            type="text"
            style={getInputStyle()}
            placeholder={placeholder}
            value={currentSearchTerm}
            onChange={(e) => handleInputChange(e.target.value)}
            onFocus={handleInputFocus}
            onBlur={handleInputBlur}
            onKeyDown={handleKeyDown}
            disabled={disabled}
            autoComplete="off"
          />
        )}
        {currentSearchTerm && (
          <button
            type="button"
            style={isClearHovered ? { ...mergedStyles.clearButton, ...mergedStyles.clearButtonHover } : mergedStyles.clearButton}
            onClick={handleClear}
            onMouseEnter={() => setIsClearHovered(true)}
            onMouseLeave={() => setIsClearHovered(false)}
            aria-label="Clear"
          >
            ✕
          </button>
        )}
        <span style={isOpen ? { ...mergedStyles.arrow, ...mergedStyles.arrowOpen } : mergedStyles.arrow}>▼</span>
      </div>

      {isOpen && !disabled && (
        <ul style={mergedStyles.dropdown} className="autocomplete-dropdown-scroll">
          {filteredOptions.length > 0 ? (
            filteredOptions.map((option, index) => (
              <li
                key={getKey(option)}
                style={getOptionStyle(index, option)}
                onClick={() => handleOptionSelect(option)}
                onMouseEnter={() => setHighlightedIndex(index)}
              >
                {option.label}
              </li>
            ))
          ) : (
            <li style={mergedStyles.noOptions}>{noResultsText}</li>
          )}
        </ul>
      )}
    </div>
  );
};


const styles = {
  wrapper: {
    position: 'relative',
    width: '100%',
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen", "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue", sans-serif',
  } as CSSProperties,
  
  inputWrapper: {
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
  } as CSSProperties,
  
  input: {
    width: '100%',
    padding: '10px 60px 10px 12px',
    fontSize: '14px',
    border: '1px solid #d1d5db',
    borderRadius: '6px',
    outline: 'none',
    transition: 'all 0.2s ease',
    backgroundColor: 'white',
    color: '#1f2937',
  } as CSSProperties,
  
  inputFocus: {
    borderColor: '#3b82f6',
    boxShadow: '0 0 0 3px rgba(59, 130, 246, 0.1)',
  } as CSSProperties,
  
  inputDisabled: {
    backgroundColor: '#f3f4f6',
    cursor: 'not-allowed',
    opacity: 0.6,
  } as CSSProperties,
  
  clearButton: {
    position: 'absolute',
    right: '32px',
    background: 'none',
    border: 'none',
    color: '#6b7280',
    cursor: 'pointer',
    fontSize: '16px',
    padding: '4px 8px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    transition: 'color 0.2s ease',
  } as CSSProperties,
  
  clearButtonHover: {
    color: '#1f2937',
  } as CSSProperties,
  
  arrow: {
    position: 'absolute',
    right: '12px',
    color: '#6b7280',
    fontSize: '10px',
    pointerEvents: 'none',
    transition: 'transform 0.2s ease',
  } as CSSProperties,
  
  arrowOpen: {
    transform: 'rotate(180deg)',
  } as CSSProperties,
  
  dropdown: {
    position: 'absolute',
    top: 'calc(100% + 4px)',
    left: 0,
    right: 0,
    maxHeight: '250px',
    overflowY: 'auto',
    backgroundColor: 'white',
    border: '1px solid #d1d5db',
    borderRadius: '6px',
    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
    listStyle: 'none',
    margin: 0,
    padding: '4px',
    zIndex: 1000,
  } as CSSProperties,
  
  option: {
    padding: "8px 16px",
    cursor: 'pointer',
    transition: 'background-color 0.15s ease',
    borderBottom: "1px solid #e5e7eb",
    color: '#1f2937',
  } as CSSProperties,
  
  optionHighlighted: {
    backgroundColor: '#f3f4f6',
  } as CSSProperties,
  
  optionSelected: {
    backgroundColor: '#dbeafe',
    color: '#1e40af',
    fontWeight: 500,
  } as CSSProperties,
  
  optionHighlightedSelected: {
    backgroundColor: '#bfdbfe',
  } as CSSProperties,
  
  noOptions: {
    padding: '16px 12px',
    textAlign: 'center',
    color: '#6b7280',
    fontSize: '14px',
  } as CSSProperties,
};