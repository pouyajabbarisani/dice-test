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

  return (
    <div className="relative mb-8">
      <input
        type="text"
        placeholder="Search by venue name... (eg: Alexandra Palace)"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        onBlur={hideSearchDropdown}
        onFocus={showSearchDropdown}
        className="w-full p-4 bg-gray-100 outline-none text-lg"
      />
      
      {showDropdown && (
        <VenueDropdown venues={venues} onVenueSelect={handleVenueSelect} />
      )}
    </div>
  );
};
