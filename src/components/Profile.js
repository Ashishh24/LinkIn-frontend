import { Link } from "react-router-dom";

const Profile = () => {
    return (
        <div>
            <button className="border rounded-xl"> <Link to="/edit"> EditProfile</Link></button>
        </div>
    )
};

export default Profile;