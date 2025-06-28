export interface Recommendations {
  track: Track;
  artist: Artist;
  album: Album;
  liked: boolean;
  isFollowing: boolean;
}

export interface Track {
  id: string;
  name: string;
  duration_ms: number;
  preview_url: string;
}

export interface Artist {
  id: string;
  name: string;
  genres: string[];
  followers: string;
  image: string;
}

export interface Album {
  cover: string;
  id: string;
  name: string;
  release_date: string;
  total_tracks: number;
  type: string;
}
