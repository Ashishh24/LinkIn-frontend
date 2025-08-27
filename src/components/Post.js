import { useState } from "react";
import axios from "axios";
import { BASE_URL } from "../utils/url";
import toast from "react-hot-toast";

const Post = () => {
  const [postContent, setPostContent] = useState("");
  const [media, setMedia] = useState([]); // store both images + videos

  // ✅ File Upload (creates link on backend)
  const handleFileChange = async (e, type) => {
    const files = Array.from(e.target.files);
    for (let file of files) {
      const formData = new FormData();
      formData.append("image", file);
      try {
        const res = await axios.post(`${BASE_URL}/upload/post`, formData);
        console.log(res);

        const fileData = res.data;
        console.log(fileData);
        if (!fileData) {
          throw new Error("Server did not return a valid URL");
        }
        // Save uploaded media with type
        console.log(fileData.url);
        console.log(fileData.type);
        setMedia((prev) => [
          ...prev,
          { url: fileData.url, type: fileData.type },
        ]);
        console.log(media);
      } catch (err) {
        console.error("Upload failed:", err);
      }
    }
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
      media, // already formatted {url, type}
    };

    console.log(newPost); // send this to backend (axios.post)

    try {
      const res = await axios.post(`${BASE_URL}/post/create`, newPost, {
        withCredentials: true,
      });
      console.log(res);
      toast.success(res.data.message);
    } catch(err) {
      console.log("error", err)
    }

    setPostContent("");
    setMedia([]);
  };

  return (
    <div className="max-w-lg mx-auto p-4 bg-white rounded-2xl shadow-md">
      {/* Text */}
      <textarea
        className="w-full border rounded-md p-3 text-gray-700 focus:outline-none focus:ring focus:ring-blue-300"
        rows="3"
        placeholder="What's on your mind?"
        value={postContent}
        onChange={(e) => setPostContent(e.target.value)}
      />

      {/* Media Preview */}
      <div className="grid grid-cols-2 gap-3 mt-3">
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
      <div className="flex justify-end mt-3">
        <button
          onClick={handleSubmit}
          className="cursor-pointer bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg shadow">
          Post
        </button>
      </div>
    </div>
  );
};

export default Post;
