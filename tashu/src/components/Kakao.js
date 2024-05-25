import React, { useEffect } from 'react';

function Kakao() {
  useEffect(() => {
    // 카카오 맵 API 스크립트를 동적으로 로드
    const script = document.createElement('script');
    script.src = "https://dapi.kakao.com/v2/maps/sdk.js?appkey=a98a2a2695a6d056989ab23dc2fa364e&autoload=false";
    script.async = true;
    document.head.appendChild(script);

    script.onload = () => {
      console.log('Kakao Maps script loaded successfully');
      // 스크립트가 로드된 후에 Kakao 맵 초기화
      window.kakao.maps.load(() => {
        console.log('Kakao Maps API loaded successfully');
        const container = document.getElementById('map'); // 지도를 담을 영역의 DOM 레퍼런스
        const options = {
          center: new window.kakao.maps.LatLng(33.450701, 126.570667),
          level: 3
        };
        const map = new window.kakao.maps.Map(container, options);
        console.log('Map initialized successfully', map);
      });
    };

    script.onerror = () => {
      console.error('Failed to load the Kakao Maps script');
    };

    return () => {
      // 컴포넌트 언마운트 시 스크립트 제거
      document.head.removeChild(script);
    };
  }, []);

  return (
    <div id='map' style={{ width: '500px', height: '500px' }}></div>
  );
}

export default Kakao;
