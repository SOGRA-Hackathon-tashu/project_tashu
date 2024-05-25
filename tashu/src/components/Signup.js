import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

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
    <div style={{ backgroundColor: '#ccff66', height: '100vh', padding: '20px' }}>
      <h2>회원가입</h2>
      <input type="text" placeholder="아이디" value={username} onChange={(e) => setUsername(e.target.value)} />
      <input type="password" placeholder="비밀번호" value={password} onChange={(e) => setPassword(e.target.value)} />
      <input type="password" placeholder="비밀번호 확인" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
      <button onClick={handleSignup}>회원가입</button>
    </div>
  );
}

export default Signup;
