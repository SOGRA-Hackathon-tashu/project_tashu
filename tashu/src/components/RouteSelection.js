import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './../styles/RouteSelection.css';

const { kakao } = window;

function RouteSelection({ userInfo }) {
  const navigate = useNavigate();
  const [distance, setDistance] = useState(null);
  const [bikeTime, setBikeTime] = useState(null);
  const [routeDetails, setRouteDetails] = useState(null);

  const handleRouteSelect = () => {
    if (!userInfo) {
      alert("로그인이 필요합니다.");
      navigate('/login');
      return;
    }

    navigate('/route-details', { state: { routeDetails, bikeTime } });
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
        const path = [marker1.getPosition(), marker2.getPosition()];
        const polyline = new kakao.maps.Polyline({
          path: path,
          strokeWeight: 5,
          strokeColor: '#FFAE00',
          strokeOpacity: 0.7,
          strokeStyle: 'solid'
        });

        // 이전 라인 제거
        if (lineRef.current) {
          lineRef.current.setMap(null);
        }

        polyline.setMap(map);
        lineRef.current = polyline;

        // 거리 계산
        const linePath = polyline.getPath();
        const distance = Math.round(polyline.getLength()); // meter
        setDistance(distance);

        const bikeSpeed = 15 * 1000 / 60; // 15km/h in m/min
        const bikeTime = (distance / bikeSpeed).toFixed(2); // minutes

        // 분과 초로 변환
        const minutes = Math.floor(bikeTime);
        const seconds = Math.round((bikeTime - minutes) * 60);

        setBikeTime(`${minutes}분 ${seconds}초`);

        // 경로 정보를 저장
        const start = { lat: marker1.getPosition().getLat(), lng: marker1.getPosition().getLng() };
        const end = { lat: marker2.getPosition().getLat(), lng: marker2.getPosition().getLng() };
        setRouteDetails({ start, end });

        // 거리 오버레이 제거
        if (distanceOverlayRef.current) {
          distanceOverlayRef.current.setMap(null);
        }

        const content = `<div style="padding:5px;">거리: ${(distance / 1000).toFixed(2)} km</div>`;
        const distanceOverlay = new kakao.maps.CustomOverlay({
          content,
          position: marker2.getPosition(),
          xAnchor: 0.5,
          yAnchor: 0,
          zIndex: 3
        });

        distanceOverlay.setMap(map);
        distanceOverlayRef.current = distanceOverlay;
      }
    });
  }, []);

  return (
    <div className='route_selection_main'>
      <div>
        <h2>경로 선택</h2>
        <div id='map' style={{ width: '80%', height: '500px', margin: '0 auto 20px' }}>
          <div ref={mapRef} style={{ width: '100%', height: '400px' }}></div>
        </div>
        <div className='route_selection_button'>
          <button onClick={handleRouteSelect}>예상 소요 시간: {bikeTime ? bikeTime : '측정 중'}</button>
        </div>
      </div>
    </div>
  );
}

export default RouteSelection;
