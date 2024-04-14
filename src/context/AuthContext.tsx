import React, { createContext, useState, useContext, ReactNode } from "react";
import { getUserData, updateUserData } from "../utils/storage";
import guid from "../utils/guid-generator";
import { LocalStorageUserModal } from "../shared/modals/user";

interface AuthContextProps {
  loginUser: (email: string, name: string) => void;
  logoutUser: () => void;
  userEmail: string | null;
}

const AuthContext = createContext<AuthContextProps | null>(null);

const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [userEmail, setUserEmail] = useState<string | null>(null);

  // fetching user data from local storage
  // if user is not login, then updating his data in local storage
  const loginUser = (email: string, name: string) => {
    const userData = getUserData(email);
    if (!userData) {
      const userModel = {
        email,
        id: guid(),
        username: name ?? "Guest",
        watchLists: [],
      } as LocalStorageUserModal;
      updateUserData(email, userModel);
    }
    setUserEmail(email);
  };

  // setting user email as null when they logout
  const logoutUser = () => {
    setUserEmail(null);
    window.location.href = "/";
  };

  return (
    <AuthContext.Provider value={{ loginUser, logoutUser, userEmail }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthProvider, useAuth, AuthContext };
