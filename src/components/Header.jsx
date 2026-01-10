import { useContext } from "react";
import robot from "./../assets/robo.png";
import { AppContext } from "../context/AppContext";

const Header = () => {
  const { userData } = useContext(AppContext);

  return (
    <div className="flex flex-col items-center text-center sm:mt-10 mt-18 text-gray-800">
      <img className="w-25" src={robot} alt="" />
      <h1 className="flex items-center gap-2 text-xl sm:text-3xl font-medium mb-2">
        Hey {userData ? userData.name : "Developer"}! 👋🏼
      </h1>
      <h2 className="text-3xl sm:text-5xl mb-4 font-semibold">
        Welcome to Our App
      </h2>
      <button className="border border-gray-400 px-10 text-xl py-3 bg-blue-200 rounded-full hover:bg-gray-200 transition-all">
        Get started
      </button>
    </div>
  );
};

export default Header;
