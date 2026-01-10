import { useState, useContext } from "react";
import { AppContext } from "../context/AppContext";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const ForgotPassword = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const { backEndUrl } = useContext(AppContext);

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      const { data } = await axios.post(
        `${backEndUrl}/api/auth/sendResetLink`,
        { email }
      );

      if (data.status === "Success") {
        toast.success("Reset link sent to your email");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Error");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-linear-to-br from-blue-200 to-purple-600">
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
      <form
        onSubmit={submitHandler}
        className=" bg-slate-900 text-indigo-200 w-full sm:w-1/4 text-sm p-8 rounded shadow"
      >
        <h2 className="text-center text-white text-xl mb-4">Forgot Password</h2>
        <p className="text-center mb-4">Please enter you registered email id</p>

        <div className="mb-4 flex items-center gap-3 w-full bg-[#333A56] px-5 py-2.5 text-white rounded-full">
          <i class="fa-solid fa-envelope"></i>
          <input
            type="email"
            placeholder="Enter your email"
            className="bg-transparent outline-none"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <button className="mt-3 w-full px-4 py-2 rounded-full text-white bg-linear-to-r from-indigo-300 to-indigo-600">
          Send Reset Link
        </button>
      </form>
    </div>
  );
};

export default ForgotPassword;
