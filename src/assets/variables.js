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

module.exports = {
  bigFilterOpts,
  smallFilterOpts,
};
