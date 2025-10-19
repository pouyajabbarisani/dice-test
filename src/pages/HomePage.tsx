import React from 'react';
import { Venue } from '../types';
import { useEvents } from '../hooks/useEvents';
import { Logo, SearchInput, EventList } from '../components';

export const HomePage: React.FC = () => {
  const { events, loading, loadingMore, error, hasMore, fetchEvents, loadMoreEvents, hasSearched } = useEvents();

  const handleVenueSelect = async (venue: Venue) => {
    await fetchEvents(venue.name);
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Skip to main content link */}
      <a 
        href="#main-content" 
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 bg-blue-600 text-white px-4 py-2 z-50"
      >
        Skip to main content
      </a>
      
      <div className="max-w-screen-lg mx-auto px-4 py-8">
        <header>
          <Logo />
          <h1 className="sr-only">Event Search - Find Events by Venue</h1>
        </header>
        
        <main id="main-content">
          <SearchInput onVenueSelect={handleVenueSelect} />
          <EventList 
            events={events} 
            loading={loading} 
            loadingMore={loadingMore}
            error={error}
            hasMore={hasMore}
            onLoadMore={loadMoreEvents}
            hasSearched={hasSearched}
          />
        </main>
      </div>
    </div>
  );
};
