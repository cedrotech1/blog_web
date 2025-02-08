import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Menu from "../../components/menu";
import Footer from "../../components/footer";
import LoadingSpinner from '../../components/loading'; 

const LandingPage = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [posts, setPosts] = useState([]);
  const [loadingUser, setLoadingUser] = useState(true);
  const [loadingPosts, setLoadingPosts] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch(`${process.env.REACT_APP_BASE_URL}/users/get/single/1`, {
          headers: {
            Accept: "application/json",
          },
        });
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
        const response = await fetch(`${process.env.REACT_APP_BASE_URL}/posts/get/all`, {
          headers: {
            Accept: "application/json",
          },
        });
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

  const filteredQuotes = posts.filter((post) => post.category === "Quotes");

  return (
    <>
      <Menu />
      {loadingUser ? (
        <div className="text-center" style={{ fontSize: '18px', fontWeight: 'bold', padding: '5cm' }}>
          <LoadingSpinner />
        </div>
      ) : error ? (
        <h2 style={{ color: 'red', textAlign: 'center' }}>Error: {error}</h2>
      ) : (
        <section id="hero" className="hero" style={{ marginTop: "3cm", textAlign: "center" }}>
          <div className="container position-relative">
            <div className="row gy-5" data-aos="fade-in">
              <div className="col-lg-12">
                <h2 style={{ fontSize: "45px", fontFamily: "monospace", color: "#333" }}>
                  Welcome to {user.firstName}'s Quotes
                </h2>
                <p style={{ fontFamily: "monospace", color: "#666" }}>{user.slog}</p>
              </div>
            </div>
          </div>
        </section>
      )}

      <section id="quotes" className="quotes" style={{ padding: "1cm 0.5cm" }}>
        <div className="container" data-aos="fade-up">
          <h2 style={{ textAlign: "center", marginBottom: "1cm", fontSize: "30px" }}>Quotes</h2>
          <div className="row gy-4" style={{ display: "flex", flexWrap: "wrap", justifyContent: "center" }}>
            {loadingPosts ? (
              <p style={{ textAlign: "center" }}>Loading quotes...</p>
            ) : error ? (
              <p style={{ textAlign: "center", color: "red" }}>Error loading quotes</p>
            ) : filteredQuotes.length > 0 ? (
              filteredQuotes.map((quote) => (
                <div 
                  key={quote.id} 
                  className="col-md-5" 
                  style={{
                    backgroundColor: 'white',
                    padding: '0.3cm',
                    border: "3px solid #f7d5dc",
                    borderRadius: '0.1cm',
                    margin: '0.5cm',
                    maxWidth: '100%',
                    wordWrap: 'break-word',
                    transition: "transform 0.3s ease, box-shadow 0.3s ease",
                    cursor: "pointer"
                  }}
                  onMouseOver={(e) => e.currentTarget.style.boxShadow = "0px 4px 12px rgba(0,0,0,0.2)"}
                  onMouseOut={(e) => e.currentTarget.style.boxShadow = "none"}
                >
                  <blockquote 
                    style={{ 
                      fontSize: "18px", 
                      fontStyle: "italic", 
                      padding: "10px", 
                      borderLeft: "4px solid #f7d5dc",
                      maxHeight: "200px",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      display: "block",
                      whiteSpace: "normal",
                      color: "#444"
                    }}
                  >
                    {quote.postContent}
                  </blockquote>
                  <p style={{ textAlign: "right", fontWeight: "bold", color: "#555" }}>
                    - {quote.postedBy.firstName} {quote.postedBy.lastName}
                  </p>
                </div>
              ))
            ) : (
              <p style={{ textAlign: "center" }}>No quotes available</p>
            )}
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
};

export default LandingPage;