import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { signInWithFirebase } from '../firebase';

function Login({ setIsLoggedIn, setUserInfo }) {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleEmailChange = (e) => {
    // input 요소의 값이 변경될 때마다 setEmail을 통해 email 상태 업데이트
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    // input 요소의 값이 변경될 때마다 setPassword을 통해 password 상태 업데이트
    setPassword(e.target.value);
  };

  const handleLogin = async () => {
    // 이메일과 비밀번호 필드가 비어 있는지 확인
    if (!email.trim() || !password.trim()) {
      alert('이메일과 비밀번호를 입력해주세요.');
      return;
    }
    
    try {
      // 파이어베이스 auth를 이용하여 이메일과 비밀번호로 로그인 시도
      const userCredential = await signInWithFirebase(email.trim(), password.trim());
      // 로그인 성공 시 필요한 작업 수행
      const user = userCredential.user;
      setIsLoggedIn(true); // 로그인 상태 설정
      setUserInfo({ username: email }); // 사용자 정보 설정
      navigate('/'); // 홈페이지로 이동
    } catch (error) {
      // 로그인 실패 시 에러 메시지 처리
      alert(error.message);
      console.error('로그인 실패:', error.message);
      // 혹은 사용자에게 에러 메시지를 보여줄 수 있습니다.
    }
  };

  return (
    <div style={{ backgroundColor: '#ccff66', height: '100vh', padding: '20px' }}>
      <h2>로그인</h2>
      <input type="text" placeholder="아이디" value={email} onChange={handleEmailChange} />
      <input type="password" placeholder="비밀번호" value={password} onChange={handlePasswordChange} />
      <button onClick={handleLogin}>로그인하기</button>
      <button onClick={() => navigate('/signup')}>회원가입</button>
    </div>
  );
}

export default Login;
