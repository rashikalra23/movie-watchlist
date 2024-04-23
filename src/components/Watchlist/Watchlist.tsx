import { Avatar, Modal } from "antd";
import { ArrowRightOutlined, DeleteOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import { WatchListModal } from "../../shared/modals/movie";
import { useState } from "react";
import { getUserData, updateUserData } from "../../utils/storage";
import { useNavigate } from "react-router-dom";

interface WatchlistProps {
  watchList: WatchListModal;
  userEmail: string | null;
  setDisplayWatchlists: Function;
}

const Watchlist: React.FC<WatchlistProps> = ({
  watchList,
  userEmail,
  setDisplayWatchlists,
}) => {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const showModal = () => {
    setOpen(true);
  };

  const goToHomeRoute = () => {
    navigate("/");
  };

  // function to delete watchlist
  const handleOk = () => {
    const userData = getUserData(userEmail);
    let indexToRemove: any = userData?.watchLists.findIndex(
      (obj) => obj.id === watchList.id
    );
    if (indexToRemove !== -1) {
      userData?.watchLists.splice(indexToRemove, 1);
    }
    if (userEmail !== null && userData !== null) {
      updateUserData(userEmail, userData);
      setDisplayWatchlists(userData.watchLists);
      goToHomeRoute();
    }
    setOpen(false);
  };

  const handleCancel = () => {
    setOpen(false);
  };

  return (
    <div className="list">
      <Avatar className="right-arrow" icon={<ArrowRightOutlined />} />
      <Link to={`/watchlist/${watchList.id}`} key={watchList.id}>
        <h4 className="watchlist-name">{watchList.watchListName}</h4>
      </Link>
      <Avatar
        className="delete-icon"
        onClick={showModal}
        icon={<DeleteOutlined />}
      />

      <Modal
        open={open}
        title="Confirmation"
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <p>
          Are you sure you want to delete the watchlist? If you click OK,{" "}
          <b>{watchList.watchListName}</b> watchlist and all the movies saved in
          it will be deleted.
        </p>
      </Modal>
    </div>
  );
};

export default Watchlist;
