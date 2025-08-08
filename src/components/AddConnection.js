import { useEffect, useState } from "react";
import Header from "./Header";
import People from "./People";
import { BASE_URL } from "../utils/url.js";
import { useDispatch, useSelector } from "react-redux";
import { addFeed } from "../utils/feedSlice.js";

const AddConenction = () => {
    const feed = useSelector((store) => store.feed);
    console.log("feed1", feed);
    
    const dispatch = useDispatch();
    const data = [
        {_id: 1, firstName: "Malti", lastName: "Jha", profilePhoto: "https://toppng.com/uploads/preview/instagram-default-profile-picture-11562973083brycehrmyv.png", bio:"Data Analyst || SQL || Python Developer"},
        {_id: 2, firstName: "Alka", lastName: "Jha", profilePhoto: "https://toppng.com/uploads/preview/instagram-default-profile-picture-11562973083brycehrmyv.png", bio:"Data Analyst || SQL || Python Developer"},
        {_id: 3, firstName: "Aryan", lastName: "Jha", profilePhoto: "https://toppng.com/uploads/preview/instagram-default-profile-picture-11562973083brycehrmyv.png", bio:"Data Analyst || SQL || Python Developer"},
        {_id: 4, firstName: "Shivani", lastName: "Joshi", profilePhoto: "https://media.licdn.com/dms/image/v2/D5603AQEUHfuXItUyuQ/profile-displayphoto-shrink_800_800/profile-displayphoto-shrink_800_800/0/1730131553181?e=1756944000&v=beta&t=Ng0gZvWsE374SPa7nh_0hFk_55ttTYcPVThbQcnw25A", bio:"Data Analyst || SQL || Python Developer"},
    ]
    // console.log(data);
    
    const feedData = async () => {
        if(feed) return;
        try {
            // const res = await axios.get(BASE_URL+"/user/feed", {
            //     withCredentials: true,
            // });
            // dispatch(addFeed(res.data));
            dispatch(addFeed(data));
        }
        catch(err) {
            console.log(err.message);
        }
    }

    useEffect(() => {
        feedData();
    }, [])

    return (
        <div>
            <Header />
            {feed && <div>
                {feed.map((p) => {                    
                    return <People key={p._id} data={p}/>
                    // return <People key={p._id} user={p} /> 
                    // for real data (to correct after checking from db)
                })}
            </div>}
            {/* <People /> */}
        </div>
    )
};

export default AddConenction;