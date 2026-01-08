import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import axios from "axios";
import { toast } from "react-toastify";

const ResetPassword = () => {
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [newPassword, setPassword] = useState("");
  const [isEmailSent, setIsEmailSent] = useState(false);
  const [isOtpSubmitted, setIsOtpSubmitted] = useState(false);
  const navigate = useNavigate();

  const { backEndUrl } = useContext(AppContext);

 const onSubmitEmail = async (e) => {
   e.preventDefault();

   try {
     const { data } = await axios.post("/auth/sendResetOtp", {
       email,
     });

     if (data.status === "Success") {
       toast.success(data.message);
       setIsEmailSent(true);
     } else {
       toast.error(data.message);
     }
   } catch (error) {
     toast.error(error.response?.data?.message || "Server error");
   }
 };

 const onSubmitOtp = async (e) => {
   e.preventDefault();
   setIsOtpSubmitted(true);
 };

 const onResetPassword = async (e) => {
   e.preventDefault();

   try {
     const { data } = await axios.post("/auth/resetPassword", {
       email,
       otp,
       newPassword,
     });

     if (data.status === "Success") {
       toast.success(data.message);
       navigate("/login");
     } else {
       toast.error(data.message);
     }
   } catch (error) {
     toast.error(error.response?.data?.message || "Server error");
   }
 };


  return (
    <div className="flex items-center justify-center min-h-screen px-6 sm:px-0 bg-linear-to-br from-blue-200 to-purple-600">
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
      {!isEmailSent && (
        <form
          onSubmit={onSubmitEmail}
          className="bg-slate-900 w-96 p-8 shadow-lg rounded-lg text-sm"
        >
          <h1 className="text-xl font-semibold mb-4 text-white text-center">
            Reset Password
          </h1>
          <p className="mb-6 text-center text-indigo-200">
            Please enter your registered email id
          </p>
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
          <button className="w-full py-2.5 bg-linear-to-r from-indigo-500 to-indigo-900 text-white rounded-full mt-3">
            Submit
          </button>
        </form>
      )}

      {isEmailSent && !isOtpSubmitted && (
        <form
          onSubmit={onSubmitOtp}
          className="bg-slate-900 w-96 p-8 shadow-lg rounded-lg text-sm"
        >
          <h1 className="text-xl font-semibold mb-4 text-white text-center">
            Reset Password OTP
          </h1>
          <p className="mb-6 text-center text-indigo-200">
            Enter the six digit code sent to your email id
          </p>
          <div className="mb-4 flex items-center gap-3 w-full bg-[#333A56] px-5 py-2.5 text-white rounded-full">
            <i className="fa-solid fa-key"></i>
            <input
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              className="bg-transparent outline-none"
              type="text"
              placeholder="Code"
              required
            />
          </div>
          <button className="w-full py-2.5 bg-linear-to-r from-indigo-500 to-indigo-900 text-white rounded-full mt-3">
            Submit
          </button>
        </form>
      )}

      {isOtpSubmitted && isEmailSent && (
        <form
          onSubmit={onResetPassword}
          className="bg-slate-900 w-96 p-8 shadow-lg rounded-lg text-sm"
        >
          <h1 className="text-xl font-semibold mb-4 text-white text-center">
            New Password
          </h1>
          <p className="mb-6 text-center text-indigo-200">
            Enter your new password
          </p>
          <div className="mb-4 flex items-center gap-3 w-full bg-[#333A56] px-5 py-2.5 text-white rounded-full">
            <i className="fa-solid fa-lock"></i>
            <input
              value={newPassword}
              onChange={(e) => setPassword(e.target.value)}
              className="bg-transparent outline-none"
              type="password"
              placeholder="Password"
              required
            />
          </div>
          <button className="w-full py-2.5 bg-linear-to-r from-indigo-500 to-indigo-900 text-white rounded-full mt-3">
            Submit
          </button>
        </form>
      )}
    </div>
  );
};

export default ResetPassword;
