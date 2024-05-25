import React, { useEffect, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { doc, updateDoc } from 'firebase/firestore';
import { db } from '../firebase';
import './../styles/RouteSelection.css';

const { kakao } = window;

function RouteSelection({ userInfo }) {
  const navigate = useNavigate();
  const location = useLocation();
  const target_point = location.state?.search;

  const handleRouteSelect = () => {
    const uid = userInfo.username;
    updateDoc(doc(db, "ride_info", uid), {
      start_time: 0 // 시간 정보 업데이트 필요
    });

    navigate('/route-details');
  };

  const mapRef = useRef(null);
  const markersRef = useRef([]);
  const lineRef = useRef(null);
  const distanceOverlayRef = useRef(null);

  useEffect(() => {
    const mapContainer = mapRef.current;
    const mapOption = {
      center: new kakao.maps.LatLng(36.37003, 127.34594),
      level: 3
    };

    const map = new kakao.maps.Map(mapContainer, mapOption);

    kakao.maps.event.addListener(map, 'click', async function(mouseEvent) {
      const clickPosition = mouseEvent.latLng;

      if (markersRef.current.length < 2) {
        const newMarker = new kakao.maps.Marker({
          position: clickPosition
        });

        newMarker.setMap(map);
        markersRef.current.push(newMarker);
      } else {
        markersRef.current[0].setMap(null);
        markersRef.current.shift();

        const newMarker = new kakao.maps.Marker({
          position: clickPosition
        });

        newMarker.setMap(map);
        markersRef.current.push(newMarker);
      }

      if (markersRef.current.length === 2) {
        const [marker1, marker2] = markersRef.current;
        const startLat = marker1.getPosition().getLat();
        const startLng = marker1.getPosition().getLng();
        const endLat = marker2.getPosition().getLat();
        const endLng = marker2.getPosition().getLng();
        const address = "https://apis-navi.kakaomobility.com/v1/directions"
        try {
          const response = await fetch(address + '?priority=RECOMMEND&car_type=1&car_fuel=GASOLINE&origin='+startLng+'%2C'+startLat+'&destination='+endLng+'%2C'+endLat, {
            method: 'GET',
            headers: {
              'Authorization': 'KakaoAK c98d24493fb530f60abd2d13aaf97c3b',
              'Content-Type': 'application/json'
            }
            // body: JSON.stringify({
            //   origin: { x: startLng, y: startLat },
            //   destination: { x: endLng, y: endLat },
            //   waypoints: []
            // })
          });

          if (!response.ok) {
            throw new Error('Network response was not ok');
          }

          const data = await response.json();
          const distance = data.routes[0]?.summary?.distance;

          if (distance === undefined) {
            throw new Error('Distance not found in response');
          }

          // 이전 라인 제거
          if (lineRef.current) {
            lineRef.current.setMap(null);
          }

          const polyline = new kakao.maps.Polyline({
            path: [marker1.getPosition(), marker2.getPosition()],
            strokeWeight: 5,
            strokeColor: '#FFAE00',
            strokeOpacity: 0.7,
            strokeStyle: 'solid'
          });

          polyline.setMap(map);
          lineRef.current = polyline;

          // 이전 거리 오버레이 제거
          if (distanceOverlayRef.current) {
            distanceOverlayRef.current.setMap(null);
          }

          const content = `<div style="padding:5px;">자동차 기준 거리: ${(distance / 1000).toFixed(2)} km</div>`;
          const distanceOverlay = new kakao.maps.CustomOverlay({
            content,
            position: marker2.getPosition(),
            xAnchor: 0.5,
            yAnchor: 0,
            zIndex: 3
          });

          distanceOverlay.setMap(map);
          distanceOverlayRef.current = distanceOverlay;
        } catch (error) {
          console.error('Error fetching distance:', error);
        }
      }
    });
  }, []);

  return (
    <div className='route_selection_main'>
      <div>
        <h2>경로 선택</h2>
        <div id='map' style={{ width: '500px', height: '500px' }}>
          <div ref={mapRef} style={{ width: '100%', height: '400px' }}></div>
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
