import React from 'react';
import { Venue } from '../../types';

interface VenueDropdownProps {
  venues: Venue[];
  onVenueSelect: (venue: Venue) => void;
}

export const VenueDropdown: React.FC<VenueDropdownProps> = ({ venues, onVenueSelect }) => {
  const handleKeyDown = (event: React.KeyboardEvent, venue: Venue) => {
    const currentElement = event.currentTarget as HTMLElement;
    const allOptions = Array.from(currentElement.parentElement?.children || []) as HTMLElement[];
    const currentIndex = allOptions.indexOf(currentElement);

    switch (event.key) {
      case 'Enter':
      case ' ':
        event.preventDefault();
        onVenueSelect(venue);
        break;
      case 'ArrowDown':
        event.preventDefault();
        const nextIndex = Math.min(currentIndex + 1, allOptions.length - 1);
        allOptions[nextIndex]?.focus();
        break;
      case 'ArrowUp':
        event.preventDefault();
        const prevIndex = Math.max(currentIndex - 1, 0);
        allOptions[prevIndex]?.focus();
        break;
      case 'Escape':
        event.preventDefault();
        // Focus back to search input
        const searchInput = document.getElementById('venue-search');
        searchInput?.focus();
        break;
    }
  };


  return (
    <div 
      id="venue-listbox"
      className="absolute top-full left-0 right-0 bg-white border border-gray-200 shadow-lg z-10"
      role="listbox"
      aria-label="Venue suggestions"
    >
      {venues.length > 0 ? (
        venues.map((venue) => (
          <div
            key={venue.name}
            role="option"
            tabIndex={0}
            onClick={() => onVenueSelect(venue)}
            onKeyDown={(e) => handleKeyDown(e, venue)}
            className="p-4 hover:bg-gray-50 focus:bg-blue-50 focus:outline-none cursor-pointer border-b border-gray-100 last:border-b-0"
            aria-selected={false}
          >
            {venue.name}
          </div>
        ))
      ) : (
        <div className="p-4 text-gray-500" role="option" aria-selected={false}>
          No venues found!
        </div>
      )}
    </div>
  );
};
