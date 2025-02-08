import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Offcanvas, Button } from 'react-bootstrap';
import '../../css/main2.css';
import { ToastContainer, toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import LoadingSpinner from '../../components/loading'; 
import Menu from "../../components/MenuDeskTop";
import Menu2 from "../../components/MenuMobile";
import Statistics from "../../components/statistics-component";

const Dashboard = () => {
  const [show, setShow] = useState(false);
  const navigate = useNavigate();
  const token = localStorage.getItem('token');
  const [loading, setLoading] = useState(false);
  const [postType, setPostType] = useState('image'); // Default to image
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    file: null,
    category: ''
  });

  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.file) {
      toast.error("Please upload a file.");
      return;
    }

    try {
      setLoading(true);
      const uploadEndpoint = postType === 'video' 
        ? `${process.env.REACT_APP_BASE_URL}/posts/upload` 
        : `${process.env.REACT_APP_BASE_URL}/API/posts/add`;
      
      const formDataToSend = new FormData();
      formDataToSend.append('postTitle', formData.title);
      formDataToSend.append('category', formData.category);
      formDataToSend.append('postContent', formData.description);
      formDataToSend.append(postType === 'video' ? 'video' : 'postImage', formData.file);
      
      const response = await fetch(uploadEndpoint, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formDataToSend,
      });

      if (response.ok) {
        const res = await response.json();
        toast.success(res.message);
        await new Promise((resolve) => setTimeout(resolve, 3000));
        window.location.reload();
        navigate("../view_post")
      } else {
        const errorData = await response.json();
        setError(errorData.message);
        toast.error(errorData.message);
      }
    } catch (error) {
      console.error('Error posting', error);
      setError('Failed to post. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    setError(null);
  };

  const handleFileChange = (e) => {
    setFormData({
      ...formData,
      file: e.target.files[0],
    });
  };

  return (
    <body className='mybody'>
      <div className="dashboard">
        <div className="container-fluid">
          <div className="row">
            <div className={`col-md-3 d-none d-md-block ${show ? 'sidebar-shift' : ''}`}>
              <Offcanvas show={show} onHide={() => setShow(false)} placement="start">
                <Offcanvas.Header closeButton>
                  <Offcanvas.Title>Menu</Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body>
                  <Menu2 />
                </Offcanvas.Body>
              </Offcanvas>
            </div>

            <main className="col-md-12 ms-sm-auto col-lg-12 px-md-4 allcontent">
              <div className="row">
                {!show && (
                  <div className="col-md-2 d-none d-md-block">
                    <Menu />
                  </div>
                )}

                <div className={`col-md-10 ${show ? 'content-shift' : ''}`}>

                <section id="team" className="team teamb" >
                      <div className="container" data-aos="fade-up" style={{ marginLeft: '-0.2cm' }}>
<div className="col-12 d-md-none">
                          <Button variant="" onClick={() => setShow(!show)}>
                            ☰
                          </Button>
                        </div>
                        <div className="row">
                          <Statistics />
                        </div>
                      </div>
                    </section>
                  <section id="hero" className="hero" style={{ marginTop: '1.5cm' }}>
                    <div className="container position-relative">
                      <div className="row gy-5" data-aos="fade-in">
                        <div className="col-lg-5 order-2 order-lg-1 d-flex flex-column justify-content-center text-lg-start" style={{ padding: '0.5cm' }}>
                          <form onSubmit={handleSubmit} className="myform">
                            <h1 style={{ fontSize: '27px', paddingBottom: '0.5cm', backgroundColor: 'whitesmoke', textAlign: 'center', padding: '0.3cm' }}>Create a Post</h1>
                            <div className="form-group">
                              <span>Title</span>
                              <input type="text" name="title" className="form-control" onChange={handleChange} />
                            </div>
                            <div className="form-group mt-3">
                              <span>Description</span>
                              <textarea name="description" className="form-control" onChange={handleChange}></textarea>
                            </div>
                            <div className="form-group mt-3">
                              <span>Category</span>
                              <select name="category" className="form-control" onChange={handleChange}>
                                <option value="" disable >Select Category</option>
                                <option value="FAITH & SPIRITUALITY">FAITH & SPIRITUALITY</option>
                                <option value="PERSONAL GROWTH & SELF DISCOVERY">PERSONAL GROWTH & SELF DISCOVERY</option>
                                <option value="KINDNESS & COMPASSION">KINDNESS & COMPASSION</option>
                                <option value="VLOG">VLOG</option>
                                <option value="Quotes">Quotes</option>
                              </select>
                            </div>
                            <div className="form-group mt-3">
                              <span>Post Type</span>
                              <select className="form-control" value={postType} onChange={(e) => setPostType(e.target.value)}>
                                <option value="image">Image</option>
                                <option value="video">Video</option>
                              </select>
                            </div>
                            <div className="form-group mt-3">
                              <span>Upload File</span>
                              <input type="file" className="form-control" onChange={handleFileChange} />
                            </div>
                            <div className="text-center mt-3">
                              <button type="submit" style={{ color: 'black' }} className={`form-control ${loading ? 'loading' : ''}`} disabled={loading}>
                                {loading ? <LoadingSpinner /> : 'Post'}
                              </button>
                            </div>
                          </form>
                        </div>
                        <div className="col-lg-5 order-1 order-lg-2 d-flex align-items-center justify-content-center">
                          <img src="assets/img/Interaction Design-bro.svg" className="img-fluid loginImg" alt="" style={{ height: '100%' }} />
                        </div>
                      </div>
                    </div>
                  </section>
                </div>
              </div>
            </main>
          </div>
        </div>
      </div>
      <ToastContainer />
    </body>
  );
};

export default Dashboard;
