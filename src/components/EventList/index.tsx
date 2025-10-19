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
}


export const EventList: React.FC<EventListProps> = ({ 
  events, 
  loading, 
  loadingMore, 
  error, 
  hasMore, 
  onLoadMore 
}) => {
  if (loading) {
    return (
      <div className="flex justify-center items-center py-12">
        <div className="animate-spin h-8 w-8 border-b-2 border-blue-600"></div>
        <span className="ml-2 text-gray-600">Loading events...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 p-4 text-red-700">
        {error}
      </div>
    );
  }
  
  if (events.length === 0) {
    return (
      <div className="text-center py-12 text-gray-500">
        No events found.
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <h2 className="text-2xl font-black text-gray-900">
        Upcoming events at {events[0].venue.name}
      </h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {events.map((event) => (
          <EventCard key={event.id} event={event} />
        ))}
      </div>

      {/* Load More Button */}
      {hasMore && (
        <div className="flex justify-center mt-8">
          <button
            onClick={onLoadMore}
            disabled={loadingMore}
            className="px-6 py-3 bg-blue-600 text-white font-medium hover:bg-blue-700 disabled:bg-blue-400 disabled:cursor-not-allowed transition-colors"
          >
            {loadingMore ? (
              <>
                <div className="animate-spin h-4 w-4 border-b-2 border-white inline-block mr-2"></div>
                Loading...
              </>
            ) : (
              'Load More Events'
            )}
          </button>
        </div>
      )}
    </div>
  );
};
