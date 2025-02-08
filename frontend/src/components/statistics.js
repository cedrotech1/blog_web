import React, { useEffect, useState } from 'react';
import LoadingSpinner from '../components/loading'; // Import the LoadingSpinner component

const App = () => {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  const [statistics, setStatistics] = useState(null);
  const token = localStorage.getItem('token');

  useEffect(() => {
    const fetchStatistics = async () => {
      try {
        const response = await fetch(`${process.env.REACT_APP_BASE_URL}/statistics`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await response.json();
        if (response.ok) {
          setStatistics(data);
          console.log("Fetched Statistics:", data);
        } else {
          console.error("Failed to fetch statistics:", data.message);
        }
      } catch (error) {
        console.error("Error fetching statistics:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchStatistics();
  }, [token]);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (error) {
        console.error("Error parsing user data:", error);
        setUser(null);
      }
    }
  }, []);

  if (loading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '4cm' }}>
        <LoadingSpinner />
      </div>
    );
  }

  if (!user) {
    return <div>User not found</div>;
  }

  const { role } = user;

  return (
    <div>
      {role === 'admin' && statistics && (
        <div className="row">
          {Object.entries(statistics).map(([key, value]) => (
            key !== "postsByCategory" && (
              <div key={key} className="col-xl-4" data-aos="fade-up" data-aos-delay="100" style={{ paddingLeft: '0.7cm', marginTop: '0.5cm' }}>
                <div className="row member" style={{ padding: '0.2cm' }}>
                  <div className="col-xl-4 col-md-6" style={{ backgroundColor: 'whitesmoke', borderRadius: '3px' }}>
                    <h1 style={{ fontSize: '73px', fontFamily: 'cursive', textAlign: 'center' }}>
                      {value}
                    </h1>
                  </div>
                  <div className="col-xl-7 col-md-6 statistic-info">
                    <h5>{key.replace(/([A-Z])/g, ' $1').trim()}</h5>
                    <p>Number of {key.replace(/([A-Z])/g, ' $1').toLowerCase()} in our system</p>
                  </div>
                </div>
              </div>
            )
          ))}

          {/* Display Posts by Category Separately */}
          {statistics.postsByCategory.length > 0 && (
            <div className="col-xl-12" data-aos="fade-up" data-aos-delay="100" style={{ paddingLeft: '0.7cm', marginTop: '0.5cm' }}>
              <div className="row member" style={{ padding: '0.2cm' }}>
                <h5>Posts by Category</h5>
                <ul>
                  {statistics.postsByCategory.map((category, index) => (
                    <li key={index}>{category.category || "Uncategorized"}: {category.count}</li>
                  ))}
                </ul>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default App;
