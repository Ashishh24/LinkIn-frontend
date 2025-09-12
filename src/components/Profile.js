import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/url";
import toast from "react-hot-toast";
import Header from "./Header";
import axios from "axios";
import PostCard from "./PostCard";

const Profile = () => {
  const navigate = useNavigate();
  const userData = useSelector((store) => store.user);
  const [deleteProfile, setDeleteProfile] = useState(false);
  const [allPosts, setAllPosts] = useState([]);

  useEffect(() => {
    const skillTags = document.querySelectorAll(".bg-indigo-100");
    skillTags.forEach((tag) => {
      tag.addEventListener("mouseover", () => {
        tag.classList.remove("bg-indigo-100", "text-indigo-800");
        tag.classList.add("bg-blue-900", "text-white");
      });
      tag.addEventListener("mouseout", () => {
        tag.classList.remove("bg-blue-900", "text-white");
        tag.classList.add("bg-indigo-100", "text-indigo-800");
      });
    });

    return () => {
      skillTags.forEach((tag) => {
        tag.removeEventListener("mouseover", () => {});
        tag.removeEventListener("mouseout", () => {});
      });
    };
  }, []);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await axios.get(`${BASE_URL}/user/posts`, {
          withCredentials: true,
        });
        setAllPosts(res.data.posts || []);
      } catch (err) {
        console.log(err);
        toast.error("Failed to fetch posts");
      }
    };

    if (userData?._id) fetchPosts();
  }, [userData]);

  const handleEdit = () => {
    navigate("/edit");
  };

  const handleDelete = () => {
    setDeleteProfile(true);
  };

  const handleConfirmDelete = async () => {
    try {
      await axios.delete(BASE_URL + "/profile/delete", {
        withCredentials: true,
      });
      toast.success("Profile deleted successfully!!");
      navigate("/");
    } catch (err) {
      console.log(err);
      toast.error(err.response.data.message || err.message);
    }
  };

  // ✅ Update existing post
  const updatePost = (updatedPost) => {
    setAllPosts((prevPosts) =>
      prevPosts.map((post) =>
        post._id === updatedPost._id ? updatedPost : post
      )
    );
  };

  // ✅ Delete post
  const deletePost = (postId) => {
    setAllPosts((prevPosts) => prevPosts.filter((post) => post._id !== postId));
  };

  return (
    <div>
      <Header />
      <div className="flex flex-col items-center p-6 space-y-10">
        {/* Profile Section */}
        <div className="w-[100%] lg:w-[80%] p-6 justify-center items-center">
          <div className="flex flex-col md:flex-row gap-8">
            {/* Left */}
            <div className="md:w-1/3 text-center">
              <img
                src={userData?.profilePhoto}
                className="rounded-full w-40 h-40 mx-auto mb-4"
              />
              <h1 className="text-2xl font-bold text-gray-800">
                {userData?.firstName + " " + userData?.lastName}
              </h1>
              <p className="text-gray-600">{userData?.title}</p>
              <div className="flex justify-center gap-4 mt-4">
                <button
                  onClick={handleEdit}
                  className="bg-indigo-600 cursor-pointer text-white px-4 py-2 rounded-lg hover:bg-indigo-700">
                  Edit Profile
                </button>
                <button
                  onClick={handleDelete}
                  className="bg-red-600 cursor-pointer text-white px-4 py-2 rounded-lg hover:bg-red-700">
                  Delete Profile
                </button>
              </div>
            </div>

            {/* Right */}
            <div className="md:w-2/3 space-y-6 text-gray-800">
              <div>
                <h2 className="text-lg font-semibold">About Me</h2>
                <p>{userData?.about ? userData?.about : "--"}</p>
              </div>

              <div>
                <h2 className="text-lg font-semibold">Skills</h2>
                <div className="flex flex-wrap gap-2">
                  {userData?.skills.length > 0 ? (
                    userData?.skills.map((skill, idx) => (
                      <span
                        key={idx}
                        className="bg-indigo-100 text-indigo-800 px-3 py-1 rounded-full text-sm cursor-pointer">
                        {skill}
                      </span>
                    ))
                  ) : (
                    <p>No skills added yet....</p>
                  )}
                </div>
              </div>

              <div>
                <h2 className="text-lg font-semibold">Contact Information</h2>
                <ul className="space-y-2 text-gray-700-300">
                  {" "}
                  <li className="flex items-center">
                    {" "}
                    <svg
                      className="h-5 w-5 mr-2 text-indigo-800"
                      fill="currentColor">
                      {" "}
                      <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />{" "}
                      <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />{" "}
                    </svg>{" "}
                    {userData?.email}{" "}
                  </li>{" "}
                  {userData?.phone ? (
                    <li className="flex items-center">
                      {" "}
                      <svg
                        className="h-5 w-5 mr-2 text-indigo-800"
                        fill="currentColor">
                        {" "}
                        <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />{" "}
                      </svg>{" "}
                      {userData?.phone}{" "}
                    </li>
                  ) : null}{" "}
                </ul>
              </div>
            </div>
          </div>
        </div>

        {deleteProfile && (
          <div className="modal-overlay">
            <div className="modal-contentAbout">
              <h1 className="text-center text-2xl m-2">Confirm Delete</h1>
              <br />
              <div className="flex gap-4 text-end justify-between">
                <button
                  onClick={() => setDeleteProfile(false)}
                  className="bg-indigo-600 text-white cursor-pointer px-4 py-2 rounded-lg hover:bg-indigo-700">
                  Cancel
                </button>
                <button
                  onClick={() => handleConfirmDelete()}
                  className="bg-red-600 text-white cursor-pointer px-4 py-2 rounded-lg hover:bg-red-700">
                  Confirm Delete
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
          .modal-contentAbout {
              background: white;
              padding: 20px;
              border-radius: 10px;
              // width: 250px;
              text-align: left;
          }
        `}</style>

        <div className="w-full p-6">
          <h2 className="text-3xl font-semibold text-center text-gray-800 mb-6">
            My Posts
          </h2>
          <div className="my-4 w-[100%] m-4 sm:w-[60%] justify-center items-center mx-auto">
            {allPosts.length > 0 ? (
              allPosts.map((post) => (
                <div key={post._id}>
                  <PostCard
                    post={post}
                    onPostUpdated={updatePost}
                    onPostDeleted={deletePost}
                  />
                </div>
              ))
            ) : (
              <p className="text-gray-500">You haven't posted anything yet.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
