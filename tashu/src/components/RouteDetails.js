import React from 'react';
import { useNavigate } from 'react-router-dom';
import './RouteDetails.css';

function RouteDetails() {
  const navigate = useNavigate();
  
  const handleArrival = () => {
    navigate('/feedback');
  };

  return (
    <div className='route_detail_main'>
      <div>
        <h2>경로 상세</h2>
        <div>
          <img src="your_map_image_url" alt="Map" style={{ width: '100%' }} />
        </div>
        <div>
          <p className='route_detail_time'>예상 소요시간: 3분</p>
          <button onClick={handleArrival}>도착</button>
        </div>
      </div>
    </div>
  );
}

export default RouteDetails;
