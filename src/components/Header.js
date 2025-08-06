import axios from "axios";
import { logo } from "../utils/links";
import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { useSelector } from "react-redux";

const Header = () => {
    const [searchText, setSearchText] = useState("");
    const navigate = useNavigate();

    // const handleLogout = async () => {
    //     try {
    //         const res = await axios("http://localhost:3000/logout");
    //     }
    //     catch(err){

    //     }
    // }

    const user = useSelector((store) => store.user);
    console.log(user);
    
    const handleSearch = (val) => {
        val.preventDefault();
        if (!searchText) {
            // Redirect if empty
            // <Navigate to="/add" />
            navigate("/add")
            console.log("hello")
        } else {
            console.log("Search for:", searchText);
        }
    }

    return (
        <div className="flex h-20 items-center justify-between m-auto dark:bg-gray-950 dark:text-white">
            <div className="w-[60%] flex">
                <div className="w-[33%]">
                    <Link to="/"><img className="w-15 mx-auto" src={logo} ></img></Link>
                </div>
                <div className="w-[67%] flex items-center">
                    {/* search bar */}
                    {/* <input className="flex w-75 p-2 border border-solid border-[#ccc] rounded-md" type="search" name="q" placeholder="Search..." autoComplete="off" value={searchText} onChange={(e) => {
                        setSearchText(e.target.value);
                    }}/> */}
                    <form  onSubmit={handleSearch} className="max-w-md mx-auto w-full ">   
                        <div className="relative">
                            <div className="absolute inset-y-0 flex items-center ps-3 ">
                                <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
                                </svg>
                            </div>
                            <input type="text" value={searchText} onChange={(e) => setSearchText(e.target.value)} className=" w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search..." />
                            <button type="submit" className="text-white absolute end-2.5 bottom-2.5 bg-blue-700 hover:bg-[#2E78B6] focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Search</button>
                        </div>
                    </form>
                </div>
            </div>
            <div className="w-[40%]">
                <ul className="h-10 flex items-center ">
                    <li className="mx-10 items-center cursor-pointer"><Link to="/">Home</Link></li>
                    <li className="mx-10 items-center">Message</li>
                    <li className="mx-10 items-center">Welcome, {user.firstName} </li>
                    {/* <li className="mx-10 border p-2 rounded-lg cursor-pointer hover:text-white hover:bg-[#2E78B6] hover:border-[#2E78B6]" onClick={handleLogout}>Logout</li> */}
                </ul>
            </div>
        </div>
    )
};

export default Header;