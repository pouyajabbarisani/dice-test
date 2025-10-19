import { useState, useCallback } from 'react';
import { Event } from '../types';
import { fetchEventsByVenue } from '../services/api';

export const useEvents = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(false);
  const [loadingMore, setLoadingMore] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [hasMore, setHasMore] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [currentVenue, setCurrentVenue] = useState<string>('');

  const fetchEvents = useCallback(async (venueName: string) => {
    setLoading(true);
    setError(null);
    setCurrentPage(1);
    setCurrentVenue(venueName);

    try {
      const response = await fetchEventsByVenue(venueName, 1, 12);
      setEvents(response.events);
      setHasMore(response.hasMore);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load events');
      setEvents([]);
      setHasMore(false);
    } finally {
      setLoading(false);
    }
  }, []);

  const loadMoreEvents = useCallback(async () => {
    if (!currentVenue || loadingMore || !hasMore) return;

    setLoadingMore(true);
    const nextPage = currentPage + 1;

    try {
      const response = await fetchEventsByVenue(currentVenue, nextPage, 12);
      setEvents(prevEvents => [...prevEvents, ...response.events]);
      setHasMore(response.hasMore);
      setCurrentPage(nextPage);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load more events');
    } finally {
      setLoadingMore(false);
    }
  }, [currentVenue, currentPage, loadingMore, hasMore]);

  return { 
    events, 
    loading, 
    loadingMore, 
    error, 
    hasMore, 
    fetchEvents, 
    loadMoreEvents,
    hasSearched: !!currentVenue
  };
};
