import React from 'react';
import { useNavigate } from 'react-router-dom';
import './../styles/Home.css';

function Home({ isLoggedIn, setIsLoggedIn }) {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = React.useState('');

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
    </div>
  );
}

export default Home;
