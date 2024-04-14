import { Card } from "antd";
import { WatchListItemModal } from "../../shared/modals/movie";
import { useAuth } from "../../context/AuthContext";
import { useState } from "react";
import Login from "../Auth/login";
import { CheckOutlined } from "@ant-design/icons";
import AddToWatchListModal from "../Watchlist/AddToWatchlistModal";

interface MovieCardProps {
  movie: WatchListItemModal;
  origin: "watchlist" | "search";
  watchListId?: string;
}

const MovieCard: React.FC<MovieCardProps> = ({ movie, origin }) => {
  const { Meta } = Card;
  const { Title, Year, Poster } = movie;
  const [isLoginModalOpen, setIsLoginModalOpen] = useState<boolean>(false);
  const [isWatchListModalOpen, setIsWatchListModalOpen] = useState<boolean>(false);
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
          <button
            className="movie-watched-button"
            style={{
              background: isWatched ? "green" : "grey",
            }}
            onClick={() => updateIsWatched()}
          >
            <CheckOutlined className="check-icon" />
          </button>
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
