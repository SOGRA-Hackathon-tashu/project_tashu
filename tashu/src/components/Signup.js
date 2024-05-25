import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './../styles/Signup.css';

function Signup() {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSignup = () => {
    // 회원가입 로직 구현
    navigate('/login');
  };

  return (
    <div className='signup_main'>
      <h2 className='signup_title'>회원가입</h2>
      <input 
        type="text" 
        placeholder="아이디" 
        value={username} 
        onChange={(e) => setUsername(e.target.value)} 
        className='signup_input'
      />
      <input 
        type="password" 
        placeholder="비밀번호" 
        value={password} 
        onChange={(e) => setPassword(e.target.value)} 
        className='signup_input'
      />
      <input 
        type="password" 
        placeholder="비밀번호 확인" 
        value={confirmPassword} 
        onChange={(e) => setConfirmPassword(e.target.value)}
        className='signup_input' 
      />
      <button 
        onClick={handleSignup}
        className='button'
      >회원가입</button>
    </div>
  );
}

export default Signup;
