import React, { useEffect, useState } from "react";
import { getUserData } from "../../utils/storage";
import { useAuth } from "../../context/AuthContext";
import {
  Avatar,
  Button,
  Divider,
  Dropdown,
  MenuProps,
  Space,
  message,
} from "antd";
import { UserOutlined } from "@ant-design/icons";
import Login from "../Auth/login";
import { Link } from "react-router-dom";
import { useWatchLists } from "../../context/WatchListsContext";
import Watchlist from "./Watchlist";
import { WatchListModal } from "../../shared/modals/movie";

const WatchlistPanel: React.FC = () => {
  const [userLabel, setUserLabel] = useState<string>("GUEST");
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [messageApi, contextHolder] = message.useMessage();
  const { watchLists: userWatchLists } = useWatchLists();
  const [displayWatchLists, setDisplayWatchlists] =
    useState<WatchListModal[]>(userWatchLists);

  const loginMenuItem = {
    items: [
      {
        label: "Login",
        key: "1",
      },
    ],
    onClick: () => {
      setIsModalOpen(true);
    },
  };
  const logoutMenuItem = {
    items: [
      {
        label: "Logout",
        key: "1",
      },
    ],
    onClick: () => {
      handleLogout();
    },
  };
  const [menuItem, setMenuItem] = useState<{
    items: MenuProps["items"];
    onClick: MenuProps["onClick"];
  }>(loginMenuItem);

  const { userEmail, logoutUser } = useAuth();

  // fetching user email from local storage and setting user label on UI
  const onEmailChange = () => {
    const userData = getUserData(userEmail);
    setUserLabel(userData?.username ?? "GUEST");
    setMenuItem(userEmail ? logoutMenuItem : loginMenuItem);
  };

  useEffect(() => {
    onEmailChange();
    setDisplayWatchlists(userWatchLists);
  }, [userEmail, userWatchLists]);

  const handleLogout = () => {
    messageApi.open({
      type: "success",
      content: "You are logged out successfully",
    });
    logoutUser();
    setIsModalOpen(false);
  };

  return (
    <div>
      {contextHolder}
      <h1 className="watchlists-panel-heading"> Watchlists </h1>
      <br />
      <Link to={`/`}>
        <Button type="primary" size="large" className="home-button">
          Home
        </Button>
      </Link>
      <Divider />
      <h3 className="my-list-heading">My Lists</h3> <br />
      <div className="my-list-container">
        {displayWatchLists.map((watchList) => (
          <Watchlist
            key={watchList.id}
            watchList={watchList}
            userEmail={userEmail}
            setDisplayWatchlists={setDisplayWatchlists}
          />
        ))}
      </div>
      <Login isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} />
      <div className="login-container">
        <Avatar icon={<UserOutlined />} className="user-icon" />
        <label className="user-label"> {userLabel} </label>
        <Dropdown menu={menuItem}>
          <a onClick={(e) => e.preventDefault()}>
            <Space style={{ color: "black" }}>&#x2022; &#x2022; &#x2022;</Space>
          </a>
        </Dropdown>
      </div>
    </div>
  );
};

export default WatchlistPanel;
