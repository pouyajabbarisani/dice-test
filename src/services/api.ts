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
        name: event.venue?.name || event.venue || venueName,
        location: event.location,
      },
      image: event.images?.[0] || event.event_images?.landscape || event.event_images?.square,
      price: event.ticket_types?.[0]?.price ? `£${(event.ticket_types[0].price.face_value / 100).toFixed(0)}` : null,
      description: event.description || event.raw_description,
      sold_out: event.sold_out || false,
      apple_music_tracks: event.apple_music_tracks || [],
      spotify_tracks: event.spotify_tracks || [],
      status: event.status,
      sale_start_date: event.sale_start_date,
      sale_end_date: event.sale_end_date,
      featured: event.featured || false,
      lineup: event.lineup || [],
      ticket_types: event.ticket_types || [],
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
