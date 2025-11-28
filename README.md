# React Search Select Dropdown

A highly customizable React autocomplete/search select dropdown component with TypeScript support and inline styles.

## Features

- 🔍 **Search functionality** - Filter options as you type
- ⌨️ **Keyboard navigation** - Navigate with arrow keys, select with Enter
- 🎨 **Fully customizable styling** - Override default inline styles with `customStyles` prop
- 🎭 **Custom input support** - Use any UI library (Material-UI, Ant Design, etc.) via `renderInput` prop
- 🔤 **TypeScript support** - Full type definitions included
- 🎯 **Generic types** - Support for any value type (string, number, objects)
- 🌐 **i18n ready** - Customizable text for localization
- 📱 **Responsive design** - Works on all screen sizes
- ♿ **Accessible** - ARIA labels and keyboard support
- 💅 **Inline styles** - No CSS conflicts, minimal external CSS (only scrollbar)

## Installation

```bash
npm install react-search-select-dropdown
```

or

```bash
yarn add react-search-select-dropdown
```

or

```bash
pnpm add react-search-select-dropdown
```

## Quick Start

```tsx
import { Autocomplete } from "react-search-select-dropdown";
import type { AutocompleteOption } from "react-search-select-dropdown";
import "react-search-select-dropdown/styles.css";

const options: AutocompleteOption[] = [
  { value: "us", label: "United States" },
  { value: "ca", label: "Canada" },
  { value: "mx", label: "Mexico" },
];

function App() {
  return (
    <Autocomplete
      options={options}
      placeholder="Search country..."
      onSelect={(option) => console.log("Selected:", option)}
    />
  );
}
```

## Usage Examples

### Example 1: String Values (Default)

```tsx
import { useState } from "react";
import { Autocomplete } from "react-search-select-dropdown";
import type { AutocompleteOption } from "react-search-select-dropdown";
import "react-search-select-dropdown/styles.css";

const countryOptions: AutocompleteOption[] = [
  { value: "us", label: "United States" },
  { value: "ca", label: "Canada" },
  { value: "mx", label: "Mexico" },
  { value: "gb", label: "United Kingdom" },
  { value: "fr", label: "France" },
  { value: "de", label: "Germany" },
  { value: "it", label: "Italy" },
  { value: "es", label: "Spain" },
];

function App() {
  const [selectedCountry, setSelectedCountry] =
    useState<AutocompleteOption | null>(null);

  return (
    <div>
      <Autocomplete
        options={countryOptions}
        placeholder="Search country..."
        onSelect={(option) => {
          setSelectedCountry(option);
          console.log("Selected country:", option);
        }}
        customStyles={{
          input: {
            borderColor: "gray",
          },
          dropdown: {
            maxHeight: "300px",
          },
          option: {
            padding: "8px 16px",
            fontSize: "16px",
          },
        }}
      />
      {selectedCountry && (
        <div
          style={{
            marginTop: "12px",
            padding: "12px",
            backgroundColor: "#f0fdf4",
            border: "1px solid #86efac",
            borderRadius: "6px",
            color: "#166534",
            fontSize: "14px",
            lineHeight: "1.6",
          }}
        >
          <strong>Selected:</strong> {selectedCountry.label} (code: {selectedCountry.value})
        </div>
      )}
    </div>
  );
}
```

### Example 2: Number Values

```tsx
import { useState } from "react";
import { Autocomplete } from "react-search-select-dropdown";
import type { AutocompleteOption } from "react-search-select-dropdown";
import "react-search-select-dropdown/styles.css";

const numberOptions: AutocompleteOption<number>[] = [
  { value: 1, label: "Option One" },
  { value: 2, label: "Option Two" },
  { value: 3, label: "Option Three" },
  { value: 4, label: "Option Four" },
  { value: 5, label: "Option Five" },
];

function App() {
  const [selectedNumber, setSelectedNumber] =
    useState<AutocompleteOption<number> | null>(null);

  return (
    <div>
      <Autocomplete
        options={numberOptions}
        placeholder="Search option..."
        onSelect={(option) => {
          setSelectedNumber(option);
          console.log("Selected number:", option);
        }}
        customStyles={{
          input: {
            borderColor: "gray",
          },
          dropdown: {
            maxHeight: "300px",
          },
          option: {
            padding: "8px 16px",
            fontSize: "16px",
          },
        }}
      />
      {selectedNumber && (
        <div
          style={{
            marginTop: "12px",
            padding: "12px",
            backgroundColor: "#f0fdf4",
            border: "1px solid #86efac",
            borderRadius: "6px",
            color: "#166534",
            fontSize: "14px",
            lineHeight: "1.6",
          }}
        >
          <strong>Selected:</strong> {selectedNumber.label} (ID: {selectedNumber.value})
        </div>
      )}
    </div>
  );
}
```

