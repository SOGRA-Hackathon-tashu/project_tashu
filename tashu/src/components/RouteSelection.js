import React, { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './../styles/RouteSelection.css';

function RouteSelection() {
  const navigate = useNavigate();

  const location = useLocation();
  const target_point = location.state.search;
  
  const handleRouteSelect = () => {
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