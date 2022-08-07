/* eslint-disable react/jsx-no-constructed-context-values */
import { createContext, useState } from "react";

const UserContext = createContext();

export function UserProvider({ children }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <UserContext.Provider value={{ isLoggedIn, setIsLoggedIn }}>
      {children}
    </UserContext.Provider>
  );
}

export default UserContext;
