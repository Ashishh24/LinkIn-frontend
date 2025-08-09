import { useEffect } from "react";
import Header from "./Header";
import People from "./People";
import { BASE_URL } from "../utils/url.js";
import { useDispatch, useSelector } from "react-redux";
import { addConnection } from "../utils/connectionSlice.js";
import axios from "axios";

const Connections = () => {
    // const data = [
    //     {_id: 1, firstName: "Aman", lastName: "Anand", profilePhoto: "https://toppng.com/uploads/preview/instagram-default-profile-picture-11562973083brycehrmyv.png", bio:"Data Analyst || SQL || Python Developer"},
    //     {_id: 2, firstName: "Vikas", lastName: "Ray", profilePhoto: "https://toppng.com/uploads/preview/instagram-default-profile-picture-11562973083brycehrmyv.png", bio:"Data Analyst || SQL || Python Developer"},
    //     {_id: 3, firstName: "Gopal", lastName: "Jha", profilePhoto: "https://toppng.com/uploads/preview/instagram-default-profile-picture-11562973083brycehrmyv.png", bio:"Data Analyst || SQL || Python Developer"},
    //     {_id: 4, firstName: "Shivani", lastName: "Joshi", profilePhoto: "https://media.licdn.com/dms/image/v2/D5603AQEUHfuXItUyuQ/profile-displayphoto-shrink_800_800/profile-displayphoto-shrink_800_800/0/1730131553181?e=1756944000&v=beta&t=Ng0gZvWsE374SPa7nh_0hFk_55ttTYcPVThbQcnw25A", bio:"Data Analyst || SQL || Python Developer"},
    // ]

    const connections = useSelector((store) => store.connections);
    console.log("connections1", connections);
    
    const dispatch = useDispatch();
    
    const connectionsData = async () => {
        if(connections) return;
        try {
            const res = await axios.get(BASE_URL+"user/connections", {
                withCredentials: true,
            });
            dispatch(addConnection(res.data.data));
            // dispatch(addConnection(data));
        }
        catch(err) {
            console.log(err.message);
        }
    }

    useEffect(() => {
        console.log("calling useEffect");
        connectionsData();
    }, []);
    
    const handleView = async() => {
        const res = await axios.post(BASE_URL+"", )
        console.log("removed feed",firstName);   
    }

    const handleRemove = () => {
        return;
    }

    return (
        <div>
            <Header />
            {connections && <div>
                {connections.map((connection) => {
                    const {_id, firstName, lastName, about, profilePhoto} = connection;
                    return (

                        <div key={_id} className="flex bg-base-200 border border-[#ccc] w-[50%] align-middle text-center p-5 mx-auto mt-5 dark:bg-gray-700 dark:border-gray-600">
                            {/*profile photo*/}
                            <div className="w-[15%]">
                                <img className="w-20 rounded-full border-black" src={profilePhoto} />
                            </div> 
                            <div className="flex w-[90%] items-center">
                                <div className="w-[90%]">
                                    <div className="flex space-x-2 text-xl">
                                        {firstName + " " + lastName}
                                    </div>
                                    <div className="text-left">
                                        {about}
                                    </div>
                                </div>
                                <div>
                                    {/*connect*/}
                                    <div className="flex">
                                        <button onClick={handleRemove} className="border rounded-3xl border-[#ccc] py-2 px-7 cursor-pointer hover:bg-[#2E78B6] hover:text-white">Remove</button>
                                        <button onClick={handleView} className="border rounded-3xl border-[#ccc] py-2 px-7 cursor-pointer hover:bg-[#2E78B6] hover:text-white">View Profile</button>
                                    </div>
                                    {/* <div></div> *ignore */}
                                </div>
                            </div>
                        </div>
                    )

                })}
            </div>}
            {/* <People /> */}
        </div>
    )
};

export default Connections;