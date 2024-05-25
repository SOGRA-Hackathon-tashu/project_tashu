import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Login({ setIsLoggedIn, setUserInfo }) {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    // 로그인 로직 구현
    setIsLoggedIn(true);
    setUserInfo({ username });
    navigate('/');
  };

  return (
    <div style={{ backgroundColor: '#ccff66', height: '100vh', padding: '20px' }}>
      <h2>로그인</h2>
      <input type="text" placeholder="아이디" value={username} onChange={(e) => setUsername(e.target.value)} />
      <input type="password" placeholder="비밀번호" value={password} onChange={(e) => setPassword(e.target.value)} />
      <button onClick={handleLogin}>로그인하기</button>
      <button onClick={() => navigate('/signup')}>회원가입</button>
    </div>
  );
}

export default Login;
