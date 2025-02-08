import React, { useState, useEffect } from 'react';
import Menu from "../../components/menu";
import Footer from "../../components/footer";
import { BiLike } from 'react-icons/bi';
import { useNavigate, useParams } from 'react-router-dom';
import LoadingSpinner from '../../components/loading'; // Import the LoadingSpinner component
import NotFound from "../landing/notfound";
const LandingPage = () => {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [comment, setComment] = useState("");
  const [names, setNames] = useState("");
  const [comments, setComments] = useState([]);
  const [refresh, setRefresh] = useState(false);
  const [loading, setLoading] = useState(true); // Loading state added

  useEffect(() => {
    setLoading(true); // Start loading
    fetch(`${process.env.REACT_APP_BASE_URL}/posts/single/post/${id}`, {
      headers: { 'Accept': 'application/json' }
    })
    .then(response => response.json())
    .then(data => {
      setPost(data.data);
      setComments(data.data.Comments || []);
    })
    .finally(() => setLoading(false)); // Stop loading after fetch
  }, [refresh]);

  const handleLike = () => {
    fetch(`${process.env.REACT_APP_BASE_URL}/posts/like/${id}`, {
      method: "POST",
      headers: { 'Accept': 'application/json' }
    }).then(() => setRefresh(!refresh));
  };

  const handleComment = () => {
    const formData = new FormData();
    formData.append("commentBody", comment);
    formData.append("names", names);

    fetch(`${process.env.REACT_APP_BASE_URL}/comments/add/${id}`, {
      method: "POST",
      headers: { 'Accept': 'application/json' },
      body: formData
    }).then(() => {
      setComment("");
      setNames("");
      setRefresh(!refresh);
    });
  };

  return (
    <>
      <Menu />
      <section id="hero" className="hero" style={{ marginTop: '1cm' }}>
        <div className="container position-relative">
          {loading ? ( // Show loading indicator while fetching data
            <div className="text-center" style={{ fontSize: '18px', fontWeight: 'bold', padding: '5cm' }}>
               <LoadingSpinner />
            </div>
          ) : post ? (
            <div className="row gy-5" data-aos="fade-in">
              <div className="col-lg-6 order-2 order-lg-1 d-flex flex-column justify-content-center text-center text-lg-start">
                <h2 style={{ fontSize: '45px', marginBottom: '1cm', marginTop: '1cm', fontFamily: 'monospace' }}>
                  {post.postTitle}
                </h2>
                <p style={{ marginBottom: '1cm', fontStyle: 'bold', fontFamily: 'monospace' }}>
                  {post.postContent}
                </p>
                <p style={{ marginBottom: '1cm', fontStyle: 'bold', fontFamily: 'monospace' }}>
                  {post.category}
                </p>
                <div className="d-flex justify-content-center justify-content-lg-start">
                  <button onClick={handleLike} className="btn btn-light mx-2">
                    <BiLike /> {post.Likes.length}
                  </button>
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
                    placeholder="Your Name"
                    className="form-control mt-2"
                  />
                  <button onClick={handleComment} className="btn btn-primary mt-2">Comment</button>

                  <div className="mt-3">
                    {comments.length > 0 ? comments.map((comment, index) => {
                      const formattedDate = new Date(comment.createdAt).toLocaleString();
                      return (
                        <div 
                          key={index} 
                          className="p-2 my-2 rounded-lg shadow-md border" 
                          style={{
                            backgroundColor: 'whitesmoke',
                            borderLeft: '4px solid #007bff',
                            padding: '10px', 
                            marginBottom: '8px'
                          }}
                        >
                          <div className="flex items-center" style={{ marginBottom: '5px' }}>
                            <span style={{ fontWeight: 'bold', fontSize: '16px', color: '#333' }}>
                              Names:
                            </span> 
                            <span style={{ marginLeft: '5px', fontSize: '15px', color: '#555' }}>
                              {comment.names || 'Anonymous'} 
                              <span style={{ marginLeft: '1cm' }}> {formattedDate}</span> 
                            </span>
                          </div>
                          <p style={{ fontSize: '14px', color: '#666' }}>
                            <b>Comment:</b> {comment.commentBody}   
                          </p>
                        </div>
                      );
                    }) : <p className="text-muted">No comments yet.</p>}
                  </div>
                </div>
              </div>

              <div className="col-lg-6 order-1 order-lg-2">
                <img src={post.postImage} className="img-fluid" alt="Post" />
              </div>
            </div>
          ) : (
            <div className="text-center" style={{ fontSize: '18px', fontWeight: 'bold', padding: '1cm', color: 'red' }}>
              <NotFound/>
            </div>
          )}
        </div>
      </section>
      <Footer />
    </>
  );
};

export default LandingPage;
