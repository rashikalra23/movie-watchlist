import { useParams } from "react-router-dom";
import { getUserData } from "../utils/storage";
import { useAuth } from "../context/AuthContext";
import { useEffect, useState } from "react";
import { WatchListModal } from "../shared/modals/movie";
import { Col, Divider, Row } from "antd";
import MovieCard from "../components/Movie/MovieCard";

const WatchlistPage: React.FC = () => {
  const { userEmail } = useAuth();
  const { id } = useParams();
  const [watchList, setWatchList] = useState<WatchListModal>(
    {} as WatchListModal
  );

  useEffect(() => {
    const userData = fetchUserData();
    const currentWatchlist = userData?.watchLists.find((wl) => wl.id == id);
    currentWatchlist && setWatchList(currentWatchlist);
  }, [id]);

  // fetching user data from local storage
  const fetchUserData = () => {
    const userData = getUserData(userEmail);
    if (!userData || !userEmail) return null;
    return userData;
  };

  return (
    <>
      <div className="watchlist-page-container">
        <Row>
          <Col span={24}>
            <h1 className="watchlist-heading-box">{watchList.watchListName}</h1>
            <Divider />
          </Col>
        </Row>
        <Row className="watchlist-movie-card-row">
          {watchList.watchListItems &&
            watchList.watchListItems.map((wl) => {
              return (
                <Col key={wl.imdbID} span={6} className="movie-card-column">
                  <MovieCard
                    movie={wl}
                    origin="watchlist"
                    watchListId={watchList.id}
                    movId={wl.imdbID}
                    setWatchList={setWatchList}
                  />
                </Col>
              );
            })}
        </Row>
      </div>
    </>
  );
};

export default WatchlistPage;
