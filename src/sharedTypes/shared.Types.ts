export interface TrackTypes {
  _id: number;
  name: string;
  author: string;
  release_date: number;
  genre: string[];
  duration_in_seconds: number;
  album: string;
  logo: null;
  track_file: string;
  stared_user: string[];
}

export interface FilterItemProps {
  items: string[];
  onSelectItem: (item: string) => void;
}

export interface FilterProps {
  data: TrackTypes[];
  // onFilterChange: (filters: {
  //   author?: string;
  //   genre?: string[];
  //   release_date?: number;
  // }) => void;
}
