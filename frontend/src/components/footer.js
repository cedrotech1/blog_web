import React, { useState, useEffect } from 'react';
import '../css/main2.css';

const LandingPage = () => {
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    // Fetch user data from the API
    const fetchUserData = async () => {
      try {
        const response = await fetch(`${process.env.REACT_APP_BASE_URL}/users/get/single/1`, {
          method: 'GET',
          headers: {
            'accept': 'application/json',
            // 'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNzM4OTg4NjY5LCJleHAiOjE3MzkwNzUwNjl9._u6h2haQaLWu6fbm0wkbgKeUfFIpgwxcTMrXFvFdjAM'
          }
        });

        const data = await response.json();
        if (data.status === '200') {
          setUserData(data.data); // Set the user data if successful
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUserData();
  }, []);

  return (
    <>
      <div className="container-fluid">
        <div className="row footerx" style={{ display: 'flex', alignItems: 'flex-end', fontFamily: 'monospace' }}>
          <div className="col-lg-4 order-1 order-lg-2 text-center">
            <ul className="text-lg-left">
              <li>quick access:</li>
              <li className="help">Help</li>
              <li className="help2">More</li>
              <li className="help3">about us</li>
            </ul>
          </div>
          <div className="col-lg-4 order-1 order-lg-2 text-center">
            <ul>
              <li>Info.Support.About</li>
              <li>Terms of Use . Privacy Policy</li>
            </ul>
          </div>
          <div className="col-lg-4 order-1 order-lg-2 text-center text-lg-right d-flex justify-content-center justify-content-lg-end">
            <ul>
              {userData && (
                <>
                  <li>
                    <a href={`tel:${userData.phone}`}>{userData.phone}</a>
                  </li>
                  <li>{`${userData.firstName} ${userData.lastName}`}</li>
                  <li>{userData.slog}</li>
                </>
              )}
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};

export default LandingPage;
