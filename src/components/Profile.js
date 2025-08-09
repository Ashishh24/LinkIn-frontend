import { Link } from "react-router-dom";
import Header from "./Header"

const Profile = () => {
    return (
        <div>
            <Header />
            <div className="flex gap-4">
                <button className="border rounded-xl p-3"> <Link to="/edit">Edit Profile</Link></button>
                <button className="border rounded-xl p-3"> <Link to="/connections">Connections</Link></button>
                <button className="border rounded-xl p-3"> <Link to="/requests">requests</Link></button>
            </div>
        </div>
    )
};

export default Profile;