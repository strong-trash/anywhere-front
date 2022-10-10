<template>
  <div id="masil-maps">
    <div id="map"></div>
    <div id="floatmenu-container">
      <div>
        <div class="select-boxes">
          <v-select
            :placeholder="`큰 분류`"
            :options="bigFilters"
            label="name"
            v-model="userSelectedBigFilter"
            :clearable="false"
            v-on:input="clearSmallFilter"
          ></v-select>
          <div :class="{ 'disabled-vs': !userSelectedBigFilter }">
            <v-select
              :placeholder="`작은 분류`"
              :options="smallFilters"
              v-model="userSelectedSmallFilter"
              :clearable="false"
              :disabled="!userSelectedBigFilter"
            ></v-select>
          </div>
        </div>
        <input
          class="free-response"
          type="text"
          placeholder="어디로 갈까요?"
          v-model="userSelectedFreeResponse"
          v-show="userSelectedSmallFilter === `직접입력`"
        />
      </div>

      <div class="btns" style="display: flex">
        <button class="rounded-btn" @mousedown="startSelectingPoint" type="button">
          <img :src="img.marker" alt="select departure point" />
          위치 선택
        </button>
        <button
          class="rounded-btn"
          @mousedown="startSelectingDistance"
          :disabled="!userSelectedPointCoord"
        >
          <img :src="img.area" alt="set radius" style="width: 28px; height: 28px" />
          거리 선택
        </button>
        <button
          id="submit-plan-btn"
          class="rounded-btn"
          :disabled="!userSelectedDistance || !userSelectedSmallFilter"
          @mousedown="requestPlace"
        >
          <img :src="img.airplane" alt="submit user plan, request place to server" />
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import markerPurpleImg from "@/assets/marker_purple.png";
import markerPinkImg from "@/assets/marker_pink.png";
import markerImg from "@/assets/marker.png";
import airplaneImg from "@/assets/airplane_white.png";
import areaImg from "@/assets/area.png";
import { bigFilterOpts, smallFilterOpts, drawingOptions } from "@/assets/variables.js";

const drawing = {
  line: null, // 거리를 선으로 표시
  circle: null, // 거리를 반경으로 하는 원 표시
  overlay: null, // 거리를 숫자로 표시
};
const markers = {
  userSelectedPoint: null,

  suggestedPlace: null,
  suggestedPlaceOverlay: null, // 사suggestedPlace마커에 대해 장소 이름 표시.
};

const ACTION = {
  NONE: "none",
  POINT: "selectPoint",
  DISTANCE: "selectDistance",
};
const MARKER_TYPE = {
  PURPLE: markerPurpleImg,
  PINK: markerPinkImg,
};

