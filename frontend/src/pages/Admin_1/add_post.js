
import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Modal, Offcanvas, Button, Nav } from 'react-bootstrap';
import { BiEnvelope, BiPhone, BiMap } from 'react-icons/bi'; // Importing icons from the 'react-icons' library
import '../../css/main2.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEdit, faCheck, faTimes, faTrash } from '@fortawesome/free-solid-svg-icons';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import LoadingSpinner from '../../components/loading'; // Import the LoadingSpinner component
import { useNavigate, useParams } from 'react-router-dom';



import Menu from "../../components/MenuDeskTop";

import Statistics from "../../components/statistics-component";
import Menu2 from "../../components/MenuMobile";

const Dashboard = () => {
  const navigate = useNavigate();
  const [show, setShow] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const handleToggleModal = () => { setShowModal(!showModal); };
  const handleCloseModal = () => { setShowModal(false); };
  const handleShowDetailModal = () => { setShowDetailModal(true); };
  const handleCloseDetailModal = () => { setShowDetailModal(false); };
  const [showModal1, setShowModal1] = useState(false);
  const handleToggleModal1 = () => { setShowModal1(!showModal1); };
  const handleCloseModal1 = () => { setShowModal1(false); };
  const [EmployeesAdmin, setEmployeesAdmin] = useState([]);
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem('token');
  const [selectedUser, setSelectedUser] = useState([]);
  const [ID, setID] = useState();
  const [rest, SetResto] = useState('');
  const [Error, setError] = useState('');



  useEffect(() => {
    const user = localStorage.getItem('user');
    if (user) {
      const parsedUser = JSON.parse(user);
      const resto = parsedUser.restaurents;
      // setObj(parsedUser)
      SetResto(resto)
    } else {
      console.error('User information not found in local storage');
    }
  }, []);
  useEffect(() => {
    const fetchEmployeesAdmin = async () => {
      try {
        const response = await fetch(`${process.env.REACT_APP_BASE_URL}/posts/get/all`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await response.json();
        // console.log(data);
        if (data) {

          const postArray = Array.isArray(data.data) ? data.data : [];
          // console.log(data);

          setEmployeesAdmin(postArray);
          console.log(postArray);
        } else {
          console.error('Failed to fetch EmployeesAdmin:', data.message);
        }
        setLoading(false);
      } catch (error) {
        console.error('Error fetching EmployeesAdmin:', error);
        setLoading(false);
      }
    };

    fetchEmployeesAdmin();
  }, []);


  const handleView = (userId) => {
    setID(userId);
    const userToView = EmployeesAdmin.find(user => user.id === userId);
    setSelectedUser(userToView);
    // handleShowDetailModal();
  };





  const handleDelete = async (userId) => {
    try {
      const isConfirmed = window.confirm("Are you sure you want to delete this post?");
      if (!isConfirmed) {
        return;
      }

      const token = localStorage.getItem('token');
      const response = await fetch(`${process.env.REACT_APP_BASE_URL}/posts/delete/${userId}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const res = await response.json();
        toast.success(res.message);
        await new Promise(resolve => setTimeout(resolve, 1000)); // Adjust the delay time as needed

        window.location.reload();
      } else {
        const errorData = await response.json();
        console.error(`Failed to delete user with ID ${userId}:`, errorData.message);
      }
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };


  const renderActivationButton = (userId, userStatus) => {
    const buttonStyle = {
      backgroundColor: 'white',
      border: '0px',
    };


  };





  const addpost = (e) => {
    navigate("../post")
  };

  // handlefilter
  const [value, setFilterValue] = useState('');
  const handleFilter = (e) => {
    setFilterValue(e.target.value);
    setError(null);
  };
  useEffect(() => {
    const fetchEmployeesAdmin = async () => {
      try {
        const response = await fetch(`${process.env.REACT_APP_BASE_URL}/posts/get/all`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const data = await response.json();
        if (data) {
          const postArray = Array.isArray(data.data) ? data.data : [];
          const filteredUsers = postArray.filter(user =>
            (user.category.toLowerCase().includes(value.toLowerCase()) ||
              user.postTitle.toLowerCase().includes(value.toLowerCase()) ||
              user.postContent.toLowerCase().includes(value.toLowerCase()) ||
              user.allLikes.toLowerCase().includes(value.toLowerCase())) &&
            user.category !== ''
          );
          setEmployeesAdmin(filteredUsers);
        } else {
          console.error('Failed to fetch EmployeesAdmin:', data.message);
        }
        setLoading(false);
      } catch (error) {
        console.error('Error fetching EmployeesAdmin:', error);
        setLoading(false);
      }
    };

    fetchEmployeesAdmin();
  }, [value]);

  return (
    <body className='mybody'>
      <div className="dashboard" style={{ backgroundColor: 'whitesmoke' }}>
        <div className="container-fluid">
          <div className="row">
            {/* Sidebar (visible on medium devices and larger) */}
            <div className={`col-md-3 d-none d-md-block ${show ? 'sidebar-shift' : ''}`}>
              <Offcanvas show={show} onHide={() => setShow(false)} placement="start">
                <Offcanvas.Header closeButton>
                  <Offcanvas.Title>Menu</Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body>

                  {/* <center> */}
                  <Menu2 />

                  {/* </center> */}
                </Offcanvas.Body>
              </Offcanvas>
            </div>

            {/* Main Content */}
            <main className="col-md-12 ms-sm-auto col-lg-12 px-md-4 allcontent">
              <div className="row">
                {!show && (
                  <div className="col-md-2 d-none d-md-block d-md-blockx" >
                    <Menu />
                  </div>
                )}       <div className="col-12 d-md-none" style={{ marginTop: '1cm' }}>
                  <Button variant="" onClick={() => setShow(!show)}>
                    ☰
                  </Button>
                </div>

                {loading ? <> <div style={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  padding: '3cm', // Use 100% of the viewport height
                }}>
                  <div>
                    <LoadingSpinner />
                  </div>
                </div></> : <>



                  <div className={`col-md-10 ${show ? 'content-shift' : ''}`}>

                    <section id="team" className="team teamb" >
                      <div className="container" data-aos="fade-up" style={{ marginLeft: '-0.2cm' }}>

                        <div className="row">
                          <Statistics />
                        </div>
                      </div>
                    </section>

                    <div className="row" style={{ backgroundColor: 'whitesmoke' }}>
                      <div className="col-xl-4 col-md-4" style={{ padding: '0.4cm' }}>
                        <input
                          placeholder='Filter here...'
                          variant=""
                          onChange={handleFilter}
                          style={{
                            backgroundColor: 'white',
                            borderRadius: '6px',
                            fontFamily: 'monospace',
                            textDecoration: 'none',
                            padding: '0.2cm',
                            width: '5cm',
                            marginTop: '0cm',
                            marginLeft: '0.3cm',
                            // marginBottom: '1cm',
                            // color: 'black',
                            height: 'auto',
                            // width: '6cm',
                            border: '0px',
                            outline: 'none',

                          }}
                        />
                      </div>
                      <div className="col-xl-4 col-md-4" style={{ paddingRight: '0.4cm' }}>
                        <h4 style={{ textAlign: 'justify', paddingBottom: '0cm', color: 'gray', paddingLeft: '0.4cm' }}>LIST OF OUR POSTS </h4>

                      </div>
                      <div className="col-xl-4 col-md-4" style={{ padding: '0.4cm' }}>
                        <div style={{ textAlign: 'right', marginBottom: '0.4cm' }}>
                          <Button
                            variant=""
                            onClick={() => addpost()}
                            style={{
                              backgroundColor: 'white',
                              borderRadius: '6px',
                              fontFamily: 'monospace',
                              textDecoration: 'none',
                              padding: '0.2cm',
                              width: '4cm',
                              // marginTop: '-2cm',
                              marginRight: '0.3cm',
                              color: 'black',
                              height: 'auto',
                            }}
                          >
                            Add post
                          </Button>
                        </div>
                      </div>
                    </div>


                    <Modal
                      className="modal fade bd-example-modal-lg"
                      size="lg"
                      tabindex="-1"
                      role="dialog"
                      aria-labelledby="myLargeModalLabel"
                      aria-hidden="true"
                      show={showDetailModal}
                      onHide={handleCloseDetailModal}
                    >
                      <Modal.Header closeButton>
                        <Modal.Title>Post Details</Modal.Title>
                      </Modal.Header>
                      <Modal.Body>
                        {selectedUser && (
                          <>
                            <section id="team" className="team">
                              <div className="container" data-aos="fade-up">
                                <div className="row">
                                  <div className="" data-aos="fade-up" data-aos-delay="100">
                                    <div className="row">
                                      <div className=" col-xl-6 col-md-6 d-flex">
                                        {selectedUser.postImage && selectedUser.postImage !== 'null' ? (
                                          selectedUser.postImage.endsWith('.mp4') || selectedUser.postImage.endsWith('.mov') || selectedUser.postImage.endsWith('.avi') ? (
                                            <video controls className="img-fluid" style={{ borderRadius: '10px', marginBottom: '0.5cm', width: '9cm' }}>
                                              <source src={selectedUser.postImage} type="video/mp4" />
                                              Your browser does not support the video tag.
                                            </video>
                                          ) : (
                                            <img src={selectedUser.postImage} className="img-fluid" alt="Uploaded Content" style={{ borderRadius: '10px', marginBottom: '0.5cm', width: '9cm' }} />
                                          )
                                        ) : (
                                          <img src="/assets/img/images (3).png" className="img-fluid" alt="Default Image" style={{ borderRadius: '10px', marginBottom: '0.5cm', width: '9cm' }} />
                                        )}

                                      </div>
                                      <div className=" col-xl-6 col-md-6" style={{ padding: '0.5cm', backgroundColor: 'white', borderRadius: '0.5cm' }}>
                                        <h5 style={{ textAlign: 'justify' }}>POST DETAILS

                                        </h5>
                                        <p style={{ textAlign: 'justify', marginTop: '1cm' }}>
                                          <p>contents: {selectedUser.postContent} </p>
                                          <p>Title: {selectedUser.postTitle}</p>
                                          <p>Views: {selectedUser.views}</p>
                                          <p>likes: {selectedUser.allLikes}</p>
                                          <p>unlikes: {selectedUser.allUnlikes}</p>
                                          <p>comments: {selectedUser.allComents}</p>
                                        </p>
                                        <div className="d-flex justify-content-center justify-content-lg-start">


                                        </div>
                                      </div>
                                    </div>


                                  </div>



                                </div>
                              </div>
                            </section>
                          </>
                        )}
                      </Modal.Body>
                    </Modal>



                    <section id="team" className="team" style={{ marginTop: '-2cm' }}>
                      <div className="container" data-aos="fade-up">
                        <div className="row gy-4">
                          {EmployeesAdmin.length > 0 ? (
                            EmployeesAdmin.map((Employee) => (
                              <div onClick={() => handleView(Employee.id)} key={Employee.id} className="col-xl-4 col-md-6 " data-aos="fade-up" data-aos-delay={100 * Employee.id} style={{ padding: '' }}>

                                <div className="member col-xl-12" style={{ padding: "0.4cm" }}> <br />

                                  {Employee.postImage && Employee.postImage !== 'null' ? (
                                    Employee.postImage.endsWith('.mp4') || Employee.postImage.endsWith('.mov') || Employee.postImage.endsWith('.avi') ? (
                                      <video controls className="img-fluid" style={{ borderRadius: '10px', height: '7cm', width: '100%' }}>
                                        <source src={Employee.postImage} type="video/mp4" />
                                        Your browser does not support the video tag.
                                      </video>
                                    ) : (
                                      <img src={Employee.postImage} className="img-fluid" alt="Uploaded Content" style={{ borderRadius: '100%', height: '7cm', width: '100%' }} />
                                    )
                                  ) : (
                                    <img src="/assets/img/images (3).png" className="img-fluid" alt="Default Image" style={{ borderRadius: '100%', height: '3.5cm', width: '3.5cm' }} />
                                  )}


                                  <h4 style={{ textAlign: 'center' }}> &nbsp;{Employee.postTitle}</h4>
                                  <p style={{ textAlign: 'justify', fontFamily: '', textAlign: 'center' }}>
                                    {Employee.postContent}<br /><br />

                                    content: &nbsp; {Employee.postContent} <br />

                                    Views: &nbsp; {Employee.views} <br />
                                    likes: &nbsp; {Employee.allLikes} <br />
                                  </p>


                                  <button onClick={() => handleDelete(Employee.id)} style={{ backgroundColor: 'white', border: '0px' }}>
                                    <FontAwesomeIcon icon={faTrash} style={{ Color: 'red' }} />
                                  </button>
                                  <button style={{ backgroundColor: 'white', border: '0px' }} onClick={() => { handleView(Employee.id); handleShowDetailModal(); }}>
                                    <FontAwesomeIcon icon={faEye} />
                                  </button>
                                  {renderActivationButton(Employee.id, Employee.status)}

                                </div>


                              </div>
                            ))
                          ) : (
                            <div className="col-12 text-center">
                              <h4 style={{ textAlign: 'center', paddingBottom: '0.5cm', color: 'gray', border: '4PX SOLID lightgray', padding: '1cm' }}>{value ? 'NO MATCHING DATA FOUND' : 'NO DATA AVAILABLE'}</h4>
                            </div>
                          )}

                        </div>
                      </div>
                    </section>
                  </div>

                </>}
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
