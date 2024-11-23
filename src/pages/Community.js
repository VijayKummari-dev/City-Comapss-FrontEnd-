



// import React, { useState, useEffect, useCallback, useMemo } from 'react';
// import axios from 'axios';
// import './Community.css';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faHeart, faTrash } from '@fortawesome/free-solid-svg-icons';
// import { toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';


// const Community = () => {
//  const [posts, setPosts] = useState([]);
//  const [newPost, setNewPost] = useState({ title: '', content: '', image: null, video: null });
//  const [newComment, setNewComment] = useState({});
//  const [showReplyInput, setShowReplyInput] = useState({});
//  const [replyToUser, setReplyToUser] = useState({});
//  const [showComments, setShowComments] = useState({});
//  const [error, setError] = useState('');
 
//  const token = localStorage.getItem('authToken');

//  const config = useMemo(() => ({
//    headers: { Authorization: `Bearer ${token}` },
//  }), [token]);

//  const fetchPosts = useCallback(async () => {
//    try {
//      const response = await axios.get('/api/posts/latest', config);
//      console.log(response.data);
//      setPosts(response.data || []);
//    } catch (err) {
//      console.error('Error fetching posts:', err);
//      toast.error('Failed to load posts.');
//    }
//  }, [config]);

//  useEffect(() => {
//    fetchPosts();
//  }, [fetchPosts]);

//  const handleToggleComments = (postId) => {
//    setShowComments((prev) => ({
//      ...prev,
//      [postId]: !prev[postId],
//    }));
//  };

//  const handleInputChange = (e) => {
//    const { name, value } = e.target;
//    setNewPost((prev) => ({ ...prev, [name]: value }));
//  };

//  const handleFileChange = (e) => {
//    const { name, files } = e.target;
//    setNewPost((prev) => ({ ...prev, [name]: files[0] }));

//  };

//  const handlePostSubmit = async (e) => {
//    e.preventDefault();
//    const formData = new FormData();
//    formData.append('title', newPost.title);
//    formData.append('content', newPost.content);
//    if (newPost.image) formData.append('image', newPost.image);
//    if (newPost.video) formData.append('video', newPost.video);
//    // Log the files to verify they are being set correctly
 
//    try {
//      await axios.post('/api/posts/create', formData, config);
//      setNewPost({ title: '', content: '', image: null, video: null });
//      fetchPosts();
//    } catch (err) {
//      console.error('Error creating post:', err);
//      toast.error('Failed to create post.');
//    }
   
//  };
 

//  const handleLikePost = async (postId, liked) => {

//    try {
     
//      await axios.post(`/api/likes/${liked ? 'unlike' : 'like'}/${postId}`, {}, config);
//      fetchPosts();
//    } catch (err) {
//      console.error('Error toggling like:', err);
//      toast.error('Failed to toggle like.');
//    }
//  };
// const handleLikeComment = async (postId, commentId, liked) => {
//  try {
//    console.log(liked);
//    // Determine the API endpoint based on the current like status
//    const url = liked
//      ? `/api/comments/unlike/${commentId}` // API call to unlike the comment
//      : `/api/comments/like/${commentId}`;  // API call to like the comment

//    // Make the API call
//    await axios.post(url, {}, config);

//    // Fetch the updated posts after the API call
//    fetchPosts(); // Re-fetch the posts to update the UI based on the backend response
//  } catch (err) {
//    console.error("Error toggling like for comment:", err);
//    toast.error("Failed to toggle like.");
//  }
// };


//  const handleCommentSubmit = async (e, postId, parentCommentId = null) => {
//    e.preventDefault();
 
//    // Get the comment content from the input field
//    const commentContent = newComment[postId] || '';
//    if (!commentContent.trim()) {
//      toast.error("Comment content cannot be empty.");
//      return;
//    }
 
//    // Prepare the data for the POST request
//    const commentData = {
//      content: commentContent,
//      parentCommentId: parentCommentId || null,
//    };
 
//    try {
//      // POST the comment to the backend API
//      await axios.post(
//        parentCommentId
//          ? `api/comments/${postId}?parentCommentId=${parentCommentId}`
//          : `api/comments/${postId}`,
//        commentData,
//        config
//      );
 
