import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Menu from "../../components/menu";
import Footer from "../../components/footer";
import NotFound from "../landing/notfound";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import LoadingSpinner from '../../components/loading'; // Import the LoadingSpinner component

const styles = {
  hero: {
    height: '',
    marginTop:'2.3cm'
  },
  heading: {
    // marginTop: '-5cm',
    fontFamily: 'monospace',
  },
  paragraph: {
    marginBottom: '1cm',
    marginTop: '0cm',
    fontStyle: 'italic',
    fontFamily: 'cursive',
    textAlign: 'justify',
  },
  buttonContainer: {
    marginTop: '1cm',
  },
  getStartedButton: {
    backgroundColor: '',
    borderRadius: '6px',
    fontFamily: 'monospace',
  },
  restaurantButton: {
    // Add any specific styles for the restaurant button here
  },
  footer: {
    marginTop: '-0cm',
    fontFamily: 'monospace',
  },
};

const LandingPage = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [posts, setPosts] = useState([]);
  const [loadingUser, setLoadingUser] = useState(true);
  const [loadingPosts, setLoadingPosts] = useState(true);
  const [error, setError] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 3;

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch(
          `${process.env.REACT_APP_BASE_URL}/users/get/single/1`
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

    const fetchPosts = async () => {
      try {
        const response = await fetch(
          `${process.env.REACT_APP_BASE_URL}/posts/get/all`
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

  const totalPages = Math.ceil(filteredPosts.length / postsPerPage);

  const displayedPosts = filteredPosts.slice(
    (currentPage - 1) * postsPerPage,
    currentPage * postsPerPage
  );

  const nextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const prevPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  return (
    <>
      <Menu />
      {loadingUser ? (
        <div style={{padding:'5cm'}}>
        <center><LoadingSpinner /></center>
        
        </div>
      ) : error ? (
        <h2>Error: {error}</h2>
      ) : (
        <section id="hero" className="hero">
          <div className="container position-relative">
            <div className="row gy-5" data-aos="fade-in">
              <div className="col-lg-6 d-flex flex-column justify-content-center text-center text-lg-start">
                <h2 style={{ fontSize: "45px", fontFamily: "monospace" }}>
                  Welcome to {user.firstName}'s Page
                </h2>
                <p style={{ fontFamily: "monospace" }}>{user.about}</p>
                <i style={{ fontFamily: "monospace" }}>{user.slog}</i>
                <div className="d-flex justify-content-center justify-content-lg-start" style={styles.buttonContainer}>
                <a href="posts" className="btn-get-started" style={styles.getStartedButton}>
                  Visit My Posts 
                </a>
                <a href="quates" className="restaurent" style={styles.restaurantButton}>
                  Quates
                </a>
              </div>
              </div>
              <div className="col-lg-6">
                <img
                  src={user.profile}
                  className="img-fluid"
                  alt="Hero"
                  data-aos="zoom-out"
                  style={{ marginTop: "1cm" }}
                />
              </div>
            </div>
          </div>
        </section>
      )}

<section id="posts" className="posts">
  <div className="container" data-aos="fade-up">
    <h2 style={{ textAlign: "center" }}>Posts</h2>

    <div className="category-nav">
      {uniqueCategories.map((category) => (
        <button
          key={category}
          onClick={() => {
            setSelectedCategory(category);
            setCurrentPage(1);
          }}
          className={`category-button ${selectedCategory === category ? "active" : ""}`}
          style={{
            margin: "5px",
            padding: "10px",
            backgroundColor: selectedCategory === category ? "#f7d5dc" : "#f0f0f0",
            color: selectedCategory === category ? "black" : "black",
            borderRadius: "5px",
            border: "none",
            cursor: "pointer",
          }}
        >
          {category}
        </button>
      ))}
    </div>

    <div className="row gy-4">
      {loadingPosts ? (
        <div style={{ padding: "5cm" }}>
          <center><LoadingSpinner /></center>
        </div>
      ) : error ? (
        <p><NotFound/></p>
      ) : displayedPosts.length > 0 ? (
        displayedPosts.map((post) => (
          <div
            className="col-xl-4 col-md-6"
            key={post.id}
            style={{ padding: "0.2cm" }}
          >
            <div
              className="member rounded-lg shadow-md border"
              style={{
                margin: "0.1cm",
                padding: "0.2cm",
                borderRadius: "0.2cm",
                overflow: "hidden",
                wordWrap: "break-word",
                overflowWrap: "break-word",
              }}
            >
              {post.postImage && post.postImage.includes("video") ? (
                <video
                  controls
                  src={post.postImage}
                  style={{ width: "100%", maxWidth: "100%" }}
                />
              ) : post.postImage ? (
                <img
                  src={post.postImage}
                  className="img-fluid"
                  alt={post.postTitle}
                  style={{ width: "100%", maxWidth: "100%", height: "auto" }}
                />
              ) : (
                <p></p>
              )}
              <h4>{post.postTitle}</h4>
              <p
                style={{
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  whiteSpace: "normal",
                  maxHeight: "150px",
                  overflowY: "auto",
                }}
              >
                {post.postContent.substring(0, 100)}...
              </p>
              <p>
                <strong>Posted by:</strong> {post.postedBy.firstName}{" "}
                {post.postedBy.lastName}
              </p>
              <p>
                <strong>Likes:</strong> {post.allLikes} |{" "}
                <strong>Unlikes:</strong> {post.allUnlikes}
              </p>
              <button
                onClick={() => navigate(`/post/${post.id}`)}
                style={{
                  padding: "10px",
                  backgroundColor: "#f7d5dc",
                  color: "black",
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

    <div style={{ textAlign: "center", marginTop: "20px" }}>
      <button
        onClick={prevPage}
        disabled={currentPage === 1}
        style={{
          padding: "10px",
          marginRight: "10px",
          backgroundColor: "#f7d5dc",
          color: "black",
          borderRadius: "5px",
          border: "none",
          cursor: currentPage === 1 ? "not-allowed" : "pointer",
          opacity: currentPage === 1 ? 0.5 : 1,
        }}
      >
        Previous
      </button>

      <span style={{ margin: "0 10px" }}>
        Page {currentPage} of {totalPages}
      </span>

      <button
        onClick={nextPage}
        disabled={currentPage === totalPages}
        style={{
          padding: "10px",
          marginLeft: "10px",
          backgroundColor: "#f7d5dc",
          color: "black",
          borderRadius: "5px",
          border: "none",
          cursor: currentPage === totalPages ? "not-allowed" : "pointer",
          opacity: currentPage === totalPages ? 0.5 : 1,
        }}
      >
        Next
      </button>
    </div>
  </div>
</section>



      <Footer />
    </>
  );
};

export default LandingPage;
