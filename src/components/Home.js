import { useEffect, useState } from "react";
import Header from "./Header";
import Post from "./Post.js";
import PostCard from "./PostCard.js";
import axios from "axios";
import { BASE_URL } from "../utils/url.js";

const Home = () => {
  const [allPosts, setAllPosts] = useState([]);

  // ✅ Add new post
  const addNewPost = (newPost) => {
    setAllPosts((prevPosts) => [newPost, ...prevPosts]);
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

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await axios.get(`${BASE_URL}/post/all`, {
          withCredentials: true,
        });
        setAllPosts(res.data.posts);
      } catch (err) {
        console.log("Error fetching posts:", err);
      }
    };
    fetchPosts();
  }, []);

  return (
    <div>
      <Header />
      <Post onPostCreated={addNewPost} />
      <div className="my-4 w-[100%] m-4 sm:w-[60%] justify-center items-center mx-auto">
        {console.log(allPosts)}
        {allPosts.map((post) => (
          <div key={post._id}>
            {console.log(post)}
            <PostCard
              post={post}
              onPostUpdated={updatePost}
              onPostDeleted={deletePost}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