### Example 3: Custom Object Values

```tsx
import { useState } from "react";
import { Autocomplete } from "react-search-select-dropdown";
import type { AutocompleteOption } from "react-search-select-dropdown";
import "react-search-select-dropdown/styles.css";

interface User {
  id: number;
  email: string;
  role: string;
}

const userOptions: AutocompleteOption<User>[] = [
  {
    value: { id: 1, email: "john@example.com", role: "admin" },
    label: "John Doe (Admin)",
  },
  {
    value: { id: 2, email: "jane@example.com", role: "user" },
    label: "Jane Smith (User)",
  },
  {
    value: { id: 3, email: "bob@example.com", role: "moderator" },
    label: "Bob Johnson (Moderator)",
  },
  {
    value: { id: 4, email: "alice@example.com", role: "user" },
    label: "Alice Williams (User)",
  },
];

function App() {
  const [selectedUser, setSelectedUser] =
    useState<AutocompleteOption<User> | null>(null);

  return (
    <div>
      <Autocomplete
        options={userOptions}
        placeholder="Search user..."
        getOptionKey={(option) => option.value.id}
        onSelect={(option) => {
          setSelectedUser(option);
          console.log("Selected user:", option);
        }}
        customStyles={{
          input: {
            borderColor: "gray",
          },
          dropdown: {
            maxHeight: "300px",
          },
          option: {
            padding: "8px 16px",
            fontSize: "16px",
          },
        }}
      />
      {selectedUser && (
        <div
          style={{
            marginTop: "12px",
            padding: "12px",
            backgroundColor: "#f0fdf4",
            border: "1px solid #86efac",
            borderRadius: "6px",
            color: "#166534",
            fontSize: "14px",
            lineHeight: "1.6",
          }}
        >
          <strong>Selected User:</strong>
          <br />
          Name: {selectedUser.label}
          <br />
          ID: {selectedUser.value.id}
          <br />
          Email: {selectedUser.value.email}
          <br />
          Role: {selectedUser.value.role}
        </div>
      )}
    </div>
  );
}
```

## Customization

### Custom Styles

The component uses inline styles by default, which you can fully customize using the `customStyles` prop:

```tsx
import {
  Autocomplete,
  type AutocompleteStyles,
} from "react-search-select-dropdown";
import type { AutocompleteOption } from "react-search-select-dropdown";
import "react-search-select-dropdown/styles.css";

const customStyles: AutocompleteStyles = {
  input: {
    borderColor: "#10b981",
    fontSize: "16px",
  },
  inputFocus: {
    borderColor: "#059669",
    boxShadow: "0 0 0 3px rgba(16, 185, 129, 0.1)",
  },
  dropdown: {
    borderColor: "#10b981",
    boxShadow: "0 10px 25px rgba(0, 0, 0, 0.15)",
  },
  option: {
    padding: "12px 16px",
    fontSize: "15px",
  },
  optionHighlighted: {
    backgroundColor: "#d1fae5",
  },
  optionSelected: {
    backgroundColor: "#10b981",
    color: "white",
  },
};

function App() {
  return (
    <Autocomplete
      options={options}
      placeholder="Search..."
      customStyles={customStyles}
    />
  );
}
```

#### Available Style Properties

- `wrapper` - Main container
- `inputWrapper` - Input container
- `input` - Input field base styles
- `inputFocus` - Input field when focused
- `inputDisabled` - Input field when disabled
- `clearButton` - Clear button base styles
- `clearButtonHover` - Clear button on hover
- `arrow` - Dropdown arrow base styles
- `arrowOpen` - Dropdown arrow when open
- `dropdown` - Dropdown list container
- `option` - Individual option base styles
- `optionHighlighted` - Option when highlighted
- `optionSelected` - Option when selected
- `optionHighlightedSelected` - Option when both highlighted and selected
- `noOptions` - No results message

