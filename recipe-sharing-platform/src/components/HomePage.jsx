import React, { useState, useEffect } from 'react';

function HomePage() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch data from data.json
    fetch('/data.json')
      .then(response => response.json())
      .then(jsonData => {
        setData(jsonData);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="home-page">
      <h1>Welcome to our Application</h1>
      
      {/* Using map to render items */}
      <div className="data-list">
        {data.map((item) => (
          <div key={item.id} className="data-item">
            <h2>{item.title}</h2>
            <p>{item.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default HomePage;
