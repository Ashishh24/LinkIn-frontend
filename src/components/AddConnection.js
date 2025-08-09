import { useEffect } from "react";
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
                    // for real data (to correct after checking from db)
                })}
            </div>}
            {/* <People /> */}
        </div>
    )
};

export default AddConenction;