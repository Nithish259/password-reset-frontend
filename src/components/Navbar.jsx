import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../context/AppContext";

const Navbar = () => {
  const navigate = useNavigate();
  const { userData, setIsLoggedIn, setUserData } = useContext(AppContext);

  const logOut = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    setUserData(null);
    navigate("/");
  };

  return (
    <div className="flex justify-between w-full items-center p-4 sm:p-6 sm:px-24">
      <div className="flex items-center gap-3">
        <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-linear-to-br from-indigo-500 to-purple-600 shadow-lg">
          <i className="fa-solid fa-user-plus text-white text-xl"></i>
        </div>

        <h1 className="text-2xl font-bold tracking-wide text-gray-800">
          Auth<span className="text-indigo-500">Flow</span>
        </h1>
      </div>

      {userData ? (
        <div className="w-8 h-8 flex items-center justify-center rounded-full bg-black text-sm text-white relative group">
          {userData.name[0].toUpperCase()}
          <div className="absolute hidden group-hover:block top-0 right-0 z-10 text-black rounded-full pt-10">
            <ul className="list-none m-0 p-2 bg-gray-100 text-sm">
              <li
                onClick={() => logOut()}
                className="py-1 px-2 hover:bg-gray-200 cursor-pointer pr-10"
              >
                LogOut
              </li>
            </ul>
          </div>
        </div>
      ) : (
        <button
          onClick={() => navigate("/login")}
          className="border border-gray-500 flex items-center gap-2 px-6 py-2 rounded-full hover:bg-gray-100 transition-all text-gray-800"
        >
          Login <i className="fa-solid fa-arrow-right"></i>
        </button>
      )}
    </div>
  );
};

export default Navbar;
