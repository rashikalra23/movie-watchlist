import { Card } from "antd";
import { WatchListItemModal } from "../../shared/modals/movie";
import { useAuth } from "../../context/AuthContext";
import { useState } from "react";
import Login from "../Auth/login";
import { CheckOutlined, MinusCircleOutlined } from "@ant-design/icons";
import AddToWatchListModal from "../Watchlist/AddToWatchlistModal";
import { getUserData, updateUserData } from "../../utils/storage";

interface MovieCardProps {
  movie: WatchListItemModal;
  origin: "watchlist" | "search";
  watchListId?: string;
  movId: string;
  setWatchList: Function;
}

const MovieCard: React.FC<MovieCardProps> = ({
  movie,
  origin,
  watchListId,
  movId,
  setWatchList,
}) => {
  const { Meta } = Card;
  const { Title, Year, Poster } = movie;
  const [isLoginModalOpen, setIsLoginModalOpen] = useState<boolean>(false);
  const [isWatchListModalOpen, setIsWatchListModalOpen] =
    useState<boolean>(false);
  const [isWatched, setIsWatched] = useState<boolean>(movie.isWatched);
  const { userEmail } = useAuth();

  //function to add a movie to the watchlist
  const addToWatchList = () => {
    // check if user is login -> if user is not login, they are asked to login first and then add movie to watchlist
    if (!userEmail) {
      setIsLoginModalOpen(true);
      return;
    }
    // open dialog to add to watch list
    setIsWatchListModalOpen(true);
  };

  const fetchUserData = () => {
    const userData = getUserData(userEmail);
    if (!userData || !userEmail) return null;
    return userData;
  };

  const removeFromWatchlist = () => {
    const userData = fetchUserData();
    if (!userEmail || !userData) return;
    if (watchListId == null) return;
    const currentWatchlist = userData.watchLists.find(
      (watchList) => watchList.id == watchListId
    );

    let indexToRemove: any = -1;
    indexToRemove = currentWatchlist?.watchListItems.findIndex(
      (obj) => obj.imdbID === movId
    );
    if (indexToRemove !== -1) {
      currentWatchlist?.watchListItems.splice(indexToRemove, 1);
    }
    // lifting state up (child  to parent call)
    setWatchList(currentWatchlist);
    updateUserData(userEmail, userData);
  };

  // function to update if a movie is watched or not
  const updateIsWatched = () => {
    setIsWatched(!isWatched);
  };

  return (
    <>
      <Card
        hoverable
        className="movie-card"
        cover={<img alt="example" src={Poster} className="movie-card-poster" />}
      >
        <Meta title={Title} description={Year} />
        {origin == "search" && (
          <button
            className="add-movie-to-watchlist-button"
            onClick={addToWatchList}
          >
            +
          </button>
        )}
        {origin == "watchlist" && (
          <>
            <button
              className="movie-watched-button"
              style={{
                background: isWatched ? "green" : "grey",
              }}
              onClick={() => updateIsWatched()}
            >
              <CheckOutlined className="check-icon" />
            </button>
            <button
              style={{
                position: "absolute",
                bottom: "0",
                right: "0",
                fontSize: "1.2rem",
              }}
              onClick={() => {
                removeFromWatchlist();
              }}
            >
              <MinusCircleOutlined />
            </button>
          </>
        )}
        <Login
          isModalOpen={isLoginModalOpen}
          setIsModalOpen={setIsLoginModalOpen}
        />
      </Card>
      <AddToWatchListModal
        isModalOpen={isWatchListModalOpen}
        setIsModalOpen={setIsWatchListModalOpen}
        movie={movie}
      />
    </>
  );
};

export default MovieCard;
