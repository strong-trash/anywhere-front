<template>
  <div id="masil-page">
    <div id="map"></div>
    <div id="floatmenu-container">
      <div>
        <div class="select-boxes">
          <v-select
            :placeholder="`큰 분류`"
            :options="bigFilterOpts"
            label="name"
            v-model="selectedBigFilter"
            :clearable="false"
            v-on:input="clearSmallFilter"
          ></v-select>
          <v-select
            :placeholder="`작은 분류`"
            :options="smallFilterOptKeys"
            v-model="selectedSmallFilter"
            :clearable="false"
            :disabled="selectedBigFilter ? false : true"
          ></v-select>
        </div>
        <input
          class="free-response"
          type="text"
          placeholder="어디로 갈까요?"
          v-model="freeResponse"
          v-show="selectedSmallFilter === `직접입력`"
        />
      </div>

      <div class="btns" style="display: flex">
        <div class="circle-btn">
          <img :src="img.marker" alt="select coord" />
        </div>
        <div class="circle-btn">
          <img :src="img.area" alt="set radius" style="width: 28px; height: 28px" />
        </div>
        <div id="submit-plan-btn" class="circle-btn">
          <img :src="img.airplane" alt="submit user plan, request place to server" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { bigFilterOpts, smallFilterOpts } from "@/assets/variables.js";
import markerImg from "@/assets/marker.png";
import airplaneImg from "@/assets/airplane_white.png";
import areaImg from "@/assets/area.png";

export default {
  data: function () {
    return {
      map: null,
      selectedCoord: { x: null, y: null },
      bigFilterOpts: bigFilterOpts,

      selectedBigFilter: null,
      selectedSmallFilter: null,
      freeResponse: null,

      img: {
        marker: markerImg,
        airplane: airplaneImg,
        area: areaImg,
      },
    };
  },
  computed: {
    smallFilterOptKeys: function () {
      if (this.selectedBigFilter) {
        const code = this.selectedBigFilter.code;
        return smallFilterOpts[code];
      } else {
        return [];
      }
    },
  },
  methods: {
    clearSmallFilter: function () {
      this.selectedSmallFilter = null;
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
</script>

<style lang="scss">
#masil-page {
  flex: 1;

  #map {
    height: 100%;
    width: 100%;
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
      transition: all 0.2s;
    }
    .v-select:hover {
      transform: scale(1.05);
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

  .circle-btn {
    display: flex;
    justify-content: center;
    align-items: center;

    width: 36px;
    height: 36px;
    margin-right: 8px;
    margin-top: 8px;

    background-color: white;
    border-radius: 50%;
    border: 1px solid rgba(60, 60, 60, 0.26);
    cursor: pointer;
    transition: all 0.2s;
    img {
      width: 22px;
      height: 22px;
      filter: opacity(0.8);
    }
  }
  .circle-btn:hover {
    transform: scale(1.1);
  }
  .circle-btn:active {
    transform: scale(0.9);
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
