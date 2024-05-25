import React, { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { doc, updateDoc } from 'firebase/firestore';
import { db } from '../firebase';
import './../styles/RouteSelection.css';

function RouteSelection({ userInfo }) {
  const navigate = useNavigate();

  const location = useLocation();
  const target_point = location.state.search;
  
  const handleRouteSelect = () => {

    const uid = userInfo.username;
    updateDoc(doc(db, "ride_info", uid), {
      start_time: 0 // 시간 정보 업데이트 필요
    });

    navigate('/route-details');
  };

  return (
    <div className='route_selection_main'>
      <div>
        <h2>경로 선택</h2>
        <div>
          <img src="your_map_image_url" alt="Map" style={{ width: '100%' }} />
        </div>
        <div className='route_selection_button'>
          <button onClick={handleRouteSelect}>경로 1 - 예상 소요시간 3분</button>
          <button onClick={handleRouteSelect}>경로 2 - 예상 소요시간 5분</button>
          <button onClick={handleRouteSelect}>경로 3 - 예상 소요시간 5분</button>
        </div>
      </div>
    </div>
  );
}

export default RouteSelection;