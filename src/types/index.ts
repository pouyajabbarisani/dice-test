export interface Venue {
  name: string;
}

export interface Event {
  id: string;
  name: string;
  date: string;
  venue: {
    name: string;
    location?: string;
  };
  image?: string;
  price?: string;
  description?: string;
  soldOut?: boolean;
  apple_music_tracks?: Array<{
    title: string;
    open_url: string;
    preview_url?: string;
  }>;
  spotify_tracks?: Array<{
    title: string;
    open_url: string;
    preview_url?: string;
  }>;
}
