import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/url";
import toast from "react-hot-toast";
import Header from "./Header";
import axios from "axios";

const Profile = () => {
    const navigate = useNavigate();
    const userData = useSelector(store => store.user)

    useEffect(() => {
        const skillTags = document.querySelectorAll(".bg-indigo-100");
        skillTags.forEach((tag) => {
            tag.addEventListener("mouseover", () => {
                tag.classList.remove("bg-indigo-100", "text-indigo-800");
                tag.classList.add("bg-blue-900", "text-white");
            });
            tag.addEventListener("mouseout", () => {
                tag.classList.remove("bg-blue-900", "text-white");
                tag.classList.add("bg-indigo-100", "text-indigo-800");
            });
        });

        return () => {
            skillTags.forEach((tag) => {
                tag.removeEventListener("mouseover", () => {});
                tag.removeEventListener("mouseout", () => {});
            });
        };
    }, []);

    const handleEdit = () => {
        navigate("/edit");
    }

    const handleDelete = async() => {
        try {
            const res = await axios.delete(BASE_URL+"/profile/delete", {
                withCredentials: true,
            });
            toast.success("Profile deleted sucessfully!!");
            navigate("/");            
        }
        catch(err){
            console.log(err);
            toast.error(err.response.data.message || err.message);
        }
    }

    return (
        <div>
            <Header />
            <div className="bg-gradient-to-r from-indigo-800 to-blue-900 min-h-[90vh] flex items-center justify-center p-4">
                <div className="bg-white rounded-xl shadow-2xl max-w-4xl w-full p-8 transition-all duration-300 animate-fade-in">
                    <div className="flex flex-col md:flex-row">
                    {/* Left Section */}
                    <div className="md:w-1/2 text-center mb-8 md:mb-0">
                        <img src={userData.profilePhoto} className="rounded-full w-48 h-48 mx-auto mb-4 border-4 border-indigo-800 transition-transform duration-300 hover:scale-105"/>
                        <h1 className="text-2xl font-bold text-indigo-800 mb-2">{userData.firstName + " " + userData.lastName}</h1>
                        <p className="text-gray-600">{userData.title}</p>
                        <div className="flex justify-center gap-5">
                        <button 
                            onClick={handleEdit} 
                            className="mt-4 bg-indigo-800 cursor-pointer text-white px-4 py-2 rounded-lg hover:bg-blue-900 transition-colors duration-300">
                            Edit Profile
                        </button>
                        <button 
                            onClick={handleDelete} 
                            className="mt-4 bg-red-600 cursor-pointer text-white px-4 py-2 rounded-lg hover:bg-red-900 transition-colors duration-300">
                            Delete Profile
                        </button>
                        </div> 
                    </div>

                    {/* Right Section */}
                    <div className="md:w-2/3 md:pl-8">
                        <h2 className="text-xl font-semibold text-indigo-800 mb-4">
                        About Me
                        </h2>
                        <p className="text-gray-700-300 mb-6">
                        {userData.about ? userData.about : "--"}
                        </p>

                        <h2 className="text-xl font-semibold text-indigo-800 mb-4">
                        Skills
                        </h2>
                        <div className="flex flex-wrap gap-2 mb-6">
                        {userData.skills.length > 0 ? userData.skills.map(
                            (skill, idx) => (
                            <span
                                key={idx}
                                className="bg-indigo-100 text-indigo-800 px-3 py-1 rounded-full text-sm cursor-pointer"
                            >
                                {skill}
                            </span>
                            )
                        )
                        : <p>No skills added yet....</p>
                        }
                        </div>

                        <h2 className="text-xl font-semibold text-indigo-800 mb-4">Contact Information</h2>
                        <ul className="space-y-2 text-gray-700-300">
                        <li className="flex items-center">
                            <svg className="h-5 w-5 mr-2 text-indigo-800" fill="currentColor">
                                <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                                <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                            </svg>
                            {userData.email}
                        </li>
                        {userData.phone ? <li className="flex items-center">
                            <svg className="h-5 w-5 mr-2 text-indigo-800" fill="currentColor">
                                <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                            </svg>
                            {userData.phone} 
                        </li>: null}
                        </ul>
                    </div>
                    </div>
                </div>

                <style>
                    {`
                    @keyframes fadeIn {
                        from { opacity: 0; transform: translateY(-10px); }
                        to { opacity: 1; transform: translateY(0); }
                    }
                    .animate-fade-in {
                        animation: fadeIn 0.5s ease-out forwards;
                    }
                    `}
                </style>
            </div>
        </div>
    );
};

export default Profile;