import React, { useState, useEffect } from 'react';
import { BiEnvelope, BiPhone, BiMap } from 'react-icons/bi';
import '../../css/main2.css';
import Footer from "../../components/footer";
import Menu from "../../components/menu";

const LandingPage = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await fetch('http://localhost:2400/PostgreSQL/API/users/get/single/1', {
          method: 'GET',
          headers: {
            'accept': 'application/json',
            'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNzM4OTg4NjY5LCJleHAiOjE3MzkwNzUwNjl9._u6h2haQaLWu6fbm0wkbgKeUfFIpgwxcTMrXFvFdjAM'
          }
        });

        const data = await response.json();
        if (data.status === "200") {
          setUser(data.data);
        } else {
          console.error("Error fetching user data:", data.message);
        }
      } catch (error) {
        console.error("Failed to fetch user data:", error);
      }
    };

    fetchUser();
  }, []);

  return (
    <>
      <Menu />

      <section id="contact" className="contact">
        <div className="container" data-aos="fade-up">
          <div className="section-header"></div>

          <div className="row gx-lg-0 gy-4">
            <div className="col-lg-4" style={{ fontFamily: 'monospace' }}>
              <div className="info-container d-flex flex-column align-items-center justify-content-center" style={{ backgroundColor: 'white', fontFamily: 'monospace' }}>
                
            
               
                <div className="info-item d-flex" style={{ backgroundColor: 'whitesmoke', color: 'black' }}>
                  <i className="bi bi-envelope flex-shrink-0" style={{ backgroundColor: 'white' }}><BiMap  className="flex-shrink-0 bi bi-envelope flex-shrink-0" style={{ color: 'black' }} /></i>

                  <div>
                    <h4>Location:</h4>
                    <p>{user ? user.location : "Loading..."}</p>
                  </div>
                </div>

                

                <div className="info-item d-flex" style={{ backgroundColor: 'whitesmoke', color: 'black' }}>
                  <i className="bi bi-envelope flex-shrink-0" style={{ backgroundColor: 'white' }}><BiEnvelope className="flex-shrink-0 bi bi-envelope flex-shrink-0" style={{ color: 'black' }} /></i>

                  <div>
                    <h4>Email:</h4>
                    <p>{user ? user.email : "Loading..."}</p>
                  </div>
                </div>


                <div className="info-item d-flex" style={{ backgroundColor: 'whitesmoke', color: 'black' }}>
                  <i className="bi bi-envelope flex-shrink-0" style={{ backgroundColor: 'white' }}><BiPhone className="flex-shrink-0 bi bi-envelope flex-shrink-0" style={{ color: 'black' }} /></i>

                  <div>
                    <h4>Call:</h4>
                    <p>{user ? user.phone : "Loading..."}</p>
                  </div>
                </div>

                <div className="info-item d-flex" style={{ backgroundColor: 'whitesmoke', color: 'black' }}>
                  <div>
                    <iframe 
                      style={{ height: '100%', width: '100%', border: '0' }} 
                      frameBorder="0" 
                      src="https://www.google.com/maps/embed/v1/place?q=UTB&key=AIzaSyBFw0Qbyq9zTFTd-tUY6dZWTgaQzuU17R8">
                    </iframe>
                  </div>
                </div>

              </div>
            </div>

            <div className="col-lg-8">
              <form action="" method="post" role="form" className="myform">
                <div className="row" style={{ paddingTop: '1cm' }}>
                  <div className="col-md-6 form-group">
                    <input type="text" name="name" className="form-control" id="name" placeholder="Your Name" required />
                  </div>
                  <div className="col-md-6 form-group mt-3 mt-md-0">
                    <input type="email" className="form-control" name="email" id="email" placeholder="Your Email" required />
                  </div>
                </div>
                <div className="form-group mt-3">
                  <input type="text" className="form-control" name="subject" id="subject" placeholder="Subject" required />
                </div>
                <div className="form-group mt-3" style={{ paddingTop: '1cm' }}>
                  <textarea className="form-control" name="message" rows="7" placeholder="Message" required></textarea>
                </div>
                <div className="my-3">
                  <div className="loading">Loading</div>
                  <div className="error-message"></div>
                  <div className="sent-message">Your message has been sent. Thank you!</div>
                </div>
                <div className="text-center">
                  <button type="submit" style={{ padding: '0.2', width: '100%', borderRadius: '0.3CM', backgroundColor: 'whitesmoke', color: 'gray' }}>Send Message</button>
                </div>
              </form>
            </div>

          </div>

        </div>
      </section>

      <br />
      <Footer />

      <a href="#" className="scroll-top d-flex align-items-center justify-content-center">
        <i className="bi bi-arrow-up-short"></i>
      </a>
    </>
  );
};

export default LandingPage;
