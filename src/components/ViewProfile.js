import axios from "axios";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useLocation, useParams } from "react-router-dom";

const ViewProfile = () => {
    const { state } = useLocation();

    const { _id, fromUserID} = state;
    console.log("From user:", fromUserID);
    console.log("Request ID:", _id);

    // const { _id } = useParams();
    const [userData, setUserData] = useState(null);
    // const userData = {_id:1, firstName: "Kashish", lastName: "Nayak", email:"kashish@google.com", phone:"9999999999",  about:"Hi, this is Kashish Nayak", title:"Superset🤡", profilePhoto:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQz68b1g8MSxSUqvFtuo44MvagkdFGoG7Z7DQ&s", skills:["react", "node.js", "qa"]};
    // const fetchData = async ()  => {
        // user = await axios.get(BASE_URL + "profile/view/" + _id);
        // const user = {_id:1, firstName: "Kashish", lastName: "Nayak",bio:"Hi, this is Kashish Nayak", title:"Superset🤡", profilePhoto:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQz68b1g8MSxSUqvFtuo44MvagkdFGoG7Z7DQ&s", skills:["react", "node.js", "qa"]};
        // console.log(user);
        
        // setUserData(user);
    // }
    
    // useEffect(() => {
    //     fetchData();
    // }, []);

    useEffect(() => {
        if (fromUserID) {
            setUserData(fromUserID);
        }
    }, [fromUserID]);

    // setUserData(fromUserID);
    console.log(userData);
    

    const handleConnect = async(_id, status) => {
        try{
            console.log(status, _id);
            const res = await axios.patch(BASE_URL+"request/review/" + status + "/" + _id, {}, {
                withCredentials: true,
            })
            dispatch(removeRequest(_id));
        }
        catch(err){
            console.log(err.message);
            
        }
    }

    if(!userData) {
        return (
            <h1>Loading...</h1>
        )
    }

    return (
        <div>
            {/* <Header /> */}
            <div className="bg-gradient-to-r from-indigo-800 to-blue-900 min-h-screen flex items-center justify-center p-4">
                <div className="bg-white dark:bg-gray-800 rounded-xl shadow-2xl max-w-4xl w-full p-8 transition-all duration-300 animate-fade-in">
                    <div className="flex flex-col md:flex-row">
                    {/* Left Section */}
                    <div className="md:w-1/3 text-center mb-8 md:mb-0">
                        <img src={userData.profilePhoto} className="rounded-full w-48 h-48 mx-auto mb-4 border-4 border-indigo-800 dark:border-blue-900 transition-transform duration-300 hover:scale-105"/>
                        <h1 className="text-2xl font-bold text-indigo-800 dark:text-white mb-2">{userData.firstName + " " + userData.lastName}</h1>
                        <p className="text-gray-600 dark:text-gray-300">{userData.title}</p>
                        <div className="flex justify-center gap-5">
                        <button 
                            onClick={() => handleConnect(_id,"accept")} 
                            className="mt-4 bg-indigo-800 cursor-pointer text-white px-4 py-2 rounded-lg hover:bg-blue-900 transition-colors duration-300">
                            Accept
                        </button><button 
                            onClick={() => handleConnect(_id,"reject")} 
                            className="mt-4 bg-indigo-800 cursor-pointer text-white px-4 py-2 rounded-lg hover:bg-blue-900 transition-colors duration-300">
                            Reject
                        </button>
                        </div> 
                    </div>

                    {/* Right Section */}
                    <div className="md:w-2/3 md:pl-8">
                        <h2 className="text-xl font-semibold text-indigo-800 dark:text-white mb-4">
                        About Me
                        </h2>
                        <p className="text-gray-700 dark:text-gray-300 mb-6">
                        {userData.about}
                        </p>

                        <h2 className="text-xl font-semibold text-indigo-800 dark:text-white mb-4">
                        Skills
                        </h2>
                        <div className="flex flex-wrap gap-2 mb-6">
                        {/* {userData.skills.map(
                            (skill, idx) => (
                            <span
                                key={idx}
                                className="bg-indigo-100 text-indigo-800 px-3 py-1 rounded-full text-sm cursor-pointer"
                            >
                                {skill}
                            </span>
                            )
                        )} */}
                        </div>

                        <h2 className="text-xl font-semibold text-indigo-800 dark:text-white mb-4">Contact Information</h2>
                        <ul className="space-y-2 text-gray-700 dark:text-gray-300">
                        <li className="flex items-center">
                            <svg className="h-5 w-5 mr-2 text-indigo-800 dark:text-white" fill="currentColor">
                                <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                                <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                            </svg>
                            {userData.email}
                        </li>
                        <li className="flex items-center">
                            <svg className="h-5 w-5 mr-2 text-indigo-800 dark:text-white" fill="currentColor">
                                <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                            </svg>
                            {userData.phone}
                        </li>
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
    )
};

export default ViewProfile;