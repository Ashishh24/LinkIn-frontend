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
    
    // const [gender, setGender] = useState("");
    // const [phone, setPhone] = useState("");
    // const [profilePhoto, setProfilePhoto] = useState("");
    // const [about, setAbout] = useState("");
    // const [skills, setSkills] = useState("");
    
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
            navigate("/");
        }
        catch (err) {
            console.log(err.message);
        }
    }

    const handleAlready = () => {
        onSwitchToLogin();

    }

    return (
        <div className="flex justify-between">
            <div className="m-auto px-5 py-5  border-solid border border-gray-600 shadow-2xl ">
                <h2 className="p-5 text-2xl font-semibold text-center">Create your account</h2>
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
            </div>
        </div>
    )
};

export default Signup;