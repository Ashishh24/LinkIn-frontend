import { useEffect, useState } from "react";
import Header from "./Header";
import People from "./People";
import { BASE_URL } from "../utils/url.js";
import { useDispatch, useSelector } from "react-redux";
import { addRequests } from "../utils/requestSlice.js";

const Requests = () => {
    const requests = useSelector((store) => store.requests);
    console.log("requests1", requests);
    
    const data = [
        {_id: 1, firstName: "Madhu", lastName: "Ray", profilePhoto: "https://toppng.com/uploads/preview/instagram-default-profile-picture-11562973083brycehrmyv.png", bio:"Data Analyst || SQL || Python Developer"},
        {_id: 2, firstName: "Sonal", lastName: "Jha", profilePhoto: "https://toppng.com/uploads/preview/instagram-default-profile-picture-11562973083brycehrmyv.png", bio:"Data Analyst || SQL || Python Developer"},
        {_id: 3, firstName: "Akshita", lastName: "Jha", profilePhoto: "https://toppng.com/uploads/preview/instagram-default-profile-picture-11562973083brycehrmyv.png", bio:"Data Analyst || SQL || Python Developer"},
    ]

    const dispatch = useDispatch();
    
    const requestsData = async () => {
        if(requests) return;
        try {
            // const res = await axios.get(BASE_URL+"/user/connectionRequest", {
            //     withCredentials: true,
            // });
            // dispatch(addRequests(res.data));
            dispatch(addRequests(data));
        }
        catch(err) {
            console.log(err.message);
        }
    }

    useEffect(() => {
        requestsData();
    }, [])

    return (
        <div>
            <Header />
            {requests && <div>
                {requests.map((p) => {
                    //still require modification!!       
                    return <People key={p._id} data={p}/>
                    // for real data (to correct after checking from db)
                })}
            </div>}
            {/* <People /> */}
        </div>
    )
};

export default Requests;