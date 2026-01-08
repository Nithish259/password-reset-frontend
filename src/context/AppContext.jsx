import axios from "axios";
import { createContext, useEffect, useState } from "react";
import { toast } from "react-toastify";

// eslint-disable-next-line react-refresh/only-export-components
export const AppContext = createContext(null);

export const AppContextProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userData, setUserData] = useState("");
  const backEndUrl = import.meta.env.VITE_BACKEND_URL;

  const getUserData = async () => {
    axios.defaults.withCredentials = true;
    try {
      const { data } = await axios.get(`${backEndUrl}/api/user/data`);
      data.status === "Success"
        ? setUserData(data.data)
        : toast.errr(data.message);
    } catch (error) {
      toast.error(error.response?.data?.message || "Server error");
    }
  };

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    getUserData();
  }, []);

  const value = {
    isLoggedIn,
    setIsLoggedIn,
    backEndUrl,
    userData,
    setUserData,
    getUserData,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};
