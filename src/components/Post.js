import { useState } from "react";
import axios from "axios";
import { BASE_URL } from "../utils/url";
import toast from "react-hot-toast";
import { uploadMediaFiles } from "../utils/mediaUpload";

const Post = ({ onPostCreated }) => {
  const [postContent, setPostContent] = useState("");
  const [media, setMedia] = useState([]); // store both images + videos

  // ✅ File Upload (creates link on backend)
  const handleFileChange = async (e, type) => {
    const files = Array.from(e.target.files);
    
    const uploaded = await uploadMediaFiles(files);
    setMedia((prev) => [...prev, ...uploaded]);
    e.target.value = ""; // reset input
  };

  // ✅ Remove selected media
  const removeMedia = (index) => {
    setMedia(media.filter((_, i) => i !== index));
  };

  // ✅ Submit Post
  const handleSubmit = async () => {
    if (!postContent.trim() && media.length === 0) return;

    const newPost = {
      content: postContent,
      media,
    };

    try {
      const res = await axios.post(`${BASE_URL}/post/create`, newPost, {
        withCredentials: true,
      });
      toast.success(res.data.message);
      if (onPostCreated) {
        onPostCreated(res.data.post);
      }
    } catch (err) {
      console.log("error", err);
    }
    setPostContent("");
    setMedia([]);
  };

  return (
    <div className="max-w-lg mx-auto mt-3 p-4 bg-white rounded-2xl shadow-md">
      {/* Text */}
      <textarea
        className="w-full border rounded-md p-2 text-gray-700 resize-none  focus:outline-none focus:ring focus:ring-blue-300"
        rows="1"
        placeholder="What's on your mind?"
        value={postContent}
        onChange={(e) => setPostContent(e.target.value)}
      />

      {/* Media Preview */}
      <div className="grid grid-cols-2 gap-3">
        {media.map((m, index) => (
          <div key={index} className="relative">
            {m.type === "image" ? (
              <img
                src={m.url}
                alt="preview"
                className="w-full h-40 object-cover rounded-lg"
              />
            ) : (
              <video src={m.url} controls className="w-full h-40 rounded-lg" />
            )}
            <button
              onClick={() => removeMedia(index)}
              className="absolute top-2 right-2 bg-red-500 text-white rounded-full px-2 py-1 text-xs cursor-pointer">
              ✕
            </button>
          </div>
        ))}
      </div>

      {/* File Upload */}
      <div className="flex items-center gap-4 mt-3">
        <label className="cursor-pointer text-blue-500">
          📷 Image
          <input
            type="file"
            accept="image/*"
            multiple
            onChange={(e) => handleFileChange(e, "image")}
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

      {/* Submit */}
      <div className="flex justify-end">
        <button
          onClick={handleSubmit}
          className="cursor-pointer bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded-lg shadow">
          Post
        </button>
      </div>
    </div>
  );
};

export default Post;
