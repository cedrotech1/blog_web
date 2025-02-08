import React, { useEffect, useState } from 'react';
import LoadingSpinner from '../components/loading'; // Import the LoadingSpinner component

const App = () => {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  const [statistics, setStatistics] = useState({
    totalPosts: 0,
    totalComments: 0,
    totalLikes: 0,
    totalUnlikes: 0,
    postsByCategory: [],
  });

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
          console.log('Fetched Statistics:', data);
        } else {
          console.error('Failed to fetch statistics:', data.message);
        }
      } catch (error) {
        console.error('Error fetching statistics:', error);
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
        console.error('Error parsing user data:', error);
        setUser(null);
      }
    } else {
      setUser(null);
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
      {role === 'admin' && (
        <div className="row">
          <div className="col-xl-4" data-aos="fade-up" data-aos-delay="100" style={{ paddingLeft: '0.7cm', marginTop: '0.5cm' }}>
            <div className="row member" style={{ padding: '0.2cm' }}>
              <div className="col-xl-4 col-md-6" style={{ backgroundColor: 'whitesmoke', borderRadius: '3px' }}>
                <h1 style={{ fontSize: '73px', fontFamily: 'cursive', textAlign: 'center' }}>
                  {statistics.totalPosts}
                </h1>
              </div>
              <div className="col-xl-7 col-md-6 statistic-info">
                <h5>Posts</h5>
                <p>Number of posts in our system</p>
              </div>
            </div>
          </div>

          <div className="col-xl-4" data-aos="fade-up" data-aos-delay="100" style={{ paddingLeft: '0.7cm', marginTop: '0.5cm' }}>
            <div className="row member" style={{ padding: '0.2cm' }}>
              <div className="col-xl-4 col-md-6" style={{ backgroundColor: 'whitesmoke', borderRadius: '3px' }}>
                <h1 style={{ fontSize: '73px', fontFamily: 'cursive', textAlign: 'center' }}>
                  {statistics.totalComments}
                </h1>
              </div>
              <div className="col-xl-7 col-md-6 statistic-info">
                <h5>Comments</h5>
                <p>Total comments on posts</p>
              </div>
            </div>
          </div>

          <div className="col-xl-4" data-aos="fade-up" data-aos-delay="100" style={{ paddingLeft: '0.7cm', marginTop: '0.5cm' }}>
            <div className="row member" style={{ padding: '0.2cm' }}>
              <div className="col-xl-4 col-md-6" style={{ backgroundColor: 'whitesmoke', borderRadius: '3px' }}>
                <h1 style={{ fontSize: '73px', fontFamily: 'cursive', textAlign: 'center' }}>
                  {statistics.totalLikes}
                </h1>
              </div>
              <div className="col-xl-7 col-md-6 statistic-info">
                <h5>Likes</h5>
                <p>Total likes on posts</p>
              </div>
            </div>
          </div>

          <div className="col-xl-4" data-aos="fade-up" data-aos-delay="100" style={{ paddingLeft: '0.7cm', marginTop: '0.5cm' }}>
            <div className="row member" style={{ padding: '0.2cm' }}>
              <div className="col-xl-4 col-md-6" style={{ backgroundColor: 'whitesmoke', borderRadius: '3px' }}>
                <h1 style={{ fontSize: '73px', fontFamily: 'cursive', textAlign: 'center' }}>
                  {statistics.totalUnlikes}
                </h1>
              </div>
              <div className="col-xl-7 col-md-6 statistic-info">
                <h5>Unlikes</h5>
                <p>Total unlikes on posts</p>
              </div>
            </div>
          </div>

          {statistics.postsByCategory.length > 0 &&
            statistics.postsByCategory.map((category, index) => (
              <div key={index} className="col-xl-4" data-aos="fade-up" data-aos-delay="100" style={{ paddingLeft: '0.7cm', marginTop: '0.5cm' }}>
                <div className="row member" style={{ padding: '0.2cm' }}>
                  <div className="col-xl-4 col-md-6" style={{ backgroundColor: 'whitesmoke', borderRadius: '3px' }}>
                    <h1 style={{ fontSize: '73px', fontFamily: 'cursive', textAlign: 'center' }}>
                      {category.count}
                    </h1>
                  </div>
                  <div className="col-xl-7 col-md-6 statistic-info">
                    <h5>{category.category || 'Uncategorized'}</h5>
                    <p>Posts in this category</p>
                  </div>
                </div>
              </div>
            ))}
        </div>
      )}
    </div>
  );
};

export default App;
