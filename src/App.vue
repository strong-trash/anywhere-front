<template>
  <div id="app" class="anywhere">
    <img :src="imgpath" width="128px" />
    <p class="anywhere">{{ anywhere }}</p>
  </div>
</template>

<script>
import hikerImg from "./assets/icon_hiker_black.png";
export default {
  data: function () {
    return {
      imgpath: hikerImg,
      anywhere: "어디로든",
    };
  },
};
</script>

<style>
#app {
  width: 100vw;
  height: 100vh;

  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}

.anywhere {
  font-family: "Gowun Batang", serif;
  font-size: 48px;
  font-weight: lighter;
}
</style>
