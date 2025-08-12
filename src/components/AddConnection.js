import { useEffect } from "react";
import Header from "./Header";
import People from "./People";
import { BASE_URL } from "../utils/url.js";
import { useDispatch, useSelector } from "react-redux";
import { addFeed } from "../utils/feedSlice.js";
import axios from "axios";

const AddConenction = () => {
    const feed = useSelector((store) => store.feed);
    
    const dispatch = useDispatch();
    
    const feedData = async () => {
        if(feed) return;
        try {
            const res = await axios.get(BASE_URL+"user/feed", {
                withCredentials: true,
            });
            console.log(res);
            
            dispatch(addFeed(res.data.data));
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
                })}
            </div>}
        </div>
    )
};

export default AddConenction;