import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { EventCard } from './index';
import { Event } from '../../types';

const mockEvent: Event = {
  id: '1',
  name: 'Test Event',
  date: '2025-12-25T20:00:00Z',
  venue: {
    name: 'Test Venue',
    location: {
      city: 'London',
      country: 'United Kingdom'
    }
  },
  image: 'https://example.com/image.jpg',
  price: '£25',
  description: 'This is a test event description.',
  sold_out: false,
  apple_music_tracks: [],
  spotify_tracks: [],
  status: 'on-sale',
  sale_start_date: '2025-01-01T10:00:00Z',
  sale_end_date: '2025-12-25T19:00:00Z',
  featured: false,
  lineup: [
    { details: 'Doors open', time: '7:00 PM' },
    { details: 'Main Act' }
  ],
  ticket_types: [
    {
      id: 1,
      name: 'General Admission',
      price: { face_value: 2500, total: 2750, fees: 250 },
      sold_out: false
    },
    {
      id: 2,
      name: 'VIP',
      price: { face_value: 5000, total: 5500, fees: 500 },
      sold_out: true
    }
  ]
};

describe('EventCard', () => {
  test('renders basic event information', () => {
    render(<EventCard event={mockEvent} />);
    
    expect(screen.getByText('Test Event')).toBeInTheDocument();
    expect(screen.getByText('Test Venue')).toBeInTheDocument();
    expect(screen.getByText('London, UK')).toBeInTheDocument();
    expect(screen.getByText('£25')).toBeInTheDocument();
  });

  test('formats date correctly', () => {
    render(<EventCard event={mockEvent} />);
    
    // The date should be formatted as "Thu 25 Dec - 8:00 pm" (note: space before pm)
    expect(screen.getByText(/Thu 25 Dec - 8:00 pm/)).toBeInTheDocument();
  });

  test('shows GET REMINDED button when not sold out', () => {
    render(<EventCard event={mockEvent} />);
    
    const button = screen.getByRole('button', { name: /get reminded/i });
    expect(button).toBeInTheDocument();
    expect(button).toBeEnabled();
    expect(button).toHaveStyle('backgroundColor: rgb(60, 116, 255)');
  });

  test('shows SOLD OUT button when sold out', () => {
    const soldOutEvent = { ...mockEvent, sold_out: true };
    render(<EventCard event={soldOutEvent} />);
    
    const button = screen.getByRole('button', { name: /sold out/i });
    expect(button).toBeInTheDocument();
    expect(button).toBeDisabled();
  });

  test('displays image with correct Imgix parameters', () => {
    render(<EventCard event={mockEvent} />);
    
    const image = screen.getByAltText('Test Event');
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute('src', expect.stringContaining('w=400'));
    expect(image).toHaveAttribute('src', expect.stringContaining('h=400'));
    expect(image).toHaveAttribute('src', expect.stringContaining('fit=crop'));
  });

  test('expands and collapses more info section', async () => {
    render(<EventCard event={mockEvent} />);
    
    const moreInfoButton = screen.getByRole('button', { name: /more info/i });
    expect(screen.queryByText('This is a test event description.')).not.toBeInTheDocument();
    
    fireEvent.click(moreInfoButton);
    
    await waitFor(() => {
      expect(screen.getByText('This is a test event description.')).toBeInTheDocument();
    });
    
    fireEvent.click(moreInfoButton);
    
    await waitFor(() => {
      expect(screen.queryByText('This is a test event description.')).not.toBeInTheDocument();
    });
  });

  test('displays lineup information when expanded', async () => {
    render(<EventCard event={mockEvent} />);
    
    const moreInfoButton = screen.getByRole('button', { name: /more info/i });
    fireEvent.click(moreInfoButton);
    
    await waitFor(() => {
      expect(screen.getByText('LINE UP')).toBeInTheDocument();
      expect(screen.getByText((content, element) => 
        content.includes('Doors open') && content.includes('-')
      )).toBeInTheDocument();
      expect(screen.getByText('7:00 PM')).toBeInTheDocument();
      expect(screen.getByText('Main Act')).toBeInTheDocument();
    });
  });

  test('displays ticket information when expanded', async () => {
    render(<EventCard event={mockEvent} />);
    
    const moreInfoButton = screen.getByRole('button', { name: /more info/i });
    fireEvent.click(moreInfoButton);
    
    await waitFor(() => {
      expect(screen.getByText('TICKETS')).toBeInTheDocument();
      expect(screen.getByText((content, element) => 
        content.includes('General Admission') && content.includes('-')
      )).toBeInTheDocument();
      expect(screen.getByText((content, element) => 
        content.includes('VIP') && content.includes('-')
      )).toBeInTheDocument();
      expect(screen.getAllByText('£25')).toHaveLength(2); // One in tickets, one as main price
      expect(screen.getByText('£50')).toBeInTheDocument();
      expect(screen.getByText('SOLD OUT')).toBeInTheDocument();
    });
  });

  test('handles missing optional data gracefully', () => {
    const minimalEvent: Event = {
      id: '1',
      name: 'Minimal Event',
      date: '2025-12-25T20:00:00Z',
      venue: { name: 'Test Venue' }
    };
    
    render(<EventCard event={minimalEvent} />);
    
    expect(screen.getByText('Minimal Event')).toBeInTheDocument();
    expect(screen.getByText('Test Venue')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /get reminded/i })).toBeInTheDocument();
  });

  test('does not render PlayButton when no audio tracks', () => {
    render(<EventCard event={mockEvent} />);
    
    // PlayButton should not be rendered since there are no audio tracks
    expect(screen.queryByRole('button', { name: /play/i })).not.toBeInTheDocument();
  });

  test('renders PlayButton when audio tracks are available', () => {
    const eventWithAudio = {
      ...mockEvent,
      spotify_tracks: [
        {
          title: 'Test Track',
          open_url: 'https://spotify.com/track/1',
          preview_url: 'https://spotify.com/preview/1'
        }
      ]
    };
    
    render(<EventCard event={eventWithAudio} />);
    
    // PlayButton should be rendered since there are audio tracks
    const playButton = screen.getByRole('button', { name: /play audio/i });
    expect(playButton).toBeInTheDocument();
  });

  test('shows featured indicator when event is featured', () => {
    const featuredEvent = { ...mockEvent, featured: true };
    render(<EventCard event={featuredEvent} />);
    
    expect(screen.getByText('FEATURED')).toBeInTheDocument();
  });

  test('does not show featured indicator when event is not featured', () => {
    render(<EventCard event={mockEvent} />);
    
    expect(screen.queryByText('FEATURED')).not.toBeInTheDocument();
  });
});
