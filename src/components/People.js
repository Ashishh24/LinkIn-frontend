import { useDispatch } from "react-redux";
import { removeFeed } from "../utils/feedSlice";
import axios from "axios";
import { BASE_URL } from "../utils/url";
import { updateRequestStatus } from "../utils/feedSlice";

const People = ({ data, type }) => {
    const {_id, firstName, lastName, bio, profilePhoto} = data;
    const dispatch = useDispatch();

    const sendRequest = async(_id) => {
        const res = await axios.post(BASE_URL+"request/send/connect/" + _id, {}, { withCredentials: true } )
        dispatch(updateRequestStatus({userId: _id, status: "sent"}))
    }

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

    return (
        <div className="flex bg-base-200 border border-[#ccc] w-[100%] md:w-[80%] lg:w-[60%] align-middle text-center p-5 mx-auto mt-5">
            <div className="w-[15%]">
                <img className="w-20 rounded-full border-black" src={profilePhoto} />
            </div> 
            <div className=" md:flex w-[85%] items-center">
                <div className="w-[60%]">
                    <div className="flex space-x-2 text-xl">
                        {firstName + " " + lastName}
                    </div>
                    <div className="text-left">
                        {bio}
                    </div>
                </div>
                <div className="w-[100%] flex flex-col sm:flex-row sm:items-end justify-end gap-4 pt-2">
                    <div>
                        {type === "connection" && (
                            <div>
                                <button className="bg-gray-400 text-white px-5 py-2 rounded-3xl" disabled>
                                    Friends
                                </button>
                            </div>
                        )}
                        {type === "request" && (
                            <div className="flex gap-4">
                                <button onClick={() => handleConnect(_id,"accept")} className="border rounded-3xl border-[#ccc] py-2 px-5 hover:bg-green-500 hover:text-white">Accept</button>
                                <button onClick={() => handleConnect(_id,"reject")} className="border rounded-3xl border-[#ccc] py-2 px-5 hover:bg-red-500 hover:text-white">Reject</button>
                            </div>
                        )}
                        {type === "feed" && (
                        <div className="">
                            {data.requestStatus === "sent" 
                                ? (
                                    <button className="bg-gray-400 text-white px-5 py-2 rounded-3xl" disabled>
                                        Request Sent
                                    </button>
                                ) : (
                                    <button
                                        className="border border-[#ccc] hover:bg-blue-600 hover:text-white px-5 py-2 rounded-3xl"
                                        onClick={() => sendRequest(data._id)}
                                    >
                                        Connect
                                    </button>
                                )
                            }
                        </div>
                        )}
                        {type === "requestSent" && (
                        <div className="">
                            <button className="bg-gray-400 text-white px-5 py-2 rounded-3xl" disabled>
                                Request Sent
                            </button>
                        </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
};

export default People;