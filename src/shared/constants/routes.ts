import WatchlistPage from "../../pages/WatchlistPage";
import HomePage from "../../pages/home";

export const ROUTES: { path: string, element: React.ComponentType }[] = [
  {
    path: "",
    element: HomePage,
  },
  {
    path: "/watchlist/:id",
    element: WatchlistPage,
  },
];