export default {
  props: ["suggestion"], // suggestion = { x:number, y:number, place_name:string }
  watch: {
    suggestion: function () {
      this.showSuggestedPlace();
    },
  },
  data: function () {
    return {
      map: null,

      currentAction: ACTION.NONE, // 어떤 작업을 하고있는지 표시 : ACTION={}상수에 정의된 값이 들어갈 수 있음.

      userSelectedBigFilter: null,
      userSelectedSmallFilter: null,
      userSelectedPointCoord: null,
      userSelectedFreeResponse: null,
      userSelectedDistance: null,

      bigFilters: bigFilterOpts,

      img: {
        marker: markerImg,
        airplane: airplaneImg,
        area: areaImg,
      },
    };
  },
  computed: {
    smallFilters: function () {
      if (this.userSelectedBigFilter) {
        const code = this.userSelectedBigFilter.code;
        return smallFilterOpts[code];
      } else {
        return [];
      }
    },
  },
  async mounted() {
    if (!this.map) {
      const SJU_COORD = { lat: 37.5507377, lng: 127.0742838 }; // 세종대학교 위경도좌표
      const center = await getMapCenter({ defaultLat: SJU_COORD.lat, defaultLng: SJU_COORD.lng });

      var container = document.getElementById("map");
      var options = {
        center: new window.kakao.maps.LatLng(center.lat, center.lng),
        level: 3,
      };
      this.map = new window.kakao.maps.Map(container, options);
    }
  },
  methods: {
    // --------------------------------------------------------------------------
    clearSmallFilter: function () {
      this.userSelectedSmallFilter = null;
    },
    setCurrentAction: function (val) {
      ACTION.NONE === val && console.error(`[setCurrentAction] unsetCurrentAction()을 사용하세요.`);
      Object.values(ACTION).includes(val)
        ? (this.currentAction = val)
        : console.error(`[setCurrentAction] ${val}은 ACTION에 정의된 키값이 아닙니다.`);
    },
    unsetCurrentAction: function () {
      this.currentAction = ACTION.NONE;
    },
    showMessageCard: function (msg) {
      this.$emit("showMsgCard", msg);
    },
    hideMessageCard: function () {
      this.$emit("hideMsgCard");
    },
    // --------------------------------------------------------------------------
    startSelectingPoint: function () {
      /*
      새로운 검색 기준점(userSelectedPointCoord)을 결정하기 위한 절차의 진입점
        - 역할1 : currentAction에 따라 적절한 사전작업 수행
        - 역할2 : 검색 기준점을 새로 결정하기 위한 사전 클리닝 작업 수행
        - 역할3 : 검색 기준점을 입력받는 이벤트 리스너 등록
      */
      const vm = this;

      // currentAction 판별 및 전환
      if (vm.currentAction === ACTION.POINT) return; // 이미 마커 위치를 고르고 있다면 함수종료
      vm.unselectDistance();

      vm.setCurrentAction(ACTION.POINT);

      // 초기화
      if (vm.userSelectedPointCoord) {
        // 기존에 지정된 검색 기준점이 있으면 초기화
        markers.userSelectedPoint.setMap(null);
        markers.userSelectedPoint = null;
        vm.userSelectedPointCoord = null;
      }
      vm.map.setCursor("crosshair"); // 마우스커서 십자선(+)으로 표시
      window.kakao.maps.event.addListener(vm.map, "click", vm.selectPoint); // 클릭 리스너

      // 사용자에게 안내 메시지 표시
      vm.showMessageCard("출발할 위치를 클릭해 골라주세요");
    },
    //
    selectPoint: function (event) {
      /*
      카카오지도에 사용자 입력을 받아 검색 기준점을 정함 ( startSelectingPoint()에서 핸들러로 등록됨 )
        - 역할1 : 컴포넌트 상태 <userSelectedPointCoord> 갱신
        - 역할2 : 카카오지도에 마커 생성, 전역상수 <markers.userSelectedPoint>에 마커객체 저장
      */
      const vm = this;

      // 이 메소드의 이벤트리스너 삭제
      window.kakao.maps.event.removeListener(vm.map, "click", vm.selectPoint);

      // 사용자가 클릭한 위치가 falsy값이면 리턴, 아니면 계속진행
      const latlng = event.latLng;
      if (!latlng) return;
      else vm.userSelectedPointCoord = latlng;

      // 마커 생성하고 지도에 표시
      markers.userSelectedPoint = addNewMarker({
        map: vm.map,
        latlng: latlng,
        markerType: MARKER_TYPE.PURPLE,
      });

      // 마무리
      vm.map.panTo(latlng); // 지도 중심을 마커 좌표로 옮기기
      vm.map.setCursor("grab"); // 마우스커서 손 모양으로 표시
      vm.hideMessageCard();
      vm.unsetCurrentAction();
    },
    // --------------------------------------------------------------------------
    startSelectingDistance: function () {
      /*
      새로운 검색 거리<userSelectedDistance>를 결정하기 위한 절차의 진입점
      */
      const vm = this;

      if (vm.currentAction === ACTION.DISTANCE) return; // 이미 거리를 고르고 있다면 함수 종료
      vm.unselectDistance();
      vm.setCurrentAction(ACTION.DISTANCE);

      // 새로운 line, pickingCircle, pickingOverlay 생성
      drawing.line = new window.kakao.maps.Polyline(drawingOptions.line);
      drawing.circle = new window.kakao.maps.Circle(drawingOptions.pickingCircle);
      drawing.overlay = new window.kakao.maps.CustomOverlay(drawingOptions.overlay);

      window.kakao.maps.event.addListener(vm.map, "mousemove", vm.previewDistance); // 거리 재기
      window.kakao.maps.event.addListener(vm.map, "click", vm.selectDistance); // 거리 저장

      vm.showMessageCard("어디까지 갈 수 있는지 클릭해 알려주세요");
    },
    //
    previewDistance: function (mouseEvent) {
      const vm = this;

      const { line, circle, overlay } = drawing;
      const from = vm.userSelectedPointCoord;
      const to = mouseEvent.latLng;

      // line 표시
      line.setPath([from, to]);
      line.setMap(vm.map);

      // circle 표시
      circle.setOptions({
        center: from,
        radius: line.getLength() > 2000 ? 2000 : line.getLength(),
      });
      circle.setMap(vm.map);

      // overlay 표시
      const radius = Math.round(circle.getRadius());
      overlay.setPosition(to);
      overlay.setContent(
        /* html */
        `<div style="padding : 2px; background-color : white; border-radius : 4px; transform:translateX(10px);">
          거리 <span style="color : #845ec2; font-weight : bold;">${radius}</span>m
        </div>`
      );
      overlay.setMap(vm.map);
    },
    //
    selectDistance: function (event) {
      const vm = this;

      const { line, circle, overlay } = drawing;
      const from = vm.userSelectedPointCoord;
      const to = event.latLng;

      // line 길이 취득
      line.setPath([from, to]);
      const len = line.getLength() > 2000 ? 2000 : line.getLength();
      vm.userSelectedDistance = Math.round(len);

      // line 삭제
      line.setMap(null);
      drawing.line = null;

      // circle 표시
      circle.setOptions({
        center: from,
        radius: len,
        ...drawingOptions.savedCircle,
      });
      circle.setMap(vm.map);

      // overlay 표시
      overlay.setPosition(from);
      overlay.setContent(
        /* html */
        `<div style="padding : 4px; background-color : white; border-radius : 16px; transform:translate(-50%, 10px);">
          선택된 거리<span style="color : #845ec2; font-weight : bold;"> ${vm.userSelectedDistance} </span>m
        </div>`
      );
      overlay.setMap(vm.map);

      // 마무리
      window.kakao.maps.event.removeListener(vm.map, "mousemove", vm.previewDistance);
      window.kakao.maps.event.removeListener(vm.map, "click", vm.selectDistance);
      vm.hideMessageCard();
      vm.unsetCurrentAction();
    },
    //
    unselectDistance: function () {
      const vm = this;

      vm.userSelectedDistance = null;
      drawing &&
        Object.keys(drawing).forEach((key) => {
          if (drawing[key]) {
            drawing[key].setMap(null);
            drawing[key] = null;
          }
        });

      window.kakao.maps.event.removeListener(vm.map, "mousemove", vm.drawPickingCircle); // 거리 재기
      window.kakao.maps.event.removeListener(vm.map, "click", vm.drawSavedCircle); // 거리 저장
      vm.hideMessageCard();
      vm.unsetCurrentAction();
    },
    // --------------------------------------------------------------------------
    requestPlace: function () {
      /*
      사용자가 선택한 데이터를 request body(json)으로 변환
      body를 부모에 넘겨 http요청하도록 함
      */
      const vm = this;
      vm.$emit("requestPlace", vm.buildReqBody());
    },
    //
    buildReqBody: function () {
      const vm = this;
      const params = {
        x: vm.userSelectedPointCoord.getLat(), // 경도
        y: vm.userSelectedPointCoord.getLng(), // 위도
        dis: vm.userSelectedDistance,
        bigfilter: vm.userSelectedBigFilter.code,
        smallfilter: null,
      };

      // smallfilter값 결정
      const sf = vm.userSelectedSmallFilter;
      if (sf !== "어디로든") {
        if (sf === "직접입력") params.smallfilter = vm.freeResponse ? vm.freeResponse : null;
        else params.smallfilter = vm.userSelectedSmallFilter;
      }

      return JSON.stringify(params);
    },
    // --------------------------------------------------------------------------
    showSuggestedPlace: function () {
      /*
      MasilPage.vue (부모)에서 내려준 suggestion정보를 지도에 마커로 표시
      */
      const vm = this;

      // 추천장소가 이미 상태에 존재하면 삭제
      markers.suggestedPlace && markers.suggestedPlace.setMap(null);
      markers.suggestedPlaceOverlay && markers.suggestedPlaceOverlay.setMap(null);
      markers.suggestedPlace = null;
      markers.suggestedPlaceOverlay = null;

      const { x, y, place_name } = vm.suggestion;
      const latlng = new window.kakao.maps.LatLng(x, y);

      // 마커 표시
      markers.suggestedPlace = addNewMarker({
        map: vm.map,
        latlng: latlng,
        markerType: MARKER_TYPE.PINK,
      });
      markers.suggestedPlace.setMap(vm.map);

      // 오버레이(장소 이름) 표시
      markers.suggestedPlaceOverlay = new window.kakao.maps.CustomOverlay({
        position: latlng,
        content:
          `<div style="padding:4px; background-color : rgb(255,111,142); border-radius : 16px; transform:translateY(-88px); text-align:center; font-size:16px; color : white;">` +
          place_name +
          `</div>`,
      });
      markers.suggestedPlaceOverlay.setMap(vm.map);

      // 지도 중심 마커로 이동
      vm.map.panTo(latlng);
    },
  },
};

