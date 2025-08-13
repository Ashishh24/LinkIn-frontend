import { useEffect, useState } from "react";
import Header from "./Header";
import People from "./People";
import { BASE_URL } from "../utils/url.js";
import { useDispatch, useSelector } from "react-redux";
import { addFeed } from "../utils/feedSlice.js";
import axios from "axios";
import { useLocation } from "react-router-dom";

const AddConenction = () => {
    const feed = useSelector((store) => store.feed);
    const { state } = useLocation();
    const {searchText} = state;
    const dispatch = useDispatch();
    
    const [filterFeed, setFilterFeed] = useState([]);
    
    const feedData = async () => {
        if (feed && feed.length > 0) {
            if (!searchText) {
                setFilterFeed(feed);
            } else {
                const newFeed = feed.filter(f => {
                    const name = `${f.firstName} ${f.lastName}`.toLowerCase();
                    return name.includes(searchText.toLowerCase());
                });
                setFilterFeed(newFeed);
            }
            return;
        }
        try {
            const res = await axios.get(BASE_URL+"user/feed", {
                withCredentials: true,
            });
            dispatch(addFeed(res.data.data));
        }
        catch(err) {
            console.log(err.message);
        }
    }

    useEffect(() => {
        feedData();
    }, [searchText, feed])

    return (
        <div>
            <Header />
            {console.log(filterFeed)}
            {filterFeed.length !== 0
                ? (<div>
                    {filterFeed.map((p) => {                    
                        return <People key={p._id} data={p}/>
                    })}
                </div>)
                : <h1 className="flex justify-center text-2xl font-bold m-5">No reults found!</h1>
            }
        </div>
    )
};

export default AddConenction;