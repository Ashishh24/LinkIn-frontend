import { useEffect } from "react";
import Header from "./Header";
import People from "./People.js";
import { BASE_URL } from "../utils/url.js";
import { useDispatch, useSelector } from "react-redux";
import { addConnection } from "../utils/connectionSlice.js";
import axios from "axios";

const Connections = () => {
    const connections = useSelector((store) => store.connections);
    
    const dispatch = useDispatch();
    
    const connectionsData = async () => {
        if(connections) return;
        try {
            const res = await axios.get(BASE_URL+"/user/connections", {
                withCredentials: true,
            });
            dispatch(addConnection(res.data.data));
        }
        catch(err) {
            console.log(err.message);
        }
    }

    useEffect(() => {
        connectionsData();
    }, []);

    if(connections === null) {         
        return (
            <div>
                <Header />
                <h1 className="font-bold text-2xl flex justify-center my-5">No Connections found!!</h1>
            </div>
        )
    }

    return (
        <div className="min-h-screen">
            <Header />
            <h1 className="text-center text-2xl font-bold">My Connections</h1>
            {connections && <div>
                {connections.map((connection) => (
                    <People key={connection._id} data={connection} type="connection"/>
                ))}
            </div>}
        </div>
    )
};

export default Connections;