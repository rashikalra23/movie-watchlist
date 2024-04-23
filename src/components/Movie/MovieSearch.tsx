import { Button, Col, Input, Row } from "antd";
import MovieCard from "./MovieCard";
import {
  BaseMovieSearchApiModel,
  MovieApiModel,
  WatchListItemModal,
} from "../../shared/modals/movie";
import { useState } from "react";
import { MovieService } from "../../shared/services/movieService";
import NoData from "../../pages/NoData";

const MovieSearch = () => {
  const [searchText, setSearchText] = useState<string>("");
  const [searchedMovies, setSearchedMovies] = useState<MovieApiModel[]>([]);
  const [showNoDataPage, setShowNoDataPage] = useState<Boolean>(false);

  // API call to get movies data
  const getSearchedMovies = async (
    searchedText: string
  ): Promise<MovieApiModel[]> => {
    if (searchedText && searchedText.trim()) {
      const movies = await MovieService.getMoviesBySearchText(searchedText);
      if (movies.data.data.Error) {
        setShowNoDataPage(true);
      }
      if (movies && movies.data && movies.data.data) {
        const searchedMovies =
          (movies.data.data as BaseMovieSearchApiModel).Search ?? [];
        return searchedMovies;
      }
    }
    return [];
  };

  //function to search movies
  const handleSearch = async () => {
    if (searchText && searchText.trim()) {
      const movies = await getSearchedMovies(searchText);
      setSearchedMovies(movies);
    } else {
      setSearchedMovies([]);
      setSearchText("");
    }
  };

  const getWatchListItemObj = (movie: MovieApiModel) => {
    return {
      ...movie,
      isWatched: false,
    } as WatchListItemModal;
  };
  return (
    <>
      <div className="search-box">
        <Input
          placeholder="Enter Movie Name"
          type="text"
          value={searchText}
          onChange={(e) =>
            setSearchText(e.target.value?.toString().toLowerCase())
          }
        />
        <Button onClick={handleSearch}>Search</Button>
      </div>
      <br />
      {showNoDataPage && <NoData />}
      <Row className="movie-card-row" gutter={16}>
        {searchedMovies.map((movie) => {
          return (
            <Col span={6} className="movie-card-column" key={movie.imdbID}>
              <MovieCard
                movie={getWatchListItemObj(movie)}
                origin="search"
                watchListId="null"
                movId={movie.imdbID}
                setWatchList={() => {}}
              />
            </Col>
          );
        })}
      </Row>
    </>
  );
};

export default MovieSearch;
