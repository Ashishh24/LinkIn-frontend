import axios from "axios";
import { logo } from "../utils/links";
import { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { removeUser } from "../../src/utils/userSlice.js";
import { BASE_URL } from "../utils/url";
import toast from "react-hot-toast";
import { clearConnections } from "../utils/connectionSlice.js";
import { addRequest, clearRequests } from "../utils/requestSlice";
import { clearFeed } from "../utils/feedSlice.js";
import { clearRequestsSent } from "../utils/requestSentSlice";
import { Home, HomeIcon, MessageCircle, User } from "lucide-react";

const Header = () => {
  const [searchText, setSearchText] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);

  const dropdownRef = useRef(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const requests = useSelector((store) => store.requests);
  const user = useSelector((store) => store.user);

  const handleLogout = async () => {
    try {
      const res = await axios.post(
        BASE_URL + "/logout",
        {},
        {
          withCredentials: true,
        }
      );
      dispatch(removeUser());
      dispatch(clearFeed());
      dispatch(clearConnections());
      dispatch(clearRequests());
      dispatch(clearRequestsSent());
      toast.success("You have been successfully logged out 👍");
      navigate("/");
    } catch (err) {
      toast.error("Logout failed :(");
      console.log(err.message);
    }
  };

  const handleSearch = (val) => {
    val.preventDefault();
    navigate("/add", { state: { searchText } });
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    const fetchRequests = async () => {
      if (requests && requests.length > 0) return; // don’t refetch if already loaded
      try {
        const res = await axios.get(BASE_URL + "/user/connectionRequest", {
          withCredentials: true,
        });
        dispatch(addRequest(res.data.data));
      } catch (err) {
        toast.error("Unable to fetch Connection Requests!!");
        console.log(err.message);
      }
    };

    fetchRequests();
  }, []);

  if (!user) return null;

  return (
    <div className="flex h-[10vh] items-center justify-between m-auto">
      <div className="w-[60%] flex">
        <div className="w-[33%]">
          <Link to="/home">
            <img className="w-15 mx-auto" src={logo}></img>
          </Link>
        </div>
        <div className="w-[67%] flex items-center">
          <form onSubmit={handleSearch} className="max-w-md mx-auto w-full ">
            <div className="relative">
              <div className="absolute inset-y-0 flex items-center ps-3 ">
                <svg
                  className="w-4 h-4 text-gray-500"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 20 20">
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                  />
                </svg>
              </div>
              <input
                type="text"
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
                className=" w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Search..."
              />
              <button
                type="submit"
                className=" cursor-pointer hidden sm:block text-white absolute end-2.5 bottom-2.5 bg-blue-700 hover:bg-[#2E78B6] focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2">
                Search
              </button>

              {/* Icon Button for mobile */}
              <button
                type="submit"
                className="sm:hidden absolute end-2.5 bottom-2.5 p-2 rounded-lg text-white bg-blue-700 hover:bg-[#2E78B6] focus:ring-4 focus:outline-none focus:ring-blue-300">
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M21 21l-4.35-4.35m0 0A7.5 7.5 0 1 0 3 10.5a7.5 7.5 0 0 0 13.65 6.15z"
                  />
                </svg>
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* Right section */}
      <div className="w-[40%] flex justify-end gap-3 items-center mr-3 md:mr-10">
        <Link to="/home" className="block m-3 px-2 py-1 hover:bg-gray-100">
          <Home className="w-6 h-6 text-indigo-500 mb-2" />
        </Link>
        <Link
          to="/chat"
          className="hidden md:block md:m-3 px-2 py-1 hover:bg-gray-100">
          <MessageCircle className="w-6 h-6 text-indigo-500 mb-2" />
        </Link>
        <Link
          to="/requests"
          className="relative hidden lg:block items-center md:m-3 px-2 py-1 hover:bg-gray-100">
          <User className="w-6 h-6 text-indigo-500 mb-2" />
          {requests?.length > 0 && (
            <span className="absolute top-0 right-0 translate-x-1/2 -translate-y-1/2 bg-red-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
              {requests.length}
            </span>
          )}
        </Link>
        <div className="relative" ref={dropdownRef}>
          <button onClick={() => setMenuOpen(!menuOpen)}>
            <img
              src={user.profilePhoto}
              className="rounded-full h-[50px] w-[50px] object-cover cursor-pointer"
            />
          </button>
          {menuOpen && (
            <div className="absolute right-0 top-10 w-48 border bg-white shadow-lg rounded-md z-50 text-black">
              <Link
                to="/chat"
                className="block md:hidden px-4 py-2 hover:bg-gray-100">
                Chats
              </Link>
              <Link
                to="/requests"
                className="block lg:hidden px-4 py-2 hover:bg-gray-100">
                New Requests{" "}
                {requests?.length > 0 && <span>({requests?.length})</span>}
              </Link>
              <button
                onClick={() => navigate("/connections")}
                className="cursor-pointer block w-full text-left px-4 py-2 hover:bg-gray-100">
                Connections
              </button>
              <button
                onClick={() => navigate("/profile")}
                className="cursor-pointer block w-full text-left px-4 py-2 hover:bg-gray-100">
                View Profile
              </button>
              {/* <button
                onClick={() => navigate("/premium")}
                className="cursor-pointer block w-full text-left px-4 py-2 hover:bg-gray-100">
                Upgrade to Premium
              </button> */}
              <button
                onClick={handleLogout}
                className="cursor-pointer block w-full text-left px-4 py-2 hover:bg-gray-100">
                Sign Out
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Header;
