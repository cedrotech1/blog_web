

import 'bootstrap/dist/css/bootstrap.min.css';
import { Nav } from 'react-bootstrap';
import { BiUser, BiCog, BiFile } from 'react-icons/bi';
import React, { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { BsHouseDoor } from 'react-icons/bs';
import { GiHotMeal } from 'react-icons/gi';

const LandingPage = () => {
  // ... (your existing code)
  const [show, setShow] = useState(false);
  const [status, setStatus] = useState('');
  const [image, setImage] = useState('');
  const [rest,SetResto]=useState('');
  const [obj,setObj]=useState('');
  const navigate = useNavigate();
  useEffect(() => {
    if (!localStorage.getItem('token') || !localStorage.getItem('user')) {
      navigate('/login');
    }
  }, [navigate]);

  useEffect(() => {
    const user = localStorage.getItem('user');
    if (user) {
      const parsedUser = JSON.parse(user);
      const userStatus = parsedUser.status;
      const userimage = parsedUser.profile;
      const resto = parsedUser.restaurents;
      setObj(parsedUser)
      setStatus(userStatus);
      setImage(userimage)
      SetResto(resto)
    } else {
      console.error('User information not found in local storage');
    }
  }, []);

  const admin = [
    { name: 'Dashboard', icon: <BsHouseDoor />, to: '/dashboard' },
    { name: 'add post', icon: <GiHotMeal />, to: '/post' },
    { name: 'view post', icon: <GiHotMeal />, to: '/view_post' },
    { name: 'Settings', icon: <BiCog />, to: '/settings' },

  ];

 

  // Choose the appropriate menu based on the user's status
  const getMenu = () => {
    switch (obj.role) {
      case 'admin':
        return admin;
      
      default:
        return admin;
    }
  };
  // console.log(status)

  return (
    <>
     <div className="col-md-2 d-none d-md-block d-md-blockx" 
      style={{
          marginBottom:'0cm',
          position: 'fixed',
          top: 0,
          left: 0,
          zIndex: 1000,
        }}>
      <div className="membery">
      <div className="membery">
        <center>
        <Link to="/settings">
            {obj.profile && obj.profile!=='null'? (
              <img src={obj.profile} className="img-fluid" alt="" style={{ borderRadius: '100%', marginBottom: '0.5cm', height: '3cm', width: '3cm' }} />
            ) : (
              <img src="/assets/img/images (3).png" className="img-fluid" alt="Default Image" style={{ borderRadius: '100%', marginBottom: '0.5cm', height: '3cm', width: '3cm' }} />
            )}
          </Link>
          <h5>{obj.firstName} {obj.lastName}</h5>
          <p className='titlex'>
          <p style={{fontStyle:'italic',fontSize:'14px'}}>{obj.role}</p>
          </p>

          <Nav className="flex-column">
            {getMenu().map((menuItem, index) => (
              <Link
                key={index}
                to={menuItem.to}
                className="nav-link"
                style={{
                  textTransform: 'capitalize',
                  fontFamily: 'monospace',
                  fontStyle: 'italic',
                  marginBottom: '10px',  
                  display: 'flex',
                  alignItems: 'center',
                  whiteSpace: 'nowrap',  
                  marginLeft:'0.5cm'
                }}>
      {menuItem.icon} <span style={{ marginLeft: '8px' }}>{menuItem.name}</span>
    </Link>
  ))}
</Nav>

        </center>
      </div>
        <>
          <center>


            <div className="d-flex justify-content-center">
              <Link to="/logout" className="btn-get-started1">
                Logout
              </Link>
            </div>
          </center>
        </>
      </div>
      </div>
    </>
  );
};

export default LandingPage;
