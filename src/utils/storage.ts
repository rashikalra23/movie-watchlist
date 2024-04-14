// utils/storage.ts

import { LocalStorageUserModal } from "../shared/modals/user";

export const getUserData = (
  email: string | null
): LocalStorageUserModal | null => {
  const userData = email ? localStorage.getItem(email) : null;
  return userData ? JSON.parse(userData) : null;
};

export const updateUserData = (
  email: string,
  data: LocalStorageUserModal
): void => {
  localStorage.setItem(email, JSON.stringify(data));
};
