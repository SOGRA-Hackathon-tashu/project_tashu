import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { collection, addDoc, doc, setDoc, getDoc } from 'firebase/firestore';
import { db } from '../firebase';

function Feedback({ userInfo }) {
  const navigate = useNavigate();
  const location = useLocation();
  const first_loc = location.state?.first_loc || 'Unknown Location';
  const [rating, setRating] = useState(0);
  const [review, setReview] = useState('');

  useEffect(() => {
    if (!userInfo) {
      alert('로그인이 필요합니다.');
      navigate('/login');
    }
  }, [userInfo, navigate]);

  const handleFeedback = async () => {
    if (!userInfo) {
      alert('로그인이 필요합니다.');
      return;
    }

    try {
      // 리뷰를 Firestore에 추가
      const reviewRef = await addDoc(collection(db, 'reviews'), {
        username: userInfo.username,
        first_loc: first_loc,
        last_loc: 'last_loc', // 도착지점 위치
        total_time: 'end_time - start_time', // 걸린시간
        rating: rating, // 별점
        review_str: review, // 리뷰
      });

      // 사용자 문서가 존재하는지 확인하고, 없으면 생성
      const userDocRef = doc(db, 'users', userInfo.username);
      const userDocSnapshot = await getDoc(userDocRef);

      if (userDocSnapshot.exists()) {
        await setDoc(userDocRef, {
          reviews: [reviewRef.id],
        }, { merge: true });
      } else {
        await setDoc(userDocRef, {
          reviews: [reviewRef.id],
        });
      }

      navigate('/');
    } catch (error) {
      alert(error.message);
    }
  };

  const handleRating = (star) => {
    setRating(star);
  };

  const handleReviewChange = (event) => {
    setReview(event.target.value);
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', backgroundColor: '#b7e676' }}>
      <div style={{ textAlign: 'center', backgroundColor: 'white', padding: '20px', borderRadius: '10px', boxShadow: '0 4px 8px rgba(0,0,0,0.2)', width: '90%', maxWidth: '600px' }}>
        <h2 style={{ fontSize: '24px', marginBottom: '20px' }}>주행 종료</h2>
        <div style={{ marginBottom: '20px' }}>
          <span style={{ fontSize: '18px', marginRight: '10px' }}>별점:</span>
          {[1, 2, 3, 4, 5].map(star => (
            <span
              key={star}
              onClick={() => handleRating(star)}
              style={{ cursor: 'pointer', color: rating >= star ? 'gold' : 'gray', fontSize: '24px' }}
            >
              ★
            </span>
          ))}
        </div>
        <div style={{ marginBottom: '20px' }}>
          <textarea
            placeholder="한줄 후기"
            rows="4"
            cols="50"
            value={review}
            onChange={handleReviewChange}
            style={{ width: '100%', padding: '10px', borderRadius: '5px', border: '1px solid #ccc' }}
          ></textarea>
        </div>
        <button
          onClick={handleFeedback}
          style={{ padding: '10px 20px', backgroundColor: '#4CAF50', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer', fontSize: '18px' }}
        >
          제출
        </button>
      </div>
    </div>
  );
}

export default Feedback;
