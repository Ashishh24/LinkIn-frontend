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

    const handleLogin = async () => {
        try{
            const res = await axios.post(BASE_URL+"login", {
                email, password
            }, { withCredentials: true });
            dispatch(addUser(res.data));
            toast.success("Login successful!");
            navigate("/home");
        }
        catch(err){
            if(err.status === 404){
                toast.error("Email not found")
            }
            if(err.status === 403){
                toast.error("Invalid Password")
            }
            console.log(err.message);
        }
    }

    const handleNoAccount = () => {
        onSwitchToSignup();
    }

    return (
        <div> 
            <div>
                <h1 className="text-center font-bold text-xl">Login to continue...</h1>
                <div className="pt-5 flex flex-col">
                    <label>Email address</label>
                    <input type="text" value={email} className="border border-solid border-black px-1.5" onChange={(e) => setEmail(e.target.value)}/>
                </div>
                
                <div className="pt-5 flex flex-col">
                    <label>Password</label>
                    <div className="relative">
                        <input type={showPassword ? "text" : "password"} value={password} className="border border-solid border-black px-1.5" onChange={(e) => setPassword(e.target.value)}/>
                        <span
                            className="absolute right-1 top-3 cursor-pointer"
                            onClick={() => setShowPassword(!showPassword)}
                            >
                            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                        </span>
                    </div>
                </div>


                <div className="items-center text-center">
                    <button className="my-5 p-2 rounded-xl text-black border border-black cursor-pointer hover:text-white hover:bg-[#2E78B6] hover:border-[#2E78B6]" onClick={handleLogin}>Sign in</button>
                    <p onClick={handleNoAccount} className="cursor-pointer text-gray-500 hover:text-black">Don't have an account yet? Signup</p>
                </div>
            </div>
        </div>
    )
}

export default Login





        