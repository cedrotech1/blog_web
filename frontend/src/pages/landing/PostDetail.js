import React, { useState, useEffect } from 'react';
import Menu from "../../components/menu";
import Footer from "../../components/footer";
import { BiLike } from 'react-icons/bi';
import { useNavigate, useParams } from 'react-router-dom';

const LandingPage = () => {
      const { id } = useParams();
  const [post, setPost] = useState(null);
  const [comment, setComment] = useState("");
  const [names, setNames] = useState(""); // New state for names
  const [comments, setComments] = useState([]); // State to store the list of comments
  const [refresh, setRefresh] = useState(false);

  useEffect(() => {
    fetch(`${process.env.REACT_APP_BASE_URL}/posts/single/post/${id}`, {
      headers: {
        'Accept': 'application/json'
      }
    })
    .then(response => response.json())
    .then(data => {
      setPost(data.data);
      setComments(data.data.Comments); // Set comments from the response data
    });
  }, [refresh]);

  const handleLike = () => {
    fetch(`${process.env.REACT_APP_BASE_URL}/posts/like/${id}`, {
      method: "POST",
      headers: {

        'Accept': 'application/json'
      }
    }).then(() => setRefresh(!refresh));
  };

  const handleComment = () => {
    const formData = new FormData();
    formData.append("commentBody", comment);
    formData.append("names", names); // Append names to formData

    fetch(`${process.env.REACT_APP_BASE_URL}/comments/add/${id}`, {
      method: "POST",
      headers: {
        'Accept': 'application/json'
      },
      body: formData
    }).then(() => {
      setComment("");
      setNames(""); // Clear names after submitting
      setRefresh(!refresh); // Trigger refresh to fetch updated comments
    });
  };

  return (
    <>
      <Menu />
      <section id="hero" className="hero">
        <div className="container position-relative">
          {post && (
            <div className="row gy-5" data-aos="fade-in">
              <div className="col-lg-6 order-2 order-lg-1 d-flex flex-column justify-content-center text-center text-lg-start">
                <h2 style={{ fontSize: '45px', marginBottom: '1cm', marginTop: '1cm', fontFamily: 'monospace' }}>
                  {post.postTitle}
                </h2>
                <p style={{ marginBottom: '1cm', marginTop: '0cm', fontStyle: 'bold', fontFamily: 'monospace' }}>
                  {post.postContent}
                </p>
                <p style={{ marginBottom: '1cm', marginTop: '0cm', fontStyle: 'bold', fontFamily: 'monospace' }}>
                  {post.category}
                </p>
                <div className="d-flex justify-content-center justify-content-lg-start">
                  <button onClick={handleLike} className="btn btn-light mx-2"><BiLike /> {post.Likes.length}</button>
                </div>
                <div className="mt-4">
                  <h4>Comments</h4>
                  <input 
                    type="text" 
                    value={comment} 
                    onChange={(e) => setComment(e.target.value)} 
                    placeholder="Write a comment..." 
                    className="form-control"
                  />
                  <input 
                    type="text" 
                    value={names} 
                    onChange={(e) => setNames(e.target.value)} 
                    placeholder="Your Name"  // Input for names
                    className="form-control mt-2"
                  />
                  <button onClick={handleComment} className="btn btn-primary mt-2">Comment</button>
                  <div className="mt-3">
                    {/* Display comments dynamically in styled cards */}
                    {comments.map((comment, index) => (
                      <div key={index} className="bg-white p-2 my-2 rounded-lg shadow-md border">
                        <div className="flex items-center">
                          <div className="font-semibold text-lg text-gray-700"> <b> Names:</b>{comment.names || 'Anonymous'}</div>
                        </div>
                        <p className="mt-2 text-gray-600"> <b> Comment:</b> {comment.commentBody}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              <div className="col-lg-6 order-1 order-lg-2">
                <img src={post.postImage} className="img-fluid" alt="Post" />
              </div>
            </div>
          )}
        </div>
      </section>
      <Footer />
    </>
  );
};

export default LandingPage;
