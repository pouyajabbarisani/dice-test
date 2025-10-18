export interface Venue {
  name: string;
}

export interface Event {
  id: string;
  name: string;
  date: string;
  venue: {
    name: string;
  };
}
