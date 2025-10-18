import React from 'react';
import { Event } from '../../types';

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
    return <div>Loading events...</div>
  }

  if (error) {
    return <div>{error}</div>
  }
  
  if (events.length === 0) {
    return <div />
  }

  return (
    <div>
      <h2>
        Upcoming events at {events[0].venue.name}
      </h2>
      
        {events.map((event) => (
            <h3>{event.name}</h3>
        ))}

      {hasMore && (
          <button
            onClick={onLoadMore}
            disabled={loadingMore}
          >
            {loadingMore ? 'Loading...' : 'Load More'}
          </button>
      )}
    </div>
  );
};
