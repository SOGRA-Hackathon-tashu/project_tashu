import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { signupWithEmailAndPassword } from '../firebase';
import './../styles/Signup.css';


function Signup() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSignup = async () => {
    // 회원가입 로직 구현
    if (password !== confirmPassword) {
      alert("비밀번호가 일치하지 않습니다.");
      return;
    }

    try {
      await signupWithEmailAndPassword(email, password);
      alert('회원가입이 완료되었습니다.');
      navigate('/login');
    } catch (error) {
      alert(`회원가입 실패: ${error.message}`);
    }
  };

  return (
    <div className='signup_main'>
      <h2 className='signup_title'>회원가입</h2>
      <input 
        type="text" 
        placeholder="아이디" 
        value={email} 
        onChange={(e) => setEmail(e.target.value)}
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