### Custom No Results Text

```tsx
<Autocomplete options={options} noResultsText="No se encontraron resultados" />
```

### Custom Input with renderInput

You can pass a completely custom input component using the `renderInput` prop. This is useful for custom styling or integrating with UI libraries:

```tsx
import { Autocomplete, type AutocompleteInputProps } from "react-search-select-dropdown";
import type { AutocompleteOption } from "react-search-select-dropdown";
import "react-search-select-dropdown/styles.css";

const countryOptions: AutocompleteOption[] = [
  { value: "us", label: "United States" },
  { value: "ca", label: "Canada" },
  { value: "mx", label: "Mexico" },
];

function App() {
  return (
    <Autocomplete
      options={countryOptions}
      placeholder="Custom styled input..."
      onSelect={(option) => {
        console.log("Custom input selected:", option);
      }}
      renderInput={(props: AutocompleteInputProps) => (
        <input
          ref={props.ref}
          type={props.type}
          value={props.value}
          onChange={props.onChange}
          onFocus={props.onFocus}
          onBlur={props.onBlur}
          onKeyDown={props.onKeyDown}
          placeholder={props.placeholder}
          disabled={props.disabled}
          autoComplete={props.autoComplete}
          style={{
            ...props.style,
            borderWidth: "2px",
            borderStyle: "solid",
            borderColor: "#10b981",
            borderRadius: "8px",
            fontSize: "16px",
            fontWeight: "bold",
            padding: "12px 60px 12px 16px",
            backgroundColor: "#f0fdf4",
          }}
        />
      )}
      customStyles={{
        dropdown: {
          maxHeight: "300px",
          borderColor: "#10b981",
        },
        option: {
          padding: "12px 16px",
          fontSize: "16px",
        },
        optionHighlighted: {
          backgroundColor: "#d1fae5",
        },
        optionSelected: {
          backgroundColor: "#10b981",
          color: "white",
        },
      }}
    />
  );
}
```

### Custom Input with Material-UI

You can use any UI library component as the input by using the `renderInput` prop:

```tsx
import { useState } from "react";
import { Autocomplete, AutocompleteInputProps } from "react-search-select-dropdown";
import type { AutocompleteOption } from "react-search-select-dropdown";
import TextField from "@mui/material/TextField";
import "react-search-select-dropdown/styles.css";

const options: AutocompleteOption[] = [
  { value: "us", label: "United States" },
  { value: "ca", label: "Canada" },
  { value: "mx", label: "Mexico" },
];

function App() {
  const [selected, setSelected] = useState<AutocompleteOption | null>(null);

  return (
    <Autocomplete
      options={options}
      placeholder="Search country..."
      onSelect={setSelected}
      renderInput={(props: AutocompleteInputProps) => (
        <TextField
          inputRef={props.ref}
          type={props.type}
          value={props.value}
          onChange={props.onChange}
          onFocus={props.onFocus}
          onBlur={props.onBlur}
          onKeyDown={props.onKeyDown}
          placeholder={props.placeholder}
          disabled={props.disabled}
          autoComplete={props.autoComplete}
          variant="outlined"
          fullWidth
          label="Country"
          size="small"
        />
      )}
      customStyles={{
        inputWrapper: {
          position: "relative",
        },
        dropdown: {
          maxHeight: "300px",
        },
      }}
    />
  );
}
```

## Complete Example with Multiple Instances

