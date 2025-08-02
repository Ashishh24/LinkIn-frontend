import { logo } from "../utils/links";

const Header = () => {
    return (
        <div className="flex justify-between m-auto border-b-5">
            <img className="w-10 items-center" src={logo} />
            <div>
                <ul className="h-10 flex items-center space-x my-auto">
                    <li className="mx-10 items-center">Home</li>
                    <li className="mx-10 items-center">Message</li>
                    <li className="mx-10 items-center">Profile</li>
                    <li className="mx-10 border p-2 rounded-lg cursor-pointer hover:text-white hover:bg-[#2E78B6] hover:border-[#2E78B6]">Login</li>
                </ul>
            </div>
        </div>
    )
};

export default Header;