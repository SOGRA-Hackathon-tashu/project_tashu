import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebase';

function Home({ isLoggedIn, setIsLoggedIn }) {
  const navigate = useNavigate();
  const [reviews, setReviews] = useState([]);

  const handleSearch = () => {
    navigate(`/routes`);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    navigate('/');
  };

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const reviewDocs = [];
        const querySnapshot = await getDocs(collection(db, 'review'));
        querySnapshot.forEach((doc) => {
          const reviewData = doc.data();
          reviewDocs.push({ id: doc.id, ...reviewData });
        });
        setReviews(reviewDocs);
      } catch (error) {
        console.error('Error fetching reviews:', error);
      }
    };

    fetchReviews();
  }, []);

  return (
    <div className='home_main' style={{ textAlign: 'center', padding: '20px', backgroundColor: '#DFFF80', minHeight: '100vh' }}>
      <div style={{ position: 'absolute', top: 10, right: 10 }}>
        {isLoggedIn ? (
          <>
            <button onClick={() => navigate('/user-profile')}>사용자 정보</button>
            <button onClick={handleLogout}>로그아웃</button>
          </>
        ) : (
          <button onClick={() => navigate('/login')}>로그인</button>
        )}
      </div>
      <h1 className='home_title' style={{ fontSize: '2.5em', margin: '20px 0' }}>타보슈</h1>
      <button
        onClick={handleSearch}
        style={{
          padding: '10px 20px',
          fontSize: '1em',
          backgroundColor: '#4CAF50',
          color: 'white',
          border: 'none',
          borderRadius: '5px',
          cursor: 'pointer',
          marginBottom: '20px',
        }}
      >
        경로 검색
      </button>

      <div>
        {reviews.map((review) => (
          <div
            key={review.id}
            style={{
              backgroundColor: 'white',
              padding: '20px',
              margin: '10px auto',
              borderRadius: '10px',
              boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
              width: '80%',
              maxWidth: '500px',
            }}
          >
            <h3 style={{ margin: '0 0 10px 0' }}>{review.review_str}</h3>
            <p style={{ margin: '0' }}>별점: {review.rating}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Home;
