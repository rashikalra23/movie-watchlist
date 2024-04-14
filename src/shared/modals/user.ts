import { WatchListModal } from "./movie";

export interface UserModal {
  email: string;
  username: string;
}

export interface LocalStorageUserModal {
  email: string;
  username: string;
  watchLists: WatchListModal[];
}
