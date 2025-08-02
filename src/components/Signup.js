import axios from "axios";
import { ogLogo } from "../utils/links";
import { useState } from "react";


const Signup = () => {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSignup = async() => {
        const res = await axios.post("http://localhost:3000/signup", {
            firstName, lastName, email, password
        });
    }

    return (
        <div className="flex justify-between ">
            <img className="h-[100vh]" src={ogLogo} />
            <div className="m-auto px-10 py-5  border-solid border border-gray-600 shadow-2xl ">
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
                    
                    {/* <div className="pt-5 flex flex-col">
                        <label>Date of Birth</label>
                        <input type="date" className="border border-solid border-black px-1.5"/>
                    </div>

                    <div className="pt-5 flex flex-col">
                        <label>Gender</label>
                        <div className="flex gap-3">
                        <input type="radio" name="gender" value="male"/>
                        <label>Male</label><br/>
                        </div>
                        <div className="flex gap-3">
                        <input type="radio" name="gender" value="female"/>
                        <label>Female</label><br/>
                        </div>
                    </div> */}

                    <div className="pt-5 flex flex-col">
                        <label>Email address</label>
                        <input value={email} className="border border-solid border-black px-1.5" onChange={(e) => setEmail(e.target.value)}/>
                    </div>

                    <div className="pt-5 flex flex-col">
                        <label>Password</label>
                        <input value={password} className="border border-solid border-black px-1.5" onChange={(e) => setPassword(e.target.value)}/>
                    </div>

                    {/* <div className="pt-5 flex flex-col">
                        <label>Phone Number</label>
                        <input type="tel" className="border border-solid border-black"/>
                    </div> */}

                    {/* <div className="pt-5 flex flex-col">
                        <label>Profile Photo</label>
                        <input className="border border-solid"/>
                    </div> */}

                    <div className="items-center text-center">
                        <button className="my-5 p-2 rounded-xl text-black border border-black cursor-pointer hover:text-white hover:bg-[#2E78B6] hover:border-[#2E78B6]" onClick={handleSignup}>Register</button>
                    </div>
                </div>
            </div>
        </div>
    )
};

export default Signup;