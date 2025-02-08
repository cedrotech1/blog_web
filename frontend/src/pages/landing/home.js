import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Menu from "../../components/menu";
import Footer from "../../components/footer";

const LandingPage = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [posts, setPosts] = useState([]);
  const [loadingUser, setLoadingUser] = useState(true);
  const [loadingPosts, setLoadingPosts] = useState(true);
  const [error, setError] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState("All");

  useEffect(() => {
    // Fetch user info
    const fetchUserData = async () => {
      try {
        const response = await fetch(
        `${process.env.REACT_APP_BASE_URL}/users/get/single/1`,
          {
            headers: {
              Accept: "application/json",
            },
          }
        );
        if (!response.ok) throw new Error("Failed to fetch user data");
        const data = await response.json();
        setUser(data.data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoadingUser(false);
      }
    };

    // Fetch all posts
    const fetchPosts = async () => {
      try {
        const response = await fetch(
          `${process.env.REACT_APP_BASE_URL}/posts/get/all `,
          {
            headers: {
                          
              Accept: "application/json",
            },
          }
        );
        if (!response.ok) throw new Error("Failed to fetch posts");
        const data = await response.json();
        setPosts(data.data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoadingPosts(false);
      }
    };

    fetchUserData();
    fetchPosts();
  }, []);

  const uniqueCategories = posts.length
    ? ["All", ...new Set(posts.map((post) => post.category).filter(Boolean))]
    : ["All"];

  const filteredPosts =
    selectedCategory === "All"
      ? posts
      : posts.filter((post) => post.category === selectedCategory);

  return (
    <>
      <Menu />
      {loadingUser ? (
                <h2>Loading...</h2>
              ) : error ? (
                <h2>Error: {error}</h2>
              ) : (
                <>
      <section id="hero" className="hero">
        <div className="container position-relative">
          <div className="row gy-5" data-aos="fade-in">
            <div className="col-lg-6 order-2 order-lg-1 d-flex flex-column justify-content-center text-center text-lg-start">
           
                  <h2 style={{ fontSize: "45px", fontFamily: "monospace" }}>
                    Welcome to {user.firstName} 's Page
                  </h2>
                  <p style={{ fontFamily: "monospace" }}>{user.about}</p>

                  <i style={{ fontFamily: "monospace" }}>{user.slog}</i>
                 
                 
             
            </div>
            <div className="col-lg-6 order-1 order-lg-2">
              <img
                 src={user.profile}
                className="img-fluid"
                alt="Hero"
                data-aos="zoom-out"
                data-aos-delay="100"
                style={{marginTop:'1cm'}}
              />
            </div>
          </div>
        </div>
      </section>
      </>
    )}

      <section id="posts" className="posts">
        <div className="container" data-aos="fade-up">
          <h2 style={{ textAlign: "center" }}>Posts</h2>

          {/* Category Navigation */}
          <div className="category-nav">
            {uniqueCategories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`category-button ${
                  selectedCategory === category ? "active" : ""
                }`}
                style={{
                  margin: "5px",
                  padding: "10px",
                  backgroundColor:
                    selectedCategory === category ? "#007bff" : "#f0f0f0",
                  color: selectedCategory === category ? "white" : "black",
                  borderRadius: "5px",
                  border: "none",
                  cursor: "pointer",
                }}
              >
                {category}
              </button>
            ))}
          </div>

          {/* Post Display */}
          <div className="row gy-4">
            {loadingPosts ? (
              <p>Loading posts...</p>
            ) : error ? (
              <p>Error loading posts</p>
            ) : filteredPosts.length > 0 ? (
              filteredPosts.map((post) => (
                <div className="col-xl-4 col-md-6 d-flex rounded-lg shadow-md border" key={post.id} style={{margin:'0.2cm',marginTop:'1cm',padding:'0.2cm',borderRadius:'0.2cm'}}>
                  <div className="member">
                    {post.postImage.includes("video") ? (
                      <video
                        controls
                        src={post.postImage}
                        style={{ width: "100%" }}
                      />
                    ) : (
                      <img
                        src={post.postImage}
                        className="img-fluid"
                        alt={post.postTitle}
                      />
                    )}
                    <h4>{post.postTitle}</h4>
                    <p>{post.postContent.substring(0, 100)}...</p>

                    <p>
                      <strong>Posted by:</strong> {post.postedBy.firstName}{" "}
                      {post.postedBy.lastName}
                    </p>

                    <p>
                      <strong>Likes:</strong> {post.allLikes} |{" "}
                      <strong>Unlikes:</strong> {post.allUnlikes} |{" "}
                      {/* <strong>Comments:</strong> {post.allComents} */}
                    </p>

                    <button
                      onClick={() => navigate(`/post/${post.id}`)}
                      style={{
                        padding: "10px",
                        backgroundColor: "#28a745",
                        color: "white",
                        borderRadius: "5px",
                        border: "none",
                        cursor: "pointer",
                      }}
                    >
                      Read More
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <p>No posts available for "{selectedCategory}"</p>
            )}
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
};

export default LandingPage;
