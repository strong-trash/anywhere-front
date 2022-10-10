// API URL
const apiRequestURL = {
  placeByUserinput: "https://something.com/masil",
};

// MasilPage.vue - select의 옵션
const bigFilterOpts = [
  { name: "어디로든", code: "ANY" },
  { name: "음식점", code: "FD6" },
  { name: "카페", code: "CE7" },
  { name: "문화시설", code: "CT1" },
  { name: "관광명소", code: "AT4" },
  { name: "편의점", code: "CS2" },
  { name: "대형마트", code: "MT1" },
];

const smallFilterOpts = {
  FD6: ["어디로든", "한식", "양식", "중식", "일식", "분식", "아시아음식", "직접입력"], // 음식점
  CE7: ["어디로든", "직접입력"], // 카페
  CT1: ["어디로든", "공원", "영화관", "극장", "직접입력"], // 문화시설
  AT4: ["어디로든", "직접입력"], // 관광명소
  CS2: ["어디로든", "직접입력"], // 편의점
  MT1: ["어디로든", "직접입력"], // 대형마트
  ANY: ["어디로든", "직접입력"], // 어디로든
};

// MasilPage.vue - selectRadius에서 그릴 도형의 모양새 설정값
const drawingOptions = {
  line: {
    strokeWeight: 3, // 선의 두께입니다
    strokeColor: "#845ec2", // 선의 색깔입니다
    strokeOpacity: 1, // 선의 불투명도입니다 0에서 1 사이값이며 0에 가까울수록 투명합니다
    strokeStyle: "solid", // 선의 스타일입니다
  },
  pickingCircle: {
    // 마우스를 움직여 고르고 있는 반경
    strokeWeight: 1, // 선의 두께입니다
    strokeColor: "#845ec2", // 선의 색깔입니다
    strokeOpacity: 0.1, // 선의 불투명도입니다 0에서 1 사이값이며 0에 가까울수록 투명합니다
    strokeStyle: "solid", // 선의 스타일입니다
    fillColor: "#845ec2", // 채우기 색깔입니다
    fillOpacity: 0.4, // 채우기 불투명도입니다
  },
  savedCircle: {
    // 클릭 또는 터치로 저장한 반경
    strokeWeight: 3, // 선의 두께입니다
    strokeColor: "#845ec2", // 선의 색깔입니다
    strokeOpacity: 0.9, // 선의 불투명도입니다 0에서 1 사이값이며 0에 가까울수록 투명합니다
    strokeStyle: "solid", // 선의 스타일입니다
    fillColor: "#845ec2", // 채우기 색깔입니다
    fillOpacity: 0.2, // 채우기 불투명도입니다
  },
  overlay: {
    xAnchor: 0,
    yAnchor: 0,
    zIndex: 1,
  },
};

module.exports = {
  bigFilterOpts,
  smallFilterOpts,
  drawingOptions,
  apiRequestURL,
};
