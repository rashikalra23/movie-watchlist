import { Avatar } from "antd";
import { ArrowRightOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import { WatchListModal } from "../../shared/modals/movie";

interface WatchlistProps {
  watchList: WatchListModal;
}

const Watchlist: React.FC<WatchlistProps> = ({ watchList }) => {
  return (
    <div className="list">
      <Avatar className="right-arrow" icon={<ArrowRightOutlined />} />
      <Link to={`/watchlist/${watchList.id}`} key={watchList.id}>
        <h4 className="watchlist-name">{watchList.watchListName}</h4>
      </Link>
    </div>
  );
};

export default Watchlist;
