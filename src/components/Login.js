import { useState } from "react";
import { ogLogo } from "../utils/links"
import axios from "axios";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const dispatch = useDispatch();

    const handleLogin = async () => {
        try{
            const res = await axios.post("http://localhost:3000/login", {
                email, password
            }, { withCredentials: true });
            dispatch(addUser(res.body));
        }
        catch(err){
            console.log(err.message);
        }
    }

    return (
        <div className="flex">
            <img className="h-[100vh]" src={ogLogo} />
            <div className="m-auto h-50vh border border-black p-10 w-75 shadow-2xl">
                <h1 className="text-center font-bold text-xl">Login to continue...</h1>
                    <div className="pt-5 flex flex-col">
                        <label>Email address</label>
                        <input type="text" value={email} className="border border-solid border-black px-1.5" onChange={(e) => setEmail(e.target.value)}/>
                    </div>
                    
                    <div className="pt-5 flex flex-col">
                        <label>Password</label>
                        <input type="text" value={password} className="border border-solid border-black px-1.5" onChange={(e) => setPassword(e.target.value)}/>
                    </div>


                    <div className="items-center text-center">
                        <button className="my-5 p-2 rounded-xl text-black border border-black cursor-pointer hover:text-white hover:bg-[#2E78B6] hover:border-[#2E78B6]" onClick={handleLogin}><Link to="/">Sign in</Link></button>
                    </div>
            </div>
        </div>
    )
}

export default Login