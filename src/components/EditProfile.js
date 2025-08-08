import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { updateUser } from "../utils/userSlice";

const EditProfile = () => {

    // const userData = useSelector(store => store.user);
    // let user;

    const userData = {
        firstName: "Ashish",
        lastName: "Anand",
        email: "ashish@google.com",
        profilePhoto: "https://media.licdn.com/dms/image/v2/D5603AQEn2R6cZas60w/profile-displayphoto-shrink_800_800/profile-displayphoto-shrink_800_800/0/1696881242846?e=1757548800&v=beta&t=jt-JixJkevT34NzSucwhj_ygJw39ug7A6Fde4uyX41M",
        phone: ""
    }

    const fetchUser = async() => {
        if(userData) return;
        try {
            // const user = await axios.get(BASE_URL+"/profile/view", {
            //     withCredentials: true,
            // });

            /** DUMMY USER FOR TEST PURPOSE, WILL REMOVE WHEN MAKE LIVE */
            // const user = {
            //     firstName: "Ashish",
            //     lastName: "Anand",
            //     email: "ashish@google.com",
            //     profilePhoto: "https://media.licdn.com/dms/image/v2/D5603AQEn2R6cZas60w/profile-displayphoto-shrink_800_800/profile-displayphoto-shrink_800_800/0/1696881242846?e=1757548800&v=beta&t=jt-JixJkevT34NzSucwhj_ygJw39ug7A6Fde4uyX41M",
            //     phone: ""
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
    


    // const userData = useSelector(store => store.user)
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [firstName, setFirstName] = useState(userData?.firstName || "");
    const [lastName, setLastName] = useState(userData?.lastName || "");
    const [gender, setGender] = useState(userData?.gender || "");
    const [phone, setPhone] = useState(userData?.phone || "");
    const [profilePhoto, setProfilePhoto] = useState(userData.profilePhoto);
    const [about, setAbout] = useState(userData?.about || "");
    // const [skills, setSkills] = useState(userData.skills);        

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(updateUser({            
            firstName: firstName,
            lastName: lastName,
            gender: gender,
            phone: phone,
            profilePhoto: profilePhoto,
            about: about,
            // skills: firstName,
        }));
        alert("Profile updated successfully!!")
        navigate("/");
    }

    const [previewURL, setPreviewURL] = useState(null);
    const [showModal, setShowModal] = useState(false);


    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const preview = URL.createObjectURL(file);
            setPreviewURL(preview);
        }
    };

    const handleSave = () => {
        if (previewURL) {
            setProfilePhoto(previewURL);
        }
        setShowModal(false);
    };

    return (
        <div>
            <section className="bg-white dark:bg-gray-900">
                {/* HEADER */}
                <div className="text-center my-5">
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Edit Profile</h2>
                </div>
                
                {/* EDIT DATA */}
                <div className="w-[80%] py-8 my-3 mx-auto  lg:py-8 flex">
                    <div className="w-[70%] md:w-[70%] px-5 border-r-1 border-[#ccc]">
                        <form onSubmit={handleSubmit}>
                            <div className="grid gap-4 mb-4 sm:grid-cols-2 sm:gap-6 sm:mb-5">
                                <div className="sm:col-span-2">
                                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">First Name</label>
                                    <input type="text" value={firstName} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Type product name" required="" onChange={(e) => setFirstName(e.target.value)}/>
                                </div>
                                <div className="sm:col-span-2">
                                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Last Name</label>
                                    <input type="text" value={lastName} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Type product name" required="" onChange={(e) => setLastName(e.target.value)}/>
                                </div>
                                <div className="w-full">
                                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Gender</label>
                                    <select id="category"  value={gender}
                                        onChange={(e) => {
                                            const selectedGender = e.target.value;
                                            setGender(selectedGender); // Update local state
                                        }} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500">
                                        <option value="Male">Male</option>
                                        <option value="Female">Female</option>
                                        <option value="No">Prefer not to say</option>
                                    </select>
                                </div>
                                <div className="w-full">
                                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Phone</label>
                                    <input type="number" value={phone} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="" required=""  onChange={(e) => setPhone(e.target.value)}/>
                                </div>
                                {/* <div>
                                    <label for="category" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Category</label>
                                    <select id="category" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500">
                                        <option selected="">Electronics</option>
                                        <option value="TV">TV/Monitors</option>
                                        <option value="PC">PC</option>
                                        <option value="GA">Gaming/Console</option>
                                        <option value="PH">Phones</option>
                                    </select>
                                </div> */}
                                {/* <div>
                                    <label for="item-weight" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Item Weight (kg)</label>
                                    <input type="number" name="item-weight" id="item-weight" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" value="15" placeholder="Ex. 12" required=""/>
                                </div>  */}
                                <div className="sm:col-span-2">
                                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">About</label>
                                    <textarea rows="5" value={about} className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Tell something about yourself..."  onChange={(e) => setAbout(e.target.value)}></textarea>
                                </div>
                            </div>
                        </form>
                    </div>

{/******************** NEED MORE MODIFICATION */}
                    <div className="p-6">
                        <div className="mb-4">
                            <div className="max-w-96 max-h-96 rounded-full overflow-hidden border shadow">
                                <img src={profilePhoto} className="w-full h-full object-cover"/>
                            </div>                            
                            <button
                                onClick={() => setShowModal(true)}
                                className="mt-2 p-3 border float-end rounded-full text-sm cursor-pointer hover:bg-blue-500 hover:text-white">
                                Change Image
                            </button>
                        </div>

                        {/* Modal */}
                        {showModal && (
                            <div className="fixed inset-0 flex items-center justify-center  bg-opacity-50 backdrop-blur-sm z-50">
                                <div className="bg-white p-6 rounded-lg w-80 border">
                                    <h2 className="text-lg font-semibold mb-4">Select New Image</h2>
                                    <input
                                        type="file"
                                        accept="image/*"
                                        onChange={handleFileChange}
                                        className="mb-4"
                                    />

                                    {previewURL && (
                                    <img
                                        src={previewURL}
                                        alt="Preview"
                                        className="w-32 h-32 object-cover rounded mb-4"
                                    />
                                    )}

                                    <div className="flex justify-end gap-2">
                                    <button
                                        onClick={() => setShowModal(false)}
                                        className="px-4 py-2 text-sm bg-gray-200 rounded"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        onClick={handleSave}
                                        className="px-4 py-2 text-sm bg-blue-600 text-white rounded"
                                    >
                                        Save
                                    </button>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
                
                {/* SUBMIT/CANCEL BUTTON */}
                <div className="flex justify-center space-x-4">
                    <button className="border rounded-xl px-3 py-2 cursor-pointer dark:text-white dark:border-white hover:bg-blue-500 hover:text-white">
                        Update Profile
                    </button>
                    <button className="border rounded-xl px-3 py-2 cursor-pointer dark:text-white dark:border-white hover:bg-red-600 hover:text-white">
                        Cancel
                    </button>
                </div>
            </section>
        </div>
    )
}

export default EditProfile;




{/* <div className="w-[30%] px-5 flex flex-col gap-4 items-end">
    Current Image Preview
    <div className="max-w-96 max-h-96 rounded-full overflow-hidden border shadow">
        <img
        src={profilePhoto}
        alt="Profile"
        className="w-full h-full object-cover"
        />
    </div>

    Upload New Image
    <input
        type="file"
        accept="image/*"
        onChange={handleImageChange}
        className="block text-sm text-gray-500 file:mr-4 file:py-2 file:px-4
            file:rounded-full file:border-0
            file:text-sm file:font-semibold
            file:bg-blue-50 file:text-blue-700
            hover:file:bg-blue-100"
    />
    <label>Enter Photo URL:</label>
    <input type="text" value={profilePhoto} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Type product name" required="" onChange={(e) => setProfilePhoto(e.target.value)}/> }
</div> */}