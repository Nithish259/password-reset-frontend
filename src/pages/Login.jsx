import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import axios from "axios";
import { toast } from "react-toastify";

const Login = () => {
  const navigate = useNavigate();
  const [title, setTitle] = useState("Sign Up");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { setIsLoggedIn, backEndUrl, getUserData } = useContext(AppContext);

  const onSubmitHandler = async (e) => {
    try {
      e.preventDefault();
      axios.defaults.withCredentials = true;

      if (title === "Sign Up") {
        const { data } = await axios.post(`${backEndUrl}/api/auth/register`, {
          name,
          email,
          password,
        });
        if (data.status === "Success") {
          setIsLoggedIn(true);
          getUserData(); // ❌ cookie may not exist yet
          navigate("/");
        } else {
          toast.error(data.message);
          return;
        }
      } else {
        const { data } = await axios.post(`${backEndUrl}/api/auth/login`, {
          email,
          password,
        });

        if (data.status === "Success") {
          setIsLoggedIn(true);
          getUserData();
          navigate("/");
        } else {
          toast.error(data.message);
          return;
        }
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Server error");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-6 sm:px-0 bg-linear-to-br from-blue-200 to-purple-600">
      <div
        onClick={() => navigate("/")}
        className="absolute left-0 top-0 flex p-2 items-center gap-3"
      >
        <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-linear-to-br from-indigo-500 to-purple-600 shadow-lg">
          <i className="fa-solid fa-user-plus text-white text-xl"></i>
        </div>

        <h1 className="text-2xl font-bold tracking-wide text-gray-800">
          Auth<span className="text-indigo-500">Flow</span>
        </h1>
      </div>
      <div className="flex flex-col items-center justify-center rounded-lg bg-slate-900 p-8 text-indigo-200 w-full sm:w-1/4 text-sm">
        <h1 className="text-3xl mb-3 text-center text-white font-semibold">
          {title === "Sign Up" ? "Create Account" : "Login Account"}
        </h1>
        <p className="text-center mb-6 text-sm">
          {title === "Sign Up"
            ? "Create Your Account"
            : "Login To Your Account"}
        </p>

        <form onSubmit={(e) => onSubmitHandler(e)}>
          {title === "Sign Up" && (
            <div className="mb-4 flex items-center gap-3 w-full bg-[#333A56] px-5 py-2.5 text-white rounded-full">
              <i className="fa-regular fa-user"></i>
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="bg-transparent outline-none"
                type="text"
                placeholder="Full Name"
                required
              />
            </div>
          )}

          <div className="mb-4 flex items-center gap-3 w-full bg-[#333A56] px-5 py-2.5 text-white rounded-full">
            <i className="fa-regular fa-envelope"></i>
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="bg-transparent outline-none"
              type="text"
              placeholder="Email Id"
              required
            />
          </div>
          <div className="mb-4 flex items-center gap-3 w-full bg-[#333A56] px-5 py-2.5 text-white rounded-full">
            <i className="fa-solid fa-lock"></i>
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="bg-transparent outline-none"
              type="password"
              placeholder="Password"
              required
            />
          </div>

          <p
            onClick={() => navigate("/reset-password")}
            className="text-indigo-500 cursor-pointer text-xs"
          >
            Forget Password?
          </p>

          <button className="mt-3 w-full px-4 py-2 rounded-full text-white bg-linear-to-r from-indigo-300 to-indigo-600">
            {title}
          </button>
        </form>

        {title === "Sign Up" ? (
          <p
            onClick={() => setTitle("Login")}
            className="text-gray-400 text-center text-xs mt-4"
          >
            Already have an account{" "}
            <span className="text-blue-400 underline cursor-pointer">
              Login Here
            </span>
          </p>
        ) : (
          <p
            onClick={() => setTitle("Sign Up")}
            className="text-gray-400 text-center text-xs mt-4"
          >
            Don't have an account{" "}
            <span className="text-blue-400 underline cursor-pointer">
              Sign Up
            </span>
          </p>
        )}
      </div>
    </div>
  );
};

export default Login;
