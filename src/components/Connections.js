import { useEffect } from "react";
import Header from "./Header";
import People from "./People";
import { BASE_URL } from "../utils/url.js";
import { useDispatch, useSelector } from "react-redux";
import { addConnection } from "../utils/connectionSlice.js";

const Connections = () => {
    const data = [
        {_id: 1, firstName: "Aman", lastName: "Anand", profilePhoto: "https://toppng.com/uploads/preview/instagram-default-profile-picture-11562973083brycehrmyv.png", bio:"Data Analyst || SQL || Python Developer"},
        {_id: 2, firstName: "Vikas", lastName: "Ray", profilePhoto: "https://toppng.com/uploads/preview/instagram-default-profile-picture-11562973083brycehrmyv.png", bio:"Data Analyst || SQL || Python Developer"},
        {_id: 3, firstName: "Gopal", lastName: "Jha", profilePhoto: "https://toppng.com/uploads/preview/instagram-default-profile-picture-11562973083brycehrmyv.png", bio:"Data Analyst || SQL || Python Developer"},
        {_id: 4, firstName: "Shivani", lastName: "Joshi", profilePhoto: "https://media.licdn.com/dms/image/v2/D5603AQEUHfuXItUyuQ/profile-displayphoto-shrink_800_800/profile-displayphoto-shrink_800_800/0/1730131553181?e=1756944000&v=beta&t=Ng0gZvWsE374SPa7nh_0hFk_55ttTYcPVThbQcnw25A", bio:"Data Analyst || SQL || Python Developer"},
    ]

    const connections = useSelector((store) => store.connections);
    console.log("connections1", connections);
    
    const dispatch = useDispatch();
    
    const connectionsData = async () => {
        if(connections) {
            console.log("connections exist");
            return;
        }
        try {
            // const res = await axios.get(BASE_URL+"/user/connections", {
            //     withCredentials: true,
            // });
            // dispatch(addConnection(res.data));
            console.log("calling connectionsdata");
            dispatch(addConnection(data));
        }
        catch(err) {
            console.log(err.message);
        }
    }

    useEffect(() => {
        console.log("calling useEffect");
        connectionsData();
    }, []);

    return (
        <div>
            <Header />
            {connections && <div>
                {connections.map((c) => {
                    //still require modification!!                                      
                    return <People key={c._id} data={c}/>
                    // for real data (to correct after checking from db)
                })}
            </div>}
            {/* <People /> */}
        </div>
    )
};

export default Connections;