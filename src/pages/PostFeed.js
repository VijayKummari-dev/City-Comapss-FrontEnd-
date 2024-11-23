import React, { useEffect, useState } from "react";
import axios from "axios";
import "./PostFeed.css"; // Import custom CSS for styling


const PostFeed = () => {
  const [posts, setPosts] = useState([]);
  const token = localStorage.getItem("jwt"); // Get JWT token from localStorage

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8080/api/posts/latest",
          {
            headers: {
              Authorization: `Bearer ${token}`, // Send JWT token in request
            },
          }
        );
        console.log(response.data);
        setPosts(response.data);
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };

    fetchPosts();
  }, [token]);

  return (
    <div className="post-feed">
      {posts.map((post) => (
        <div key={post.postId} className="post-card">
          <div className="post-header">
            <img
              src="https://via.placeholder.com/40" // Placeholder for user avatar
              alt="User Avatar"
              className="user-avatar"
            />
            <div>
              <h4>{post.username}</h4>
              <p>{new Date(post.createdAt).toDateString()}</p>
            </div>
          </div>
          <h2 className="post-title">{post.title}</h2>
          <p className="post-content">{post.content}</p>
          <div className="post-footer">
            <div className="like-section">
              <span>❤️ {post.likeCount}</span>
            </div>
            <div className="comment-section">
              <span>💬 {post.commentCount}</span>
            </div>
            <div className="more-options">⋮</div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default PostFeed;