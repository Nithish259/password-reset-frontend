import axios from "axios";
import { createContext, useEffect, useState } from "react";

export const AppContext = createContext(null);

export const AppContextProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userData, setUserData] = useState(null);
  const backEndUrl = import.meta.env.VITE_BACKEND_URL;

  const getUserData = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return; // user is simply not logged in

      const { data } = await axios.get(`${backEndUrl}/api/user/data`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (data.status === "Success") {
        setUserData(data.data);
        setIsLoggedIn(true);
      } else {
        localStorage.removeItem("token");
      }
    } catch (error) {
      localStorage.removeItem("token");
    }
  };

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    getUserData();
  }, []);

  const value = {
    isLoggedIn,
    setIsLoggedIn,
    userData,
    setUserData,
    backEndUrl,
    getUserData,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};
