import axios from 'axios';
import { Event } from '../types';

const API_BASE = process.env.REACT_APP_DICE_API_BASE_URL;
const API_KEY = process.env.REACT_APP_DICE_API_KEY;

interface EventsResponse {
  events: Event[];
  hasMore: boolean;
}

export const fetchEventsByVenue = async (
  venueName: string, 
  page: number = 1, 
  pageSize: number = 12
): Promise<EventsResponse> => {
  try {
    const response = await axios.get(`${API_BASE}/events`, {
      headers: {
        'x-api-key': API_KEY
      },
      params: {
        'filter[venues][]': venueName,
        'page[size]': pageSize,
        'page[number]': page
      }
    });

    const events = response.data.data?.map((event: any) => ({
      id: event.id,
      name: event.name || 'Unknown Event',
      date: event.date || '',
      venue: {
        name: event.venue || venueName,
      },
    })) || [];

    // Check if there's a next page URL in the links
    const hasMore = !!response.data.links?.next;

    return {
      events,
      hasMore,
    };
  } catch (error) {
    console.error('Failed to fetch events:', error);
    throw new Error('Unable to load events. Please try again.');
  }
};