```tsx
import { useState } from "react";
import { Autocomplete, AutocompleteInputProps } from "react-search-select-dropdown";
import type { AutocompleteOption } from "react-search-select-dropdown";
import "react-search-select-dropdown/styles.css";

interface User {
  id: number;
  email: string;
  role: string;
}

const countryOptions: AutocompleteOption[] = [
  { value: "us", label: "United States" },
  { value: "ca", label: "Canada" },
  { value: "mx", label: "Mexico" },
  { value: "gb", label: "United Kingdom" },
  { value: "fr", label: "France" },
  { value: "de", label: "Germany" },
  { value: "it", label: "Italy" },
  { value: "es", label: "Spain" },
];

const numberOptions: AutocompleteOption<number>[] = [
  { value: 1, label: "Option One" },
  { value: 2, label: "Option Two" },
  { value: 3, label: "Option Three" },
  { value: 4, label: "Option Four" },
  { value: 5, label: "Option Five" },
];

const userOptions: AutocompleteOption<User>[] = [
  {
    value: { id: 1, email: "john@example.com", role: "admin" },
    label: "John Doe (Admin)",
  },
  {
    value: { id: 2, email: "jane@example.com", role: "user" },
    label: "Jane Smith (User)",
  },
  {
    value: { id: 3, email: "bob@example.com", role: "moderator" },
    label: "Bob Johnson (Moderator)",
  },
  {
    value: { id: 4, email: "alice@example.com", role: "user" },
    label: "Alice Williams (User)",
  },
];

function App() {
  const [selectedCountry, setSelectedCountry] =
    useState<AutocompleteOption | null>(null);
  const [selectedNumber, setSelectedNumber] =
    useState<AutocompleteOption<number> | null>(null);
  const [selectedUser, setSelectedUser] =
    useState<AutocompleteOption<User> | null>(null);

  return (
    <div style={{ padding: "40px", maxWidth: "800px", margin: "0 auto" }}>
      <h1>React Search Select Dropdown - Examples</h1>

      {/* Example 1: String Values */}
      <div style={{ marginBottom: "30px" }}>
        <label style={{ display: "block", marginBottom: "8px", fontWeight: 500 }}>
          Example 1: String Values (Countries)
        </label>
        <Autocomplete
          options={countryOptions}
          placeholder="Search country..."
          onSelect={setSelectedCountry}
          customStyles={{
            input: {
              borderColor: "gray",
            },
            dropdown: {
              maxHeight: "300px",
            },
            option: {
              padding: "8px 16px",
              fontSize: "16px",
            },
          }}
        />
        {selectedCountry && (
          <div
            style={{
              marginTop: "12px",
              padding: "12px",
              backgroundColor: "#f0fdf4",
              border: "1px solid #86efac",
              borderRadius: "6px",
              color: "#166534",
              fontSize: "14px",
              lineHeight: "1.6",
            }}
          >
            <strong>Selected:</strong> {selectedCountry.label} (code:{" "}
            {selectedCountry.value})
          </div>
        )}
      </div>

      {/* Example 2: Number Values */}
      <div style={{ marginBottom: "30px" }}>
        <label style={{ display: "block", marginBottom: "8px", fontWeight: 500 }}>
          Example 2: Number Values
        </label>
        <Autocomplete
          options={numberOptions}
          placeholder="Search option..."
          onSelect={setSelectedNumber}
          customStyles={{
            input: {
              borderColor: "gray",
            },
            dropdown: {
              maxHeight: "300px",
            },
            option: {
              padding: "8px 16px",
              fontSize: "16px",
            },
          }}
        />
        {selectedNumber && (
          <div
            style={{
              marginTop: "12px",
              padding: "12px",
              backgroundColor: "#f0fdf4",
              border: "1px solid #86efac",
              borderRadius: "6px",
              color: "#166534",
              fontSize: "14px",
              lineHeight: "1.6",
            }}
          >
            <strong>Selected:</strong> {selectedNumber.label} (ID:{" "}
            {selectedNumber.value})
          </div>
        )}
      </div>

      {/* Example 3: Custom Object Values */}
      <div style={{ marginBottom: "30px" }}>
        <label style={{ display: "block", marginBottom: "8px", fontWeight: 500 }}>
          Example 3: Custom Object Values (Users)
        </label>
        <Autocomplete
          options={userOptions}
          placeholder="Search user..."
          getOptionKey={(option) => option.value.id}
          onSelect={setSelectedUser}
          customStyles={{
            input: {
              borderColor: "gray",
            },
            dropdown: {
              maxHeight: "300px",
            },
            option: {
              padding: "8px 16px",
              fontSize: "16px",
            },
          }}
        />
        {selectedUser && (
          <div
            style={{
              marginTop: "12px",
              padding: "12px",
              backgroundColor: "#f0fdf4",
              border: "1px solid #86efac",
              borderRadius: "6px",
              color: "#166534",
              fontSize: "14px",
              lineHeight: "1.6",
            }}
          >
            <strong>Selected User:</strong>
            <br />
            Name: {selectedUser.label}
            <br />
            ID: {selectedUser.value.id}
            <br />
            Email: {selectedUser.value.email}
            <br />
            Role: {selectedUser.value.role}
          </div>
        )}
      </div>

      {/* Example 4: Disabled State */}
      <div style={{ marginBottom: "30px" }}>
        <label style={{ display: "block", marginBottom: "8px", fontWeight: 500 }}>
          Example 4: Disabled State
        </label>
        <Autocomplete
          options={countryOptions}
          placeholder="This is disabled..."
          disabled={true}
          customStyles={{
            input: {
              borderColor: "gray",
            },
            dropdown: {
              maxHeight: "300px",
            },
            option: {
              padding: "8px 16px",
              fontSize: "16px",
            },
          }}
        />
      </div>

      {/* Example 5: Custom Input with renderInput */}
      <div style={{ marginBottom: "30px" }}>
        <label style={{ display: "block", marginBottom: "8px", fontWeight: 500 }}>
          Example 5: Custom Input (renderInput)
        </label>
        <Autocomplete
          options={countryOptions}
          placeholder="Custom styled input..."
          onSelect={(option) => {
            console.log("Custom input selected:", option);
          }}
          renderInput={(props: AutocompleteInputProps) => (
            <input
              ref={props.ref}
              type={props.type}
              value={props.value}
              onChange={props.onChange}
              onFocus={props.onFocus}
              onBlur={props.onBlur}
              onKeyDown={props.onKeyDown}
              placeholder={props.placeholder}
              disabled={props.disabled}
              autoComplete={props.autoComplete}
              style={{
                ...props.style,
                borderWidth: "2px",
                borderStyle: "solid",
                borderColor: "#10b981",
                borderRadius: "8px",
                fontSize: "16px",
                fontWeight: "bold",
                padding: "12px 60px 12px 16px",
                backgroundColor: "#f0fdf4",
              }}
            />
          )}
          customStyles={{
            dropdown: {
              maxHeight: "300px",
              borderColor: "#10b981",
            },
            option: {
              padding: "12px 16px",
              fontSize: "16px",
            },
            optionHighlighted: {
              backgroundColor: "#d1fae5",
            },
            optionSelected: {
              backgroundColor: "#10b981",
              color: "white",
            },
          }}
        />
      </div>
    </div>
  );
}

export default App;
```

