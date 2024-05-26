import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import './../styles/RouteDetails.css';

const { kakao } = window;

function RouteDetails() {
  const location = useLocation();
  const { routeDetails, bikeTime } = location.state || {};

  useEffect(() => {
    if (routeDetails) {
      const { start, end } = routeDetails;

      const mapContainer = document.getElementById('map'); // 지도를 담을 영역의 DOM 레퍼런스
      const mapOption = {
        center: new kakao.maps.LatLng(start.lat, start.lng), // 지도의 중심좌표
        level: 3 // 지도의 확대 레벨
      };

      const map = new kakao.maps.Map(mapContainer, mapOption); // 지도를 생성합니다

      const startMarker = new kakao.maps.Marker({
        position: new kakao.maps.LatLng(start.lat, start.lng),
        map: map
      });

      const endMarker = new kakao.maps.Marker({
        position: new kakao.maps.LatLng(end.lat, end.lng),
        map: map
      });

      const linePath = [
        new kakao.maps.LatLng(start.lat, start.lng),
        new kakao.maps.LatLng(end.lat, end.lng)
      ];

      const polyline = new kakao.maps.Polyline({
        path: linePath,
        strokeWeight: 5,
        strokeColor: '#FFAE00',
        strokeOpacity: 0.7,
        strokeStyle: 'solid'
      });

      polyline.setMap(map);
    }
  }, [routeDetails]);

  const navigate = useNavigate();

  const handleArrival = () => {

    navigate('/feedback');
  };

  return (
    <div className='route_detail_main'>
      <div>
        <h2>경로 상세</h2>
        <div>
          <p className='route_detail_time'>예상 소요 시간: {bikeTime}</p>
        </div>
        <div id='map' style={{ width: '100%', height: '400px' }}></div>
      </div>
      <button onClick={handleArrival} style={{
        padding: '10px 20px',
        fontSize: '1em',
        backgroundColor: '#4CAF50',
        color: 'white',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer',
        marginBottom: '20px',
      }}>
        도착
      </button>
    </div>
  );
}

export default RouteDetails;
