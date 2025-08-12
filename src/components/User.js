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
        }
        catch(err) {
            if (err.status == 401) {
                navigate("/") 
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