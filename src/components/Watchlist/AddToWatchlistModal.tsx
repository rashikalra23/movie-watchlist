import { Button, Checkbox, Col, Form, Input, Modal, Row } from "antd";
import {
  MovieApiModel,
  WatchListItemModal,
  WatchListModal,
} from "../../shared/modals/movie";
import guid from "../../utils/guid-generator";
import { getUserData, updateUserData } from "../../utils/storage";
import { useAuth } from "../../context/AuthContext";
import { useEffect, useState } from "react";
import { useWatchLists } from "../../context/WatchListsContext";

interface WatchlistReactProps {
  isModalOpen: boolean;
  setIsModalOpen: any;
  movie: MovieApiModel;
}

interface UserWatchListsClientSide extends WatchListModal {
  isSelected: boolean;
}

const AddToWatchListModal: React.FC<WatchlistReactProps> = ({
  isModalOpen,
  setIsModalOpen,
  movie,
}) => {
  const { userEmail } = useAuth();
  const [showAddWatchListInput, setShowAddWatchListInput] =
    useState<boolean>(false);
  const [newWatchListName, setNewWatchListName] = useState<string>("");
  const [watchLists, setWatchLists] = useState<UserWatchListsClientSide[]>([]);
  const { updateWatchLists } = useWatchLists();

  const fetchUserData = () => {
    const userData = getUserData(userEmail);
    if (!userData || !userEmail) return null;
    return userData;
  };

  useEffect(() => {
    // fetch user data if user is login and show list of watchlists associated with their account
    const userData = fetchUserData();
    userData &&
      setWatchLists(
        [...userData.watchLists].map((wl) => {
          return {
            ...wl,
            isSelected: false,
          };
        })
      );
  }, []);

  const getWatchListObj = (name: string) => {
    return {
      id: guid(),
      watchListName: name,
      watchListItems: [],
    } as WatchListModal;
  };

  // function to add new watchlist to user's profile
  const addWatchListToUserData = (name: string) => {
    if (!name) return;
    const userData = fetchUserData();
    if (!userEmail || !userData) return;
    userData.watchLists = [...userData.watchLists, getWatchListObj(name)];
    setWatchLists(
      [...userData.watchLists].map((wl) => {
        return {
          ...wl,
          isSelected: false,
        };
      })
    );
    updateUserData(userEmail, userData);
    updateWatchLists();
    setNewWatchListName("");
  };

  // function to add the movie to the checked watchlists
  const addToSelectedWatchLists = () => {
    const userData = fetchUserData();
    if (!userEmail || !userData) return;
    watchLists
      .filter((wl) => wl.isSelected == true)
      .forEach((selectedWL) => {
        addItemToWatchList(selectedWL.id, movie, userData.watchLists); // pass by reference
        updateUserData(userEmail, userData);
      });
    setIsModalOpen(false);
  };

  const addItemToWatchList = (
    watchListId: string,
    movie: MovieApiModel,
    userWatchLists: WatchListModal[]
  ) => {
    const currentWatchlist = userWatchLists.find(
      (watchList) => watchList.id == watchListId
    );
    if (!currentWatchlist) return;
    const watchListItemObj = {
      ...movie,
      isWatched: false,
    } as WatchListItemModal;
    currentWatchlist.watchListItems.push(watchListItemObj);
  };

  const updateIsSelected = (
    updatedValue: boolean,
    watchList: UserWatchListsClientSide
  ) => {
    watchList.isSelected = updatedValue;
  };

  return (
    <>
      <Modal
        open={isModalOpen}
        okText="Save"
        onOk={() => addToSelectedWatchLists()}
        onCancel={() => setIsModalOpen(false)}
        title="Add To Watchlist"
      >
        <Row>
          <Col className="create-watchlist" span={24}>
            <a
              className="create-watchlist-link"
              onClick={() => setShowAddWatchListInput(!showAddWatchListInput)}
            >
              Create new watchlist
            </a>
          </Col>
          <Col span={24}>
            {showAddWatchListInput && (
              <Row>
                <Col span={20}>
                  <Form.Item label="New Watchlist Name">
                    <Input
                      placeholder="Enter Watchlist Name"
                      value={newWatchListName}
                      onChange={(e) => setNewWatchListName(e.target.value)}
                    />
                  </Form.Item>
                </Col>
                <Col className="save-watchlist-button" span={4}>
                  <Button
                    type="primary"
                    onClick={() => addWatchListToUserData(newWatchListName)}
                  >
                    Save
                  </Button>
                </Col>
              </Row>
            )}
          </Col>
        </Row>

        <h4> List of WatchList </h4>
        <Row className="list-of-watchlists">
          {watchLists.map((watchlist) => {
            return (
              <Col key={watchlist.id} span={24}>
                <Checkbox
                  onChange={(e) =>
                    updateIsSelected(e.target.checked, watchlist)
                  }
                >
                  {watchlist.watchListName}
                </Checkbox>
              </Col>
            );
          })}
        </Row>
      </Modal>
    </>
  );
};

export default AddToWatchListModal;
