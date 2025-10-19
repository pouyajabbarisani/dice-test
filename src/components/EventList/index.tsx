import React from 'react';
import { Event } from '../../types';
import { EventCard } from '../EventCard';

interface EventListProps {
  events: Event[];
  loading: boolean;
  loadingMore: boolean;
  error: string | null;
  hasMore: boolean;
  onLoadMore: () => void;
  hasSearched?: boolean;
}


export const EventList: React.FC<EventListProps> = ({ 
  events, 
  loading, 
  loadingMore, 
  error, 
  hasMore, 
  onLoadMore,
  hasSearched = false
}) => {
  if (loading) {
    return (
      <div className="flex justify-center items-center py-12">
        <div className="animate-spin rounded-full h-8 w-8 border-2 border-gray-300 border-t-blue-600" role="status" aria-label="Loading"></div>
        <span className="ml-2 text-gray-600">Loading events...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 p-4 text-red-700" role="alert">
        {error}
      </div>
    );
  }
  
  if (events.length === 0) {
    if (!hasSearched) {
      return null; // Don't show anything if no search has been performed
    }
    return (
      <div className="text-center py-12 text-gray-500">
        No events found.
      </div>
    );
  }

  return (
    <section className="space-y-8" aria-labelledby="events-heading">
      {/* Header */}
      <h2 id="events-heading" className="text-2xl font-normal text-gray-900">
        Upcoming events at {events[0].venue.name}
      </h2>
      
      <div 
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        role="list"
        aria-label={`${events.length} events found`}
      >
        {events.map((event) => (
          <div key={event.id} role="listitem">
            <EventCard event={event} />
          </div>
        ))}
      </div>

      {/* Load More Button */}
      {hasMore && (
        <div className="flex justify-center mt-8">
          <button
            onClick={onLoadMore}
            disabled={loadingMore}
            className="px-6 py-3 bg-blue-600 text-white font-medium hover:bg-blue-700 disabled:bg-blue-400 disabled:cursor-not-allowed transition-colors focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            aria-describedby={loadingMore ? "loading-more" : undefined}
          >
            {loadingMore ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent inline-block mr-2" aria-hidden="true"></div>
                <span id="loading-more">Loading more events...</span>
              </>
            ) : (
              'Load More Events'
            )}
          </button>
        </div>
      )}
    </section>
  );
};