//      // Reset the input field and refetch the posts to update the comments
//      setNewComment((prev) => ({ ...prev, [postId]: '' }));
//      fetchPosts();
 
//      // If it was a reply, hide the reply input and reset the reply state
//      if (parentCommentId) {
//        setShowReplyInput((prev) => ({ ...prev, [parentCommentId]: false }));
//        setReplyToUser((prev) => ({ ...prev, [parentCommentId]: '' }));
//      }
//    } catch (err) {
//      console.error("Error adding comment:", err);
//      toast.error("Failed to add comment. Please try again.");
//    }
//  };
 

//  const handleReplyClick = (commentId, username) => {
//    // Toggle the reply input visibility for the specific comment
//    setShowReplyInput((prev) => ({
//      ...prev,
//      [commentId]: !prev[commentId],
//    }));
 
//    // Set the username for the reply-to field for better user experience
//    setReplyToUser((prev) => ({
//      ...prev,
//      [commentId]: username,
//    }));
//  };
//  const handleDeletePost = async (postId) => {
//    try {
//      const confirmed = window.confirm("Are you sure you want to delete this post?");
//      if (!confirmed) return;
 
//      await axios.delete(`/api/posts/${postId}`, config);
//      toast.success("Post deleted successfully!");
//      fetchPosts(); // Refresh the posts after deletion
//    } catch (err) {
//      console.error("Error deleting post:", err);
//      toast.error("Failed to delete post.");
//    }
//  };
 
 

//  const getRelativeTime = (timestamp) => {
//    const now = new Date();
//    const createdAt = new Date(timestamp);
//    const seconds = Math.floor((now - createdAt) / 1000);

//    if (seconds < 60) return `${seconds} seconds ago`;
//    const minutes = Math.floor(seconds / 60);
//    if (minutes < 60) return `${minutes} minutes ago`;
//    const hours = Math.floor(minutes / 60);
//    if (hours < 24) return `${hours} hours ago`;
//    const days = Math.floor(hours / 24);
//    return `${days} days ago`;
//  };

//  const renderComments = (comments, postId, level = 0) => {
//    const renderCommentTree = (comment, currentLevel) => {
//      const defaultProfileImage = "http://localhost:8080/images/profile/default-avatar.png";
   
//      return (
//        <div key={comment.id} className={`comment-item level-${currentLevel}`}>
//          <div className="comment-header">
//            <img
//              src={comment.profilePicture || defaultProfileImage}
//              alt="Profile"
//              className="profile-picture"
//            />
//            <p><strong>{comment.username}:</strong> {comment.content}</p>
//          </div>
//          <div className="comment-actions">
//            <button onClick={() => handleLikeComment(postId, comment.id, comment.liked)}>
//              <FontAwesomeIcon
//                icon={faHeart}
//                className={`like-icon ${comment.liked ? 'liked' : 'unliked'}`}
//              /> {comment.likeCount || 0}
//            </button>
//            <button onClick={() => handleReplyClick(comment.id, comment.username)}>Reply</button>
//          </div>
   
//          {/* Reply input form */}
//          {showReplyInput[comment.id] && (
//            <form onSubmit={(e) => handleCommentSubmit(e, postId, comment.id)} className="reply-form">
//              <input
//                type="text"
//                placeholder={`Reply to ${replyToUser[comment.id]}`}
//                value={newComment[postId] || ''}
//                onChange={(e) => setNewComment((prev) => ({ ...prev, [postId]: e.target.value }))}
//                required
//              />
//              <button type="submit">Reply</button>
//            </form>
//          )}
   
//          {/* Render nested replies */}
//          {comment.replies && comment.replies.length > 0 && (
//            <div className="nested-comments">
//              {comment.replies.map((reply) => renderCommentTree(reply, currentLevel + 1))}
//            </div>
//          )}
//        </div>
//      );
//    };
   
 
//    return (
//      <div className="all-comments-card">
//        {comments.length > 0 ? comments.map((comment) => renderCommentTree(comment, level)) : <p>No comments yet.</p>}
//      </div>
//    );
//  };
 


