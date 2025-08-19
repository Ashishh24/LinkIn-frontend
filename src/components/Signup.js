import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/url";
import toast from "react-hot-toast";
import { Eye, EyeOff } from "lucide-react";

const Signup = ({ onSwitchToLogin }) => {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const [otp, setOtp] = useState("");
    const [showOtpModal, setShowOtpModal] = useState(false);
    const [message, setMessage] = useState("");
    
    const navigate = useNavigate();

    const handleSignup = async() => {
        if (!firstName || !lastName || !email || !password || !confirmPassword) {
            toast.error("Please fill in all fields");
            return;
        }

        // Password match check
        if (password !== confirmPassword) {
            toast.error("Passwords do not match");
            return;
        }
        try{
            const res = await axios.post(BASE_URL+"signup", {
                firstName, lastName, email, password
            });
            toast.success("Account created Successfully!! Login to continue");
            // onSwitchToLogin();
            // setMessage(res.data.message);
            setShowOtpModal(true);
        }
        catch (err) {
            toast.error(err?.response?.data?.message || err.message);
        }
    }

    const handleAlready = () => {
        onSwitchToLogin();
    }

    const handleVerifyOtp = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post(`${BASE_URL}verify-otp`, {
                email, otp
            });
            setMessage(res.data.message);
            setShowOtpModal(false); // hide OTP modal
            toast.success("Account created Successfully!! Login to continue");
            onSwitchToLogin();
        } catch (err) {
            setMessage(err.response?.data?.message || "OTP verification failed");
        }
    };

    return (
        <div className="flex justify-between">
            <div className="m-auto px-5 py-5  border-solid border border-gray-600 shadow-2xl ">
                <h2 className="p-5 text-2xl font-semibold text-center">Create your account</h2>
                {message && <p className="mb-4 text-red-600">{message}</p>}
                <div>
                    <div className="flex gap-10">
                        <div className="pt-5 flex flex-col">
                            <label>First Name</label>
                            <input value={firstName} className="border border-solid border-black px-1.5 w-40" onChange={(e) => setFirstName(e.target.value)}/>
                        </div>
                        <div className="pt-5 flex flex-col">
                            <label>Last Name</label>
                            <input value={lastName} className="border border-solid border-black px-1.5 w-40" onChange={(e) => setLastName(e.target.value)}/>
                        </div>
                    </div>
                    
                    <div className="pt-5 flex flex-col">
                        <label>Email address</label>
                        <input value={email} className="border border-solid border-black px-1.5" onChange={(e) => setEmail(e.target.value)}/>
                    </div>

                    <div className="pt-5 flex flex-col">
                        <label>Password</label>
                        <div className="relative">
                            <input type={showPassword ? "text" : "password"} value={password} className="border border-solid border-black px-1.5" onChange={(e) => setPassword(e.target.value)}/>
                            <span
                                className="absolute right-2 top-3 cursor-pointer"
                                onClick={() => setShowPassword(!showPassword)}
                                >
                                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                            </span>
                        </div>
                    </div>
                    
                    <div className="pt-5 flex flex-col">
                        <label>Confirm Password</label>
                        <div className="relative">
                            <input type={showConfirmPassword ? "text" : "password"} value={confirmPassword} className="border border-solid border-black px-1.5" onChange={(e) => setConfirmPassword(e.target.value)}/>
                            <span
                                className="absolute right-2 top-3 cursor-pointer"
                                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                >
                                {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                            </span>
                        </div>                   
                    </div>
                    
                    <div className="items-center text-center">
                        <button className="my-5 p-2 rounded-xl text-black border border-black cursor-pointer hover:text-white hover:bg-[#2E78B6] hover:border-[#2E78B6]" onClick={handleSignup}>Register</button>
                        <p onClick={handleAlready} className="cursor-pointer text-gray-500 hover:text-black">Already have an account ? Login</p>
                    </div>
                </div>

                {/* OTP Modal */}
                {showOtpModal && (
                    <div className="fixed inset-0 bg-opacity-50 backdrop-blur-sm flex items-center justify-center">
                        <div className="bg-white p-6 rounded shadow max-w-sm w-full">
                            <h3 className="text-xl font-bold mb-4">Enter OTP</h3>
                            <form onSubmit={handleVerifyOtp}>
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
                                    className="mb-2 w-full bg-green-500 text-white p-2 rounded hover:bg-green-600 cursor-pointer"
                                >
                                    Verify OTP
                                </button>
                            </form>
                            <button
                                className="mt-2 w-full bg-red-500 text-white p-2 rounded hover:bg-red-600 cursor-pointer"
                                onClick={() => setShowOtpModal(false)}
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
};

export default Signup;
