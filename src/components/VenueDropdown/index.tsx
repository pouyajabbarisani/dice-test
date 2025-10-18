import React from 'react';
import { Venue } from '../../types';

interface VenueDropdownProps {
  venues: Venue[];
  onVenueSelect: (venue: Venue) => void;
}

export const VenueDropdown: React.FC<VenueDropdownProps> = ({ venues, onVenueSelect }) => {
  return (
    <div className="absolute top-full left-0 right-0 bg-white border border-gray-200 shadow-lg z-10">
      {venues.length > 0 ? (
        venues.map((venue) => (
          <div
            key={venue.name}
            onClick={() => onVenueSelect(venue)}
            className="p-4 hover:bg-gray-50 cursor-pointer border-b border-gray-100 last:border-b-0"
          >
            {venue.name}
          </div>
        ))
      ) : (
        <div className="p-4 text-gray-500">No venues found!</div>
      )}
    </div>
  );
};
