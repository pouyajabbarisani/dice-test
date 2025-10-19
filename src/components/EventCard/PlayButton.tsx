import React, { useState, useEffect, useMemo } from 'react';

interface Track {
  title: string;
  open_url: string;
  preview_url?: string;
}

interface PlayButtonProps {
  apple_music_tracks?: Track[];
  spotify_tracks?: Track[];
  className?: string;
}

export const PlayButton: React.FC<PlayButtonProps> = React.memo(({ 
  apple_music_tracks = [], 
  spotify_tracks = [], 
  className = "" 
}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [audio, setAudio] = useState<HTMLAudioElement | null>(null);

  // Only memoize expensive array operations
  const hasAudioTracks = useMemo(() => {
    const hasAppleMusic = apple_music_tracks.length > 0 && 
      apple_music_tracks.some(track => track.preview_url);
    const hasSpotify = spotify_tracks.length > 0 && 
      spotify_tracks.some(track => track.preview_url);
    return hasAppleMusic || hasSpotify;
  }, [apple_music_tracks, spotify_tracks]);

  const getPreviewUrl = (): string | null => {
    const spotifyTrack = spotify_tracks.find(track => track.preview_url);
    if (spotifyTrack?.preview_url) {
      return spotifyTrack.preview_url;
    }

    // if spotify not available, try apple music
    const appleTrack = apple_music_tracks.find(track => track.preview_url);
    if (appleTrack?.preview_url) {
      return appleTrack.preview_url;
    }
    
    return null;
  };

  const handlePlayPause = () => {
    const previewUrl = getPreviewUrl();
    if (!previewUrl) return;

    if (isPlaying && audio) {
      // Pause
      audio.pause();
      setIsPlaying(false);
    } else {
      
      // Stop
      if (audio) {
        audio.pause();
        audio.currentTime = 0;
      }
      
      // Create and play
      const newAudio = new Audio(previewUrl);
      newAudio.volume = 0.7; // Set volume to 70%
      
      newAudio.onended = () => {
        setIsPlaying(false);
        setAudio(null);
      };
      
      newAudio.onerror = () => {
        setIsPlaying(false);
        setAudio(null);
        console.error('Failed to play audio preview');
      };
      
      newAudio.play().then(() => {
        setIsPlaying(true);
        setAudio(newAudio);
      }).catch((error) => {
        console.error('Play failed:', error);
        setIsPlaying(false);
        setAudio(null);
      });
    }
  };

  useEffect(() => {
    return () => {
      if (audio) {
        audio.pause();
        setAudio(null);
      }
    };
  }, [audio]);

  if (!hasAudioTracks) {
    return null;
  }

  return (
    <button 
      className={`absolute bottom-0 left-0 w-[50px] h-[50px] bg-black bg-opacity-50 flex items-center justify-center cursor-pointer hover:bg-opacity-70 transition-opacity ${className}`}
      onClick={handlePlayPause}
      aria-label={isPlaying ? 'Pause audio' : 'Play audio'}
    >
      {isPlaying ? (
        // Pause
        <svg 
          width="28" 
          height="28" 
          viewBox="0 0 24 24" 
          fill="white"
        >
          <path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z"/>
        </svg>
      ) : (
        // Play
        <svg 
          width="28" 
          height="28" 
          viewBox="0 0 24 24" 
          fill="white"
          className="ml-0.5"
        >
          <path d="M8 5v14l11-7z"/>
        </svg>
      )}
    </button>
  );
});
