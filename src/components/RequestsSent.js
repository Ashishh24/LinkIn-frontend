import { useEffect } from "react";
import Header from "./Header.js";
import People from "./People.js";
import { BASE_URL } from "../utils/url.js";
import { useDispatch, useSelector } from "react-redux";
import { addRequestSent, removeRequestSent } from "../utils/requestSentSlice.js";
import axios from "axios";
import {useNavigate} from "react-router-dom";

const RequestsSent = () => {
    const requestsSent = useSelector((store) => store.requestsSent);

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const requestsSentData = async () => {
        if(requestsSent) return;
        try {
            const res = await axios.get(BASE_URL+"profile/connectionRequestSent", {
                withCredentials: true,
            });
            console.log(res)
            dispatch(addRequestSent(res.data.data));
            console.log(res.data.data)
        }
        catch(err) {
            console.log(err.message);
        }
    }

    useEffect(() => {
        requestsSentData();
    }, []);

    //need to modify
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

    if(requestsSent === null) { 
        console.log("req length 0");
        
        return (
            <div>
                <Header />
                <h1 className="font-bold text-2xl flex justify-center my-5">You haven't sent request to anyone. Connect with someone.</h1>
                <div className="flex justify-center items-center">
                    <button onClick={() => {navigate("/add")}} className="my-5 flex justify-center items-center w-[50%] px-5 py-2 rounded-full border cursor-pointer hover:bg-blue-500 hover:text-white">Connect</button>
                </div>
            </div>
        )
    }


    return (
        <div>
            <Header />
            {requestsSent && 
                <div>
                    {requestsSent.map((p) => (
                        <People key={p.toUserID._id} data={p.toUserID} type="requestSent" />
                    ))}
                </div>
            }
        </div>
    )
};

export default RequestsSent;