import React from 'react';

function UserProfile({ userInfo }) {
  return (
    <div style={{ backgroundColor: '#ccff66', height: '100vh', padding: '20px' }}>
      <h2>사용자 정보</h2>
      <div>
        <p>아이디: {userInfo.username}</p>
        {/* 과거 이용 기록 및 리뷰를 여기에 표시 */}
      </div>
    </div>
  );
}

export default UserProfile;