function getUserPos() {
  return new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(resolve, reject);
  });
}

async function getMapCenter({ defaultLat, defaultLng }) {
  const center = { lat: 0, lng: 0 };
  try {
    if ("geolocation" in navigator) {
      const pos = await getUserPos();
      center.lat = pos.coords.latitude;
      center.lng = pos.coords.longitude;
    } else {
      center.lat = defaultLat;
      center.lng = defaultLng;
    }
  } catch (err) {
    center.lat = defaultLat;
    center.lng = defaultLng;
  }

  return center;
}

function addNewMarker({ map, latlng, markerType }) {
  const markerSize = 64; // 64px

  // 새로운 마커 생성
  const newMarker = new window.kakao.maps.Marker({
    position: latlng,
    image: new window.kakao.maps.MarkerImage(
      markerType,
      new window.kakao.maps.Size(markerSize, markerSize),
      { offset: new window.kakao.maps.Point(markerSize / 2, markerSize) }
    ),
  });

  // 지도에 추가
  newMarker.setMap(map);

  return newMarker;
}
</script>

<style lang="scss">
#masil-maps {
  width: 100%;
  height: 100%;

  #map {
    width: 100%;
    height: 100%;
  }

  #floatmenu-container {
    position: fixed;
    top: $header-height;
    left: 0px;
    z-index: 998;

    display: flex;
    flex-direction: column;
    padding: 8px;
    margin: 16px;
    background-color: rgba(255, 255, 255, 0.7);
    border-radius: 16px;

    .select-boxes {
      display: flex;
    }
    .v-select {
      z-index: 998;
      margin-right: 8px;
      min-width: 140px;
      --vs-dropdown-min-width: 140px;
      // in @/assets/variables.scss
      // $c-highlight-bg: #845ec2;
      // $c-highlight-text: #fbeaff;
      --vs-dropdown-option--active-bg: #845ec2;
      --vs-dropdown-option--active-color: #fbeaff;
      --vs-search-input-placeholder-color: grey;
      --vs-border-radius: 16px;
      --vs-font-size: 14px;
      --vs-line-height: 24px;
      --vs-transition-duration: 100ms;
      transition: all 0.2s;
    }
    .v-select:hover {
      transform: scale(1.05);
    }
    .disabled-vs {
      filter: brightness(70%);
    }

    .free-response {
      width: calc(100% - 8px);
      height: 36px;

      padding: 8px;
      margin-top: 8px;

      border-radius: 16px;
      border: 1px solid rgba(60, 60, 60, 0.26);
      font-size: 14px;
      transition: all 0.2s;
    }
    .free-response:focus {
      outline: none;
      transform: scale(1.05);
    }
    .free-response:hover {
      transform: scale(1.05);
    }
  }

  .rounded-btn {
    display: flex;
    justify-content: center;
    align-items: center;

    // width: 36px;
    height: 36px;
    margin-right: 8px;
    margin-top: 8px;

    background-color: white;
    // border-radius: 50%;
    border-radius: 16px;
    border: 1px solid rgba(60, 60, 60, 0.26);
    cursor: pointer;
    transition: all 0.2s;
    img {
      width: 22px;
      height: 22px;
      filter: opacity(0.8);
    }
  }
  .rounded-btn:hover {
    transform: scale(1.1);
  }
  .rounded-btn:active {
    transform: scale(0.9);
  }
  .rounded-btn:disabled {
    cursor: not-allowed;
    filter: brightness(70%);
  }

  #submit-plan-btn {
    background-color: $c-highlight-bg;
    color: $c-highlight-text;
    margin-left: auto;
    img {
      transform: translateX(-1px);
    }
  }

  @media (max-width: 768px) {
    #floatmenu-container {
      width: 100vw;
      margin: 0;
      align-items: center;
      font-size: 14px;
      background: none;
      border-radius: 0;

      .btns {
        width: 296px;
      }
    }
  }
}
</style>
