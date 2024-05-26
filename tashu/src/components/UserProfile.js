import React, { useEffect, useState } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebase';

function UserProfile({ userInfo }) {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    const fetchReviews = async () => {
      if (!userInfo) {
        return;
      }

      const reviewsSnapshot = await getDocs(collection(db, `users/${userInfo.username}/reviews`));
      const reviewsData = reviewsSnapshot.docs.map(doc => doc.data());
      setReviews(reviewsData);
    };

    fetchReviews();
  }, [userInfo]);

  if (!userInfo) {
    return <div>로그인이 필요합니다.</div>;
  }

  return (
    <div className='userprofile_main'>
      <h2>사용자 정보</h2>
      <div>
        <p>아이디: {userInfo.username}</p>
        {/* 과거 이용 기록 및 리뷰를 여기에 표시 */}
        {reviews.length > 0 ? (
          <ul>
            {reviews.map((review, index) => (
              <li key={index}>
                <p>출발지: {review.first_loc}</p>
                <p>도착지: {review.last_loc}</p>
                <p>걸린 시간: {review.total_time}</p>
                <p>별점: {review.rating}</p>
                <p>후기: {review.review_str}</p>
              </li>
            ))}
          </ul>
        ) : (
          <p>리뷰가 없습니다.</p>
        )}
      </div>
    </div>
  );
}

export default UserProfile;
