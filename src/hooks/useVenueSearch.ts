import { useState, useEffect, useCallback } from 'react';
import { Venue } from '../types';
import { mockVenues } from '../data/mockVenues';

interface UseVenueSearchResult {
  searchTerm: string;
  venues: Venue[];
  showDropdown: boolean;
  selectedVenue: Venue | null;
  setSearchTerm: (term: string) => void;
  selectVenue: (venue: Venue) => void;
  showSearchDropdown: () => void;
  hideSearchDropdown: () => void;
}

export const useVenueSearch = (): UseVenueSearchResult => {
  const [searchTerm, setSearchTerm] = useState('');
  const [venues, setVenues] = useState<Venue[]>([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const [selectedVenue, setSelectedVenue] = useState<Venue | null>(null);

  const searchVenues = useCallback((query: string) => {
    if (query.length < 2) {
      setVenues([]);
      setShowDropdown(false);
      return;
    }

    // Don't search if the query matches the already selected venue
    if (selectedVenue && query === selectedVenue.name) {
      setVenues([]);
      setShowDropdown(false);
      return;
    }

    const filteredVenues = mockVenues.filter(venue =>
      venue.name.toLowerCase().includes(query.toLowerCase())
    ).slice(0, 5);

    setVenues(filteredVenues);
    setShowDropdown(true);
  }, [selectedVenue]);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      searchVenues(searchTerm);
    }, 300);

    return () => clearTimeout(timeoutId);
  }, [searchTerm, searchVenues]);

  const handleSetSearchTerm = useCallback((term: string) => {
    setSearchTerm(term);
    
    if (term.length < 2) {
      setSelectedVenue(null);
      setVenues([]);
      setShowDropdown(false);
    } else {
      // Only reset selected venue if user is actively changing the search
      if (selectedVenue && term !== selectedVenue.name) {
        setSelectedVenue(null);
      }
    }
  }, [selectedVenue]);

  const selectVenue = useCallback((venue: Venue) => {
    setSearchTerm(venue.name);
    setShowDropdown(false);
    setVenues([]);
    setSelectedVenue(venue);
  }, []);

  const showSearchDropdown = useCallback(() => {
    if (searchTerm.length >= 2 && 
        (!selectedVenue || searchTerm !== selectedVenue.name)) {
      setShowDropdown(true);
    }
  }, [searchTerm, selectedVenue]);

  const hideSearchDropdown = useCallback(() => {
    setTimeout(() => setShowDropdown(false), 150);
  }, []);

  return {
    searchTerm,
    venues,
    showDropdown,
    selectedVenue,
    setSearchTerm: handleSetSearchTerm,
    selectVenue,
    showSearchDropdown,
    hideSearchDropdown,
  };
};
