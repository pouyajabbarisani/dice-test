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
  sold_out?: boolean;
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
  status?: string;
  sale_start_date?: string;
  sale_end_date?: string;
  featured?: boolean;
  lineup?: Array<{
    details: string;
    time?: string;
  }>;
  ticket_types?: Array<{
    id: number;
    name: string;
    price: {
      face_value: number;
      total: number;
      fees: number;
    };
    sold_out: boolean;
  }>;
}
