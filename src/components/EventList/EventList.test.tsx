import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { EventList } from './index';
import { Event } from '../../types';

const mockEvents: Event[] = [
  {
    id: '1',
    name: 'Event 1',
    date: '2025-12-25T20:00:00Z',
    venue: { name: 'Test Venue' },
    price: '£25'
  },
  {
    id: '2',
    name: 'Event 2',
    date: '2025-12-26T20:00:00Z',
    venue: { name: 'Test Venue' },
    price: '£30'
  }
];

const defaultProps = {
  events: [],
  loading: false,
  loadingMore: false,
  error: null,
  hasMore: false,
  onLoadMore: jest.fn(),
  hasSearched: false
};

describe('EventList', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('shows loading spinner when loading', () => {
    render(<EventList {...defaultProps} loading={true} />);
    
    expect(screen.getByText('Loading events...')).toBeInTheDocument();
    expect(screen.getByRole('status')).toBeInTheDocument(); // spinner has implicit status role
  });

  test('shows error message when error occurs', () => {
    const errorMessage = 'Failed to load events';
    render(<EventList {...defaultProps} error={errorMessage} />);
    
    expect(screen.getByText(errorMessage)).toBeInTheDocument();
    expect(screen.getByText(errorMessage)).toHaveClass('text-red-700');
  });

  test('shows nothing when no events and not searched', () => {
    const { container } = render(<EventList {...defaultProps} />);
    
    expect(container.firstChild).toBeNull();
  });

  test('shows "No events found" when no events and has searched', () => {
    render(<EventList {...defaultProps} hasSearched={true} />);
    
    expect(screen.getByText('No events found.')).toBeInTheDocument();
  });

  test('renders events in grid layout', () => {
    render(<EventList {...defaultProps} events={mockEvents} hasSearched={true} />);
    
    expect(screen.getByText('Upcoming events at Test Venue')).toBeInTheDocument();
    expect(screen.getByText('Event 1')).toBeInTheDocument();
    expect(screen.getByText('Event 2')).toBeInTheDocument();
    
    // Check grid layout
    const grid = screen.getByText('Event 1').closest('.grid');
    expect(grid).toHaveClass('grid-cols-1', 'md:grid-cols-2', 'lg:grid-cols-3');
  });

  test('shows load more button when hasMore is true', () => {
    render(
      <EventList 
        {...defaultProps} 
        events={mockEvents} 
        hasSearched={true}
        hasMore={true}
      />
    );
    
    const loadMoreButton = screen.getByRole('button', { name: /load more events/i });
    expect(loadMoreButton).toBeInTheDocument();
    expect(loadMoreButton).toBeEnabled();
  });

  test('calls onLoadMore when load more button is clicked', () => {
    const onLoadMore = jest.fn();
    render(
      <EventList 
        {...defaultProps} 
        events={mockEvents} 
        hasSearched={true}
        hasMore={true}
        onLoadMore={onLoadMore}
      />
    );
    
    const loadMoreButton = screen.getByRole('button', { name: /load more events/i });
    fireEvent.click(loadMoreButton);
    
    expect(onLoadMore).toHaveBeenCalledTimes(1);
  });

  test('shows loading spinner in load more button when loadingMore', () => {
    render(
      <EventList 
        {...defaultProps} 
        events={mockEvents} 
        hasSearched={true}
        hasMore={true}
        loadingMore={true}
      />
    );
    
    expect(screen.getByText('Loading more events...')).toBeInTheDocument();
    
    const loadMoreButton = screen.getByText('Loading more events...').closest('button');
    expect(loadMoreButton).toBeDisabled();
  });

  test('does not show load more button when hasMore is false', () => {
    render(
      <EventList 
        {...defaultProps} 
        events={mockEvents} 
        hasSearched={true}
        hasMore={false}
      />
    );
    
    expect(screen.queryByRole('button', { name: /load more events/i })).not.toBeInTheDocument();
  });

  test('header shows correct venue name from first event', () => {
    const eventsWithDifferentVenue = [
      { ...mockEvents[0], venue: { name: 'Special Venue' } }
    ];
    
    render(
      <EventList 
        {...defaultProps} 
        events={eventsWithDifferentVenue} 
        hasSearched={true}
      />
    );
    
    expect(screen.getByText('Upcoming events at Special Venue')).toBeInTheDocument();
  });

  test('renders multiple EventCard components for each event', () => {
    render(<EventList {...defaultProps} events={mockEvents} hasSearched={true} />);
    
    // Should render one EventCard for each event
    expect(screen.getByText('Event 1')).toBeInTheDocument();
    expect(screen.getByText('Event 2')).toBeInTheDocument();
    expect(screen.getByText('£25')).toBeInTheDocument();
    expect(screen.getByText('£30')).toBeInTheDocument();
  });
});
