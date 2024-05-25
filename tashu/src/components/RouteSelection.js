import React from 'react';
import { useNavigate } from 'react-router-dom';

function RouteSelection() {
  const navigate = useNavigate();
  
  const handleRouteSelect = () => {
    navigate('/route-details');
  };

  return (
    <div style={{ backgroundColor: '#ccff66', height: '100vh', padding: '20px' }}>
      <div>
        <h2>경로 선택</h2>
        <div>
          <img src="your_map_image_url" alt="Map" style={{ width: '100%' }} />
        </div>
        <div>
          <button onClick={handleRouteSelect}>경로 1 - 예상 소요시간 3분</button>
          <button onClick={handleRouteSelect}>경로 2 - 예상 소요시간 5분</button>
          <button onClick={handleRouteSelect}>경로 3 - 예상 소요시간 5분</button>
        </div>
      </div>
    </div>
  );
}

export default RouteSelection;
