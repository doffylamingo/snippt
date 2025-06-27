export interface BaseSpotifyObject {
  external_urls: ExternalUrls;
  href: string;
  id: string;
  type: string;
  uri: string;
}

export interface BasePaginatedResponse<T> {
  href: string;
  limit: number;
  next: string | null;
  offset: number;
  previous: string | null;
  total: number;
  items: T[];
}

export interface BaseMediaObject extends BaseSpotifyObject {
  name: string;
  images: Image[];
}

export interface ExternalUrls {
  spotify: string;
}

export interface Image {
  url: string;
  height: number;
  width: number;
}

export interface ExternalIds {
  isrc?: string;
  ean?: string;
  upc?: string;
}

export interface Followers {
  href: string | null;
  total: number;
}

export interface Restrictions {
  reason: string;
}

export interface Artist extends BaseMediaObject {
  followers?: Followers;
  genres?: string[];
  popularity?: number;
}

export interface Album extends BaseMediaObject {
  album_type: string;
  total_tracks: number;
  available_markets: string[];
  release_date: string;
  release_date_precision: string;
  restrictions?: Restrictions;
  artists: Artist[];
  is_playable?: boolean;
}

export interface Track extends BaseSpotifyObject {
  album: Album;
  artists: Artist[];
  available_markets: string[];
  disc_number: number;
  duration_ms: number;
  explicit: boolean;
  external_ids: ExternalIds;
  is_playable: boolean;
  restrictions?: Restrictions;
  name: string;
  popularity: number;
  preview_url: string | null;
  track_number: number;
  is_local: boolean;
}

export interface Owner extends BaseSpotifyObject {
  display_name: string;
}

export interface User extends BaseSpotifyObject {
  country: string;
  display_name: string;
  email: string;
  explicit_content: ExplicitContent;
  followers: Followers;
  images: Image[];
  product: string;
}

export interface PlaylistItem extends BaseMediaObject {
  collaborative: boolean;
  description: string;
  owner: Owner;
  public: boolean;
  snapshot_id: string;
  tracks: TracksBasic;
}

export interface PlaylistTrackItem {
  added_at: string;
  added_by: AddedBy;
  is_local: boolean;
  track: Track;
}

export interface AddedBy extends BaseSpotifyObject {}

export interface TracksWithItems
  extends BasePaginatedResponse<PlaylistTrackItem> {}

export interface TracksBasic {
  href: string;
  total: number;
}

export interface PlaylistCreateResponse extends BaseMediaObject {
  collaborative: boolean;
  description: string;
  owner: Owner;
  public: boolean;
  snapshot_id: string;
  tracks: TracksWithItems;
}

export interface PlaylistResponse extends BasePaginatedResponse<PlaylistItem> {}

export interface TopArtistsResponse extends BasePaginatedResponse<Artist> {}

export interface TopTracksResponse extends BasePaginatedResponse<Track> {}

export interface PlaylistAddRemoveTracksResponse {
  snapshot_id: string;
}

export interface ExplicitContent {
  filter_enabled: boolean;
  filter_locked: boolean;
}

export interface BaseCursorPaginatedResponse<T> {
  href: string;
  limit: number;
  next: string | null;
  cursors: Cursors;
  total: number;
  items: T[];
}

export interface Cursors {
  after: string;
  before?: string;
}

export interface FollowingArtistsResponse {
  artists: BaseCursorPaginatedResponse<Artist>;
}

export interface SavedTrackItem {
  added_at: string;
  track: Track;
}

export interface SavedTracksResponse
  extends BasePaginatedResponse<SavedTrackItem> {}

export interface Seed {
  afterFilteringSize: number;
  afterRelinkingSize: number;
  href: string;
  id: string;
  initialPoolSize: number;
  type: string;
}

export interface RecommendationsResponse {
  seeds: Seed[];
  tracks: Track[];
}

export interface ArtistsResponse {
  artists: Artist[];
}
