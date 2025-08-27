import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { BASE_URL } from "../utils/url";
import toast from "react-hot-toast";
import { Eye, EyeOff } from "lucide-react";

const Login = ({ onSwitchToSignup }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [otp, setOtp] = useState("");
  const [showOtpModal, setShowOtpModal] = useState(false);
  const [showEmailModal, setShowEmailModal] = useState(false);

  const handleLogin = async () => {
    try {
      const res = await axios.post(
        BASE_URL + "/login",
        {
          email,
          password,
        },
        { withCredentials: true }
      );
      dispatch(addUser(res.data.user));
      toast.success("Login successful!");
      navigate("/home");
    } catch (err) {
      toast.error(
        err?.response?.data?.message || err.message || "Something went wrong!!"
      );
    }
  };

  const handleNoAccount = () => {
    onSwitchToSignup();
  };

  const sendOTP = async () => {
    try {
      const res = await axios.post(`${BASE_URL}/send-otp`, { email });
      if (res.data.message === "OTP sent successfully!") {
        toast.success(res.data.message);
        setShowOtpModal(true);
        setOtp("");
      } else {
        toast.success(res?.data?.message);
        setShowEmailModal(false);
      }
    } catch (err) {
      toast.error(
        err?.response?.data?.message || err.message || "Something went wrong!"
      );
    }
  };

  const handleVerifyOtp = async (email) => {
    try {
      const res = await axios.post(`${BASE_URL}/verify-otp`, {
        email,
        otp,
      });
      setShowOtpModal(false);
      setShowEmailModal(false);
      toast.success("Email verified!! Login to continue");
    } catch (err) {
      toast.error(err.response?.data?.message || "OTP verification failed");
    }
  };

  return (
    <div>
      <div>
        <h1 className="text-center font-bold text-xl">Login to continue...</h1>
        <div className="pt-5 flex flex-col">
          <label>Email address</label>
          <input
            type="text"
            value={email}
            className="border border-solid border-black px-1.5"
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className="pt-5 flex flex-col">
          <label>Password</label>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              value={password}
              className="border border-solid border-black px-1.5"
              onChange={(e) => setPassword(e.target.value)}
            />
            <span
              className="absolute right-1 top-3 cursor-pointer"
              onClick={() => setShowPassword(!showPassword)}>
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </span>
          </div>
        </div>

        <div className="items-center text-center">
          <button
            className="my-5 p-2 rounded-xl text-black border border-black cursor-pointer hover:text-white hover:bg-[#2E78B6] hover:border-[#2E78B6]"
            onClick={handleLogin}>
            Sign in
          </button>
          <p
            onClick={() => {
              setShowEmailModal(true);
              setEmail("");
            }}
            className="cursor-pointer text-gray-500 hover:text-black">
            Verify your account
          </p>
          {showEmailModal && (
            <div className="fixed inset-0 bg-opacity-50 backdrop-blur-sm flex flex-col items-center justify-center">
              <div className="bg-white p-6 rounded-t shadow max-w-sm w-full">
                <h3 className="text-xl font-bold mb-4">Enter email</h3>
                <input
                  type="text"
                  placeholder="email"
                  className="w-full mb-4 border rounded"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
                <button
                  type="submit"
                  onClick={sendOTP}
                  className="mb-2 w-full bg-green-500 text-white p-2 rounded hover:bg-green-600 cursor-pointer">
                  {" "}
                  Send OTP{" "}
                </button>
                <button
                  onClick={() => {
                    setShowEmailModal(false);
                  }}
                  className="mt-2 w-full bg-red-500 text-white p-2 rounded hover:bg-red-600 cursor-pointer">
                  {" "}
                  Cancel{" "}
                </button>
              </div>
              {showOtpModal && (
                <div className="fixed inset-0 bg-opacity-50 backdrop-blur-sm flex items-center justify-center">
                  <div className="bg-white p-6 rounded-b shadow max-w-sm w-full">
                    <h3 className="text-xl font-bold mb-4">Enter OTP</h3>
                    <input
                      type="text"
                      placeholder="OTP"
                      className="w-full mb-4 border rounded"
                      value={otp}
                      onChange={(e) => setOtp(e.target.value)}
                      required
                    />
                    <button
                      type="submit"
                      onClick={() => handleVerifyOtp(email)}
                      className="mb-2 w-full bg-green-500 text-white p-2 rounded hover:bg-green-600 cursor-pointer">
                      {" "}
                      Verify OTP{" "}
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}
          <p
            onClick={handleNoAccount}
            className="cursor-pointer text-gray-500 hover:text-black">
            Don't have an account yet? Signup
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
