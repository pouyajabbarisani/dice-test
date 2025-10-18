import React from 'react';
import { Venue } from '../types';
import { useEvents } from '../hooks/useEvents';
import { Logo, SearchInput, EventList } from '../components';

export const HomePage: React.FC = () => {
  const { events, loading, loadingMore, error, hasMore, fetchEvents, loadMoreEvents } = useEvents();

  const handleVenueSelect = async (venue: Venue) => {
    await fetchEvents(venue.name);
  };

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-screen-xl mx-auto px-4 py-8">
        <Logo />
        <SearchInput onVenueSelect={handleVenueSelect} />
        <EventList 
          events={events} 
          loading={loading} 
          loadingMore={loadingMore}
          error={error}
          hasMore={hasMore}
          onLoadMore={loadMoreEvents}
        />
      </div>
    </div>
  );
};
