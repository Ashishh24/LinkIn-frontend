import { useState } from "react";
import Header from "./Header";
import People from "./People";
import { BASE_URL } from "../utils/url.js";

const AddConenction = () => {
    const data = [
        {_id: 1, firstName: "Malti", lastName: "Jha", profilePhoto: "https://toppng.com/uploads/preview/instagram-default-profile-picture-11562973083brycehrmyv.png", bio:"Data Analyst || SQL || Python Developer"},
        {_id: 2, firstName: "Alka", lastName: "Jha", profilePhoto: "https://toppng.com/uploads/preview/instagram-default-profile-picture-11562973083brycehrmyv.png", bio:"Data Analyst || SQL || Python Developer"},
        {_id: 3, firstName: "Aryan", lastName: "Jha", profilePhoto: "https://toppng.com/uploads/preview/instagram-default-profile-picture-11562973083brycehrmyv.png", bio:"Data Analyst || SQL || Python Developer"},
        {_id: 4, firstName: "Shivani", lastName: "Joshi", profilePhoto: "https://media.licdn.com/dms/image/v2/D5603AQEUHfuXItUyuQ/profile-displayphoto-shrink_800_800/profile-displayphoto-shrink_800_800/0/1730131553181?e=1756944000&v=beta&t=Ng0gZvWsE374SPa7nh_0hFk_55ttTYcPVThbQcnw25A", bio:"Data Analyst || SQL || Python Developer"},
    ]
    console.log(data);
    
    // const [people, setPeople] = useState()
    // const newPeople = async () => {
    //     try {
    //         // const data = await axios.get(BASE_URL+"/user/feed");
    //         // const json = await data.json();
    //         setPeople(json);
    //     }
    //     catch(err) {

    //     }
    // }

    return (
        <div>
            <Header />
            <div>
                {data.map((p) => {                    
                    return <People key={p._id} data={p}/>
                })}
            </div>
        </div>
    )
};

export default AddConenction;