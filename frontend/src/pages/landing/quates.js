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

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch("http://localhost:2400/PostgreSQL/API/users/get/single/1", {
          headers: {
            Authorization: "Bearer YOUR_ACCESS_TOKEN",
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
            Authorization: "Bearer YOUR_ACCESS_TOKEN",
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
        <h2>Loading...</h2>
      ) : error ? (
        <h2>Error: {error}</h2>
      ) : (
        <section id="hero" className="hero" style={{ marginTop: "3cm", height: "" }}>
          <div className="container position-relative">
            <div className="row gy-5" data-aos="fade-in">
              <div className="col-lg-12 text-center">
                <h2 style={{ fontSize: "45px", fontFamily: "monospace" }}>
                  Welcome to {user.firstName}'s Quotes
                </h2>
                <p style={{ fontFamily: "monospace" }}>{user.slog}</p>
              </div>
            </div>
          </div>
        </section>
      )}

      <section id="quotes" className="quotes">
        <div className="container" data-aos="fade-up">
          <h2 style={{ textAlign: "center" }}>Quotes</h2>
          <div className="row gy-4">
            {loadingPosts ? (
              <p>Loading quotes...</p>
            ) : error ? (
              <p>Error loading quotes</p>
            ) : filteredQuotes.length > 0 ? (
              filteredQuotes.map((quote) => (
                <div key={quote.id} className="col-12">
                  <blockquote style={{ fontSize: "18px", fontStyle: "italic", padding: "10px", borderLeft: "4px solid #007bff" }}>
                    {quote.postContent}
                  </blockquote>
                  <p style={{ textAlign: "right", fontWeight: "bold" }}>- {quote.postedBy.firstName} {quote.postedBy.lastName}</p>
                </div>
              ))
            ) : (
              <p>No quotes available</p>
            )}
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
};

export default LandingPage;
