// 프론트엔드에서 외부로 요청하는 행위를 정의해둔 스크립트.
// 대부분은 백엔드가 완성되기 전까지 사용하는 임시 스크립트와 임시 백엔드 환경

import axios from "axios";
import { bigFilterOpts } from "@/assets/variables.js";

// API URL
const RESTAPIKEY = "df1fdc4c9b323f22174ff3481ee6a19c";

// ------------------------------

// Functions
export const GET = {
  place: async (body) => {
    // 요청할 데이터 준비
    let { x, y, dis, bigfilter, smallfilter } = body;
    if (bigfilter === "ANY") bigfilter = selectRandomBigFilterCode();

    const baseUrl = {
      keyword: "https://dapi.kakao.com/v2/local/search/keyword.json",
      category: "https://dapi.kakao.com/v2/local/search/category.json",
    };
    const url = smallfilter
      ? `${baseUrl.keyword}?x=${x}&y=${y}&radius=${dis}&category_group_code=${bigfilter}&query=${smallfilter}`
      : `${baseUrl.category}?x=${x}&y=${y}&radius=${dis}&category_group_code=${bigfilter}`;

    // 요청, 응답 수신
    const res = await axios.get(url, {
      headers: { Authorization: `KakaoAK ${RESTAPIKEY}` },
    });
    const docs = res.data.documents;
    console.log(url);
    console.log("docs", docs);
    // 수신된 응답에 대한 처리
    // --- 1. 결과가 없으면 null 리턴
    if (docs.length <= 0) return null;
    // --- 2. 결과가 있으면 랜덤 1개장소의 내용을 리턴
    const randIdx = randint(0, docs.length - 1);
    console.log(randIdx);
    const doc = docs[randIdx];
    return {
      place_name: doc.place_name,
      x: doc.x,
      y: doc.y,
      category: doc.category_name,
      addr: doc.road_address_name,
      phone: doc.phone,
      place_id: doc.id,
      url: doc.place_url,
      article_links: [],
    };
  },
};

const selectRandomBigFilterCode = () => {
  const min = 1;
  const max = bigFilterOpts.length - 1;

  const randIdx = randint(min, max);
  return bigFilterOpts[randIdx].code;
};

const randint = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

// ------------------------------

export const POST = {};

export const PUT = {};

export const DELETE = {};
