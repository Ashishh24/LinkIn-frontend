import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { BASE_URL } from "../utils/url";
import { addUser } from "../utils/userSlice";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const User = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const userData = useSelector(store => store.user);
    
    // adding user to store after page reload
    const fetchUser = async() => {
        if(userData) return;
        try {
            const user = await axios.get(BASE_URL+"profile/view", {
                withCredentials: true,
            });
            console.log("userrrrrrrr");
            dispatch(addUser(user.data));
            /** DUMMY USER FOR TEST PURPOSE, WILL REMOVE WHEN MAKE LIVE */
            // const user = {
            //     firstName: "Ashish",
            //     lastName: "Anand",
            //     email: "ashish@google.com",
            //     profilePhoto: "https://media.licdn.com/dms/image/v2/D5603AQEn2R6cZas60w/profile-displayphoto-shrink_800_800/profile-displayphoto-shrink_800_800/0/1696881242846?e=1757548800&v=beta&t=jt-JixJkevT34NzSucwhj_ygJw39ug7A6Fde4uyX41M",
            // }
            // dispatch(addUser(user));
        }
        catch(err) {
            if (err.status == 401) {
                navigate("/login") 
            }
            else {
                <Error />
            }
            console.log(err.message);
        }
    }

    useEffect(() => {
        fetchUser();
    }, [])

    return (
        <div></div>
    )


}

export default User;