import { useEffect } from "react";
import Header from "./Header.js";
import { BASE_URL } from "../utils/url.js";
import { useDispatch, useSelector } from "react-redux";
import { addRequest, removeRequest } from "../utils/requestSlice.js";
import axios from "axios";
import {useNavigate} from "react-router-dom";

const Requests = () => {
    const requests = useSelector((store) => store.requests);

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const requestsData = async () => {
        if(requests) return;
        try {
            const res = await axios.get(BASE_URL+"user/connectionRequest", {
                withCredentials: true,
            });
            dispatch(addRequest(res.data.data));
        }
        catch(err) {
            console.log(err.message);
        }
    }

    useEffect(() => {
        requestsData();
    }, []);

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

    if(requests === null) { 
        console.log("req length 0");
        
        return (
            <div>
                <Header />
                <h1 className="font-bold text-2xl flex justify-center my-5">No Request found!!</h1>
            </div>
        )
    }


    return (
        <div>
            <Header />
            {requests && <div>
                {requests.map((request) => {
                    const {_id} = request;
                    const fromUserID = request.fromUserID;
                    const { firstName, lastName, bio, profilePhoto} = fromUserID;

                    return (
                        <div key={_id} className="flex bg-base-200 border border-[#ccc] w-[50%] align-middle text-center p-5 mx-auto mt-5 dark:bg-gray-700 dark:border-gray-600">
                            {/*profile photo*/}
                            <div className="w-[15%]">
                                <img className="w-20 rounded-full border-black" src={profilePhoto} />
                            </div> 
                            <div className="flex w-[90%] items-center">
                                <div className="w-[90%]">
                                    <div 
                                        className="flex space-x-2 text-xl cursor-pointer" 
                                        onClick={() => {
                                                navigate(`/profile/${fromUserID._id}`, {
                                                state: { _id, fromUserID }
                                            })}
                                        }
                                        >
                                            {firstName + " " + lastName}
                                    </div>
                                    <div className="text-left">
                                        {bio}
                                    </div>
                                </div>
                                <div>
                                    <div className="flex gap-4">
                                        <button onClick={() => handleConnect(_id,"reject")} className="border rounded-3xl border-[#ccc] py-2 px-7 cursor-pointer hover:bg-red-500 hover:text-white">Reject</button>
                                        <button onClick={() => handleConnect(_id,"accept")} className="border rounded-3xl border-[#ccc] py-2 px-7 cursor-pointer hover:bg-[#2E78B6] hover:text-white">Accept</button>
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

export default Requests;