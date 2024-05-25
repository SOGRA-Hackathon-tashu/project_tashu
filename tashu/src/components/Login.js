import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css';

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
    <div className='login_main'>
      <h2 className='login_title'>로그인</h2>
      <input 
        type="text" 
        placeholder="아이디" 
        value={username} 
        onChange={(e) => setUsername(e.target.value)} 
        className='login_input'
      />
      <input 
        type="password" 
        placeholder="비밀번호" 
        value={password} 
        onChange={(e) => setPassword(e.target.value)} 
        className='login_input'
      />
      <button 
        onClick={handleLogin}
        className='button'
      >로그인하기</button>
      <button 
        onClick={() => navigate('/signup')}
        className='button'
      >회원가입</button>
    </div>
  );
}

export default Login;
