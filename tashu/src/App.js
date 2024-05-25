import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import RouteSelection from './components/RouteSelection';
import RouteDetails from './components/RouteDetails';
import Feedback from './components/Feedback';
import Login from './components/Login';
import Signup from './components/Signup';
import UserProfile from './components/UserProfile';
import { useState } from 'react';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userInfo, setUserInfo] = useState(null);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />} />
        <Route path="/routes" element={<RouteSelection userInfo={userInfo}/>} />
        <Route path="/route-details" element={<RouteDetails />} />
        <Route path="/feedback" element={<Feedback userInfo={userInfo}/>} />
        <Route path="/login" element={<Login setIsLoggedIn={setIsLoggedIn} setUserInfo={setUserInfo} />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/user-profile" element={<UserProfile userInfo={userInfo} />} />
      </Routes>
    </Router>
  );
}

export default App;
