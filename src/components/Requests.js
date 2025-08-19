import { useEffect } from "react";
import Header from "./Header.js";
import People from "./People.js";
import { BASE_URL } from "../utils/url.js";
import { useDispatch, useSelector } from "react-redux";
import { addRequest } from "../utils/requestSlice.js";
import axios from "axios";
import {Link, useNavigate} from "react-router-dom";
import toast from "react-hot-toast";

const Requests = () => {
    const requests = useSelector((store) => store.requests);

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const requestsData = async () => {
        if(requests) return;
        try {
            const res = await axios.get(BASE_URL+"/user/connectionRequest", {
                withCredentials: true,
            });
            dispatch(addRequest(res.data.data));
        }
        catch(err) {
            toast.error("Unable to fetch Connection Requests!!")
            console.log(err.message);
        }
    }

    useEffect(() => {
        requestsData();
    }, []);

    if(requests === null) {         
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
            <h1 className="text-2xl font-bold text-center">New Requests</h1>
            <p className="text-sm text-center"><Link to="/requests/sent">See the people you have sent requests to...</Link></p>
            {requests && <div>
                {requests.map((request) => (
                    <People key={request.fromUserID._id} data={request.fromUserID} type="request" />
                ))}
            </div>}
        </div>
    )
};

export default Requests;