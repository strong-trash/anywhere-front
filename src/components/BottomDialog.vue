<template>
  <div class="bottom-dialog" :class="{ fold: active && isFolded, unfold: !isFolded }">
    <div class="slide-btn" v-on:click="foldAndUnfold">
      <img :src="img.arrowUp" :class="{ rotate180deg: !isFolded }" />
    </div>
    <div class="slide-contents-container">
      <slot></slot>
    </div>
  </div>
</template>

<script>
// bottom-dialog의 표시 상태를 변경하는 변수는 두 개입니다.
//
// 1. props로 넘어오는 'active' : true(활성화 상태) / false(비활성화 상태)
// ---> active는 화면상에 bottom-dialog가 조금이라도 보이느냐 / 아예 보이지 않느냐를 결정합니다. (hide, show)
//      값이 변경되는 원인은 bottom-dialog의 바깥에 있습니다.
// 2. data에 정의된 'isFolded' : true(접혀서 버튼만 보이는 상태) / false(펼쳐져서 내용이 보이는 상태)
// ---> isFolded는 bottom-dialog의 내용이 보이느냐 안보이느냐를 결정합니다.
//      사용자가 bottom-dialog 내의 "slide-btn" 버튼을 누를 때 변경됩니다.

import arrowUpImg from "@/assets/arrow-up.png";

export default {
  props: ["active"], // true / false
  data: function () {
    return {
      isFolded: true, // true / false
      img: {
        arrowUp: arrowUpImg,
      },
    };
  },
  watch: {
    active: "showAndHide",
  },
  methods: {
    showAndHide: function () {
      !this.active && (this.isFolded = true);
    },
    foldAndUnfold: function () {
      this.isFolded = !this.isFolded;
    },
  },
};
</script>

<style lang="scss">
.bottom-dialog {
  display: flex;
  flex-direction: column;
  align-items: center;

  position: fixed;
  bottom: 0;
  left: 0;

  width: 100vw;
  height: calc(100vh - 2 * #{$header-height});
  border-top-left-radius: 32px;
  border-top-right-radius: 32px;
  background-color: rgba(255, 255, 255, 0.9);

  transform: translateY(calc(100vh - 2 * #{$header-height}));

  transition: all 0.5s;

  .slide-btn {
    display: flex;
    justify-content: center;
    align-items: center;

    width: 100%;
    height: 36px;

    border-top-left-radius: 32px;
    border-top-right-radius: 32px;
    cursor: pointer;

    transition: all 0.2s;

    img {
      height: 32px;
      width: auto;
      transition: all 0.5s;
    }
    img.rotate180deg {
      transform: rotate(180deg);
      transition: all 0.5s;
    }
  }

  .slide-btn:hover {
    background-color: rgb(213, 213, 213);
  }

  .slide-contents-container {
    width: 100%;
    flex: 1;
    max-height: 100%;
  }
}

.bottom-dialog.unfold {
  transform: translateY(0);
  box-shadow: 0 -10px 20px 30px rgba(0, 0, 0, 0.5);
}
.bottom-dialog.fold {
  transform: translateY(calc(100vh - 4 * #{$header-height} - 34px));
  box-shadow: 0 -20px 30px 20px rgba(0, 0, 0, 0.5);
}
</style>
