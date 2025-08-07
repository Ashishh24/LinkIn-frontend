import axios from "axios";
import { useDispatch } from "react-redux";
import { BASE_URL } from "../utils/url";
import { addUser } from "../utils/userSlice";
import { useEffect } from "react";

const User = () => {
    const dispatch = useDispatch();
    const fetchUser = async() => {
        try {
            const user = await axios.get(BASE_URL+"/profile/view", {
                withCredentials: true,
            });
            dispatch(addUser(user));
        }
        catch(err) {
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