//  return (
//    <div className="community-container">
//      <aside className="create-post-section">
//        <h2>Create New Post</h2>
//        <form onSubmit={handlePostSubmit} className="post-form">
//          <input type="text" name="title" placeholder="Post Title" value={newPost.title} onChange={handleInputChange} required />
//          <textarea name="content" placeholder="Post Content" value={newPost.content} onChange={handleInputChange} required />
//          <input type="file" name="image" accept="image/*" onChange={handleFileChange} />
//          <input type="file" name="video" accept="video/*" onChange={handleFileChange} />
//          <button type="submit">Post</button>
//        </form>
//        {error && <p className="error-message">{error}</p>}
//      </aside>

//      <section className="post-feed">
      
//        {posts.length > 0 ? (
//          posts.map((post) => (
//            <div key={post.postId} className="post-card">
//              <div className="post-header">
//                <div className="post-user-info">
//                  <img
//                    src={post.profilePicture || "http://localhost:8080/images/profile/default-avatar.png"}
//                    alt="Profile"
//                    className="profile-picture"
//                  />
//                  <p className="post-username">{post.username}</p>
//                </div>
//                <div className="post-actions-icons">
//                  <button className="delete-button" onClick={() => handleDeletePost(post.postId)}>
//                  <FontAwesomeIcon icon={faTrash} className="trash-icon" />
//                  </button>
//                  <p className="post-time">{getRelativeTime(post.createdAt)}</p>
//                </div>

              
//              </div>
//              <h3>{post.title}</h3>
//              <p>{post.content}</p>
//              {post.preSignedImageUrl && (
//            <div className="media-wrapper">
//              <img src={post.preSignedImageUrl} alt="Post" className="post-image" />
//            </div>
//          )}

//              {post.preSignedVideoUrl && (
//                <div className="media-wrapper">
//                  <video controls className="post-video">
//                    <source src={post.preSignedVideoUrl} type="video/mp4" />
//                    Your browser does not support the video tag.
//                  </video>
//                </div>
//              )}

//              <div className="post-actions">
//                <button className="no-hover" onClick={() => handleLikePost(post.postId, post.liked)}>
                 
//                  <FontAwesomeIcon icon={faHeart} color={post.liked ? "red" : "gray"} /> {post.likeCount || 0}
//                </button>
//                <button className="comments-button" onClick={() => handleToggleComments(post.postId)}>
//                  | {post.commentCount || 0} Comments
//                </button>
//              </div>
//              {showComments[post.postId] && (
//                <div className="comments-section">
//                  <h4>Comments</h4>
//                  {Array.isArray(post.comments) && post.comments.length > 0 ? (
//                    renderComments(post.comments, post.postId)
//                  ) : (
//                    <p>No comments yet.</p>
//                  )}
//                  <form onSubmit={(e) => handleCommentSubmit(e, post.postId)} className="comment-form">
//                    <input
//                      type="text"
//                      placeholder="Add a comment..."
//                      value={newComment[post.postId] || ''}
//                      onChange={(e) => setNewComment((prev) => ({ ...prev, [post.postId]: e.target.value }))}
//                      required
//                    />
//                    <button type="submit">Comment</button>
//                  </form>
//                </div>
//              )}
//            </div>
//          ))
//        ) : (
//          <p>No posts available.</p>
//        )}
//      </section>
//    </div>
//  );
// };

// export default Community;





import React, { useState, useEffect, useCallback, useMemo } from 'react';
import axios from 'axios';
import './Community.css';
import { Dialog, DialogActions, DialogContent, DialogTitle, Button, Typography } from "@mui/material";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart, faTrash } from '@fortawesome/free-solid-svg-icons';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



