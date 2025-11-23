import { useState } from 'react';
import { Autocomplete } from 'react-search-select-dropdown';
import type { AutocompleteOption } from 'react-search-select-dropdown';
import 'react-search-select-dropdown/styles.css';
import './App.css';

// Example 1: String values (default)
const countryOptions: AutocompleteOption[] = [
  { value: 'us', label: 'United States' },
  { value: 'ca', label: 'Canada' },
  { value: 'mx', label: 'Mexico' },
  { value: 'gb', label: 'United Kingdom' },
  { value: 'fr', label: 'France' },
  { value: 'de', label: 'Germany' },
  { value: 'it', label: 'Italy' },
  { value: 'es', label: 'Spain' },
];

// Example 2: Number values
const numberOptions: AutocompleteOption<number>[] = [
  { value: 1, label: 'Option One' },
  { value: 2, label: 'Option Two' },
  { value: 3, label: 'Option Three' },
  { value: 4, label: 'Option Four' },
  { value: 5, label: 'Option Five' },
];

// Example 3: Custom object values
interface User {
  id: number;
  email: string;
  role: string;
}

const userOptions: AutocompleteOption<User>[] = [
  { 
    value: { id: 1, email: 'john@example.com', role: 'admin' }, 
    label: 'John Doe (Admin)' 
  },
  { 
    value: { id: 2, email: 'jane@example.com', role: 'user' }, 
    label: 'Jane Smith (User)' 
  },
  { 
    value: { id: 3, email: 'bob@example.com', role: 'moderator' }, 
    label: 'Bob Johnson (Moderator)' 
  },
  { 
    value: { id: 4, email: 'alice@example.com', role: 'user' }, 
    label: 'Alice Williams (User)' 
  },
];

function App() {
  const [selectedCountry, setSelectedCountry] = useState<AutocompleteOption | null>(null);
  const [selectedNumber, setSelectedNumber] = useState<AutocompleteOption<number> | null>(null);
  const [selectedUser, setSelectedUser] = useState<AutocompleteOption<User> | null>(null);

  return (
    <div className="app-container">
      <h1 className="app-title">
        React Search Select Dropdown - Examples
      </h1>

      {/* Example 1: String Values */}
      <div className="form-group">
        <label className="form-label">
          Example 1: String Values (Countries)
        </label>
        <Autocomplete
          options={countryOptions}
          placeholder="Search country..."
          onSelect={(option) => {
            setSelectedCountry(option);
            console.log('Selected country:', option);
          }}
        />
        {selectedCountry && (
          <div className="selected-info">
            <strong>Selected:</strong> {selectedCountry.label} (code: {selectedCountry.value})
          </div>
        )}
      </div>

      {/* Example 2: Number Values */}
      <div className="form-group">
        <label className="form-label">
          Example 2: Number Values
        </label>
        <Autocomplete
          options={numberOptions}
          placeholder="Search option..."
          onSelect={(option) => {
            setSelectedNumber(option);
            console.log('Selected number:', option);
          }}
        />
        {selectedNumber && (
          <div className="selected-info">
            <strong>Selected:</strong> {selectedNumber.label} (ID: {selectedNumber.value})
          </div>
        )}
      </div>

      {/* Example 3: Custom Object Values */}
      <div className="form-group">
        <label className="form-label">
          Example 3: Custom Object Values (Users)
        </label>
        <Autocomplete
          options={userOptions}
          placeholder="Search user..."
          getOptionKey={(option) => option.value.id}
          onSelect={(option) => {
            setSelectedUser(option);
            console.log('Selected user:', option);
          }}
        />
        {selectedUser && (
          <div className="selected-info">
            <strong>Selected User:</strong><br />
            Name: {selectedUser.label}<br />
            ID: {selectedUser.value.id}<br />
            Email: {selectedUser.value.email}<br />
            Role: {selectedUser.value.role}
          </div>
        )}
      </div>

      {/* Example 4: Disabled State */}
      <div className="form-group">
        <label className="form-label">
          Example 4: Disabled State
        </label>
        <Autocomplete
          options={countryOptions}
          placeholder="This is disabled..."
          disabled={true}
        />
      </div>
    </div>
  );
}

export default App;
