import axios from "axios";
import { logo } from "../utils/links";
import { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { removeUser } from "../../src/utils/userSlice.js";
import { BASE_URL } from "../utils/url.js";

const Header = () => {
    const [searchText, setSearchText] = useState("");
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);

    const dropdownRef = useRef(null); 
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleLogout = async () => {
        try {
            const res = await axios(BASE_URL+"/logout");
            dispatch(removeUser());
            alert("You have been successfully logged out")
            navigate("/login");
        }
        catch(err){

        }
    }

    const handleSearch = (val) => {
        val.preventDefault();
        if (!searchText) {
            // Redirect if empty
            navigate("/add")
            console.log("hello")
        } else {
            console.log("Search for:", searchText);
        }
    }

    let user;
    // user = useSelector((store) => store.user);
    user = {
        firstName: "Ashish",
        lastName: "Anand",
        email: "ashish@google.com",
        profilePhoto: "https://media.licdn.com/dms/image/v2/D5603AQEn2R6cZas60w/profile-displayphoto-shrink_800_800/profile-displayphoto-shrink_800_800/0/1696881242846?e=1757548800&v=beta&t=jt-JixJkevT34NzSucwhj_ygJw39ug7A6Fde4uyX41M",
    }
    // console.log(user);

    useEffect(() => {
        if (!user) {
            alert("You are not logged in. Please login first")
            navigate("/login");
        }
    }, [user, navigate]);

    // Close dropdown when clicking outside
    // useEffect(() => {
    //     function handleClickOutside(event) {
    //         if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
    //             setDropdownOpen(false);
    //         }
    //     }
    //     document.addEventListener("mousedown", handleClickOutside);
    //     return () => {
    //         document.removeEventListener("mousedown", handleClickOutside);
    //     };
    // }, []);    

    if (!user) return null;

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

            {/* Right section */}
            <div className="w-[40%] flex justify-center items-center">
                {/* Desktop Menu */}
                <ul className="hidden md:flex items-center space-x-6">
                    <li className="mx-10 items-center"><Link to="/">Home</Link></li>
                    <li className="mx-10 items-center">Message</li>
                    <li className="mx-10 items-center">Welcome, {user.firstName}</li>
                </ul>

                {/* Profile Dropdown */}
                <div className="relative ml-4 hidden md:block">
                    <button onClick={() => setDropdownOpen(!dropdownOpen)}>
                        <img
                            src={user.profilePhoto}
                            className="rounded-full h-[50px] w-[50px] object-cover cursor-pointer"
                            // onClick={() => setDropdownOpen((prev) => !prev)}
                        />
                    </button>
                    { dropdownOpen && (
                        <div ref={dropdownRef} className="absolute right-0 w-40 border bg-white shadow-lg rounded-md z-50 text-black">
                            <button onClick={() => navigate("/profile")} className="block w-full text-left px-4 py-2 hover:bg-gray-100">
                                View Profile
                            </button>
                            <button onClick={handleLogout} className="block w-full text-left px-4 py-2 hover:bg-gray-100">
                                Sign Out
                            </button>
                        </div>
                    )}
                </div>

                {/* Mobile menu */}
                <div className="md:hidden ml-4 relative">
                    <button onClick={() => setMenuOpen(!menuOpen)}>
                        <img
                            src={user.profilePhoto}
                            className="rounded-full h-[50px] w-[50px] object-cover cursor-pointer"
                            // onClick={() => setDropdownOpen((prev) => !prev)}
                        />
                    </button>
                    { menuOpen && (
                        <div ref={dropdownRef} className="absolute right-0 top-10 w-48 border bg-white shadow-lg rounded-md z-50 text-black" >
                            <Link to="/" className="block px-4 py-2 hover:bg-gray-100">Home</Link>
                            <div className="block px-4 py-2">Message</div>
                            {/* <div className="block px-4 py-2">Welcome, {user.firstName}</div> */}
                            <button onClick={() => navigate("/profile")} className="cursor-pointer block w-full text-left px-4 py-2 hover:bg-gray-100">
                                View Profile
                            </button>
                            <button onClick={handleLogout} className="cursor-pointer block w-full text-left px-4 py-2 hover:bg-gray-100">
                                Sign Out
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
};

export default Header;

{/* 
<div className="w-[40%] flex items-center">
    <ul className="h-10 flex items-center ">
        <li className="mx-10 items-center cursor-pointer"><Link to="/">Home</Link></li>
        <li className="mx-10 items-center">Message</li>
        <li className="mx-10 items-center">Welcome, {user.firstName} </li>
    </ul>
    <div className="relative">
        <img src={user.profilePhoto} className="rounded-full h-[60px]" onClick={() => setDropdownOpen((prev) => !prev)} />
        { dropdownOpen &&
            <div ref={dropdownRef} className="absolute right-0 w-40 border border-[#ccc] bg-white shadow-lg rounded-md z-50">
                <button onClick={() => navigate("/profile")} className="block w-full text-left px-4 py-2 hover:bg-gray-100 cursor-pointer" >
                    View Profile
                </button>
                <button onClick={handleLogout} className="block w-full text-left px-4 py-2 hover:bg-gray-100 cursor-pointer" >
                    Sign Out
                </button>
                {/* <li className="mx-10 border p-2 rounded-lg cursor-pointer hover:text-white hover:bg-[#2E78B6] hover:border-[#2E78B6]" onClick={handleLogout}>Logout</li>  }
            </div>
        }
    </div>
</div> 
*/}