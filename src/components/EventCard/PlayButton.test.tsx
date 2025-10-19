import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { PlayButton } from './PlayButton';

const mockSpotifyTracks = [
  {
    title: 'Test Track',
    open_url: 'https://open.spotify.com/track/test',
    preview_url: 'https://preview.spotify.com/test.mp3'
  }
];

const mockAppleTracks = [
  {
    title: 'Apple Track',
    open_url: 'https://music.apple.com/track/test',
    preview_url: 'https://preview.apple.com/test.mp3'
  }
];

describe('PlayButton', () => {
  test('does not render when no audio tracks are available', () => {
    const { container } = render(
      <PlayButton apple_music_tracks={[]} spotify_tracks={[]} />
    );
    
    expect(container.firstChild).toBeNull();
  });

  test('does not render when tracks have no preview_url', () => {
    const tracksWithoutPreview = [
      {
        title: 'No Preview',
        open_url: 'https://spotify.com/track/test',
        // no preview_url
      }
    ];
    
    const { container } = render(
      <PlayButton 
        apple_music_tracks={[]} 
        spotify_tracks={tracksWithoutPreview} 
      />
    );
    
    expect(container.firstChild).toBeNull();
  });

  test('renders play button when Spotify tracks are available', () => {
    render(
      <PlayButton 
        apple_music_tracks={[]} 
        spotify_tracks={mockSpotifyTracks} 
      />
    );
    
    const button = screen.getByRole('button', { name: /play audio/i });
    expect(button).toBeInTheDocument();
    expect(button).toHaveClass('w-[50px]', 'h-[50px]', 'absolute', 'bottom-0', 'left-0');
  });

  test('renders play button when Apple Music tracks are available', () => {
    render(
      <PlayButton 
        apple_music_tracks={mockAppleTracks} 
        spotify_tracks={[]} 
      />
    );
    
    const button = screen.getByRole('button', { name: /play audio/i });
    expect(button).toBeInTheDocument();
  });

  test('shows play icon initially', () => {
    render(
      <PlayButton 
        apple_music_tracks={[]} 
        spotify_tracks={mockSpotifyTracks} 
      />
    );
    
    // Check that play icon is present
    const button = screen.getByRole('button', { name: /play audio/i });
    const playIcon = button.querySelector('path[d="M8 5v14l11-7z"]');
    expect(playIcon).toBeInTheDocument();
  });

  test('applies custom className', () => {
    render(
      <PlayButton 
        apple_music_tracks={[]} 
        spotify_tracks={mockSpotifyTracks}
        className="custom-class"
      />
    );
    
    const button = screen.getByRole('button', { name: /play audio/i });
    expect(button).toHaveClass('custom-class');
  });
});