import { useEffect } from "react";
import Header from "./Header";
import { BASE_URL } from "../utils/url.js";
import { useDispatch, useSelector } from "react-redux";
import { addConnection } from "../utils/connectionSlice.js";
import axios from "axios";

const Connections = () => {
    const connections = useSelector((store) => store.connections);
    
    const dispatch = useDispatch();
    
    const connectionsData = async () => {
        if(connections) return;
        try {
            const res = await axios.get(BASE_URL+"user/connections", {
                withCredentials: true,
            });
            dispatch(addConnection(res.data.data));
        }
        catch(err) {
            console.log(err.message);
        }
    }

    useEffect(() => {
        console.log("calling useEffect");
        connectionsData();
    }, []);

    if(connections === null) {         
        return (
            <div>
                <Header />
                <h1 className="font-bold text-2xl flex justify-center my-5">No Connections found!!</h1>
            </div>
        )
    }

    return (
        <div className="min-h-screen dark:bg-gray-950 dark:text-white">
            <Header />
            <h1 className="text-center text-2xl font-bold">My Connections</h1>
            {connections && <div>
                {connections.map((connection) => {
                    const {_id, firstName, lastName, about, profilePhoto} = connection;
                    return (
                        <div key={_id} 
                        className="flex bg-base-200 border rounded-md mx-auto mt-5 p-5 border-[#ccc] w-[100%] sm:w-[80%] md:w-[60%] lg:w-[40%] align-middle text-center dark:bg-gray-700 dark:border-gray-600 ">
                            {/*profile photo*/}
                            <div className="w-[20%]">
                                <img className="w-20 rounded-full " src={profilePhoto} />
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
                            </div>
                        </div>
                    )

                })}
            </div>}
        </div>
    )
};

export default Connections;