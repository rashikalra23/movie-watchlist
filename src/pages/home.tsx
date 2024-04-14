import MovieSearch from "../components/Movie/MovieSearch";

const HomePage = () => {
  return (
    <div className="home-content-page">
      <div className="welcome-home-box">
        <div className="main-heading-box">
          <h1> Welcome&nbsp;to</h1>
          <h1 className="watchlist-heading-box">&nbsp;Watchlists</h1>
        </div>
        <p className="para">
          Browse movies, add them to watchlists and share them with friends.
          <br></br>
          <br></br>
          Just click the plus icon on top left to add a movie to the watchlist
          and click on tick icon to mark the movie as watched.
        </p>
      </div>
      <br />
      <MovieSearch />
    </div>
  );
};

export default HomePage;
