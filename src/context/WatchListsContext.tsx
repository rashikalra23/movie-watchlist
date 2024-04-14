import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import { WatchListModal } from "../shared/modals/movie";
import { useAuth } from "./AuthContext";
import { getUserData } from "../utils/storage";

interface WatchListsContextProps {
  watchLists: WatchListModal[];
  updateWatchLists: () => void;
}

const WatchListsContext = createContext<WatchListsContextProps | null>(null);

const useWatchLists = () => {
  const context = useContext(WatchListsContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

const WatchListsProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const { userEmail } = useAuth();
  const [watchLists, setWatchLists] = useState<WatchListModal[]>([]);

  // fetching user data from local storage and updating watchlist
  const updateWatchLists = () => {
    const userData = getUserData(userEmail);
    setWatchLists(userData ? [...userData.watchLists] : []);
  };

  useEffect(() => {
    updateWatchLists();
  }, [userEmail]);

  return (
    <WatchListsContext.Provider value={{ watchLists, updateWatchLists }}>
      {children}
    </WatchListsContext.Provider>
  );
};
export { WatchListsProvider, useWatchLists, WatchListsContext };
