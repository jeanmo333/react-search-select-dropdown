import { useState } from "react";
import {
  Autocomplete,
  AutocompleteInputProps,
} from "react-search-select-dropdown";
import type { AutocompleteOption } from "react-search-select-dropdown";
import "react-search-select-dropdown/styles.css";

// Example 1: String values (default)
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

// Example 2: Number values
const numberOptions: AutocompleteOption<number>[] = [
  { value: 1, label: "Option One" },
  { value: 2, label: "Option Two" },
  { value: 3, label: "Option Three" },
  { value: 4, label: "Option Four" },
  { value: 5, label: "Option Five" },
];

// Example 3: Custom object values
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
  const [selectedCountry, setSelectedCountry] =
    useState<AutocompleteOption | null>(null);
  const [selectedNumber, setSelectedNumber] =
    useState<AutocompleteOption<number> | null>(null);
  const [selectedUser, setSelectedUser] =
    useState<AutocompleteOption<User> | null>(null);

  return (
    <div style={style.appContainer}>
      <h1 style={style.appTitle}>React Search Select Dropdown - Examples</h1>

      {/* Example 1: String Values */}
      <div style={style.formGroup}>
        <label style={style.formLabel}>
          Example 1: String Values (Countries)
        </label>
        <Autocomplete
          // noResultsText="No se encontraron resultados"
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
              // borderColor: 'black',
            },
            option: {
              padding: "8px 16px",
              fontSize: "16px",
              //  borderBottom: "1px solid #e5e7eb",
            },
          }}
        />
        {selectedCountry && (
          <div style={style.selectedInfo}>
            <strong>Selected:</strong> {selectedCountry.label} (code:{" "}
            {selectedCountry.value})
          </div>
        )}
      </div>

      {/* Example 2: Number Values */}
      <div style={style.formGroup}>
        <label style={style.formLabel}>Example 2: Number Values</label>
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
              // borderColor: 'black',
            },
            option: {
              padding: "8px 16px",
              fontSize: "16px",
              //  borderBottom: "1px solid #e5e7eb",
            },
          }}
        />
        {selectedNumber && (
          <div style={style.selectedInfo}>
            <strong>Selected:</strong> {selectedNumber.label} (ID:{" "}
            {selectedNumber.value})
          </div>
        )}
      </div>

      {/* Example 3: Custom Object Values */}
      <div style={style.formGroup}>
        <label style={style.formLabel}>
          Example 3: Custom Object Values (Users)
        </label>
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
              // borderColor: 'black',
            },
            option: {
              padding: "8px 16px",
              fontSize: "16px",
              //  borderBottom: "1px solid #e5e7eb",
            },
          }}
        />
        {selectedUser && (
          <div style={style.selectedInfo}>
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

      {/* Example 5: Custom Input with renderInput */}
      <div style={style.formGroup}>
        <label style={style.formLabel}>
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

      {/* Example 4: Disabled State */}
      <div style={style.formGroup}>
        <label style={style.formLabel}>Example 4: Disabled State</label>
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
              // borderColor: 'black',
            },
            option: {
              padding: "8px 16px",
              fontSize: "16px",
              //  borderBottom: "1px solid #e5e7eb",
            },
          }}
        />
      </div>
    </div>
  );
}

const style = {
  appContainer: { padding: "40px", maxWidth: "800px", margin: "0 auto" },
  appTitle: { marginBottom: "30px", color: "#1f2937", fontSize: "32px" },
  formGroup: { marginBottom: "30px" },
  formLabel: {
    display: "block",
    marginBottom: "8px",
    fontWeight: 500,
    color: "#374151",
    fontSize: "16px",
  },
  selectedInfo: {
    marginTop: "12px",
    padding: "12px",
    backgroundColor: "#f0fdf4",
    border: "1px solid #86efac",
    borderRadius: "6px",
    color: "#166534",
    fontSize: "14px",
    lineHeight: "1.6",
  },
};

export default App;
