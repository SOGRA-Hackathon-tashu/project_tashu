import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './../styles/Feedback.css';
import { collection, getDocs, doc, setDoc, addDoc } from 'firebase/firestore';
import { db } from '../firebase'

function Feedback({ userInfo }) {
  const navigate = useNavigate();

  const first_loc = useLocation().state.first_loc;
  let start_time = 1;
  const [rating, setRating] = useState('');
  const [review, setReview] = useState('');

  const handleFeedback = async () => {
    try {
      
      // const start_time = 1;

      const querySnapshot = await getDocs(collection(db, 'ride_info'));
      querySnapshot.forEach((doc) => {
        if(doc.id == userInfo.username) {
          start_time = doc.data().start_time;
        }
      });

      await addDoc(collection(db, "review"), {
        first_loc: first_loc,
        last_loc: "last_loc",  // 도착지점 위치
        total_time: "end_time - start_time", // 걸린시간
        rating: rating, // 별점
        review_str: review  // 리뷰
      });

      navigate('/')
    } catch (error) {
      // alert(userInfo);
      alert(error.message);
    }
  };

  const handleRating = async (star) => {
    setRating(star);
  };

  const handleReviewChange = (event) => {
    setReview(event.target.value);
  }

  return (
    <div className='feedback_main'>
      <h2>주행 종료</h2>
      <div>
      <span>별점:</span>
        {[1, 2, 3, 4, 5].map(star => (
          <span 
            key={star} 
            onClick={() => handleRating(star)} 
            style={{ cursor: 'pointer', color: rating >= star ? 'gold' : 'gray' }}
          >
            ★
          </span>
        ))}

      </div>
      <div>
        <textarea 
        placeholder="한줄 후기"
        rows="4" 
        cols="50"
        value={review}
        onChange={handleReviewChange}
        ></textarea>
      </div>
      <button
        onClick={handleFeedback}
        className='button'
      >제출</button>
    </div>
  );
}

export default Feedback;
