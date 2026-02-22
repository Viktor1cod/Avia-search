export type Segment = {
  origin: string;
  destination: string;
  date: string; // ISO
  duration: number; // minutes
  stops: string[];
};

export type Ticket = {
  id: string;
  price: number;
  carrier: string;
  segments: Segment[];
};

export type SortType = "cheap" | "fast";