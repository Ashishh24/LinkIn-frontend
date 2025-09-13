import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { updateUser } from "../utils/userSlice";
import toast from "react-hot-toast";
import { BASE_URL } from "../utils/url";
import axios from "axios";
import { uploadDp } from "../utils/mediaUpload";
import { Eye, EyeOff } from "lucide-react";

const EditProfile = () => {
  const userData = useSelector((store) => store.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const fileInputRef = useRef(null);

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [gender, setGender] = useState("");
  const [phone, setPhone] = useState("");
  const [profilePhoto, setProfilePhoto] = useState("");
  const [about, setAbout] = useState("");
  const [skill, setSkill] = useState("");
  const [skills, setSkills] = useState([]);
  const [changePassword, setChangePassword] = useState(false);
  const [oldpassword, setOldPassword] = useState("");
  const [newpassword, setNewPassword] = useState("");
  const [errors, setErrors] = useState({ old: "", new: "" });
  const [showPassword, setShowPassword] = useState(false);

  const addSkill = (e) => {
    e.preventDefault();
    if (skill.trim() && !skills.includes(skill.trim())) {
      setSkills([...skills, skill.trim()]);
      setSkill("");
    }
  };

  const removeSkill = (index) => {
    setSkills(skills.filter((_, i) => i !== index));
  };

  useEffect(() => {
    setFirstName(userData?.firstName || "");
    setLastName(userData?.lastName || "");
    setGender(userData?.gender || "");
    setPhone(userData?.phone || "");
    setProfilePhoto(userData?.profilePhoto || "");
    setAbout(userData?.about || "");
    setSkills(userData?.skills || []);
  }, [userData]);

  const capitalizeFirstLetter = (str) =>
    str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();

  const handleSubmit = async (e) => {
    try {
      const editData = {
        firstName: capitalizeFirstLetter(firstName),
        lastName: capitalizeFirstLetter(lastName),
        gender: gender,
        phone: phone,
        profilePhoto: profilePhoto,
        about: about,
        skills: skills,
      };
      dispatch(updateUser(editData));
      const res = await axios.patch(BASE_URL + "/profile/edit", editData, {
        withCredentials: true,
      });
      console.log(res);

      toast.success("Profile updated successfully!");
      navigate("/profile");
    } catch (err) {
      console.log(err);

      toast.error(
        err?.response?.data?.message || err?.message || "Something went wrong"
      );
    }
  };

  const cancelButton = () => {
    navigate("/profile");
  };

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    try {
      const uploadedUrl = await uploadDp(file);
      setProfilePhoto(uploadedUrl);
    } catch (err) {
      toast.error(err.message || "Image upload failed!");
    }
    e.target.value = "";
  };

  const handleConfirmChangePassword = async () => {
    let hasError = false;
    const newErrors = { old: "", new: "" };

    if (!oldpassword.trim()) {
      newErrors.old = "Old password is mandatory";
      hasError = true;
    }
    if (!newpassword.trim()) {
      newErrors.new = "New password is mandatory";
      hasError = true;
    }
    setErrors(newErrors);
    if (hasError) return;

    try {
      console.log(oldpassword, newpassword);

      const res = await axios.patch(
        BASE_URL + "/profile/changePassword",
        { oldPassword: oldpassword, newPassword: newpassword },
        {
          withCredentials: true,
        }
      );
      console.log(res);
      toast.success("Password changed successfully!!");
      setChangePassword(false);
    } catch (err) {
      console.log(err);
      // toast.error(err.response.data.message || err.message);
      const errorMessage =
        err?.response?.data?.message || err.message || "Something went wrong";
      setErrors({ old: "", new: errorMessage });
    }
  };

  return (
    <div>
      <section className="bg-white">
        {/* HEADER */}
        <div className="text-center py-5">
          <h2 className="text-2xl font-bold text-gray-900">Edit Profile</h2>
        </div>

        {/* EDIT DATA */}
        <div className="w-[100%] md:w-[80%] py-8 my-3 mx-auto lg:py-8 flex">
          <div className="w-[60%] md:w-[70%] px-5 border-r-1 border-[#ccc]">
            <form>
              <div className="grid gap-4 mb-4 sm:grid-cols-2 sm:gap-6 sm:mb-5">
                {/* FIRST NAME */}
                <div className="sm:col-span-2">
                  <label className="block mb-2 text-sm font-medium text-gray-900">
                    First Name
                  </label>
                  <input
                    type="text"
                    value={firstName}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                    onChange={(e) => setFirstName(e.target.value)}
                  />
                </div>
                {/* LAST NAME */}
                <div className="sm:col-span-2">
                  <label className="block mb-2 text-sm font-medium text-gray-">
                    Last Name
                  </label>
                  <input
                    type="text"
                    value={lastName}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                    onChange={(e) => setLastName(e.target.value)}
                  />
                </div>
                {/* GENDER */}
                <div className="w-full">
                  <label className="block mb-2 text-sm font-medium text-gray-900">
                    Gender
                  </label>
                  <select
                    id="category"
                    value={gender}
                    onChange={(e) => {
                      const selectedGender = e.target.value;
                      setGender(selectedGender);
                    }}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5">
                    <option defaultValue="Choose">Choose Gender</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="No">Prefer not to say</option>
                  </select>
                </div>
                {/* PHONE */}
                <div className="w-full">
                  <label className="block mb-2 text-sm font-medium text-gray-900">
                    Phone
                  </label>
                  <input
                    type="text"
                    value={phone}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                    onChange={(e) => setPhone(e.target.value)}
                  />
                </div>
                {/* ABOUT */}
                <div className="sm:col-span-2">
                  <label className="block mb-2 text-sm font-medium text-gray-900">
                    About
                  </label>
                  <textarea
                    rows="1"
                    resize="none"
                    value={about}
                    className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-primary-500 focus:border-primary-500"
                    placeholder="Tell something about yourself..."
                    onChange={(e) => setAbout(e.target.value)}></textarea>
                </div>
                {/* SKILLS */}
                <div className="sm:col-span-2">
                  <label className="block mb-2 text-sm font-medium text-gray-900">
                    Skills
                  </label>
                  <div className="flex flex-col sm:flex-row gap-2">
                    <input
                      value={skill}
                      onChange={(e) => setSkill(e.target.value)}
                      placeholder="Type skill and press Enter"
                      onKeyDown={(e) => e.key === "Enter" && addSkill()}
                      className="border px-3 py-2 rounded"
                    />
                    <button
                      type="button"
                      onClick={addSkill}
                      className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 cursor-pointer">
                      Add
                    </button>
                  </div>

                  {/* Current + newly added skills */}
                  <div className="flex flex-wrap mt-3 gap-2">
                    {skills?.map((s, i) => (
                      <span
                        key={i}
                        className="flex items-center gap-1 bg-gray-200 text-gray-800 px-3 py-1 rounded-full">
                        {s}
                        <button
                          onClick={() => removeSkill(i)}
                          className="ml-1 text-red-500 cursor-pointer">
                          ×
                        </button>
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </form>
          </div>

          <div className="w-[40%] p-6">
            <div className="mb-4">
              <div className="aspect-square rounded-full overflow-hidden border shadow">
                <img
                  src={profilePhoto}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Hidden file input */}
              <input
                type="file"
                accept="image/*"
                ref={fileInputRef}
                onChange={handleFileChange}
                style={{ display: "none" }}
              />
              <button
                onClick={() => fileInputRef.current.click()}
                className="mt-2 p-3 border float-end rounded-full text-sm cursor-pointer hover:bg-blue-500 hover:text-white">
                Change Image
              </button>
            </div>
          </div>
        </div>

        {/* CHANGE PASSWORD/SUBMIT/CANCEL BUTTON */}
        <div className="flex justify-center space-x-4 pb-4">
          <button
            onClick={() => setChangePassword(true)}
            className="border rounded-xl px-3 py-2 cursor-pointer hover:bg-green-500 hover:text-white">
            Change Password
          </button>
          {changePassword && (
            <div className="modal-overlay">
              <div className="modal-contentPassword">
                <h1 className="text-center text-2xl m-2">
                  Confirm Change Password
                </h1>
                <div className="my-4">
                  <input
                    type="password"
                    placeholder="Old Password"
                    className="border p-2 rounded w-full"
                    value={oldpassword}
                    onChange={(e) => setOldPassword(e.target.value)}
                  />
                  <span
                    className="absolute right-1 top-3 cursor-pointer"
                    onClick={() => setShowPassword(!showPassword)}>
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </span>
                  {errors.old && (
                    <p className="text-red-600 text-sm">{errors.old}</p>
                  )}
                </div>
                <div className="my-4">
                  <input
                    type="password"
                    placeholder="New Password"
                    className="border p-2 rounded w-full"
                    value={newpassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                  />
                  <span
                    className="absolute right-1 top-3 cursor-pointer"
                    onClick={() => setShowPassword(!showPassword)}>
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </span>
                  {errors.new && (
                    <p className="text-red-600 text-sm">{errors.new}</p>
                  )}
                </div>
                <div className="flex mt-6 gap-4 text-end justify-end">
                  <button
                    onClick={() => {
                      setChangePassword(false);
                      setErrors({ old: "", new: "" });
                      setOldPassword("");
                      setNewPassword("");
                    }}
                    className="bg-indigo-600 text-white cursor-pointer px-4 py-2 rounded-lg hover:bg-indigo-700">
                    Cancel
                  </button>
                  <button
                    onClick={handleConfirmChangePassword}
                    className="bg-red-600 text-white cursor-pointer px-4 py-2 rounded-lg hover:bg-red-700">
                    Confirm Change
                  </button>
                </div>
              </div>
            </div>
          )}

          <style>{`
          .modal-overlay {
              position: fixed;
              top: 0; left: 0;
              width: 100%; height: 100%;
              background: rgba(0,0,0,0.5);
              display: flex; 
              justify-content: center; 
              align-items: center;
          }
          .modal-contentPassword {
              background: white;
              padding: 20px;
              border-radius: 10px;
              width: 350px;
              text-align: left;
          }
        `}</style>

          <button
            onClick={handleSubmit}
            className="border rounded-xl px-3 py-2 cursor-pointer hover:bg-blue-500 hover:text-white">
            Update Profile
          </button>
          <button
            onClick={cancelButton}
            className="border rounded-xl px-3 py-2 cursor-pointer hover:bg-red-600 hover:text-white">
            Cancel
          </button>
        </div>
      </section>
    </div>
  );
};

export default EditProfile;
