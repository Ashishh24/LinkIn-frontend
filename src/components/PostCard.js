import { useEffect, useRef, useState } from "react";
import axios from "axios";
import { format, set } from "date-fns";
import { BASE_URL } from "../utils/url";
import { useSelector } from "react-redux";
import toast from "react-hot-toast";
import { MoreVertical } from "lucide-react"; // 3-dots menu icon
import { uploadMediaFiles } from "../utils/mediaUpload";

const PostCard = ({ post, onPostUpdated, onPostDeleted }) => {
  const user = useSelector((store) => store.user);
  const [likes, setLikes] = useState(post.likes ? post.likes.length : 0);
  const [comments, setComments] = useState(post.comments || []);
  const [commentText, setCommentText] = useState("");
  const [liked, setLiked] = useState(false);
  const [showLikesModal, setShowLikesModal] = useState(false);
  const [likesList, setLikesList] = useState([]);
  const [showMenu, setShowMenu] = useState(false);
  const [deletePost, setDeletePost] = useState(false);
  const menuRef = useRef(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editContent, setEditContent] = useState(post.content);
  const [editMedia, setEditMedia] = useState(post.media || []);

  const formattedTime = post.createdAt
    ? format(new Date(post.createdAt), "dd MMM yyyy, HH:mm")
    : "";

  // ✅ Like / Unlike
  const handleLike = async () => {
    try {
      const res = await axios.post(
        `${BASE_URL}/post/${post._id}/like`,
        {},
        { withCredentials: true }
      );
      setLikes(res.data.len);
      setLikesList(res.data.likes);
      setLiked(res.data.likes.some((u) => u._id === user._id));
    } catch (err) {
      console.error(err);
    }
  };

  // ✅ Add Comment
  const handleComment = async (e) => {
    e.preventDefault();
    if (!commentText.trim()) {
      toast.error("Comment cannot be empty");
      return;
    }
    try {
      const res = await axios.post(
        `${BASE_URL}/post/${post._id}/comment`,
        { text: commentText },
        { withCredentials: true }
      );
      setComments(res.data.comments);
      setCommentText("");
    } catch (err) {
      console.error(err);
    }
  };

  // ✅ Like Comment
  const handleCommentLike = async (commentId) => {
    try {
      const res = await axios.post(
        `${BASE_URL}/post/${post._id}/comment/${commentId}/like`,
        {},
        { withCredentials: true }
      );
      setComments((prev) =>
        prev.map((c) =>
          c._id === commentId ? { ...c, likes: res.data.likes } : c
        )
      );
    } catch (err) {
      console.log(err);
    }
  };

  const handleDelete = () => {
    setDeletePost(true);
  };

  // ✅ Delete Post
  const handleConfirmDelete = async () => {
    try {
      await axios.delete(`${BASE_URL}/post/${post._id}`, {
        withCredentials: true,
      });
      toast.success("Post deleted");
      if (onPostDeleted) onPostDeleted(post._id); // update UI in Home
    } catch (err) {
      console.error(err);
      toast.error("Error deleting post");
    }
  };

  // ---------- EDIT ----------
  const handleEditSave = async () => {
    setShowMenu(false);
    try {
      const res = await axios.patch(
        `${BASE_URL}/post/${post._id}`,
        { content: editContent, media: editMedia },
        { withCredentials: true }
      );
      toast.success(res.data.message);
      setIsEditing(false);
      if (onPostUpdated) onPostUpdated(res.data.post);
    } catch (err) {
      console.error(err);
    }
  };

  const removeEditMedia = (index) => {
    setEditMedia(editMedia.filter((_, i) => i !== index));
  };

  const handleFileChange = async (e) => {
    const files = Array.from(e.target.files);
    const uploaded = await uploadMediaFiles(files);
    setEditMedia((prev) => [...prev, ...uploaded]);
    e.target.value = "";
  };

  useEffect(() => {
    if (post.likes) {
      setLikes(post.likes.length);
      setLikesList(post.likes);
      setLiked(post.likes.some((u) => u._id === user?._id));
    }
  }, [post.likes, user?._id]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setShowMenu(false);
      }
    };
    if (showMenu) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showMenu]);

  return (
    <div className="mb-10 p-4 bg-white rounded-lg border-b border-gray-300">
      {/* User Info */}
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-3">
          <img
            src={post.userId?.profilePhoto || "/default-avatar.png"}
            alt="User"
            className="w-10 h-10 rounded-full object-cover"
          />
          <div>
            <p className="font-semibold text-gray-800">
              {post.userId?.firstName} {post.userId?.lastName}
            </p>
            <p className="text-xs text-gray-500">{formattedTime}</p>
          </div>
        </div>

        {/* Actions Menu (only if owner) */}
        {user?._id === post.userId?._id && (
          <div className="relative" ref={menuRef}>
            <button
              onClick={() => setShowMenu((prev) => !prev)}
              className="p-2 rounded-full cursor-pointer hover:bg-gray-200">
              <MoreVertical className="w-5 h-5 text-gray-600" />
            </button>

            {showMenu && (
              <div className="absolute right-0 mt-2 w-32 bg-white rounded-lg shadow-lg">
                <button
                  onClick={() => {
                    setIsEditing(true);
                    setShowMenu(false);
                  }}
                  className="block cursor-pointer w-full text-left px-4 py-2 text-sm hover:bg-gray-100">
                  ✏️ Edit
                </button>
                <button
                  onClick={() => {
                    setShowMenu(false);
                    handleDelete();
                  }}
                  className="block cursor-pointer w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-100">
                  🗑️ Delete
                </button>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Post Content */}
      {isEditing ? (
        <div>
          <textarea
            className="w-full border rounded-md p-2 text-gray-700 resize-none focus:outline-none focus:ring focus:ring-blue-300"
            rows="2"
            value={editContent}
            onChange={(e) => setEditContent(e.target.value)}
          />

          {/* Media Preview */}
          <div className="grid grid-cols-2 gap-3 mt-2">
            {editMedia.map((m, index) => (
              <div key={index} className="relative">
                {m.type === "image" ? (
                  <img
                    src={m.url}
                    alt="preview"
                    className="w-full h-40 object-cover rounded-lg"
                  />
                ) : (
                  <video
                    src={m.url}
                    controls
                    className="w-full h-40 rounded-lg"
                  />
                )}
                <button
                  onClick={() => removeEditMedia(index)}
                  className="absolute top-2 right-2 bg-red-500 text-white rounded-full px-2 py-1 text-xs cursor-pointer">
                  ✕
                </button>
              </div>
            ))}
          </div>

          {/* Add Media */}
          <div className="flex items-center gap-4 mt-3">
            <label className="cursor-pointer text-blue-500">
              📷 Image
              <input
                type="file"
                accept="image/*"
                multiple
                onChange={(e) => handleFileChange(e)}
                className="hidden"
              />
            </label>

            <label className="cursor-pointer text-green-500">
              🎥 Video
              <input
                type="file"
                accept="video/*"
                multiple
                onChange={(e) => handleFileChange(e, "video")}
                className="hidden"
              />
            </label>
          </div>
          <div className="flex gap-4 justify-end">
            <button
              onClick={() => setIsEditing(false)}
              className="mt-3 bg-red-500 text-white px-3 py-1 rounded-lg cursor-pointer hover:bg-red-700">
              Cancel
            </button>
            <button
              onClick={handleEditSave}
              className="mt-3 bg-green-500 text-white px-3 py-1 rounded-lg cursor-pointer hover:bg-green-700">
              Save
            </button>
          </div>
        </div>
      ) : (
        <>
          <p className="text-gray-700">{post.content}</p>
          {post.media?.length > 0 && (
            <div className="mt-3 flex flex-col gap-4">
              {post.media.map((m, idx) =>
                m.type.startsWith("image") ? (
                  <img
                    key={idx}
                    src={m.url}
                    alt=""
                    className="w-full max-w-2xl object-cover rounded-lg"
                  />
                ) : (
                  <video
                    key={idx}
                    src={m.url}
                    controls
                    className="w-full max-w-3xl rounded-lg"
                  />
                )
              )}
            </div>
          )}
        </>
      )}

      {deletePost && (
        <div className="modal-overlay">
          <div className="modal-contentDelete">
            <h1 className=" text-2xl m-2">Confirm Delete</h1>
            <br />
            <div className="flex gap-4 text-end justify-end">
              <button
                onClick={() => setDeletePost(false)}
                className="bg-indigo-600 text-white cursor-pointer px-3 py-1 rounded-lg hover:bg-indigo-700">
                Cancel
              </button>
              <button
                onClick={() => handleConfirmDelete()}
                className="bg-red-600 text-white cursor-pointer px-3 py-1 rounded-lg hover:bg-red-700">
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
        .modal-contentDelete {
            background: white;
            padding: 20px;
            border-radius: 10px;
            width: 300px;
            text-align: left;
        }
      `}</style>

      {/* Actions */}
      {!isEditing && (
        <div className="mt-3 flex items-center gap-6 text-sm text-gray-600">
          <button
            onClick={handleLike}
            className={`flex items-center gap-1 cursor-pointer ${
              liked ? "text-indigo-600 font-semibold" : "hover:text-indigo-600"
            }`}>
            👍 {liked ? "Unlike" : "Like"}
          </button>

          <span
            onClick={() => setShowLikesModal(true)}
            className="cursor-pointer hover:text-indigo-600">
            {likes} Likes
          </span>
        </div>
      )}

      {/* Likes Modal */}
      {showLikesModal && (
        <div className="modal-overlay">
          <div className="modal-contentAbout">
            <h2 className="text-lg font-semibold mb-4">Liked by</h2>
            <ul className="space-y-3">
              {likesList.map((u) => (
                <li key={u._id} className="flex items-center gap-3">
                  <img
                    src={u.profilePhoto || "/default-avatar.png"}
                    alt=""
                    className="w-10 h-10 rounded-full object-cover"
                  />
                  <span className="text-gray-800 font-medium">
                    {u.firstName} {u.lastName}
                  </span>
                </li>
              ))}
            </ul>
            <button
              onClick={() => setShowLikesModal(false)}
              className="mt-4 w-full py-2 rounded-lg cursor-pointer bg-indigo-600 text-white hover:bg-indigo-700">
              Close
            </button>
          </div>
        </div>
      )}
      <style>{`
        .modal-overlay {
          position: fixed;
          top: 0; left: 0;
          width: 100%; height: 100%;
          background: rgba(0,0,0,0.4);
          display: flex;
          justify-content: center;
          align-items: center;
        }
        .modal-contentAbout {
          background: white;
          padding: 20px;
          border-radius: 10px;
          width: 400px;
          text-align: left;
        }
      `}</style>

      {/* Comments */}
      {!isEditing && (
        <div className="mt-4">
          <form onSubmit={handleComment} className="flex gap-2 w-[85%]">
            <input
              type="text"
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
              placeholder="Write a comment..."
              className="flex-1 border rounded-lg px-3 py-1 text-sm "
            />
            <button
              type="submit"
              className="px-3 py-1 bg-indigo-600 cursor-pointer text-white rounded-lg text-sm">
              Post
            </button>
          </form>

          <div className="mt-3 space-y-2">
            {comments.map((c) => (
              <div key={c._id} className="flex justify-between items-center">
                <div className="flex gap-2 items-center">
                  <img
                    src={c.userId?.profilePhoto || "/default-avatar.png"}
                    alt="User"
                    className="w-7 h-7 rounded-full object-cover"
                  />
                  <div>
                    <p className="text-sm font-medium text-gray-800">
                      {c.userId?.firstName} {c.userId?.lastName}
                    </p>
                    <p className="text-xs text-gray-600">{c.text}</p>
                  </div>
                </div>
                <button
                  onClick={() => handleCommentLike(c._id)}
                  className="text-xs text-gray-500 hover:text-indigo-600">
                  👍 {c.likes?.length || 0}
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default PostCard;