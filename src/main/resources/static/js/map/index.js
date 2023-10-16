let map;
let panorama;
let markers = [];

function initialize() {
  /*  // 대한민국의 위도 범위 (33.0 ~ 38.6)
    const randomLatitude = getRandomCoordinate(33.0, 38.6);

    // 대한민국의 경도 범위 (124.6 ~ 131.9)
    const randomLongitude = getRandomCoordinate(124.6, 131.9);*/

    const location = { lat: 37.5665, lng: 126.9780 };

    map = new google.maps.Map(document.getElementById("map"), {
        center: location,
        zoom: 10,
    });

    panorama = new google.maps.StreetViewPanorama(
        document.getElementById("pano"),
        {
            position: location,
            pov: {
                heading: 34,
                pitch: 10,
            },
        }
    );
    setRandomPosition();
   // map.setStreetView(panorama);
   // 클릭한 위치에 마커를 추가하는 이벤트 리스너 등록
   google.maps.event.addListener(map, 'click', function(event) {
       if(markers.length > 0) {
            clearMarkers();
       }
       addMarker(event.latLng, map, 'red');
       // 정답 맞추기
       if(confirm("결과 확인하기")) {
            addMarker(panorama.getPosition(), map, 'blue');
            alert("ㅎㅎㅎ");
       } else {
            alert("fff");
       }
   });
}

window.initialize = initialize;


function shuffleArray(array) {
    return array.sort(() => Math.random() - 0.5);
}

function setRandomPosition() {

    //var queryValList = ['돈가스', '감자탕', '중국집', '편의점','피자', '파스타', '스테이크', '초밥', '떡볶이', '치킨', '햄버거', '짜장면', '짬뽕', '뷔페', '샐러드', '샌드위치', '카레', '타코', '삼겹살', '냉면', '갈비', '케이크', '아이스크림', '떡' ];
    var seoulCulturalHeritages = [
        "창덕궁", "경복궁", "덕수궁", "창경궁", "서울타워",
        "남산서울타워", "북한산성", "청계천", "동대문 디자인 플라자", "청와대",
        "국립중앙박물관", "국립고궁박물관", "덕성여자대학교", "서울시립미술관", "서울역",
        "롯데월드타워", "동대문역사문화공원", "한강", "남산서울타워", "서울숲",
        "북촌한옥마을", "남대문시장", "명동", "인사동", "삼청동",
        "한양도성", "서대문형무소역사관", "국립한글박물관", "서울로7017", "삼성동 코엑스",
        "반포한강공원", "경리단길", "홍대입구", "이태원", "동대문디자인플라자",
        "롯데월드몰", "서울올림픽공원", "한림공원", "서울랜드", "서울대학교",
        "서울시립대학교", "한국외국어대학교", "성균관대학교", "연세대학교", "고려대학교",
        "서강대학교", "이화여자대학교", "홍익대학교", "중앙대학교", "서울과학기술대학교",
        "한국과학기술원", "서울여자대학교", "가톨릭대학교", "이화여자대학교", "동국대학교"
    ];

    var randomQueryVal = shuffleArray(seoulCulturalHeritages);

    var request = {
        query: randomQueryVal[0],
        fields: ['name', 'geometry'], // 검색 결과에서 'name'과 'geometry' 정보를 가져옴
        locationBias: {
                center: { lat: 37.5665, lng: 126.9780 }, // 서울의 좌표
                radius: 20000 // 반경 5000m 내에서 검색
        }
    };

    var service = new google.maps.places.PlacesService(map);

    service.findPlaceFromQuery(request, function(results, status) {
        console.log(results);
        if (status === google.maps.places.PlacesServiceStatus.OK) {
            let locationParam = results[0].geometry.location;
            getPanoramaLocation(locationParam);
        } else {
            getPanoramaLocation(null);
        }
    });
}

function getPanoramaLocation(locationParam) {
    if (locationParam) {
        panorama.setPosition(locationParam);
    } else {
        console.log('결과 없음');
    }
}

function getRandomCoordinate(min, max) {
    return Math.random() * (max - min) + min;
}


// 클릭한 위치에 마커를 추가하는 함수
function addMarker(location, map, color) {
   var markerIconUrl = 'http://maps.google.com/mapfiles/ms/icons/' + color + '-dot.png';
   var marker = new google.maps.Marker({
       position: location,
       map: map,
       icon : markerIconUrl
   });
   markers.push(marker);
}
// 마커 초기화 하기
function clearMarkers() {
    for (let i =0; i < markers.length; i++ ) {
        markers[i].setMap(null);
    }
}

// 결과 확인하기
function getResult() {

}