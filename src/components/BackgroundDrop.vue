<!-- 뒷배경에 투명한 검은색을 씌우는 컴포넌트입니다. 팝업의 배경으로 활용할 수 있습니다. -->

<template>
  <div class="background-drop"></div>
</template>

<script>
export default {};
</script>

<style>
.background-drop {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;

  background-color: rgba(0, 0, 0, 0.6);
}
</style>
