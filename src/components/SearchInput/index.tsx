import React from 'react';
import { Venue } from '../../types';
import { useVenueSearch } from '../../hooks/useVenueSearch';
import { VenueDropdown } from '../VenueDropdown';

interface SearchInputProps {
  onVenueSelect: (venue: Venue) => void;
}

export const SearchInput: React.FC<SearchInputProps> = ({ onVenueSelect }) => {
  const {
    searchTerm,
    venues,
    showDropdown,
    setSearchTerm,
    selectVenue,
    showSearchDropdown,
    hideSearchDropdown,
  } = useVenueSearch();

  const handleVenueSelect = (venue: Venue) => {
    selectVenue(venue);
    onVenueSelect(venue);
  };

  const handleBlur = (e: React.FocusEvent) => {
    // Capture the search container reference before setTimeout
    const searchContainer = e.currentTarget.closest('[role="search"]');
    
    // Use setTimeout to allow focus to move to dropdown items
    setTimeout(() => {
      const activeElement = document.activeElement;
      
      // Only hide if focus moved outside the entire search component
      if (!searchContainer?.contains(activeElement)) {
        hideSearchDropdown();
      }
    }, 100);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!showDropdown) return;

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        // Focus first dropdown option
        const firstOption = document.querySelector('[role="listbox"] [role="option"]') as HTMLElement;
        firstOption?.focus();
        break;
      case 'Escape':
        e.preventDefault();
        hideSearchDropdown();
        break;
    }
  };

  return (
    <div className="relative mb-8" role="search">
      <label htmlFor="venue-search" className="sr-only">
        Search for venues
      </label>
      <input
        id="venue-search"
        type="text"
        role="combobox"
        placeholder="Search by venue name... (eg: Alexandra Palace)"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        onBlur={handleBlur}
        onFocus={showSearchDropdown}
        onKeyDown={handleKeyDown}
        className="w-full p-4 bg-gray-100 outline-none text-lg focus:ring-2 focus:ring-blue-500 focus:bg-white"
        aria-label="Search for venues"
        aria-expanded={showDropdown}
        aria-controls="venue-listbox"
        aria-haspopup="listbox"
        autoComplete="off"
      />
      
      {showDropdown && (
        <VenueDropdown venues={venues} onVenueSelect={handleVenueSelect} />
      )}
    </div>
  );
};