## Keyboard Navigation

- **Arrow Down**: Navigate to next option
- **Arrow Up**: Navigate to previous option
- **Enter**: Select highlighted option
- **Escape**: Close dropdown and blur input

## API Reference

### Props

| Prop            | Type                                                  | Default                 | Description                                             |
| --------------- | ----------------------------------------------------- | ----------------------- | ------------------------------------------------------- |
| `options`       | `AutocompleteOption<T>[]`                             | **required**            | Array of options to display                             |
| `placeholder`   | `string`                                              | `'Search...'`           | Placeholder text for the input                          |
| `onSelect`      | `(option: AutocompleteOption<T> \| null) => void`     | `undefined`             | Callback when an option is selected                     |
| `disabled`      | `boolean`                                             | `false`                 | Disable the autocomplete                                |
| `getOptionKey`  | `(option: AutocompleteOption<T>) => string \| number` | Uses `value` or `label` | Function to generate unique keys for options            |
| `customStyles`  | `AutocompleteStyles`                                  | `{}`                    | Override default styles with custom inline styles       |
| `noResultsText` | `string`                                              | `'No results found'`    | Text to display when no options match the search        |
| `value`         | `AutocompleteOption<T> \| null`                       | `undefined`             | Controlled value for the autocomplete                   |
| `renderInput`   | `(props: AutocompleteInputProps) => ReactNode`        | `undefined`             | Custom input component renderer for maximum flexibility |

### Types

```typescript
interface AutocompleteOption<T = string> {
  value: T;
  label: string;
}

interface AutocompleteInputProps {
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

interface AutocompleteStyles {
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

interface AutocompleteProps<T = string> {
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
```

## License

MIT

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.
