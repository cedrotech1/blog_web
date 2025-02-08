import React, { useEffect, useState } from "react";

const PostCards = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch(
          "http://localhost:2400/PostgreSQL/API/posts/get/all",
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
              Accept: "application/json",
            },
          }
        );

        const data = await response.json();
        if (response.ok) {
          setPosts(data.data);
        } else {
          console.error("Failed to fetch posts:", data.message);
        }
      } catch (error) {
        console.error("Error fetching posts:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, [token]);

  if (loading) {
    return <div className="text-center mt-5">Loading...</div>;
  }

  return (
    <div className="container mt-4">
      <h2 className="mb-4">Recent Posts</h2>
      <div className="row">
        {posts.length > 0 ? (
          posts.map((post) => (
            <div className="col-md-4" key={post.id}>
              <div className="card shadow-lg rounded-lg p-3 mb-4">
                <div className="d-flex align-items-center">
                  <img
                    src={post.postedBy.profile}
                    alt="Profile"
                    className="rounded-circle"
                    width="40"
                    height="40"
                    style={{ marginRight: "10px" }}
                  />
                  <div>
                    <h6 className="mb-0">
                      {post.postedBy.firstName} {post.postedBy.lastName}
                    </h6>
                    <small className="text-muted">
                      {new Date(post.createdAt).toLocaleString()}
                    </small>
                  </div>
                </div>

                <div className="mt-3">
                  <h5>{post.postTitle}</h5>
                  {post.postImage.includes(".mp4") ||
                  post.postImage.includes(".webm") ? (
                    <video controls className="w-100 rounded">
                      <source src={post.postImage} type="video/mp4" />
                      Your browser does not support the video tag.
                    </video>
                  ) : (
                    <img
                      src={post.postImage}
                      alt="Post"
                      className="w-100 rounded"
                    />
                  )}
                  <p className="mt-2">{post.postContent}</p>
                </div>

                <div className="d-flex justify-content-between mt-2">
                  <div>
                    <span className="me-3">👍 {post.allLikes}</span>
                    <span className="me-3">👎 {post.allUnlikes}</span>
                    <span>💬 {post.allComents}</span>
                  </div>
                  <span className="text-muted">👀 {post.views} Views</span>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="col-12 text-center">No posts available</div>
        )}
      </div>
    </div>
  );
};

export default PostCards;
