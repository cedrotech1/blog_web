import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Nav } from 'react-bootstrap';
import { BiUser, BiCog, BiFile } from 'react-icons/bi';
import '../css/main2.css';
import { Link, useNavigate } from 'react-router-dom';
import { BsHouseDoor } from 'react-icons/bs';
import { GiHotMeal } from 'react-icons/gi';

const LandingPage = () => {
  const [show, setShow] = useState(false);
  const [status, setStatus] = useState('');
  const [image, setImage] = useState('');
  const [obj,setObj]=useState('');
  const [rest,SetResto]=useState('');

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
      const userimage = parsedUser.image;


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
 


  const getMenu = () => {
    switch (obj.role) {
      case 'admin':
        return admin;
      
      default:
        return admin;
    }
  };
  return (
    <>
    <div>
      <div className="membery">
        <center>
        <Link to="/settings">
            {obj.profile && obj.profile!=='null' ? (
              <img src={obj.profile} className="img-fluid" alt="" style={{ borderRadius: '100%', marginBottom: '0.5cm', height: '3.2cm', width: '3cm' }} />
            ) : (
              <img src="/assets/img/images (3).png" className="img-fluid" alt="Default Image" style={{ borderRadius: '100%', marginBottom: '0.5cm', height: '3cm', width: '3cm' }} />
            )}
          </Link>
          <h5>{obj.firstName} {obj.lastName}</h5>
          <p className='titlex'>
          <p style={{fontStyle:'italic',fontSize:'14px'}}>{obj.role}</p>
          </p>
        </center>
      </div>

      <Nav className="flex-column">
      
          <center>
            {getMenu().map((menuItem, index) => (
          <Link key={index} to={menuItem.to} className="nav-link" style={{textTransform:'Capitalize',fontFamily:'monospace',fontStyle:'italic',textAlign:'center'}}>
          {menuItem.icon} {menuItem.name}
        </Link>
            ))}
            <div className="d-flex justify-content-center">
              <a href="/logout" className="btn-get-started" style={{ backgroundColor: '#b6b5b5', borderRadius: '6px', fontFamily: 'monospace', textDecoration: 'none', padding: '0.2cm', width: '4cm', marginTop: '1.5cm', color: 'black' }}>
                logout
              </a>
            </div>
          </center>
        
      </Nav>
      </div>
    </>
  );
};

export default LandingPage;
