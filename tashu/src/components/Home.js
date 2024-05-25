import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { collection, getDocs, doc, setDoc, addDoc } from 'firebase/firestore';
import { db } from '../firebase';
import './../styles/Home.css';

function Home({ isLoggedIn, setIsLoggedIn }) {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = React.useState('');
  const [reviews, setReviews] = useState([]);

  const handleSearch = () => {
    // 검색어(searchQuery)가 비어있다면 전달 X
    if(!searchQuery) {
      return;
    }
    // 검색 버튼을 클릭할 때 검색어(searchQuery)를 routes 페이지로 전달합니다.
    navigate(`/routes`, {
      state: {
        search : `${searchQuery}`,
      }
    });
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
    <div className='home_main'>
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
      <h1 className='home_title'>타보슈</h1>
      <input 
        type="text" 
        placeholder="목적지를 검색하세요."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className='home_input'
      />
      <button 
        onClick={handleSearch}
        className='home_button'
      >검색</button>

      <div>
        {reviews.map((review) => (
          <div key={review.id} className="white-block">
            <h3>{review.review_str}</h3>
            <p>별점: {review.rating}</p>
            {/* 기타 리뷰 정보를 여기에 추가하세요 */}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Home;
