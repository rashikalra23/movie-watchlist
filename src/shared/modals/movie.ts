export interface MovieApiModel {
  Title: string;
  Year: string;
  imdbID: string;
  Type: string;
  Poster: string;
}

export interface BaseMovieSearchApiModel {
  Search: MovieApiModel[];
  totalResults: number;
  Response: string;
}

export interface WatchListItemModal extends MovieApiModel {
  isWatched: boolean;
}

export interface WatchListModal {
  id: string;
  watchListName: string;
  watchListItems: WatchListItemModal[];
}