const Community = () => {
 const [posts, setPosts] = useState([]);
 const [showCreatePost, setShowCreatePost] = useState(); 
 const [newPost, setNewPost] = useState({ title: '', content: '', image: null, video: null });
 const [newComment, setNewComment] = useState({});
 const [showReplyInput, setShowReplyInput] = useState({});
 const [replyToUser, setReplyToUser] = useState({});
 const [showComments, setShowComments] = useState({});
 const [error, setError] = useState('');
 const [confirmDialog, setConfirmDialog] = useState({
  open: false,
  title: "",
  onConfirm: null,
});
 
 const token = localStorage.getItem('authToken');

 const config = useMemo(() => ({
   headers: { Authorization: `Bearer ${token}` },
 }), [token]);

 const fetchPosts = useCallback(async () => {
   try {
     const response = await axios.get('/api/posts/latest', config);
     console.log(response.data);
     setPosts(response.data || []);
   } catch (err) {
     console.error('Error fetching posts:', err);
     toast.error('Failed to load posts.');
   }
 }, [config]);

 useEffect(() => {
   fetchPosts();
 }, [fetchPosts]);

 const handleToggleComments = (postId) => {
   setShowComments((prev) => ({
     ...prev,
     [postId]: !prev[postId],
   }));
 };

 const handleInputChange = (e) => {
   const { name, value } = e.target;
   setNewPost((prev) => ({ ...prev, [name]: value }));
 };

 const handleFileChange = (e) => {
   const { name, files } = e.target;
   setNewPost((prev) => ({ ...prev, [name]: files[0] }));
 };

 const handlePostSubmit = async (e) => {
   e.preventDefault();
   setShowCreatePost(false);
   const formData = new FormData();
   formData.append('title', newPost.title);
   formData.append('content', newPost.content);
   if (newPost.image) formData.append('image', newPost.image);
   if (newPost.video) formData.append('video', newPost.video);
   // Log the files to verify they are being set correctly
 if (newPost.image) {
   console.log("Uploading Image:", newPost.image);
   formData.append('image', newPost.image);
 }
 if (newPost.video) {
   console.log("Uploading Video:", newPost.video);
   formData.append('video', newPost.video);
 }
   try {
     await axios.post('/api/posts/create', formData, config);
     setNewPost({ title: '', content: '', image: null, video: null });
     fetchPosts();
   } catch (err) {
     console.error('Error creating post:', err);
     toast.error('Failed to create post.');
   }
 };
 

 const handleLikePost = async (postId, liked) => {

   try {
     
     await axios.post(`/api/likes/${liked ? 'unlike' : 'like'}/${postId}`, {}, config);
     fetchPosts();
   } catch (err) {
     console.error('Error toggling like:', err);
     toast.error('Failed to toggle like.');
   }
 };
const handleLikeComment = async (postId, commentId, liked) => {
 try {
   console.log(liked);
   // Determine the API endpoint based on the current like status
   const url = liked
     ? `/api/comments/unlike/${commentId}` // API call to unlike the comment
     : `/api/comments/like/${commentId}`;  // API call to like the comment

   // Make the API call
   await axios.post(url, {}, config);

   // Fetch the updated posts after the API call
   fetchPosts(); // Re-fetch the posts to update the UI based on the backend response
 } catch (err) {
   console.error("Error toggling like for comment:", err);
   toast.error("Failed to toggle like.");
 }
};


 const handleCommentSubmit = async (e, postId, parentCommentId = null) => {
   e.preventDefault();
 
   // Get the comment content from the input field
   const commentContent = newComment[postId] || '';
   if (!commentContent.trim()) {
     toast.error("Comment content cannot be empty.");
     return;
   }
 
   // Prepare the data for the POST request
   const commentData = {
     content: commentContent,
     parentCommentId: parentCommentId || null,
   };
 
   try {
     // POST the comment to the backend API
     await axios.post(
       parentCommentId
         ? `api/comments/${postId}?parentCommentId=${parentCommentId}`
         : `api/comments/${postId}`,
       commentData,
       config
     );
 
     // Reset the input field and refetch the posts to update the comments
     setNewComment((prev) => ({ ...prev, [postId]: '' }));
     fetchPosts();
 
     // If it was a reply, hide the reply input and reset the reply state
     if (parentCommentId) {
       setShowReplyInput((prev) => ({ ...prev, [parentCommentId]: false }));
       setReplyToUser((prev) => ({ ...prev, [parentCommentId]: '' }));
     }
   } catch (err) {
     console.error("Error adding comment:", err);
     toast.error("Failed to add comment. Please try again.");
   }
 };
 

 const handleReplyClick = (commentId, username) => {
   // Toggle the reply input visibility for the specific comment
   setShowReplyInput((prev) => ({
     ...prev,
     [commentId]: !prev[commentId],
   }));
 
   // Set the username for the reply-to field for better user experience
   setReplyToUser((prev) => ({
     ...prev,
     [commentId]: username,
   }));
 };
 const handleDeletePost = (postId) => {
  
  setConfirmDialog({
    
    open: true,
    title: "Are you sure you want to delete this post?",
    onConfirm: async () => {
      try {
        await axios.delete(`/api/posts/${postId}`, config);
        setConfirmDialog({ open: false }); // Close the dialog
        fetchPosts(); // Refresh posts
        toast.success("Post deleted successfully!");
      } catch (err) {
        console.error("Error deleting post:", err);
        toast.error("Failed to delete post.");
      }
    },
  });
};
const ConfirmationDialog = ({ open, title, onConfirm, onCancel }) => (
  
  <Dialog open={open} onClose={onCancel}>
    <DialogTitle>{title}</DialogTitle>
    <DialogContent>
      <Typography>Are you sure you want to proceed?</Typography>
    </DialogContent>
    <DialogActions>
      <Button onClick={onCancel} color="secondary">
        Cancel
      </Button>
      <Button
        onClick={() => {
          onConfirm(); // Execute the confirmed action
          onCancel();  // Close the dialog
        }}
        color="primary"
        variant="contained"
      >
        Yes
      </Button>
    </DialogActions>
  </Dialog>
);
 
 

 const getRelativeTime = (timestamp) => {
   const now = new Date();
   const createdAt = new Date(timestamp);
   const seconds = Math.floor((now - createdAt) / 1000);

   if (seconds < 60) return `${seconds} seconds ago`;
   const minutes = Math.floor(seconds / 60);
   if (minutes < 60) return `${minutes} minutes ago`;
   const hours = Math.floor(minutes / 60);
   if (hours < 24) return `${hours} hours ago`;
   const days = Math.floor(hours / 24);
   return `${days} days ago`;
 };

 const renderComments = (comments, postId, level = 0) => {
   const renderCommentTree = (comment, currentLevel) => {
     const defaultProfileImage = "http://localhost:8080/images/profile/default-avatar.png";
   
     return (
      
       <div key={comment.id} className={`comment-item level-${currentLevel}`}>
         <div className="comment-header">
           <img
             src={comment.profilePicture || defaultProfileImage}
             alt="Profile"
             className="profile-picture"
           />
           <p><strong>{comment.username}:</strong> {comment.content}</p>
         </div>
         <div className="comment-actions">
           <button onClick={() => handleLikeComment(postId, comment.id, comment.liked)}>
             <FontAwesomeIcon
               icon={faHeart}
               className={`like-icon ${comment.liked ? 'liked' : 'unliked'}`}
             /> {comment.likeCount || 0}
           </button>
           <button onClick={() => handleReplyClick(comment.id, comment.username)}>Reply</button>
         </div>
   
         {/* Reply input form */}
         {showReplyInput[comment.id] && (
           <form onSubmit={(e) => handleCommentSubmit(e, postId, comment.id)} className="reply-form">
             <input
               type="text"
               placeholder={`Reply to ${replyToUser[comment.id]}`}
               value={newComment[postId] || ''}
               onChange={(e) => setNewComment((prev) => ({ ...prev, [postId]: e.target.value }))}
               required
             />
             <button type="submit">Reply</button>
           </form>
         )}
   
         {/* Render nested replies */}
         {comment.replies && comment.replies.length > 0 && (
           <div className="nested-comments">
             {comment.replies.map((reply) => renderCommentTree(reply, currentLevel + 1))}
           </div>
         )}
       </div>
     );
   };
   
 
   return (
     <div className="all-comments-card">
       {comments.length > 0 ? comments.map((comment) => renderCommentTree(comment, level)) : <p>No comments yet.</p>}
     </div>
   );
 };
 


 return (
<div className="community-container">
    
  <div className="community-container">
  {/* Toggle Button */}
  <div className="create-post-toggle-container">
    <button
      className="create-post-toggle"
      onClick={() => setShowCreatePost((prev) => !prev)}
    >
      {showCreatePost ? " Back to Feed" : "Create a Post"}
    </button>
  </div>

  {/* Create Post Section */}
  {showCreatePost && (
    <aside className="create-post-section">
      <h2>Create New Post</h2>
      <form onSubmit={handlePostSubmit} className="post-form">
        <input
          type="text"
          name="title"
          placeholder="Post Title"
          value={newPost.title}
          onChange={handleInputChange}
          required
        />
        <textarea
          name="content"
          placeholder="Post Content"
          value={newPost.content}
          onChange={handleInputChange}
          required
        />
        <input
          type="file"
          name="image"
          accept="image/*"
          onChange={handleFileChange}
        />
        <input
          type="file"
          name="video"
          accept="video/*"
          onChange={handleFileChange}
        />
        <button type="submit" className="post-submit-button">
          Post
        </button>
      </form>
      {error && <p className="error-message">{error}</p>}
    </aside>
  )}
</div>

{/* Post Feed */}
{!showCreatePost && (
  <section className="post-feed">
    {posts.length > 0 ? (
      posts.map((post) => (
        <div key={post.postId} className="post-card">
          {/* Post Header */}
          <div className="post-header">
            <div className="post-user-info">
              <img
                src={
                  post.profilePicture ||
                  "http://localhost:8080/images/profile/default-avatar.png"
                }
                alt="Profile"
                className="profile-picture"
              />
              <p className="post-username">{post.username}</p>
            </div>
            <div className="post-actions-icons">
              <button
                className="delete-button"
                onClick={() => handleDeletePost(post.postId)}
                
              >
              
                <FontAwesomeIcon icon={faTrash} className="trash-icon" />
              </button>
              <ConfirmationDialog
  open={confirmDialog.open}
  title={confirmDialog.title}
  onConfirm={confirmDialog.onConfirm}
  onCancel={() => setConfirmDialog({ open: false })}
/>
              
              <p className="post-time">{getRelativeTime(post.createdAt)}</p>
            </div>
          </div>

          {/* Post Title and Content */}
          <h3>{post.title}</h3>
          <p>{post.content}</p>

          {/* Media Section */}
          {post.preSignedImageUrl && (
            <div className="media-wrapper">
              <img
                src={post.preSignedImageUrl}
                alt="Post"
                className="post-image"
              />
            </div>
          )}
          {post.preSignedVideoUrl && (
            <div className="media-wrapper">
              <video controls className="post-video">
                <source src={post.preSignedVideoUrl} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            </div>
          )}

          {/* Post Actions */}
          <div className="post-actions">
            <button
              className="no-hover"
              onClick={() => handleLikePost(post.postId, post.liked)}
            >
              <FontAwesomeIcon
                icon={faHeart}
                color={post.liked ? "red" : "gray"}
              />{" "}
              {post.likeCount || 0}
            </button>
            <button
              className="comments-button"
              onClick={() => handleToggleComments(post.postId)}
            >
              | {post.commentCount || 0} Comments
            </button>
          </div>

          {/* Comments Section */}
          {showComments[post.postId] && (
            <div className="comments-section">
              <h4>Comments</h4>
              {Array.isArray(post.comments) && post.comments.length > 0 ? (
                renderComments(post.comments, post.postId)
              ) : (
                <p>No comments yet.</p>
              )}
              <form
                onSubmit={(e) => handleCommentSubmit(e, post.postId)}
                className="comment-form"
              >
                <input
                  type="text"
                  placeholder="Add a comment..."
                  value={newComment[post.postId] || ""}
                  onChange={(e) =>
                    setNewComment((prev) => ({
                      ...prev,
                      [post.postId]: e.target.value,
                    }))
                  }
                  required
                />
                <button type="submit">Comment</button>
              </form>
            </div>
          )}
        </div>
      ))
    ) : (
      <p>No posts available.</p>
    )}
  </section>
)}

   </div>
  
   
 );
 
};

export default Community;












