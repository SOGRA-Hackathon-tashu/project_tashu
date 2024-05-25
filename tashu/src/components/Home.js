import React from 'react';
import { useNavigate } from 'react-router-dom';

function Home({ isLoggedIn, setIsLoggedIn }) {
  const navigate = useNavigate();
  
  const handleSearch = () => {
    navigate('/routes');
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    navigate('/');
  };

  return (
    <div style={{ backgroundColor: '#ccff66', height: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
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
      <h1>타보슈</h1>
      <input type="text" placeholder="목적지를 검색하세요." />
      <button onClick={handleSearch}>검색</button>
    </div>
  );
}

export default Home;
