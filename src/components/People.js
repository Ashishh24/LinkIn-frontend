import { useDispatch, useSelector } from "react-redux";
import { removeFeed } from "../utils/feedSlice";
import axios from "axios";
import { BASE_URL } from "../utils/url";

const People = (props) => {
    const {_id, firstName, lastName, bio, profilePhoto} = props.data;
    const dispatch = useDispatch();

    const handleConnect = async(_id) => {
        const res = await axios.post(BASE_URL+"request/send/connect/" + _id, {}, { withCredentials: true } )
        // const feed = useSelector(store => store.feed);
        dispatch(removeFeed(_id));
        // console.log("removed feed",firstName);
        
    }

    return (
        <div className="flex bg-base-200 border border-[#ccc] w-[50%] align-middle text-center p-5 mx-auto mt-5 dark:bg-gray-700 dark:border-gray-600">
            <div className="w-[15%]">
                <img className="w-20 rounded-full border-black" src={profilePhoto} />
            </div> 
            <div className="flex w-[90%] items-center">
                <div className="w-[90%]">
                    <div className="flex space-x-2 text-xl">
                        {firstName + " " + lastName}
                    </div>
                    <div className="text-left">
                        {bio}
                    </div>
                </div>
                <div>
                    <div>
                        <button onClick={() => handleConnect(_id)} className="border rounded-3xl border-[#ccc] py-2 px-7 cursor-pointer hover:bg-[#2E78B6] hover:text-white">Connect</button>
                    </div>
                </div>
            </div>
        </div>
    )
};

export default People;